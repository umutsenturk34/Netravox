const mongoose = require('mongoose');

const i18n = (type = String) => ({ tr: type, en: type });

const pageSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  template: {
    type: String,
    enum: ['home', 'about', 'menu', 'gallery', 'contact', 'reservation', 'generic', 'legal'],
    required: true,
  },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  slug: i18n(),
  title: i18n(),
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  featuredImage: { type: String, default: null },
  seo: {
    title: i18n(),
    description: i18n(),
    canonical: { type: String, default: null },
    robots: { type: String, default: 'index,follow' },
    ogImage: { type: String, default: null },
    schema: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  publishedAt: { type: Date, default: null },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

pageSchema.index({ tenantId: 1, status: 1 });
pageSchema.index({ tenantId: 1, 'slug.tr': 1 });
pageSchema.index({ tenantId: 1, 'slug.en': 1 });

module.exports = mongoose.model('Page', pageSchema);
