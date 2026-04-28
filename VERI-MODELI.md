# CMS Paneli — Veri Modeli Taslağı (MongoDB)

> Faz 0 çıktısı. Tüm koleksiyonlarda `tenantId` zorunludur (`super_admin` erişimleri hariç).
> Bu taslak Faz 2 (backend) geliştirmesinde referans alınır.

---

## Genel Kurallar

- Her belgede `tenantId` (ObjectId → companies) zorunlu
- Timestamps: tüm koleksiyonlarda `createdAt`, `updatedAt` (Mongoose `timestamps: true`)
- Soft delete: kritik koleksiyonlarda `deletedAt` alanı (fiziksel silme yerine)
- Çok dilli içerik: `{ tr: "...", en: "..." }` yapısı

---

## Koleksiyonlar

### `companies` — Firmalar (Tenant)

```js
{
  _id: ObjectId,
  name: String,               // "Gusto Kartepe"
  slug: String,               // "gusto-kartepe" (unique)
  domain: String,             // "gustokartepe.com" (opsiyonel)
  subdomain: String,          // "gusto" → gusto.panel.com
  sector: String,             // "restaurant" | "dental" | "beauty" | "hotel" | "service"
  branding: {
    logoLight: String,        // media URL
    logoDark: String,
    favicon: String,
    primaryColor: String,     // "#hex"
    secondaryColor: String,
    accentColor: String,
  },
  settings: {
    defaultLanguage: String,  // "tr"
    supportedLanguages: [String], // ["tr", "en"]
    timezone: String,
    themeMode: String,        // "light" | "dark" | "system"
  },
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date,
}
```

### `users`

```js
{
  _id: ObjectId,
  name: String,
  email: String,              // unique
  passwordHash: String,
  isActive: Boolean,
  isSuperAdmin: Boolean,      // true → tüm firmalara erişir
  companyRoles: [{
    tenantId: ObjectId,       // → companies
    roleId: ObjectId,         // → roles
  }],
  lastLoginAt: Date,
  createdAt: Date,
  updatedAt: Date,
}
```

### `roles`

```js
{
  _id: ObjectId,
  tenantId: ObjectId,         // null → sistem rolü (super_admin)
  name: String,               // "content_editor"
  label: { tr: String, en: String },
  permissions: [String],      // ["pages.create", "pages.publish", "media.upload"]
  isSystem: Boolean,          // true → silinemez
  createdAt: Date,
  updatedAt: Date,
}
```

### `pages`

```js
{
  _id: ObjectId,
  tenantId: ObjectId,
  template: String,           // "home" | "about" | "menu" | "gallery" | "contact" | "reservation" | "generic" | "legal"
  status: String,             // "draft" | "published" | "archived"
  slug: { tr: String, en: String },
  title: { tr: String, en: String },
  content: {                  // template'e göre değişen alanlar
    hero: { title: { tr: String, en: String }, subtitle: { tr: String, en: String }, image: String },
    body: { tr: String, en: String },   // rich text (HTML)
    // ... template'e özgü alanlar
  },
  featuredImage: String,      // media URL
  seo: {
    title: { tr: String, en: String },
    description: { tr: String, en: String },
    canonical: String,
    robots: String,           // "index,follow"
    ogImage: String,
    schema: Object,           // JSON-LD
  },
  publishedAt: Date,
  createdBy: ObjectId,        // → users
  updatedBy: ObjectId,
  createdAt: Date,
  updatedAt: Date,
}
```

### `navigationMenus`

```js
{
  _id: ObjectId,
  tenantId: ObjectId,
  name: String,               // "main-menu" | "footer-menu"
  language: String,           // "tr" | "en"
  items: [{
    label: String,
    url: String,
    pageId: ObjectId,         // → pages (opsiyonel)
    target: String,           // "_self" | "_blank"
    order: Number,
    children: [/* recursive */],
  }],
  createdAt: Date,
  updatedAt: Date,
}
```

### `media`

