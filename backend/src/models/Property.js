const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  title: { tr: { type: String, required: true }, en: { type: String, default: null } },
  description: { tr: { type: String, default: null }, en: { type: String, default: null } },
  price: { type: Number, default: null },
  currency: { type: String, default: 'TRY' },
  type: { type: String, enum: ['sale', 'rent'], default: 'sale' },
  propertyType: {
    type: String,
    enum: ['apartment', 'house', 'villa', 'office', 'land', 'commercial', 'other'],
    default: 'apartment',
  },
  size: { type: Number, default: null },
  rooms: { type: Number, default: null },
  bathrooms: { type: Number, default: null },
  floor: { type: Number, default: null },
  totalFloors: { type: Number, default: null },
  buildYear: { type: Number, default: null },
  location: {
    address: { type: String, default: null },
    district: { type: String, default: null },
    city: { type: String, default: null },
  },
  images: { type: [String], default: [] },
  features: { type: [String], default: [] },
  status: { type: String, enum: ['available', 'sold', 'rented'], default: 'available' },
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
