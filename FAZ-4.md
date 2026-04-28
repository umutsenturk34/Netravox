# Faz 4 — CMS Panel Tamamlama

**Tahmini süre:** 1 hafta  
**Durum:** Tamamlandı ✅

> Not: Gusto Kartepe web sitesi ayrı bir LLM ile geliştirilecek. Bu faz yalnızca CMS panelinin eksik özelliklerini kapsar.

## Yapılanlar

### Backend
- [x] `GET /api/roles` — sistem ve firma rollerini listeler (user create/edit dropdown için)
- [x] `app.js` — `/api/roles` route eklendi

### Frontend
- [x] **UsersPage.jsx** — tam CRUD: kullanıcı oluşturma (ad, email, şifre, rol), düzenleme (ad, rol değiştirme), aktif/pasif toggle; rol listesi `/api/roles`'dan dinamik çekiliyor
- [x] **RedirectsPage.jsx** — redirect yönetimi: kaynak/hedef URL, 301/302 seçimi, aktif/pasif toggle, ekleme/düzenleme/silme
- [x] **SeoPage.jsx** — 3 sekmeli yapı (Genel, robots.txt, Özel Kodlar); robots.txt editörü; OG görseli, Meta Pixel ID alanları eklendi; useToast entegre edildi
- [x] **App.jsx** — `/redirects` route eklendi
- [x] **Sidebar.jsx** — Redirect linki eklendi

## Panel Ekran Envanteri (tam liste)

| Ekran | Sayfa | Durum |
|-------|-------|-------|
| Login | LoginPage | ✅ |
| Dashboard | DashboardPage | ✅ |
| Sayfalar (liste) | PagesListPage | ✅ |
| Sayfa Oluştur/Düzenle | PageEditorPage | ✅ |
| Medya Kütüphanesi | MediaPage | ✅ |
| Navigasyon Menüleri | MenusPage | ✅ |
| Restoran Menüsü | RestaurantMenuPage | ✅ |
| Rezervasyonlar | ReservationsPage | ✅ |
| Form Gönderileri | FormsPage | ✅ |
| SEO Ayarları | SeoPage | ✅ |
| Redirect Yönetimi | RedirectsPage | ✅ |
| Dil Ayarları | LanguagesPage | ✅ |
| Kullanıcılar | UsersPage | ✅ |
| Firma Ayarları | CompanySettingsPage | ✅ |
| Firmalar (Super Admin) | CompaniesPage | ✅ |

## Bağlantılı Dosyalar

- [FAZ-3.md](./FAZ-3.md) — temel frontend altyapısı ve ekranlar
- [FAZ-5.md](./FAZ-5.md) — deployment ve test
