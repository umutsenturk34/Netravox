import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPost } from '../api/client';
import { useLang, t } from '../hooks/useLang';
import Loader from '../components/ui/Loader';

export default function BlogPostPage() {
  const { slug }          = useParams();
  const { lang }          = useLang();
  const [post, setPost]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setPost(null);
    setNotFound(false);

    getBlogPost(slug)
      .then(data => {
        if (!data) { setNotFound(true); return; }
        setPost(data);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="pt-28"><Loader /></div>;

  if (notFound || !post) {
    return (
      <div className="pt-28 text-center py-20">
        <p className="text-[#6B6B6B] text-sm mb-4">
          {lang === 'en' ? 'Post not found.' : 'Yazı bulunamadı.'}
        </p>
        <Link
          to="/blog"
          className="text-xs font-bold uppercase tracking-widest border-b border-[#0A0A0A] pb-0.5 hover:border-[#C8A882] hover:text-[#C8A882] transition-colors"
        >
          ← {lang === 'en' ? 'Back to Blog' : 'Blog\'a Dön'}
        </Link>
      </div>
    );
  }

  const title     = t(post.title, lang);
  const excerpt   = t(post.excerpt, lang);
  const content   = t(post.content, lang);
  const published = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(lang === 'en' ? 'en-GB' : 'tr-TR', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null;

  return (
    <article className="max-w-3xl mx-auto px-6 pt-28 pb-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-[#6B6B6B] mb-8">
        <Link to="/" className="hover:text-[#0A0A0A] transition-colors">
          {lang === 'en' ? 'Home' : 'Ana Sayfa'}
        </Link>
        <span>/</span>
        <Link to="/blog" className="hover:text-[#0A0A0A] transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-[#0A0A0A] font-semibold truncate max-w-[200px]">{title}</span>
      </nav>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="text-[9px] tracking-[0.2em] uppercase font-semibold border px-2 py-0.5"
              style={{ color: '#C8A882', borderColor: 'rgba(200,168,130,0.3)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight mb-6 text-[#0A0A0A]">
        {title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-4 mb-10 text-sm text-[#6B6B6B]">
        {post.author && <span>{post.author}</span>}
        {post.author && published && <span>·</span>}
        {published && <span>{published}</span>}
      </div>

      {/* Cover image */}
      {post.coverImage && (
        <div className="relative overflow-hidden aspect-[16/9] mb-10">
          <img
            src={post.coverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Excerpt */}
      {excerpt && (
        <p
          className="text-lg leading-relaxed font-light mb-8 italic border-l-4 pl-5 text-[#6B6B6B]"
          style={{ borderColor: '#C8A882' }}
        >
          {excerpt}
        </p>
      )}

      {/* Content */}
      {content && (
        <div
          className="prose prose-lg max-w-none text-[#3A3A3A]"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      {/* Back link */}
      <div className="mt-16 pt-8 border-t border-[#E5E5E3]">
        <Link
          to="/blog"
          className="text-sm font-semibold uppercase tracking-widest hover:text-[#C8A882] transition-colors"
        >
          ← {lang === 'en' ? 'Back to Blog' : 'Blog\'a Dön'}
        </Link>
      </div>
    </article>
  );
}
