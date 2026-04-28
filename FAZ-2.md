# Faz 2 — Backend Temel Mimari

**Tahmini süre:** 2–3 hafta  
**Durum:** Bekliyor (Faz 1 tamamlanmadan başlanmaz)

## Hedef

Node.js + MongoDB üzerinde multi-tenant CMS API'sinin temel iskeletini kurmak; kimlik doğrulama, yetkilendirme ve veri izolasyonunu güvenli biçimde tesis etmek.

## Yapılacaklar

### Altyapı
- [x] Node.js + Express.js proje kurulumu
- [x] MongoDB Atlas bağlantısı ve Mongoose yapılandırması
- [x] Ortam değişkenleri yönetimi (`.env.example`)
- [x] Morgan loglama
- [ ] Swagger / OpenAPI dokümantasyon (post-MVP)

### Auth
- [x] JWT + refresh token auth sistemi
- [x] Şifre hashleme (bcryptjs)
- [x] Login / logout / token yenileme endpoint'leri
- [ ] Şifremi unuttum (e-posta entegrasyonu post-MVP)

### Multi-Tenant & RBAC
- [x] `companies` koleksiyonu ve tenant modeli
- [x] Her kayda `tenantId` zorunluluğu — middleware seviyesinde kontrol
- [x] Rol ve yetki modeli (8 sistem rolü)
- [x] RBAC middleware — `requirePermission()`

### Modeller (12 koleksiyon)
- [x] `users`
- [x] `roles`
- [x] `companies`
- [x] `pages` (dil bazlı içerik)
- [x] `media`
- [x] `navigationMenus`
- [x] `seoSettings`
- [x] `redirects`
- [x] `languages`
- [x] `restaurantMenuCategories`
- [x] `restaurantMenuItems`
- [x] `reservations`
- [x] `formSubmissions`

### Route'lar (11 grup)
- [x] `/api/auth` — login, refresh, logout, me
- [x] `/api/companies`
- [x] `/api/users`
- [x] `/api/pages`
- [x] `/api/media` — upload, archive, permanent delete
- [x] `/api/restaurant` — categories + items
- [x] `/api/reservations` — list + status update
- [x] `/api/seo` — settings + redirects
- [x] `/api/menus` — navigation menu CRUD
- [x] `/api/forms` — public submit + panel list
- [x] `/api/languages`

### Medya (S3-uyumlu adapter)
- [x] S3Client adapter (AWS S3 / Cloudflare R2 / Backblaze B2)
- [x] Firma bazlı key yapısı: `/{tenantId}/{uuid}/original.webp`
- [x] Dosya tipi ve boyut kontrolü (20 MB limit)
- [x] WebP dönüşümü + thumbnail üretimi (sharp)

### Seed
- [x] 8 sistem rolü
- [x] Gusto Kartepe firması
- [x] Super admin kullanıcısı

## Tamamlanma Kriteri

- [x] Tüm 11 route dosyası hatasız yükleniyor
- [ ] `.env` oluştur → `npm run seed` çalıştır → `npm run dev` ile API ayağa kaldır
- [ ] Postman / curl ile login endpoint'ini test et

## Başlatma

```bash
cp .env.example .env
# .env içine MONGODB_URI ve JWT_SECRET doldur
npm run seed
npm run dev
```

## Bağlantılı Dosyalar

- [BRIEF.md](./BRIEF.md) — kesin stack kararları ve kısıtlar
- [CLAUDE.md](./CLAUDE.md) — değişmez teknik kısıtlamalar
- [FAZ-3.md](./FAZ-3.md) — frontend bu API'yi tüketecek
