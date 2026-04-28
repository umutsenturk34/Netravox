const jwt = require('jsonwebtoken');
const { jwt: jwtConfig } = require('../config/env');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token gerekli' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    const user = await User.findById(decoded.userId).select('-passwordHash -refreshTokens');
    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Geçersiz kullanıcı' });
    }
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: 'Token geçersiz veya süresi dolmuş' });
  }
};

module.exports = { authenticate };
