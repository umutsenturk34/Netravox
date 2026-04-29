require('dotenv').config();
const { connect } = require('./config/database');
const User = require('./models/User');
const Company = require('./models/Company');
const Role = require('./models/Role');

const ROLES = [
  { name: 'super_admin',        label: { tr: 'Süper Admin',        en: 'Super Admin' },        isSystem: true },
  { name: 'agency_admin',       label: { tr: 'Ajans Yöneticisi',   en: 'Agency Admin' },       isSystem: true },
  { name: 'company_admin',      label: { tr: 'Firma Yöneticisi',   en: 'Company Admin' },      isSystem: true },
  { name: 'seo_specialist',     label: { tr: 'SEO Uzmanı',         en: 'SEO Specialist' },     isSystem: true },
  { name: 'content_editor',     label: { tr: 'İçerik Editörü',     en: 'Content Editor' },     isSystem: true },
  { name: 'media_manager',      label: { tr: 'Medya Yöneticisi',   en: 'Media Manager' },      isSystem: true },
  { name: 'reservation_manager',label: { tr: 'Rezervasyon Yöneticisi', en: 'Reservation Manager' }, isSystem: true },
  { name: 'viewer',             label: { tr: 'İzleyici',           en: 'Viewer' },             isSystem: true },
];

const seed = async () => {
  await connect();
  console.log('Seed başladı...');

  // Sistem rollerini oluştur (varsa güncelle)
  for (const role of ROLES) {
    await Role.findOneAndUpdate(
      { name: role.name, tenantId: null },
      { ...role, tenantId: null },
      { upsert: true, new: true }
    );
  }
  console.log('✓ 8 sistem rolü oluşturuldu');

  // İlk firma: Gusto Kartepe
  let company = await Company.findOne({ slug: 'gusto-kartepe' });
  if (!company) {
    company = await Company.create({
      name: 'Gusto Kartepe',
      slug: 'gusto-kartepe',
      sector: 'restaurant',
      settings: { defaultLanguage: 'tr', supportedLanguages: ['tr', 'en'] },
    });
    console.log('✓ Gusto Kartepe firması oluşturuldu');
  } else {
    console.log('→ Gusto Kartepe zaten mevcut');
  }

  // Super admin kullanıcısı
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@cmsPanel.com';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin1234!';

  const exists = await User.findOne({ email: adminEmail });
  if (!exists) {
    const passwordHash = await User.hashPassword(adminPassword);
    await User.create({
      name: 'Admin',
      email: adminEmail,
      passwordHash,
      isSuperAdmin: true,
      companyRoles: [],
    });
    console.log(`✓ Super admin oluşturuldu: ${adminEmail} / ${adminPassword}`);
    console.log('  ⚠ Şifreyi giriş sonrası değiştir!');
  } else {
    console.log(`→ Admin kullanıcısı zaten mevcut: ${adminEmail}`);
  }

  // Netravox firması (pazarlama sitesi için)
  let netravoxCompany = await Company.findOne({ slug: 'netravox' });
  if (!netravoxCompany) {
    netravoxCompany = await Company.create({
      name: 'Netravox',
      slug: 'netravox',
      sector: 'other',
      settings: { defaultLanguage: 'tr', supportedLanguages: ['tr', 'en'] },
    });
    console.log('✓ Netravox firması oluşturuldu');
  } else {
    console.log('→ Netravox firması zaten mevcut');
  }

  // Netravox company admin kullanıcısı
  const netravoxEmail = 'netravox@netravox.com';
  const netravoxPassword = 'Netravox2024!';
  const companyAdminRole = await Role.findOne({ name: 'company_admin', tenantId: null });

  const netravoxUserExists = await User.findOne({ email: netravoxEmail });
  if (!netravoxUserExists) {
    const passwordHash = await User.hashPassword(netravoxPassword);
    await User.create({
      name: 'Netravox Admin',
      email: netravoxEmail,
      passwordHash,
      isSuperAdmin: false,
      companyRoles: companyAdminRole
        ? [{ tenantId: netravoxCompany._id, roleId: companyAdminRole._id }]
        : [],
    });
    console.log(`✓ Netravox kullanıcısı oluşturuldu: ${netravoxEmail} / ${netravoxPassword}`);
    console.log('  ⚠ Şifreyi giriş sonrası değiştir!');
  } else {
    console.log(`→ Netravox kullanıcısı zaten mevcut: ${netravoxEmail}`);
  }

  console.log('\nSeed tamamlandı.');
  process.exit(0);
};

seed().catch((err) => { console.error(err); process.exit(1); });
