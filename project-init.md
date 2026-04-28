# project-init.md — Yeni Proje LLM Altyapı Kurucusu

> **Bu dosyayı okuyan LLM'e:** Boş bir projede bu dosyayı aldıysan, görevin bu belgedeki talimatları
> takip ederek kullanıcıyı röportaja almak ve 4 temel proje bağlam dosyasını oluşturmaktır.
> Hiçbir şeyi özetleme, çevir veya yorum katma — sadece talimatları uygula.

---

## Bu Sistemin Amacı

Bir dijital projeyi birden fazla LLM oturumunda ve farklı LLM platformlarında tutarlı şekilde
yürütmek için gereken bağlam altyapısını kurmak.

**Sistem kurulduğunda:**
- Yeni bir LLM oturumu açıldığında sadece ilgili dosyaları okutmak yeterli
- Claude, GPT, Gemini, Cursor gibi farklı LLM'ler aynı proje üzerinde tutarlı çalışabilir
- Tasarım kararları, içerik, kısıtlamalar kaybolmaz — her oturumda yeniden anlatmak gerekmez
- Projeden ayrılan ve yeni başlayan bir LLM anında context'e girer

---

## Oluşturulacak 4 Dosya

| Dosya | Ne içerir | Kimin için |
|-------|-----------|------------|
| `BRIEF.md` | Müşteri brief'i verbatim + gereksinimler + çatışmalar + açık sorular | Her LLM, proje başında |
| `CONTENT.md` | Tüm metinler verbatim, asla değişmez | İçerik kullanan her LLM |
| `DESIGN.md` | Renk tokenları, tipografi, bileşen kararları, bölüm spec | Tasarım / geliştirme LLM'i |
| `CLAUDE.md` | LLM'e doğrudan talimatlar, hard kararlar, hiyerarşi | LLM'in kendi instruction dosyası |

**Kaynak gerçek hiyerarşisi (çatışma olursa hangi dosya kazanır):**

```
CONTENT.md  >  DESIGN.md  >  Kaynak Varlık (CSS/Figma)  >  BRIEF.md
```

---

## LLM — Ne Yapacaksın (Sırayla)

```
1. Bu dosyayı baştan sona oku
2. Kullanıcıya Grup A sorularını sor → yanıt bekle
3. Grup B sorularını sor → yanıt bekle
4. Grup C, D, E, F sırayla → her grup için yanıt al
5. Tüm cevaplar tamamlandığında 4 dosyayı kök dizine oluştur
6. Kalite kontrol listesini çalıştır ve sonucu kullanıcıya raporla
```

> **Kural:** Eksik bilgiyle dosya oluşturma. Cevap gelmemişse `<!-- FILL: açıklama -->`
> bırak ve eksik konuyu BRIEF.md > "Açık Sorular" bölümüne yaz.
> Bir grup soruyu bitirmeden sonraki gruba geçme.

---

## Adım 1 — Röportaj Soruları

### Grup A — Proje Temel Bilgisi
Şu soruları kullanıcıya sor, yanıtları not al:

1. Proje adı ve müşteri/şirket adı nedir?
2. Bu ne tür bir proje? *(web sitesi, web app, mobil app, e-ticaret, SaaS, landing page, vb.)*
3. Projenin birincil hedefi nedir? *(lead toplama, satış, bilgilendirme, kullanıcı kayıt, vb.)*
4. Hedef kitle kim? *(B2B / B2C, sektör, coğrafya, demografik)*
5. Proje dil(leri): Türkçe mi, İngilizce mi, çok dilli mi?

---

### Grup B — Müşteri Brief'i
6. Müşteri brief'ini veya talebini **olduğu gibi** yapıştır. *(Düzeltme yapma, verbatim istiyorum.)*
7. Müşteriden gelen ekler/dosyalar var mı? *(logo, metin dosyası, Figma, tasarım sistemi, vb.)* Hangileri geldi, hangileri eksik?
8. Referans proje veya rakip site var mı? URL varsa paylaş.

