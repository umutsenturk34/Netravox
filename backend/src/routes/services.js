const router = require('express').Router();
const Service = require('../models/Service');
const { authenticate } = require('../middleware/auth');
const { resolveTenant } = require('../middleware/tenant');
const { requirePermission } = require('../middleware/rbac');

router.use(authenticate, resolveTenant);

router.get('/', requirePermission('services.read'), async (req, res) => {
  const services = await Service.find({ tenantId: req.tenantId }).sort('order');
  res.json(services);
});

router.post('/', requirePermission('services.create'), async (req, res) => {
  const service = await Service.create({ ...req.body, tenantId: req.tenantId });
  res.status(201).json(service);
});

router.patch('/:id', requirePermission('services.update'), async (req, res) => {
  const { tenantId: _, ...updates } = req.body;
  const service = await Service.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.tenantId },
    updates,
    { new: true }
  );
  if (!service) return res.status(404).json({ message: 'Hizmet bulunamadı' });
  res.json(service);
});

router.delete('/:id', requirePermission('services.delete'), async (req, res) => {
  const service = await Service.findOneAndDelete({ _id: req.params.id, tenantId: req.tenantId });
  if (!service) return res.status(404).json({ message: 'Hizmet bulunamadı' });
  res.json({ message: 'Hizmet silindi' });
});

module.exports = router;
