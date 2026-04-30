import { useCompany } from '../hooks/useCompany';
import Loader from '../components/ui/Loader';

export default function AboutPage() {
  const { company, loading } = useCompany();

  if (loading)
    return (
      <div className="pt-20">
        <Loader />
      </div>
    );

  const name = company?.name || 'VAULT';
  const desc = company?.description?.tr || '';
  const p2 = company?.content?.aboutParagraph2?.tr || '';
  const p3 = company?.content?.aboutParagraph3?.tr || '';
  const heroImg =
    company?.content?.aboutHeroImage || company?.content?.heroImage || '';
  const values = company?.content?.values || [];

  return (
    <>
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {heroImg && (
          <img
            src={heroImg}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-6">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C8A882] mb-3">
            Biz Kimiz
          </p>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
            Hakkımızda
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Tagline */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#0A0A0A] mb-6 uppercase tracking-tight">
            Minimal Tasarım.
            <br />
            Maksimal Etki.
          </h2>
          <div className="w-12 h-px bg-[#C8A882] mx-auto" />
        </div>

        {/* Paragraphs */}
        <div className="space-y-8 text-[#3A3A3A] leading-relaxed text-base">
          {desc && <p>{desc}</p>}
          {p2 && <p>{p2}</p>}
          {p3 && <p>{p3}</p>}
        </div>

        {/* Values */}
        {values.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8A882] mb-2">
                İlkelerimiz
              </p>
              <h3 className="text-2xl font-black uppercase tracking-tight">
                Bizi Biz Yapan Değerler
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              {values.map((v, i) => (
                <div key={i} className="flex gap-5">
                  <div className="text-2xl flex-shrink-0 mt-1">{v.icon}</div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-[0.1em] mb-2">
                      {v.title?.tr}
                    </h4>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed">
                      {v.description?.tr}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 text-center border-t border-[#E5E5E3] pt-14">
          {[
            { value: '2022', label: 'Kuruluş Yılı' },
            { value: '10K+', label: 'Mutlu Müşteri' },
            { value: '100%', label: 'Yerli Üretim' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-black text-[#0A0A0A] mb-2">
                {s.value}
              </div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-[#6B6B6B] font-semibold">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dark CTA */}
      <div className="bg-[#0A0A0A] text-white text-center py-20 px-6">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#C8A882] mb-3">
          Tanıştık mı?
        </p>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6">
          Koleksiyonu Keşfetmeye Hazır mısın?
        </h2>
        <a
          href="/koleksiyonlar"
          className="inline-block bg-white text-[#0A0A0A] text-xs font-bold tracking-[0.15em] uppercase px-10 py-4 hover:bg-[#C8A882] transition-colors"
        >
          Ürünleri Gör
        </a>
      </div>
    </>
  );
}
