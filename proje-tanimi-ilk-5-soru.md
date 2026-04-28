# Proje Tanimi - Ilk 5 Soru

## 1. Proje adi ve musteri/sirket adi nedir?

**Proje adi:** Cok Firmali CMS Paneli / Multi-Tenant Business CMS

**Ilk musteri / ornek musteri:** Gusto Kartepe

Bu proje, restoranlar, dis klinikleri, guzellik merkezleri, hizmet isletmeleri, kucuk ve orta olcekli yerel firmalar icin web sitesi ve icerik yonetim paneli saglayan cok firmali bir CMS platformudur.

Ilk canli kullanim senaryosu Gusto Kartepe adli restoran uzerinden dusunulmektedir. Ancak sistem tek bir restorana ozel degil, farkli sektorlerdeki isletmelere uyarlanabilecek sekilde tasarlanmalidir.

Her firma kendi hesabina, logosuna, marka renklerine, sayfalarina, iceriklerine, medya dosyalarina, SEO ayarlarina, rezervasyonlarina ve sektorel modullerine sahip olacaktir.

Proje uzun vadede ajanslarin veya web hizmeti veren sirketlerin musterilerine yonetilebilir web siteleri sunabilmesi icin gelistirilecektir.

**Kisa cevap:**

- **Proje adi:** Cok Firmali CMS Paneli
- **Ilk musteri:** Gusto Kartepe
- **Genel musteri profili:** Restoranlar, dis klinikleri ve hizmet bazli yerel isletmeler

## 2. Bu ne tur bir proje?

Bu proje bir **web app / SaaS mantiginda calisan cok firmali CMS paneli** projesidir.

Sadece tek bir web sitesi degil, birden fazla firmanin kendi web sitesini ve iceriklerini yonetebilecegi merkezi bir yonetim panelidir. Sistem, ajans veya yazilim sirketi tarafindan farkli musterilere sunulabilecek bir altyapi olarak tasarlanmalidir.

Projenin temel yapisi su sekilde dusunulmelidir:

- **Admin CMS Paneli:** Firmalarin iceriklerini, sayfalarini, medya dosyalarini, SEO ayarlarini, menulerini, rezervasyonlarini ve kullanicilarini yonetebilecegi arayuz.
- **Firma Bazli Web Siteleri:** Her firmanin kendi markasina, logosuna, sayfalarina ve iceriklerine gore olusturulan web sitesi.
- **Cok Firmali SaaS Altyapisi:** Sistemde birden fazla firma olacak ve her firma yalnizca kendi verilerini yonetebilecek.
- **Moduler Yapi:** Restoran icin menu ve rezervasyon modulu; dis klinigi icin hizmetler, doktorlar, randevu talepleri; farkli sektorler icin ozel moduller eklenebilir olmali.
- **SEO Odakli Icerik Yonetimi:** Sayfa bazli meta title, meta description, canonical URL, Open Graph, schema markup, robots ayarlari gibi SEO ozellikleri panelden yonetilebilmeli.
- **Medya Yonetimi:** Gorseller ve videolar S3 uzerinde tutulmali; maliyet yonetimi icin silme, arsivleme veya alternatif yedekleme secenekleri dusunulmeli.

**Kisa cevap:**

Bu proje, React + Tailwind frontend, Node.js + JavaScript backend ve MongoDB veritabani ile gelistirilecek, cok firmali ve moduler bir CMS / SaaS web uygulamasidir.

## 3. Projenin birincil hedefi nedir?

Projenin birincil hedefi, farkli sektorlerdeki isletmeler icin **yonetilebilir, SEO uyumlu, cok dilli ve firma bazli web siteleri uretilebilen kapsamli bir CMS altyapisi** olusturmaktir.

Bu sistem sayesinde ajans veya yazilim sirketi, her musteri icin sifirdan ozel panel gelistirmek yerine ayni altyapi uzerinden farkli firmalara web sitesi ve icerik yonetimi sunabilecektir. Firmalar da teknik bilgiye ihtiyac duymadan kendi web sitelerini yonetebilecektir.

Birincil hedefler:

- Firmalarin kendi web sitelerini kolayca yonetebilmesini saglamak.
- Ajansin farkli musterilere hizlica web sitesi teslim edebilmesini saglamak.
- Sayfa, icerik, medya, SEO ve sektorel modulleri tek panelden yonetilebilir hale getirmek.
- Restoran, dis klinigi, hizmet isletmesi gibi farkli sektörlere uyarlanabilir esnek bir yapi kurmak.
- SEO calismalarini panel uzerinden yetki bazli yonetilebilir hale getirmek.
- Cok dilli icerik altyapisi sunmak.
- Firmaya ozel logo, marka rengi, icerik, menu, hizmet, rezervasyon/randevu gibi alanlari desteklemek.
- Medya dosyalarini duzenli, olceklenebilir ve maliyet kontrollu sekilde yonetmek.

Projenin ticari hedefleri:

- Ajansin musterilerine daha hizli web sitesi kurabilmesi.
- Her musteriye ozel CMS paneli sunarak hizmet kalitesini artirmasi.
- Bakim, guncelleme, SEO yonetimi ve icerik yonetimi sureclerini tek merkezden kontrol etmesi.
- Ileride abonelik veya paket bazli SaaS modeline donusturulebilecek bir altyapi olusturmasi.

**Kisa cevap:**

Birincil hedef, restoranlar, dis klinikleri ve hizmet isletmeleri icin firma bazli yonetilebilir web siteleri olusturmayi saglayan, SEO uyumlu, cok dilli, moduler ve olceklenebilir bir CMS paneli gelistirmektir.

## 4. Hedef kitle kim?

Projenin hedef kitlesi iki katmanlidir: sistemi kullanan isletmeler ve bu isletmelerin son musterileri.

**Birincil hedef kitle: B2B isletmeler**

Bu CMS paneli dogrudan restoranlar, kafeler, dis klinikleri, guzellik merkezleri, saglik hizmeti veren kucuk/orta olcekli isletmeler, oteller, yerel hizmet saglayicilar ve benzeri firmalar icin tasarlanacaktir.

Ornek sektorler:

- Restoranlar
- Kafeler
- Dis klinikleri
- Guzellik merkezleri
- Kuaforler
- Spa ve wellness isletmeleri
- Oteller ve butik konaklama isletmeleri
- Klinikler
- Yerel hizmet isletmeleri
- Ajans musterisi olan KOBI'ler

**Ikincil hedef kitle: Ajans / yazilim sirketi calisanlari**

Paneli ajans tarafinda kullanan kisiler de onemli bir hedef kitledir. Bu kisiler musteri adina icerik, sayfa, SEO, medya ve teknik ayarlari yonetebilir.

Ajans kullanicilari sunlar olabilir:

- Admin kullanici
- Icerik editoru
- SEO uzmani
- Tasarim / marka sorumlusu
- Musteri yoneticisi
- Teknik ekip
- Destek personeli

**Son kullanici hedef kitlesi**

Her firmanin web sitesini ziyaret eden musteriler de dolayli hedef kitledir. Ornegin:

- Restorana menu gormek veya rezervasyon yapmak icin giren kullanicilar
- Dis kliniginde hizmetleri inceleyen ve iletisim/randevu talebi olusturan kullanicilar
- Guzellik merkezinden hizmet ve fiyat bilgisi almak isteyen kullanicilar
- Google uzerinden yerel hizmet arayan potansiyel musteriler

**Cografi hedef**

Ilk etapta Turkiye pazari dusunulmektedir. Ilk musteri Gusto Kartepe oldugu icin yerel isletmeler ve Turkiye'de hizmet veren KOBI'ler onceliklidir.

Ancak cok dilli altyapi sayesinde ileride Ingilizce icerik girilebilecek, turistik bolgelerdeki restoran/otel gibi isletmelere de hizmet verilebilecektir.

**Demografik hedef**

- Isletme sahipleri
- Restoran/kafe yoneticileri
- Klinik sahipleri
- Pazarlama sorumlulari
- Ajans calisanlari
- SEO ve icerik uzmanlari
- Yerel isletmelerin dijital varligini yoneten kisiler

**Kisa cevap:**

Hedef kitle B2B odaklidir. Restoranlar, dis klinikleri, kafeler, guzellik merkezleri, oteller ve yerel hizmet isletmeleri ana hedef kitledir. Paneli ayrica ajans calisanlari, SEO uzmanlari ve icerik editorleri kullanacaktir. Web sitelerinin son kullanicilari ise bu isletmelerden hizmet almak isteyen B2C musterilerdir.

## 5. Proje dil(leri): Turkce mi, Ingilizce mi, cok dilli mi?

Proje **cok dilli altyapiya sahip** olmalidir.

CMS panelinin arayuzu baslangicta Turkce desteklemeli, fakat sistem mimarisi Ingilizce arayuz destegine de uygun kurulmalidir. Yani panelde kullanilan sabit metinler i18n yapisiyla yonetilmeli; ileride Turkce/Ingilizce arasinda gecis yapilabilecek sekilde tasarlanmalidir.

Icerik tarafi ise tamamen cok dilli olmalidir. Firmalar iceriklerini yalnizca Turkce girebilir, yalnizca Ingilizce girebilir veya hem Turkce hem Ingilizce olarak yonetebilir. Bu zorunlu degil, firma bazli tercih edilebilir olmalidir.

Dil yapisi su sekilde olmalidir:

- **Panel arayuz dili:** Turkce ve Ingilizce desteklenebilir olmali.
- **Firma icerik dili:** Firma bazli secilebilir olmali.
- **Sayfa icerikleri:** Turkce, Ingilizce veya cok dilli girilebilir olmali.
- **SEO alanlari:** Her dil icin ayri yonetilebilmeli.
- **URL yapisi:** Cok dilli yapi desteklenmeli.
- **Menu ve navigasyon:** Her dil icin ayri icerik gosterebilmeli.
- **Schema markup:** Dil bazli iceriklere gore duzenlenebilmeli.
- **Medya alt metinleri:** Her dil icin ayri alt text girilebilmeli.
- **Restoran menuleri veya hizmet listeleri:** Turkce/Ingilizce icerik desteklemeli.

