const router = require('express').Router();
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');
const { resolveTenant } = require('../middleware/tenant');
const { requirePermission } = require('../middleware/rbac');
const { validate } = require('../middleware/validate');

router.use(authenticate, resolveTenant);

// GET /api/users — firmaya ait kullanıcılar
router.get('/', requirePermission('users.read'), async (req, res) => {
  const users = await User.find({
    'companyRoles.tenantId': req.tenantId,
    isActive: true,
  })
    .select('-passwordHash -refreshTokens')
    .populate('companyRoles.roleId', 'name label');
  res.json(users);
});

// POST /api/users
router.post('/', requirePermission('users.create'), validate('createUser'), async (req, res) => {
  const { name, email, password, roleId } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Bu email zaten kullanımda' });

  const passwordHash = await User.hashPassword(password);
  const user = await User.create({
    name,
    email,
    passwordHash,
    companyRoles: [{ tenantId: req.tenantId, roleId }],
  });

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    companyRoles: user.companyRoles,
  });
});

// PATCH /api/users/:id
router.patch('/:id', requirePermission('users.update'), async (req, res) => {
  // Hedef kullanıcı bu firmaya ait olmalı
  const targetUser = await User.findOne({
    _id: req.params.id,
    'companyRoles.tenantId': req.tenantId,
  });
  if (!targetUser) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });

  const allowed = ['name', 'isActive'];
  const updates = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));

  if (req.body.roleId) {
    await User.findByIdAndUpdate(req.params.id, {
      $set: { 'companyRoles.$[el].roleId': req.body.roleId },
    }, {
      arrayFilters: [{ 'el.tenantId': req.tenantId }],
    });
  }

  const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true })
    .select('-passwordHash -refreshTokens -passwordResetToken -passwordResetExpires');
  if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
  res.json(user);
});

module.exports = router;
