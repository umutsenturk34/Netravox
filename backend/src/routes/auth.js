const crypto = require('crypto');
const router = require('express').Router();
const User = require('../models/User');
const { signAccess, signRefresh, verifyRefresh } = require('../utils/jwt');
const { authenticate } = require('../middleware/auth');
const { loginLimiter, publicFormLimiter } = require('../middleware/rateLimit');
const { validate, strongPassword } = require('../middleware/validate');
const { sendPasswordReset } = require('../services/email');

// POST /api/auth/login
router.post('/login', loginLimiter, validate('login'), async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, isActive: true }).populate('companyRoles.roleId');
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Email veya şifre hatalı' });
  }

  const accessToken = signAccess(user._id);
  const refreshToken = signRefresh(user._id);

  user.refreshTokens.push(refreshToken);
  user.lastLoginAt = new Date();
  if (user.refreshTokens.length > 5) user.refreshTokens.shift();
  await user.save();

  res.json({
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isSuperAdmin: user.isSuperAdmin,
      companyRoles: user.companyRoles,
    },
  });
});

// POST /api/auth/refresh
router.post('/refresh', publicFormLimiter, async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: 'Refresh token gerekli' });

  let decoded;
  try {
    decoded = verifyRefresh(refreshToken);
  } catch {
    return res.status(401).json({ message: 'Geçersiz refresh token' });
  }

  const user = await User.findById(decoded.userId);
  if (!user || !user.refreshTokens.includes(refreshToken)) {
    return res.status(401).json({ message: 'Geçersiz refresh token' });
  }

  const newAccess = signAccess(user._id);
  const newRefresh = signRefresh(user._id);

  // Token rotasyonu — eski token çıkar, yeni token ekle
  user.refreshTokens = user.refreshTokens.filter((t) => t !== refreshToken);
  user.refreshTokens.push(newRefresh);
  await user.save();

  res.json({ accessToken: newAccess, refreshToken: newRefresh });
});

// POST /api/auth/logout
router.post('/logout', authenticate, async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken) {
    req.user.refreshTokens = req.user.refreshTokens.filter((t) => t !== refreshToken);
    await User.findByIdAndUpdate(req.user._id, { refreshTokens: req.user.refreshTokens });
  }
  res.json({ message: 'Çıkış yapıldı' });
});

// GET /api/auth/me
router.get('/me', authenticate, (req, res) => {
  res.json(req.user);
});

// PATCH /api/auth/profile
router.patch('/profile', authenticate, async (req, res) => {
  const { name, currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);

  if (name) {
    if (typeof name !== 'string' || name.length < 2) {
      return res.status(400).json({ message: 'Ad en az 2 karakter olmalı' });
    }
    user.name = name.trim();
  }

  if (newPassword) {
    if (!currentPassword) return res.status(400).json({ message: 'Mevcut şifre gerekli' });
    const ok = await user.comparePassword(currentPassword);
    if (!ok) return res.status(400).json({ message: 'Mevcut şifre hatalı' });

    const parsed = strongPassword.safeParse(newPassword);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0]?.message });
    }
    user.passwordHash = await User.hashPassword(newPassword);
    user.refreshTokens = [];
  }

  await user.save();
  res.json({ id: user._id, name: user.name, email: user.email });
});

// POST /api/auth/forgot-password
router.post('/forgot-password', publicFormLimiter, async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email gerekli' });

  const user = await User.findOne({ email, isActive: true });
  if (user) {
    const rawToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 saat
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${rawToken}`;
    try {
      await sendPasswordReset({ to: user.email, name: user.name, resetUrl });
    } catch (err) {
      console.error('Email gönderilemedi:', err.message);
    }
  }

  // Kullanıcı bulunamasa bile aynı mesaj (email enumeration önleme)
  res.json({ message: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.' });
});

// POST /api/auth/reset-password
router.post('/reset-password', validate('resetPassword'), async (req, res) => {
  const { token, password } = req.body;

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
    isActive: true,
  });

  if (!user) return res.status(400).json({ message: 'Geçersiz veya süresi dolmuş bağlantı' });

  user.passwordHash = await User.hashPassword(password);
  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  user.refreshTokens = [];
  await user.save();

  res.json({ message: 'Şifre başarıyla güncellendi. Yeni şifrenizle giriş yapabilirsiniz.' });
});

module.exports = router;
