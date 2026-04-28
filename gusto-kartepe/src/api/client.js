const SLUG = import.meta.env.VITE_TENANT_SLUG || 'gusto-kartepe';
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
export const getMenu = () => req('/menu');
export const getGallery = () => req('/gallery');
export const postReservation = (body) => req('/reservation', { method: 'POST', body: JSON.stringify(body) });
export const postContact = (body) => req('/contact', { method: 'POST', body: JSON.stringify(body) });
