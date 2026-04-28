require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { connect } = require('./config/database');
const { port, nodeEnv } = require('./config/env');
const { apiLimiter } = require('./middleware/rateLimit');

// Zorunlu env değişkeni kontrolü — eksikse başlamadan çöküyor
const REQUIRED_ENV = ['MONGODB_URI', 'JWT_SECRET', 'JWT_REFRESH_SECRET'];
const missing = REQUIRED_ENV.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`HATA: Eksik ortam değişkenleri: ${missing.join(', ')}`);
  process.exit(1);
}

const app = express();

app.set('trust proxy', 1);
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'none'"],
      connectSrc: ["'self'"],
    },
  },
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

const allowedOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((u) => u.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // Production: origin zorunlu
    // Development: origin yoksa (curl, Postman) izin ver
    if (!origin && nodeEnv !== 'production') return cb(null, true);
    if (origin && allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`CORS: ${origin || 'no-origin'} izin verilmedi`));
  },
  credentials: true,
}));
app.use(express.json({ limit: '2mb' }));
app.use(morgan(nodeEnv === 'production' ? 'combined' : 'dev'));

// Local geliştirme: yüklenen dosyaları statik sun
const { isLocal, UPLOADS_DIR } = require('./services/storage');
if (isLocal) {
  app.use('/uploads', express.static(UPLOADS_DIR));
  console.log('Storage: local disk (geliştirme modu)');
}

// Health check — deployment platformları için
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', env: nodeEnv, ts: new Date().toISOString() });
});

// Genel rate limit (tüm /api rotaları)
app.use('/api', apiLimiter);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/companies', require('./routes/companies'));
app.use('/api/users', require('./routes/users'));
app.use('/api/pages', require('./routes/pages'));
app.use('/api/media', require('./routes/media'));
app.use('/api/restaurant', require('./routes/restaurant'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/seo', require('./routes/seo'));
app.use('/api/menus', require('./routes/menus'));
app.use('/api/forms', require('./routes/forms'));
app.use('/api/languages', require('./routes/languages'));
app.use('/api/roles', require('./routes/roles'));
app.use('/api/services', require('./routes/services'));
app.use('/api/properties', require('./routes/properties'));
app.use('/api/public', require('./routes/public'));

// 404
app.use((_req, res) => res.status(404).json({ message: 'Endpoint bulunamadı' }));

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (nodeEnv !== 'production') console.error(err);
  res.status(err.status || 500).json({
    message: nodeEnv === 'production' ? 'Sunucu hatası' : (err.message || 'Sunucu hatası'),
  });
});

const start = async () => {
  await connect();
  app.listen(port, () => console.log(`API running on port ${port} [${nodeEnv}]`));
};

start();
