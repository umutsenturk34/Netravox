const mongoose = require('mongoose');

const redirectSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  type: { type: Number, enum: [301, 302], default: 301 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

redirectSchema.index({ tenantId: 1, from: 1 });

module.exports = mongoose.model('Redirect', redirectSchema);
