const router = require('express').Router();
const FormSubmission = require('../models/FormSubmission');
const { authenticate } = require('../middleware/auth');
const { resolveTenant } = require('../middleware/tenant');
const { requirePermission } = require('../middleware/rbac');
const { publicFormLimiter } = require('../middleware/rateLimit');

// PUBLIC: Firma web sitesinden form gönderimi (auth gerektirmez)
router.post('/submit', publicFormLimiter, async (req, res) => {
  const { tenantId, formType, fields, kvkkConsent } = req.body;
  if (!tenantId || !fields || !kvkkConsent) {
    return res.status(400).json({ message: 'tenantId, fields ve kvkkConsent gerekli' });
  }
  const submission = await FormSubmission.create({
    tenantId,
    formType: formType || 'contact',
    fields,
    kvkkConsent,
    ipAddress: req.ip,
  });
  res.status(201).json({ message: 'Form alındı', id: submission._id });
});

// Aşağısı panel için — auth gerektirir
router.use(authenticate, resolveTenant);

// GET /api/forms
router.get('/', requirePermission('forms.read'), async (req, res) => {
  const { status, formType, page = 1, limit = 20 } = req.query;
  const filter = { tenantId: req.tenantId };
  if (status) filter.status = status;
  if (formType) filter.formType = formType;

  const [items, total] = await Promise.all([
    FormSubmission.find(filter).sort('-submittedAt').skip((page - 1) * limit).limit(Number(limit)),
    FormSubmission.countDocuments(filter),
  ]);
  res.json({ data: items, total, page: Number(page), limit: Number(limit) });
});

// PATCH /api/forms/:id/status
router.patch('/:id/status', requirePermission('forms.update'), async (req, res) => {
  const { status } = req.body;
  if (!['new', 'seen', 'replied'].includes(status)) {
    return res.status(400).json({ message: 'Geçersiz durum' });
  }
  const submission = await FormSubmission.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.tenantId },
    { status },
    { new: true }
  );
  if (!submission) return res.status(404).json({ message: 'Form bulunamadı' });
  res.json(submission);
});

module.exports = router;
