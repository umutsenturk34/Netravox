const router = require('express').Router();
const NavigationMenu = require('../models/NavigationMenu');
const { authenticate } = require('../middleware/auth');
const { resolveTenant } = require('../middleware/tenant');
const { requirePermission } = require('../middleware/rbac');

router.use(authenticate, resolveTenant);

// GET /api/menus
router.get('/', requirePermission('menus.read'), async (req, res) => {
  const { language } = req.query;
  const filter = { tenantId: req.tenantId };
  if (language) filter.language = language;
  const menus = await NavigationMenu.find(filter);
  res.json(menus);
});

// POST /api/menus
router.post('/', requirePermission('menus.create'), async (req, res) => {
  const { name, language, items } = req.body;
  if (!name) return res.status(400).json({ message: 'name gerekli' });

  const exists = await NavigationMenu.findOne({ tenantId: req.tenantId, name, language });
  if (exists) return res.status(409).json({ message: 'Bu isimde menü zaten var' });

  const menu = await NavigationMenu.create({
    tenantId: req.tenantId,
    name,
    language: language || 'tr',
    items: items || [],
  });
  res.status(201).json(menu);
});

// GET /api/menus/:id
router.get('/:id', requirePermission('menus.read'), async (req, res) => {
  const menu = await NavigationMenu.findOne({ _id: req.params.id, tenantId: req.tenantId });
  if (!menu) return res.status(404).json({ message: 'Menü bulunamadı' });
  res.json(menu);
});

// PUT /api/menus/:id — menü öğelerini toplu güncelle
router.put('/:id', requirePermission('menus.update'), async (req, res) => {
  const allowed = ['name', 'items'];
  const updates = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));
  const menu = await NavigationMenu.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.tenantId },
    updates,
    { new: true }
  );
  if (!menu) return res.status(404).json({ message: 'Menü bulunamadı' });
  res.json(menu);
});

// DELETE /api/menus/:id
router.delete('/:id', requirePermission('menus.delete'), async (req, res) => {
  await NavigationMenu.findOneAndDelete({ _id: req.params.id, tenantId: req.tenantId });
  res.json({ message: 'Menü silindi' });
});

module.exports = router;