---

### Grup C — Tasarım
9. Onaylı bir renk paleti var mı? Hex kodlarını paylaş. Yoksa marka yönlendirmesi var mı?
10. Font / tipografi tercihi var mı? Yoksa sen öner.
11. Mevcut bir tasarım sistemi (Figma, Storybook, CSS framework) var mı?
12. Tasarım kişiliği nasıl olsun? *(modern/klasik, minimal/yoğun, kurumsal/samimi, vb.)*
13. Kesinlikle **kaçınılması** gereken görsel / dil / ton unsurları var mı?

---

### Grup D — Teknik Stack
14. Kullanılacak teknoloji stack'i nedir? *(Next.js, React, WordPress, Laravel, Vue, vb.)*
15. Hosting / deployment nerede? *(Vercel, Netlify, kendi sunucu, cPanel, vb.)*
16. Özel entegrasyon gereksinimleri var mı? *(form backend, CRM, analytics, ödeme sistemi, vb.)*

---

### Grup E — İçerik ve Kapsam
17. Site/uygulama yapısı: kaç sayfa veya ekran, hangi bölümler?
18. Tüm metin içeriklerini şimdi paylaşabilir misin? *(verbatim — hiçbir şeyi yeniden yazma)*
    - Yoksa: hangi bölümlerin içeriği eksik? Placeholder mı kullanılsın?
19. Görsel gereksinimler: kaç görsel var, placeholder mı gerçek mi?

---

### Grup F — Kısıtlar, Kararlar ve Zaman
20. Mutlaka uyulması gereken kısıtlamalar var mı? *(a11y standardı, yasal uyumluluk, marka kılavuzu, vb.)*
21. Müşteriye henüz sorulmamış, yanıt bekleyen konular var mı?
22. MVP kapsamı nedir? MVP sonrası neler planlanıyor?
23. Zaman çizelgesi / deadline var mı?

---

## Adım 2 — Dosya Şablonları

Tüm sorular yanıtlandığında aşağıdaki şablonları kullanarak dosyaları oluştur.
`{{BÜYÜK_HARFLER}}` formatındaki her placeholder'ı röportajdan gelen bilgiyle doldur.
Bilgi yoksa `<!-- FILL: açıklama -->` bırak.

---

### BRIEF.md Şablonu

````markdown
# Müşteri Brief'i — {{PROJE_ADI}}

## Orijinal Mesaj (verbatim)

> {{MÜŞTERİ_BRIEF_VERBATIM}}

## Brief'ten Çıkan Gereksinimler

- [ ] {{GEREKSİNİM_1}}
- [ ] {{GEREKSİNİM_2}}
- [ ] {{GEREKSİNİM_3}}
<!-- Müşteri mesajından doğrudan çıkan maddeler — yorum katma, sadece çıkar -->

## Renkler / Marka Varlıkları

| Hex / Kaynak | Rol | Token Adı |
|---|---|---|
| `{{HEX_1}}` | {{ROL_1}} | `--brand-{{TOKEN_1}}` |
| `{{HEX_2}}` | {{ROL_2}} | `--brand-{{TOKEN_2}}` |

**Kullanım kuralı:** {{KURAL — örn. 60-30-8-2 yüzey dağılımı}}

**Kritik uyarı:** {{CONTRAST_UYARI — hangi kombinin WCAG fail verdiğini belirt}}

## Müşteriden Alınan Ekler

| Ek | Durum | Konum / Not |
|---|---|---|
| {{EK_ADI_1}} | ✅ Alındı | {{KONUM}} |
| {{EK_ADI_2}} | ❌ Eksik | {{NOT}} |

## ⚠️ Çatışmalar ve Dikkat Edilmesi Gerekenler

