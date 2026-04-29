require('dotenv').config();
const { connect } = require('./config/database');
const Company = require('./models/Company');
const BlogPost = require('./models/BlogPost');

const posts = [
  {
    slug: 'web-sitenizi-duzenli-guncellemek-neden-onemli',
    title: {
      tr: 'Web Sitenizi Düzenli Güncellemek Neden Bu Kadar Önemli?',
      en: 'Why Regular Website Updates Matter More Than You Think',
    },
    excerpt: {
      tr: 'Web siteniz işletmenizin dijital yüzüdür. Güncel tutmak sadece estetik bir tercih değil — SEO, güven ve dönüşüm oranları için kritik bir zorunluluktur.',
      en: 'Your website is the digital face of your business. Keeping it updated isn\'t just aesthetic — it\'s critical for SEO, trust, and conversion rates.',
    },
    content: {
      tr: `<h2>Müşterileriniz İlk İzlenimi Dijitalde Yaşıyor</h2>
<p>Bir potansiyel müşteri işletmenizi Google'da bulduğunda, web siteniz hakkındaki ilk kararını ortalama <strong>3 saniye</strong> içinde veriyor. Eski içerik, güncel olmayan fiyatlar veya çalışmayan bir rezervasyon butonu — bunların hepsi müşteriyi rakibinize yönlendiriyor.</p>

<h2>Düzenli Güncelleme Neden SEO'ya Katkı Sağlar?</h2>
<p>Google'ın algoritması aktif siteleri tercih eder. Düzenli olarak güncellenen bir web sitesi şu avantajları kazanır:</p>
<ul>
  <li>Arama motorları sitenizi daha sık tarar (crawl frequency artar)</li>
  <li>Taze içerik, anahtar kelime yelpazesini genişletir</li>
  <li>Düşük bounce rate, sıralamayı olumlu etkiler</li>
  <li>Güncel bilgiler ziyaretçilerin sitede daha uzun kalmasını sağlar</li>
</ul>

<h2>İşletme Sahiplerinin En Büyük Hatası</h2>
<p>Web sitesini kurup unutan işletmeler maalesef dijital varlıklarını hızla yitiriyor. Menü fiyatları değişmiş ama sitede eski fiyatlar var; personel değişmiş ama "Ekibimiz" sayfası eski çalışanları gösteriyor; kapanma saatleri değişmiş ama site hâlâ eski saatleri söylüyor. Bu tutarsızlıklar müşteri güvenini ciddi şekilde zedeler.</p>

<h2>Netravox ile İçerik Yönetimi Artık Dakikalar Sürüyor</h2>
<p>Netravox CMS panelinde bir içerik güncellemesi için teknik bilgiye ihtiyacınız yok. Menünüzü değiştirmek, yeni bir fotoğraf eklemek veya çalışma saatlerinizi güncellemek — bunların hepsi aynı gün, kendi panelinizden yapılabiliyor.</p>
<p>Sitenizin aktif ve güncel kalması için bize ulaşın.</p>`,
    },
    author: 'Netravox Ekibi',
    tags: ['web sitesi', 'SEO', 'içerik yönetimi', 'dijital pazarlama'],
    status: 'published',
    publishedAt: new Date('2026-04-01'),
    seo: {
      metaTitle: { tr: 'Web Sitenizi Düzenli Güncellemek Neden Önemli? | Netravox' },
      metaDesc: { tr: 'Web sitenizi güncel tutmanın SEO, müşteri güveni ve dönüşüm oranlarına etkisini keşfedin. Netravox CMS ile içerik yönetimi artık çok kolay.' },
    },
  },
  {
    slug: 'restoran-web-sitesi-icin-5-olmazsa-olmaz-ozellik',
    title: {
      tr: 'Restoran Web Sitesi İçin 5 Olmazsa Olmaz Özellik',
      en: '5 Must-Have Features for a Restaurant Website',
    },
    excerpt: {
      tr: 'Müşterileriniz yemek sipariş etmeden önce menünüzü, fotoğraflarınızı ve yorumlarınızı inceliyor. Restoranınızın web sitesinde bu 5 özellik mutlaka olmalı.',
      en: 'Customers browse your menu, photos, and reviews before ordering. These 5 features are non-negotiable for any restaurant website.',
    },
    content: {
      tr: `<h2>1. Online Menü — Fotoğraflı ve Güncel</h2>
<p>Restoranınızı Google'da bulan bir müşterinin ilk yaptığı şey menüye bakmaktır. Fotoğraflı, kategorilere ayrılmış ve fiyatları güncel bir dijital menü, misafir kararını doğrudan etkiler. PDF menü yeterli değil — yavaş yüklenir ve mobilde okunması zordur.</p>

<h2>2. Rezervasyon Formu</h2>
<p>Telefon rezervasyonu yerine online form kullanan restoranlar hem müşteri memnuniyetini artırıyor hem de personel iş yükünü azaltıyor. Basit bir form — isim, tarih, kişi sayısı ve telefon — hayatı kolaylaştırır.</p>

<h2>3. Fotoğraf Galerisi</h2>
<p>İnsanlar gözleriyle yiyor. Yüksek kaliteli yemek fotoğrafları, restoran iç mekânı ve mutfak görselleri müşteri kararını %60'a kadar etkiliyor. Galeri sayfası hem ilgi çeker hem de Instagram entegrasyonunu kolaylaştırır.</p>

<h2>4. Google Haritalar Entegrasyonu ve Çalışma Saatleri</h2>
<p>Müşterilerinizin %78'i restoranı ziyaret etmeden önce adresi ve çalışma saatlerini kontrol ediyor. Güncel adres bilgisi ve harita entegrasyonu hem yol tarifi alımını kolaylaştırır hem de Google'da "şu an açık" bilgisini doğru gösterir.</p>

<h2>5. Mobil Uyumlu Tasarım</h2>
<p>Restoran aramaların %73'ü mobil cihazlardan yapılıyor. Mobilde hızlı yüklenen, kolay gezinilen ve ekrana sığan bir site artık lüks değil — zorunluluk.</p>

<h2>Netravox ile Tüm Bu Özellikler Hazır Geliyor</h2>
<p>Restoran müşterilerimiz bu özelliklerin tamamını Netravox panelinden yönetiyor. Menü güncellemesi, yeni fotoğraf ekleme veya rezervasyon görüntüleme — hepsi tek panelden, dakikalar içinde.</p>`,
    },
    author: 'Netravox Ekibi',
    tags: ['restoran', 'web sitesi', 'dijital menü', 'rezervasyon'],
    status: 'published',
    publishedAt: new Date('2026-04-08'),
    seo: {
      metaTitle: { tr: 'Restoran Web Sitesi İçin 5 Özellik | Netravox' },
      metaDesc: { tr: 'Restoranınızın dijital varlığını güçlendirin. Online menü, rezervasyon, galeri ve daha fazlası için Netravox CMS çözümüne bakın.' },
    },
  },
  {
    slug: 'yerel-isletmeler-icin-seo-rehberi',
    title: {
      tr: 'Yerel İşletmeler İçin SEO: Müşteri Sitenizi Google\'da Nasıl Bulur?',
      en: 'Local SEO Guide: How Customers Find Your Business on Google',
    },
    excerpt: {
      tr: '"Yakınımdaki restoranlar" araması yapan biri sizi buluyor mu? Yerel SEO\'nun nasıl çalıştığını ve küçük adımlarla nasıl fark yaratabileceğinizi anlattık.',
      en: 'When someone searches "restaurants near me", do they find you? Here\'s how local SEO works and small steps that make a big difference.',
    },
    content: {
      tr: `<h2>Yerel SEO Nedir?</h2>
<p>Yerel SEO (Arama Motoru Optimizasyonu), işletmenizin belirli bir coğrafi bölgedeki aramalarda üst sıralarda çıkmasını sağlayan tekniklerin bütünüdür. "Kartepe'de restoran", "İstanbul Şişli diş hekimi" gibi aramalar yerel SEO kapsamındadır.</p>

<h2>Google Beni Neden Bulamıyor?</h2>
<p>Yerel aramalarda görünmemenizin başlıca nedenleri:</p>
<ul>
  <li>Google İşletme Profili (Google Business Profile) eksik veya güncel değil</li>
  <li>Web sitesinde şehir ve ilçe adı geçmiyor</li>
  <li>Mobil uyumluluk sorunları</li>
  <li>Yavaş yükleme hızı</li>
  <li>Müşteri yorumu yok veya çok az</li>
</ul>

<h2>Hemen Yapabileceğiniz 3 Şey</h2>
<h3>1. Google İşletme Profili'ni Tamamlayın</h3>
<p>Ücretsiz ve güçlü bir araç. Fotoğraflarınızı ekleyin, çalışma saatlerinizi güncelleyin, kategorinizi doğru seçin. Bu adım bile sizi rakiplerinizin önüne geçirebilir.</p>

<h3>2. Web Sitenizde Konum Bilgisi Olsun</h3>
<p>Başlık ve açıklamalarınızda şehir, ilçe adı geçsin. "İstanbul Kadıköy'ün en iyi pizza restoranı" gibi bir ifade, sadece "en iyi pizza" demekten çok daha etkili.</p>

<h3>3. Müşteri Yorumu İsteyin</h3>
<p>Mutlu müşterilerinizden Google'a yorum bırakmalarını rica edin. 10 yorum, 0 yorum olan rakibinizin önünde görünmenizi sağlayabilir.</p>

<h2>Netravox'ta SEO Yönetimi</h2>
<p>Netravox CMS panelinde her sayfa için ayrı meta başlık, meta açıklama, Open Graph görseli ve canonical URL belirleyebilirsiniz. Schema markup, sitemap ve robots.txt de otomatik yönetilir.</p>`,
    },
    author: 'Netravox Ekibi',
    tags: ['SEO', 'yerel SEO', 'Google', 'dijital pazarlama', 'küçük işletme'],
    status: 'published',
    publishedAt: new Date('2026-04-15'),
    seo: {
      metaTitle: { tr: 'Yerel İşletmeler İçin SEO Rehberi | Netravox' },
      metaDesc: { tr: 'Google\'da yerel aramalarda üst sıralara çıkmak için yapmanız gereken 3 temel adımı öğrenin. Netravox CMS ile SEO yönetimi artık kolay.' },
    },
  },
  {
    slug: 'mobil-uyumlu-web-sitesinin-onemi',
    title: {
      tr: 'Mobil Uyumlu Olmayan Web Sitesi Müşteri Kaybettirir',
      en: 'A Non-Mobile-Friendly Website Is Losing You Customers',
    },
    excerpt: {
      tr: 'Türkiye\'de internet kullanıcılarının %75\'i web sitelerine mobil cihazdan erişiyor. Siteniz mobilde yavaş veya bozuk görünüyorsa, bu müşteriler rakibinize gidiyor.',
      en: '75% of internet users in Turkey access websites from mobile devices. If your site is slow or broken on mobile, those customers go to your competitor.',
    },
    content: {
      tr: `<h2>Rakamlar Çok Net</h2>
<p>Türkiye İstatistik Kurumu ve dijital pazarlama raporlarına göre:</p>
<ul>
  <li>Türkiye'de internet trafiğinin <strong>%75'i</strong> mobilden geliyor</li>
  <li>Mobilde yavaş yüklenen site ziyaretçilerinin <strong>%53'ü</strong> 3 saniyede terk ediyor</li>
  <li>Mobil kullanıcıların <strong>%61'i</strong> kötü mobil deneyim yaşadıktan sonra o işletmeyle tekrar iletişime geçmiyor</li>
</ul>

<h2>Siteniz Mobilde Nasıl Görünüyor?</h2>
<p>Chrome tarayıcınızda sitenizi açın, sağ tıklayıp "İncele" deyin ve sol üstteki mobil cihaz simgesine tıklayın. Gördüğünüz, müşterilerinizin telefonlarında yaşadığı deneyim.</p>
<p>Eğer metinler küçük ve sıkışık, görseller taşmış veya butonlara tıklamak zorsa — potansiyel müşterilerinizi kaybediyorsunuz demektir.</p>

<h2>Google Mobil Öncelikli İndeksleme Kullanıyor</h2>
<p>2019'dan bu yana Google, siteleri masaüstü değil mobil sürümleriyle sıralıyor. Mobil uyumsuz bir site doğrudan arama sıralamalarınızı etkiliyor.</p>

<h2>Netravox Sitelerinde Mobil Önce Yaklaşımı</h2>
<p>Netravox altyapısında tüm siteler "mobile first" tasarlanır. Her bileşen, her yazı tipi boyutu ve her dokunma alanı önce 375px mobil ekranda test edilir. iOS zoom sorunu yaratmamak için tüm form alanları en az 16px font kullanır.</p>`,
    },
    author: 'Netravox Ekibi',
    tags: ['mobil', 'responsive tasarım', 'web sitesi', 'kullanıcı deneyimi'],
    status: 'published',
    publishedAt: new Date('2026-04-22'),
    seo: {
      metaTitle: { tr: 'Mobil Uyumlu Web Sitesi Neden Önemli? | Netravox' },
      metaDesc: { tr: 'Türkiye\'de internet trafiğinin %75\'i mobilden geliyor. Mobil uyumsuz web sitesinin müşteri kaybı ve SEO üzerindeki etkisini öğrenin.' },
    },
  },
  {
    slug: 'web-sitesi-hizinin-onemi-ve-cdnin-rolu',
    title: {
      tr: 'Web Sitenizin Hızı Gelirinizi Doğrudan Etkiliyor',
      en: 'Your Website Speed Directly Impacts Your Revenue',
    },
    excerpt: {
      tr: 'Amazon\'un araştırmasına göre her 100ms gecikme %1 satış kaybına neden oluyor. Küçük bir işletme için bu, fark edemeden kaybedilen onlarca müşteri anlamına gelir.',
      en: 'Amazon found that every 100ms delay causes a 1% drop in sales. For a small business, that\'s dozens of customers lost without noticing.',
    },
    content: {
      tr: `<h2>Hız = Para</h2>
<p>Bu abartı değil. Google'ın kendi araştırmaları, 1-3 saniye arasında yüklenen sayfaların bounce rate'inin %32 arttığını gösteriyor. 1-5 saniyeye çıkınca bu oran %90'a ulaşıyor.</p>
<p>Yani siteniz 5 saniyede yükleniyorsa, o sayfaya gelen müşterilerin neredeyse yarısı içeriği görmeden ayrılıyor.</p>

<h2>Web Sitesi Neden Yavaş Olur?</h2>
<ul>
  <li><strong>Optimize edilmemiş görseller:</strong> 5MB'lık fotoğrafları doğrudan yüklemek en yaygın hatadır</li>
  <li><strong>Hosting kalitesi:</strong> Ucuz shared hosting planları yoğun saatlerde ciddi yavaşlamaya neden olur</li>
  <li><strong>CDN kullanılmaması:</strong> Sunucu İstanbul'daysa, İzmir'deki kullanıcı daha uzaktan veri çeker</li>
  <li><strong>Gereksiz JavaScript:</strong> Yüklenmesi gerekmeyen eklentiler ve scriptler</li>
</ul>

<h2>CDN Nedir ve Neden Önemli?</h2>
<p>CDN (Content Delivery Network), içeriklerinizi dünya genelindeki birden fazla sunucuda dağıtarak kullanıcıya en yakın sunucudan hızlı servis verilmesini sağlar. Türkiye'deki kullanıcılar için bu, yükleme süresini 2-3x azaltabilir.</p>

<h2>Netravox'ta Hız Altyapısı</h2>
<p>Netravox altyapısında tüm siteler Cloudflare CDN üzerinden servis edilir. Görseller otomatik optimize edilir ve WebP formatına çevrilir. Hosting Vercel platformu üzerinde çalışır — edge network sayesinde Türkiye dahil tüm dünyada hızlı yükleme süresi sağlanır.</p>`,
    },
    author: 'Netravox Ekibi',
    tags: ['web sitesi hızı', 'CDN', 'performans', 'hosting'],
    status: 'published',
    publishedAt: new Date('2026-04-29'),
    seo: {
      metaTitle: { tr: 'Web Sitesi Hızı Neden Önemli? | Netravox' },
      metaDesc: { tr: 'Yavaş web sitesi müşteri ve gelir kaybettirir. CDN, görsel optimizasyonu ve doğru hosting seçimiyle hızlı site nasıl kurulur, öğrenin.' },
    },
  },
];

const seed = async () => {
  await connect();
  console.log('Blog seed başladı...');

  const company = await Company.findOne({ slug: 'netravox' });
  if (!company) {
    console.error('❌ Netravox firması bulunamadı. Önce seed.js çalıştırın: node src/seed.js');
    process.exit(1);
  }

  let created = 0;
  let skipped = 0;

  for (const post of posts) {
    const exists = await BlogPost.findOne({ tenantId: company._id, slug: post.slug });
    if (exists) {
      console.log(`→ Zaten var: "${post.title.tr}"`);
      skipped++;
      continue;
    }
    await BlogPost.create({ ...post, tenantId: company._id });
    console.log(`✓ Oluşturuldu: "${post.title.tr}"`);
    created++;
  }

  console.log(`\nBlog seed tamamlandı. ${created} yeni yazı, ${skipped} atlandı.`);
  process.exit(0);
};

seed().catch((err) => { console.error(err); process.exit(1); });
