'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang, t } from '../../lib/lang';

export default function HakkimizdaClient({ company, page }) {
  const { lang } = useLang();
  const pc = page?.content || {};

  const name         = company?.name || 'TAKU';
  const heroImg      = pc.imageUrl || company?.content?.aboutHeroImage || 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&q=80';
  const missionRaw   = t(pc.missionTitle, lang) || (lang === 'en' ? 'Minimal Design.\nMaximum Impact.' : 'Minimal Tasarım.\nMaksimal Etki.');
  const missionLines = missionRaw.split('\n');
  const bodyHtml     = t(pc.body, lang) || '';
  const values       = company?.content?.values || [];
  const stats        = pc.stats || [
    { value: '2023', label: { tr: 'Kuruluş Yılı',  en: 'Founded' } },
    { value: '10K+', label: { tr: 'Mutlu Müşteri', en: 'Happy Customers' } },
    { value: '100%', label: { tr: 'Yerli Üretim',  en: 'Made in Turkey' } },
  ];

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: '60vh', minHeight: '400px' }}>
        <Image src={heroImg} alt={name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.6)' }} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-6">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{lang === 'en' ? 'Who We Are' : 'Biz Kimiz'}</p>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">{lang === 'en' ? 'About Us' : 'Hakkımızda'}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#0A0A0A] mb-6 uppercase tracking-tight">
            {missionLines.map((line, i) => <span key={i} className="block">{line}</span>)}
          </h2>
          <div className="w-12 h-px mx-auto" style={{ background: 'var(--color-accent)' }} />
        </div>

        {bodyHtml ? (
          <div
            className="prose prose-sm max-w-none text-[#3A3A3A] leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        ) : (
          <div className="space-y-8 text-[#3A3A3A] leading-relaxed text-base">
            {t(company?.description, lang) && <p>{t(company?.description, lang)}</p>}
            {t(company?.content?.aboutParagraph2, lang) && <p>{t(company?.content?.aboutParagraph2, lang)}</p>}
            {t(company?.content?.aboutParagraph3, lang) && <p>{t(company?.content?.aboutParagraph3, lang)}</p>}
          </div>
        )}

        {values.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: 'var(--color-accent)' }}>{lang === 'en' ? 'Our Principles' : 'İlkelerimiz'}</p>
              <h3 className="text-2xl font-black uppercase tracking-tight">{lang === 'en' ? 'Values That Define Us' : 'Bizi Biz Yapan Değerler'}</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              {values.map((v, i) => (
                <div key={i} className="flex gap-5">
                  <div className="text-2xl flex-shrink-0 mt-1">{v.icon}</div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-[0.1em] mb-2">{t(v.title, lang)}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#6B6B6B' }}>{t(v.description, lang)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-20 grid grid-cols-3 gap-8 text-center border-t border-[#E5E5E3] pt-14">
          {stats.map((s) => (
            <div key={s.value}>
              <div className="text-3xl md:text-4xl font-black text-[#0A0A0A] mb-2">{s.value}</div>
              <div className="text-[10px] tracking-[0.15em] uppercase font-semibold" style={{ color: '#6B6B6B' }}>
                {t(s.label, lang)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dark CTA */}
      <div className="bg-[#0A0A0A] text-white text-center py-20 px-6">
        <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{lang === 'en' ? 'Ready to shop?' : 'Tanıştık mı?'}</p>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6">
          {lang === 'en' ? 'Ready to Discover the Collection?' : 'Koleksiyonu Keşfetmeye Hazır mısın?'}
        </h2>
        <Link href="/koleksiyonlar" className="inline-block bg-white text-[#0A0A0A] text-xs font-bold tracking-[0.15em] uppercase px-10 py-4 hover:bg-[#C8A882] transition-colors">
          {lang === 'en' ? 'View Products' : 'Ürünleri Gör'}
        </Link>
      </div>
    </>
  );
}
