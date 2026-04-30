'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang, t } from '../../lib/lang';

export default function BlogClient({ posts, page }) {
  const { lang } = useLang();
  const pc = page?.content || {};
  const heroTitle    = t(pc.heroTitle, lang)    || 'Blog';
  const heroSubtitle = t(pc.heroSubtitle, lang) || (lang === 'en' ? 'From the Editor' : 'Editörden');

  return (
    <>
      <div className="bg-[#0A0A0A] text-white pt-28 pb-14 px-6 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{heroSubtitle}</p>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">{heroTitle}</h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {posts.length === 0 ? (
          <p className="text-center py-20 text-[#6B6B6B] text-sm">{lang === 'en' ? 'No blog posts yet.' : 'Henüz blog yazısı yok.'}</p>
        ) : (
          <div className={`grid gap-6 ${posts.length === 1 ? '' : posts.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
            {posts.map((post) => (
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
                    <div className="flex items-center gap-3 mb-3">
                      {post.tags?.[0] && (
                        <span className="text-[9px] tracking-[0.2em] uppercase font-semibold" style={{ color: 'var(--color-accent)' }}>{post.tags[0]}</span>
                      )}
                      {post.publishedAt && (
                        <span className="text-[10px]" style={{ color: '#6B6B6B' }}>
                          {new Date(post.publishedAt).toLocaleDateString(lang === 'en' ? 'en-GB' : 'tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                    <h2 className="text-sm font-bold leading-snug mb-2 group-hover:text-[#C8A882] transition-colors">{t(post.title, lang)}</h2>
                    <p className="text-xs line-clamp-2 leading-relaxed" style={{ color: '#6B6B6B' }}>{t(post.excerpt, lang)}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
