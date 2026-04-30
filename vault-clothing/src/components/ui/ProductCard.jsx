import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../hooks/useLang';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const { lang } = useLang();

  const name  = product?.name?.[lang]  || product?.name?.tr  || product?.name  || '';
  const desc  = product?.description?.[lang] || product?.description?.tr || product?.description || '';
  const price = product?.price;
  const img   = product?.image;

  return (
    <Link
      to={`/koleksiyonlar/${product._id}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#F5F4F0] aspect-[3/4] mb-4">
        {img ? (
          <img
            src={img}
            alt={name}
            className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? 'scale-105' : 'scale-100'}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            {product?.icon || '👕'}
          </div>
        )}
        {/* Quick view overlay */}
        <div className={`absolute inset-x-0 bottom-0 bg-[#0A0A0A] text-white text-xs font-bold tracking-[0.1em] uppercase text-center py-3.5 transition-transform duration-300 ${hovered ? 'translate-y-0' : 'translate-y-full'}`}>
          {lang === 'en' ? 'View Product' : 'Ürünü Gör'}
        </div>
      </div>

      {/* Info */}
      <div>
        <h3 className="text-sm font-semibold tracking-wide text-[#0A0A0A] mb-1 group-hover:text-[#C8A882] transition-colors">{name}</h3>
        {desc && (
          <p className="text-xs text-[#6B6B6B] line-clamp-1 mb-2">{desc}</p>
        )}
        {price && (
          <p className="text-sm font-bold text-[#0A0A0A]">
            {price.toLocaleString('tr-TR')} ₺
          </p>
        )}
      </div>
    </Link>
  );
}