```js
{
  _id: ObjectId,
  tenantId: ObjectId,
  filename: String,
  originalName: String,
  mimeType: String,
  size: Number,               // bytes
  width: Number,
  height: Number,
  storageProvider: String,    // "s3" | "r2" | "backblaze"
  storageKey: String,         // "/{tenantId}/{mediaId}/filename.webp"
  url: String,                // CDN URL
  thumbnailUrl: String,
  alt: { tr: String, en: String },
  caption: { tr: String, en: String },
  usedInPages: [ObjectId],    // → pages
  isArchived: Boolean,
  archivedAt: Date,
  uploadedBy: ObjectId,       // → users
  createdAt: Date,
  updatedAt: Date,
}
```

### `seoSettings` — Firma bazlı global SEO

```js
{
  _id: ObjectId,
  tenantId: ObjectId,
  siteName: { tr: String, en: String },
  defaultMetaTitle: { tr: String, en: String },
  defaultMetaDescription: { tr: String, en: String },
  defaultOgImage: String,
  googleAnalyticsId: String,
  googleTagManagerId: String,
  metaPixelId: String,
  searchConsoleVerification: String,
  robotsTxt: String,
  customScripts: [{ position: String, code: String }],
  createdAt: Date,
  updatedAt: Date,
}
```

### `redirects`

```js
{
  _id: ObjectId,
  tenantId: ObjectId,
  from: String,               // "/eski-sayfa"
  to: String,                 // "/yeni-sayfa"
  type: Number,               // 301 | 302
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date,
}
```

### `languages`

```js
{
  _id: ObjectId,
  tenantId: ObjectId,
  code: String,               // "tr" | "en"
  label: String,              // "Türkçe"
  isDefault: Boolean,
  isActive: Boolean,
}
```

---

## Restoran Modülü

### `restaurantMenuCategories`

```js
{
  _id: ObjectId,
  tenantId: ObjectId,
  name: { tr: String, en: String },
  description: { tr: String, en: String },
  image: String,              // media URL
  order: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date,
}
```

### `restaurantMenuItems`

```js
{
  _id: ObjectId,
  tenantId: ObjectId,
  categoryId: ObjectId,       // → restaurantMenuCategories
  name: { tr: String, en: String },
  description: { tr: String, en: String },
  price: Number,
  currency: String,           // "TRY"
  image: String,              // media URL
  allergens: [String],        // ["gluten", "dairy", "nuts"]
  isFeatured: Boolean,
  isActive: Boolean,
  order: Number,
  createdAt: Date,
  updatedAt: Date,
}
```

### `reservations`

```js
{
  _id: ObjectId,
  tenantId: ObjectId,
  fullName: String,
  phone: String,
  email: String,              // opsiyonel
  date: Date,
  time: String,               // "19:30"
  partySize: Number,
  note: String,
  status: String,             // "new" | "seen" | "confirmed" | "rejected" | "cancelled"
  statusUpdatedBy: ObjectId,  // → users
  statusUpdatedAt: Date,
  kvkkConsent: Boolean,       // KVKK onayı zorunlu
  createdAt: Date,
  updatedAt: Date,
}
```

---

## Form / Lead Modülü

### `formSubmissions`

```js
{
  _id: ObjectId,
  tenantId: ObjectId,
  formType: String,           // "contact" | "reservation" | "custom"
  fields: Object,             // dinamik form alanları
  status: String,             // "new" | "seen" | "replied"
  kvkkConsent: Boolean,
  ipAddress: String,
  submittedAt: Date,
  createdAt: Date,
}
```

---

## Index Önerileri

```js
// Tenant izolasyonu — tüm sorgular tenantId ile başlar
companies:          { slug: 1 (unique) }
users:              { email: 1 (unique) }
pages:              { tenantId: 1, status: 1 }, { tenantId: 1, "slug.tr": 1 }
media:              { tenantId: 1, isArchived: 1 }
reservations:       { tenantId: 1, status: 1 }, { tenantId: 1, date: 1 }
restaurantMenuItems: { tenantId: 1, categoryId: 1, isActive: 1 }
redirects:          { tenantId: 1, from: 1 }
formSubmissions:    { tenantId: 1, status: 1 }
```
