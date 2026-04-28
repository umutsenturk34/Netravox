const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  label: String,
  url: String,
  pageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Page', default: null },
  target: { type: String, enum: ['_self', '_blank'], default: '_self' },
  order: { type: Number, default: 0 },
  children: { type: mongoose.Schema.Types.Mixed, default: [] },
}, { _id: false });

const navigationMenuSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  name: { type: String, required: true },
  language: { type: String, default: 'tr' },
  items: [menuItemSchema],
}, { timestamps: true });

navigationMenuSchema.index({ tenantId: 1, name: 1, language: 1 });

module.exports = mongoose.model('NavigationMenu', navigationMenuSchema);
