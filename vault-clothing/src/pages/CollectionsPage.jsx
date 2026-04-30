import { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../api/client';
import { useLang } from '../hooks/useLang';
import ProductCard from '../components/ui/ProductCard';
import Loader from '../components/ui/Loader';

const SORT_LABELS = {
  tr: { default: 'Sıralama: Varsayılan', asc: 'Fiyat: Düşükten Yükseğe', desc: 'Fiyat: Yüksekten Düşüğe' },
  en: { default: 'Sort: Default',        asc: 'Price: Low to High',        desc: 'Price: High to Low' },
};

export default function CollectionsPage() {
  const { lang } = useLang();
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [category, setCategory] = useState('');
  const [sort,     setSort]     = useState('default');

  useEffect(() => {
    setCategory('');
    getProducts()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Build unique category list from product data
  const categories = useMemo(
    () => [...new Set(products.map(p => p.category).filter(Boolean))].sort(),
    [products]
  );

  const sortLabels = SORT_LABELS[lang] || SORT_LABELS.tr;

  let displayed = category
    ? products.filter(p => p.category === category)
    : products;

  if (sort === 'price-asc')  displayed = [...displayed].sort((a, b) => (a.price || 0) - (b.price || 0));
  if (sort === 'price-desc') displayed = [...displayed].sort((a, b) => (b.price || 0) - (a.price || 0));

  const allLabel = lang === 'en' ? 'All' : 'Tümü';

  return (
    <>
      {/* Page hero */}
      <div className="bg-[#0A0A0A] text-white pt-28 pb-14 px-6 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#C8A882] mb-3">
          {lang === 'en' ? 'All Season' : 'Tüm Sezon'}
        </p>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
          {lang === 'en' ? 'Collections' : 'Koleksiyonlar'}
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Filter + Sort bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E5E5E3]">
          {/* Category filters — dynamic from CMS */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory('')}
              className={`px-4 py-1.5 text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors border ${
                !category
                  ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                  : 'bg-transparent text-[#6B6B6B] border-[#E5E5E3] hover:border-[#0A0A0A] hover:text-[#0A0A0A]'
              }`}
            >
              {allLabel}
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat === category ? '' : cat)}
                className={`px-4 py-1.5 text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors border ${
                  category === cat
                    ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                    : 'bg-transparent text-[#6B6B6B] border-[#E5E5E3] hover:border-[#0A0A0A] hover:text-[#0A0A0A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="text-xs font-medium text-[#0A0A0A] border border-[#E5E5E3] px-3 py-2 bg-white focus:outline-none focus:border-[#0A0A0A] appearance-none cursor-pointer"
          >
            <option value="default">{sortLabels.default}</option>
            <option value="price-asc">{sortLabels.asc}</option>
            <option value="price-desc">{sortLabels.desc}</option>
          </select>
        </div>

        {/* Products */}
        {loading ? (
          <Loader />
        ) : displayed.length === 0 ? (
          <div className="text-center py-20 text-[#6B6B6B] text-sm">
            {lang === 'en' ? 'No products found in this category.' : 'Bu kategoride ürün bulunamadı.'}
          </div>
        ) : (
          <>
            <p className="text-xs text-[#6B6B6B] mb-6">
              {displayed.length} {lang === 'en' ? 'products' : 'ürün'}
              {category && <span className="ml-2 text-[#C8A882]">— {category}</span>}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {displayed.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </>
        )}
      </div>
    </>
  );
}
