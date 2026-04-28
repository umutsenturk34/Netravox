require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  storage: {
    provider: process.env.STORAGE_PROVIDER || 's3',
    bucket: process.env.STORAGE_BUCKET,
    region: process.env.STORAGE_REGION || 'eu-central-1',
    accessKey: process.env.STORAGE_ACCESS_KEY,
    secretKey: process.env.STORAGE_SECRET_KEY,
    endpoint: process.env.STORAGE_ENDPOINT || null,
    cdnUrl: process.env.STORAGE_CDN_URL,
  },
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
};
