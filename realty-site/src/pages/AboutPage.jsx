import { Link } from 'react-router-dom';
import { useCompany } from '../hooks/useCompany';

export default function AboutPage() {
  const { company } = useCompany();
  const name = company?.name || 'Prime Gayrimenkul';
  const desc = company?.description?.tr || '15 yılı aşkın tecrübemizle İstanbul gayrimenkul piyasasında güvenilir danışmanlık hizmetleri sunuyoruz.';
  const p2 = company?.content?.aboutParagraph2?.tr || 'Müşterilerimizin ihtiyaçlarını anlayarak en uygun mülkü bulmalarına yardımcı oluyor, satış ve kira süreçlerinin her aşamasında profesyonel destek sağlıyoruz.';
  const p3 = company?.content?.aboutParagraph3?.tr || 'Hukuki danışmanlık, değerleme ve sigorta hizmetleriyle tam kapsamlı gayrimenkul çözümleri sunuyoruz.';
  const heroImg = company?.content?.aboutHeroImage || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80';
  const images = company?.content?.aboutImages?.filter(Boolean).length === 4
    ? company.content.aboutImages
    : [
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80',
        'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80',
      ];

  return (
    <>
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={heroImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0F172A]/70 flex items-center justify-center text-center text-white px-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#C9A96E] font-semibold mb-3">Hikayemiz</p>
            <h1 className="text-4xl md:text-5xl">Hakkımızda</h1>
          </div>
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#C9A96E] font-semibold mb-3">Biz Kimiz</p>
            <h2 className="text-3xl text-[#0F172A] mb-6 leading-snug">Gayrimenkulde<br /><em>güven ve uzmanlık</em><br />bir arada.</h2>
            <div className="space-y-4 text-sm text-[#64748B] leading-relaxed">
              <p>{desc}</p>
              {p2 && <p>{p2}</p>}
              {p3 && <p>{p3}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {images.map((src, i) => (
              <div key={i} className="overflow-hidden rounded-2xl">
                <img src={src} alt="" className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0F172A] py-16">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          {[['500+', 'Satılan Mülk'], ['15+', 'Yıl Deneyim'], ['98%', 'Müşteri Memnuniyeti'], ['250+', 'Aktif İlan']].map(([num, label]) => (
            <div key={label} className="border border-white/10 rounded-2xl p-6">
              <p className="text-3xl font-bold text-[#C9A96E] mb-1" style={{ fontFamily: 'var(--font-serif)' }}>{num}</p>
              <p className="text-xs text-white/50">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-[#FAFAF9] text-center px-6">
        <h2 className="text-3xl text-[#0F172A] mb-4">{name} ile mülk alın, satın veya kiralayın</h2>
        <Link to="/iletisim" className="inline-block bg-[#1E293B] text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-[#0F172A] transition-colors">
          Ücretsiz Danışmanlık
        </Link>
      </section>
    </>
  );
}
