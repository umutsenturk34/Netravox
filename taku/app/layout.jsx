import './globals.css';
import { Inter } from 'next/font/google';
import { getCompany, getNavigation } from '../lib/api';
import LangWrapper from '../components/LangWrapper';

const inter = Inter({ subsets: ['latin', 'latin-ext'], display: 'swap' });

export async function generateMetadata() {
  const company = await getCompany();
  return {
    title: { default: company?.name || 'TAKU', template: `%s | ${company?.name || 'TAKU'}` },
    description: company?.description?.tr || 'Minimal giyim, maksimal etki.',
    openGraph: { siteName: company?.name || 'TAKU' },
  };
}

export default async function RootLayout({ children }) {
  const [company, nav] = await Promise.all([getCompany(), getNavigation()]);

  // Branding renklerini CSS variable olarak enjekte et
  const primary   = company?.branding?.primaryColor   || '#0A0A0A';
  const secondary = company?.branding?.secondaryColor || '#F5F4F0';
  const accent    = company?.branding?.accentColor    || '#C8A882';

  return (
    <html lang="tr" className={inter.className}>
      <head>
        <style>{`
          :root {
            --color-primary: ${primary};
            --color-secondary: ${secondary};
            --color-accent: ${accent};
          }
          body { background: ${secondary}; color: ${primary}; }
        `}</style>
      </head>
      <body>
        <LangWrapper company={company} nav={nav}>
          {children}
        </LangWrapper>
      </body>
    </html>
  );
}
