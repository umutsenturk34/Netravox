import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, FileText, Image, Menu, UtensilsCrossed,
  HeartPulse, Building2, Calendar, Mail, Bell, Search,
  ArrowRightLeft, Globe, Users, ShieldCheck, Settings, Building,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard',             to: '/dashboard',              icon: LayoutDashboard },
  { label: 'Sayfalar',              to: '/pages',                  icon: FileText },
  { label: 'Medya',                 to: '/media',                  icon: Image },
  { label: 'Navigasyon',            to: '/menus',                  icon: Menu },
  { label: 'Restoran Menüsü',       to: '/restaurant/menu',        icon: UtensilsCrossed },
  { label: 'Diş Hekimi Hizmetleri', to: '/dental/services',        icon: HeartPulse },
  { label: 'Emlak İlanları',        to: '/real-estate/properties', icon: Building2 },
  { label: 'Rezervasyonlar',        to: '/reservations',           icon: Calendar },
  { label: 'Form Gönderileri',      to: '/forms',                  icon: Mail },
  { label: 'Bildirimler',           to: '/notifications',          icon: Bell },
  { label: 'SEO',                   to: '/seo',                    icon: Search },
  { label: 'Redirect',              to: '/redirects',              icon: ArrowRightLeft },
  { label: 'Diller',                to: '/languages',              icon: Globe },
  { label: 'Kullanıcılar',          to: '/users',                  icon: Users },
  { label: 'Roller',                to: '/roles',                  icon: ShieldCheck },
  { label: 'Firma Ayarları',        to: '/settings',               icon: Settings },
];

const adminItems = [
  { label: 'Firmalar', to: '/companies', icon: Building },
];

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside
      className="w-56 shrink-0 border-r flex flex-col"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
    >
      {/* Logo */}
      <div
        className="h-14 flex items-center px-5 border-b"
        style={{ borderColor: 'var(--border)' }}
      >
        <span className="text-base font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Netravox
        </span>
        <span className="ml-1 text-xs px-1.5 py-0.5 rounded font-medium bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
          CMS
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/pages'}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-medium'
                  : 'hover:bg-[var(--bg-muted)]'
              }`
            }
            style={{ color: 'var(--text-secondary)' }}
          >
            <Icon size={15} className="shrink-0" />
            {label}
          </NavLink>
        ))}

        {user?.isSuperAdmin && (
          <>
            <div className="pt-4 pb-1 px-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Sistem
            </div>
            {adminItems.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-medium'
                      : 'hover:bg-[var(--bg-muted)]'
                  }`
                }
                style={{ color: 'var(--text-secondary)' }}
              >
                <Icon size={15} className="shrink-0" />
                {label}
              </NavLink>
            ))}
          </>
        )}
      </nav>
    </aside>
  );
}
