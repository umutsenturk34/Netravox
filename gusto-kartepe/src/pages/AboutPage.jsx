import { Link } from 'react-router-dom';
import { useCompany } from '../hooks/useCompany';

const FALLBACK_ABOUT_IMAGES = [
  'https://picsum.photos/seed/forest-river/600/400',
  'https://picsum.photos/seed/food-artisan/600/400',
  'https://picsum.photos/seed/chef-cooking/600/400',
  'https://picsum.photos/seed/dining-room/600/400',
];

const DEFAULT_VALUES = [
  { icon: '🌿', title: 'Sürdürülebilirlik', desc: 'Yerel üreticilerden gelen mevsimlik ürünler, sıfır atık mutfak anlayışı.' },
  { icon: '🏔', title: 'Doğa ile Uyum', desc: 'Kartepe ormanlarının ortasında, açık hava ve kapalı alan seçenekleri.' },
  { icon: '👨‍🍳', title: 'Usta Eller', desc: 'Deneyimli şef kadromuz, her tabağı bir sanat eseri olarak hazırlar.' },
];

export default function AboutPage() {
  const { company } = useCompany();

  const name = company?.name || 'Gusto Kartepe';
  const descTr = company?.description?.tr || 'Gusto Kartepe, gürgen ve kayın ormanlarının kucağında kurulmuş, doğayla iç içe bir gastronomi deneyimi sunan eşsiz bir restoran ve kahvaltı mekanıdır.';
  const paragraph2 = company?.content?.aboutParagraph2?.tr || 'Tüm malzemelerimizi yerel çiftçilerden ve sürdürülebilir kaynaklardan temin ediyor; mevsimlik ve taze ürünlerle hazırladığımız lezzetleri sizlere sunuyoruz.';
  const paragraph3 = company?.content?.aboutParagraph3?.tr || 'Köklü bir misafirperver anlayışıyla hizmet veren ekibimiz, her ziyaretinizi özel kılmak için burada.';
  const testimonialQuote = company?.content?.testimonial?.quote?.tr || 'Hayatımda deneyimlediğim en lüks kahvaltıydı. Sadece yemekler değil, personelin ilgisi ve doğanın sunduğu o muazzam sessizlik tek kelimeyle kusursuzdu.';
  const testimonialAuthor = company?.content?.testimonial?.author || 'Ayşe Yılmaz';
  const testimonialRole = company?.content?.testimonial?.role || 'Misafir · Google Yorumu';

  const aboutHeroImage = company?.content?.aboutHeroImage || 'https://picsum.photos/seed/kartepe-nature/1600/700';
  const aboutImages = company?.content?.aboutImages?.filter(Boolean).length === 4
    ? company.content.aboutImages
    : FALLBACK_ABOUT_IMAGES;

  const values = company?.content?.values?.length
    ? company.content.values.map((v) => ({ icon: v.icon, title: v.title?.tr || v.title?.en || '', desc: v.description?.tr || v.description?.en || '' }))
    : DEFAULT_VALUES;

  return (
    <>
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={aboutHeroImage} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center text-white px-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#E8C4A0] mb-3">Hikayemiz</p>
            <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>Hakkımızda</h1>
          </div>
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#8B1A1A] mb-3">Biz Nasıl Fark Ederiz</p>
            <h2 className="text-3xl font-bold leading-snug mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
              Doğayla bütünleşik,<br /><em>sürdürülebilir ve ayrıcalıklı</em><br />bir alan.
            </h2>
            <div className="space-y-4 text-sm text-[#6B6B6B] leading-relaxed">
              <p>{descTr}</p>
              {paragraph2 && <p>{paragraph2}</p>}
              {paragraph3 && <p>{paragraph3}</p>}
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-3">
              {aboutImages.map((src, i) => (
                <div key={i} className="overflow-hidden rounded-lg">
                  <img src={src} alt="" className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
            <p className="text-center mt-4">
              <Link to="/galeri" className="text-xs text-[#8B1A1A] hover:underline">Tüm fotoğrafları gör →</Link>
            </p>
          </div>
        </div>
      </section>

      {values.length > 0 && (
        <section className="bg-[#FAF8F5] py-16">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
            {values.map((v, i) => (
              <div key={i} className="px-4">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-serif)' }}>{v.title}</h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {company?.contact && (
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6 grid sm:grid-cols-2 gap-6">
            {company.contact.phone && (
              <div className="text-center p-6 border border-[#E8E4E0] rounded-xl">
                <p className="text-2xl mb-2">📞</p>
                <p className="text-xs uppercase tracking-widest text-[#8B1A1A] mb-1">Telefon</p>
                <p className="font-medium">{company.contact.phone}</p>
              </div>
            )}
            {company.contact.address && (
              <div className="text-center p-6 border border-[#E8E4E0] rounded-xl">
                <p className="text-2xl mb-2">📍</p>
                <p className="text-xs uppercase tracking-widest text-[#8B1A1A] mb-1">Adres</p>
                <p className="font-medium text-sm">{[company.contact.address, company.contact.city].filter(Boolean).join(', ')}</p>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="py-20 max-w-3xl mx-auto px-6 text-center">
        <div className="text-4xl text-[#8B1A1A] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>"</div>
        <blockquote className="text-xl md:text-2xl italic leading-relaxed text-[#1A1A1A] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
          {testimonialQuote}
        </blockquote>
        <p className="text-xs tracking-[0.2em] uppercase text-[#8B1A1A] font-semibold">{testimonialAuthor}</p>
        <p className="text-xs text-[#9A9A9A] mt-1">{testimonialRole}</p>
      </section>

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
