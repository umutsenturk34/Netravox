# CMS Paneli — Rol ve Yetki Matrisi

> Faz 0 çıktısı. Bu dosya backend middleware ve frontend UI rendering için referans alınır.
> Her değişiklik CLAUDE.md'deki "Kesin Kararlar" ile çelişmemelidir.

---

## Roller

| Rol | Kısa Tanım |
|---|---|
| `super_admin` | Tüm firmaları ve sistemi yönetir |
| `agency_admin` | Ajans adına birden fazla firmayı yönetir |
| `company_admin` | Yalnızca kendi firmasını yönetir |
| `seo_specialist` | SEO alanlarını düzenler, içerik oluşturamaz |
| `content_editor` | Sayfa ve içerik oluşturur/düzenler |
| `media_manager` | Medya kütüphanesini yönetir |
| `reservation_manager` | Rezervasyon taleplerini görüntüler ve durum günceller |
| `viewer` | Yalnızca görüntüler, değişiklik yapamaz |

---

## Yetki Matrisi

Kısaltmalar: ✅ Tam erişim · 👁 Yalnızca görüntüleme · ✏️ Düzenleme (oluşturma yok) · ❌ Erişim yok · 🏢 Kendi firması

| Modül | super_admin | agency_admin | company_admin | seo_specialist | content_editor | media_manager | reservation_manager | viewer |
|---|---|---|---|---|---|---|---|---|
| **Firma yönetimi** | ✅ | 🏢 | 🏢 | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Kullanıcı yönetimi** | ✅ | 🏢 | 🏢 | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Rol yönetimi** | ✅ | 🏢 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Sayfa oluşturma** | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Sayfa düzenleme** | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | 👁 |
| **Sayfa yayınlama** | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Sayfa silme** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **SEO alanları** | ✅ | ✅ | ✅ | ✏️ | 👁 | ❌ | ❌ | 👁 |
| **Schema markup** | ✅ | ✅ | ✅ | ✏️ | ❌ | ❌ | ❌ | ❌ |
| **Redirect yönetimi** | ✅ | ✅ | ✅ | ✏️ | ❌ | ❌ | ❌ | ❌ |
| **Sitemap / robots.txt** | ✅ | ✅ | ✅ | ✏️ | ❌ | ❌ | ❌ | ❌ |
| **Medya yükleme** | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ |
| **Medya silme** | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Medya görüntüleme** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | 👁 |
| **Menü / navigasyon** | ✅ | ✅ | ✅ | ❌ | ✏️ | ❌ | ❌ | 👁 |
| **Restoran menüsü** | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | 👁 |
| **Rezervasyon görüntüleme** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | 👁 |
| **Rezervasyon durum güncelleme** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Form başvuruları (lead)** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | 👁 |
| **Dil ayarları** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Tema / marka ayarları** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Sistem ayarları** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## Tenant İzolasyonu Kuralları

- `super_admin` dışındaki tüm roller yalnızca kendi `tenantId`'lerine ait kayıtlara erişir
- `agency_admin` birden fazla firmaya atanabilir; her API isteğinde aktif `tenantId` header/token'dan okunur
- Backend middleware her request'te `tenantId` kontrolü yapar — frontend gizlemesi yeterli değil
- Bir kullanıcı birden fazla firmaya farklı rollerle atanabilir (örn. Firma A'da `content_editor`, Firma B'de `company_admin`)

---

## Rezervasyon Durum Geçişleri

```
yeni → görüldü → onaylandı
                → reddedildi
     → iptal
```

Durum değiştirme yetkisi: `reservation_manager`, `company_admin`, `agency_admin`, `super_admin`

---

## Sayfa Durum Geçişleri

```
draft → published
      → archived
published → draft
          → archived
archived → draft
```

Yayınlama yetkisi: `content_editor`, `company_admin`, `agency_admin`, `super_admin`
