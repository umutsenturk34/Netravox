import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCompany } from '../../hooks/useCompany';

const navLinks = [
  { to: '/', label: 'Ana Sayfa' },
  { to: '/ilanlar', label: 'İlanlar' },
  { to: '/hakkimizda', label: 'Hakkımızda' },
  { to: '/iletisim', label: 'İletişim' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { company } = useCompany();
  const name = company?.name || 'Prime Gayrimenkul';
  const logo = company?.branding?.logoLight;

  return (
    <header className="sticky top-0 z-50 bg-[#0F172A] border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          {logo ? (
            <img src={logo} alt={name} className="h-9 object-contain" />
          ) : (
            <span className="text-white text-lg font-semibold tracking-wide" style={{ fontFamily: 'var(--font-serif)' }}>
              <span className="text-[#C9A96E]">Prime</span> {name.replace('Prime', '').trim()}
            </span>
          )}
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-[#C9A96E]' : 'text-white/70 hover:text-white'}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/iletisim" className="hidden md:block border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0F172A] text-sm font-semibold px-5 py-2 rounded transition-colors">
          İletişime Geç
        </Link>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <div className="w-5 space-y-1.5">
            <span className={`block h-0.5 bg-white transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-white transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0F172A] border-t border-white/10 px-6 py-4 space-y-4">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block text-sm font-medium text-white/70 hover:text-white">{l.label}</Link>
          ))}
          <Link to="/iletisim" onClick={() => setOpen(false)} className="block text-sm font-semibold text-[#C9A96E]">İletişime Geç</Link>
        </div>
      )}
    </header>
  );
}