{{ÇATIŞMA_AÇIKLAMASI}}
<!-- Brief ile teslim edilen içerik/varlıklar arasındaki tutarsızlıklar buraya -->
<!-- Yoksa bu bölümü kaldır -->

## Rakip / Referans Analizi

- {{RAKİP_URL}}: {{KISA_ANALİZ}}
<!-- Yoksa bu bölümü kaldır -->

## Teslimat Kapsamı

**MVP (şimdi teslim):**
- {{MVP_MADDE_1}}
- {{MVP_MADDE_2}}

**Sonraki aşama (post-MVP):**
- {{SONRAKI_MADDE_1}}
- {{SONRAKI_MADDE_2}}

## Açık Müşteri Soruları (build'i bloklama)

- [ ] {{SORU_1}}
- [ ] {{SORU_2}}

## Dokümanlara Referans

- İçerik → [CONTENT.md](./CONTENT.md)
- Tasarım → [DESIGN.md](./DESIGN.md)
- LLM Talimatları → [CLAUDE.md](./CLAUDE.md)
````

---

### CONTENT.md Şablonu

````markdown
# {{PROJE_ADI}} — Site İçeriği (verbatim)

Kaynak: {{KAYNAK — örn. "~/Downloads/proje.docx", "müşteri e-postası", vb.}}
Bu dosya **source of truth** — tüm bileşenler buradan beslenir.
`src/content/copy.ts` (veya eşdeğeri) bu dosyadan üretilir.

> ⚠️ **Kural:** Metinler değiştirilmez. Tipografik düzeltmeler bile müşteri onayı olmadan
> yapılmaz. Sadece müşteri onayıyla revize edilir. Kısaltma / yeniden yazma yok.

---

## 1. {{BÖLÜM_ADI — örn. HERO}}

**Başlık:**
> {{BAŞLIK_METNI}}

**Alt başlık / tagline:**
> {{ALT_BAŞLIK}}

**İçerik:**

{{PARAGRAF_1}}

{{PARAGRAF_2}}

---

## 2. {{BÖLÜM_ADI}}

**Başlık:**
> {{BAŞLIK}}

**İçerik (liste):**
- {{MADDE_1}}
- {{MADDE_2}}
- {{MADDE_3}}

---

## 3. {{BÖLÜM_ADI}}

<!-- Tüm bölümler bu formatta eklenir -->
<!-- Müşteriden metin gelmemişse: -->
<!-- FILL: Bu bölüm için müşteriden metin bekleniyor -->

---

## Form / CTA Metinleri

**Form başlığı:** {{FORM_BAŞLIK}}
**Submit butonu:** {{BUTTON_TEXT}}
**Başarı mesajı:** {{SUCCESS_MSG}}
**Hata mesajı:** {{ERROR_MSG}}

---

## Footer

**Yasal ad:** {{YASAL_AD}}
**Adres:** {{ADRES}}  ← lorem / placeholder
**Telefon:** {{TELEFON}}  ← lorem / placeholder
**E-posta:** {{EMAIL}}  ← lorem / placeholder
````

---

### DESIGN.md Şablonu

````markdown
# {{PROJE_ADI}} — Tasarım Spesifikasyonu

> **Bu dosya kimin için:** LLM tasarımcı / geliştirici ajan.
> Uygulayıcının ihtiyaç duyduğu her şeyi içerir.
> İçerik için [CONTENT.md](./CONTENT.md), orijinal brief için [BRIEF.md](./BRIEF.md).

---

## 1. Marka Genel Bakış

**{{ŞİRKET_ADI}}** — {{KISA_TANIM}}

### Marka Kişiliği
- **{{KİŞİLİK_1}}** — {{AÇIKLAMA}}
- **{{KİŞİLİK_2}}** — {{AÇIKLAMA}}
- **{{KİŞİLİK_3}}** — {{AÇIKLAMA}}

### Hedef Kitle
{{HEDEF_KİTLE — kim, nerede, hangi bağlamda siteyi açıyor}}