Ornek icerik yapisi:

Bir sayfanin Turkce icerigi:

- Baslik
- Aciklama
- Icerik
- Meta title
- Meta description
- URL slug
- Gorsel alt metni

Ayni sayfanin Ingilizce icerigi:

- Title
- Description
- Content
- Meta title
- Meta description
- URL slug
- Image alt text

**Kisa cevap:**

Proje cok dilli olmalidir. CMS paneli Turkce ve Ingilizce arayuz altyapisini desteklemeli; firma icerikleri ise Turkce, Ingilizce veya iki dilde yonetilebilir olmalidir. SEO alanlari, sayfalar, menuler, hizmetler, medya alt metinleri ve schema verileri dil bazli duzenlenebilmelidir.

## 6. Musteri brief'ini veya talebini oldugu gibi yapistir. Duzeltme yapma, verbatim isteniyor.

Asagidaki metin proje sahibinin talebidir ve duzeltilmeden, ifade yapisi korunarak aktarilmalidir:

```text
ben sana projeyi detaylandırıyorum 

şimdi şu şekil bir proje istiyorum ben restoran tarzı işletmeler dişçiler vb işletmelere web sitesi yapacagım ama bu web sitesini firmaların yonetebilicegi bir cms paneli istiyorum 

cms panelinde kullanıcagım teknolojiler frontend için react tailwind kullanabilirsin 

backend tarafı için ise mongodb node.js java script ile yazılıcak kesinlikle 

firma bazlı olucak her firmanın logosu olucak ve onlara işlem olucak 

detaylı bir cms paneli olucak sayfalar üretebilicekler 

seo ile ilgili bütün kavramları ajans ile çalışan kişilerin yetki bazlı kullanabilicekler buradan meta title dan tut schemalarına kadar ayarlayabilicekler 

restoranda menu ekleme olabilicek rezervasyon takibi gibi birşeyde olabilir tabi bu firmanın hizmetine göre değişkenlik gösterir şuan elimde olan müşteri gusto kartepe diye bir restoran ama sonrasında ne tarz müşteriler gelicek bilmiyorum bu yüzden çok detaylı ve uyarlanabilir bir proje istiyorum 

cms panelinde hem gece modu hem aydınlık mod olucak 

cms paneli türkçe ingilzce alt yapısını destekleyebilicek 

cmss panelinde içerikler kullanıcı ne girerse öyle dil özellikleri olabilicek içerikleri isterse ingilizce isterse türkçe şeklinde olabilicek 

görseller s3 te tutulucak ama yedek birşery daha yapmamız lazım maliyet açısından yeri geldimi s3 tekileri silebilcek görsel ve videolar 

detaylı bir cms paneli istiyorum açıkçası 

şimdi ben sana soruları atıcam sen buna göre cevap vericeksin ben bu cevabı farklı bir llm de kullanıcam anlaştık mı 
```

**Yorum / ozet:**

Bu brief'e gore proje, restoranlar ve farkli hizmet isletmeleri icin kullanilabilecek, firma bazli, cok dilli, SEO odakli, moduler ve detayli bir CMS panelidir. Ilk musteri Gusto Kartepe restoranidir, ancak sistem sadece restoranlara ozel degil; dis klinigi, kafe, guzellik merkezi ve benzeri farkli sektorlerdeki isletmelere uyarlanabilecek sekilde tasarlanmalidir.

## 7. Musteriden gelen ekler/dosyalar var mi? Logo, metin dosyasi, Figma, tasarim sistemi vb. Hangileri geldi, hangileri eksik?

Su an icin musteri tarafindan paylasilmis net bir ek dosya bulunmamaktadir.

Mevcut durumda bilinenler:

- Ilk musteri olarak **Gusto Kartepe** adi belirtilmistir.
- Gusto Kartepe'nin restoran oldugu belirtilmistir.
- CMS panelinin genel ihtiyaclari yazili olarak tarif edilmistir.
- Frontend icin React + Tailwind kullanilabilecegi belirtilmistir.
- Backend icin MongoDB + Node.js + JavaScript kullanilmasi kesin olarak belirtilmistir.
- Gorsel ve videolar icin S3 kullanilmasi istenmistir.
- Ek olarak maliyet ve yedekleme icin alternatif medya stratejisi gerektigi belirtilmistir.

Gelen dosyalar:

- Logo: Henuz gelmedi.
- Marka renkleri: Henuz gelmedi.
- Kurumsal kimlik dosyasi: Henuz gelmedi.
- Figma tasarimi: Henuz gelmedi.
- Tasarim sistemi: Henuz gelmedi.
- Site icerikleri: Henuz gelmedi.
- Menu icerigi: Henuz gelmedi.
- Hizmet listesi: Henuz gelmedi.
- Fotograf/video arsivi: Henuz gelmedi.
- SEO anahtar kelime listesi: Henuz gelmedi.
- Domain/hosting bilgileri: Henuz gelmedi.
- Mevcut web sitesi bilgisi: Henuz paylasilmadi.
- Sosyal medya hesaplari: Henuz paylasilmadi.

Eksik olan ve ileride istenmesi gereken dosya/bilgiler:

- Gusto Kartepe logosu
- Restoranin marka renkleri ve varsa kurumsal kimligi
- Restoran menusu
- Urun/kategori/fiyat bilgileri
- Restoran fotograflari
- Mekan ici/disi gorseller
- Video dosyalari varsa orijinal halleri
- Iletisim bilgileri
- Adres ve harita bilgisi
- Calisma saatleri
- Rezervasyon kurallari
- Sosyal medya linkleri
- SEO icin hedef anahtar kelimeler
- Rakip veya begenilen web sitesi ornekleri
- Panelde bulunmasi istenen roller ve yetkiler
- Firma bazli kullanici listesi
- Ileride desteklenecek sektorler icin ornek modul ihtiyaclari

**Kisa cevap:**

Su an musteri tarafindan logo, Figma, tasarim sistemi, kurumsal kimlik, fotograf, menu veya hazir icerik dosyasi paylasilmamistir. Yalnizca proje ihtiyaci metinsel olarak tarif edilmistir. Ilk musteri Gusto Kartepe olarak belirtilmistir. Tasarim ve teknik analiz icin logo, marka kimligi, menu, gorseller, iletisim bilgileri, SEO hedefleri ve referans siteler daha sonra istenmelidir.

## 8. Referans proje veya rakip site var mi? URL varsa paylas.

Su an icin kullanici tarafindan net bir referans proje, rakip site veya URL paylasilmamistir.

Ancak proje turu geregi iki farkli referans kategorisi dusunulmelidir:

1. **CMS paneli / SaaS urun referanslari**

Bu proje icin panel tarafinda incelenebilecek referans yaklasimlari:

- Webflow CMS mantigi
- WordPress admin paneli mantigi
- Shopify admin paneli mantigi
- Strapi CMS mantigi
- Sanity Studio mantigi
- Wix / Squarespace site yonetim mantigi

Bu referanslar birebir kopyalanmayacak, ancak su acilardan fikir verebilir:

- Icerik modelleme
- Sayfa olusturma
- Medya kutuphanesi
- SEO ayarlari
- Kullanici rolleri
- Tema ve marka ayarlari
- Cok dilli icerik yonetimi
- Moduler sektor yapisi

2. **Ilk musteri Gusto Kartepe icin restoran sitesi referanslari**

Restoran web sitesi tarafinda incelenmesi gereken alanlar:

- Menu sunumu
- Rezervasyon akisi
- Galeri yapisi
- Harita ve iletisim bolumu
- Calisma saatleri
- Mobil deneyim
- Yerel SEO yapisi
- Google Business Profile ile uyumlu bilgiler
- Schema.org Restaurant schema kullanimi

Su an URL paylasilmadigi icin rakip analizi yapilmamistir.

**Kisa cevap:**

Henuz referans proje veya rakip site URL'si paylasilmadi. Bu nedenle rakip analizi beklemededir. Ileride Gusto Kartepe'nin mevcut web sitesi varsa onun URL'si, yakin bolgedeki rakip restoran siteleri ve begenilen CMS/SaaS panel ornekleri paylasilmalidir. Panel tarafinda Webflow, WordPress, Shopify, Strapi ve Sanity gibi sistemlerin icerik yonetimi yaklasimlari referans alinabilir; restoran sitesi tarafinda ise menu, rezervasyon, galeri, iletisim ve yerel SEO ozellikleri incelenmelidir.

## 9. Onayli bir renk paleti var mi? Hex kodlarini paylas. Yoksa marka yonlendirmesi var mi?

Su an icin onayli bir renk paleti veya resmi hex kodlari paylasilmamistir.

Bu nedenle tasarim iki ayri seviyede dusunulmelidir:

1. **CMS panelinin genel renk sistemi**
2. **Her firmaya ozel marka renkleri**

CMS paneli tek bir musterinin marka renklerine bagli olmamalidir. Cunku bu sistem sadece Gusto Kartepe icin degil, ileride restoranlar, dis klinikleri, kafeler, guzellik merkezleri ve farkli hizmet isletmeleri icin kullanilacaktir.

Bu yuzden panelin ana tasarimi sade, kurumsal, okunabilir ve sektor bagimsiz olmalidir. Firma bazli alanlarda ise her firmanin logosu, ana rengi, ikincil rengi ve vurgu rengi tanimlanabilmelidir.

**Onerilen CMS panel renk paleti:**

- Primary: `#2563EB`
- Primary Hover: `#1D4ED8`
- Secondary: `#0F766E`
- Accent: `#F59E0B`
- Success: `#16A34A`
- Warning: `#F97316`
- Error: `#DC2626`
- Info: `#0284C7`

**Light mode renkleri:**

- Background: `#F8FAFC`
- Surface: `#FFFFFF`
- Surface Muted: `#F1F5F9`
- Border: `#E2E8F0`
- Text Primary: `#0F172A`
- Text Secondary: `#475569`
- Text Muted: `#64748B`

