/**
 * VAULT Clothing — Demo Seed Script
 * node vault-seed.js
 */
require('./backend/node_modules/dotenv').config({ path: './backend/.env' });
const mongoose = require('./backend/node_modules/mongoose');

const Company          = require('./backend/src/models/Company');
const Service          = require('./backend/src/models/Service');
const BlogPost         = require('./backend/src/models/BlogPost');
const Faq              = require('./backend/src/models/Faq');
const NavigationMenu   = require('./backend/src/models/NavigationMenu');
const SeoSettings      = require('./backend/src/models/SeoSettings');
const User             = require('./backend/src/models/User');
const Role             = require('./backend/src/models/Role');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ MongoDB bağlandı');

  // ──────────────────────────────────────────
  // 1. Varsa eski VAULT verisini temizle
  // ──────────────────────────────────────────
  const existing = await Company.findOne({ slug: 'vault-clothing' });
  if (existing) {
    const tid = existing._id;
    await Service.deleteMany({ tenantId: tid });
    await BlogPost.deleteMany({ tenantId: tid });
    await Faq.deleteMany({ tenantId: tid });
    await NavigationMenu.deleteMany({ tenantId: tid });
    await SeoSettings.deleteMany({ tenantId: tid });
    await User.deleteMany({ tenantId: tid });
    await Company.deleteOne({ _id: tid });
    console.log('🗑  Eski VAULT verisi silindi');
  }

  // ──────────────────────────────────────────
  // 2. Firma oluştur
  // ──────────────────────────────────────────
  const company = await Company.create({
    name: 'VAULT',
    slug: 'vault-clothing',
    sector: 'other',
    isActive: true,
    description: {
      tr: 'Minimal tasarım, maksimal etki. VAULT; premium kumaşlar, zamansız kesimler ve sade estetikle modern Türk giyim dünyasını yeniden tanımlıyor.',
      en: 'Minimal design, maximum impact. VAULT redefines modern fashion with premium fabrics, timeless cuts and clean aesthetics.',
    },
    branding: {
      primaryColor: '#0A0A0A',
      secondaryColor: '#F5F4F0',
      accentColor: '#C8A882',
    },
    settings: {
      defaultLanguage: 'tr',
      supportedLanguages: ['tr', 'en'],
      timezone: 'Europe/Istanbul',
    },
    contact: {
      phone: '+90 212 555 01 42',
      email: 'info@vaultclothing.com',
      address: 'Teşvikiye Caddesi No:42, Nişantaşı',
      city: 'İstanbul',
      country: 'Türkiye',
    },
    workingHours: [
      { days: 'Pazartesi – Cumartesi', hours: '10:00 – 20:00' },
      { days: 'Pazar', hours: '12:00 – 18:00' },
    ],
    socialLinks: {
      instagram: 'https://instagram.com/vaultclothing',
      tiktok: 'https://tiktok.com/@vaultclothing',
      facebook: 'https://facebook.com/vaultclothing',
    },
    content: {
      heroTitle: {
        tr: 'Minimal Giyim.\nMaksimal Etki.',
        en: 'Minimal Design.\nMaximum Impact.',
      },
      heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
      homeImages: [
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
        'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&q=80',
        'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80',
      ],
      testimonial: {
        quote: {
          tr: 'VAULT sadece bir kıyafet markası değil; minimal ama güçlü bir ifade biçimi. Her ürünü giydiğimde fark ediliyorum.',
          en: 'VAULT is not just a clothing brand — it\'s a statement. Every piece I wear makes me stand out.',
        },
        author: 'Kerem Arslan',
        role: 'Müşteri · Instagram @keremarslan',
      },
      aboutHeroImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&q=80',
      aboutParagraph2: {
        tr: 'Her ürün, yalnızca estetik değil aynı zamanda konfor ve dayanıklılık düşünülerek tasarlanır. Türkiye\'nin en iyi kumaş tedarikçileriyle çalışarak standartlarımızı yüksek tutuyoruz.',
        en: 'Every product is designed not just for aesthetics but also for comfort and durability. We work with Turkey\'s best fabric suppliers to maintain our high standards.',
      },
      aboutParagraph3: {
        tr: 'VAULT, 2022 yılında İstanbul\'da kuruldu. Minimal giyim anlayışını Türk modasına taşıma misyonuyla yola çıktı. Bugün binlerce müşteri VAULT\'u günlük yaşamın ayrılmaz bir parçası olarak görüyor.',
        en: 'VAULT was founded in Istanbul in 2022 with a mission to bring minimalist fashion to Turkish audiences. Today, thousands of customers see VAULT as an essential part of their daily lives.',
      },
      values: [
        {
          icon: '⬛',
          title: { tr: 'Sadelik', en: 'Simplicity' },
          description: { tr: 'Gereksiz detayları çıkardık. Her çizgi, her renk bir anlam taşıyor.', en: 'We removed the unnecessary. Every line, every color carries meaning.' },
        },
        {
          icon: '🧵',
          title: { tr: 'Premium Kumaş', en: 'Premium Fabric' },
          description: { tr: '380 gsm ağır pamuk, organic blend ve özel boya prosesleriyle üretiyoruz.', en: 'Produced with 380gsm heavy cotton, organic blends and custom dyeing.' },
        },
        {
          icon: '♻️',
          title: { tr: 'Sürdürülebilirlik', en: 'Sustainability' },
          description: { tr: 'Çevreye saygılı üretim, az atık, uzun ömürlü ürünler.', en: 'Eco-conscious production, minimal waste, long-lasting products.' },
        },
        {
          icon: '🇹🇷',
          title: { tr: 'Yerli Üretim', en: 'Made in Turkey' },
          description: { tr: 'Tüm ürünler Türkiye\'de, yerel atölyelerimizde üretilmektedir.', en: 'All products are made in Turkey at our local workshops.' },
        },
      ],
    },
    features: { aiContent: true },
    emailSettings: {
      accentColor: '#0A0A0A',
    },
  });
  console.log(`✅ Firma oluşturuldu: ${company.name} (${company._id})`);
  const tid = company._id;

  // ──────────────────────────────────────────
  // 3. Ürünler (Service modeli kullanılıyor)
  // ──────────────────────────────────────────
  const products = [
    // T-Shirts
    {
      name: { tr: 'VOID Oversized Tee', en: 'VOID Oversized Tee' },
      description: { tr: '380 gsm %100 organik pamuk. Dropped shoulder, relaxed fit. Unisex tasarım.', en: '380gsm 100% organic cotton. Dropped shoulder, relaxed fit. Unisex design.' },
      icon: '👕',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
      price: 890, currency: 'TRY', isActive: true, order: 1,
    },
    {
      name: { tr: 'ARCH Graphic Tee', en: 'ARCH Graphic Tee' },
      description: { tr: 'Minimal VAULT logosu baskılı, 320 gsm pamuk. Regular fit.', en: 'Minimal VAULT logo print, 320gsm cotton. Regular fit.' },
      icon: '👕',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
      price: 790, currency: 'TRY', isActive: true, order: 2,
    },
    {
      name: { tr: 'FORM Essential Tee', en: 'FORM Essential Tee' },
      description: { tr: 'Her gardırobun temel parçası. Slim fit, 280 gsm combed cotton.', en: 'The essential wardrobe staple. Slim fit, 280gsm combed cotton.' },
      icon: '👕',
      image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&q=80',
      price: 750, currency: 'TRY', isActive: true, order: 3,
    },
    {
      name: { tr: 'SHADOW Washed Tee', en: 'SHADOW Washed Tee' },
      description: { tr: 'Özel asit yıkama tekniğiyle soluk, vintage görünüm. Oversize cut.', en: 'Special acid wash for a faded, vintage look. Oversized cut.' },
      icon: '👕',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80',
      price: 850, currency: 'TRY', isActive: true, order: 4,
    },
    // Hoodies
    {
      name: { tr: 'VAULT Heavyweight Hoodie', en: 'VAULT Heavyweight Hoodie' },
      description: { tr: '550 gsm premium fleece. Boxy fit, ribbed cuffs. Nakış logo.', en: '550gsm premium fleece. Boxy fit, ribbed cuffs. Embroidered logo.' },
      icon: '🧥',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',
      price: 1590, currency: 'TRY', isActive: true, order: 5,
    },
    {
      name: { tr: 'OBSIDIAN Zip-Up Hoodie', en: 'OBSIDIAN Zip-Up Hoodie' },
      description: { tr: 'Metal YKK fermuarlı, 480 gsm French terry. Relaxed fit.', en: 'Metal YKK zipper, 480gsm French terry. Relaxed fit.' },
      icon: '🧥',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80',
      price: 1490, currency: 'TRY', isActive: true, order: 6,
    },
    {
      name: { tr: 'MONO Crewneck Sweatshirt', en: 'MONO Crewneck Sweatshirt' },
      description: { tr: 'Minimal crewneck. 420 gsm loop-back cotton blend. Regular fit.', en: 'Minimal crewneck. 420gsm loop-back cotton blend. Regular fit.' },
      icon: '🧥',
      image: 'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?w=600&q=80',
      price: 1290, currency: 'TRY', isActive: true, order: 7,
    },
    // Outerwear
    {
      name: { tr: 'DARK Varsity Ceket', en: 'DARK Varsity Jacket' },
      description: { tr: 'Klasik varsity silüeti, modern detaylar. Kol nakışı, kontrast ribana.', en: 'Classic varsity silhouette, modern details. Arm embroidery, contrast ribbing.' },
      icon: '🧥',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
      price: 2490, currency: 'TRY', isActive: true, order: 8,
    },
    // Accessories
    {
      name: { tr: 'VAULT Logo Cap', en: 'VAULT Logo Cap' },
      description: { tr: 'Altı panelli, metal toka, nakış VAULT logosu. Ayarlanabilir.', en: 'Six-panel structured cap, metal buckle, embroidered VAULT logo. Adjustable.' },
      icon: '🧢',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80',
      price: 590, currency: 'TRY', isActive: true, order: 9,
    },
    {
      name: { tr: 'FORM Tote Bag', en: 'FORM Tote Bag' },
      description: { tr: 'Ağır kanvas kumaş, serigrafi baskı. 42×38 cm. Günlük kullanım için tasarlandı.', en: 'Heavy canvas fabric, screen print. 42×38 cm. Designed for everyday use.' },
      icon: '👜',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
      price: 490, currency: 'TRY', isActive: true, order: 10,
    },
  ];

  const createdProducts = await Service.insertMany(products.map(p => ({ ...p, tenantId: tid })));
  console.log(`✅ ${createdProducts.length} ürün eklendi`);

  // ──────────────────────────────────────────
  // 4. Blog yazıları
  // ──────────────────────────────────────────
  const now = new Date();
  const blogPosts = [
    {
      title: '2025\'in Minimal Moda Trendleri: Az Parça, Daha Fazla Stil',
      slug: '2025-minimal-moda-trendleri',
      excerpt: 'Bu yıl dolap doldurmak yerine doğru parçaları seçmek öne çıkıyor. Capsule wardrobe, nötr renkler ve premium kumaşlarla nasıl minimal bir tarz oluşturursunuz?',
      content: `<p>2025, fazlalıktan arınmış bir modanın yılı olarak öne çıkıyor. Sosyal medyanın "daha az, daha iyi" söylemi artık sadece bir trend değil, bilinçli tüketicilerin kalıcı tercihi haline geldi.</p>
<h2>Nötr Renk Paleti</h2>
<p>Siyah, beyaz, krem, taş ve gri tonları 2025'in vazgeçilmezi. Bu renkler birbirleriyle mükemmel uyum sağlayarak mix-and-match kolaylaşıyor.</p>
<h2>Ağır Kumaş, Uzun Ömür</h2>
<p>380 gsm ve üzeri ağır pamuk kullanımı hem görsel hem dokunsal bir kalite hissi yaratıyor. Ürünler yıkanma ve yıpranmaya karşı daha dayanıklı oluyor.</p>
<h2>Oversized Silüet Devam Ediyor</h2>
<p>Boxy ve dropped shoulder kesimler rahat görünümlü ama bilinçli bir estetik sunuyor. Doğru orantılarla giyildiğinde son derece şık bir etki yaratıyor.</p>`,
      status: 'published',
      publishedAt: new Date(now - 2 * 24 * 60 * 60 * 1000),
      author: 'VAULT Editorial',
      tags: ['trend', 'minimal', 'moda', '2025'],
      coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80',
      seo: {
        metaTitle: '2025 Minimal Moda Trendleri — VAULT Blog',
        metaDescription: '2025\'in en güçlü minimal moda trendleri: capsule wardrobe, nötr renkler ve ağır kumaş seçimi hakkında her şey.',
      },
    },
    {
      title: 'Capsule Wardrobe: 10 Parçayla Eksiksiz Gardırop',
      slug: 'capsule-wardrobe-10-parca',
      excerpt: 'Her sabah "ne giyeceğim?" sorusunu bitirmenin zamanı geldi. 10 temel parçayla sonsuz kombinasyon yapabileceğiniz bir gardırop kurma rehberi.',
      content: `<p>Capsule wardrobe fikri, 1970'lerde ortaya çıktı ve bugün minimalist yaşam anlayışının en güçlü sembollerinden biri haline geldi.</p>
<h2>Temel 10 Parça</h2>
<ol>
<li>Beyaz essential tee × 2</li>
<li>Siyah oversized hoodie</li>
<li>Slim fit siyah pantolon</li>
<li>Açık gri crewneck sweatshirt</li>
<li>Krem varsity ceket</li>
<li>Siyah şort</li>
<li>Beyaz sneaker</li>
<li>Siyah logo cap</li>
</ol>
<h2>Neden İşe Yarıyor?</h2>
<p>Bu 10 parçayla matematiksel olarak 47 farklı kombinasyon kurabilirsiniz. Enerji harcamak yerine doğru kıyafeti giyiyor, güne odaklanıyorsunuz.</p>`,
      status: 'published',
      publishedAt: new Date(now - 7 * 24 * 60 * 60 * 1000),
      author: 'VAULT Editorial',
      tags: ['capsule wardrobe', 'stil', 'gardırop'],
      coverImage: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=80',
      seo: {
        metaTitle: 'Capsule Wardrobe: 10 Parçayla Eksiksiz Gardırop — VAULT',
        metaDescription: '10 temel kıyafetle sonsuz kombinasyon yapmanın yolu. Capsule wardrobe rehberi.',
      },
    },
    {
      title: 'Premium Kumaş Neden Önemli? 280 gsm vs 550 gsm',
      slug: 'premium-kumas-neden-onemli',
      excerpt: 'Bir tişörte 200 TL değil 890 TL ödemenin mantığı nedir? Kumaş ağırlığı, iplik kalitesi ve üretim süreci arasındaki farkları açıklıyoruz.',
      content: `<p>Kumaş gsm (gram per square meter) değeri, bir kumaşın ne kadar ağır ve kalın olduğunu belirtir. Bu sayı ne anlama geliyor ve neden önemli?</p>
<h2>GSM Değerleri</h2>
<ul>
<li><strong>140-180 gsm</strong>: Ucuz market tişörtleri. İnce, şeffaf, çabuk deforme olur.</li>
<li><strong>220-280 gsm</strong>: Standart kaliteli tişört. Çoğu markanın kullandığı aralık.</li>
<li><strong>320-380 gsm</strong>: Premium tişört. Ağır, dolu tutum, uzun ömürlü.</li>
<li><strong>420-550 gsm</strong>: Hoodie kalitesi. Gerçek ağır giyim hissi.</li>
</ul>
<h2>Neden VAULT 380 gsm Kullanıyor?</h2>
<p>380 gsm'nin altı bize kaliteli hissi vermiyor. Müşterilerimiz ürünü eline aldığında hissettiği ağırlık, satın alma kararının %40'ını etkiliyor.</p>`,
      status: 'published',
      publishedAt: new Date(now - 14 * 24 * 60 * 60 * 1000),
      author: 'VAULT Editorial',
      tags: ['kumaş', 'kalite', 'premium', 'gsm'],
      coverImage: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=1200&q=80',
      seo: {
        metaTitle: 'Premium Kumaş Neden Önemli? — VAULT Blog',
        metaDescription: 'GSM değerleri ve kumaş kalitesi arasındaki fark. Neden premium tişört ucuzdan daha iyidir?',
      },
    },
  ];

  const createdBlog = await BlogPost.insertMany(blogPosts.map(p => ({ ...p, tenantId: tid })));
  console.log(`✅ ${createdBlog.length} blog yazısı eklendi`);

  // ──────────────────────────────────────────
  // 5. SSS
  // ──────────────────────────────────────────
  const faqs = [
    { question: 'Kargo süresi ne kadar?', answer: 'Siparişler 1-2 iş günü içinde kargoya verilir. İstanbul içi teslimat genellikle ertesi gün, Türkiye geneli 2-4 iş günüdür. Kargo ücretsizdir (750 TL ve üzeri alışverişlerde).', order: 1 },
    { question: 'İade ve değişim yapabilir miyim?', answer: '14 gün içinde, kullanılmamış ve etiketi üzerinde olan ürünleri iade edebilirsiniz. İade kargo ücretini biz karşılıyoruz. Değişim için whatsapp hattımızdan iletişime geçebilirsiniz.', order: 2 },
    { question: 'Beden seçiminde ne önerirsiniz?', answer: 'Oversized modeller için normal bedeninizi, slim/form modeller için ise bir beden büyük almanızı öneririz. Her ürünün sayfasında detaylı ölçü tablosu bulunmaktadır.', order: 3 },
    { question: 'Kumaşlar nasıl yıkanmalı?', answer: 'Tüm ürünlerimizi 30°C\'da ters çevirerek makine yıkamanızı ve düşük ısıda kurutmanızı öneririz. Çamaşır suyu ve yumuşatıcı kullanmayın. Böylece kumaş kalitesi uzun süre korunur.', order: 4 },
    { question: 'Mağaza adresiniz nerede?', answer: 'Nişantaşı, Teşvikiye Caddesi No:42, İstanbul. Pazartesi-Cumartesi 10:00-20:00, Pazar 12:00-18:00 saatleri arasında hizmet veriyoruz.', order: 5 },
  ];

  await Faq.insertMany(faqs.map(f => ({ ...f, tenantId: tid, isActive: true })));
  console.log(`✅ ${faqs.length} SSS eklendi`);

  // ──────────────────────────────────────────
  // 6. Navigasyon menüsü
  // ──────────────────────────────────────────
  await NavigationMenu.create({
    tenantId: tid,
    name: 'Ana Navigasyon',
    slug: 'main',
    items: [
      { label: { tr: 'Ana Sayfa', en: 'Home' }, url: '/', order: 1 },
      { label: { tr: 'Koleksiyonlar', en: 'Collections' }, url: '/koleksiyonlar', order: 2 },
      { label: { tr: 'Hakkımızda', en: 'About' }, url: '/hakkimizda', order: 3 },
      { label: { tr: 'Blog', en: 'Blog' }, url: '/blog', order: 4 },
      { label: { tr: 'İletişim', en: 'Contact' }, url: '/iletisim', order: 5 },
    ],
  });
  console.log('✅ Navigasyon menüsü eklendi');

  // ──────────────────────────────────────────
  // 7. SEO ayarları
  // ──────────────────────────────────────────
  await SeoSettings.create({
    tenantId: tid,
    defaultTitle: 'VAULT — Minimal Giyim, Maksimal Etki',
    defaultDescription: 'Premium kumaşlar ve zamansız kesimlerle modern giyim. VAULT koleksiyonlarını keşfedin.',
    defaultKeywords: 'minimal giyim, premium tişört, hoodie, vault clothing, türk moda',
    ogImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    robotsTxt: 'User-agent: *\nAllow: /',
    generateSitemap: true,
  });
  console.log('✅ SEO ayarları eklendi');

  // ──────────────────────────────────────────
  // 8. Demo kullanıcı (Company Admin)
  // ──────────────────────────────────────────
  // Super admin rolü bul veya company admin rolü al
  const adminRole = await Role.findOne({ name: { $regex: /admin/i } });
  if (adminRole) {
    const bcrypt = require('bcryptjs');
    const hashed = await bcrypt.hash('Vault2024!', 12);
    await User.create({
      tenantId: tid,
      email: 'admin@vaultclothing.com',
      password: hashed,
      name: 'VAULT Admin',
      role: adminRole._id,
      isActive: true,
    });
    console.log('✅ Demo kullanıcı oluşturuldu: admin@vaultclothing.com / Vault2024!');
  } else {
    console.log('⚠️  Rol bulunamadı, kullanıcı oluşturulmadı');
  }

  // ──────────────────────────────────────────
  console.log('\n🎉 VAULT seed tamamlandı!');
  console.log(`   Firma ID  : ${tid}`);
  console.log(`   Slug      : vault-clothing`);
  console.log(`   API       : http://localhost:5001/api/public/vault-clothing/company`);
  console.log(`   Demo user : admin@vaultclothing.com / Vault2024!\n`);

  await mongoose.disconnect();
}

seed().catch(e => { console.error(e); process.exit(1); });
