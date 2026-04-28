import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCompany } from '../hooks/useCompany';
import { getServices } from '../api/client';

const WHY_DEFAULTS = [
  { icon: '🏆', title: 'Uzman Kadro', desc: 'Alanında uzman diş hekimleri ve deneyimli sağlık ekibi.' },
  { icon: '🔬', title: 'Modern Teknoloji', desc: 'Dijital röntgen, 3D tarama ve laser diş tedavisi.' },
  { icon: '😊', title: 'Hasta Konforu', desc: 'Kaygısız tedavi için sakin ortam ve güleryüzlü hizmet.' },
  { icon: '💎', title: 'Kaliteli Malzeme', desc: 'Uluslararası sertifikalı, uzun ömürlü dental malzemeler.' },
];

export default function HomePage() {
  const { company } = useCompany();
  const [services, setServices] = useState([]);

  useEffect(() => { getServices().then((d) => setServices(d.slice(0, 6))).catch(() => {}); }, []);

  const name = company?.name || 'DentCare İstanbul';
  const desc = company?.description?.tr || 'Sağlıklı ve güzel gülüşler için modern diş hekimliği hizmetleri.';
  const heroTitle = company?.content?.heroTitle?.tr || 'Sağlıklı Gülüşler\nİçin Buradayız';
  const hero = company?.content?.heroImage || 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1600&q=80';
  const values = company?.content?.values?.length
    ? company.content.values.map((v) => ({ icon: v.icon, title: v.title?.tr || '', desc: v.description?.tr || '' }))
    : WHY_DEFAULTS;
  const testimonialQuote = company?.content?.testimonial?.quote?.tr || 'Kliniğin temizliği ve doktorların ilgisi gerçekten etkileyiciydi. Hayatımda gördüğüm en profesyonel ekip.';
  const testimonialAuthor = company?.content?.testimonial?.author || 'Fatma Kaya';
  const testimonialRole = company?.content?.testimonial?.role || 'Hasta · Google Yorumu';

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#F0FDFF]">
        <div className="absolute inset-0 hidden md:block">
          <img src={hero} alt="" className="w-full h-full object-cover object-center opacity-20" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center w-full">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#CFFAFE] text-[#0E7490] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E7490]"></span>
              {company?.contact?.city || 'İstanbul'} · Diş Kliniği
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-[#0C1B2E]">
              {heroTitle.split('\n').map((line, i) => (
                <span key={i} className={`block ${i === 1 ? 'text-[#0E7490]' : ''}`}>{line}</span>
              ))}
            </h1>
            <p className="text-[#64748B] text-lg leading-relaxed mb-8 max-w-md">{desc}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/randevu" className="bg-[#0E7490] hover:bg-[#155E75] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-center">
                Randevu Al
              </Link>
              <Link to="/hizmetler" className="border-2 border-[#0E7490] text-[#0E7490] hover:bg-[#F0FDFF] font-semibold px-7 py-3.5 rounded-xl transition-colors text-center">
                Hizmetlerimiz
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <img src={hero} alt="Klinik" className="w-full h-[480px] object-cover rounded-3xl shadow-2xl" />
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-5">
                <p className="text-2xl font-bold text-[#0E7490]">2.500+</p>
                <p className="text-xs text-[#64748B] font-medium">Mutlu Hasta</p>
              </div>
              <div className="absolute -top-5 -right-5 bg-[#0E7490] rounded-2xl shadow-xl p-5 text-white">
                <p className="text-2xl font-bold">15+</p>
                <p className="text-xs font-medium opacity-80">Yıl Deneyim</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neden biz */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-[#0E7490] font-semibold mb-3">Neden Biz</p>
            <h2 className="text-3xl md:text-4xl text-[#0C1B2E]">Fark Yaratan Unsurlar</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="group p-6 rounded-2xl border border-[#E0F2FE] hover:border-[#0E7490] hover:shadow-lg transition-all">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="text-base font-bold mb-2 text-[#0C1B2E]">{v.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hizmetler önizleme */}
      {services.length > 0 && (
        <section className="py-20 bg-[#F8FDFF]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#0E7490] font-semibold mb-3">Uzmanlık Alanlarımız</p>
                <h2 className="text-3xl md:text-4xl text-[#0C1B2E]">Sunduğumuz Hizmetler</h2>
              </div>
              <Link to="/hizmetler" className="hidden md:block text-sm font-semibold text-[#0E7490] hover:underline">
                Tümünü Gör →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <div key={s._id} className="bg-white rounded-2xl overflow-hidden border border-[#E0F2FE] hover:shadow-lg transition-shadow">
                  {s.image && <img src={s.image} alt={s.name?.tr} className="w-full h-44 object-cover" />}
                  <div className="p-6">
                    <span className="text-2xl mb-3 block">{s.icon}</span>
                    <h3 className="font-bold text-[#0C1B2E] mb-2">{s.name?.tr}</h3>
                    {s.description?.tr && <p className="text-sm text-[#64748B] leading-relaxed">{s.description.tr}</p>}
                    {s.price && (
                      <p className="mt-3 text-sm font-semibold text-[#0E7490]">
                        {s.price.toLocaleString('tr-TR')} {s.currency === 'TRY' ? '₺' : s.currency}'den başlayan
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      <section className="py-20 bg-[#0E7490]">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <p className="text-5xl mb-6 opacity-40">"</p>
          <blockquote className="text-xl md:text-2xl leading-relaxed mb-8 font-light">{testimonialQuote}</blockquote>
          <p className="text-sm font-bold tracking-widest uppercase opacity-90">{testimonialAuthor}</p>
          <p className="text-xs opacity-60 mt-1">{testimonialRole}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl text-[#0C1B2E] mb-4">Sağlıklı bir gülüş için<br/>ilk adımı atın</h2>
          <p className="text-[#64748B] mb-8 leading-relaxed">Ücretsiz ilk muayene için hemen randevu alın.</p>
          <Link to="/randevu" className="inline-block bg-[#0E7490] hover:bg-[#155E75] text-white font-semibold px-10 py-4 rounded-xl transition-colors">
            Randevu Al
          </Link>
          {company?.contact?.phone && (
            <p className="mt-5 text-sm text-[#64748B]">
              veya arayın: <a href={`tel:${company.contact.phone}`} className="text-[#0E7490] font-semibold">{company.contact.phone}</a>
            </p>
          )}
        </div>
      </section>
    </>
  );
}
