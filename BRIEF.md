# Müşteri Brief'i — Çok Firmalı CMS Paneli

## Orijinal Mesaj (verbatim)

> ben sana projeyi detaylandırıyorum
>
> şimdi şu şekil bir proje istiyorum ben restoran tarzı işletmeler dişçiler vb işletmelere web sitesi yapacagım ama bu web sitesini firmaların yonetebilicegi bir cms paneli istiyorum
>
> cms panelinde kullanıcagım teknolojiler frontend için react tailwind kullanabilirsin
>
> backend tarafı için ise mongodb node.js java script ile yazılıcak kesinlikle
>
> firma bazlı olucak her firmanın logosu olucak ve onlara işlem olucak
>
> detaylı bir cms paneli olucak sayfalar üretebilicekler
>
> seo ile ilgili bütün kavramları ajans ile çalışan kişilerin yetki bazlı kullanabilicekler buradan meta title dan tut schemalarına kadar ayarlayabilicekler
>
> restoranda menu ekleme olabilicek rezervasyon takibi gibi birşeyde olabilir tabi bu firmanın hizmetine göre değişkenlik gösterir şuan elimde olan müşteri gusto kartepe diye bir restoran ama sonrasında ne tarz müşteriler gelicek bilmiyorum bu yüzden çok detaylı ve uyarlanabilir bir proje istiyorum
>
> cms panelinde hem gece modu hem aydınlık mod olucak
>
> cms paneli türkçe ingilzce alt yapısını destekleyebilicek
>
> cmss panelinde içerikler kullanıcı ne girerse öyle dil özellikleri olabilicek içerikleri isterse ingilizce isterse türkçe şeklinde olabilicek
>
> görseller s3 te tutulucak ama yedek birşery daha yapmamız lazım maliyet açısından yeri geldimi s3 tekileri silebilcek görsel ve videolar
>
> detaylı bir cms paneli istiyorum açıkçası
>
> şimdi ben sana soruları atıcam sen buna göre cevap vericeksin ben bu cevabı farklı bir llm de kullanıcam anlaştık mı

## Brief'ten Çıkan Gereksinimler

- [ ] Firma bazlı multi-tenant CMS paneli (her firma kendi verilerini yönetir)
- [ ] Frontend: React + Tailwind CSS (kesin)
- [ ] Backend: Node.js + JavaScript (kesin, TypeScript müşteri onayı olmadan eklenmez)
- [ ] Veritabanı: MongoDB (kesin)
- [ ] Medya: AWS S3 — silme/arşivleme/maliyet kontrolü stratejisiyle
- [ ] Firmalar panel üzerinden sayfa üretebilmeli
- [ ] Yetki bazlı SEO yönetimi (meta title'dan schema'ya kadar)
- [ ] Sektörel modüller: restoran için menü ekleme, rezervasyon takibi
- [ ] Modüler ve farklı sektörlere uyarlanabilir yapı
- [ ] Panel dark mode + light mode desteklemeli
- [ ] Panel Türkçe/İngilizce altyapısını desteklemeli (i18n)
- [ ] İçerikler firma/kullanıcı tercihine göre Türkçe veya İngilizce girilebilmeli
- [ ] Görsel ve videolar için yedekleme/arşivleme/maliyet stratejisi

## Renkler / Marka Varlıkları

### CMS Panel Renk Sistemi

| Hex | Rol | Token Adı |
|---|---|---|
| `#2563EB` | Primary (buton, link, aktif state) | `--brand-primary` |
| `#1D4ED8` | Primary Hover | `--brand-primary-hover` |
| `#0F766E` | Secondary | `--brand-secondary` |
| `#F59E0B` | Accent | `--brand-accent` |
| `#16A34A` | Success | `--state-success` |
| `#F97316` | Warning | `--state-warning` |
| `#DC2626` | Error | `--state-error` |
| `#0284C7` | Info | `--state-info` |

### Light Mode

| Hex | Rol | Token Adı |
|---|---|---|
| `#F8FAFC` | Sayfa arka planı | `--bg-base` |
| `#FFFFFF` | Yüzey (kart, modal) | `--bg-surface` |
| `#F1F5F9` | Muted yüzey | `--bg-muted` |
| `#E2E8F0` | Border / divider | `--border` |
| `#0F172A` | Primary metin | `--text-primary` |
| `#475569` | Secondary metin | `--text-secondary` |
| `#64748B` | Muted metin | `--text-muted` |

### Dark Mode

| Hex | Rol | Token Adı |
|---|---|---|
| `#0B1120` | Sayfa arka planı | `--bg-base` |
| `#111827` | Yüzey (kart, modal) | `--bg-surface` |
| `#1F2937` | Muted yüzey | `--bg-muted` |
| `#334155` | Border / divider | `--border` |
| `#F8FAFC` | Primary metin | `--text-primary` |
| `#CBD5E1` | Secondary metin | `--text-secondary` |
| `#94A3B8` | Muted metin | `--text-muted` |

