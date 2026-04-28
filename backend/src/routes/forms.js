const router = require('express').Router();
const mongoose = require('mongoose');
const FormSubmission = require('../models/FormSubmission');
const Company = require('../models/Company');
const { authenticate } = require('../middleware/auth');
const { resolveTenant } = require('../middleware/tenant');
const { requirePermission } = require('../middleware/rbac');
const { publicFormLimiter } = require('../middleware/rateLimit');
const { safeStr, safePage, safePageNum } = require('../utils/query');

const ALLOWED_FORM_TYPES = ['contact', 'reservation', 'appointment', 'other'];

// PUBLIC: Firma web sitesinden form gönderimi (auth gerektirmez)
router.post('/submit', publicFormLimiter, async (req, res) => {
  const { tenantId, formType, fields, kvkkConsent } = req.body;
  if (!tenantId || !fields || !kvkkConsent) {
    return res.status(400).json({ message: 'tenantId, fields ve kvkkConsent gerekli' });
  }
  if (!mongoose.isValidObjectId(tenantId)) {
    return res.status(400).json({ message: 'Geçersiz tenantId' });
  }
  const company = await Company.findOne({ _id: tenantId, isActive: true }).select('_id').lean();
  if (!company) return res.status(404).json({ message: 'Firma bulunamadı' });

  const safeFormType = ALLOWED_FORM_TYPES.includes(formType) ? formType : 'contact';

  if (typeof fields !== 'object' || Array.isArray(fields)) {
    return res.status(400).json({ message: 'fields bir nesne olmalı' });
  }
  const fieldStr = JSON.stringify(fields);
  if (fieldStr.length > 5000) {
    return res.status(400).json({ message: 'Form verisi çok büyük' });
  }

  const submission = await FormSubmission.create({
    tenantId,
    formType: safeFormType,
    fields,
    kvkkConsent: true,
    ipAddress: req.ip,
  });
  res.status(201).json({ message: 'Form alındı', id: submission._id });
});

// Aşağısı panel için — auth gerektirir
router.use(authenticate, resolveTenant);

// GET /api/forms
router.get('/', requirePermission('forms.read'), async (req, res) => {
  const status = safeStr(req.query.status);
  const formType = safeStr(req.query.formType);
  const page = safePageNum(req.query.page);
  const limit = safePage(req.query.limit);
  const filter = { tenantId: req.tenantId };
  if (status) filter.status = status;
  if (formType) filter.formType = formType;

  const [items, total] = await Promise.all([
    FormSubmission.find(filter).sort('-submittedAt').skip((page - 1) * limit).limit(limit),
    FormSubmission.countDocuments(filter),
  ]);
  res.json({ data: items, total, page, limit });
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
