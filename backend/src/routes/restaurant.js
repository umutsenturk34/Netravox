const router = require('express').Router();
const Category = require('../models/RestaurantMenuCategory');
const Item = require('../models/RestaurantMenuItem');
const { authenticate } = require('../middleware/auth');
const { resolveTenant } = require('../middleware/tenant');
const { requirePermission } = require('../middleware/rbac');
const { safeStr } = require('../utils/query');

router.use(authenticate, resolveTenant);

/* ---- KATEGORİLER ---- */

router.get('/categories', requirePermission('restaurant.read'), async (req, res) => {
  const cats = await Category.find({ tenantId: req.tenantId }).sort('order');
  res.json(cats);
});

router.post('/categories', requirePermission('restaurant.create'), async (req, res) => {
  const cat = await Category.create({ ...req.body, tenantId: req.tenantId });
  res.status(201).json(cat);
});

router.patch('/categories/:id', requirePermission('restaurant.update'), async (req, res) => {
  const { tenantId: _, ...updates } = req.body;
  const cat = await Category.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.tenantId },
    updates,
    { new: true }
  );
  if (!cat) return res.status(404).json({ message: 'Kategori bulunamadı' });
  res.json(cat);
});

router.delete('/categories/:id', requirePermission('restaurant.update'), async (req, res) => {
  await Category.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.tenantId },
    { isActive: false }
  );
  res.json({ message: 'Kategori pasifleştirildi' });
});

/* ---- ÜRÜNLER ---- */

router.get('/items', requirePermission('restaurant.read'), async (req, res) => {
  const categoryId = safeStr(req.query.categoryId);
  const filter = { tenantId: req.tenantId };
  if (categoryId) filter.categoryId = categoryId;
  const items = await Item.find(filter).sort('order').populate('categoryId', 'name');
  res.json(items);
});

router.post('/items', requirePermission('restaurant.create'), async (req, res) => {
  const item = await Item.create({ ...req.body, tenantId: req.tenantId });
  res.status(201).json(item);
});

router.patch('/items/:id', requirePermission('restaurant.update'), async (req, res) => {
  const { tenantId: _, ...updates } = req.body;
  const item = await Item.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.tenantId },
    updates,
    { new: true }
  );
  if (!item) return res.status(404).json({ message: 'Ürün bulunamadı' });
  res.json(item);
});

router.delete('/items/:id', requirePermission('restaurant.update'), async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.tenantId },
    { isActive: false }
  );
  res.json({ message: 'Ürün pasifleştirildi' });
});

module.exports = router;