**Kullanım kuralı:** Panel renk sistemi tek bir müşteri markasına bağlı değildir; sektör bağımsız ve ölçeklenebilir olmalıdır. Her firmaya ait marka renkleri ayrı token yapısıyla tanımlanır.

**Kritik uyarı:** <!-- FILL: Palet finalleşince WCAG kontrast matrisi hesaplanmalı — özellikle --brand-accent (#F59E0B) üzerindeki metin kombinasyonları kontrol edilmeli. -->

### Gusto Kartepe — Geçici Web Sitesi Renk Önerisi

| Hex | Rol |
|---|---|
| `#1F3D2B` | Deep Green |
| `#F7F0E6` | Warm Cream |
| `#C89B3C` | Gold Accent |
| `#1F2933` | Charcoal Text |
| `#7A4E2D` | Warm Brown |

> Bu renkler yalnızca Gusto Kartepe web sitesi için geçici öneridir. Kesin renkler logo ve marka dosyaları geldikten sonra belirlenir. CMS panelinin ana renkleri bundan bağımsız kalır.

## Müşteriden Alınan Ekler

| Ek | Durum | Not |
|---|---|---|
| Logo (Gusto Kartepe) | ❌ Eksik | Bekleniyor |
| Marka renkleri | ❌ Eksik | Kesin hex kodları bekleniyor |
| Kurumsal kimlik dosyası | ❌ Eksik | — |
| Figma / tasarım sistemi | ❌ Eksik | — |
| Site içerikleri (metin) | ❌ Eksik | Menü, hakkımızda, iletişim bekleniyor |
| Fotoğraflar / görseller | ❌ Eksik | Mekan, yemek, galeri bekleniyor |
| Domain / hosting bilgisi | ❌ Eksik | — |

## ⚠️ Çatışmalar ve Dikkat Edilmesi Gerekenler

- **CMS panel ≠ müşteri web sitesi:** Ana ürün CMS panelidir; Gusto Kartepe web sitesi panelin ürettiği bir çıktıdır. İkisi aynı renk sistemini paylaşmaz.
- **Teknoloji kesinliği:** Node.js + JavaScript backend müşteri tarafından kesin belirtilmiştir. TypeScript müşteri onayı olmadan eklenmez.
- **S3 maliyet riski:** Büyük video dosyaları için S3 direct serving maliyetli olabilir; silme/arşivleme/CDN stratejisi baştan planlanmalıdır.

## Teslimat Kapsamı

**MVP (şimdi teslim):**
- Login / Authentication (JWT + refresh token)
- Multi-tenant firma yönetimi + backend seviyesinde veri izolasyonu
- Kullanıcı yönetimi ve basit RBAC
- Dashboard
- Sayfa yönetimi (oluşturma, düzenleme, yayın/taslak/arşiv)
- Medya kütüphanesi (S3 yükleme, silme/arşivleme temeli)
- Temel SEO alanları (meta title, description, slug, Open Graph, alt text)
- Menü / navigasyon yönetimi
- Çok dil altyapısı (TR/EN içerik alanı yapısı)
- Light / dark mode
- Restoran: menü kategorileri ve ürünleri
- Rezervasyon talep formu ve panel görüntüleme
- İletişim formu / lead kaydı
- Gusto Kartepe web sitesi (7 sayfa: Ana, Hakkımızda, Menü, Galeri, Rezervasyon, İletişim, KVKK)

**Sonraki aşama (post-MVP):**
- Gelişmiş page builder / drag-drop editor
- Blog modülü
- Gelişmiş SEO (redirect manager, 404 log, schema builder, hreflang otomasyonu)
- Analytics entegrasyonu (GA4, GTM, Search Console)
- CRM entegrasyonu
- WhatsApp / SMS / Google Calendar bildirimleri
- Diş kliniği, güzellik merkezi, otel modülleri
- SaaS paket/limit sistemi ve ödeme altyapısı
- Medya maliyet raporları ve kullanılmayan medya temizleme aracı
- White-label panel özellikleri

## Açık Müşteri Soruları (build'i bloklama)

- [x] Hosting → Vercel (frontend) + Railway/Render (backend) + MongoDB Atlas + Cloudflare DNS/CDN
- [x] Sayfa builder → sabit template + editable alanlar (MVP); drag-drop post-MVP
- [x] Rezervasyon → sadece talep formu (MVP); masa/uygunluk kontrolü post-MVP
- [x] Storage → S3-uyumlu adapter; AWS S3 / Cloudflare R2 / Backblaze B2 / Wasabi; provider env ile seçilir
- [x] Yayın akışı → direkt yayın, onay akışı yok (MVP)
- [ ] Gusto Kartepe logosu ve marka renkleri → bekliyor
- [ ] Domain nerede yönetiliyor? → bekliyor
- [ ] Gusto Kartepe yayına çıkış tarihi → bekliyor

## Dokümanlara Referans

- İçerik → [CONTENT.md](./CONTENT.md)
- Tasarım → [DESIGN.md](./DESIGN.md)
- LLM Talimatları → [CLAUDE.md](./CLAUDE.md)
