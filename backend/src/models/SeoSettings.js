const mongoose = require('mongoose');

const seoSettingsSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, unique: true },
  siteName: { tr: String, en: String },
  defaultMetaTitle: { tr: String, en: String },
  defaultMetaDescription: { tr: String, en: String },
  defaultOgImage: { type: String, default: null },
  googleAnalyticsId: { type: String, default: null },
  googleTagManagerId: { type: String, default: null },
  metaPixelId: { type: String, default: null },
  searchConsoleVerification: { type: String, default: null },
  robotsTxt: { type: String, default: 'User-agent: *\nAllow: /' },
  customScripts: [{
    position: { type: String, enum: ['head', 'body_start', 'body_end'] },
    code: String,
  }],
}, { timestamps: true });

module.exports = mongoose.model('SeoSettings', seoSettingsSchema);
