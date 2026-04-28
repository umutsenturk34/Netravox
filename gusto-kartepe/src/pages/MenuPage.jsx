import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMenu } from '../api/client';
import { useCompany } from '../hooks/useCompany';

function Skeleton({ className }) {
  return <div className={`animate-pulse bg-[#E8E4E0] rounded ${className}`} />;
}

export default function MenuPage() {
  const { company } = useCompany();
  const [categories, setCategories] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);

  const subtitle = company?.content?.menuSubtitle?.tr || 'Yerel üreticilerden gelen taze malzemelerle hazırlanan, mevsimlik lezzetler.';

  useEffect(() => {
    getMenu()
      .then((data) => {
        setCategories(data);
        if (data.length) setActiveId(data[0]._id);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const active = categories.find((c) => c._id === activeId);
  const featured = active?.items?.find((i) => i.isFeatured);
  const rest = active?.items?.filter((i) => !i.isFeatured) || [];

  return (
    <>
      <div className="bg-[#FAF8F5] py-14 text-center border-b border-[#E8E4E0]">
        <p className="text-xs tracking-[0.3em] uppercase text-[#8B1A1A] mb-2">Mutfağımız</p>
        <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>Menümüz</h1>
        <p className="text-[#6B6B6B] mt-3 max-w-md mx-auto text-sm leading-relaxed">{subtitle}</p>
      </div>

      {!loading && categories.length > 0 && (
        <div className="sticky top-16 z-40 bg-white border-b border-[#E8E4E0]">
          <div className="max-w-5xl mx-auto px-6 flex overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setActiveId(cat._id)}
                className={`px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeId === cat._id ? 'border-[#8B1A1A] text-[#8B1A1A]' : 'border-transparent text-[#6B6B6B] hover:text-[#1A1A1A]'
                }`}
              >
                {cat.name?.tr || cat.name?.en}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-12">
        {loading && (
          <div className="space-y-6">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-64 w-full" />
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full" />)}
          </div>
        )}

        {!loading && categories.length === 0 && (
          <div className="text-center py-20 text-[#9A9A9A]">
            <p className="text-lg mb-2">Menü henüz eklenmemiş</p>
            <p className="text-sm">CMS panelden menü kategorileri ve ürünleri ekleyin.</p>
          </div>
        )}

        {active && (
          <>
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>
                {active.name?.tr || active.name?.en}
              </h2>
              {active.description?.tr && (
                <p className="text-sm text-[#6B6B6B] mt-2">{active.description.tr}</p>
              )}
            </div>

            {featured && (
              <div className="grid md:grid-cols-2 gap-8 mb-12 rounded-xl overflow-hidden border border-[#E8E4E0]">
                <div className="relative">
                  {featured.image ? (
                    <img src={featured.image} alt={featured.name?.tr} className="w-full h-full object-cover min-h-[240px]" />
                  ) : (
                    <div className="w-full min-h-[240px] bg-[#FAF8F5] flex items-center justify-center text-[#9A9A9A] text-sm">Fotoğraf yok</div>
                  )}
                  <span className="absolute top-3 left-3 bg-[#8B1A1A] text-white text-xs font-medium px-3 py-1 rounded">Önerilen</span>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-serif)' }}>{featured.name?.tr || featured.name?.en}</h3>
                  {featured.description?.tr && (
                    <p className="text-[#6B6B6B] text-sm leading-relaxed mb-6">{featured.description.tr}</p>
                  )}
                  <p className="text-2xl font-bold text-[#8B1A1A]">
                    {featured.price?.toLocaleString('tr-TR')} {featured.currency === 'TRY' ? '₺' : featured.currency}
                  </p>
                </div>
              </div>
            )}

            {rest.length > 0 && (
              <div className="divide-y divide-[#E8E4E0] border-t border-b border-[#E8E4E0]">
                {rest.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 py-4">
                    {item.image && (
                      <img src={item.image} alt={item.name?.tr} className="w-16 h-16 object-cover rounded-lg shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#1A1A1A]">{item.name?.tr || item.name?.en}</p>
                      {item.description?.tr && (
                        <p className="text-sm text-[#9A9A9A] mt-0.5 truncate">{item.description.tr}</p>
                      )}
                      {item.allergens?.length > 0 && (
                        <p className="text-xs text-[#B0A090] mt-1">Alerjenler: {item.allergens.join(', ')}</p>
                      )}
                    </div>
                    <span className="font-semibold text-[#1A1A1A] whitespace-nowrap shrink-0">
                      {item.price?.toLocaleString('tr-TR')} {item.currency === 'TRY' ? '₺' : item.currency}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <section className="bg-[#6B1117] py-16 text-center text-white px-6">
        <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-serif)' }}>Bir masa ayırtın</h2>
        <p className="text-white/70 mb-6 text-sm">Özel günleriniz için önceden rezervasyon yaptırmanızı öneririz.</p>
        <Link to="/rezervasyon" className="inline-block bg-white text-[#6B1117] font-semibold px-8 py-3 rounded hover:bg-[#FAF8F5] transition-colors">
          Rezervasyon Yap
        </Link>
      </section>
    </>
  );
}
