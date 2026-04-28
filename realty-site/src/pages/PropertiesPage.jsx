import { useState, useEffect } from 'react';
import { getProperties } from '../api/client';

const TYPE_LABELS = { apartment: 'Daire', house: 'Müstakil', villa: 'Villa', office: 'Ofis', land: 'Arsa', commercial: 'İşyeri', other: 'Diğer' };
const PROPERTY_TYPES = [
  { value: '', label: 'Tüm Tipler' },
  { value: 'apartment', label: 'Daire' },
  { value: 'house', label: 'Müstakil' },
  { value: 'villa', label: 'Villa' },
  { value: 'office', label: 'Ofis' },
  { value: 'land', label: 'Arsa' },
];

const fallbackProperties = [
  { _id: '1', title: { tr: 'Boğaz Manzaralı 3+1 Daire' }, propertyType: 'apartment', type: 'sale', price: 8500000, currency: 'TRY', size: 165, rooms: 3, bathrooms: 2, floor: 7, location: { district: 'Beşiktaş', city: 'İstanbul' }, images: ['https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&q=80'], isFeatured: true },
  { _id: '2', title: { tr: 'Modern Villa' }, propertyType: 'villa', type: 'sale', price: 25000000, currency: 'TRY', size: 450, rooms: 6, bathrooms: 4, location: { district: 'Çekmeköy', city: 'İstanbul' }, images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80'], isFeatured: true },
  { _id: '3', title: { tr: 'Merkezi Ofis Katı' }, propertyType: 'office', type: 'rent', price: 45000, currency: 'TRY', size: 280, location: { district: 'Levent', city: 'İstanbul' }, images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80'] },
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
          <div className="w-full h-full bg-[#F1F5F9] flex items-center justify-center text-5xl">🏠</div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-[#0F172A] text-white text-xs font-bold px-2.5 py-1 rounded-lg">{p.type === 'sale' ? 'Satılık' : 'Kiralık'}</span>
          {p.isFeatured && <span className="bg-[#C9A96E] text-white text-xs font-bold px-2.5 py-1 rounded-lg">Öne Çıkan</span>}
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs text-[#64748B] font-medium mb-1">{TYPE_LABELS[p.propertyType] || 'Mülk'} · {p.location?.district || p.location?.city}</p>
        <h3 className="text-lg font-semibold text-[#0F172A] mb-3 leading-snug" style={{ fontFamily: 'var(--font-serif)' }}>{p.title?.tr}</h3>
        <div className="flex gap-4 text-xs text-[#64748B] mb-4">
          {p.rooms && <span>🛏 {p.rooms} Oda</span>}
          {p.bathrooms && <span>🚿 {p.bathrooms} Banyo</span>}
          {p.size && <span>📐 {p.size} m²</span>}
          {p.floor && <span>🏢 {p.floor}. Kat</span>}
        </div>
        {p.features?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {p.features.slice(0, 3).map((f) => (
              <span key={f} className="text-xs bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] px-2 py-0.5 rounded-lg">{f}</span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-4">
          <span className="text-xl font-bold text-[#C9A96E]" style={{ fontFamily: 'var(--font-serif)' }}>{price}</span>
        </div>
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');
  const [listingFilter, setListingFilter] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (typeFilter) params.set('propertyType', typeFilter);
    if (listingFilter) params.set('type', listingFilter);
    params.set('status', 'available');
    getProperties(params.toString())
      .then((d) => setProperties(d.length ? d : fallbackProperties))
      .catch(() => setProperties(fallbackProperties))
      .finally(() => setLoading(false));
  }, [typeFilter, listingFilter]);

  return (
    <>
      <div className="bg-[#0F172A] py-16 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-[#C9A96E] font-semibold mb-3">Portföyümüz</p>
        <h1 className="text-4xl text-white mb-3">Mülk İlanları</h1>
        <p className="text-white/50 max-w-md mx-auto text-sm">Satılık ve kiralık mülklerimizi inceleyin, size en uygun olanı seçin.</p>
      </div>

      {/* Filtreler */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap gap-4">
          <select value={listingFilter} onChange={(e) => { setListingFilter(e.target.value); setLoading(true); }}
            className="text-sm border border-[#E2E8F0] rounded-xl px-4 py-2 outline-none focus:border-[#C9A96E] bg-white">
            <option value="">Satılık & Kiralık</option>
            <option value="sale">Satılık</option>
            <option value="rent">Kiralık</option>
          </select>
          <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setLoading(true); }}
            className="text-sm border border-[#E2E8F0] rounded-xl px-4 py-2 outline-none focus:border-[#C9A96E] bg-white">
            {PROPERTY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          <span className="text-sm text-[#64748B] self-center ml-auto">{properties.length} ilan</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-[#F1F5F9] rounded-2xl h-80" />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 text-[#64748B]">
            <p className="text-4xl mb-4">🏠</p>
            <p className="text-lg font-medium mb-2">Bu kriterlerde ilan bulunamadı</p>
            <p className="text-sm">Filtreleri değiştirmeyi deneyin.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {properties.map((p) => <PropertyCard key={p._id} p={p} />)}
          </div>
        )}
      </div>
    </>
  );
}
