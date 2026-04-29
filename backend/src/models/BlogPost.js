const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
  title: {
    tr: { type: String, required: true },
    en: { type: String, default: null },
  },
  slug: { type: String, required: true },
  excerpt: {
    tr: { type: String, default: null },
    en: { type: String, default: null },
  },
  content: {
    tr: { type: String, default: null },
    en: { type: String, default: null },
  },
  coverImage: { type: String, default: null },
  tags: { type: [String], default: [] },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  publishedAt: { type: Date, default: null },
  author: { type: String, default: null },
  seo: {
    metaTitle: { tr: { type: String, default: null }, en: { type: String, default: null } },
    metaDesc:  { tr: { type: String, default: null }, en: { type: String, default: null } },
    ogImage:    { type: String, default: null },
    canonicalUrl: { type: String, default: null },
  },
}, { timestamps: true });

schema.index({ tenantId: 1, slug: 1 }, { unique: true });
schema.index({ tenantId: 1, status: 1, publishedAt: -1 });

module.exports = mongoose.model('BlogPost', schema);
