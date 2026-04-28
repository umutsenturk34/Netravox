import { Link } from 'react-router-dom';
import { useCompany } from '../hooks/useCompany';

const FALLBACK_HOME_IMAGES = [
  'https://picsum.photos/seed/forest-stream/400/500',
  'https://picsum.photos/seed/food-plate/400/500',
  'https://picsum.photos/seed/kitchen-chef/400/500',
  'https://picsum.photos/seed/restaurant-interior/400/500',
];

export default function HomePage() {
  const { company } = useCompany();

  const name = company?.name || 'Gusto Kartepe';
  const desc = company?.description?.tr || 'Taze malzemeler, nefes kesen manzara ve sıcak atmosferle unutulmaz anlar yaşayın.';
  const hero = company?.content?.heroImage || 'https://picsum.photos/seed/kartepe-forest/1600/900';
  const heroTitle = company?.content?.heroTitle?.tr || 'Doğayla İç İçe\nBir Sofra Deneyimi';
  const testimonialQuote = company?.content?.testimonial?.quote?.tr || 'Hayatımda deneyimlediğim en lüks kahvaltıydı. Sadece yemekler değil, personelin ilgisi ve doğanın sunduğu o muazzam sessizlik tek kelimeyle kusursuzdu.';
  const testimonialAuthor = company?.content?.testimonial?.author || 'Ayşe Yılmaz';
  const testimonialRole = company?.content?.testimonial?.role || 'Misafir · Google Yorumu';

  const homeImages = company?.content?.homeImages?.filter(Boolean).length === 4
    ? company.content.homeImages
    : FALLBACK_HOME_IMAGES;

  return (
    <>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[560px] flex items-center justify-center overflow-hidden">
        <img src={hero} alt={name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative text-center text-white px-6 max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#E8C4A0] mb-4">
            {company?.contact?.city || 'Kartepe'} · {company?.contact?.country || 'Türkiye'}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
            {heroTitle.split('\n').map((line, i) => (
              <span key={i}>{i > 0 ? <><br /><em>{line}</em></> : line}</span>
            ))}
          </h1>
          <p className="text-base md:text-lg text-white/80 mb-8 leading-relaxed">{desc}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/rezervasyon" className="bg-[#8B1A1A] hover:bg-[#6B1117] text-white font-medium px-8 py-3.5 rounded transition-colors">
              Rezervasyon Yap
            </Link>
            <Link to="/menu" className="border border-white/60 hover:bg-white/10 text-white font-medium px-8 py-3.5 rounded transition-colors">
              Menüyü Gör
            </Link>
          </div>
        </div>
      </section>

      {/* Hakkımızda önizleme */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#8B1A1A] mb-3">Biz Kimiz</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-5" style={{ fontFamily: 'var(--font-serif)' }}>
              Doğayla bütünleşik,<br /><em>sürdürülebilir ve ayrıcalıklı</em><br />bir alan.
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-6">{desc}</p>
            <Link to="/hakkimizda" className="inline-flex items-center gap-2 text-[#8B1A1A] font-medium text-sm hover:gap-3 transition-all">
              Daha Fazla Bilgi →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {homeImages.map((src, i) => (
              <img key={i} src={src} alt="" className={`rounded-lg object-cover w-full h-52 md:h-64 ${i === 1 ? 'mt-6' : i === 2 ? '-mt-6' : ''}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Çalışma saatleri & iletişim */}
      {company && (
        <section className="bg-[#FAF8F5] py-16">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
            {company.workingHours?.map((h, i) => (
              <div key={i} className="px-4">
                <div className="w-12 h-0.5 bg-[#8B1A1A] mx-auto mb-5" />
                <h3 className="text-base font-bold mb-1" style={{ fontFamily: 'var(--font-serif)' }}>{h.days}</h3>
                <p className="text-sm text-[#6B6B6B]">{h.hours}</p>
              </div>
            ))}
            {company.contact?.phone && (
              <div className="px-4">
                <div className="w-12 h-0.5 bg-[#8B1A1A] mx-auto mb-5" />
                <h3 className="text-base font-bold mb-1" style={{ fontFamily: 'var(--font-serif)' }}>Rezervasyon</h3>
                <p className="text-sm text-[#6B6B6B]">{company.contact.phone}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Testimonial */}
      <section className="py-20 max-w-3xl mx-auto px-6 text-center">
        <div className="text-4xl text-[#8B1A1A] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>"</div>
        <blockquote className="text-xl md:text-2xl italic leading-relaxed text-[#1A1A1A] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
          {testimonialQuote}
        </blockquote>
        <p className="text-xs tracking-[0.2em] uppercase text-[#8B1A1A] font-semibold">{testimonialAuthor}</p>
        <p className="text-xs text-[#9A9A9A] mt-1">{testimonialRole}</p>
      </section>

      {/* CTA */}
      <section className="bg-[#6B1117] py-20 text-center text-white px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          {name}'de doğayla iç içe<br />bir masa ayırtın
        </h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto text-sm leading-relaxed">
          Hafta sonu kahvaltısı veya özel bir akşam yemeği için ailenizle birlikte önceden rezervasyon yaptırın.
        </p>
        <Link to="/rezervasyon" className="inline-block bg-white text-[#6B1117] font-semibold px-8 py-3.5 rounded hover:bg-[#FAF8F5] transition-colors">
          Hemen Rezervasyon Yap
        </Link>
      </section>
    </>
  );
}
