import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct, getProducts } from '../api/client';
import { useLang, t } from '../hooks/useLang';
import { useCompany } from '../hooks/useCompany';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import Loader from '../components/ui/Loader';
import ProductCard from '../components/ui/ProductCard';

const CATEGORY_LABELS = {
  tr: { '👕': 'T-Shirts', '🧥': 'Hoodie & Dış Giyim', '🧢': 'Aksesuar', '👜': 'Aksesuar' },
  en: { '👕': 'T-Shirts', '🧥': 'Hoodies & Outerwear', '🧢': 'Accessories', '👜': 'Accessories' },
};

const DEFAULT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetailPage() {
  const { id }          = useParams();
  const { lang }        = useLang();
  const { company }     = useCompany();
  const [product, setProduct]         = useState(null);
  const [related, setRelated]         = useState([]);
  const [loading, setLoading]         = useState(true);
  const [selectedSize, setSize]       = useState(null);
  const [sizeGuideOpen, setSizeGuide] = useState(false);

  useEffect(() => {
    setLoading(true);
    setProduct(null);
    setSize(null);

    getProduct(id)
      .then(setProduct)
      .catch(() => {})
      .finally(() => setLoading(false));

    getProducts()
      .then(all => setRelated(all.filter(p => p._id !== id).slice(0, 4)))
      .catch(() => {});
  }, [id]);

  if (loading) return <div className="pt-28"><Loader /></div>;
  if (!product) return (
    <div className="pt-28 text-center py-20">
      <p className="text-[#6B6B6B] text-sm">
        {lang === 'en' ? 'Product not found.' : 'Ürün bulunamadı.'}
      </p>
      <Link to="/koleksiyonlar" className="mt-4 inline-block text-xs font-bold uppercase tracking-widest border-b border-[#0A0A0A] pb-0.5">
        ← {lang === 'en' ? 'Back to Collections' : 'Koleksiyonlara Dön'}
      </Link>
    </div>
  );

  const name     = t(product.name, lang);
  const desc     = t(product.description, lang);
  const fullDesc = t(product.fullDescription, lang);
  const material = t(product.material, lang);
  const category = CATEGORY_LABELS[lang]?.[product.icon] || '';

  // Build size list: use CMS-defined sizes if available, otherwise show default list
  const hasSizes = product.sizes && product.sizes.length > 0;
  const sizeList = hasSizes
    ? product.sizes
    : DEFAULT_SIZES.map(name => ({ name, inStock: true }));

  const sizeGuideText  = t(product.sizeGuide, lang);
  const sizeGuideImage = product.sizeGuideImage;
  const hasSizeGuide   = sizeGuideText || sizeGuideImage;

  const waPhone = company?.contact?.whatsapp || company?.contact?.phone;
  const waMessage = selectedSize
    ? (lang === 'en'
        ? `Hello, I'd like to order "${name}" in size ${selectedSize}.`
        : `Merhaba, "${name}" ürününü ${selectedSize} beden sipariş etmek istiyorum.`)
    : (lang === 'en'
        ? `Hello, I'd like to get information about "${name}".`
        : `Merhaba, "${name}" ürünü hakkında bilgi almak istiyorum.`);
  const waUrl = buildWhatsAppUrl(waPhone, waMessage);

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-20 pb-0 px-6 max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-[#6B6B6B] mt-4 mb-8">
          <Link to="/" className="hover:text-[#0A0A0A] transition-colors">
            {lang === 'en' ? 'Home' : 'Ana Sayfa'}
          </Link>
          <span>/</span>
          <Link to="/koleksiyonlar" className="hover:text-[#0A0A0A] transition-colors">
            {lang === 'en' ? 'Collections' : 'Koleksiyonlar'}
          </Link>
          {category && <><span>/</span><span>{category}</span></>}
          <span>/</span>
          <span className="text-[#0A0A0A] font-semibold">{name}</span>
        </nav>
      </div>

      {/* Main product area */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

          {/* Image */}
          <div className="aspect-[3/4] bg-[#F5F4F0] overflow-hidden relative">
            {product.image ? (
              <img
                src={product.image}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">
                {product.icon || '👕'}
              </div>
            )}
            {!product.isActive && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-xs font-bold tracking-widest uppercase bg-black/60 px-4 py-2">
                  {lang === 'en' ? 'Out of Stock' : 'Stok Dışı'}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {category && (
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8A882] font-semibold mb-3">
                {category}
              </p>
            )}
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#0A0A0A] mb-3">
              {name}
            </h1>

            {product.price && (
              <p className="text-2xl font-bold text-[#0A0A0A] mb-6">
                {product.price.toLocaleString('tr-TR')} ₺
              </p>
            )}

            {/* Short description */}
            {desc && (
              <p className="text-sm text-[#6B6B6B] leading-relaxed mb-6 border-b border-[#E5E5E3] pb-6">
                {desc}
              </p>
            )}

            {/* Size selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#0A0A0A]">
                  {lang === 'en' ? 'Size' : 'Beden'}
                  {selectedSize && (
                    <span className="ml-2 font-normal text-[#6B6B6B]">— {selectedSize}</span>
                  )}
                </p>
                {hasSizeGuide && (
                  <button
                    onClick={() => setSizeGuide(true)}
                    className="text-[10px] text-[#C8A882] underline hover:no-underline"
                  >
                    {lang === 'en' ? 'Size Guide' : 'Beden Rehberi'}
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {sizeList.map(({ name, inStock }) => (
                  <button
                    key={name}
                    onClick={() => inStock && setSize(name)}
                    disabled={!inStock}
                    className={`w-12 h-12 text-xs font-bold border transition-all relative ${
                      !inStock
                        ? 'bg-[#F5F4F0] text-[#C0C0C0] border-[#E5E5E3] cursor-not-allowed line-through'
                        : selectedSize === name
                        ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                        : 'bg-white text-[#0A0A0A] border-[#E5E5E3] hover:border-[#0A0A0A]'
                    }`}
                    title={!inStock ? (lang === 'en' ? 'Out of stock' : 'Stok yok') : name}
                  >
                    {name}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-[10px] text-[#C8A882] mt-2">
                  {lang === 'en' ? 'Select a size — it will be included in your WhatsApp message' : 'Beden seçin — WhatsApp mesajınıza otomatik eklenir'}
                </p>
              )}
            </div>

            {/* WhatsApp order button */}
            {waUrl ? (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 text-sm font-bold tracking-[0.15em] uppercase transition-colors mb-4 bg-[#25D366] text-white hover:bg-[#1ebe5d]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {lang === 'en' ? 'Order via WhatsApp' : 'WhatsApp\'tan Sipariş Ver'}
              </a>
            ) : (
              <a
                href="/iletisim"
                className="flex items-center justify-center w-full py-4 text-sm font-bold tracking-[0.15em] uppercase transition-colors mb-4 bg-[#0A0A0A] text-white hover:bg-[#C8A882] hover:text-[#0A0A0A]"
              >
                {lang === 'en' ? 'Contact Us' : 'İletişime Geç'}
              </a>
            )}

            {!selectedSize && waUrl && (
              <p className="text-[10px] text-[#C8A882] text-center -mt-3 mb-4">
                {lang === 'en' ? 'Select a size to include it in your message' : 'Beden seçerseniz mesajınıza otomatik eklenir'}
              </p>
            )}

            <p className="text-[10px] text-[#9A9A9A] text-center mb-8">
              {lang === 'en'
                ? '📱 Quick response via WhatsApp · Safe & easy ordering'
                : '📱 WhatsApp üzerinden hızlı yanıt · Güvenli ve kolay sipariş'}
            </p>

            {/* Full description from CMS */}
            {fullDesc && (
              <div className="border-t border-[#E5E5E3] pt-6 mb-6">
                <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#0A0A0A] mb-3">
                  {lang === 'en' ? 'Description' : 'Ürün Detayı'}
                </h3>
                <div
                  className="text-sm text-[#6B6B6B] leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: fullDesc }}
                />
              </div>
            )}

            {/* Material info */}
            {material && (
              <div className="border-t border-[#E5E5E3] pt-6 mb-6">
                <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#0A0A0A] mb-3">
                  {lang === 'en' ? 'Material & Care' : 'Kumaş & Bakım'}
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{material}</p>
              </div>
            )}

            {/* GSM info if in description */}
            <div className="border-t border-[#E5E5E3] pt-6">
              <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#0A0A0A] mb-3">
                {lang === 'en' ? 'Details' : 'Detaylar'}
              </h3>
              <ul className="text-sm text-[#6B6B6B] space-y-1.5">
                {product.duration && (
                  <li>◦ {lang === 'en' ? 'Collection' : 'Koleksiyon'}: {product.duration}</li>
                )}
                <li>◦ {lang === 'en' ? 'Made in Turkey' : 'Türkiye\'de üretilmiştir'}</li>
                <li>◦ {lang === 'en' ? 'SKU' : 'Ürün Kodu'}: {product.sku || `VLT-${product._id?.slice(-6)?.toUpperCase()}`}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-16 px-6 bg-[#F5F4F0]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-lg font-black uppercase tracking-tight">
                {lang === 'en' ? 'You May Also Like' : 'Bunları da Beğenebilirsin'}
              </h2>
              <Link to="/koleksiyonlar" className="text-[11px] tracking-[0.1em] uppercase font-semibold text-[#0A0A0A] border-b border-[#0A0A0A] hover:border-[#C8A882] hover:text-[#C8A882] transition-colors pb-0.5">
                {lang === 'en' ? 'View All →' : 'Tümünü Gör →'}
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      {sizeGuideOpen && hasSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSizeGuide(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="relative bg-white max-w-lg w-full max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E5E3]">
              <h2 className="text-sm font-black uppercase tracking-[0.15em]">
                {lang === 'en' ? 'Size Guide' : 'Beden Rehberi'}
              </h2>
              <button
                onClick={() => setSizeGuide(false)}
                className="w-7 h-7 flex items-center justify-center text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors text-xl leading-none"
              >
                ×
              </button>
            </div>
            {/* Content */}
            <div className="px-6 py-6 space-y-5">
              {sizeGuideImage && (
                <img
                  src={sizeGuideImage}
                  alt={lang === 'en' ? 'Size Guide' : 'Beden Rehberi'}
                  className="w-full rounded"
                />
              )}
              {sizeGuideText && (
                <pre className="text-sm text-[#3A3A3A] leading-relaxed whitespace-pre-wrap font-sans">
                  {sizeGuideText}
                </pre>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
