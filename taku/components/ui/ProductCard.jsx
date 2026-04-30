'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLang, t } from '../../lib/lang';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const { lang } = useLang();

  const name  = t(product.name, lang) || product.name || '';
  const desc  = t(product.description, lang) || '';
  const price = product.price;

  return (
    <Link
      href={`/koleksiyonlar/${product._id}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden aspect-[3/4] mb-4" style={{ background: '#F5F4F0' }}>
        {product.image ? (
          <Image
            src={product.image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700"
            style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-30">
            {product.icon || '👕'}
          </div>
        )}
        <div
          className="absolute inset-x-0 bottom-0 text-white text-xs font-bold tracking-[0.1em] uppercase text-center py-3.5 transition-transform duration-300"
          style={{ background: '#0A0A0A', transform: hovered ? 'translateY(0)' : 'translateY(100%)' }}
        >
          {lang === 'en' ? 'View Product' : 'Ürünü Gör'}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold tracking-wide mb-1 transition-colors" style={{ color: hovered ? 'var(--color-accent)' : '#0A0A0A' }}>
          {name}
        </h3>
        {desc && <p className="text-xs line-clamp-1 mb-2" style={{ color: '#6B6B6B' }}>{desc}</p>}
        {price && (
          <p className="text-sm font-bold" style={{ color: '#0A0A0A' }}>
            {price.toLocaleString('tr-TR')} ₺
          </p>
        )}
      </div>
    </Link>
  );
}
