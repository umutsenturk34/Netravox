'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang, t } from '../../lib/lang';

export default function BlogPostClient({ post }) {
  const { lang } = useLang();

  const title   = t(post.title, lang);
  const excerpt = t(post.excerpt, lang);
  const content = t(post.content, lang);

  return (
    <article className="max-w-3xl mx-auto px-6 pt-28 pb-20">
      <nav className="flex items-center gap-2 text-xs mb-8 opacity-40">
        <Link href="/">{lang === 'en' ? 'Home' : 'Ana Sayfa'}</Link>
        <span>/</span>
        <Link href="/blog">Blog</Link>
        <span>/</span>
        <span>{title}</span>
      </nav>

      <div className="flex gap-2 flex-wrap mb-4">
        {post.tags?.map((tag) => (
          <span key={tag} className="text-[9px] tracking-[0.2em] uppercase font-semibold border px-2 py-0.5" style={{ color: 'var(--color-accent)', borderColor: 'rgba(200,168,130,0.3)' }}>
            {tag}
          </span>
        ))}
      </div>

      <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight mb-6">{title}</h1>

      <div className="flex items-center gap-4 mb-10 text-sm opacity-50">
        {post.author && <span>{post.author}</span>}
        {post.publishedAt && (
          <span>{new Date(post.publishedAt).toLocaleDateString(lang === 'en' ? 'en-GB' : 'tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        )}
      </div>

      {post.coverImage && (
        <div className="relative aspect-[16/9] overflow-hidden mb-10">
          <Image src={post.coverImage} alt={title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 768px" />
        </div>
      )}

      {excerpt && (
        <p className="text-lg leading-relaxed font-light mb-8 opacity-70 italic border-l-4 pl-5" style={{ borderColor: 'var(--color-accent)' }}>
          {excerpt}
        </p>
      )}

      {content && (
        <div className="prose prose-lg max-w-none" style={{ '--tw-prose-body': 'var(--color-primary)', '--tw-prose-headings': 'var(--color-primary)' }} dangerouslySetInnerHTML={{ __html: content }} />
      )}

      <div className="mt-16 pt-8 border-t" style={{ borderColor: 'rgba(10,10,10,0.1)' }}>
        <Link href="/blog" className="text-sm font-semibold uppercase tracking-widest hover:opacity-60 transition-opacity">
          ← {lang === 'en' ? 'Back to Blog' : 'Blog\'a Dön'}
        </Link>
      </div>
    </article>
  );
}
