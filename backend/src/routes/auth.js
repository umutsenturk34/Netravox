const router = require('express').Router();
const User = require('../models/User');
const { signAccess, signRefresh, verifyRefresh, signReset, verifyReset } = require('../utils/jwt');
const { authenticate } = require('../middleware/auth');
const { loginLimiter } = require('../middleware/rateLimit');
const { sendPasswordReset } = require('../services/email');

// POST /api/auth/login
router.post('/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email ve şifre gerekli' });
  }

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
router.post('/refresh', async (req, res) => {
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

// PATCH /api/auth/profile — kendi adını veya şifresini güncelle
router.patch('/profile', authenticate, async (req, res) => {
  const { name, currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);

  if (name) user.name = name;

  if (newPassword) {
    if (!currentPassword) return res.status(400).json({ message: 'Mevcut şifre gerekli' });
    const ok = await user.comparePassword(currentPassword);
    if (!ok) return res.status(400).json({ message: 'Mevcut şifre hatalı' });
    if (newPassword.length < 8) return res.status(400).json({ message: 'Yeni şifre en az 8 karakter olmalı' });
    user.passwordHash = await User.hashPassword(newPassword);
    user.refreshTokens = []; // diğer oturumları sonlandır
  }

  await user.save();
  res.json({ id: user._id, name: user.name, email: user.email });
});

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email gerekli' });

  // Kullanıcı bulunamasa bile aynı mesajı dön (güvenlik: email enumeration önleme)
  const user = await User.findOne({ email, isActive: true });
  if (user) {
    const pwFingerprint = user.passwordHash.slice(0, 10);
    const token = signReset(user._id, pwFingerprint);
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

    try {
      await sendPasswordReset({ to: user.email, name: user.name, resetUrl });
    } catch (err) {
      console.error('Email gönderilemedi:', err.message);
    }
  }

  res.json({ message: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.' });
});

// POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).json({ message: 'Token ve şifre gerekli' });
  if (password.length < 8) return res.status(400).json({ message: 'Şifre en az 8 karakter olmalı' });

  let decoded;
  try {
    decoded = verifyReset(token);
  } catch {
    return res.status(400).json({ message: 'Geçersiz veya süresi dolmuş bağlantı' });
  }

  const user = await User.findById(decoded.userId);
  if (!user || !user.isActive) return res.status(400).json({ message: 'Geçersiz bağlantı' });

  // Token'daki parmak izi mevcut hash ile eşleşmeli (tek kullanımlık garantisi)
  if (user.passwordHash.slice(0, 10) !== decoded.pwf) {
    return res.status(400).json({ message: 'Bu bağlantı zaten kullanılmış' });
  }

  user.passwordHash = await User.hashPassword(password);
  user.refreshTokens = []; // Tüm aktif oturumları sonlandır
  await user.save();

  res.json({ message: 'Şifre başarıyla güncellendi. Yeni şifrenizle giriş yapabilirsiniz.' });
});

module.exports = router;