**Dark mode renkleri:**

- Background: `#0B1120`
- Surface: `#111827`
- Surface Muted: `#1F2937`
- Border: `#334155`
- Text Primary: `#F8FAFC`
- Text Secondary: `#CBD5E1`
- Text Muted: `#94A3B8`

**Firma bazli marka renkleri icin onerilen alanlar:**

- Brand Primary Color
- Brand Secondary Color
- Brand Accent Color
- Logo Light
- Logo Dark
- Favicon
- Website Theme Mode
- Button Style
- Link Color
- Header/Footer renkleri

**Gusto Kartepe icin gecici marka yonlendirmesi:**

Gusto Kartepe bir restoran oldugu icin web sitesi tarafinda daha sicak, davetkar ve premium bir restoran hissi verilebilir. Ancak kesin renkler logo ve mekan gorselleri geldikten sonra belirlenmelidir.

Gecici restoran sitesi renk onerisi:

- Deep Green: `#1F3D2B`
- Warm Cream: `#F7F0E6`
- Gold Accent: `#C89B3C`
- Charcoal Text: `#1F2933`
- Warm Brown: `#7A4E2D`

Bu renkler sadece Gusto Kartepe web sitesi icin gecici oneridir. CMS panelinin ana renkleri bundan bagimsiz kalmalidir.

**Kisa cevap:**

Onayli bir renk paleti henuz yok. CMS paneli icin sektor bagimsiz, modern ve okunabilir bir renk sistemi kullanilmali; her firma icin marka renkleri ayri tanimlanabilmelidir. Gusto Kartepe icin kesin renkler logo ve marka dosyalari geldikten sonra belirlenmelidir.

## 10. Font / tipografi tercihi var mi? Yoksa sen oner.

Su an icin musteri tarafindan paylasilmis kesin bir font veya tipografi tercihi bulunmamaktadir.

CMS paneli icin okunabilirlik, hizli tarama, tablo ve form alanlarinda netlik oncelikli olmalidir. Bu nedenle modern, sade, web uyumlu ve genis karakter destegi olan bir sans-serif font kullanilmalidir.

**CMS paneli icin onerilen font:**

- Inter

Inter, dashboard, SaaS panel, tablo, form ve yogun veri arayuzleri icin uygun bir fonttur. Turkce karakter destegi vardir, modern gorunur ve uzun sureli panel kullaniminda okunabilirligi iyidir.

**Alternatif fontlar:**

- Manrope
- Source Sans 3
- IBM Plex Sans
- Noto Sans
- Plus Jakarta Sans

**Onerilen tipografi yapisi:**

- Ana font: Inter
- Fallback: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- Body text: 14px veya 15px
- Form label: 13px veya 14px
- Table text: 13px veya 14px
- Page title: 24px - 32px
- Section title: 18px - 20px
- Card title: 16px - 18px
- Yardimci metin: 12px - 13px

**Firma web siteleri icin tipografi yaklasimi:**

CMS paneli tek tip font kullanabilir; ancak firma web sitelerinde marka bazli font secimi yapilabilmelidir. Ornegin restoran icin daha premium ve karakterli bir baslik fontu, dis klinigi icin daha temiz ve medikal bir sans-serif tercih edilebilir.

Gusto Kartepe icin gecici font onerisi:

- Baslik fontu: Playfair Display veya Cormorant Garamond
- Govde fontu: Inter veya Lato

Ancak bu sadece restoran web sitesi icin gecici oneridir. CMS panelinin ana fontu sade kalmalidir.

**Kisa cevap:**

Kesin font tercihi henuz yok. CMS paneli icin Inter onerilir. Inter; modern, okunabilir, Turkce karakter destekli ve dashboard arayuzleri icin uygundur. Firma web sitelerinde ise marka bazli font secimi desteklenmelidir.

## 11. Mevcut bir tasarim sistemi var mi? Figma, Storybook, CSS framework vb.

Su an icin mevcut bir tasarim sistemi, Figma dosyasi, Storybook yapisi veya hazir UI kit paylasilmamistir.

Projede frontend teknolojisi olarak React ve Tailwind CSS kullanilabilecegi belirtilmistir. Bu nedenle tasarim sistemi proje icinde sifirdan, Tailwind tabanli olarak kurulmalidir.

**Mevcut durum:**

- Figma: Henuz yok.
- Storybook: Henuz yok.
- Hazir tasarim sistemi: Henuz yok.
- Kurumsal UI kit: Henuz yok.
- CSS framework tercihi: Tailwind CSS kullanilabilir.
- Frontend framework: React kullanilabilir.

**Onerilen tasarim sistemi yaklasimi:**

CMS paneli icin reusable component mantigiyla ilerlenmelidir. Ayni buton, input, modal, tablo, kart, badge, tab, dropdown, sidebar ve form yapilari tum panelde tekrar kullanilabilir olmalidir.

Olusturulmasi gereken temel componentler:

- Button
- Icon Button
- Input
- Textarea
- Select
- Multi Select
- Checkbox
- Radio
- Toggle
- Date Picker
- File Upload
- Image Picker
- Modal
- Drawer
- Tabs
- Table
- Data Grid
- Pagination
- Breadcrumb
- Badge
- Tooltip
- Dropdown Menu
- Sidebar Navigation
- Topbar
- Empty State
- Loading State
- Toast / Notification
- Confirmation Dialog
- Rich Text Editor wrapper
- SEO Preview component
- Language Switcher
- Theme Switcher

**Tailwind icin tasarim tokenlari:**

- Color tokens
- Spacing tokens
- Border radius tokens
- Shadow tokens
- Typography scale
- Z-index scale
- Light/dark theme tokenlari
- Firma bazli brand color degiskenleri

**Storybook onerisi:**

Baslangicta zorunlu olmayabilir, ancak proje buyudukce componentlerin dokumantasyonu ve test edilmesi icin Storybook eklenmesi faydali olur.

**Kisa cevap:**

Mevcut bir tasarim sistemi yok. React + Tailwind CSS ile proje icinde ozel bir design system kurulmalidir. Ilk asamada reusable component kutuphanesi olusturulmali; proje buyudukce Storybook eklenebilir.

## 12. Tasarim kisiligi nasil olsun? Modern/klasik, minimal/yogun, kurumsal/samimi vb.

CMS panelinin tasarim kisiligi **modern, profesyonel, sade, yogun veri yonetimine uygun ve guven veren** bir yapida olmalidir.

Bu paneli isletme sahipleri, ajans calisanlari, SEO uzmanlari, icerik editorleri ve teknik ekip kullanacaktir. Bu nedenle tasarim fazla dekoratif veya gosterisli olmamalidir. Panel, uzun sureli kullanima uygun, hizli taranabilir, net hiyerarsiye sahip ve is odakli olmalidir.

**CMS paneli tasarim kisiligi:**

- Modern
- Kurumsal
- Sade
- Guven veren
- Hizli taranabilir
- Moduler
- Profesyonel
- Veri ve form odakli
- Light/dark mode destekli
- Ajans ve musteri kullanimina uygun

**Minimal mi yogun mu?**

Panel tamamen bos ve minimal olmamali; cunku cok sayida ozellik, modul, ayar, SEO alani, medya dosyasi ve sayfa yonetimi olacak. Ancak karmasik da hissettirmemelidir.

En dogru yaklasim: **kontrollu yogunluk**.

Yani:

- Ana ekranlar sade olmali.
- Icerik ve ayar ekranlari detayli olmali.
- Gelismis ayarlar sekmeler veya accordions ile ayrilmali.
- SEO gibi uzmanlik isteyen alanlar net gruplara bolunmeli.
- Yetkiye gore gereksiz alanlar gizlenebilmeli.
- Yeni kullanici icin ekranlar korkutucu olmamali.
- Profesyonel kullanici icin yeterli derinlik saglanmali.

**Firma web siteleri icin tasarim kisiligi:**

Firma web siteleri panelden farkli olarak marka bazli degisebilmelidir.

Ornekler:

- Restoran sitesi: sicak, davetkar, premium, gorsel odakli.
- Dis klinigi sitesi: temiz, hijyenik, guven veren, modern, sakin.
- Guzellik merkezi sitesi: estetik, zarif, premium, samimi.
- Kafe sitesi: samimi, lokal, gorsel odakli.
- Kurumsal hizmet sitesi: ciddi, net, profesyonel.

**Gusto Kartepe icin gecici tasarim kisiligi:**

Gusto Kartepe restoran sitesi icin sicak, premium, dogal, davetkar ve mobilde guclu bir deneyim hedeflenebilir. Menu, rezervasyon, galeri ve iletisim alanlari hizli erisilebilir olmalidir.

**Kisa cevap:**

CMS paneli modern, profesyonel, sade, guven veren ve kontrollu yogunlukta olmalidir. Panel is odakli ve detayli olmali; ancak karmasik hissettirmemelidir. Firma web siteleri ise sektor ve markaya gore farkli tasarim kisilikleri destekleyebilmelidir.

## 13. Kesinlikle kacinilmasi gereken gorsel / dil / ton unsurlari var mi?

Su an icin musteri tarafindan ozellikle belirtilmis yasakli bir gorsel, dil veya ton unsuru bulunmamaktadir.

Ancak projenin hedefi, farkli sektorlerde kullanilabilecek profesyonel bir CMS paneli oldugu icin asagidaki unsurlardan kacinilmalidir:

**CMS panelinde kacinilmasi gerekenler:**

- Asiri renkli, oyuncak gibi veya amator gorunen arayuz.
- Sadece restoran sektorune hitap eden sabit tasarim dili.
- Fazla dekoratif ve dikkat dagitan arka planlar.
- Gereksiz animasyonlar.
- Form ve tablo okunabilirligini bozan gorsel efektler.
- Panelde fazla buyuk bosluklar nedeniyle verimsiz ekran kullanimi.
- Cok kucuk fontlar nedeniyle okunabilirlik sorunu.
- Sadece light mode'a veya sadece dark mode'a uygun tasarim.
- Sadece tek marka rengine bagli UI yapisi.
- SEO gibi teknik alanlarda yuzeysel veya eksik etiketleme.
- Kullanici yetkilerini belirsiz gosteren arayuzler.
- Her firmaya ait verilerin birbirine karisabilecegi hissi veren ekranlar.

