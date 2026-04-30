'use client';

import { useState } from 'react';
import { useLang, t } from '../../lib/lang';

export default function ProductActions({ product, waPhone }) {
  const [selectedSize, setSize]       = useState(null);
  const [sizeGuideOpen, setSizeGuide] = useState(false);
  const { lang } = useLang();

  const name      = t(product.name, lang) || product.name || '';
  const hasSizes  = product.sizes?.length > 0;
  const sizeList  = hasSizes
    ? product.sizes
    : ['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((n) => ({ name: n, inStock: true }));

  const sizeGuideText  = t(product.sizeGuide, lang) || '';
  const sizeGuideImage = product.sizeGuideImage || '';
  const hasSizeGuide   = sizeGuideText || sizeGuideImage;

  const cleanNum  = waPhone?.replace(/\D/g, '');
  const waMessage = selectedSize
    ? (lang === 'en'
        ? `Hello, I'd like to order "${name}" in size ${selectedSize}.`
        : `Merhaba, "${name}" ürününü ${selectedSize} beden sipariş etmek istiyorum.`)
    : (lang === 'en'
        ? `Hello, I'd like to get information about "${name}".`
        : `Merhaba, "${name}" ürünü hakkında bilgi almak istiyorum.`);
  const waUrl = cleanNum ? `https://wa.me/${cleanNum}?text=${encodeURIComponent(waMessage)}` : null;

  return (
    <>
      {/* Size selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#0A0A0A]">
            {lang === 'en' ? 'Size' : 'Beden'}
            {selectedSize && <span className="ml-2 font-normal text-[#6B6B6B]">— {selectedSize}</span>}
          </p>
          {hasSizeGuide && (
            <button onClick={() => setSizeGuide(true)} className="text-[10px] underline hover:no-underline" style={{ color: 'var(--color-accent)' }}>
              {lang === 'en' ? 'Size Guide' : 'Beden Rehberi'}
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {sizeList.map(({ name: s, inStock }) => (
            <button
              key={s}
              onClick={() => inStock && setSize(s)}
              disabled={!inStock}
              className="w-12 h-12 text-xs font-bold border transition-all"
              style={{
                background:    !inStock ? '#F5F4F0' : selectedSize === s ? '#0A0A0A' : 'white',
                color:         !inStock ? '#C0C0C0' : selectedSize === s ? 'white' : '#0A0A0A',
                borderColor:   !inStock ? '#E5E5E3' : selectedSize === s ? '#0A0A0A' : '#E5E5E3',
                cursor:        !inStock ? 'not-allowed' : 'pointer',
                textDecoration: !inStock ? 'line-through' : 'none',
              }}
            >
              {s}
            </button>
          ))}
        </div>
        {!selectedSize && (
          <p className="text-[10px] mt-2" style={{ color: 'var(--color-accent)' }}>
            {lang === 'en' ? 'Select a size — it will be included in your WhatsApp message' : 'Beden seçin — WhatsApp mesajınıza otomatik eklenir'}
          </p>
        )}
      </div>

      {/* WhatsApp order button */}
      {waUrl ? (
        <a href={waUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full py-4 text-sm font-bold tracking-[0.15em] uppercase transition-colors mb-4"
          style={{ background: '#25D366', color: 'white' }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {lang === 'en' ? 'Order via WhatsApp' : 'WhatsApp\'tan Sipariş Ver'}
        </a>
      ) : (
        <a href="/iletisim" className="flex items-center justify-center w-full py-4 text-sm font-bold tracking-[0.15em] uppercase transition-colors mb-4 bg-[#0A0A0A] text-white hover:bg-[#C8A882] hover:text-[#0A0A0A]">
          {lang === 'en' ? 'Contact Us' : 'İletişime Geç'}
        </a>
      )}

      <p className="text-[10px] text-[#9A9A9A] text-center mb-6">
        {lang === 'en' ? '📱 Quick response via WhatsApp · Safe & easy ordering' : '📱 WhatsApp üzerinden hızlı yanıt · Güvenli ve kolay sipariş'}
      </p>

      {/* Size Guide Modal */}
      {sizeGuideOpen && hasSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSizeGuide(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative bg-white max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E5E3]">
              <h2 className="text-sm font-black uppercase tracking-[0.15em]">{lang === 'en' ? 'Size Guide' : 'Beden Rehberi'}</h2>
              <button onClick={() => setSizeGuide(false)} className="w-7 h-7 flex items-center justify-center text-[#6B6B6B] hover:text-[#0A0A0A] text-xl">×</button>
            </div>
            <div className="px-6 py-6 space-y-5">
              {sizeGuideImage && <img src={sizeGuideImage} alt={lang === 'en' ? 'Size Guide' : 'Beden Rehberi'} className="w-full" />}
              {sizeGuideText && <pre className="text-sm text-[#3A3A3A] leading-relaxed whitespace-pre-wrap font-sans">{sizeGuideText}</pre>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
