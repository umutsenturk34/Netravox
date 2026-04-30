'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLang } from '../../lib/lang';

const FALLBACK_NAV = {
  tr: [
    { url: '/koleksiyonlar', label: 'KOLEKSİYONLAR' },
    { url: '/hakkimizda',    label: 'HAKKIMIZDA' },
    { url: '/blog',          label: 'BLOG' },
    { url: '/iletisim',      label: 'İLETİŞİM' },
  ],
  en: [
    { url: '/koleksiyonlar', label: 'COLLECTIONS' },
    { url: '/hakkimizda',    label: 'ABOUT' },
    { url: '/blog',          label: 'BLOG' },
    { url: '/iletisim',      label: 'CONTACT' },
  ],
};

export default function Header({ company, nav }) {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname                = usePathname();
  const isHome                  = pathname === '/';
  const { lang, setLang }       = useLang();

  const logo    = company?.branding?.logoLight;
  const name    = company?.name || 'TAKU';
  const navData = nav || FALLBACK_NAV;
  const navItems = navData[lang] || navData['tr'] || FALLBACK_NAV.tr;

  const transparent = isHome && !scrolled && !open;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: transparent ? 'transparent' : 'rgba(10,10,10,0.95)', backdropFilter: transparent ? 'none' : 'blur(12px)' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          {logo ? (
            <Image src={logo} alt={name} width={120} height={40} className="h-8 w-auto object-contain" />
          ) : (
            <span className="text-white text-lg font-black tracking-[0.25em] uppercase">{name}</span>
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className="text-[11px] font-semibold tracking-[0.15em] transition-colors"
              style={{ color: pathname === item.url ? 'var(--color-accent)' : 'rgba(255,255,255,0.8)' }}
            >
              {item.label}
            </Link>
          ))}

          {/* TR / EN switcher */}
          <div className="flex items-center gap-1 pl-4 border-l border-white/20">
            <button
              onClick={() => setLang('tr')}
              className="text-[10px] font-bold tracking-wider transition-colors"
              style={{ color: lang === 'tr' ? 'var(--color-accent)' : 'rgba(255,255,255,0.35)' }}
            >TR</button>
            <span className="text-white/20 text-[10px] select-none">|</span>
            <button
              onClick={() => setLang('en')}
              className="text-[10px] font-bold tracking-wider transition-colors"
              style={{ color: lang === 'en' ? 'var(--color-accent)' : 'rgba(255,255,255,0.35)' }}
            >EN</button>
          </div>
        </nav>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setOpen((p) => !p)}
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
        <nav className="md:hidden border-t border-white/10 px-6 py-6 space-y-5" style={{ background: 'rgba(10,10,10,0.98)' }}>
          {navItems.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className="block text-sm font-semibold tracking-[0.1em] text-white/80 hover:text-white uppercase"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <button
              onClick={() => setLang('tr')}
              className="text-xs font-bold tracking-wider"
              style={{ color: lang === 'tr' ? 'var(--color-accent)' : 'rgba(255,255,255,0.35)' }}
            >TR</button>
            <span className="text-white/20">|</span>
            <button
              onClick={() => setLang('en')}
              className="text-xs font-bold tracking-wider"
              style={{ color: lang === 'en' ? 'var(--color-accent)' : 'rgba(255,255,255,0.35)' }}
            >EN</button>
          </div>
        </nav>
      )}
    </header>
  );
}
