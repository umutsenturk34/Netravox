import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlog } from '../api/client';
import Loader from '../components/ui/Loader';

export default function BlogPage() {
  const [posts,   setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlog()
      .then(setPosts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Header */}
      <div className="bg-[#0A0A0A] text-white pt-28 pb-14 px-6 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#C8A882] mb-3">Editörden</p>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Blog</h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {loading ? (
          <Loader />
        ) : posts.length === 0 ? (
          <p className="text-center text-[#6B6B6B] py-20">Henüz blog yazısı yok.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <article key={post._id} className={`group cursor-pointer ${i === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                <Link to={`/blog/${post.slug}`} className="block">
                  {/* Image */}
                  <div className="overflow-hidden bg-[#F5F4F0] aspect-[4/3] mb-5">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title?.tr || post.title || ''}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#E5E5E3]" />
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-3">
                    {post.tags?.length > 0 && (
                      <span className="text-[9px] tracking-[0.2em] uppercase font-semibold text-[#C8A882] border border-[#C8A882]/30 px-2 py-0.5">
                        {post.tags[0]}
                      </span>
                    )}
                    {post.publishedAt && (
                      <span className="text-[10px] text-[#6B6B6B]">
                        {new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                          day: 'numeric', month: 'long', year: 'numeric',
                        })}
                      </span>
                    )}
                  </div>

                  <h2 className="text-base font-bold leading-snug mb-2 group-hover:text-[#C8A882] transition-colors">
                    {post.title?.tr || post.title || ''}
                  </h2>
                  <p className="text-sm text-[#6B6B6B] line-clamp-2 leading-relaxed">
                    {post.excerpt?.tr || post.excerpt || ''}
                  </p>

                  <div className="mt-4 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#0A0A0A] border-b border-[#0A0A0A] inline-block pb-0.5 group-hover:border-[#C8A882] group-hover:text-[#C8A882] transition-colors">
                    Devamını Oku →
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
