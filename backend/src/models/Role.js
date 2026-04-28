const mongoose = require('mongoose');

const SYSTEM_ROLES = [
  'super_admin', 'agency_admin', 'company_admin',
  'seo_specialist', 'content_editor', 'media_manager',
  'reservation_manager', 'viewer',
];

const roleSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', default: null },
  name: { type: String, required: true },
  label: { tr: String, en: String },
  permissions: [String],
  isSystem: { type: Boolean, default: false },
}, { timestamps: true });

roleSchema.index({ tenantId: 1, name: 1 });

module.exports = mongoose.model('Role', roleSchema);
module.exports.SYSTEM_ROLES = SYSTEM_ROLES;
