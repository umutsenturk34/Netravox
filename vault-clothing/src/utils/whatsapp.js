export function buildWhatsAppUrl(phone, message = '') {
  if (!phone) return null;
  const cleaned = phone.replace(/\D/g, '');
  if (!cleaned) return null;
  const number = cleaned.startsWith('90') ? cleaned : `90${cleaned.replace(/^0/, '')}`;
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
