const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  domain: { type: String, default: null },
  subdomain: { type: String, default: null },
  sector: {
    type: String,
    enum: ['restaurant', 'dental', 'beauty', 'hotel', 'service', 'other'],
    default: 'other',
  },
  branding: {
    logoLight: { type: String, default: null },
    logoDark: { type: String, default: null },
    favicon: { type: String, default: null },
    primaryColor: { type: String, default: '#2563EB' },
    secondaryColor: { type: String, default: '#0F766E' },
    accentColor: { type: String, default: '#F59E0B' },
  },
  settings: {
    defaultLanguage: { type: String, default: 'tr' },
    supportedLanguages: { type: [String], default: ['tr'] },
    timezone: { type: String, default: 'Europe/Istanbul' },
    themeMode: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
  },
  contact: {
    phone: { type: String, default: null },
    email: { type: String, default: null },
    address: { type: String, default: null },
    city: { type: String, default: null },
    country: { type: String, default: 'Türkiye' },
    mapUrl: { type: String, default: null },
  },
  description: {
    tr: { type: String, default: null },
    en: { type: String, default: null },
  },
  workingHours: {
    type: [{ days: String, hours: String }],
    default: [],
  },
  socialLinks: {
    instagram: { type: String, default: null },
    facebook: { type: String, default: null },
    twitter: { type: String, default: null },
    youtube: { type: String, default: null },
    tiktok: { type: String, default: null },
  },
  content: {
    heroTitle: { tr: { type: String, default: null }, en: { type: String, default: null } },
    heroImage: { type: String, default: null },
    homeImages: { type: [String], default: [] },
    testimonial: {
      quote: { tr: { type: String, default: null }, en: { type: String, default: null } },
      author: { type: String, default: null },
      role: { type: String, default: null },
    },
    aboutHeroImage: { type: String, default: null },
    aboutParagraph2: { tr: { type: String, default: null }, en: { type: String, default: null } },
    aboutParagraph3: { tr: { type: String, default: null }, en: { type: String, default: null } },
    aboutImages: { type: [String], default: [] },
    values: {
      type: [{
        icon: { type: String, default: '🌿' },
        title: { tr: String, en: String },
        description: { tr: String, en: String },
      }],
      default: [],
    },
    menuSubtitle: { tr: { type: String, default: null }, en: { type: String, default: null } },
    reservationSubtitle: { tr: { type: String, default: null }, en: { type: String, default: null } },
    reservationSlots: { type: [String], default: [] },
  },
  emailSettings: {
    senderName: { type: String, default: null },
    replyTo: { type: String, default: null },
    accentColor: { type: String, default: '#8B1A1A' },
    phone: { type: String, default: null },
    location: { type: String, default: null },
    footerQuote: { type: String, default: null },
    confirmedSubject: { type: String, default: null },
    confirmedMessage: { type: String, default: null },
    rejectedSubject: { type: String, default: null },
    rejectedMessage: { type: String, default: null },
  },
  integrations: {
    analyticsPropertyId: { type: String, default: null }, // GA4 numeric property ID (örn: 323456789)
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
