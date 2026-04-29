const router = require('express').Router();
const Faq = require('../models/Faq');
const { authenticate } = require('../middleware/auth');
const { resolveTenant } = require('../middleware/tenant');
const { requirePermission } = require('../middleware/rbac');

router.use(authenticate, resolveTenant);

// GET /api/faqs
router.get('/', requirePermission('faqs.read'), async (req, res) => {
  const faqs = await Faq.find({ tenantId: req.tenantId }).sort('order');
  res.json(faqs);
});

// POST /api/faqs
router.post('/', requirePermission('faqs.create'), async (req, res) => {
  const faq = await Faq.create({ ...req.body, tenantId: req.tenantId });
  res.status(201).json(faq);
});

// PATCH /api/faqs/reorder
router.patch('/reorder', requirePermission('faqs.update'), async (req, res) => {
  const { items } = req.body; // [{ id, order }]
  if (!Array.isArray(items)) return res.status(400).json({ message: 'items dizisi gerekli' });

  await Promise.all(
    items.map(({ id, order }) =>
      Faq.updateOne({ _id: id, tenantId: req.tenantId }, { order })
    )
  );
  res.json({ message: 'Sıralama güncellendi' });
});

// GET /api/faqs/:id
router.get('/:id', requirePermission('faqs.read'), async (req, res) => {
  const faq = await Faq.findOne({ _id: req.params.id, tenantId: req.tenantId });
  if (!faq) return res.status(404).json({ message: 'SSS bulunamadı' });
  res.json(faq);
});

// PATCH /api/faqs/:id
router.patch('/:id', requirePermission('faqs.update'), async (req, res) => {
  const updates = { ...req.body };
  delete updates.tenantId;
  const faq = await Faq.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.tenantId },
    updates,
    { new: true }
  );
  if (!faq) return res.status(404).json({ message: 'SSS bulunamadı' });
  res.json(faq);
});

// DELETE /api/faqs/:id
router.delete('/:id', requirePermission('faqs.delete'), async (req, res) => {
  const faq = await Faq.findOneAndDelete({ _id: req.params.id, tenantId: req.tenantId });
  if (!faq) return res.status(404).json({ message: 'SSS bulunamadı' });
  res.json({ message: 'Silindi' });
});

module.exports = router;
