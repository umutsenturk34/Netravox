const router = require('express').Router();
const Company = require('../models/Company');
const RestaurantMenuCategory = require('../models/RestaurantMenuCategory');
const RestaurantMenuItem = require('../models/RestaurantMenuItem');
const Media = require('../models/Media');
const Reservation = require('../models/Reservation');
const FormSubmission = require('../models/FormSubmission');
const Service = require('../models/Service');
const Property = require('../models/Property');
const Faq = require('../models/Faq');
const BlogPost = require('../models/BlogPost');
const Page = require('../models/Page');
const NavigationMenu = require('../models/NavigationMenu');
const { publicFormLimiter } = require('../middleware/rateLimit');
const { validate } = require('../middleware/validate');
const { safeStr } = require('../utils/query');
const { sendContactConfirmation } = require('../utils/mailer');

const findCompany = async (slug) => Company.findOne({ slug, isActive: true });

// GET /api/public/:slug/company
router.get('/:slug/company', async (req, res) => {
  const company = await findCompany(req.params.slug);
  if (!company) return res.status(404).json({ message: 'Firma bulunamadı' });
  res.json({
    _id: company._id,
    name: company.name,
    slug: company.slug,
    sector: company.sector,
    description: company.description,
    branding: company.branding,
    contact: company.contact,
    workingHours: company.workingHours,
    socialLinks: company.socialLinks,
    content: company.content,
  });
});

// GET /api/public/:slug/menu  (restoran)
router.get('/:slug/menu', async (req, res) => {
  const company = await findCompany(req.params.slug);
  if (!company) return res.status(404).json({ message: 'Firma bulunamadı' });

  const categories = await RestaurantMenuCategory.find({ tenantId: company._id, isActive: true }).sort('order');
  const items = await RestaurantMenuItem.find({ tenantId: company._id, isActive: true }).sort('order');

  res.json(categories.map((cat) => ({
    _id: cat._id,
    name: cat.name,
    description: cat.description,
    image: cat.image,
    items: items
      .filter((i) => i.categoryId.toString() === cat._id.toString())
      .map((i) => ({
        _id: i._id, name: i.name, description: i.description,
        price: i.price, currency: i.currency, image: i.image,
        isFeatured: i.isFeatured, allergens: i.allergens,
      })),
  })));
});

// GET /api/public/:slug/gallery
router.get('/:slug/gallery', async (req, res) => {
  const company = await findCompany(req.params.slug);
  if (!company) return res.status(404).json({ message: 'Firma bulunamadı' });

  const media = await Media.find({
    tenantId: company._id, isArchived: false, mimeType: { $regex: '^image/' },
  }).sort('-createdAt').limit(50);

  res.json(media.map((m) => ({ _id: m._id, url: m.url, thumbnailUrl: m.thumbnailUrl, alt: m.alt, caption: m.caption })));
});

// GET /api/public/:slug/services  (diş hekimi / genel hizmetler)
router.get('/:slug/services', async (req, res) => {
  const company = await findCompany(req.params.slug);
  if (!company) return res.status(404).json({ message: 'Firma bulunamadı' });

  const services = await Service.find({ tenantId: company._id, isActive: true }).sort('order');
  res.json(services);
});

// GET /api/public/:slug/properties  (gayrimenkul)
router.get('/:slug/properties', async (req, res) => {
  const company = await findCompany(req.params.slug);
  if (!company) return res.status(404).json({ message: 'Firma bulunamadı' });

  const type = safeStr(req.query.type);
  const propertyType = safeStr(req.query.propertyType);
  const status = safeStr(req.query.status) || 'available';
  const filter = { tenantId: company._id, isActive: true, status };
  if (type) filter.type = type;
  if (propertyType) filter.propertyType = propertyType;

  const properties = await Property.find(filter).sort('-isFeatured -createdAt');
  res.json(properties);
});

