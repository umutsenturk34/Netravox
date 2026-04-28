const rateLimit = require('express-rate-limit');

// Login: 10 deneme / 15 dakika
exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Çok fazla deneme. 15 dakika sonra tekrar deneyin.' },
  skipSuccessfulRequests: true,
});

// Genel API: 200 istek / dakika (panel kullanımı için yeterli)
exports.apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'İstek limiti aşıldı. Bir dakika sonra tekrar deneyin.' },
});
