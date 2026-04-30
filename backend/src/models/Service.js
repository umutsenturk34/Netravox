const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  name: { tr: { type: String, required: true }, en: { type: String, default: null } },
  description: { tr: { type: String, default: null }, en: { type: String, default: null } },
  icon: { type: String, default: '🦷' },
  image: { type: String, default: null },
  price: { type: Number, default: null },
  currency: { type: String, default: 'TRY' },
  fullDescription: { tr: { type: String, default: null }, en: { type: String, default: null } },
  material: { tr: { type: String, default: null }, en: { type: String, default: null } },
  sizes: {
    type: [{ name: { type: String }, inStock: { type: Boolean, default: true } }],
    default: [],
  },
  sizeGuide: { tr: { type: String, default: null }, en: { type: String, default: null } },
  sizeGuideImage: { type: String, default: null },
  category: { type: String, default: null },
  sku: { type: String, default: null },
  duration: { type: String, default: null },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
