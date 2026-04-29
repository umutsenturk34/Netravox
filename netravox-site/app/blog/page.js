import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Blog — Netravox",
  description: "Web sitesi yönetimi, dijital pazarlama ve yerel işletmeler için ipuçları.",
};

async function getPosts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
  const slug = process.env.NEXT_PUBLIC_TENANT_SLUG || "netravox";
  try {
    const res = await fetch(`${apiUrl}/api/public/${slug}/blog`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-28 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-14 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/25 bg-indigo-500/8 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-5">
              Blog
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              Makaleler & Rehberler
            </h1>
            <p className="text-white/45 max-w-lg mx-auto text-lg">
              Web sitesi yönetimi, SEO ve dijital büyüme hakkında pratik içerikler.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/30 text-lg">Henüz blog yazısı yok. Yakında!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="group block p-px rounded-2xl transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(255,255,255,0.05), transparent)",
                  }}
                >
                  <div className="rounded-2xl overflow-hidden bg-[#08080f] h-full flex flex-col">
                    {post.coverImage && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title?.tr || ""}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      {post.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded text-[10px] font-semibold"
                              style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc" }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <h2 className="text-base font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors leading-snug">
                        {post.title?.tr || ""}
                      </h2>
                      {post.excerpt?.tr && (
                        <p className="text-sm text-white/45 leading-relaxed flex-1 line-clamp-3">
                          {post.excerpt.tr}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-4 text-xs text-white/30">
                        {post.author && <span>{post.author}</span>}
                        {post.author && post.publishedAt && <span>·</span>}
                        {post.publishedAt && (
                          <span>
                            {new Date(post.publishedAt).toLocaleDateString("tr-TR", {
                              day: "numeric", month: "long", year: "numeric",
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
