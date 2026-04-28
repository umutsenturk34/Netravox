import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Sayfalar', to: '/pages' },
  { label: 'Medya', to: '/media' },
  { label: 'Navigasyon', to: '/menus' },
  { label: 'Restoran Menüsü', to: '/restaurant/menu' },
  { label: 'Diş Hekimi Hizmetleri', to: '/dental/services' },
  { label: 'Emlak İlanları', to: '/real-estate/properties' },
  { label: 'Rezervasyonlar', to: '/reservations' },
  { label: 'Form Gönderileri', to: '/forms' },
  { label: 'Bildirimler', to: '/notifications' },
  { label: 'SEO', to: '/seo' },
  { label: 'Redirect', to: '/redirects' },
  { label: 'Diller', to: '/languages' },
  { label: 'Kullanıcılar', to: '/users' },
  { label: 'Roller', to: '/roles' },
  { label: 'Firma Ayarları', to: '/settings' },
];

const adminItems = [
  { label: 'Firmalar', to: '/companies' },
];

const linkCls = ({ isActive }) =>
  `flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
    isActive
      ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400 font-medium'
      : 'hover:bg-[var(--bg-muted)]'
  }`;

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside
      className="w-56 shrink-0 border-r flex flex-col"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
    >
      <div
        className="h-14 flex items-center px-5 border-b font-semibold text-base"
        style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
      >
        CMS Panel
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/pages'}
            className={linkCls}
            style={{ color: 'var(--text-primary)' }}
          >
            {item.label}
          </NavLink>
        ))}

        {user?.isSuperAdmin && (
          <>
            <div className="pt-4 pb-1 px-3 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Sistem
            </div>
            {adminItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkCls}
                style={{ color: 'var(--text-primary)' }}
              >
                {item.label}
              </NavLink>
            ))}
          </>
        )}
      </nav>
    </aside>
  );
}