**Dil ve ton olarak kacinilmasi gerekenler:**

- Fazla samimi, sakali veya sosyal medya dili.
- Teknik olmayan kullanicilari korkutacak agir yazilim dili.
- Belirsiz buton metinleri.
- "Submit", "Save changes", "Cancel" gibi Ingilizce metinlerin Turkce panelde karisik kullanimi.
- Hata mesajlarinda sert veya suclayici dil.
- SEO alanlarinda kullaniciyi yonlendirmeyen bos teknik ifadeler.
- Panel icinde gereksiz pazarlama metinleri.

**Firma web sitelerinde kacinilmasi gerekenler:**

- Her sektore ayni tasarimi dayatmak.
- Restoran sitesi gibi gorsel agir sayfalari klinik sitelerine aynen uygulamak.
- Dis klinigi gibi guven ve hijyen isteyen sitelerde asiri koyu, agresif veya eglenceli tasarim dili.
- Restoran sitelerinde menu, konum ve rezervasyon gibi temel aksiyonlari gizlemek.
- Mobil deneyimi ikinci plana atmak.
- Yavas yuklenen buyuk gorseller.
- SEO icin kritik alanlarin bos birakilmasi.

**Medya ve marka yonetiminde kacinilmasi gerekenler:**

- Gorselleri optimize etmeden yuklemek.
- S3 maliyetini kontrolsuz birakmak.
- Silinen medyalar icin geri donus veya arsiv stratejisi olmamasi.
- Her firmaya ait medya dosyalarinin ayni klasor yapisinda karismasi.
- Alt text ve dosya adlarini SEO acisindan bos birakmak.

**Kisa cevap:**

Kesin yasakli bir gorsel veya ton unsuru henuz belirtilmedi. Ancak CMS paneli amator, asiri dekoratif, tek sektore bagli veya karmasik olmamalidir. Dil net, profesyonel, sade ve Turkce arayuzde tutarli olmalidir. Firma web siteleri sektorlerine uygun tasarlanmali; her markaya ayni gorsel dil dayatilmamalidir.

## Grup D - Teknik Stack

## 14. Kullanilacak teknoloji stack'i nedir? Next.js, React, WordPress, Laravel, Vue vb.

Kullanilacak teknoloji stack'i musteri tarafindan buyuk oranda net belirtilmistir.

**Kesin belirtilen teknolojiler:**

- Frontend: React
- UI / styling: Tailwind CSS
- Backend: Node.js
- Backend dili: JavaScript
- Veritabani: MongoDB
- Medya depolama: S3

Bu proje WordPress, Laravel, Vue veya hazir CMS tabanli dusunulmemelidir. Proje ozel gelistirilecek bir SaaS / CMS web uygulamasi olarak ele alinmalidir.

**Onerilen genel mimari:**

- Admin panel frontend: React + Tailwind CSS
- Public website frontend: React tabanli yapi veya ihtiyaca gore Next.js
- Backend API: Node.js + Express.js veya benzeri Node.js framework'u
- Database: MongoDB
- ODM: Mongoose
- Authentication: JWT + refresh token veya session tabanli guvenli auth
- Authorization: Role Based Access Control, yani rol ve yetki bazli erisim
- File storage: AWS S3 uyumlu obje depolama
- Image optimization: Upload sirasinda resize/compress/format donusumu
- Validation: Zod, Joi veya benzeri validation kutuphanesi
- Logging: Winston veya Pino
- API dokumantasyonu: Swagger/OpenAPI

**Frontend detaylari:**

CMS paneli React ve Tailwind CSS ile gelistirilmelidir. Panelde light mode ve dark mode desteklenmelidir. Component yapisi reusable olacak sekilde planlanmalidir.

Frontend tarafinda dusunulmesi gereken ana basliklar:

- React Router veya framework'e gore route sistemi
- Protected routes
- Role based UI rendering
- Form yonetimi
- Data table yapilari
- Rich text editor
- Media picker
- SEO preview component
- Multi-language content editor
- Theme switcher
- Responsive admin layout
- Toast notification sistemi
- Modal/drawer yapilari

**Backend detaylari:**

Backend kesin olarak Node.js ve JavaScript ile yazilmalidir. TypeScript zorunlu olarak belirtilmemistir; bu nedenle temel gereksinim JavaScript'tir. Ancak proje uzun vadeli ve kapsamli olacagi icin ileride TypeScript degerlendirilebilir. Eger musteri "kesinlikle JavaScript" diyorsa TypeScript kullanilmadan temiz, moduler JavaScript mimarisi kurulmalidir.

Backend tarafinda dusunulmesi gereken ana moduller:

- Auth
- Users
- Roles & Permissions
- Tenants / Companies
- Pages
- Menus / Navigation
- SEO Settings
- Schema Markup
- Media Library
- Restaurants / Menu Management
- Reservations
- Services
- Forms / Leads
- Audit Logs
- Settings
- Languages
- Themes / Branding

**Veritabani yaklasimi:**

MongoDB firma bazli multi-tenant yapida kullanilmalidir. Her kayitta hangi firmaya ait oldugunu gosteren `tenantId` veya `companyId` bulunmalidir.

Temel koleksiyon ornekleri:

- companies
- users
- roles
- permissions
- pages
- pageTemplates
- media
- menus
- seoSettings
- schemas
- restaurants
- restaurantMenus
- reservations
- services
- forms
- leads
- auditLogs
- settings
- languages

**Cok firmali yapi:**

Sistem multi-tenant olmalidir. Her firma yalnizca kendi verilerini gorebilmeli ve yonetebilmelidir. Super admin ise tum firmalari gorebilmeli, yeni firma olusturabilmeli ve firma bazli modulleri aktif/pasif hale getirebilmelidir.

**Kisa cevap:**

Teknoloji stack'i React + Tailwind CSS frontend, Node.js + JavaScript backend, MongoDB veritabani ve S3 medya depolama seklinde olmalidir. Proje hazir CMS degil, ozel gelistirilecek cok firmali bir SaaS/CMS panelidir.

## 15. Hosting / deployment nerede? Vercel, Netlify, kendi sunucu, cPanel vb.

Hosting ve deployment ortami henuz kesin olarak belirtilmemistir.

Projenin yapisi klasik statik site veya basit landing page olmadigi icin cPanel odakli bir kurulum yerine daha kontrollu bir cloud veya VPS mimarisi tercih edilmelidir.

Bu proje icin farkli deployment secenekleri degerlendirilebilir:

### Onerilen production mimarisi

- Frontend: Vercel, Netlify veya cloud sunucu uzerinde static build
- Backend API: VPS, Render, Railway, Fly.io, DigitalOcean, AWS EC2 veya benzeri Node.js destekli ortam
- Database: MongoDB Atlas
- Media storage: AWS S3 veya S3 uyumlu alternatif
- CDN: CloudFront, Cloudflare veya storage provider CDN'i
- DNS: Cloudflare
- SSL: Cloudflare, Let's Encrypt veya hosting saglayici SSL

### Daha profesyonel ve olceklenebilir secenek

- Frontend: Vercel
- Backend: AWS ECS / EC2 / DigitalOcean App Platform
- Database: MongoDB Atlas
- Object Storage: AWS S3
- CDN: AWS CloudFront veya Cloudflare
- Logs/Monitoring: Sentry + provider logs
- CI/CD: GitHub Actions

### Maliyet odakli baslangic secenegi

- Frontend: Vercel veya Netlify free/pro plan
- Backend: Tek VPS uzerinde Node.js + PM2
- Reverse proxy: Nginx
- Database: MongoDB Atlas free/paid tier veya VPS uzerinde MongoDB
- Media storage: S3 uyumlu daha uygun maliyetli servis
- DNS/CDN: Cloudflare

### CPanel neden ana tercih olmamali?

CPanel basit PHP tabanli siteler icin uygun olabilir; ancak bu proje Node.js backend, MongoDB, S3, multi-tenant yapi, API, dosya yukleme, yetkilendirme ve ileride olceklenme ihtiyaci olan bir SaaS/CMS uygulamasidir. Bu nedenle cPanel yerine Node.js uygulamalarini daha saglikli calistirabilecek bir ortam secilmelidir.

**Deployment gereksinimleri:**

- Ortam degiskenleri yonetimi
- Ayrik frontend/backend deployment
- Staging ve production ortamlari
- Otomatik build/deploy
- SSL
- Domain ve subdomain yonetimi
- Log takibi
- Backup stratejisi
- MongoDB backup
- S3 lifecycle policy
- Dosya silme ve arsivleme mekanizmasi

**Firma bazli domain modeli:**

Sistem farkli domain yaklasimlarini desteklemelidir:

- Firma subdomain'i: `gusto.example.com`
- Firma kendi domain'i: `gustokartepe.com`
- Panel domain'i: `panel.example.com`
- API domain'i: `api.example.com`

**Kisa cevap:**

Hosting/deployment henuz kesin degil. Onerilen yapi; frontend icin Vercel/Netlify, backend icin Node.js destekli VPS veya cloud servis, veritabani icin MongoDB Atlas, medya icin S3 ve DNS/CDN icin Cloudflare kullanilmasidir. CPanel ana tercih olmamalidir.

## 16. Ozel entegrasyon gereksinimleri var mi? Form backend, CRM, analytics, odeme sistemi vb.

Evet, proje yapisi geregi birden fazla entegrasyon ihtiyaci dogacaktir. Ancak su an musteri tarafindan kesin olarak belirtilen tek entegrasyon medya depolama icin S3'tur. Diger entegrasyonlar proje kapsaminda planlanmali, ancak fazlara bolunerek uygulanmalidir.

