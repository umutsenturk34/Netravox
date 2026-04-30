/**
 * Mevcut admin@takustudio.com kullanıcısının companyRoles alanını düzeltir.
 * cd backend && node fix-taku-user.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Company  = require('./src/models/Company');
const Role     = require('./src/models/Role');
const User     = require('./src/models/User');

async function fix() {
  await mongoose.connect(process.env.MONGODB_URI);

  const company = await Company.findOne({ slug: 'taku' });
  if (!company) { console.error('❌ taku şirketi bulunamadı'); process.exit(1); }

  const role = await Role.findOne({ name: 'company_admin' });
  if (!role) { console.error('❌ Admin rolü bulunamadı'); process.exit(1); }

  const result = await User.findOneAndUpdate(
    { email: 'admin@takustudio.com' },
    { $set: { companyRoles: [{ tenantId: company._id, roleId: role._id }] } },
    { new: true }
  );

  if (!result) { console.error('❌ Kullanıcı bulunamadı'); process.exit(1); }

  console.log('✅ Kullanıcı düzeltildi:');
  console.log('   email:', result.email);
  console.log('   companyRoles:', JSON.stringify(result.companyRoles));
  console.log('   tenantId (taku):', company._id.toString());
  console.log('   roleId:', role._id.toString(), '(' + role.name + ')');

  await mongoose.disconnect();
}

fix().catch((e) => { console.error(e); process.exit(1); });
