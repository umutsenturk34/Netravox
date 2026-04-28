import { Link } from 'react-router-dom';
import { useCompany } from '../hooks/useCompany';

export default function AboutPage() {
  const { company } = useCompany();
  const name = company?.name || 'DentCare İstanbul';
  const desc = company?.description?.tr || 'Modern diş hekimliği anlayışıyla hasta memnuniyetini ön planda tutan, güvenilir bir klinik.';
  const p2 = company?.content?.aboutParagraph2?.tr || 'Kliniğimizde kullandığımız tüm malzemeler uluslararası standartlara uygun, sertifikalı ürünlerden oluşmaktadır. Her hastamızın güvenliği ve konforu bizim için önceliklidir.';
  const p3 = company?.content?.aboutParagraph3?.tr || 'Deneyimli hekim kadromuz ve güler yüzlü personelimizle her ziyaretinizi keyifli bir deneyime dönüştürmeyi hedefliyoruz.';
  const heroImg = company?.content?.aboutHeroImage || 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1600&q=80';
  const images = company?.content?.aboutImages?.filter(Boolean).length === 4
    ? company.content.aboutImages
    : [
        'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80',
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80',
        'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80',
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
      ];

  return (
    <>
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={heroImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0C1B2E]/60 flex items-center justify-center text-center text-white px-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#22D3EE] mb-3">Hikayemiz</p>
            <h1 className="text-4xl md:text-5xl">Hakkımızda</h1>
          </div>
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#0E7490] font-semibold mb-3">Biz Kimiz</p>
            <h2 className="text-3xl text-[#0C1B2E] mb-6 leading-snug">Sağlıklı gülüşler için<br /><em>modern ve güvenilir</em><br />diş hekimliği.</h2>
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

      <section className="bg-[#F0FDFF] py-16">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          {[
            { num: '15+', label: 'Yıl Deneyim' },
            { num: '2.500+', label: 'Mutlu Hasta' },
            { num: '98%', label: 'Memnuniyet Oranı' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-8 border border-[#E0F2FE]">
              <p className="text-4xl font-bold text-[#0E7490] mb-2">{s.num}</p>
              <p className="text-sm text-[#64748B] font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0E7490] py-16 text-center text-white px-6">
        <h2 className="text-3xl mb-4">{name}'de sağlıklı bir gülüş için<br />hemen randevu alın</h2>
        <Link to="/randevu" className="inline-block bg-white text-[#0E7490] font-semibold px-8 py-3.5 rounded-xl hover:bg-[#F0FDFF] transition-colors">
          Randevu Al
        </Link>
      </section>
    </>
  );
}
