const jwt = require('jsonwebtoken');
const { jwt: cfg } = require('../config/env');

const signAccess = (userId) =>
  jwt.sign({ userId }, cfg.secret, { expiresIn: cfg.expiresIn });

const signRefresh = (userId) =>
  jwt.sign({ userId }, cfg.refreshSecret, { expiresIn: cfg.refreshExpiresIn });

const verifyRefresh = (token) =>
  jwt.verify(token, cfg.refreshSecret);

module.exports = { signAccess, signRefresh, verifyRefresh };
