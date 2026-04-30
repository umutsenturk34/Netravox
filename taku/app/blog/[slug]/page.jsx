import { notFound } from 'next/navigation';
import { getBlogPost, getBlog } from '../../../lib/api';
import BlogPostClient from '../../../components/pages/BlogPostClient';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: 'Bulunamadı' };
  return {
    title: post.seo?.metaTitle?.tr || post.title?.tr,
    description: post.seo?.metaDesc?.tr || post.excerpt?.tr,
    openGraph: { images: post.coverImage ? [{ url: post.coverImage }] : [] },
  };
}

export async function generateStaticParams() {
  const posts = await getBlog() || [];
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  return <BlogPostClient post={post} />;
}
