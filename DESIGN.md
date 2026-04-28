# Çok Firmalı CMS Paneli — Tasarım Spesifikasyonu

> **Bu dosya kimin için:** LLM tasarımcı / geliştirici ajan.
> Uygulayıcının ihtiyaç duyduğu her şeyi içerir.
> İçerik için [CONTENT.md](./CONTENT.md), orijinal brief için [BRIEF.md](./BRIEF.md).

---

## 1. Marka Genel Bakış

**CMS Paneli** — Restoranlar, diş klinikleri, güzellik merkezleri ve yerel hizmet işletmeleri için firma bazlı yönetilebilir web siteleri üreten çok firmalı SaaS/CMS platformu.

### Marka Kişiliği (CMS Panel)
- **Modern & Profesyonel** — Kurumsal, güven veren, iş odaklı
- **Kontrollu Yoğunluk** — Ana ekranlar sade; içerik/ayar ekranları detaylı, tab/accordion ile bölünmüş
- **Sektör Bağımsız** — Tek bir müşteri markasına bağlı değil; farklı firmalar farklı marka renkleriyle çalışabilmeli

### Hedef Kitle (Panel Kullanıcısı)
İşletme sahipleri, ajans çalışanları, SEO uzmanları, içerik editörleri; uzun süreli panel kullanımı, hızlı tarama, tablo ve form ağırlıklı ekranlar.

### Kaçınılacaklar
- Aşırı renkli, oyuncak görünümlü veya amatör arayüz
- Sadece restoran sektörüne hitap eden sabit tasarım dili
- Gereksiz animasyonlar ve dikkat dağıtan arka planlar
- Fazla büyük boşluklar nedeniyle verimsiz ekran kullanımı
- Çok küçük fontlar (okunabilirlik sorunu)
- Sadece tek marka rengine bağlı UI yapısı
- Türkçe panelde İngilizce buton/label metinleri ("Submit", "Cancel")
- Hata mesajlarında sert veya suçlayıcı dil
- Firma verilerinin birbirine karışabileceği hissi veren ekranlar

---

## 2. Tasarım Prensipleri

1. **İş Odaklı** — Panel dekoratif değil, uzun süreli kullanıma uygun, net hiyerarşik yapıda
2. **Kontrollu Yoğunluk** — Ana ekranlar sade; gelişmiş ayarlar sekmeler/accordion ile ayrılmış
3. **Yetki Görünürlüğü** — Kullanıcının yetkisine göre gereksiz alanlar gizlenir; firma izolasyonu hissedilir
4. **Çift Mod Uyumu** — Her bileşen light ve dark modda eşit kalitede görünmeli; birini atlayarak tasarım yapılmaz
5. **WCAG 2.1 AA minimum, body text AAA hedef** — Erişilebilirlik retrofit edilemez

---

## 3. Renk Tokenları

### Ham Palet — CMS Panel

| Token | Hex | Kullanım |
|---|---|---|
| `--brand-primary` | `#2563EB` | Primary buton, link, aktif state |
| `--brand-primary-hover` | `#1D4ED8` | Primary hover |
| `--brand-secondary` | `#0F766E` | İkincil vurgu |
| `--brand-accent` | `#F59E0B` | Badge, dikkat çeken ikon |
| `--state-success` | `#16A34A` | Başarı mesajı, yayında badge |
| `--state-warning` | `#F97316` | Uyarı durumu |
| `--state-error` | `#DC2626` | Form hatası, silme uyarısı |
| `--state-info` | `#0284C7` | Bilgi notu |

### Light Mode Tokenlar

| Token | Hex | Kullanım |
|---|---|---|
| `--bg-base` | `#F8FAFC` | Sayfa arka planı (~%60 yüzey) |
| `--bg-surface` | `#FFFFFF` | Kart, modal, sidebar |
| `--bg-muted` | `#F1F5F9` | Alternating row, placeholder bg |
| `--border` | `#E2E8F0` | Border, divider |
| `--text-primary` | `#0F172A` | Ana metin |
| `--text-secondary` | `#475569` | İkincil metin |
| `--text-muted` | `#64748B` | Yardımcı metin, placeholder |

