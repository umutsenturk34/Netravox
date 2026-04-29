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

// GET /api/companies/:id/smtp — şifreyi maskeli döndür
router.get('/:id/smtp', authenticate, async (req, res) => {
  if (!req.user.isSuperAdmin) {
    const hasAccess = req.user.companyRoles.some((cr) => cr.tenantId.toString() === req.params.id);
    if (!hasAccess) return res.status(403).json({ message: 'Erişim yok' });
  }
  const company = await Company.findById(req.params.id).select('smtpSettings');
  if (!company) return res.status(404).json({ message: 'Firma bulunamadı' });
  const s = company.smtpSettings || {};
  res.json({
    enabled:  s.enabled  ?? false,
    host:     s.host     || '',
    port:     s.port     || 587,
    secure:   s.secure   ?? false,
    user:     s.user     || '',
    pass:     s.pass ? '••••••••' : '',
    fromName: s.fromName || '',
  });
});

// PATCH /api/companies/:id/smtp — şifreyi sadece doluysa güncelle
router.patch('/:id/smtp', authenticate, async (req, res) => {
  if (!req.user.isSuperAdmin) {
    const hasAccess = req.user.companyRoles.some((cr) => cr.tenantId.toString() === req.params.id);
    if (!hasAccess) return res.status(403).json({ message: 'Erişim yok' });
  }
  const { enabled, host, port, secure, user, pass, fromName } = req.body;
  const update = { 'smtpSettings.enabled': !!enabled };
  if (host     !== undefined) update['smtpSettings.host']     = host;
  if (port     !== undefined) update['smtpSettings.port']     = Number(port) || 587;
  if (secure   !== undefined) update['smtpSettings.secure']   = !!secure;
  if (user     !== undefined) update['smtpSettings.user']     = user;
  if (fromName !== undefined) update['smtpSettings.fromName'] = fromName;
  if (pass && pass !== '••••••••') update['smtpSettings.pass'] = pass;

  await Company.findByIdAndUpdate(req.params.id, { $set: update });
  res.json({ message: 'SMTP ayarları kaydedildi' });
});

// POST /api/companies/:id/smtp/test — test maili gönder
router.post('/:id/smtp/test', authenticate, async (req, res) => {
  if (!req.user.isSuperAdmin) {
    const hasAccess = req.user.companyRoles.some((cr) => cr.tenantId.toString() === req.params.id);
    if (!hasAccess) return res.status(403).json({ message: 'Erişim yok' });
  }
  const company = await Company.findById(req.params.id);
  if (!company) return res.status(404).json({ message: 'Firma bulunamadı' });
  const s = company.smtpSettings;
  if (!s?.enabled || !s?.host || !s?.user || !s?.pass) {
    return res.status(400).json({ message: 'SMTP ayarları eksik veya devre dışı' });
  }
  try {
    const { sendContactConfirmation } = require('../utils/mailer');
    await sendContactConfirmation({
      toEmail: req.user.email,
      toName: req.user.name || 'Test Kullanıcı',
      companyName: company.name,
      smtpOverride: { host: s.host, port: s.port, secure: s.secure, user: s.user, pass: s.pass, fromName: s.fromName },
    });
    res.json({ message: `Test maili ${req.user.email} adresine gönderildi` });
  } catch (err) {
    res.status(500).json({ message: 'Mail gönderilemedi: ' + err.message });
  }
});

module.exports = router;
