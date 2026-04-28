const mongoose = require('mongoose');
const { mongoUri } = require('./env');

const connect = async () => {
  await mongoose.connect(mongoUri);
  console.log('MongoDB connected');
};

module.exports = { connect };
