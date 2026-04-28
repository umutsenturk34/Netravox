const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  name: { tr: { type: String, required: true }, en: String },
  description: { tr: String, en: String },
  image: { type: String, default: null },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

categorySchema.index({ tenantId: 1, isActive: 1, order: 1 });

module.exports = mongoose.model('RestaurantMenuCategory', categorySchema);