**Kesin belirtilen entegrasyon:**

- S3 veya S3 uyumlu medya depolama

Gorseller ve videolar S3 uzerinde tutulacaktir. Ancak maliyet acisindan yedekleme, arsivleme ve silme stratejisi de gereklidir. Yeri geldiginde S3'teki gorsel ve videolar silinebilmeli, arsivlenebilmeli veya alternatif depolama alanina tasinabilmelidir.

**Olmasi gereken temel entegrasyonlar:**

- Form backend
- E-posta bildirimleri
- Analytics
- SEO ve arama motoru entegrasyonlari
- Medya depolama
- Harita entegrasyonu
- Rezervasyon / randevu bildirimleri

**Form backend:**

Firma web sitelerinde iletisim formu, rezervasyon formu, randevu talebi, teklif formu veya lead formu bulunabilir. Bu formlar CMS backend'e kaydedilmeli ve ilgili firma panelinden goruntulenebilmelidir.

Form modulu sunlari desteklemelidir:

- Firma bazli formlar
- Dinamik form alanlari
- Form submission kaydi
- Spam korumasi
- E-posta bildirimi
- Panel uzerinden lead takibi
- Form verilerinin CSV export edilmesi

**E-posta entegrasyonu:**

Rezervasyon, randevu, iletisim formu ve sistem bildirimleri icin e-posta altyapisi gereklidir.

Kullanilabilecek servisler:

- Amazon SES
- SendGrid
- Mailgun
- Brevo
- SMTP

**Analytics entegrasyonu:**

Firma web siteleri icin ziyaretci ve donusum takibi onemlidir.

Desteklenmesi gerekenler:

- Google Analytics 4
- Google Tag Manager
- Meta Pixel
- Google Search Console dogrulama kodlari
- Custom tracking scripts

Bu entegrasyonlar firma bazli ayarlanabilmelidir.

**SEO entegrasyonlari:**

CMS panelinde SEO alanlari detayli olmalidir.

Desteklenmesi gerekenler:

- Meta title
- Meta description
- Canonical URL
- Robots meta
- Open Graph
- Twitter Cards
- JSON-LD schema markup
- XML sitemap
- Robots.txt
- Hreflang
- Redirect management
- 404 tracking
- Slug management

**Harita entegrasyonu:**

Restoran, klinik ve yerel isletmeler icin harita entegrasyonu onemlidir.

Desteklenmesi gerekenler:

- Google Maps embed
- Google Maps link
- Firma adres bilgisi
- Konum koordinatlari
- Yol tarifi linki

**Rezervasyon / randevu entegrasyonu:**

Restoranlar icin rezervasyon, klinikler icin randevu talebi modulu olmalidir.

Ilk fazda panel icinde basit takip sistemi yeterli olabilir:

- Rezervasyon/randevu formu
- Panelde listeleme
- Durum yonetimi
- E-posta bildirimi
- Telefon/e-posta ile geri donus takibi

Ileride dis sistem entegrasyonlari eklenebilir:

- Google Calendar
- Outlook Calendar
- WhatsApp bildirimleri
- SMS servisleri
- CRM sistemleri

**Odeme sistemi:**

Su an icin odeme sistemi kesin bir gereksinim olarak belirtilmemistir. Ancak proje ileride SaaS abonelik modeline donusecekse ajans/musteri paketleri icin odeme altyapisi eklenebilir.

Potansiyel odeme entegrasyonlari:

- iyzico
- PayTR
- Stripe
- Shopier

Restoran tarafinda online siparis veya on odemeli rezervasyon eklenirse odeme sistemi tekrar degerlendirilmelidir.

**CRM entegrasyonu:**

Su an kesin CRM entegrasyonu yoktur. Ancak lead formlari ve randevu talepleri ileride CRM'e aktarilabilir.

Potansiyel CRM entegrasyonlari:

- HubSpot
- Zoho CRM
- Pipedrive
- Monday.com
- Ozel webhook entegrasyonlari

**Guvenlik ve spam korumasi:**

Formlar icin spam korumasi dusunulmelidir.

Kullanilabilecek cozumler:

- Cloudflare Turnstile
- Google reCAPTCHA
- Honeypot field
- Rate limiting

**Kisa cevap:**

Kesin entegrasyon olarak S3 medya depolama vardir. Ayrica form backend, e-posta bildirimleri, GA4/GTM, Search Console, SEO metadata, sitemap, robots.txt, harita entegrasyonu, rezervasyon/randevu takibi ve spam korumasi planlanmalidir. Odeme ve CRM entegrasyonu su an kesin degil, ancak ileride SaaS abonelik veya lead yonetimi icin eklenebilir.

## Grup E - Icerik ve Kapsam

## 17. Site/uygulama yapisi: kac sayfa veya ekran, hangi bolumler?

Bu proje tek bir web sitesi degil, cok firmali bir CMS paneli ve bu panelden yonetilecek firma web siteleri olarak dusunulmelidir. Bu nedenle kapsam iki ana parcaya ayrilmalidir:

1. CMS panel ekranlari
2. Firma web sitesi sayfalari

Ilk musteri Gusto Kartepe oldugu icin restoran odakli moduller onceliklidir. Ancak sistem sadece restorana ozel tasarlanmamali; dis klinigi, guzellik merkezi, kafe, otel ve hizmet isletmeleri gibi farkli sektorleri destekleyecek moduler bir yapida olmalidir.

### CMS panel ana ekranlari

CMS panelde bulunmasi gereken temel ekranlar:

- Giris / Login
- Sifremi unuttum
- Dashboard
- Firma secimi / firma yonetimi
- Firma ayarlari
- Marka ve logo ayarlari
- Kullanici yonetimi
- Rol ve yetki yonetimi
- Sayfa yonetimi
- Sayfa olusturma / duzenleme
- Sayfa taslaklari
- Menu / navigasyon yonetimi
- Medya kutuphanesi
- Gorsel/video yukleme
- Medya detay ve SEO ayarlari
- SEO yonetimi
- Schema markup yonetimi
- Redirect yonetimi
- Sitemap / robots ayarlari
- Dil ayarlari
- Tema ve gorunum ayarlari
- Form yonetimi
- Lead / form basvurulari
- Bildirimler
- Audit log / islem gecmisi
- Genel sistem ayarlari

### Restoran modulu ekranlari

Ilk musteri Gusto Kartepe restoran oldugu icin restoran modulu desteklenmelidir.

Restoran modulu ekranlari:

- Restoran profil bilgileri
- Menu kategorileri
- Menu urunleri
- Urun gorselleri
- Urun fiyatlari
- Urun aciklamalari
- Alerjen / icerik bilgileri
- One cikan urunler
- Gunluk veya sezonluk menu
- Rezervasyon talepleri
- Rezervasyon durum yonetimi
- Calisma saatleri
- Masa/kapasite bilgisi, gerekiyorsa
- Iletisim ve harita bilgileri

### Diger sektorler icin planlanabilecek moduller

Sistem ileride farkli sektorler icin genisletilebilmelidir.

Dis klinigi icin:

- Hizmetler
- Doktorlar / ekip
- Randevu talepleri
- Tedavi kategorileri
- Hasta bilgilendirme sayfalari
- Klinik galeri

Guzellik merkezi icin:

- Hizmet kategorileri
- Hizmet fiyatlari
- Uzmanlar
- Randevu talepleri
- Kampanyalar
- Galeri

Otel / konaklama icin:

- Oda tipleri
- Oda ozellikleri
- Galeri
- Rezervasyon talepleri
- Olanaklar
- Konum ve ulasim

### Firma web sitesi sayfalari

Her firma icin olusturulabilecek standart web sitesi sayfalari:

- Ana sayfa
- Hakkimizda
- Hizmetler veya menu
- Hizmet/urun detay sayfasi
- Galeri
- Blog / duyurular
- Iletisim
- Rezervasyon veya randevu
- KVKK / gizlilik politikasi
- Cerez politikasi
- SSS

Gusto Kartepe restoran sitesi icin ilk asamada onerilen sayfalar:

- Ana sayfa
- Hakkimizda
- Menu
- Menu kategori detaylari
- Galeri
- Rezervasyon
- Iletisim
- Blog veya duyurular, istege bagli
- KVKK / gizlilik politikasi

### CMS panelde sayfa olusturma yapisi

Panelde firmalar veya ajans kullanicilari yeni sayfalar olusturabilmelidir. Sayfa olustururken su alanlar desteklenmelidir:

- Sayfa basligi
- Slug / URL
- Dil secimi
- Sayfa durumu: taslak, yayinda, arsiv
- Icerik bloklari
- SEO alanlari
- Open Graph alanlari
- Schema tipi
- Featured image
- Yayina alma tarihi
- Yetki bazli duzenleme

### Onerilen MVP kapsam

Ilk surumde su ekranlar oncelikli olabilir:

- Login
- Dashboard
- Firma yonetimi
- Kullanici ve rol yonetimi
- Sayfa yonetimi
- Medya kutuphanesi
- SEO ayarlari
- Menu / navigasyon yonetimi
- Restoran menu yonetimi
- Rezervasyon talepleri
- Dil ayarlari
- Tema / marka ayarlari

**Kisa cevap:**

Proje kapsaminda hem CMS panel ekranlari hem de firma web sitesi sayfalari bulunmalidir. CMS panelde dashboard, firma yonetimi, kullanicilar, roller, sayfalar, medya, SEO, schema, dil, tema, formlar, restoran menusu ve rezervasyon ekranlari olmalidir. Firma web sitelerinde ana sayfa, hakkimizda, menu/hizmetler, galeri, rezervasyon/randevu, iletisim ve yasal sayfalar desteklenmelidir.

## 18. Tum metin iceriklerini simdi paylasabilir misin? Verbatim - hicbir seyi yeniden yazma. Yoksa hangi bolumlerin icerigi eksik? Placeholder mi kullanilsin?

Su an tum metin icerikleri paylasilmamistir.

