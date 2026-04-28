const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'RestaurantMenuCategory', required: true },
  name: { tr: { type: String, required: true }, en: String },
  description: { tr: String, en: String },
  price: { type: Number, default: 0 },
  currency: { type: String, default: 'TRY' },
  image: { type: String, default: null },
  allergens: [String],
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

menuItemSchema.index({ tenantId: 1, categoryId: 1, isActive: 1 });

module.exports = mongoose.model('RestaurantMenuItem', menuItemSchema);
