'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang, t } from '../../lib/lang';
import ProductCard from '../ui/ProductCard';

export default function HomeClient({ company, products, posts, page }) {
  const { lang } = useLang();
  const pc = page?.content || {};

  const name         = company?.name || 'TAKU';
  const heroImg      = pc.heroImageUrl      || company?.content?.heroImage || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80';
  const heroRaw      = t(pc.heroTitle, lang) || t(company?.content?.heroTitle, lang) || (lang === 'en' ? 'The Power\nOf Simplicity.' : 'Sadeliğin\nGücü.');
  const heroLines    = heroRaw.split('\n');
  const ctaText      = t(pc.ctaText, lang) || (lang === 'en' ? 'Explore Collection' : 'Koleksiyonu Keşfet');
  const ctaSecText   = t(pc.ctaSecondaryText, lang) || (lang === 'en' ? 'Our Story' : 'Hikayemiz');
  const ctaUrl       = pc.ctaUrl || '/koleksiyonlar';
  const announcement = t(pc.announcementText, lang) || (lang === 'en' ? 'Free shipping · Orders over 750 ₺ · 14-day free returns' : 'Ücretsiz kargo · 750 ₺ ve üzeri alışverişlerde · 14 gün koşulsuz iade');
  const storyRaw     = t(pc.storyTitle, lang) || (lang === 'en' ? 'Power from\nSimplicity' : 'Sadelikten\nGüç Doğar');
  const storyLines   = storyRaw.split('\n');
  const ctaBottomRaw = t(pc.ctaBottomTitle, lang) || (lang === 'en' ? 'Explore the\nCollection' : 'Koleksiyonu\nKeşfet');
  const ctaBottomLines = ctaBottomRaw.split('\n');
  const ctaBottomText  = t(pc.ctaBottomText, lang) || (lang === 'en' ? 'View All Products' : 'Tüm Ürünleri Gör');

  const desc        = t(company?.description, lang) || '';
  const p2          = t(company?.content?.aboutParagraph2, lang) || '';
  const featured    = (products || []).slice(0, 4);
  const latestPosts = (posts || []).slice(0, 3);
  const testimonial = company?.content?.testimonial;
  const values      = company?.content?.values || [];
  const homeImages  = company?.content?.homeImages?.filter(Boolean) || [];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
        <Image src={heroImg} alt={name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)' }} />
        <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase font-medium mb-6" style={{ color: 'var(--color-accent)' }}>
            {company?.contact?.city || 'İstanbul'} · Türkiye
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-8 tracking-tight">
            {heroLines.map((line, i) => <span key={i} className="block">{line}</span>)}
          </h1>
          <p className="text-sm md:text-base text-white/70 mb-10 max-w-md mx-auto leading-relaxed">{desc}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={ctaUrl} className="bg-white text-[#0A0A0A] text-xs font-bold tracking-[0.15em] uppercase px-10 py-4 hover:bg-[#C8A882] transition-colors duration-200">
              {ctaText}
            </Link>
            <Link href="/hakkimizda" className="border border-white/40 text-white text-xs font-bold tracking-[0.15em] uppercase px-10 py-4 hover:border-white hover:bg-white/10 transition-colors duration-200">
              {ctaSecText}
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <div className="w-px h-10 bg-white/20 animate-pulse" />
          <span className="text-[9px] tracking-[0.3em] uppercase">{lang === 'en' ? 'Scroll' : 'Kaydır'}</span>
        </div>
      </section>

      {/* ── Announcement bar ── */}
      <div className="bg-[#0A0A0A] text-white text-[10px] tracking-[0.2em] uppercase text-center py-3 font-medium">
        {announcement}
      </div>

      {/* ── Featured Products ── */}
      {featured.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: 'var(--color-accent)' }}>{lang === 'en' ? 'New Season' : 'Yeni Sezon'}</p>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">{lang === 'en' ? 'Featured' : 'Öne Çıkanlar'}</h2>
              </div>
              <Link href="/koleksiyonlar" className="text-[11px] tracking-[0.1em] uppercase font-semibold border-b pb-0.5 hover:border-[#C8A882] hover:text-[#C8A882] transition-colors" style={{ color: '#0A0A0A', borderColor: '#0A0A0A' }}>
                {lang === 'en' ? 'View All →' : 'Tümünü Gör →'}
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {featured.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Brand Story ── */}
      <section className="bg-[#0A0A0A] text-white py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>{lang === 'en' ? 'Who We Are' : 'Biz Kimiz'}</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight mb-6 tracking-tight">
              {storyLines.map((line, i) => <span key={i} className="block">{line}</span>)}
            </h2>
            <p className="text-white/60 leading-relaxed mb-6 text-sm">{desc}</p>
            {p2 && <p className="text-white/60 leading-relaxed mb-8 text-sm">{p2}</p>}
            <Link href="/hakkimizda" className="inline-block border border-white/30 text-white text-xs font-bold tracking-[0.15em] uppercase px-8 py-3.5 hover:bg-white hover:text-[#0A0A0A] transition-colors duration-200">
              {lang === 'en' ? 'Discover Our Brand' : 'Markamızı Tanı'}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(homeImages.length > 0 ? homeImages : [
              'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80',
              'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
              'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&q=80',
              'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80',
            ]).slice(0, 4).map((src, i) => (
              <div key={i} className={`relative overflow-hidden ${i % 2 === 1 ? 'mt-6' : ''}`} style={{ height: '13rem' }}>
                <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      {values.length > 0 && (
        <section className="py-20 px-6" style={{ background: '#F5F4F0' }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: 'var(--color-accent)' }}>{lang === 'en' ? `Why ${name}` : `Neden ${name}`}</p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">{lang === 'en' ? 'Details That Make a Difference' : 'Fark Yaratan Detaylar'}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl mb-4">{v.icon}</div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.1em] mb-2">{t(v.title, lang)}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#6B6B6B' }}>{t(v.description, lang)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonial ── */}
      {testimonial?.quote?.tr && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl font-black leading-none mb-6" style={{ color: 'var(--color-accent)' }}>"</div>
            <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-[#0A0A0A] mb-8 italic">
              {t(testimonial.quote, lang)}
            </blockquote>
            <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#0A0A0A]">{testimonial.author}</p>
            {testimonial.role && <p className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>{testimonial.role}</p>}
          </div>
        </section>
      )}

      {/* ── Blog Preview ── */}
      {latestPosts.length > 0 && (
        <section className="py-20 px-6" style={{ background: '#F5F4F0' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: 'var(--color-accent)' }}>{lang === 'en' ? 'From the Editor' : 'Editörden'}</p>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">{lang === 'en' ? 'Latest Posts' : 'Son Yazılar'}</h2>
              </div>
              <Link href="/blog" className="text-[11px] tracking-[0.1em] uppercase font-semibold border-b pb-0.5 hover:border-[#C8A882] hover:text-[#C8A882] transition-colors" style={{ color: '#0A0A0A', borderColor: '#0A0A0A' }}>
                {lang === 'en' ? 'All Posts →' : 'Tüm Yazılar →'}
              </Link>
            </div>
            <div className={`grid gap-6 ${latestPosts.length === 1 ? '' : latestPosts.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
              {latestPosts.map((post) => (
                <article key={post._id} className="group cursor-pointer bg-white">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="overflow-hidden aspect-video relative">
                      {post.coverImage ? (
                        <Image src={post.coverImage} alt={t(post.title, lang)} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                      ) : (
                        <div className="w-full h-full" style={{ background: '#E5E5E3' }} />
                      )}
                    </div>
                    <div className="p-5">
                      {post.tags?.[0] && <p className="text-[9px] tracking-[0.2em] uppercase font-semibold mb-2" style={{ color: 'var(--color-accent)' }}>{post.tags[0]}</p>}
                      <h3 className="text-sm font-bold leading-snug mb-2 group-hover:text-[#C8A882] transition-colors">{t(post.title, lang)}</h3>
                      <p className="text-xs line-clamp-2 leading-relaxed" style={{ color: '#6B6B6B' }}>{t(post.excerpt, lang)}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ── */}
      <section className="relative py-28 px-6 flex items-center justify-center text-center" style={{ background: '#0A0A0A' }}>
        <div className="relative z-10">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>{lang === 'en' ? 'New Season' : 'Yeni Sezon'}</p>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-6 tracking-tight">
            {ctaBottomLines.map((line, i) => <span key={i} className="block">{line}</span>)}
          </h2>
          <Link href="/koleksiyonlar" className="inline-block text-[#0A0A0A] text-xs font-bold tracking-[0.15em] uppercase px-12 py-4 hover:bg-white transition-colors duration-200" style={{ background: 'var(--color-accent)' }}>
            {ctaBottomText}
          </Link>
        </div>
      </section>
    </>
  );
}