Verbatim olarak elimizde yalnizca proje sahibinin genel proje talebi vardir. Bu talep 6. maddede oldugu gibi duzeltilmeden eklenmistir.

Firma web sitesi, CMS panel metinleri, Gusto Kartepe restoran icerikleri, menu metinleri, hakkimizda yazisi, SEO metinleri ve yasal metinler henuz paylasilmamistir.

### Su an elde olan verbatim metin

```text
ben sana projeyi detaylandırıyorum 

şimdi şu şekil bir proje istiyorum ben restoran tarzı işletmeler dişçiler vb işletmelere web sitesi yapacagım ama bu web sitesini firmaların yonetebilicegi bir cms paneli istiyorum 

cms panelinde kullanıcagım teknolojiler frontend için react tailwind kullanabilirsin 

backend tarafı için ise mongodb node.js java script ile yazılıcak kesinlikle 

firma bazlı olucak her firmanın logosu olucak ve onlara işlem olucak 

detaylı bir cms paneli olucak sayfalar üretebilicekler 

seo ile ilgili bütün kavramları ajans ile çalışan kişilerin yetki bazlı kullanabilicekler buradan meta title dan tut schemalarına kadar ayarlayabilicekler 

restoranda menu ekleme olabilicek rezervasyon takibi gibi birşeyde olabilir tabi bu firmanın hizmetine göre değişkenlik gösterir şuan elimde olan müşteri gusto kartepe diye bir restoran ama sonrasında ne tarz müşteriler gelicek bilmiyorum bu yüzden çok detaylı ve uyarlanabilir bir proje istiyorum 

cms panelinde hem gece modu hem aydınlık mod olucak 

cms paneli türkçe ingilzce alt yapısını destekleyebilicek 

cmss panelinde içerikler kullanıcı ne girerse öyle dil özellikleri olabilicek içerikleri isterse ingilizce isterse türkçe şeklinde olabilicek 

görseller s3 te tutulucak ama yedek birşery daha yapmamız lazım maliyet açısından yeri geldimi s3 tekileri silebilcek görsel ve videolar 

detaylı bir cms paneli istiyorum açıkçası 

şimdi ben sana soruları atıcam sen buna göre cevap vericeksin ben bu cevabı farklı bir llm de kullanıcam anlaştık mı 
```

### Eksik olan icerik bolumleri

CMS panel icin eksik metinler:

- Panel menusu metinleri
- Dashboard kart basliklari
- Bos durum metinleri
- Hata mesajlari
- Basari mesajlari
- Form label'lari
- Yardim metinleri
- SEO alan aciklamalari
- Rol/yetki aciklamalari
- Medya yukleme bilgilendirmeleri
- Rezervasyon durum metinleri
- Dil secimi metinleri
- Tema ayari metinleri

Gusto Kartepe web sitesi icin eksik metinler:

- Ana sayfa hero basligi
- Ana sayfa aciklama metni
- Hakkimizda metni
- Menu kategori adlari
- Menu urun adlari
- Menu urun aciklamalari
- Fiyat bilgileri
- Rezervasyon sayfasi metinleri
- Iletisim sayfasi metinleri
- Calisma saatleri
- Adres bilgisi
- Telefon/e-posta bilgisi
- Galeri aciklamalari
- SEO title ve description metinleri
- KVKK / gizlilik metinleri
- Cerez politikasi metni

Diger sektorler icin eksik metinler:

- Dis klinigi hizmet metinleri
- Doktor/ekip biyografileri
- Randevu formu metinleri
- Guzellik merkezi hizmet metinleri
- Otel/konaklama metinleri
- Sektor bazli SEO metinleri

### Placeholder kullanilsin mi?

Evet, ilk tasarim ve prototip asamasinda placeholder metinler kullanilabilir. Ancak placeholder metinler final icerik gibi ele alinmamalidir.

Placeholder stratejisi:

- CMS panelinde gercekci Turkce placeholder metinler kullanilsin.
- Firma web sitesi orneklerinde Gusto Kartepe icin gercekci ama taslak restoran metinleri kullanilsin.
- Menu ve fiyat bilgileri sahte/veri ornegi olarak isaretlensin.
- SEO alanlarinda ornek title/description kullanilsin.
- Placeholder olan tum alanlar daha sonra gercek icerikle degistirilebilir sekilde CMS'ten yonetilsin.
- Lorem ipsum yerine Turkce, baglama uygun, gercekci taslak metinler tercih edilsin.

**Kisa cevap:**

Tum metin icerikleri henuz paylasilmadi. Verbatim olarak yalnizca proje talebi mevcut. Gusto Kartepe icin hakkimizda, menu, urun aciklamalari, fiyatlar, iletisim bilgileri, SEO metinleri ve yasal metinler eksik. Ilk prototipte gercekci Turkce placeholder metinler kullanilabilir; ancak bu metinler final icerik olarak kabul edilmemelidir.

## 19. Gorsel gereksinimler: kac gorsel var, placeholder mi gercek mi?

Su an icin musteri tarafindan paylasilmis gercek gorsel veya video dosyasi bulunmamaktadir.

Gusto Kartepe'ye ait logo, mekan fotograflari, yemek fotograflari, menu gorselleri, video dosyalari veya sosyal medya gorselleri henuz gelmemistir.

Bu nedenle ilk prototip ve panel tasariminda placeholder gorseller kullanilabilir. Ancak final yayina gecmeden once gercek marka gorselleri ve optimize edilmis medya dosyalari gereklidir.

### CMS panel icin gorsel gereksinimler

CMS panelde asagidaki gorsel alanlar desteklenmelidir:

- Firma logosu
- Firma favicon'u
- Light mode logo
- Dark mode logo
- Kapak gorseli
- Sayfa featured image
- Galeri gorselleri
- Menu urun gorselleri
- Hizmet gorselleri
- Ekip/doktor/personel gorselleri
- Blog gorselleri
- Open Graph gorselleri
- Video dosyalari
- PDF veya dokuman dosyalari, gerekiyorsa

### Gusto Kartepe icin gerekli gorseller

Gusto Kartepe restoran sitesi icin gerekli olabilecek gorseller:

- Logo
- Favicon
- Mekan dis cephe fotografi
- Mekan ic mekan fotograflari
- Ana sayfa hero fotografi
- Yemek/fotograf cekimleri
- Menu urun gorselleri
- Ortam/ambiyans fotograflari
- Ekip veya servis fotograflari, istenirse
- Galeri gorselleri
- Rezervasyon sayfasi gorseli
- Open Graph paylasim gorseli

### Tahmini gorsel adedi

Ilk restoran web sitesi icin tahmini gorsel ihtiyaci:

- Logo: 1
- Favicon: 1
- Hero gorseli: 1-3
- Mekan gorselleri: 6-12
- Menu urun gorselleri: 10-30
- Galeri gorselleri: 12-30
- Sosyal medya / OG gorseli: 1-3

Toplam ilk fazda yaklasik 30-80 arasi gorsel gerekebilir. Bu sayi menu kapsamına ve galeri zenginligine gore artabilir.

### Placeholder kullanimi

Ilk prototipte placeholder gorseller kullanilabilir.

Placeholder kullanirken dikkat edilmesi gerekenler:

- Gorseller restoran konseptine uygun olmali.
- Telif riski olan rastgele internet gorselleri finalde kullanilmamali.
- Placeholder oldugu dokumanda ve panelde belirtilmeli.
- Gorsel oranlari gercek tasarimi test edecek sekilde secilmeli.
- Hero, kart, galeri, menu urunu gibi farkli oranlar test edilmeli.
- Finalde tum placeholder'lar gercek musteriden gelen gorsellerle degistirilmeli.

### Medya yonetimi teknik gereksinimleri

Sistem gorsel/video yonetiminde su ozellikleri desteklemelidir:

- S3'e yukleme
- Firma bazli dosya klasorleme
- Dosya tipi kontrolu
- Maksimum dosya boyutu limiti
- Gorsel optimizasyonu
- Thumbnail olusturma
- WebP/AVIF gibi modern formatlara donusturme, gerekiyorsa
- Alt text
- Caption
- Dosya adi duzenleme
- SEO aciklamasi
- Kullanildigi sayfalari gorme
- Silme / arsivleme
- Yedekleme veya alternatif depolama stratejisi
- S3 maliyet kontrolu

### Video gereksinimleri

Video kullanimi henuz kesin degildir. Ancak sistem video dosyalarini destekleyebilecek sekilde planlanmalidir.

Video icin opsiyonlar:

- S3 uzerinde video saklama
- YouTube/Vimeo embed
- CDN uzerinden video servis etme
- Video dosya boyutu limiti
- Poster image
- Mobil uyumlu video gosterimi

Maliyet acisindan buyuk videolarin dogrudan S3 uzerinden servis edilmesi dikkatli planlanmalidir.

**Kisa cevap:**

Su an gercek gorsel veya video dosyasi paylasilmadi. Ilk prototipte placeholder gorseller kullanilabilir. Gusto Kartepe icin finalde logo, mekan fotograflari, yemek gorselleri, menu urun gorselleri, galeri gorselleri ve Open Graph gorselleri gerekecektir. Ilk restoran sitesi icin tahmini 30-80 arasi gorsel gerekebilir.

## Kritik Proje Tanimi

Bu proje sadece Gusto Kartepe icin yapilacak tekil bir restoran web sitesi degildir.

Bu proje, restoranlar dahil farkli sektorlerdeki firmalarin kendi web sitelerini, iceriklerini, SEO ayarlarini, medya dosyalarini, rezervasyonlarini, firma bilgilerini, sayfalarini ve sektorel modullerini yonetebilecegi cok firmali bir CMS panelidir.

Gusto Kartepe yalnizca ilk kullanim senaryosu ve ilk musteri ornegidir. Sistem tek musterili sabit bir web sitesi olarak degil, farkli firmalara uyarlanabilir CMS/SaaS altyapisi olarak tasarlanmalidir.

Ana urun CMS panelidir. Firma web siteleri bu panelden uretilen ve yonetilen ciktilardir.

