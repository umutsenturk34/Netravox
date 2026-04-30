const SLUG = import.meta.env.VITE_TENANT_SLUG || 'vault-clothing';
const BASE = (import.meta.env.VITE_API_URL || '') + `/api/public/${SLUG}`;

async function req(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'İstek başarısız');
  return data;
}

export const getCompany      = ()      => req('/company');
export const getProducts     = ()      => req('/services');
export const getProduct      = (id)    => req(`/services/${id}`);
export const getPages        = ()      => req('/pages');
export const getGallery      = ()      => req('/gallery');
export const getBlog         = ()      => req('/blog');
export const getBlogPost     = (slug)  => req(`/blog/${slug}`);
export const getFaqs         = ()      => req('/faqs');
export const postContact     = (body)  => req('/contact', { method: 'POST', body: JSON.stringify(body) });
