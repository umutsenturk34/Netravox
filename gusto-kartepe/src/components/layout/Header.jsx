import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCompany } from '../../hooks/useCompany';

const navLinks = [
  { to: '/', label: 'Ana Sayfa' },
  { to: '/hakkimizda', label: 'Hakkımızda' },
  { to: '/menu', label: 'Menü' },
  { to: '/galeri', label: 'Galeri' },
  { to: '/iletisim', label: 'İletişim' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { company } = useCompany();

  const logo = company?.branding?.logoLight;
  const name = company?.name || 'Gusto Kartepe';

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E8E4E0]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {logo ? (
            <img src={logo} alt={name} className="h-9 object-contain" />
          ) : (
            <span className="text-[#8B1A1A] text-xl font-bold tracking-widest uppercase" style={{ fontFamily: 'var(--font-serif)' }}>
              {name}
            </span>
          )}
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-[#8B1A1A]' : 'text-[#1A1A1A] hover:text-[#8B1A1A]'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <button
            onClick={() => navigate('/rezervasyon')}
            className="bg-[#8B1A1A] hover:bg-[#6B1117] text-white text-sm font-medium px-5 py-2.5 rounded transition-colors"
          >
            Rezervasyon Yap
          </button>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <div className="w-5 space-y-1.5">
            <span className={`block h-0.5 bg-[#1A1A1A] transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-[#1A1A1A] transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-[#1A1A1A] transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-[#E8E4E0] px-6 py-4 space-y-4">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block text-sm font-medium text-[#1A1A1A] hover:text-[#8B1A1A]">
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => { navigate('/rezervasyon'); setOpen(false); }}
            className="w-full bg-[#8B1A1A] text-white text-sm font-medium px-5 py-2.5 rounded"
          >
            Rezervasyon Yap
          </button>
        </div>
      )}
    </header>
  );
}
