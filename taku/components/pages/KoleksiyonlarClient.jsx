'use client';

import { useState, useMemo, useEffect } from 'react';
import ProductCard from '../ui/ProductCard';
import { useLang } from '../../lib/lang';

export default function KoleksiyonlarClient({ page }) {
  const { lang } = useLang();
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [category, setCategory] = useState('');
  const [sort,     setSort]     = useState('default');

  const pc = page?.content || {};

  useEffect(() => {
    fetch('/api/products', { cache: 'no-store' })
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category).filter(Boolean))].sort(),
    [products]
  );

  let displayed = category ? products.filter((p) => p.category === category) : products;
  if (sort === 'price-asc')  displayed = [...displayed].sort((a, b) => (a.price || 0) - (b.price || 0));
  if (sort === 'price-desc') displayed = [...displayed].sort((a, b) => (b.price || 0) - (a.price || 0));

  const heroTitle    = pc.heroTitle?.[lang]    || pc.heroTitle?.tr    || (lang === 'en' ? 'Collections'  : 'Koleksiyonlar');
  const heroSubtitle = pc.heroSubtitle?.[lang] || pc.heroSubtitle?.tr || (lang === 'en' ? 'All Season'   : 'Tüm Sezon');

  return (
    <>
      {/* Page hero */}
      <div className="bg-[#0A0A0A] text-white pt-28 pb-14 px-6 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
          {heroSubtitle}
        </p>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
          {heroTitle}
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Filter + Sort bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E5E5E3]">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory('')}
              className="px-4 py-1.5 text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors border"
              style={{
                background: !category ? '#0A0A0A' : 'transparent',
                color: !category ? 'white' : '#6B6B6B',
                borderColor: !category ? '#0A0A0A' : '#E5E5E3',
              }}
            >
              {lang === 'en' ? 'All' : 'Tümü'}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat === category ? '' : cat)}
                className="px-4 py-1.5 text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors border"
                style={{
                  background: category === cat ? '#0A0A0A' : 'transparent',
                  color: category === cat ? 'white' : '#6B6B6B',
                  borderColor: category === cat ? '#0A0A0A' : '#E5E5E3',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-xs font-medium text-[#0A0A0A] border border-[#E5E5E3] px-3 py-2 bg-white focus:outline-none focus:border-[#0A0A0A] appearance-none cursor-pointer"
          >
            <option value="default">{lang === 'en' ? 'Sort: Default' : 'Sıralama: Varsayılan'}</option>
            <option value="price-asc">{lang === 'en' ? 'Price: Low to High' : 'Fiyat: Düşükten Yükseğe'}</option>
            <option value="price-desc">{lang === 'en' ? 'Price: High to Low' : 'Fiyat: Yüksekten Düşüğe'}</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-20 text-[#6B6B6B] text-sm">
            {lang === 'en' ? 'No products found in this category.' : 'Bu kategoride ürün bulunamadı.'}
          </div>
        ) : (
          <>
            <p className="text-xs text-[#6B6B6B] mb-6">
              {displayed.length} {lang === 'en' ? 'products' : 'ürün'}
              {category && <span className="ml-2" style={{ color: 'var(--color-accent)' }}>— {category}</span>}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {displayed.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          </>
        )}
      </div>
    </>
  );
}
