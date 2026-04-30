import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCompany } from '../../hooks/useCompany';
import { useLang } from '../../hooks/useLang';

const NAV = {
  tr: [
    { to: '/koleksiyonlar', label: 'KOLEKSİYONLAR' },
    { to: '/hakkimizda',    label: 'HAKKIMIZDA' },
    { to: '/blog',          label: 'BLOG' },
    { to: '/iletisim',      label: 'İLETİŞİM' },
  ],
  en: [
    { to: '/koleksiyonlar', label: 'COLLECTIONS' },
    { to: '/hakkimizda',    label: 'ABOUT' },
    { to: '/blog',          label: 'BLOG' },
    { to: '/iletisim',      label: 'CONTACT' },
  ],
};

export default function Header() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { company } = useCompany();
  const { lang, setLang } = useLang();
  const { pathname } = useLocation();

  const navLinks = NAV[lang] || NAV.tr;
  const logo = company?.branding?.logoDark;
  const name = company?.name || 'VAULT';

  // Transparent header only on homepage (full-screen hero covers it)
  const isHome = pathname === '/';
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent ? 'bg-transparent' : 'bg-[#0A0A0A]/95 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          {logo ? (
            <img src={logo} alt={name} className="h-8 object-contain" />
          ) : (
            <span
              className="text-white text-lg font-black tracking-[0.25em] uppercase"
              style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.25em' }}
            >
              {name}
            </span>
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-[11px] font-semibold tracking-[0.15em] transition-colors ${
                  isActive ? 'text-[#C8A882]' : 'text-white/80 hover:text-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Lang toggle */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center border border-white/20 overflow-hidden">
            {['tr','en'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1.5 text-[10px] font-bold tracking-widest uppercase transition-colors ${
                  lang === l ? 'bg-white text-[#0A0A0A]' : 'text-white/60 hover:text-white'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setOpen(!open)}
          aria-label="Menü"
        >
          <div className="w-6 space-y-1.5">
            <span className={`block h-px bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-px bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-white/10 px-6 py-6 space-y-5">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block text-sm font-semibold tracking-[0.1em] text-white/80 hover:text-white uppercase"
            >
              {l.label}
            </Link>
          ))}
          {/* Mobile lang toggle */}
          <div className="flex items-center gap-1 pt-2 border-t border-white/10">
            {['tr','en'].map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); setOpen(false); }}
                className={`px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase transition-colors border border-white/20 ${
                  lang === l ? 'bg-white text-[#0A0A0A]' : 'text-white/60'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
