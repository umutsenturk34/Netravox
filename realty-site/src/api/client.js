const SLUG = import.meta.env.VITE_TENANT_SLUG || 'prime-gayrimenkul';
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

export const getCompany = () => req('/company');
export const getProperties = (params = '') => req(`/properties${params ? `?${params}` : ''}`);
export const getGallery = () => req('/gallery');
export const postContact = (body) => req('/contact', { method: 'POST', body: JSON.stringify(body) });
