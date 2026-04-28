const router = require('express').Router();
const Role = require('../models/Role');
const { authenticate } = require('../middleware/auth');
const { resolveTenant } = require('../middleware/tenant');
const { requirePermission } = require('../middleware/rbac');

router.use(authenticate, resolveTenant);

// GET /api/roles — sistem rolleri + firmaya özel roller
router.get('/', requirePermission('roles.read'), async (req, res) => {
  const roles = await Role.find({
    $or: [{ tenantId: null }, { tenantId: req.tenantId }],
  }).select('name label permissions isSystem tenantId').sort('isSystem name');
  res.json(roles);
});

// POST /api/roles — özel rol oluştur
router.post('/', requirePermission('roles.create'), async (req, res) => {
  const { name, label, permissions } = req.body;
  if (!name) return res.status(400).json({ message: 'name gerekli' });

  const exists = await Role.findOne({ name, tenantId: req.tenantId });
  if (exists) return res.status(409).json({ message: 'Bu isimde rol zaten var' });

  const role = await Role.create({
    name,
    label: label || { tr: name, en: name },
    permissions: permissions || [],
    isSystem: false,
    tenantId: req.tenantId,
  });
  res.status(201).json(role);
});

// PATCH /api/roles/:id — özel rol güncelle (sistem rolleri güncellenemez)
router.patch('/:id', requirePermission('roles.update'), async (req, res) => {
  const role = await Role.findOne({ _id: req.params.id, tenantId: req.tenantId, isSystem: false });
  if (!role) return res.status(404).json({ message: 'Rol bulunamadı veya sistem rolü değiştirilemez' });

  const allowed = ['label', 'permissions'];
  allowed.forEach((k) => { if (req.body[k] !== undefined) role[k] = req.body[k]; });
  await role.save();
  res.json(role);
});

// DELETE /api/roles/:id — özel rol sil
router.delete('/:id', requirePermission('roles.delete'), async (req, res) => {
  const role = await Role.findOne({ _id: req.params.id, tenantId: req.tenantId, isSystem: false });
  if (!role) return res.status(404).json({ message: 'Rol bulunamadı veya sistem rolü silinemez' });
  await role.deleteOne();
  res.json({ message: 'Rol silindi' });
});

module.exports = router;
