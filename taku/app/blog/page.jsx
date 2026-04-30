import { getBlog, getPageBySlug } from '../../lib/api';
import BlogClient from '../../components/pages/BlogClient';

export const metadata = { title: 'Blog' };

export default async function BlogPage() {
  const [posts, page] = await Promise.all([getBlog(), getPageBySlug('blog')]);
  return <BlogClient posts={posts || []} page={page} />;
}
