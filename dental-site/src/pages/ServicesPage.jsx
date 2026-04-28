import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../api/client';

function Skeleton({ className }) {
  return <div className={`animate-pulse bg-[#E0F2FE] rounded-2xl ${className}`} />;
}

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices().then(setServices).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="bg-[#F0FDFF] py-16 text-center border-b border-[#E0F2FE]">
        <p className="text-xs tracking-[0.3em] uppercase text-[#0E7490] font-semibold mb-3">Uzmanlık Alanlarımız</p>
        <h1 className="text-4xl text-[#0C1B2E] mb-3">Hizmetlerimiz</h1>
        <p className="text-[#64748B] max-w-md mx-auto text-sm leading-relaxed">
          Modern teknoloji ve uzman kadromuzla sunduğumuz kapsamlı diş hekimliği hizmetleri.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-64" />)}
          </div>
        )}

        {!loading && services.length === 0 && (
          <div className="text-center py-20 text-[#64748B]">
            <p className="text-4xl mb-4">🦷</p>
            <p className="text-lg font-medium mb-2">Henüz hizmet eklenmemiş</p>
            <p className="text-sm">CMS panelden hizmetleri ekleyin.</p>
          </div>
        )}

        {!loading && services.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s._id} className="bg-white rounded-2xl overflow-hidden border border-[#E0F2FE] hover:shadow-xl hover:-translate-y-1 transition-all">
                {s.image ? (
                  <img src={s.image} alt={s.name?.tr} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-28 bg-[#F0FDFF] flex items-center justify-center text-5xl">{s.icon || '🦷'}</div>
                )}
                <div className="p-6">
                  {!s.image && <span className="sr-only">{s.icon}</span>}
                  <h3 className="text-lg font-bold text-[#0C1B2E] mb-2">{s.name?.tr}</h3>
                  {s.description?.tr && (
                    <p className="text-sm text-[#64748B] leading-relaxed mb-4">{s.description.tr}</p>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t border-[#E0F2FE]">
                    {s.duration && <span className="text-xs text-[#94A3B8]">⏱ {s.duration}</span>}
                    {s.price ? (
                      <span className="text-sm font-bold text-[#0E7490]">
                        {s.price.toLocaleString('tr-TR')} {s.currency === 'TRY' ? '₺' : s.currency}
                      </span>
                    ) : <span />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <section className="bg-[#0E7490] py-16 text-center text-white px-6">
        <h2 className="text-3xl mb-3">Randevu Almak İster misiniz?</h2>
        <p className="text-white/70 mb-6 text-sm">Hizmetlerimiz hakkında daha fazla bilgi için hemen iletişime geçin.</p>
        <Link to="/randevu" className="inline-block bg-white text-[#0E7490] font-semibold px-8 py-3 rounded-xl hover:bg-[#F0FDFF] transition-colors">
          Randevu Al
        </Link>
      </section>
    </>
  );
}