### Kaçınılacaklar
- {{KAÇINILACAK_1}}
- {{KAÇINILACAK_2}}
<!-- Görsel, dil, ton ve tasarım açısından kesinlikle yapılmayacaklar -->

---

## 2. Tasarım Prensipleri

1. **{{PRENSİP_1}}** — {{AÇIKLAMA}}
2. **{{PRENSİP_2}}** — {{AÇIKLAMA}}
3. **{{PRENSİP_3}}** — {{AÇIKLAMA}}
4. **{{PRENSİP_4}}** — {{AÇIKLAMA}}
5. **WCAG 2.1 AA minimum, body text AAA hedef** — Erişilebilirlik retrofit edilemez.

---

## 3. Renk Tokenları

### Ham Palet

| Token | Hex | Kullanım |
|---|---|---|
| `--brand-paper` | `{{HEX}}` | Dominant yüzey — sayfanın ~%60'ı |
| `--brand-ink` | `{{HEX}}` | Primary text + koyu feature bölüm |
| `--brand-mute` | `{{HEX}}` | Border, divider, secondary meta text |
| `--brand-accent` | `{{HEX}}` | CTA fill, bölüm başına max 1 vurgu |

### Türev Tokenlar

| Token | Hex | Neden var |
|---|---|---|
| `--brand-ink-soft` | `{{HEX}}` | Button hover — ink'in yumuşatılmış hali |
| `--brand-accent-strong` | `{{HEX}}` | CTA hover/active — accent koyulaştırılmış |
| `--brand-accent-soft` | `{{HEX}}` | Chip bg, success state |
| `--brand-mute-soft` | `{{HEX}}` | Muted surface alternation, placeholder bg |
| `--state-error` | `{{HEX}}` | Form hata durumu (palette dışı, a11y için) |
| `--focus-ring` | `{{HEX}}` | 2px solid focus outline |

### Kontrast Matrisi

| Kombino | Oran | WCAG | Kullanılabilir? |
|---|---|---|---|
| ink on paper | {{ORAN}} | {{STATUS}} | {{KULLANIM}} |
| paper on ink | {{ORAN}} | {{STATUS}} | {{KULLANIM}} |
| ink on accent | {{ORAN}} | {{STATUS}} | {{KULLANIM}} |
| accent on paper | {{ORAN}} | {{STATUS}} | {{KULLANIM}} |
| mute on paper | {{ORAN}} | {{STATUS}} | {{KULLANIM}} |

### Yüzey Kuralı

- **%{{N}} Paper** — dominant yüzey, section'ların çoğu
- **%{{N}} Ink** — tipografi + bir adet full-bleed koyu bölüm
- **%{{N}} Mute** — border, divider, form çerçeve, secondary text
- **%{{N}} Accent** — bölüm başına MAX 1 lime element

---

## 4. Tipografi

| Rol | Font | Ağırlık | Boyut | Not |
|---|---|---|---|---|
| Display / H1 | {{FONT}} | {{WEIGHT}} | {{SIZE}} | {{NOT}} |
| Heading H2 | {{FONT}} | {{WEIGHT}} | {{SIZE}} | {{NOT}} |
| Body | {{FONT}} | {{WEIGHT}} | {{SIZE}} | min 16px (iOS zoom) |
| Label / Caption | {{FONT}} | {{WEIGHT}} | {{SIZE}} | {{NOT}} |

**Font yükleme:** {{next/font, CDN, local, @font-face}}
**Karakter seti:** {{latin, latin-ext, Türkçe özel karakterler (ğ ş ç İ Ğ), vb.}}

---

## 5. Spacing, Border ve Radius

| Token | Değer | Kullanım |
|---|---|---|
| `--radius-sm` | `{{PX}}` | {{KULLANIM}} |
| `--radius-md` | `{{PX}}` | Varsayılan — tüm bileşenler |
| `--radius-lg` | `{{PX}}` | Kart, modal |
| `--radius-full` | `9999px` | Chip, badge, pill button |

