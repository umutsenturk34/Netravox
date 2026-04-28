import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCompany } from '../hooks/useCompany';
import { getProperties } from '../api/client';

const TYPE_LABELS = { apartment: 'Daire', house: 'Müstakil', villa: 'Villa', office: 'Ofis', land: 'Arsa', commercial: 'İşyeri', other: 'Diğer' };
const SERVICES_DEFAULT = [
  { icon: '🔍', title: 'Ücretsiz Danışmanlık', desc: 'Uzman ekibimiz ihtiyacınıza en uygun mülkü bulmak için yanınızda.' },
  { icon: '📋', title: 'Hukuki Güvence', desc: 'Tüm tapu ve sözleşme süreçlerinde profesyonel hukuki destek.' },
  { icon: '💰', title: 'Pazar Analizi', desc: 'Güncel piyasa verileriyle doğru fiyat tespiti ve yatırım tavsiyeleri.' },
  { icon: '🏆', title: '15+ Yıl Deneyim', desc: 'Sektördeki köklü deneyimimizle en iyi anlaşmaları sizin için sağlıyoruz.' },
];

function PropertyCard({ p }) {
  const mainImg = p.images?.[0];
  const price = p.price ? `${p.price.toLocaleString('tr-TR')} ${p.currency === 'TRY' ? '₺' : p.currency}` : 'Fiyat için arayın';
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] hover:shadow-xl hover:-translate-y-1 transition-all group">
      <div className="relative overflow-hidden h-56">
        {mainImg ? (
          <img src={mainImg} alt={p.title?.tr} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-[#F1F5F9] flex items-center justify-center text-4xl">🏠</div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-[#0F172A] text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
            {p.type === 'sale' ? 'Satılık' : 'Kiralık'}
          </span>
          {p.isFeatured && <span className="bg-[#C9A96E] text-white text-xs font-semibold px-2.5 py-1 rounded-lg">Öne Çıkan</span>}
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs text-[#64748B] font-medium mb-1">{TYPE_LABELS[p.propertyType] || 'Mülk'} · {p.location?.district || p.location?.city}</p>
        <h3 className="text-lg font-semibold text-[#0F172A] mb-3 leading-snug" style={{ fontFamily: 'var(--font-serif)' }}>{p.title?.tr}</h3>
        <div className="flex gap-4 text-xs text-[#64748B] mb-4">
          {p.rooms && <span>🛏 {p.rooms} Oda</span>}
          {p.size && <span>📐 {p.size} m²</span>}
          {p.floor && <span>🏢 {p.floor}. Kat</span>}
        </div>
        <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-4">
          <span className="text-lg font-bold text-[#C9A96E]" style={{ fontFamily: 'var(--font-serif)' }}>{price}</span>
          <Link to="/ilanlar" className="text-xs font-semibold text-[#1E293B] hover:text-[#C9A96E] transition-colors">Detaylar →</Link>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { company } = useCompany();
  const [featured, setFeatured] = useState([]);

  useEffect(() => { getProperties('status=available').then((d) => setFeatured(d.filter((p) => p.isFeatured).slice(0, 3))).catch(() => {}); }, []);

  const name = company?.name || 'Prime Gayrimenkul';
  const desc = company?.description?.tr || 'İstanbul ve çevresinde satılık ve kiralık mülklerde güvenilir gayrimenkul danışmanlığı.';
  const hero = company?.content?.heroImage || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80';
  const heroTitle = company?.content?.heroTitle?.tr || 'Hayalinizdeki Mülkü\nBirlikte Bulalım';
  const testimonialQuote = company?.content?.testimonial?.quote?.tr || 'Prime ekibi sayesinde hayalimizdeki evi bulduk. Süreç boyunca çok profesyonellerdi, her şeyi adım adım anlattılar.';
  const testimonialAuthor = company?.content?.testimonial?.author || 'Mehmet & Selin Arslan';
  const testimonialRole = company?.content?.testimonial?.role || 'Ev Sahibi · Beşiktaş';
  const values = company?.content?.values?.length
    ? company.content.values.map((v) => ({ icon: v.icon, title: v.title?.tr || '', desc: v.description?.tr || '' }))
    : SERVICES_DEFAULT;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/70 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 w-full">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-[#C9A96E]/20 border border-[#C9A96E]/30 text-[#C9A96E] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]"></span>
              {company?.contact?.city || 'İstanbul'} · Gayrimenkul
            </div>
            <h1 className="text-4xl md:text-6xl text-white leading-tight mb-6">
              {heroTitle.split('\n').map((line, i) => (
                <span key={i} className={`block ${i === 1 ? 'text-[#C9A96E]' : ''}`}>{line}</span>
              ))}
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">{desc}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/ilanlar" className="bg-[#C9A96E] hover:bg-[#A07840] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-center">
                İlanları Gör
              </Link>
              <Link to="/iletisim" className="border border-white/30 hover:border-white text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-center">
                Danışmanlık Al
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#0F172A] py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[['500+', 'Satılan Mülk'], ['15+', 'Yıl Deneyim'], ['98%', 'Müşteri Memnuniyeti'], ['250+', 'Aktif İlan']].map(([num, label]) => (
            <div key={label}>
              <p className="text-2xl font-bold text-[#C9A96E]" style={{ fontFamily: 'var(--font-serif)' }}>{num}</p>
              <p className="text-xs text-white/50 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Öne çıkan ilanlar */}
      {featured.length > 0 && (
        <section className="py-20 bg-[#FAFAF9]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#C9A96E] font-semibold mb-3">Seçkin Mülkler</p>
                <h2 className="text-3xl md:text-4xl text-[#0F172A]">Öne Çıkan İlanlar</h2>
              </div>
              <Link to="/ilanlar" className="hidden md:block text-sm font-semibold text-[#1E293B] hover:text-[#C9A96E] transition-colors">Tümünü Gör →</Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featured.map((p) => <PropertyCard key={p._id} p={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Hizmetler */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-[#C9A96E] font-semibold mb-3">Neden Prime</p>
            <h2 className="text-3xl md:text-4xl text-[#0F172A]">Size Sunduğumuz Değerler</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="p-6 rounded-2xl border border-[#E2E8F0] hover:border-[#C9A96E] hover:shadow-lg transition-all">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-[#0F172A] mb-2">{v.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-5xl text-[#C9A96E]/30 mb-6" style={{ fontFamily: 'var(--font-serif)' }}>"</p>
          <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 italic" style={{ fontFamily: 'var(--font-serif)' }}>
            {testimonialQuote}
          </blockquote>
          <p className="text-sm font-bold text-[#C9A96E] tracking-widest uppercase">{testimonialAuthor}</p>
          <p className="text-xs text-white/40 mt-1">{testimonialRole}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#FAFAF9] text-center px-6">
        <h2 className="text-3xl md:text-4xl text-[#0F172A] mb-4">Mülk almak, satmak veya kiralamak mı istiyorsunuz?</h2>
        <p className="text-[#64748B] mb-8 max-w-md mx-auto leading-relaxed">Uzman ekibimiz size en uygun çözümü bulmak için hazır.</p>
        <Link to="/iletisim" className="inline-block bg-[#1E293B] hover:bg-[#0F172A] text-white font-semibold px-10 py-4 rounded-xl transition-colors">
          Ücretsiz Danışmanlık Al
        </Link>
      </section>
    </>
  );
}