### Dark Mode Tokenlar

| Token | Hex | Kullanım |
|---|---|---|
| `--bg-base` | `#0B1120` | Sayfa arka planı |
| `--bg-surface` | `#111827` | Kart, modal, sidebar |
| `--bg-muted` | `#1F2937` | Alternating row |
| `--border` | `#334155` | Border, divider |
| `--text-primary` | `#F8FAFC` | Ana metin |
| `--text-secondary` | `#CBD5E1` | İkincil metin |
| `--text-muted` | `#94A3B8` | Yardımcı metin |

### Kontrast Matrisi

<!-- FILL: Renkler finalleşince WCAG kontrast oranları hesaplanmalı — özellikle --brand-accent (#F59E0B) üzerindeki metin kombinasyonları kontrol edilmeli -->

### Firma Bazlı Marka Renk Alanları

Her firmaya ait ayrı token seti tanımlanabilmeli:
- `--firm-brand-primary`
- `--firm-brand-secondary`
- `--firm-brand-accent`
- Logo (light / dark varyant)
- Favicon

---

## 4. Tipografi

| Rol | Font | Ağırlık | Boyut | Not |
|---|---|---|---|---|
| Page Title | Inter | 700 | 24–32px | Panel sayfa başlıkları |
| Section Title | Inter | 600 | 18–20px | — |
| Card Title | Inter | 600 | 16–18px | — |
| Body / Form | Inter | 400 | 14–15px | Panel gövde metni |
| Table / Label | Inter | 400–500 | 13–14px | — |
| Caption / Helper | Inter | 400 | 12–13px | Yardımcı açıklama |

**Fallback:** `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
**Font yükleme:** Google Fonts veya next/font (proje yapısına göre)
**Karakter seti:** Latin + Latin-ext (Türkçe: ğ ş ç İ Ğ Ü Ö)
**Input font-size minimum:** 16px (iOS zoom prevention — kesinlikle düşürülmez)

### Firma Web Siteleri İçin Tipografi

Firma web sitelerinde marka bazlı font seçimi desteklenmeli. Gusto Kartepe için geçici öneri:
- Başlık: Playfair Display veya Cormorant Garamond
- Gövde: Inter veya Lato

---

## 5. Spacing, Border ve Radius

| Token | Değer | Kullanım |
|---|---|---|
| `--radius-sm` | `4px` | Küçük badge, chip |
| `--radius-md` | `8px` | Varsayılan — buton, input, kart |
| `--radius-lg` | `12px` | Modal, büyük kart |
| `--radius-full` | `9999px` | Pill buton, avatar |

---

## 6. Bileşen Spec'leri

### Button (Primary)

```
Arka plan : --brand-primary
Metin     : #FFFFFF
Border    : yok
Hover bg  : --brand-primary-hover
Radius    : --radius-md
Padding   : 10px 20px
Font      : Inter, 500, 14px
```

### Button (Secondary / Ghost)

```
Arka plan : transparent
Metin     : --text-primary
Border    : 1px --border
Hover bg  : --bg-muted
Radius    : --radius-md
Padding   : 10px 20px
```

### Button (Danger)

```
Arka plan : --state-error
Metin     : #FFFFFF
Hover bg  : #B91C1C
Radius    : --radius-md
```

### Input / Textarea

```
Border    : 1px --border
Focus     : 2px solid --brand-primary
Error     : 1px --state-error + hata etiketi altında
Font-size : minimum 16px (iOS zoom prevention)
Radius    : --radius-md
Padding   : 10px 14px
```

### Card

```
Arka plan : --bg-surface
Border    : 1px --border
Radius    : --radius-lg
Padding   : 20px–24px
Shadow    : 0 1px 3px rgba(0,0,0,0.08)
```

### Sidebar Navigation

```
Arka plan    : --bg-surface
Border-right : 1px --border
Genişlik     : 240–260px (desktop)
Aktif item   : --brand-primary bg (%10 opasite) + --brand-primary metin
```

### Badge / Status

```
Yayında  : --state-success bg (soft) + success metin
Taslak   : --bg-muted + --text-muted
Uyarı    : --state-warning bg (soft) + warning metin
Hata     : --state-error bg (soft) + error metin
```

---

## 7. Sayfa Yapısı ve Bölüm Spec'leri

### CMS Panel Layout

| Bölüm | Desktop | Tablet | Mobil |
|---|---|---|---|
| Sidebar | Sabit, 240–260px sol | Daraltılabilir / overlay | Drawer / hamburger |
| Topbar | Tam genişlik, firma seçici + kullanıcı menüsü | Tam genişlik | Tam genişlik |
| İçerik Alanı | Sidebar sağı, padding 24px | Fluid | Full width, padding 16px |

### Gusto Kartepe Web Sitesi Sayfa Yapısı

| # | Sayfa | Desktop Layout | Mobil Layout | Özel Not |
|---|---|---|---|---|
| 1 | Ana Sayfa | Full-bleed hero + grid bölümler | Stacked | Hero görsel ağırlıklı |
| 2 | Hakkımızda | 60-40 metin-görsel split | Stacked | — |
| 3 | Menü | Kategori tabları + ürün grid | Stacked liste | Filtrelenebilir |
| 4 | Galeri | Masonry veya eşit grid | 2-kolon grid | Lazy load zorunlu |
| 5 | Rezervasyon | Ortalanmış form, max 640px | Full width form | — |
| 6 | İletişim | 2-kolon (form + harita/bilgi) | Stacked | Google Maps embed |
| 7 | KVKK | Tek kolon metin | Tek kolon | — |

---

## 8. Erişilebilirlik (A11y)

- **Minimum:** WCAG 2.1 AA
- **Hedef:** AAA (body text için)
- Focus ring: tüm interaktif elementlerde görünür, 2px solid `--brand-primary`
- Semantik HTML: `section`, `nav`, `main`, `footer`, doğru `h1–h6` hiyerarşisi
- Alt text: tüm görseller için zorunlu (placeholder bile olsa açıklayıcı alt)
- Form input'ları: `for` / `aria-labelledby` bağlantısı zorunlu, placeholder tek başına yeterli değil
- Input font-size minimum 16px (iOS zoom tetiklememe)
- Color-only bilgi iletme: asla (ikon + metin kombinasyonu kullan)
- Modal / drawer: focus trap + ESC ile kapatma zorunlu
- Klavye ile tam gezinilebilir arayüz

---

## 9. Responsive Breakpoint'ler

| İsim | Min-width | Kullanım |
|---|---|---|
| mobile | 320px | Baseline |
| — | 375px | **İlk kontrol viewport'u** |
| tablet | 768px | Sidebar daraltılabilir, 2-kolon grid |
| desktop | 1280px | Tam panel layout |
| wide | 1920px | Max container: 1440px |

---

## 10. Bu Tasarımda Kesinlikle Kaçınılacaklar

- Tek bir müşteri markasının renklerini CMS panel geneline uygulamak
- Sadece light mode veya sadece dark mode için tasarlanmış bileşenler (ikisi birlikte zorunlu)
- Aşırı büyük boşluklar (panel verimli ekran kullanımı gerektiriyor)
- Türkçe panelde İngilizce buton/label metinleri
- Input font-size < 16px
- Form alanlarında label yerine yalnızca placeholder kullanmak
- Firma verilerinin birbirine karışabileceği hissi veren ekranlar
- Gereksiz loading animasyonları ve dikkat dağıtan arka plan efektleri
- Restoran modülüne özel tasarım dilini klinik/güzellik merkezi ekranlarına uygulamak
