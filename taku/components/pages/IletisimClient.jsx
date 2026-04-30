'use client';

import { useLang, t } from '../../lib/lang';
import ContactForm from '../ContactForm';

export default function IletisimClient({ company, faqs, page }) {
  const { lang } = useLang();
  const pc = page?.content || {};

  const contact      = company?.contact || {};
  const hours        = company?.workingHours || [];
  const social       = company?.socialLinks || {};
  const heroTitle    = t(pc.heroTitle, lang)    || (lang === 'en' ? 'Contact'      : 'İletişim');
  const heroSubtitle = t(pc.heroSubtitle, lang) || (lang === 'en' ? 'Get in Touch' : 'Ulaşın');

  return (
    <>
      <div className="bg-[#0A0A0A] text-white pt-28 pb-14 px-6 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{heroSubtitle}</p>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">{heroTitle}</h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase mb-6" style={{ color: 'var(--color-accent)' }}>{lang === 'en' ? 'Information' : 'Bilgiler'}</p>
          <div className="space-y-8">
            {contact.phone && (
              <div>
                <p className="text-[11px] tracking-[0.15em] uppercase font-bold text-[#0A0A0A] mb-1">{lang === 'en' ? 'Phone' : 'Telefon'}</p>
                <a href={`tel:${contact.phone}`} className="text-sm text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors">{contact.phone}</a>
              </div>
            )}
            {contact.email && (
              <div>
                <p className="text-[11px] tracking-[0.15em] uppercase font-bold text-[#0A0A0A] mb-1">E-posta</p>
                <a href={`mailto:${contact.email}`} className="text-sm text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors">{contact.email}</a>
              </div>
            )}
            {contact.address && (
              <div>
                <p className="text-[11px] tracking-[0.15em] uppercase font-bold text-[#0A0A0A] mb-1">{lang === 'en' ? 'Address' : 'Adres'}</p>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{contact.address}{contact.city ? `, ${contact.city}` : ''}</p>
              </div>
            )}
            {social.instagram && (
              <div>
                <p className="text-[11px] tracking-[0.15em] uppercase font-bold text-[#0A0A0A] mb-1">Instagram</p>
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-[#6B6B6B] hover:text-[#C8A882] transition-colors">@takustudio</a>
              </div>
            )}
          </div>

          {hours.length > 0 && (
            <div className="mt-10 pt-8 border-t border-[#E5E5E3]">
              <p className="text-[11px] tracking-[0.15em] uppercase font-bold text-[#0A0A0A] mb-4">{lang === 'en' ? 'Working Hours' : 'Çalışma Saatleri'}</p>
              <div className="space-y-2">
                {hours.map((h, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-[#6B6B6B]">{h.days}</span>
                    <span className="font-medium text-[#0A0A0A]">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase mb-6" style={{ color: 'var(--color-accent)' }}>{lang === 'en' ? 'Send a Message' : 'Mesaj Gönder'}</p>
          <ContactForm />
        </div>
      </div>

      {faqs && faqs.length > 0 && (
        <section className="py-16 px-6 bg-[#F5F4F0]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: 'var(--color-accent)' }}>{lang === 'en' ? 'Frequently Asked' : 'Merak Edilenler'}</p>
              <h2 className="text-2xl font-black uppercase tracking-tight">{lang === 'en' ? 'FAQ' : 'Sık Sorulan Sorular'}</h2>
            </div>
            <div className="space-y-0 divide-y divide-[#E5E5E3]">
              {faqs.map((faq) => (
                <div key={faq._id} className="py-5">
                  <h3 className="text-sm font-bold text-[#0A0A0A] mb-2">{t(faq.question, lang)}</h3>
                  <p className="text-sm leading-relaxed text-[#6B6B6B]">{t(faq.answer, lang)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
