const router = require('express').Router();
const Company = require('../models/Company');
const RestaurantMenuCategory = require('../models/RestaurantMenuCategory');
const RestaurantMenuItem = require('../models/RestaurantMenuItem');
const Media = require('../models/Media');
const Reservation = require('../models/Reservation');
const FormSubmission = require('../models/FormSubmission');
const Service = require('../models/Service');
const Property = require('../models/Property');
const { publicFormLimiter } = require('../middleware/rateLimit');
const { validate } = require('../middleware/validate');
const { safeStr } = require('../utils/query');

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
  res.status(201).json({ message: 'Mesajınız iletildi' });
});

module.exports = router;