---

## 6. Bileşen Spec'leri

### Button (Primary)

```
Arka plan : --brand-accent
Metin     : --brand-ink
Border    : yok
Hover bg  : --brand-accent-strong
Radius    : --radius-md
Padding   : {{PADDING}}
Font      : {{FONT}}, {{WEIGHT}}
```

### Button (Secondary / Ghost)

```
Arka plan : transparent
Metin     : --brand-ink
Border    : 1px --brand-mute
Hover     : --brand-mute-soft bg
Radius    : --radius-md
```

### Input / Textarea

```
Border    : 1px --brand-mute
Focus     : 2px solid --focus-ring
Error     : 1px --state-error + error label
Font-size : minimum 16px (iOS zoom prevention)
Radius    : --radius-md
Padding   : {{PADDING}}
```

### Card

```
Arka plan : --brand-paper
Border    : 1px --brand-mute
Radius    : --radius-lg
Padding   : {{PADDING}}
Shadow    : {{SHADOW — varsa}}
```

---

## 7. Sayfa Yapısı ve Bölüm Spec'leri

| # | Bölüm | Desktop Düzeni | Mobil Düzeni | Özel Not |
|---|---|---|---|---|
| 1 | {{BÖLÜM}} | {{LAYOUT}} | {{MOBILE}} | {{NOT}} |
| 2 | {{BÖLÜM}} | {{LAYOUT}} | {{MOBILE}} | {{NOT}} |
| 3 | {{BÖLÜM}} | {{LAYOUT}} | {{MOBILE}} | {{NOT}} |

### Bölüm Detayları

**§1 {{BÖLÜM_ADI}}**
- Desktop: {{LAYOUT — örn. 60-40 split, grid, full-bleed}}
- Mobil: {{MOBILE_LAYOUT}}
- İçerik: → CONTENT.md §1
- Özel kural: {{KURAL}}

**§2 {{BÖLÜM_ADI}}**
- Desktop: {{LAYOUT}}
- Mobil: {{MOBILE_LAYOUT}}
- İçerik: → CONTENT.md §2
- Özel kural: {{KURAL}}

<!-- Her bölüm için tekrar et -->

---

## 8. Erişilebilirlik (A11y)

