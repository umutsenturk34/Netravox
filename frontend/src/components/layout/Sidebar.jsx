import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, FileText, Image, Menu, UtensilsCrossed,
  HeartPulse, Building2, Calendar, Mail, Bell, Search,
  ArrowRightLeft, Globe, Users, ShieldCheck, Settings, Building,
  BookOpen, HelpCircle,
} from 'lucide-react';

// sectors: hangi sektörler bu menü öğesini görür. Yoksa herkese göster.
const navItems = [
  { label: 'Dashboard',              to: '/dashboard',              icon: LayoutDashboard },
  { label: 'Sayfalar',               to: '/pages',                  icon: FileText },
  { label: 'Medya',                  to: '/media',                  icon: Image },
  { label: 'Navigasyon',             to: '/menus',                  icon: Menu },
  { label: 'Restoran Menüsü',        to: '/restaurant/menu',        icon: UtensilsCrossed,  sectors: ['restaurant'] },
  { label: 'Diş Hekimi Hizmetleri', to: '/dental/services',        icon: HeartPulse,        sectors: ['dental'] },
  { label: 'Emlak İlanları',         to: '/real-estate/properties', icon: Building2,         sectors: ['real_estate'] },
  { label: 'Rezervasyonlar',         to: '/reservations',           icon: Calendar,          sectors: ['restaurant', 'dental', 'beauty', 'hotel', 'service'] },
  { label: 'Form Gönderileri',       to: '/forms',                  icon: Mail },
  { label: 'Bildirimler',            to: '/notifications',          icon: Bell },
  { label: 'Blog Yazıları',          to: '/blog',                   icon: BookOpen },
  { label: 'SSS Yönetimi',          to: '/faqs',                   icon: HelpCircle },
  { label: 'SEO',                    to: '/seo',                    icon: Search },
  { label: 'Redirect',               to: '/redirects',              icon: ArrowRightLeft },
  { label: 'Diller',                 to: '/languages',              icon: Globe },
  { label: 'Kullanıcılar',           to: '/users',                  icon: Users },
  { label: 'Roller',                 to: '/roles',                  icon: ShieldCheck },
  { label: 'Firma Ayarları',         to: '/settings',               icon: Settings },
];

const adminItems = [
  { label: 'Firmalar', to: '/companies', icon: Building },
];

export default function Sidebar() {
  const { user, activeCompany, companyLoading } = useAuth();

  const visibleItems = navItems.filter((item) => {
    if (!item.sectors) return true;
    if (user?.isSuperAdmin) return true;
    if (companyLoading || !activeCompany) return false;
    return item.sectors.includes(activeCompany.sector);
  });

  return (
    <aside
      className="w-58 shrink-0 border-r flex flex-col"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', width: '232px' }}
    >
      {/* Marka alanı */}
      <div
        className="h-14 flex items-center px-5 border-b gap-2.5"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-bold">N</span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Netravox
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400 leading-none">
            CMS
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-0.5">
        {visibleItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/pages'}
            className={({ isActive }) =>
              `group flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 font-medium'
                  : 'hover:bg-[var(--bg-muted)]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={15}
                  className="shrink-0 transition-colors"
                  style={{ color: isActive ? '#6366f1' : 'var(--text-muted)' }}
                />
                <span style={{ color: isActive ? '#6366f1' : 'var(--text-secondary)' }}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}

        {user?.isSuperAdmin && (
          <>
            <div className="pt-5 pb-1.5 px-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                Sistem
              </span>
            </div>
            {adminItems.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `group flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 font-medium'
                      : 'hover:bg-[var(--bg-muted)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={15}
                      className="shrink-0"
                      style={{ color: isActive ? '#6366f1' : 'var(--text-muted)' }}
                    />
                    <span style={{ color: isActive ? '#6366f1' : 'var(--text-secondary)' }}>
                      {label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </>
        )}
      </nav>

      {/* Alt bilgi */}
      <div className="px-4 py-3 border-t" style={{ borderColor: 'var(--border)' }}>
        <p className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>
          v1.0 · Netravox CMS
        </p>
      </div>
    </aside>
  );
}
