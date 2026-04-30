'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LangContext = createContext({ lang: 'tr', setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLang] = useState('tr');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('taku_lang');
      if (stored === 'en' || stored === 'tr') setLang(stored);
    } catch {}
  }, []);

  const switchLang = (l) => {
    setLang(l);
    try { localStorage.setItem('taku_lang', l); } catch {}
  };

  return (
    <LangContext.Provider value={{ lang, setLang: switchLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

export const t = (obj, lang = 'tr') => {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj['tr'] || obj['en'] || '';
};
