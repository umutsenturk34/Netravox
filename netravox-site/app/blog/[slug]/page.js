import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

async function getPost(slug) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
  const tenant = process.env.NEXT_PUBLIC_TENANT_SLUG || "netravox";
  try {
    const res = await fetch(`${apiUrl}/api/public/${tenant}/blog/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.seo?.metaTitle?.tr || post.title?.tr || "Blog — Netravox",
    description: post.seo?.metaDesc?.tr || post.excerpt?.tr || "",
    openGraph: post.seo?.ogImage ? { images: [post.seo.ogImage] } : undefined,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-28 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Tüm yazılar
          </Link>

          {/* Cover */}
          {post.coverImage && (
            <div className="aspect-video rounded-2xl overflow-hidden mb-8">
              <img src={post.coverImage} alt={post.title?.tr || ""} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Meta */}
          <div className="mb-6">
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.map((tag) => (
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
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
              {post.title?.tr}
            </h1>
            <div className="flex items-center gap-2 text-sm text-white/35">
              {post.author && <span>{post.author}</span>}
              {post.author && post.publishedAt && <span>·</span>}
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("tr-TR", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </time>
              )}
            </div>
          </div>

          {/* Content */}
          {post.content?.tr && (
            <div
              className="blog-content text-white/70 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content.tr }}
            />
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
