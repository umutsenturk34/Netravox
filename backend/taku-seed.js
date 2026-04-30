/**
 * TAKU — Demo Seed Script
 * cd backend && node taku-seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');

const Company        = require('./src/models/Company');
const Service        = require('./src/models/Service');
const BlogPost       = require('./src/models/BlogPost');
const Faq            = require('./src/models/Faq');
const NavigationMenu = require('./src/models/NavigationMenu');
const Page           = require('./src/models/Page');
const SeoSettings    = require('./src/models/SeoSettings');
const User           = require('./src/models/User');
const Role           = require('./src/models/Role');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ MongoDB bağlandı');

  // Temizle
  const existing = await Company.findOne({ slug: 'taku' });
  if (existing) {
    const tid = existing._id;
    await Promise.all([
      Service.deleteMany({ tenantId: tid }),
      BlogPost.deleteMany({ tenantId: tid }),
      Faq.deleteMany({ tenantId: tid }),
      NavigationMenu.deleteMany({ tenantId: tid }),
      Page.deleteMany({ tenantId: tid }),
      SeoSettings.deleteMany({ tenantId: tid }),
      User.deleteMany({ 'companyRoles.tenantId': tid }),
    ]);
    await Company.deleteOne({ _id: tid });
    console.log('🗑  Eski TAKU verisi silindi');
  }
  // Eşleşmeyen eski kullanıcıyı da temizle
  await User.deleteMany({ email: 'admin@takustudio.com' });

  // Firma
  const company = await Company.create({
    name: 'TAKU',
    slug: 'taku',
    sector: 'other',
    isActive: true,
    description: {
      tr: 'Sadeliğin gücüne inanan bir marka. TAKU; özenle seçilmiş kumaşlar, zamansız kesimler ve minimal estetikle günlük giyimi yeniden tanımlıyor.',
      en: 'A brand that believes in the power of simplicity. TAKU redefines everyday wear with carefully sourced fabrics, timeless cuts and minimal aesthetics.',
    },
    branding: {
      primaryColor: '#0A0A0A',
      secondaryColor: '#F5F4F0',
      accentColor: '#C8A882',
    },
    settings: { defaultLanguage: 'tr', supportedLanguages: ['tr', 'en'], timezone: 'Europe/Istanbul' },
    contact: {
      phone: '+90 212 555 08 08',
      whatsapp: '+90 532 555 08 08',
      email: 'info@takustudio.com',
      address: 'Bağdat Caddesi No:88, Kadıköy',
      city: 'İstanbul',
      country: 'Türkiye',
    },
    workingHours: [
      { days: 'Pazartesi – Cumartesi', hours: '10:00 – 20:00' },
      { days: 'Pazar', hours: '12:00 – 18:00' },
    ],
    socialLinks: {
      instagram: 'https://instagram.com/takustudio',
      tiktok: 'https://tiktok.com/@takustudio',
    },
    content: {
      heroTitle: { tr: 'Sadeliğin\nGücü.', en: 'The Power\nOf Simplicity.' },
      heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
      homeImages: [
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
        'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&q=80',
        'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80',
      ],
      testimonial: {
        quote: { tr: 'TAKU\'nun parçaları sadece kıyafet değil; bir tutum. Giydiğimde kendime dönüyorum.', en: "TAKU pieces aren't just clothes — they're an attitude. When I wear them, I feel like myself." },
        author: 'Selin Kaya',
        role: 'Müşteri · @selinkaya',
      },
      aboutHeroImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&q=80',
      aboutParagraph2: {
        tr: 'Her TAKU ürünü, kalıcılık düşüncesiyle tasarlanır. Hızlı modanın tam karşısında duruyoruz: az üret, iyi üret, uzun kullan.',
        en: 'Every TAKU product is designed with longevity in mind. We stand against fast fashion: produce less, produce well, use longer.',
      },
      aboutParagraph3: {
        tr: 'TAKU, 2023 yılında İstanbul\'da kuruldu. Minimal giyim anlayışını Türk insanına taşıma tutkusuyla başladık. Bugün her yaştan insanın kendi tarzını bulmasına yardım ediyoruz.',
        en: 'TAKU was founded in Istanbul in 2023. We started with a passion to bring minimalist fashion to Turkey. Today we help people of all ages find their own style.',
      },
      values: [
        { icon: '◼', title: { tr: 'Minimal Tasarım', en: 'Minimal Design' }, description: { tr: 'Sadelik en güçlü ifadedir. Fazlalıkları atmak cesareti, geride kalanı mükemmelleştirmek ustalıktır.', en: 'Simplicity is the most powerful expression. It takes courage to strip away the excess.' } },
        { icon: '🧵', title: { tr: 'Üstün Kalite', en: 'Superior Quality' }, description: { tr: '350+ gsm organik pamuk, yerel atölyeler ve sıkı kalite kontrolüyle her dikişi önemseriz.', en: '350+ gsm organic cotton, local workshops and rigorous quality control — we care about every stitch.' } },
        { icon: '♻️', title: { tr: 'Sorumlu Üretim', en: 'Responsible Production' }, description: { tr: 'Çevreye duyarlı malzemeler, az atık ve adil üretim koşulları temel ilkelerimizdir.', en: 'Eco-friendly materials, minimal waste and fair production conditions are our core principles.' } },
        { icon: '🇹🇷', title: { tr: 'Yerli & Güvenilir', en: 'Local & Trusted' }, description: { tr: 'Tüm ürünler Türkiye\'de, el seçimi atölyelerimizde üretilmektedir.', en: 'All products are made in Turkey in our hand-picked workshops.' } },
      ],
    },
    features: { aiContent: true, whatsapp: true },
    emailSettings: { accentColor: '#0A0A0A' },
  });
  console.log(`✅ Firma: ${company.name} (${company._id})`);
  const tid = company._id;

  // Ürünler
  const products = [
    { name: { tr: 'CORE Oversized Tee', en: 'CORE Oversized Tee' }, description: { tr: '360 gsm %100 organik pamuk. Boxy fit, unisex kesim.', en: '360gsm 100% organic cotton. Boxy fit, unisex cut.' }, icon: '👕', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80', price: 850, currency: 'TRY', isActive: true, order: 1 },
    { name: { tr: 'ZERO Graphic Tee', en: 'ZERO Graphic Tee' }, description: { tr: 'Minimal TAKU baskısı, 300 gsm combed cotton.', en: 'Minimal TAKU print, 300gsm combed cotton.' }, icon: '👕', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', price: 790, currency: 'TRY', isActive: true, order: 2 },
    { name: { tr: 'BASE Essential Tee', en: 'BASE Essential Tee' }, description: { tr: 'Her gardırobun temel parçası. Slim fit, 280 gsm.', en: 'The wardrobe essential. Slim fit, 280gsm.' }, icon: '👕', image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&q=80', price: 720, currency: 'TRY', isActive: true, order: 3 },
    { name: { tr: 'TAKU Heavyweight Hoodie', en: 'TAKU Heavyweight Hoodie' }, description: { tr: '520 gsm premium fleece. Boxy fit, nakış logo.', en: '520gsm premium fleece. Boxy fit, embroidered logo.' }, icon: '🧥', image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80', price: 1490, currency: 'TRY', isActive: true, order: 4 },
    { name: { tr: 'MONO Crewneck', en: 'MONO Crewneck' }, description: { tr: 'Minimal crewneck, 400 gsm loop-back cotton.', en: 'Minimal crewneck, 400gsm loop-back cotton.' }, icon: '🧥', image: 'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?w=600&q=80', price: 1190, currency: 'TRY', isActive: true, order: 5 },
    { name: { tr: 'SLATE Zip Hoodie', en: 'SLATE Zip Hoodie' }, description: { tr: 'YKK metal fermuarlı, 460 gsm French terry.', en: 'YKK metal zipper, 460gsm French terry.' }, icon: '🧥', image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80', price: 1390, currency: 'TRY', isActive: true, order: 6 },
    { name: { tr: 'TAKU Logo Cap', en: 'TAKU Logo Cap' }, description: { tr: 'Altı panel, metal toka, nakış logo. Unisex, ayarlanabilir.', en: 'Six panel, metal buckle, embroidered logo. Unisex, adjustable.' }, icon: '🧢', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80', price: 550, currency: 'TRY', isActive: true, order: 7 },
    { name: { tr: 'CARRY Tote Bag', en: 'CARRY Tote Bag' }, description: { tr: 'Ağır kanvas, serigrafi baskı. 42×38 cm.', en: 'Heavy canvas, screen print. 42×38cm.' }, icon: '👜', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', price: 450, currency: 'TRY', isActive: true, order: 8 },
  ];
  await Service.insertMany(products.map((p) => ({ ...p, tenantId: tid })));
  console.log(`✅ ${products.length} ürün eklendi`);

  // Blog
  const now = new Date();
  const blogPosts = [
    {
      title: { tr: 'Minimal Giyim Neden Bu Kadar Güçlü?', en: null },
      slug: 'minimal-giyim-neden-guclu',
      excerpt: { tr: 'Daha az parça, daha çok özgürlük. Minimal giyim felsefesini ve günlük hayata nasıl entegre edeceğini keşfet.', en: null },
      content: { tr: '<p>Minimal giyim sadece estetik bir tercih değil, bir yaşam biçimidir. Her sabah ne giyeceğini düşünmeden geçirilecek zihinsel enerji, yaratıcı işlere harcanabilir.</p><h2>Az Parça, Daha Fazla Kombinasyon</h2><p>5 temel parçayla 30 farklı kombinasyon yapabilirsin. Matematiksel olarak minimal bir gardırop, kalabalık bir gardıroptan daha fazla seçenek sunar.</p><h2>Kalite mi, Miktar mı?</h2><p>Çok sayıda ucuz ürün yerine az sayıda kaliteli parça hem bütçeni korur hem de atık miktarını azaltır.</p>', en: null },
      status: 'published', publishedAt: new Date(now - 3 * 86400000),
      author: 'TAKU Editorial', tags: ['minimal', 'stil', 'felsefe'],
      coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80',
      seo: { metaTitle: { tr: 'Minimal Giyim Neden Güçlü? — TAKU Blog', en: null }, metaDesc: { tr: 'Minimal giyim felsefesi ve günlük hayata entegrasyonu.', en: null } },
    },
    {
      title: { tr: 'Capsule Gardırop: 8 Parçayla Eksiksiz Stil', en: null },
      slug: 'capsule-gardırop-8-parca',
      excerpt: { tr: 'Gardırobunuzu sıfırdan kurgulayın. 8 temel parçayla mevsim geçişlerini kolayca yönetin.', en: null },
      content: { tr: '<p>Capsule gardırop kavramı, 1970\'lerde ortaya çıktı. Temel fikir basit: birbirleriyle uyumlu az sayıda parça ile maksimum kombinasyon elde etmek.</p><h2>8 Temel TAKU Parçası</h2><ol><li>2× Beyaz/siyah essential tee</li><li>1× Oversized hoodie</li><li>1× Crewneck sweatshirt</li><li>1× Slim fit pantolon</li><li>1× Şort</li><li>1× Cap</li><li>1× Tote bag</li></ol>', en: null },
      status: 'published', publishedAt: new Date(now - 10 * 86400000),
      author: 'TAKU Editorial', tags: ['capsule wardrobe', 'gardırop', 'stil'],
      coverImage: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=80',
      seo: { metaTitle: { tr: 'Capsule Gardırop — TAKU Blog', en: null }, metaDesc: { tr: '8 parçayla eksiksiz gardırop rehberi.', en: null } },
    },
  ];
  await BlogPost.insertMany(blogPosts.map((p) => ({ ...p, tenantId: tid })));
  console.log(`✅ ${blogPosts.length} blog yazısı eklendi`);

  // SSS
  const faqs = [
    { question: { tr: 'Kargo süresi ne kadar?' }, answer: { tr: 'Siparişler 1-2 iş günü içinde kargoya verilir. İstanbul içi ertesi gün, Türkiye geneli 2-4 iş günüdür. 600 TL ve üzeri kargo ücretsizdir.' }, order: 1 },
    { question: { tr: 'İade ve değişim yapabilir miyim?' }, answer: { tr: '14 gün içinde, kullanılmamış ve etiketi üzerinde olan ürünleri iade edebilirsiniz. İade kargo ücretini biz karşılıyoruz.' }, order: 2 },
    { question: { tr: 'Beden seçiminde ne önerirsiniz?' }, answer: { tr: 'Oversized modeller için normal bedeninizi, slim/form modeller için bir beden büyük almanızı öneririz.' }, order: 3 },
    { question: { tr: 'Kumaşlar nasıl yıkanmalı?' }, answer: { tr: '30°C\'da, ters çevirerek yıkayın. Çamaşır suyu ve yumuşatıcı kullanmayın.' }, order: 4 },
  ];
  await Faq.insertMany(faqs.map((f) => ({ ...f, tenantId: tid, isActive: true })));
  console.log(`✅ ${faqs.length} SSS eklendi`);

  // Sayfalar
  const pages = [
    {
      template: 'home', status: 'published', publishedAt: new Date(),
      slug: { tr: '', en: '' },
      title: { tr: 'Ana Sayfa', en: 'Home' },
      content: {
        heroTitle:         { tr: 'Sadeliğin\nGücü.', en: 'The Power\nOf Simplicity.' },
        heroSubtitle:      { tr: '', en: '' },
        heroImageUrl:      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
        announcementText:  { tr: 'Ücretsiz kargo · 750 ₺ ve üzeri alışverişlerde · 14 gün koşulsuz iade · 2-4 iş günü teslimat', en: 'Free shipping · Orders over 750 ₺ · 14-day free returns · 2-4 business days nationwide' },
        ctaText:           { tr: 'Koleksiyonu Keşfet', en: 'Explore Collection' },
        ctaSecondaryText:  { tr: 'Hikayemiz', en: 'Our Story' },
        ctaUrl:            '/koleksiyonlar',
        storyTitle:        { tr: 'Sadelikten\nGüç Doğar', en: 'Power from\nSimplicity' },
        ctaBottomTitle:    { tr: 'Koleksiyonu\nKeşfet', en: 'Explore the\nCollection' },
        ctaBottomText:     { tr: 'Tüm Ürünleri Gör', en: 'View All Products' },
      },
      seo: {
        title: { tr: 'TAKU — Sadeliğin Gücü', en: 'TAKU — The Power of Simplicity' },
        description: { tr: 'Minimal giyim, maksimal etki. TAKU koleksiyonlarını keşfedin.', en: 'Minimal clothing, maximal impact. Discover TAKU collections.' },
        robots: 'index,follow',
      },
    },
    {
      template: 'about', status: 'published', publishedAt: new Date(),
      slug: { tr: 'hakkimizda', en: 'about' },
      title: { tr: 'Hakkımızda', en: 'About Us' },
      content: {
        imageUrl:      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&q=80',
        missionTitle:  { tr: 'Minimal Tasarım.\nMaksimal Etki.', en: 'Minimal Design.\nMaximum Impact.' },
        body: {
          tr: '<p>Sadeliğin gücüne inanan bir marka. TAKU; özenle seçilmiş kumaşlar, zamansız kesimler ve minimal estetikle günlük giyimi yeniden tanımlıyor.</p><p>Her TAKU ürünü, kalıcılık düşüncesiyle tasarlanır. Hızlı modanın tam karşısında duruyoruz: az üret, iyi üret, uzun kullan.</p><p>TAKU, 2023 yılında İstanbul\'da kuruldu. Minimal giyim anlayışını Türk insanına taşıma tutkusuyla başladık. Bugün her yaştan insanın kendi tarzını bulmasına yardım ediyoruz.</p>',
          en: '<p>A brand that believes in the power of simplicity. TAKU redefines everyday wear with carefully sourced fabrics, timeless cuts and minimal aesthetics.</p><p>Every TAKU product is designed with longevity in mind. We stand against fast fashion: produce less, produce well, use longer.</p><p>TAKU was founded in Istanbul in 2023. We started with a passion to bring minimalist fashion to Turkey. Today we help people of all ages find their own style.</p>',
        },
        stats: [
          { value: '2023', label: { tr: 'Kuruluş Yılı',  en: 'Founded' } },
          { value: '10K+', label: { tr: 'Mutlu Müşteri', en: 'Happy Customers' } },
          { value: '100%', label: { tr: 'Yerli Üretim',  en: 'Made in Turkey' } },
        ],
      },
      seo: {
        title: { tr: 'Hakkımızda — TAKU', en: 'About Us — TAKU' },
        description: { tr: 'TAKU\'nun hikayesini, felsefesini ve değerlerini keşfedin.', en: 'Discover the story, philosophy and values of TAKU.' },
        robots: 'index,follow',
      },
    },
    {
      template: 'generic', status: 'published', publishedAt: new Date(),
      slug: { tr: 'koleksiyonlar', en: 'collections' },
      title: { tr: 'Koleksiyonlar', en: 'Collections' },
      content: {
        heroTitle: { tr: 'Koleksiyonlar', en: 'Collections' },
        heroSubtitle: { tr: 'Tüm Sezon', en: 'All Season' },
      },
      seo: {
        title: { tr: 'Koleksiyonlar — TAKU', en: 'Collections — TAKU' },
        description: { tr: 'Tüm sezon TAKU koleksiyonlarını keşfedin. Minimal giyim, üstün kalite.', en: 'Explore all TAKU season collections. Minimal clothing, superior quality.' },
        robots: 'index,follow',
      },
    },
    {
      template: 'generic', status: 'published', publishedAt: new Date(),
      slug: { tr: 'blog', en: 'blog' },
      title: { tr: 'Blog', en: 'Blog' },
      content: {
        heroTitle:    { tr: 'Blog', en: 'Blog' },
        heroSubtitle: { tr: 'Editörden', en: 'From the Editor' },
      },
      seo: {
        title: { tr: 'Blog — TAKU', en: 'Blog — TAKU' },
        description: { tr: 'Moda, stil, sürdürülebilirlik ve minimal yaşam üzerine yazılar.', en: 'Articles on fashion, style, sustainability and minimalist living.' },
        robots: 'index,follow',
      },
    },
    {
      template: 'contact', status: 'published', publishedAt: new Date(),
      slug: { tr: 'iletisim', en: 'contact' },
      title: { tr: 'İletişim', en: 'Contact' },
      content: {
        heroTitle:    { tr: 'İletişim', en: 'Contact' },
        heroSubtitle: { tr: 'Ulaşın', en: 'Get in Touch' },
      },
      seo: {
        title: { tr: 'İletişim — TAKU', en: 'Contact — TAKU' },
        description: { tr: 'TAKU ile iletişime geçin. Sorularınız için buradayız.', en: 'Get in touch with TAKU. We\'re here for your questions.' },
        robots: 'index,follow',
      },
    },
    {
      template: 'legal', status: 'published', publishedAt: new Date(),
      slug: { tr: 'kvkk', en: 'privacy' },
      title: { tr: 'KVKK & Gizlilik Politikası', en: 'Privacy Policy' },
      content: {
        body: {
          tr: '<h2>Kişisel Verilerin Korunması</h2><p>TAKU olarak kişisel verilerinizin güvenliğine büyük önem veriyoruz. 6698 sayılı KVKK kapsamında verilerinizi yalnızca hizmet sunumu amacıyla işlemekte ve üçüncü taraflarla paylaşmamaktayız.</p><h2>Toplanan Veriler</h2><p>İletişim formu üzerinden ad, e-posta ve mesaj bilgilerinizi; WhatsApp üzerinden iletişim amacıyla telefon numaranızı işliyoruz.</p><h2>Haklarınız</h2><p>Verilerinize erişim, düzeltme veya silme talebiniz için info@takustudio.com adresine yazabilirsiniz.</p>',
          en: '<h2>Personal Data Protection</h2><p>At TAKU, we place great importance on the security of your personal data. Under Law No. 6698, we process your data solely for service delivery purposes and do not share it with third parties.</p><h2>Data Collected</h2><p>Via the contact form: name, email and message. Via WhatsApp: phone number for communication purposes.</p><h2>Your Rights</h2><p>To access, correct or delete your data, please write to info@takustudio.com.</p>',
        },
      },
      seo: {
        title: { tr: 'KVKK & Gizlilik — TAKU', en: 'Privacy Policy — TAKU' },
        description: { tr: 'Kişisel verilerin korunması ve gizlilik politikası.', en: 'Personal data protection and privacy policy.' },
        robots: 'noindex,follow',
      },
    },
  ];
  await Page.insertMany(pages.map((p) => ({ ...p, tenantId: tid })));
  console.log(`✅ ${pages.length} sayfa eklendi`);

  // Navigasyon menüleri
  await NavigationMenu.insertMany([
    {
      tenantId: tid, name: 'main-nav', language: 'tr',
      items: [
        { label: 'KOLEKSİYONLAR', url: '/koleksiyonlar', target: '_self', order: 1 },
        { label: 'HAKKIMIZDA',    url: '/hakkimizda',    target: '_self', order: 2 },
        { label: 'BLOG',          url: '/blog',           target: '_self', order: 3 },
        { label: 'İLETİŞİM',     url: '/iletisim',       target: '_self', order: 4 },
      ],
    },
    {
      tenantId: tid, name: 'main-nav', language: 'en',
      items: [
        { label: 'COLLECTIONS', url: '/koleksiyonlar', target: '_self', order: 1 },
        { label: 'ABOUT',       url: '/hakkimizda',    target: '_self', order: 2 },
        { label: 'BLOG',        url: '/blog',           target: '_self', order: 3 },
        { label: 'CONTACT',     url: '/iletisim',       target: '_self', order: 4 },
      ],
    },
  ]);
  console.log('✅ Navigasyon menüleri eklendi (TR + EN)');

  // SEO
  await SeoSettings.create({
    tenantId: tid,
    siteName: { tr: 'TAKU', en: 'TAKU' },
    defaultMetaTitle: { tr: 'TAKU — Sadeliğin Gücü', en: 'TAKU — The Power of Simplicity' },
    defaultMetaDescription: { tr: 'Minimal giyim, maksimal etki. TAKU koleksiyonlarını keşfedin.', en: 'Minimal clothing, maximal impact. Discover TAKU collections.' },
    defaultOgImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    robotsTxt: 'User-agent: *\nAllow: /',
  });
  console.log('✅ SEO ayarları eklendi');

  // Kullanıcı
  const adminRole = await Role.findOne({ name: 'company_admin' });
  if (adminRole) {
    const bcrypt = require('bcryptjs');
    await User.create({
      email: 'admin@takustudio.com',
      passwordHash: await bcrypt.hash('Taku2024!', 12),
      name: 'TAKU Admin',
      isActive: true,
      companyRoles: [{ tenantId: tid, roleId: adminRole._id }],
    });
    console.log('✅ Kullanıcı: admin@takustudio.com / Taku2024!');
  } else {
    console.warn('⚠️  Admin rolü bulunamadı — kullanıcı oluşturulamadı');
  }

  console.log(`\n🎉 TAKU seed tamamlandı!`);
  console.log(`   Slug: taku`);
  console.log(`   API : http://localhost:5001/api/public/taku/company\n`);
  await mongoose.disconnect();
}

seed().catch((e) => { console.error(e); process.exit(1); });
