const Company = require('../models/Company');

// Her request'te tenantId'yi doğrular ve req.tenant'a atar.
// super_admin tüm firmalara erişebilir; diğerleri yalnızca atandıkları firmalara.
const resolveTenant = async (req, res, next) => {
  const tenantId = req.headers['x-tenant-id'] || req.query.tenantId;

  if (!tenantId) {
    return res.status(400).json({ message: 'x-tenant-id header gerekli' });
  }

  const company = await Company.findById(tenantId);
  if (!company || !company.isActive) {
    return res.status(404).json({ message: 'Firma bulunamadı' });
  }

  if (!req.user.isSuperAdmin) {
    const hasAccess = req.user.companyRoles.some(
      (cr) => cr.tenantId.toString() === tenantId
    );
    if (!hasAccess) {
      return res.status(403).json({ message: 'Bu firmaya erişim yetkiniz yok' });
    }
  }

  req.tenantId = tenantId;
  req.tenant = company;
  next();
};

module.exports = { resolveTenant };
