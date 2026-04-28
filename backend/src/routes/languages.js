const router = require('express').Router();
const mongoose = require('mongoose');
const { authenticate } = require('../middleware/auth');
const { resolveTenant } = require('../middleware/tenant');
const { requirePermission } = require('../middleware/rbac');

// Inline schema — bağımsız koleksiyon gerektirmeyecek kadar basit
const languageSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  code: { type: String, required: true },
  label: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

languageSchema.index({ tenantId: 1, code: 1 }, { unique: true });

const Language = mongoose.models.Language || mongoose.model('Language', languageSchema);

router.use(authenticate, resolveTenant);

// GET /api/languages
router.get('/', requirePermission('languages.read'), async (req, res) => {
  const langs = await Language.find({ tenantId: req.tenantId }).sort('code');
  res.json(langs);
});

// POST /api/languages
router.post('/', requirePermission('languages.create'), async (req, res) => {
  const { code, label, isDefault } = req.body;
  if (!code || !label) return res.status(400).json({ message: 'code ve label gerekli' });

  if (isDefault) {
    await Language.updateMany({ tenantId: req.tenantId }, { isDefault: false });
  }

  const lang = await Language.create({ tenantId: req.tenantId, code, label, isDefault: !!isDefault });
  res.status(201).json(lang);
});

// PATCH /api/languages/:id
router.patch('/:id', requirePermission('languages.update'), async (req, res) => {
  if (req.body.isDefault) {
    await Language.updateMany({ tenantId: req.tenantId }, { isDefault: false });
  }
  const lang = await Language.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.tenantId },
    req.body,
    { new: true }
  );
  if (!lang) return res.status(404).json({ message: 'Dil bulunamadı' });
  res.json(lang);
});

// DELETE /api/languages/:id
router.delete('/:id', requirePermission('languages.delete'), async (req, res) => {
  const lang = await Language.findOne({ _id: req.params.id, tenantId: req.tenantId });
  if (!lang) return res.status(404).json({ message: 'Dil bulunamadı' });
  if (lang.isDefault) return res.status(400).json({ message: 'Varsayılan dil silinemez' });
  await lang.deleteOne();
  res.json({ message: 'Dil silindi' });
});

module.exports = router;
