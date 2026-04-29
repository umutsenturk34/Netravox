const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
  question: {
    tr: { type: String, required: true },
    en: { type: String, default: null },
  },
  answer: {
    tr: { type: String, required: true },
    en: { type: String, default: null },
  },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

schema.index({ tenantId: 1, order: 1 });

module.exports = mongoose.model('Faq', schema);
