const router = require('express').Router();
const Property = require('../models/Property');
const { authenticate } = require('../middleware/auth');
const { resolveTenant } = require('../middleware/tenant');
const { requirePermission } = require('../middleware/rbac');
const { safeStr } = require('../utils/query');

router.use(authenticate, resolveTenant);

router.get('/', requirePermission('properties.read'), async (req, res) => {
  const type = safeStr(req.query.type);
  const propertyType = safeStr(req.query.propertyType);
  const status = safeStr(req.query.status);
  const filter = { tenantId: req.tenantId };
  if (type) filter.type = type;
  if (propertyType) filter.propertyType = propertyType;
  if (status) filter.status = status;
  const properties = await Property.find(filter).sort({ createdAt: -1 });
  res.json(properties);
});

router.post('/', requirePermission('properties.create'), async (req, res) => {
  const property = await Property.create({ ...req.body, tenantId: req.tenantId });
  res.status(201).json(property);
});

router.patch('/:id', requirePermission('properties.update'), async (req, res) => {
  const { tenantId: _, ...updates } = req.body;
  const property = await Property.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.tenantId },
    updates,
    { new: true }
  );
  if (!property) return res.status(404).json({ message: 'İlan bulunamadı' });
  res.json(property);
});

router.delete('/:id', requirePermission('properties.delete'), async (req, res) => {
  const property = await Property.findOneAndDelete({ _id: req.params.id, tenantId: req.tenantId });
  if (!property) return res.status(404).json({ message: 'İlan bulunamadı' });
  res.json({ message: 'İlan silindi' });
});

module.exports = router;
