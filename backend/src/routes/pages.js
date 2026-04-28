const router = require('express').Router();
const Page = require('../models/Page');
const { authenticate } = require('../middleware/auth');
const { resolveTenant } = require('../middleware/tenant');
const { requirePermission } = require('../middleware/rbac');

// Tüm route'lar authenticate + resolveTenant gerektirir
router.use(authenticate, resolveTenant);

// GET /api/pages
router.get('/', requirePermission('pages.read'), async (req, res) => {
  const { status, template, page = 1, limit = 20 } = req.query;
  const filter = { tenantId: req.tenantId };
  if (status) filter.status = status;
  if (template) filter.template = template;

  const [pages, total] = await Promise.all([
    Page.find(filter)
      .sort('-updatedAt')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select('title slug status template featuredImage publishedAt updatedAt'),
    Page.countDocuments(filter),
  ]);

  res.json({ data: pages, total, page: Number(page), limit: Number(limit) });
});

// POST /api/pages
router.post('/', requirePermission('pages.create'), async (req, res) => {
  const page = await Page.create({
    ...req.body,
    tenantId: req.tenantId,
    createdBy: req.user._id,
    updatedBy: req.user._id,
  });
  res.status(201).json(page);
});

// GET /api/pages/:id
router.get('/:id', requirePermission('pages.read'), async (req, res) => {
  const page = await Page.findOne({ _id: req.params.id, tenantId: req.tenantId });
  if (!page) return res.status(404).json({ message: 'Sayfa bulunamadı' });
  res.json(page);
});

// PATCH /api/pages/:id
router.patch('/:id', requirePermission('pages.update'), async (req, res) => {
  const updates = { ...req.body, updatedBy: req.user._id };
  delete updates.tenantId; // tenant değiştirilmez

  if (updates.status === 'published' && !req.body.publishedAt) {
    updates.publishedAt = new Date();
  }

  const page = await Page.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.tenantId },
    updates,
    { new: true }
  );
  if (!page) return res.status(404).json({ message: 'Sayfa bulunamadı' });
  res.json(page);
});

// PATCH /api/pages/:id/publish
router.patch('/:id/publish', requirePermission('pages.publish'), async (req, res) => {
  const { status } = req.body;
  if (!['draft', 'published', 'archived'].includes(status)) {
    return res.status(400).json({ message: 'Geçersiz durum' });
  }
  const updates = { status, updatedBy: req.user._id };
  if (status === 'published') updates.publishedAt = new Date();

  const page = await Page.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.tenantId },
    updates,
    { new: true }
  );
  if (!page) return res.status(404).json({ message: 'Sayfa bulunamadı' });
  res.json(page);
});

// DELETE /api/pages/:id
router.delete('/:id', requirePermission('pages.delete'), async (req, res) => {
  const page = await Page.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.tenantId },
    { status: 'archived', updatedBy: req.user._id },
    { new: true }
  );
  if (!page) return res.status(404).json({ message: 'Sayfa bulunamadı' });
  res.json({ message: 'Sayfa arşivlendi' });
});

module.exports = router;
