// Server-only — bu dosyayı client component'lere import etme
const BASE = process.env.BACKEND_URL;
const SLUG = process.env.TENANT_SLUG;

async function get(path, options = {}) {
  const res = await fetch(`${BASE}/api/public/${SLUG}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  if (!res.ok) return null;
  return res.json();
}

export const getCompany       = () => get('/company',                { next: { revalidate: 3600,  tags: ['company'] } });
export const getNavigation    = () => get('/navigation',             { next: { revalidate: 3600,  tags: ['navigation'] } });
export const getPages         = () => get('/pages',                  { next: { revalidate: 3600,  tags: ['pages'] } });
export const getPageContent   = (template) => get(`/pages?template=${template}`, { next: { revalidate: 3600, tags: [`page-${template}`] } });
export const getPageBySlug    = (slug)     => get(`/pages/${slug}`,              { next: { revalidate: 3600, tags: [`page-${slug}`] } });
export const getProducts   = () => get('/services',    { next: { revalidate: 1800,  tags: ['products'] } });
export const getProduct    = (id) => get(`/services/${id}`, { next: { revalidate: 1800, tags: [`product-${id}`] } });
export const getBlog       = () => get('/blog',        { next: { revalidate: 3600,  tags: ['blog'] } });
export const getBlogPost   = (slug) => get(`/blog/${slug}`, { next: { revalidate: 3600, tags: [`blog-${slug}`] } });
export const getFaqs       = () => get('/faqs',        { next: { revalidate: 86400, tags: ['faqs'] } });
export const getGallery    = () => get('/gallery',     { next: { revalidate: 3600,  tags: ['gallery'] } });

// Contact formu server action'dan çağrılır — aynı BASE/SLUG kullanır
export async function postContact(body) {
  const res = await fetch(`${BASE}/api/public/${SLUG}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gönderme başarısız');
  return data;
}