## Grup F - Kisitlar, Kararlar ve Zaman

## 20. Mutlaka uyulmasi gereken kisitlamalar var mi? A11y standardi, yasal uyumluluk, marka kilavuzu vb.

Evet, proje kapsaminda mutlaka uyulmasi gereken teknik, yasal, tasarimsal ve operasyonel kisitlar vardir. Bunlarin bir kismi musteri tarafindan net belirtilmis, bir kismi ise projenin dogasi geregi uygulanmasi gereken standartlardir.

### Musteri tarafindan kesin belirtilen kisitlar

- Proje bir CMS paneli olarak tasarlanmalidir.
- Sistem firma bazli olmalidir.
- Her firmanin kendi logosu ve marka bilgileri olmalidir.
- Firmalar kendi sayfalarini ve iceriklerini yonetebilmelidir.
- SEO ile ilgili detayli alanlar panelden yonetilebilmelidir.
- SEO alanlari yetki bazli kullanilabilmelidir.
- Meta title, schema gibi teknik SEO alanlari desteklenmelidir.
- Restoran icin menu ekleme desteklenmelidir.
- Rezervasyon takibi veya benzeri sektorel moduller desteklenebilmelidir.
- Panel hem dark mode hem light mode desteklemelidir.
- Panel Turkce/Ingilizce altyapisini desteklemelidir.
- Icerikler firma/kullanici tercihine gore Turkce veya Ingilizce girilebilmelidir.
- Frontend React + Tailwind CSS ile gelistirilmelidir.
- Backend Node.js + JavaScript ile yazilmalidir.
- Veritabani MongoDB olmalidir.
- Gorseller S3 uzerinde tutulmalidir.
- S3 maliyeti icin silme, arsivleme veya yedekleme stratejisi dusunulmelidir.

### Multi-tenant veri izolasyonu

Sistem cok firmali olacagi icin her veri mutlaka firma bazli izole edilmelidir.

Uyulmasi gereken kurallar:

- Her kayitta `tenantId` veya `companyId` bulunmalidir.
- Firma kullanicisi baska firmaya ait veriyi gorememelidir.
- API seviyesinde tenant kontrolu yapilmalidir.
- Sadece frontend'de gizleme yeterli degildir; backend yetkilendirmesi zorunludur.
- Super admin tum firmalari yonetebilir.
- Firma admini yalnizca kendi firmasini yonetebilir.
- Ajans personeli yetkisine gore birden fazla firmaya erisebilir.

### Yetki ve rol kisitlari

Panelde rol bazli yetkilendirme zorunludur.

Ornek roller:

- Super Admin
- Agency Admin
- Company Admin
- SEO Specialist
- Content Editor
- Media Manager
- Reservation Manager
- Viewer

Her rol icin goruntuleme, olusturma, duzenleme, silme ve yayinlama yetkileri ayri tanimlanabilmelidir.

### SEO kisitlari

CMS paneli SEO icin yuzeysel olmamalidir. Asagidaki alanlar desteklenmelidir:

- Meta title
- Meta description
- Slug
- Canonical URL
- Robots meta
- Open Graph
- Twitter Cards
- JSON-LD schema
- Sitemap
- Robots.txt
- Hreflang
- Redirects
- 404 takibi
- Image alt text

SEO alanlari dil bazli ve sayfa bazli yonetilebilmelidir.

### Cok dil kisitlari

Panel arayuzu ve icerikler cok dilli yapiya uygun olmalidir.

Uyulmasi gerekenler:

- Panel i18n altyapisina uygun olmali.
- Turkce ve Ingilizce panel dili desteklenebilmeli.
- Firma icerikleri dil bazli tutulmali.
- Her sayfanin Turkce ve Ingilizce varyasyonu olabilmeli.
- SEO alanlari her dil icin ayri girilebilmeli.
- URL/slug dil bazli olabilmeli.
- Hreflang desteklenmeli.

### Medya ve depolama kisitlari

Gorsel ve videolar S3 veya S3 uyumlu bir sistemde tutulmalidir.

Uyulmasi gerekenler:

- Firma bazli klasorleme veya key yapisi olmalidir.
- Dosya boyutu limitleri tanimlanmalidir.
- Gorsel optimizasyonu yapilmalidir.
- Thumbnail uretilmelidir.
- Kullanilmayan dosyalar takip edilebilmelidir.
- Silme ve arsivleme mekanizmasi olmalidir.
- S3 lifecycle policy degerlendirilmelidir.
- Maliyet kontrolu icin alternatif depolama veya arsiv katmani dusunulmelidir.

### Yasal uyumluluk

Turkiye pazari hedeflendigi icin asagidaki yasal konular dikkate alinmalidir:

- KVKK uyumlulugu
- Cerez bildirimi
- Gizlilik politikasi
- Acik riza metinleri, gerekiyorsa
- Iletisim ve rezervasyon formlarinda veri isleme onayi
- Kullanici hesaplari icin guvenli sifreleme
- Log ve kisisel veri saklama politikasi

### A11y / erisilebilirlik

Panel ve firma web siteleri temel erisilebilirlik standartlarina uygun olmalidir.

Hedef standart:

- En az WCAG 2.1 AA prensiplerine uygunluk hedeflenmelidir.

Dikkat edilmesi gerekenler:

- Klavye ile gezilebilir arayuz
- Yeterli kontrast
- Form label'lari
- Hata mesajlarinin anlasilir olmasi
- Buton ve linklerin net olmasi
- Gorseller icin alt text
- Modal ve drawer focus yonetimi
- Ekran okuyucu uyumlulugu

### Performans kisitlari

Firma web siteleri SEO icin hizli yuklenmelidir.

Dikkat edilmesi gerekenler:

- Gorsel optimizasyonu
- Lazy loading
- CDN kullanimi
- Cache stratejisi
- Sitemap ve metadata dogru uretimi
- Gereksiz client-side agirliktan kacinma

CMS panelde de hizli veri yukleme ve pagination zorunludur.

**Kisa cevap:**

Kesin kisitlar: CMS paneli olacak, multi-tenant firma bazli calisacak, React + Tailwind frontend, Node.js + JavaScript backend, MongoDB veritabani ve S3 medya depolama kullanilacak. Panel dark/light mode, cok dil, rol/yetki, SEO, schema, medya yonetimi ve sektorel modulleri desteklemelidir. KVKK, temel erisilebilirlik, veri izolasyonu ve S3 maliyet kontrolu dikkate alinmalidir.

## 21. Musteriye henuz sorulmamis, yanit bekleyen konular var mi?

Evet, proje kapsaminda henuz netlesmemis ve musteriden cevap bekleyen cok sayida konu vardir.

### Marka ve musteri bilgileri

- Gusto Kartepe'nin resmi logosu var mi?
- Marka renkleri belli mi?
- Kurumsal kimlik dosyasi var mi?
- Mevcut web sitesi var mi?
- Domain adi nedir?
- Sosyal medya hesaplari nelerdir?
- Google Business Profile hesabi var mi?
- Restoranin tam adresi, telefon numarasi ve e-posta adresi nedir?
- Calisma saatleri nedir?

### Icerik ve medya

- Hakkimizda metni hazir mi?
- Menu kategorileri nelerdir?
- Menu urunleri ve fiyatlari hazir mi?
- Urun aciklamalari var mi?
- Alerjen veya icerik bilgisi gerekli mi?
- Restoran fotograflari var mi?
- Yemek fotograflari var mi?
- Video kullanilacak mi?
- Galeri icin secilecek gorseller hangileri?
- KVKK, gizlilik ve cerez metinleri hazir mi?

### CMS panel kapsam kararları

- Ilk versiyonda kac firma desteklenecek?
- Ajans tarafinda kac kullanici olacak?
- Firma tarafinda musteri kullanicilari panel kullanacak mi?
- Musteriler kendi sayfalarini tamamen olusturabilecek mi, yoksa sadece belirli alanlari mi duzenleyecek?
- Sayfa builder olacak mi, yoksa sabit template + editable alanlar mi olacak?
- Onay/yayin akisi gerekiyor mu?
- Icerik taslak/yayin/arsiv durumlari olacak mi?
- Silinen icerikler geri alinabilecek mi?

### Rol ve yetki sorulari

- Hangi roller kesin olacak?
- SEO uzmanlari hangi alanlara erisecek?
- Firma sahipleri SEO alanlarini duzenleyebilecek mi?
- Ajans personeli tum firmalara erisebilecek mi?
- Firma bazli yetkilendirme nasil yapilacak?
- Islem gecmisi/audit log zorunlu mu?

### SEO sorulari

- Her firma icin SEO ayarlari ajans tarafindan mi yapilacak?
- Musteri SEO alanlarini kendisi duzenleyebilecek mi?
- Schema tipleri manuel mi secilecek, otomatik mi olusturulacak?
- Redirect yonetimi ilk MVP'de olacak mi?
- Blog modulu ilk surumde gerekli mi?
- Cok dilli SEO ilk surumde zorunlu mu?

### Rezervasyon / randevu sorulari

- Rezervasyon sistemi sadece talep formu mu olacak?
- Masa uygunluk kontrolu olacak mi?
- Anlik rezervasyon onayi olacak mi?
- Rezervasyonlara e-posta bildirimi gidecek mi?
- WhatsApp bildirimi isteniyor mu?
- SMS bildirimi isteniyor mu?
- Google Calendar entegrasyonu gerekiyor mu?

### Medya / S3 sorulari

- AWS S3 kesin mi, yoksa S3 uyumlu daha uygun maliyetli alternatif olabilir mi?
- Maksimum gorsel/video dosya boyutu ne olacak?
- Videolar S3'te mi tutulacak, YouTube/Vimeo embed mi kullanilacak?
- Silinen medya ne kadar sure arsivde tutulacak?
- Yedekleme hangi siklikla yapilacak?
- Kullanilmayan medyalar otomatik tespit edilecek mi?

### Hosting / deployment sorulari