- **Minimum:** WCAG 2.1 AA
- **Hedef:** AAA (body text için)
- Focus ring: tüm interaktif elementlerde görünür, 2px solid --focus-ring
- Semantik HTML: `section`, `nav`, `main`, `footer`, doğru `h1–h6` hiyerarşisi
- Alt text: tüm görseller için (placeholder bile olsa açıklayıcı alt)
- Form input'ları: label bağlantısı zorunlu (`for` / `aria-labelledby`), placeholder yeterli değil
- Font-size minimum 16px (iOS'ta zoom tetiklememe)
- Color-only bilgi iletme: asla (ikon + metin kombinasyonu kullan)

---

## 9. Responsive Breakpoint'ler

| İsim | Min-width | Kullanım |
|---|---|---|
| mobile | 320px | Baseline |
| — | 375px | **İlk kontrol viewport'u** |
| tablet | 768px | {{TABLET_LAYOUT_NOT}} |
| desktop | 1280px | {{DESKTOP_LAYOUT_NOT}} |
| wide | 1920px | Max container: {{MAX_WIDTH}} |

---

## 10. Bu Tasarımda Kesinlikle Kaçınılacaklar

- {{KAÇINILACAK_1}}
- {{KAÇINILACAK_2}}
- {{KAÇINILACAK_3}}
<!-- Proje özelinde belirlenen, tasarım kişiliğiyle çelişen her şey buraya -->
````

---

### CLAUDE.md Şablonu

> Bu dosyayı `CLAUDE.md` olarak kaydet (Claude Code için).
> Diğer platformlar için: **Platform Uyumluluğu** bölümüne bak.

````markdown
# {{PROJE_ADI}} — LLM Talimatları

## Bu Proje Nedir
{{PROJE_TANIMI — tek cümle}}

Stack: {{TECH_1}} · {{TECH_2}} · {{TECH_3}} · {{HOSTING}}

## Belgeleri Oku (önce bunlar)
- BRIEF.md    — müşteri brief'i + renk tokenları + çatışma uyarıları
- CONTENT.md  — TÜM metin içeriği, verbatim, source of truth
- DESIGN.md   — tasarım spec (tokenlar, tipografi, bileşenler, a11y)
- README.md   — stack kararları, sayfa akışı, form şeması, doğrulama

## Kaynak Gerçek Hiyerarşisi
1. CONTENT.md — kopya verbatim, müşteri onayı olmadan yeniden yazma
2. DESIGN.md  — tasarım kararları, token değerleri, bileşen davranışı
3. {{EK_KAYNAK — CSS, Figma, ZIP, vb.}} — DESIGN.md ile çelişirse bu kazanır
4. README.md  — mimari ve stack

## Kesin Kararlar (değişmez)
- {{KARAR_1 — örn. "Border radius: 4px her yerde"}}
- {{KARAR_2 — örn. "Nav: her zaman opak, 40px scroll sonrası border-b"}}
- {{KARAR_3 — örn. "Hero: desktop 60-40, mobil stacked"}}
<!-- Bu kararlar alındı, yeniden tartışılmaz. Sormadan uygulanır. -->

## Değişmez Kısıtlamalar
- {{KISIT_1 — örn. "#bdd52f lime → fill only, NEVER text on white"}}
- {{KISIT_2 — örn. "Fabrika / üretim dili ve görseli yok"}}
- {{KISIT_3 — örn. "Input font-size minimum 16px"}}
- {{KISIT_4 — örn. "WCAG 2.1 AA minimum"}}
<!-- Hiçbir koşulda çiğnenmez. -->

## Sayfa Yapısı ({{N}} bölüm)
1. {{BÖLÜM_1 — kısa özelliğiyle}}
2. {{BÖLÜM_2}}
3. {{BÖLÜM_3}}
<!-- Tüm bölümler sırayla -->

## Form Özellikleri (varsa)
Alanlar: {{ALANLAR — örn. "Ad* / Soyad* / E-posta* / Telefon* / Mesaj (opsiyonel)"}}
Honeypot: {{HONEYPOT_FIELD}}
Doğrulama: {{VALIDATION — örn. "zod schema, src/lib/lead-schema.ts"}}
Transport: {{TRANSPORT — örn. "React Server Action"}}
Kalıcılık: {{PERSIST — örn. "data/leads.jsonl, gitignored"}}
Spam: {{SPAM — örn. "honeypot + <2s timestamp + IP 5req/10min"}}
UX: {{UX — örn. "useActionState → idle/submitting/success/error"}}

## Açık Müşteri Soruları (build'i bloklama)
- {{SORU_1}} → {{DURUM — bekliyor / placeholder / flag edildi}}
- {{SORU_2}} → {{DURUM}}

## Şüphe Durumunda
DESIGN.md §1 "Kaçınılacaklar" ve §2 "Tasarım Prensipleri" bölümlerini aç.
Herhangi bir karar bu prensipleri ihlal ediyorsa yanlıştır.
375px mobil viewport her zaman ilk kontrol.
````

---

## Adım 3 — Dosyalar Oluşturulunca: Hiyerarşi Doğrulaması

Dosyaları oluşturduktan sonra şunu kontrol et:

1. **BRIEF.md** → CONTENT.md ve DESIGN.md'ye link var mı?
2. **CONTENT.md** → kaynak dosyaya (docx, PDF, e-posta) referans var mı?
3. **DESIGN.md** → CONTENT.md ve BRIEF.md'ye link var mı?
4. **CLAUDE.md** → 4 belgeyi "Belgeleri Oku" listesinde gösteriyor mu?
5. Proje adı tüm dosyalarda **tutarlı** mı?
6. Tüm `{{PLACEHOLDER}}`'lar dolduruldu mu veya `<!-- FILL: ... -->` ile işaretlendi mi?

---

## Platform Uyumluluğu

Bu sistem birden fazla LLM ile çalışır. Sadece instruction dosyasının adı değişir:

| Platform | Instruction Dosyası | Otomatik Okunur mu? |
|---|---|---|
| Claude Code | `CLAUDE.md` | ✅ Evet |
| OpenAI / Codex | `AGENTS.md` | ✅ Evet |
| Gemini CLI | `GEMINI.md` | ✅ Evet |
| Cursor | `.cursorrules` | ✅ Evet |
| GitHub Copilot | `.github/copilot-instructions.md` | ✅ Evet |
| Diğer LLM'ler | Herhangi bir isim | ❌ Manuel okut |

**Strateji:**
- `BRIEF.md`, `CONTENT.md`, `DESIGN.md` LLM-agnostik — tüm platformlarda kullanılır
- `CLAUDE.md` içeriğini kopyalayıp platforma göre yeniden adlandır
- Çok platformlu projelerde hepsini aynı anda tut (içerikler özdeş)

---

## Kalite Kontrol Listesi

Tüm dosyalar oluşturulunca aşağıdakileri kontrol et ve kullanıcıya raporla:

### BRIEF.md
- [ ] Müşteri mesajı verbatim yapıştırıldı
- [ ] Gereksinimler müşteri mesajından doğrudan çıkarıldı, yorum katılmadı
- [ ] Renk tokenları hex + kullanım kuralıyla tanımlandı
- [ ] WCAG fail kombinleri uyarı olarak belirtildi
- [ ] Çatışmalar / tutarsızlıklar belgelendi (yoksa bölüm kaldırıldı)
- [ ] Açık sorular listesi var

### CONTENT.md
- [ ] Tüm metinler verbatim (düzeltme yapılmadı)
- [ ] Kaynak dosya referansı var
- [ ] "Değiştirme" kuralı dosyanın başında
- [ ] Eksik içerikler `<!-- FILL: ... -->` ile işaretlendi

### DESIGN.md
- [ ] Renk tokenları hex + kontrast oranı ile
- [ ] WCAG 2.1 AA kararı var
- [ ] Her bölüm için desktop + mobil layout spec var
- [ ] Kaçınılacaklar listesi var
- [ ] Breakpoint'ler tanımlandı
- [ ] Bileşen spec'leri (button, input, card) var

### CLAUDE.md
- [ ] Stack bilgisi var
- [ ] 4 belge "Belgeleri Oku" listesinde
- [ ] Kaynak gerçek hiyerarşisi tanımlandı
- [ ] Kesin kararlar listesi var (kararlar alındıysa)
- [ ] Değişmez kısıtlamalar listesi var
- [ ] "Şüphe durumunda" yönlendirmesi var

---

## Notlar

**Bu sistem hakkında:**
Bu dosya AZA Ev Gereçleri Dış Ticaret projesinde (2026) geliştirilen 4-dosya bağlam metodolojisinden
damıtılmıştır. Referans proje: `~/Projects/aza/` — BRIEF.md, CONTENT.md, DESIGN.md, CLAUDE.md.

**Yeni bir projede kullanım:**
1. Bu `project-init.md` dosyasını yeni proje dizinine koy
2. Claude Code'a (veya başka LLM'e) okut: `"Bu dosyayı oku ve yeni proje altyapısını kurma sürecini başlat"`
3. LLM röportaj sorularını soracak — cevapla
4. 4 dosya oluşturulunca `project-init.md`'yi silebilir veya arşivleyebilirsin
