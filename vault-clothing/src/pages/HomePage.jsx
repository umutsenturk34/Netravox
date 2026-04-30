import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCompany } from '../hooks/useCompany';
import { useLang, t } from '../hooks/useLang';
import { getProducts, getBlog } from '../api/client';
import ProductCard from '../components/ui/ProductCard';

export default function HomePage() {
  const { company } = useCompany();
  const { lang } = useLang();
  const [products, setProducts] = useState([]);
  const [posts,    setPosts]    = useState([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(() => {});
    getBlog().then(setPosts).catch(() => {});
  }, []);

  const name     = company?.name || 'VAULT';
  const heroImg  = company?.content?.heroImage || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80';
  const heroTitleRaw = t(company?.content?.heroTitle, lang) || (lang === 'en' ? 'Minimal Clothing.\nMaximal Impact.' : 'Minimal Giyim.\nMaksimal Etki.');
  const heroTitle = heroTitleRaw.split('\n');
  const desc     = t(company?.description, lang) || (lang === 'en' ? 'We redefine modern fashion with premium fabrics and timeless cuts.' : 'Premium kumaşlar ve zamansız kesimlerle modern giyim dünyasını yeniden tanımlıyoruz.');
  const featured = products.slice(0, 4);
  const quote    = t(company?.content?.testimonial?.quote, lang) || (lang === 'en' ? 'VAULT is not just a clothing brand — it\'s a minimal but powerful form of expression.' : 'VAULT sadece bir kıyafet markası değil; minimal ama güçlü bir ifade biçimi.');
  const quoteAuthor = company?.content?.testimonial?.author || 'Kerem Arslan';
  const quoteRole   = company?.content?.testimonial?.role || (lang === 'en' ? 'Customer' : 'Müşteri');
  const values   = company?.content?.values || [];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C8A882] mb-6 font-medium">
            {company?.contact?.city || 'İstanbul'} · Türkiye
          </p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-8 tracking-tight"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {heroTitle.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h1>
          <p className="text-sm md:text-base text-white/70 mb-10 max-w-md mx-auto leading-relaxed">
            {desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/koleksiyonlar"
              className="bg-white text-[#0A0A0A] text-xs font-bold tracking-[0.15em] uppercase px-10 py-4 hover:bg-[#C8A882] transition-colors duration-200"
            >
              {lang === 'en' ? 'Explore Collection' : 'Koleksiyonu Keşfet'}
            </Link>
            <Link
              to="/hakkimizda"
              className="border border-white/40 text-white text-xs font-bold tracking-[0.15em] uppercase px-10 py-4 hover:border-white hover:bg-white/10 transition-colors duration-200"
            >
              {lang === 'en' ? 'Our Story' : 'Hikayemiz'}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <div className="w-px h-10 bg-white/20 animate-pulse" />
          <span className="text-[9px] tracking-[0.3em] uppercase">{lang === 'en' ? 'Scroll' : 'Kaydır'}</span>
        </div>
      </section>

      {/* ── Announcement bar ── */}
      <div className="bg-[#0A0A0A] text-white text-[10px] tracking-[0.2em] uppercase text-center py-3 font-medium">
        {lang === 'en' ? 'Free shipping · Orders over 750 ₺' : 'Ücretsiz kargo · 750 ₺ ve üzeri alışverişlerde'}
        <span className="mx-4 text-[#C8A882]">·</span>
        {lang === 'en' ? '14-day free returns' : '14 gün koşulsuz iade'}
        <span className="mx-4 text-[#C8A882]">·</span>
        {lang === 'en' ? '2-4 business days nationwide' : 'Türkiye geneli 2-4 iş günü teslimat'}
      </div>

      {/* ── Öne Çıkan Ürünler ── */}
      {featured.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8A882] mb-2">{lang === 'en' ? 'New Season' : 'Yeni Sezon'}</p>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                  {lang === 'en' ? 'Featured' : 'Öne Çıkanlar'}
                </h2>
              </div>
              <Link to="/koleksiyonlar" className="text-[11px] tracking-[0.1em] uppercase font-semibold text-[#0A0A0A] border-b border-[#0A0A0A] hover:border-[#C8A882] hover:text-[#C8A882] transition-colors pb-0.5">
                {lang === 'en' ? 'View All →' : 'Tümünü Gör →'}
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {featured.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Brand Story ── */}
      <section className="bg-[#0A0A0A] text-white py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#C8A882] mb-4">{lang === 'en' ? 'Who We Are' : 'Biz Kimiz'}</p>
            <h2
              className="text-3xl md:text-5xl font-black uppercase leading-tight mb-6 tracking-tight"
            >
              {lang === 'en' ? <>Power from<br />Simplicity</> : <>Sadelikten<br />Güç Doğar</>}
            </h2>
            <p className="text-white/60 leading-relaxed mb-6 text-sm">
              {desc}
            </p>
            <p className="text-white/60 leading-relaxed mb-8 text-sm">
              {t(company?.content?.aboutParagraph2, lang) || (lang === 'en' ? 'Every product is designed with comfort and durability in mind, not just aesthetics.' : 'Her ürün, yalnızca estetik değil aynı zamanda konfor ve dayanıklılık düşünülerek tasarlanır.')}
            </p>
            <Link
              to="/hakkimizda"
              className="inline-block border border-white/30 text-white text-xs font-bold tracking-[0.15em] uppercase px-8 py-3.5 hover:bg-white hover:text-[#0A0A0A] transition-colors duration-200"
            >
              {lang === 'en' ? 'Discover Our Brand' : 'Markamızı Tanı'}
            </Link>
          </div>

          {/* Image grid */}
          <div className="grid grid-cols-2 gap-3">
            {(company?.content?.homeImages?.filter(Boolean) || [
              'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80',
              'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
              'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&q=80',
              'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80',
            ]).slice(0, 4).map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className={`w-full object-cover rounded-none ${
                  i % 2 === 1 ? 'mt-6 h-52' : 'h-52'
                } md:h-64`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Değerler ── */}
      {values.length > 0 && (
        <section className="py-20 px-6 bg-[#F5F4F0]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8A882] mb-2">{lang === 'en' ? 'Why VAULT' : 'Neden VAULT'}</p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">{lang === 'en' ? 'Details That Make a Difference' : 'Fark Yaratan Detaylar'}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl mb-4">{v.icon}</div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.1em] mb-2">{t(v.title, lang)}</h3>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">{t(v.description, lang)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonial ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl font-black text-[#C8A882] mb-6 leading-none">"</div>
          <blockquote
            className="text-xl md:text-2xl font-light leading-relaxed text-[#0A0A0A] mb-8"
            style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
          >
            {quote}
          </blockquote>
          <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#0A0A0A]">{quoteAuthor}</p>
          <p className="text-xs text-[#C8A882] mt-1">{quoteRole}</p>
        </div>
      </section>

      {/* ── Blog Preview ── */}
      {posts.length > 0 && (
        <section className="py-20 px-6 bg-[#F5F4F0]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8A882] mb-2">{lang === 'en' ? 'From the Editor' : 'Editörden'}</p>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">{lang === 'en' ? 'Latest Posts' : 'Son Yazılar'}</h2>
              </div>
              <Link to="/blog" className="text-[11px] tracking-[0.1em] uppercase font-semibold text-[#0A0A0A] border-b border-[#0A0A0A] hover:border-[#C8A882] hover:text-[#C8A882] transition-colors pb-0.5">
                {lang === 'en' ? 'All Posts →' : 'Tüm Yazılar →'}
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {posts.slice(0, 3).map(post => (
                <article key={post._id} className="group cursor-pointer bg-white">
                  <div className="overflow-hidden aspect-video">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#E5E5E3]" />
                    )}
                  </div>
                  <div className="p-5">
                    {post.tags?.length > 0 && (
                      <p className="text-[9px] tracking-[0.2em] uppercase text-[#C8A882] font-semibold mb-2">
                        {post.tags[0]}
                      </p>
                    )}
                    <h3 className="text-sm font-bold leading-snug mb-2 group-hover:text-[#C8A882] transition-colors">
                      {t(post.title, lang) || ''}
                    </h3>
                    <p className="text-xs text-[#6B6B6B] line-clamp-2 leading-relaxed">
                      {t(post.excerpt, lang) || ''}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ── */}
      <section
        className="relative py-28 px-6 flex items-center justify-center text-center overflow-hidden"
        style={{ background: '#0A0A0A' }}
      >
        <div className="relative z-10">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C8A882] mb-4">{lang === 'en' ? 'New Season' : 'Yeni Sezon'}</p>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-6 tracking-tight">
            {lang === 'en' ? <>Explore the<br />Collection</> : <>Koleksiyonu<br />Keşfet</>}
          </h2>
          <Link
            to="/koleksiyonlar"
            className="inline-block bg-[#C8A882] text-[#0A0A0A] text-xs font-bold tracking-[0.15em] uppercase px-12 py-4 hover:bg-white transition-colors duration-200"
          >
            {lang === 'en' ? 'View All Products' : 'Tüm Ürünleri Gör'}
          </Link>
        </div>
      </section>
    </>
  );
}
