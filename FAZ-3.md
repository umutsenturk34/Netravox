# Faz 3 — CMS Panel MVP Frontend

**Tahmini süre:** 3–4 hafta  
**Durum:** Tamamlandı ✅

## Hedef

React + Tailwind ile CMS panelinin MVP ekranlarını geliştirmek; tüm ekranlar light/dark mode uyumlu, Türkçe arayüzle ve RBAC'a göre render edilmiş olmalı.

## Yapılacaklar

### Temel Altyapı
- [x] React projesi kurulumu (Vite)
- [x] Tailwind CSS v4 yapılandırması + design token entegrasyonu (`@theme` block, CSS custom properties)
- [x] Light / dark mode geçiş mekanizması (`ThemeContext`, `.dark` class toggle, localStorage)
- [x] React Router — protected routes + role-based UI rendering
- [x] API client (axios) + auth token yönetimi (interceptor, auto-refresh on 401)
- [x] Toast / Notification sistemi (`ToastContext` — success/error/info, 3.5s auto-dismiss)
- [x] Global Modal bileşeni (ESC + backdrop close, size variants)

### Layout Bileşenleri
- [x] Sidebar (rol bazlı menü öğeleri — super admin bölümü)
- [x] Topbar (firma seçici dropdown, kullanıcı bilgisi, theme switcher, logout)
- [x] EmptyState bileşeni
- [x] Skeleton / TableSkeleton bileşeni
- [x] Button (primary/secondary/danger/ghost, sm/md/lg)
- [x] Input, Textarea, Select (16px font-size zorunlu)

### Ekranlar
- [x] Login
- [x] Dashboard (sayfa sayısı, yeni rezervasyon, medya özet kartları)
- [x] Firma yönetimi listesi (super admin only)
- [x] Firma Ayarları (ad, domain, sektör, marka renkleri, logo URL)
- [x] Kullanıcı yönetimi (liste + rol görüntüleme)
- [x] Sayfa listeleme (durum badge'leri: Taslak/Yayında/Arşiv, yayınla/taslağa al aksiyonları)
- [x] Sayfa oluşturma / düzenleme (TR/EN sekme, slug otomatik, şablon seçimi, SEO alanları)
- [x] Navigasyon menü yönetimi (menü oluşturma, öğe ekleme/düzenleme/silme)
- [x] Medya kütüphanesi (grid görünüm, yükleme, arşivleme)
- [x] SEO yönetimi (meta title/description TR+EN, OG ayarları)
- [x] Dil ayarları (aktif diller listesi, dil ekleme/kaldırma)
- [x] Form gönderileri listesi (filtre, durum güncelleme, detay modal)
- [x] Restoran: kategori yönetimi (ekleme/düzenleme/silme modal)
- [x] Restoran: ürün yönetimi (modal — isim TR/EN, açıklama, fiyat, para birimi, kategori, alerjen)
- [x] Rezervasyon talepleri (durum yönetimi: new/seen/confirmed/rejected/cancelled)

## Tamamlanma Kriteri

- [x] Tüm MVP ekranları light ve dark modda hatasız görünüyor
- [x] RBAC: Company Admin yalnızca kendi ekranlarına erişiyor, Super Admin hepsine (sidebar + PrivateRoute)
- [x] Türkçe arayüzde İngilizce metin karışmıyor
- [x] Input font-size ≥ 16px her form alanında

## Dosya Yapısı

```
frontend/src/
├── api/client.js              — axios instance + interceptors
├── context/
│   ├── AuthContext.jsx        — user, activeTenantId, login, logout, switchTenant
│   ├── ThemeContext.jsx        — light/dark toggle
│   └── ToastContext.jsx        — toast.success/error/info
├── components/
│   ├── layout/
│   │   ├── PanelLayout.jsx
│   │   ├── Sidebar.jsx
│   │   └── Topbar.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── EmptyState.jsx
│       ├── Input.jsx           — Input, Textarea, Select
│       ├── Modal.jsx
│       └── Skeleton.jsx        — Skeleton, TableSkeleton
└── pages/
    ├── LoginPage.jsx
    ├── DashboardPage.jsx
    ├── PagesListPage.jsx
    ├── PageEditorPage.jsx      — create + edit (şablon, TR/EN, SEO)
    ├── MediaPage.jsx
    ├── RestaurantMenuPage.jsx  — kategoriler + ürünler + modal'lar
    ├── ReservationsPage.jsx
    ├── FormsPage.jsx
    ├── SeoPage.jsx
    ├── MenusPage.jsx
    ├── CompanySettingsPage.jsx
    ├── LanguagesPage.jsx
    ├── CompaniesPage.jsx
    └── UsersPage.jsx
```

## Bağlantılı Dosyalar

- [DESIGN.md](./DESIGN.md) — tüm token, bileşen spec ve layout kararları
- [FAZ-2.md](./FAZ-2.md) — tüketilen API endpoint'leri
- [FAZ-4.md](./FAZ-4.md) — bu panelden yönetilecek web sitesi
