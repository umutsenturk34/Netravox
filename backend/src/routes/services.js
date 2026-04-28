const router = require('express').Router();
const Service = require('../models/Service');
const { authenticate } = require('../middleware/auth');
const { resolveTenant } = require('../middleware/tenant');
const { requirePermission } = require('../middleware/rbac');

router.use(authenticate, resolveTenant);

router.get('/', async (req, res) => {
  const services = await Service.find({ tenantId: req.tenantId }).sort('order');
  res.json(services);
});

router.post('/', async (req, res) => {
  const service = await Service.create({ ...req.body, tenantId: req.tenantId });
  res.status(201).json(service);
});

router.patch('/:id', async (req, res) => {
  const service = await Service.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.tenantId },
    req.body,
    { new: true }
  );
  if (!service) return res.status(404).json({ message: 'Hizmet bulunamadı' });
  res.json(service);
});

router.delete('/:id', async (req, res) => {
  await Service.findOneAndDelete({ _id: req.params.id, tenantId: req.tenantId });
  res.json({ message: 'Hizmet silindi' });
});

module.exports = router;
