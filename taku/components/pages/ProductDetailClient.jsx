'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang, t } from '../../lib/lang';
import ProductCard from '../ui/ProductCard';
import ProductActions from '../ui/ProductActions';

export default function ProductDetailClient({ product, related, company }) {
  const { lang } = useLang();

  const name     = t(product.name, lang);
  const desc     = t(product.description, lang);
  const material = t(product.material, lang);
  const price    = product.price ? `${product.price.toLocaleString('tr-TR')} ₺` : null;
  const waPhone  = company?.contact?.whatsapp || company?.contact?.phone;
  const category = product.category || '';

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-20 px-6 max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-[#6B6B6B] mt-4 mb-8">
          <Link href="/" className="hover:text-[#0A0A0A] transition-colors">{lang === 'en' ? 'Home' : 'Ana Sayfa'}</Link>
          <span>/</span>
          <Link href="/koleksiyonlar" className="hover:text-[#0A0A0A] transition-colors">{lang === 'en' ? 'Collections' : 'Koleksiyonlar'}</Link>
          {category && <><span>/</span><span>{category}</span></>}
          <span>/</span>
          <span className="text-[#0A0A0A] font-semibold">{name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F4F0]">
            {product.image ? (
              <Image src={product.image} alt={name} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">{product.icon || '👕'}</div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {category && (
              <p className="text-[10px] tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>{category}</p>
            )}
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#0A0A0A] mb-3">{name}</h1>
            {price && <p className="text-2xl font-bold text-[#0A0A0A] mb-6">{price}</p>}
            {desc && (
              <p className="text-sm text-[#6B6B6B] leading-relaxed mb-6 border-b border-[#E5E5E3] pb-6">{desc}</p>
            )}

            <ProductActions product={product} waPhone={waPhone} />

            {material && (
              <div className="border-t border-[#E5E5E3] pt-6 mb-6">
                <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#0A0A0A] mb-3">{lang === 'en' ? 'Material & Care' : 'Kumaş & Bakım'}</h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{material}</p>
              </div>
            )}

            <div className="border-t border-[#E5E5E3] pt-6">
              <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#0A0A0A] mb-3">{lang === 'en' ? 'Details' : 'Detaylar'}</h3>
              <ul className="text-sm text-[#6B6B6B] space-y-1.5">
                <li>◦ {lang === 'en' ? 'Made in Turkey' : 'Türkiye\'de üretilmiştir'}</li>
                <li>◦ {lang === 'en' ? 'SKU' : 'Ürün Kodu'}: {product.sku || `TKU-${product._id?.slice(-6)?.toUpperCase()}`}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="py-16 px-6 bg-[#F5F4F0]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-lg font-black uppercase tracking-tight">{lang === 'en' ? 'You May Also Like' : 'Bunları da Beğenebilirsin'}</h2>
              <Link href="/koleksiyonlar" className="text-[11px] tracking-[0.1em] uppercase font-semibold border-b pb-0.5 hover:border-[#C8A882] hover:text-[#C8A882] transition-colors" style={{ color: '#0A0A0A', borderColor: '#0A0A0A' }}>
                {lang === 'en' ? 'View All →' : 'Tümünü Gör →'}
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
