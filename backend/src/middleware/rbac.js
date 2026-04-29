const Role = require('../models/Role');

const ROLE_PERMISSIONS = {
  super_admin: ['*'],
  agency_admin: [
    'companies.read', 'companies.update',
    'users.read', 'users.create', 'users.update', 'users.delete',
    'roles.*', 'pages.*', 'media.*', 'menus.*', 'seo.*', 'redirects.*',
    'restaurant.*', 'reservations.*', 'forms.*',
    'services.*', 'properties.*',
    'blog.*', 'faqs.*',
    'settings.*', 'languages.*',
  ],
  company_admin: [
    'companies.read', 'companies.update',
    'users.read', 'users.create', 'users.update',
    'roles.*', 'pages.*', 'media.*', 'menus.*', 'seo.*', 'redirects.*',
    'restaurant.*', 'reservations.*', 'forms.*',
    'services.*', 'properties.*',
    'blog.*', 'faqs.*',
    'settings.read', 'settings.update', 'languages.*',
  ],
  seo_specialist: [
    'pages.read', 'seo.*', 'redirects.*', 'media.read',
    'services.read', 'properties.read',
    'blog.read', 'faqs.read',
  ],
  content_editor: [
    'pages.read', 'pages.create', 'pages.update', 'pages.publish',
    'media.read', 'media.upload', 'menus.read', 'menus.update',
    'restaurant.read', 'restaurant.create', 'restaurant.update',
    'services.read', 'services.create', 'services.update',
    'properties.read', 'properties.create', 'properties.update',
    'blog.*', 'faqs.*',
  ],
  media_manager: ['media.*'],
  reservation_manager: ['reservations.*', 'forms.*'],
  viewer: [
    'pages.read', 'media.read', 'menus.read',
    'restaurant.read', 'reservations.read', 'forms.read', 'seo.read',
    'services.read', 'properties.read',
    'blog.read', 'faqs.read',
  ],
};

const matchPermission = (perms, permission) => {
  if (!perms?.length) return false;
  if (perms.includes('*')) return true;
  const [resource] = permission.split('.');
  return perms.includes(permission) || perms.includes(`${resource}.*`);
};

const requirePermission = (permission) => async (req, res, next) => {
  const user = req.user;

  if (user.isSuperAdmin) {
    req.userRole = 'super_admin';
    return next();
  }

  const entry = user.companyRoles?.find(
    (cr) => cr.tenantId?.toString() === req.tenantId?.toString()
  );
  if (!entry?.roleId) {
    return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
  }

  // Rolü DB'den yükle — hem sistem hem özel roller için
  const role = await Role.findById(entry.roleId).select('name permissions isSystem');
  if (!role) return res.status(403).json({ message: 'Rol bulunamadı' });

  req.userRole = role.name;

  // Sistem rolü → hardcoded map kullan; özel rol → DB permissions kullan
  const perms = ROLE_PERMISSIONS[role.name] ?? role.permissions ?? [];
  if (!matchPermission(perms, permission)) {
    return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
  }

  next();
};

module.exports = { requirePermission, ROLE_PERMISSIONS };
