import { getProducts, getBlog } from '../lib/api';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://taku.com.tr';

export default async function sitemap() {
  const [products, posts] = await Promise.all([getProducts(), getBlog()]);

  const staticRoutes = ['/', '/koleksiyonlar', '/hakkimizda', '/blog', '/iletisim'].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.8,
  }));

  const productRoutes = (products || []).map((p) => ({
    url: `${BASE_URL}/koleksiyonlar/${p._id}`,
    lastModified: new Date(p.updatedAt || Date.now()),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const blogRoutes = (posts || []).map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt || p.publishedAt || Date.now()),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