- Hosting icin butce nedir?
- Domainler nerede yonetilecek?
- Frontend ve backend ayri deploy edilecek mi?
- MongoDB Atlas kullanilabilir mi?
- Cloudflare kullanilacak mi?
- Staging ortami isteniyor mu?
- Otomatik CI/CD isteniyor mu?

### Urun ve is modeli sorulari

- Bu CMS sadece ajansin kendi musterileri icin mi kullanilacak?
- Ileride SaaS olarak dis musteriye satilacak mi?
- Paket/abonelik modeli olacak mi?
- Firma bazli limitler olacak mi? Ornegin sayfa limiti, medya limiti, kullanici limiti.
- Faturalandirma ve odeme sistemi ileride gerekli mi?

**Kisa cevap:**

Evet, yanit bekleyen konular var. Ozellikle logo, marka renkleri, icerikler, gorseller, domain, hosting, roller, sayfa builder seviyesi, SEO yetkileri, rezervasyon akisi, S3/yedekleme stratejisi, MVP kapsami ve ileride SaaS paket modeli netlestirilmelidir.

## 22. MVP kapsami nedir? MVP sonrasi neler planlaniyor?

MVP, projenin ilk kullanilabilir surumu olarak dusunulmelidir. Amac ilk asamada tum sektorleri eksiksiz desteklemek degil; cok firmali CMS panelinin temel mimarisini kurmak ve Gusto Kartepe gibi ilk restoran musterisi icin kullanilabilir hale getirmektir.

### MVP'nin ana hedefi

MVP'nin ana hedefi, ajansin bir firmayi sisteme ekleyebilmesi, o firmaya ait temel web sitesi iceriklerini, sayfalarini, medyalarini, SEO ayarlarini ve restoran menu/rezervasyon gibi temel modullerini panelden yonetebilmesidir.

### MVP kapsaminda olmali

MVP icin onerilen kapsam:

- Login / authentication
- Super admin kullanicisi
- Firma olusturma ve duzenleme
- Firma bazli veri izolasyonu
- Firma logo ve temel marka ayarlari
- Kullanici yonetimi
- Basit rol ve yetki yapisi
- Dashboard
- Sayfa listeleme
- Sayfa olusturma
- Sayfa duzenleme
- Sayfa yayin/taslak durumu
- Temel menu / navigasyon yonetimi
- Medya kutuphanesi
- S3'e gorsel yukleme
- Gorsel silme / arsivleme icin temel mekanizma
- Temel SEO alanlari
- Meta title
- Meta description
- Slug
- Open Graph gorseli
- Image alt text
- Dil altyapisi
- Panelde Turkce arayuz
- Iceriklerde Turkce/Ingilizce alan yapisi
- Light/dark mode
- Restoran menu kategorileri
- Restoran menu urunleri
- Rezervasyon talep formu
- Rezervasyon taleplerini panelde goruntuleme
- Iletisim formu / lead kaydi
- Basit bildirim veya e-posta bildirimi
- Gusto Kartepe icin ilk web sitesi sayfa yapisi

### MVP icin onerilen Gusto Kartepe web sitesi sayfalari

- Ana sayfa
- Hakkimizda
- Menu
- Galeri
- Rezervasyon
- Iletisim
- KVKK / gizlilik

### MVP'de ertelenebilecek ozellikler

Ilk surumde ertelenebilecek ozellikler:

- Gelismis page builder
- Surukle-birak editor
- Tam template marketplace
- Gelismis audit log
- Gelismis redirect yonetimi
- 404 takip paneli
- Otomatik schema uretimi
- Gelismis workflow/onay sistemi
- CRM entegrasyonu
- Odeme sistemi
- WhatsApp/SMS entegrasyonu
- Google Calendar entegrasyonu
- Cok detayli analytics dashboard
- Storybook
- Gelismis medya arsivleme otomasyonu
- Cok sektorlu tum modullerin eksiksiz tamamlanmasi

### MVP sonrasi planlanabilecek ozellikler

MVP sonrasi roadmap:

- Gelismis rol ve yetki matrisi
- Ajans kullanicilari icin cok firma yonetimi
- Sayfa template sistemi
- Surukle-birak bolum editoru
- Blog modulu
- Duyuru/kampanya modulu
- Gelismis SEO modulu
- Schema builder
- Redirect manager
- 404 log takibi
- XML sitemap otomasyonu
- Robots.txt editoru
- Hreflang otomasyonu
- Analytics entegrasyon dashboard'u
- GA4/GTM entegrasyonlari
- Google Search Console alanlari
- CRM entegrasyonlari
- WhatsApp/SMS/e-posta bildirimleri
- Rezervasyon takvimi
- Google Calendar entegrasyonu
- Dis klinigi modulu
- Guzellik merkezi modulu
- Otel/konaklama modulu
- SaaS paket ve limit sistemi
- Odeme altyapisi
- Faturalandirma
- Medya maliyet raporlari
- Kullanilmayan medya temizleme araci
- Yedekleme ve geri yukleme paneli
- White-label panel ozellikleri

### MVP basari kriterleri

MVP basarili sayilmasi icin:

- En az bir firma sisteme eklenebilmeli.
- Firma kendi verileriyle izole calismali.
- Sayfalar panelden olusturulup yayina alinabilmeli.
- Temel SEO alanlari girilebilmeli.
- Gorseller S3'e yuklenebilmeli.
- Gusto Kartepe icin menu yonetimi calismali.
- Rezervasyon talepleri panelde gorulebilmeli.
- Panel light/dark mode desteklemeli.
- Icerik yapisi cok dile hazir olmali.

**Kisa cevap:**

MVP; cok firmali CMS panelinin temelini, firma yonetimini, kullanici/rol yapisini, sayfa ve medya yonetimini, temel SEO alanlarini, cok dil altyapisini, light/dark mode'u, Gusto Kartepe icin restoran menu yonetimini ve rezervasyon talep takibini kapsamalidir. MVP sonrasi gelismis page builder, schema builder, redirect manager, analytics, CRM, odeme, sektor modulleri ve medya maliyet yonetimi eklenebilir.

## 23. Zaman cizelgesi / deadline var mi?

Su an icin net bir zaman cizelgesi veya kesin deadline paylasilmamistir.

Bu nedenle proje planlamasi tahmini fazlara bolunerek yapilmalidir. Net deadline belirlenmeden once MVP kapsamı kesinlestirilmeli, tasarim beklentileri netlestirilmeli, Gusto Kartepe icerikleri ve gorselleri toplanmali, hosting/deployment karari verilmelidir.

### Net deadline olmadan onerilen fazlama

#### Faz 0 - Analiz ve kapsam netlestirme

Tahmini sure: 3-5 is gunu

Yapilacaklar:

- Proje gereksinimlerinin netlestirilmesi
- MVP kapsaminin dondurulmasi
- Roller ve yetkilerin tanimlanmasi
- Veri modeli taslagi
- Hosting/deployment karari
- Gusto Kartepe icerik ve medya ihtiyac listesinin netlestirilmesi

#### Faz 1 - UI/UX ve sistem tasarimi

Tahmini sure: 1-2 hafta

Yapilacaklar:

- CMS panel bilgi mimarisi
- Ana ekran wireframe'leri
- Design system temeli
- Light/dark mode tasarim yaklasimi
- Gusto Kartepe web sitesi sayfa yapisi
- Component listesi

#### Faz 2 - Backend temel mimari

Tahmini sure: 2-3 hafta

Yapilacaklar:

- Node.js API kurulumu
- MongoDB baglantisi
- Auth sistemi
- Firma/tenant modeli
- Kullanici ve rol yapisi
- Sayfa modeli
- Medya modeli
- SEO modeli
- S3 entegrasyonunun temeli

#### Faz 3 - CMS panel MVP frontend

Tahmini sure: 3-4 hafta

Yapilacaklar:

- Login
- Dashboard
- Firma ayarlari
- Kullanici/rol ekranlari
- Sayfa yonetimi
- Medya kutuphanesi
- SEO alanlari
- Restoran menu yonetimi
- Rezervasyon talepleri
- Light/dark mode

#### Faz 4 - Gusto Kartepe web sitesi MVP

Tahmini sure: 1-2 hafta

Yapilacaklar:

- Ana sayfa
- Hakkimizda
- Menu
- Galeri
- Rezervasyon
- Iletisim
- SEO metadata
- Mobil uyumluluk

#### Faz 5 - Test, duzeltme ve yayina hazirlik

Tahmini sure: 1-2 hafta

Yapilacaklar:

- Fonksiyonel testler
- Yetki testleri
- Multi-tenant veri izolasyonu kontrolu
- Mobil testler
- SEO kontrolleri
- Performans kontrolleri
- S3 medya testleri
- Deployment
- Backup kontrolleri

### Tahmini MVP toplam sure

MVP icin tahmini sure:

- Hizli ve dar kapsamli MVP: 6-8 hafta
- Daha saglam ve genis MVP: 10-12 hafta

Bu sureler iceriklerin, gorsellerin, logo/marka bilgilerinin ve hosting kararlarinin zamaninda gelmesine baglidir.

### Deadline belirlenirken sorulmasi gerekenler

- Ilk canliya alinacak musteri kesin Gusto Kartepe mi?
- Gusto Kartepe icin yayina cikis tarihi var mi?
- Sadece panel MVP mi isteniyor, yoksa panel + ilk web sitesi beraber mi cikacak?
- Tasarim onayi kac tur olacak?
- Icerikler ve gorseller ne zaman teslim edilecek?
- Hosting ve domain kim tarafindan saglanacak?
- Ilk surumde cok dil aktif kullanilacak mi, yoksa altyapi olarak mi hazir olacak?

**Kisa cevap:**

Net deadline henuz paylasilmadi. MVP icin tahmini sure kapsam dar tutulursa 6-8 hafta, daha saglam ve genis kapsamla 10-12 hafta olabilir. Kesin takvim icin MVP kapsami, Gusto Kartepe icerikleri, gorseller, domain/hosting ve tasarim onay sureci netlestirilmelidir.
