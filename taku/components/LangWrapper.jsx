'use client';

import { LangProvider } from '../lib/lang';
import Header from './layout/Header';
import Footer from './layout/Footer';
import WhatsAppFloat from './layout/WhatsAppFloat';

export default function LangWrapper({ company, nav, children }) {
  return (
    <LangProvider>
      <Header company={company} nav={nav} />
      <main>{children}</main>
      <Footer company={company} />
      {company?.features?.whatsapp && <WhatsAppFloat company={company} />}
    </LangProvider>
  );
}
