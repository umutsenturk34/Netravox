import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCompany } from '../../hooks/useCompany';

const navLinks = [
  { to: '/', label: 'Ana Sayfa' },
  { to: '/hizmetler', label: 'Hizmetler' },
  { to: '/hakkimizda', label: 'Hakkımızda' },
  { to: '/galeri', label: 'Galeri' },
  { to: '/iletisim', label: 'İletişim' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { company } = useCompany();
  const name = company?.name || 'DentCare İstanbul';
  const logo = company?.branding?.logoLight;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E0F2FE] shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          {logo ? (
            <img src={logo} alt={name} className="h-9 object-contain" />
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0E7490] flex items-center justify-center">
                <span className="text-white text-sm font-bold">D</span>
              </div>
              <span className="text-[#0E7490] text-lg font-bold tracking-tight">{name}</span>
            </div>
          )}
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-[#0E7490]' : 'text-[#334155] hover:text-[#0E7490]'}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <button onClick={() => navigate('/randevu')}
            className="bg-[#0E7490] hover:bg-[#155E75] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
            Randevu Al
          </button>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <div className="w-5 space-y-1.5">
            <span className={`block h-0.5 bg-[#334155] transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-[#334155] transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-[#334155] transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-[#E0F2FE] px-6 py-4 space-y-4">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block text-sm font-medium text-[#334155] hover:text-[#0E7490]">
              {l.label}
            </Link>
          ))}
          <button onClick={() => { navigate('/randevu'); setOpen(false); }}
            className="w-full bg-[#0E7490] text-white text-sm font-semibold px-5 py-2.5 rounded-lg">
            Randevu Al
          </button>
        </div>
      )}
    </header>
  );
}
