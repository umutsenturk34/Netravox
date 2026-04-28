const jwt = require('jsonwebtoken');
const { jwt: cfg } = require('../config/env');

const signAccess = (userId) =>
  jwt.sign({ userId }, cfg.secret, { expiresIn: cfg.expiresIn });

const signRefresh = (userId) =>
  jwt.sign({ userId }, cfg.refreshSecret, { expiresIn: cfg.refreshExpiresIn });

const verifyRefresh = (token) =>
  jwt.verify(token, cfg.refreshSecret);

// Reset token — kullanıcının mevcut passwordHash'inin ilk 10 karakteri dahil edilir.
// Bu sayede şifre değiştikten sonra token geçersiz kalır (tek kullanımlık).
const signReset = (userId, pwFingerprint) =>
  jwt.sign({ userId, pwf: pwFingerprint }, cfg.secret, { expiresIn: '1h' });

const verifyReset = (token) =>
  jwt.verify(token, cfg.secret);

module.exports = { signAccess, signRefresh, verifyRefresh, signReset, verifyReset };
