const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  width: { type: Number, default: null },
  height: { type: Number, default: null },
  storageProvider: { type: String, required: true },
  storageKey: { type: String, required: true },
  url: { type: String, required: true },
  thumbnailUrl: { type: String, default: null },
  alt: { tr: String, en: String },
  caption: { tr: String, en: String },
  usedInPages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }],
  isArchived: { type: Boolean, default: false },
  archivedAt: { type: Date, default: null },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

mediaSchema.index({ tenantId: 1, isArchived: 1 });

module.exports = mongoose.model('Media', mediaSchema);
