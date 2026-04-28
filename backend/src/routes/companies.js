const router = require('express').Router();
const Company = require('../models/Company');
const { authenticate } = require('../middleware/auth');

// Super admin guard
const superAdmin = (req, res, next) => {
  if (!req.user.isSuperAdmin) return res.status(403).json({ message: 'Yetersiz yetki' });
  next();
};

// GET /api/companies — sadece super admin
router.get('/', authenticate, superAdmin, async (req, res) => {
  const companies = await Company.find().sort('-createdAt');
  res.json(companies);
});

// POST /api/companies — sadece super admin
router.post('/', authenticate, superAdmin, async (req, res) => {
  const { name, slug, sector } = req.body;
  if (!name || !slug) return res.status(400).json({ message: 'name ve slug gerekli' });

  const exists = await Company.findOne({ slug });
  if (exists) return res.status(409).json({ message: 'Bu slug zaten kullanımda' });

  const company = await Company.create({ name, slug, sector });
  res.status(201).json(company);
});

// GET /api/companies/:id
router.get('/:id', authenticate, async (req, res) => {
  if (!req.user.isSuperAdmin) {
    const hasAccess = req.user.companyRoles.some(
      (cr) => cr.tenantId.toString() === req.params.id
    );
    if (!hasAccess) return res.status(403).json({ message: 'Erişim yok' });
  }
  const company = await Company.findById(req.params.id);
  if (!company) return res.status(404).json({ message: 'Firma bulunamadı' });
  res.json(company);
});

// PATCH /api/companies/:id
router.patch('/:id', authenticate, async (req, res) => {
  if (!req.user.isSuperAdmin) {
    const hasAccess = req.user.companyRoles.some(
      (cr) => cr.tenantId.toString() === req.params.id
    );
    if (!hasAccess) return res.status(403).json({ message: 'Erişim yok' });
  }
  const allowed = ['name', 'domain', 'subdomain', 'sector', 'branding', 'settings', 'contact', 'description', 'workingHours', 'socialLinks', 'content', 'emailSettings'];
  const updates = Object.fromEntries(
    Object.entries(req.body).filter(([k]) => allowed.includes(k))
  );
  const company = await Company.findByIdAndUpdate(req.params.id, updates, { new: true });
  if (!company) return res.status(404).json({ message: 'Firma bulunamadı' });
  res.json(company);
});

module.exports = router;
