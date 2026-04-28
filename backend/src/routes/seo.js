const router = require('express').Router();
const SeoSettings = require('../models/SeoSettings');
const Redirect = require('../models/Redirect');
const Page = require('../models/Page');
const Company = require('../models/Company');
const { authenticate } = require('../middleware/auth');
const { resolveTenant } = require('../middleware/tenant');
const { requirePermission } = require('../middleware/rbac');

/* ---- PUBLIC: sitemap.xml ve robots.txt (web sitesinden çağrılır) ---- */

// GET /api/seo/sitemap.xml?tenantId=xxx
router.get('/sitemap.xml', async (req, res) => {
  const { tenantId } = req.query;
  if (!tenantId) return res.status(400).send('tenantId gerekli');

  const [pages, company] = await Promise.all([
    Page.find({ tenantId, status: 'published' }).select('slug updatedAt template').lean(),
    Company.findById(tenantId).select('domain subdomain').lean(),
  ]);

  const baseUrl = company?.domain
    ? `https://${company.domain}`
    : `https://${company?.subdomain || 'site'}.cmspanel.app`;

  const priority = { home: '1.0', about: '0.8', menu: '0.9', gallery: '0.7', contact: '0.8', reservation: '0.9' };
  const changefreq = { home: 'weekly', menu: 'daily', gallery: 'monthly' };

  const urls = pages.map((p) => {
    const slug = p.slug?.tr || p.slug?.en || '';
    const loc = slug ? `${baseUrl}/${slug}` : baseUrl;
    return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date(p.updatedAt).toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq[p.template] || 'monthly'}</changefreq>
    <priority>${priority[p.template] || '0.6'}</priority>
  </url>`;
  }).join('');

  res.setHeader('Content-Type', 'application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`);
});

// GET /api/seo/robots.txt?tenantId=xxx
router.get('/robots.txt', async (req, res) => {
  const { tenantId } = req.query;
  const settings = tenantId
    ? await SeoSettings.findOne({ tenantId }).select('robotsTxt').lean()
    : null;

  res.setHeader('Content-Type', 'text/plain');
  res.send(settings?.robotsTxt || 'User-agent: *\nAllow: /');
});

/* ---- PANEL (auth gerekli) ---- */

router.use(authenticate, resolveTenant);

// GET /api/seo/settings
router.get('/settings', requirePermission('seo.read'), async (req, res) => {
  const settings = await SeoSettings.findOne({ tenantId: req.tenantId });
  res.json(settings || {});
});

// PUT /api/seo/settings
router.put('/settings', requirePermission('seo.update'), async (req, res) => {
  const settings = await SeoSettings.findOneAndUpdate(
    { tenantId: req.tenantId },
    { ...req.body, tenantId: req.tenantId },
    { new: true, upsert: true }
  );
  res.json(settings);
});

/* ---- REDIRECT'LER ---- */

router.get('/redirects', requirePermission('redirects.read'), async (req, res) => {
  const redirects = await Redirect.find({ tenantId: req.tenantId }).sort('-createdAt');
  res.json(redirects);
});

router.post('/redirects', requirePermission('redirects.create'), async (req, res) => {
  const redirect = await Redirect.create({ ...req.body, tenantId: req.tenantId });
  res.status(201).json(redirect);
});

router.patch('/redirects/:id', requirePermission('redirects.update'), async (req, res) => {
  const redirect = await Redirect.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.tenantId },
    req.body,
    { new: true }
  );
  if (!redirect) return res.status(404).json({ message: 'Redirect bulunamadı' });
  res.json(redirect);
});

router.delete('/redirects/:id', requirePermission('redirects.delete'), async (req, res) => {
  await Redirect.findOneAndDelete({ _id: req.params.id, tenantId: req.tenantId });
  res.json({ message: 'Silindi' });
});

module.exports = router;
