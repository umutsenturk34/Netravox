import { createContext, useContext, useState } from 'react';

const LangContext = createContext({ lang: 'tr', setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem('vault_lang') || 'tr'
  );

  const switchLang = (l) => {
    setLang(l);
    localStorage.setItem('vault_lang', l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang: switchLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

// Helper: {tr, en} objesinden aktif dil string'ini döner
export const t = (obj, lang = 'tr') => {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj['tr'] || obj['en'] || '';
};