// GET /api/public/:slug/navigation  — { tr: items[], en: items[] }
router.get('/:slug/navigation', async (req, res) => {
  const company = await findCompany(req.params.slug);
  if (!company) return res.status(404).json({ message: 'Firma bulunamadı' });

  const menus = await NavigationMenu.find({ tenantId: company._id, name: 'main-nav' }).lean();
  const result = {};
  for (const menu of menus) {
    result[menu.language] = menu.items.sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  res.json(result);
});

// GET /api/public/:slug/pages[?template=home]
router.get('/:slug/pages', async (req, res) => {
  const company = await findCompany(req.params.slug);
  if (!company) return res.status(404).json({ message: 'Firma bulunamadı' });

  const filter = { tenantId: company._id, status: 'published' };
  if (req.query.template) filter.template = req.query.template;

  // template ile arama: içerik dahil tek sayfa döner
  if (req.query.template) {
    const page = await Page.findOne(filter).lean();
    if (!page) return res.status(404).json({ message: 'Sayfa bulunamadı' });
    return res.json(page);
  }

  const pages = await Page.find(filter)
    .select('slug title template featuredImage seo publishedAt')
    .sort('template')
    .lean();
  res.json(pages);
});

// GET /api/public/:slug/pages/:pageSlug
router.get('/:slug/pages/:pageSlug', async (req, res) => {
  const company = await findCompany(req.params.slug);
  if (!company) return res.status(404).json({ message: 'Firma bulunamadı' });
  const page = await Page.findOne({
    tenantId: company._id,
    status: 'published',
    $or: [{ 'slug.tr': req.params.pageSlug }, { 'slug.en': req.params.pageSlug }],
  }).lean();
  if (!page) return res.status(404).json({ message: 'Sayfa bulunamadı' });
  res.json(page);
});

// GET /api/public/:slug/services/:id  (tek ürün detayı)
router.get('/:slug/services/:id', async (req, res) => {
  const company = await findCompany(req.params.slug);
  if (!company) return res.status(404).json({ message: 'Firma bulunamadı' });
  const service = await Service.findOne({ _id: req.params.id, tenantId: company._id, isActive: true }).lean();
  if (!service) return res.status(404).json({ message: 'Ürün bulunamadı' });
  res.json(service);
});

// POST /api/public/:slug/reservation  (restoran)
router.post('/:slug/reservation', publicFormLimiter, validate('reservation'), async (req, res) => {
  const company = await findCompany(req.params.slug);
  if (!company) return res.status(404).json({ message: 'Firma bulunamadı' });

  const { fullName, phone, email, date, time, partySize, note, kvkkConsent } = req.body;
  if (!fullName || !phone || !date || !time || !partySize)
    return res.status(400).json({ message: 'Ad, telefon, tarih, saat ve kişi sayısı zorunlu' });
  if (!kvkkConsent) return res.status(400).json({ message: 'KVKK onayı zorunlu' });

  const reservation = await Reservation.create({
    tenantId: company._id, fullName, phone, email: email || null,
    date: new Date(date), time, partySize: Number(partySize),
    note: note || null, kvkkConsent: true,
  });
  res.status(201).json({ message: 'Rezervasyon talebiniz alındı', id: reservation._id });
});

// POST /api/public/:slug/appointment  (diş hekimi randevu)
router.post('/:slug/appointment', publicFormLimiter, validate('appointment'), async (req, res) => {
  const company = await findCompany(req.params.slug);
  if (!company) return res.status(404).json({ message: 'Firma bulunamadı' });

  const { fullName, phone, email, date, time, service, note, kvkkConsent } = req.body;
  if (!fullName || !phone || !date || !time)
    return res.status(400).json({ message: 'Ad, telefon, tarih ve saat zorunlu' });
  if (!kvkkConsent) return res.status(400).json({ message: 'KVKK onayı zorunlu' });

  await Reservation.create({
    tenantId: company._id, fullName, phone, email: email || null,
    date: new Date(date), time, partySize: 1,
    note: [service ? `Hizmet: ${service}` : '', note].filter(Boolean).join(' | ') || null,
    kvkkConsent: true,
  });
  res.status(201).json({ message: 'Randevu talebiniz alındı' });
});

// GET /api/public/:slug/faqs
router.get('/:slug/faqs', async (req, res) => {
  const company = await findCompany(req.params.slug);
  if (!company) return res.status(404).json({ message: 'Firma bulunamadı' });

  const faqs = await Faq.find({ tenantId: company._id, isActive: true }).sort('order');
  res.json(faqs.map((f) => ({
    _id: f._id,
    question: f.question,
    answer: f.answer,
    order: f.order,
  })));
});

// GET /api/public/:slug/blog
router.get('/:slug/blog', async (req, res) => {
  const company = await findCompany(req.params.slug);
  if (!company) return res.status(404).json({ message: 'Firma bulunamadı' });

  const posts = await BlogPost.find({ tenantId: company._id, status: 'published' })
    .sort('-publishedAt')
    .limit(20)
    .select('title slug excerpt coverImage publishedAt author tags');
  res.json(posts);
});

// GET /api/public/:slug/blog/:postSlug
router.get('/:slug/blog/:postSlug', async (req, res) => {
  const company = await findCompany(req.params.slug);
  if (!company) return res.status(404).json({ message: 'Firma bulunamadı' });

  const post = await BlogPost.findOne({
    tenantId: company._id,
    slug: req.params.postSlug,
    status: 'published',
  });
  if (!post) return res.status(404).json({ message: 'Blog yazısı bulunamadı' });
  res.json(post);
});

// GET /api/public/:slug/robots.txt
router.get('/:slug/robots.txt', async (req, res) => {
  const company = await findCompany(req.params.slug);
  if (!company) return res.status(404).send('Not found');
  const domain = company.domain || `https://${company.slug}.com`;
  res.set('Content-Type', 'text/plain');
  res.send(`User-agent: *\nAllow: /\n\nSitemap: ${domain}/sitemap.xml\n`);
});

// GET /api/public/:slug/sitemap.xml
router.get('/:slug/sitemap.xml', async (req, res) => {
  const company = await findCompany(req.params.slug);
  if (!company) return res.status(404).send('Not found');

  const domain = company.domain || `https://${company.slug}.com`;

  const [posts, services, publishedPages] = await Promise.all([
    BlogPost.find({ tenantId: company._id, status: 'published' }).select('slug updatedAt').lean(),
    Service.find({ tenantId: company._id, isActive: true }).select('_id updatedAt').lean(),
    Page.find({ tenantId: company._id, status: 'published' }).select('slug updatedAt').lean(),
  ]);

  const pageRoutes = publishedPages.length > 0
    ? publishedPages.map((p) => {
        const slug = p.slug?.tr || '';
        return slug ? `/${slug}` : '/';
      })
    : ['/', '/hakkimizda', '/koleksiyonlar', '/blog', '/iletisim'];

  const urls = [
    ...pageRoutes.map((path) => `
  <url>
    <loc>${domain}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`),
    ...posts.map((p) => `
  <url>
    <loc>${domain}/blog/${p.slug}</loc>
    <lastmod>${new Date(p.updatedAt).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`),
    ...services.map((s) => `
  <url>
    <loc>${domain}/koleksiyonlar/${s._id}</loc>
    <lastmod>${new Date(s.updatedAt).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

  res.set('Content-Type', 'application/xml');
  res.send(xml);
});

// POST /api/public/:slug/contact
router.post('/:slug/contact', publicFormLimiter, validate('contact'), async (req, res) => {
  const company = await findCompany(req.params.slug);
  if (!company) return res.status(404).json({ message: 'Firma bulunamadı' });

  const { name, email, message, kvkkConsent } = req.body;
  if (!name || !email || !message) return res.status(400).json({ message: 'Ad, e-posta ve mesaj zorunlu' });
  if (!kvkkConsent) return res.status(400).json({ message: 'KVKK onayı zorunlu' });

  await FormSubmission.create({
    tenantId: company._id, formType: 'contact',
    fields: { name, email, message }, kvkkConsent: true, ipAddress: req.ip || null,
  });

  const s = company.smtpSettings;
  const smtpOverride = s?.enabled && s?.host && s?.user && s?.pass
    ? { host: s.host, port: s.port, secure: s.secure, user: s.user, pass: s.pass, fromName: s.fromName }
    : undefined;

  sendContactConfirmation({
    toEmail: email,
    toName: name,
    companyName: company.name || 'Netravox',
    smtpOverride,
  }).catch(() => {});

  res.status(201).json({ message: 'Mesajınız iletildi' });
});

module.exports = router;
