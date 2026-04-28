import { useState } from 'react';
import { useCompany } from '../hooks/useCompany';
import { postContact } from '../api/client';

const socialLabels = { instagram: 'Instagram', facebook: 'Facebook', twitter: 'Twitter / X', youtube: 'YouTube', tiktok: 'TikTok' };

export default function ContactPage() {
  const { company } = useCompany();
  const [form, setForm] = useState({ name: '', email: '', message: '', kvkkConsent: false });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await postContact(form);
      setSent(true);
    } catch (err) {
      setError(err.message || 'Bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-[#E8E4E0] rounded px-4 py-3 text-sm outline-none focus:border-[#8B1A1A] focus:ring-2 focus:ring-[#8B1A1A]/10 transition-all";
  const labelClass = "block text-xs font-semibold uppercase tracking-wide text-[#6B6B6B] mb-1.5";
  const contact = company?.contact || {};
  const social = company?.socialLinks || {};
  const hours = company?.workingHours || [];

  return (
    <>
      <div className="bg-[#FAF8F5] py-14 text-center border-b border-[#E8E4E0]">
        <p className="text-xs tracking-[0.3em] uppercase text-[#8B1A1A] mb-2">Bize Ulaşın</p>
        <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>İletişim</h1>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-14">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-serif)' }}>Bilgilerimiz</h2>
            <div className="space-y-5">
              {contact.address && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E8E4E0] flex items-center justify-center shrink-0 text-sm">📍</div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#8B1A1A] mb-1">Adres</p>
                    <p className="text-sm text-[#6B6B6B]">{[contact.address, contact.city, contact.country].filter(Boolean).join(', ')}</p>
                  </div>
                </div>
              )}
              {contact.phone && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E8E4E0] flex items-center justify-center shrink-0 text-sm">📞</div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#8B1A1A] mb-1">Telefon</p>
                    <p className="text-sm text-[#6B6B6B]">{contact.phone}</p>
                  </div>
                </div>
              )}
              {contact.email && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E8E4E0] flex items-center justify-center shrink-0 text-sm">✉</div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#8B1A1A] mb-1">E-posta</p>
                    <p className="text-sm text-[#6B6B6B]">{contact.email}</p>
                  </div>
                </div>
              )}
              {hours.length > 0 && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E8E4E0] flex items-center justify-center shrink-0 text-sm">🕐</div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#8B1A1A] mb-1">Çalışma Saatleri</p>
                    {hours.map((h, i) => <p key={i} className="text-sm text-[#6B6B6B]">{h.days}: {h.hours}</p>)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sosyal medya */}
          {Object.values(social).some(Boolean) && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[#9A9A9A] mb-3">Sosyal Medya</h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(social).map(([key, url]) =>
                  url ? (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                      className="text-sm px-4 py-2 border border-[#E8E4E0] rounded hover:border-[#8B1A1A] hover:text-[#8B1A1A] transition-colors">
                      {socialLabels[key] || key}
                    </a>
                  ) : null
                )}
              </div>
            </div>
          )}

          {contact.mapUrl ? (
            <div className="rounded-xl overflow-hidden border border-[#E8E4E0] h-52">
              <iframe src={contact.mapUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy" title="Harita" />
            </div>
          ) : (
            <div className="rounded-xl overflow-hidden border border-[#E8E4E0] bg-[#FAF8F5] h-52 flex items-center justify-center">
              <p className="text-sm text-[#9A9A9A]">📍 {[contact.city, contact.country].filter(Boolean).join(', ') || 'Kartepe, Kocaeli'}</p>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-serif)' }}>Mesaj Gönderin</h2>
          {sent ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 text-xl">✓</div>
              <h3 className="font-bold mb-1" style={{ fontFamily: 'var(--font-serif)' }}>Mesajınız İletildi</h3>
              <p className="text-sm text-[#6B6B6B]">En kısa sürede geri dönüş yapacağız.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>Ad Soyad *</label>
                <input required value={form.name} onChange={set('name')} placeholder="Ahmet Yılmaz" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>E-posta *</label>
                <input required type="email" value={form.email} onChange={set('email')} placeholder="ornek@email.com" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Mesajınız *</label>
                <textarea required value={form.message} onChange={set('message')} rows={5} placeholder="Sormak istediğiniz bir şey mi var?" className={`${inputClass} resize-none`} />
              </div>
              {error && <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded">{error}</p>}
              <div className="flex items-start gap-3">
                <input required type="checkbox" id="kvkk2" checked={form.kvkkConsent} onChange={set('kvkkConsent')} className="mt-0.5 accent-[#8B1A1A]" />
                <label htmlFor="kvkk2" className="text-xs text-[#6B6B6B] leading-relaxed">
                  <a href="#" className="text-[#8B1A1A] hover:underline">Kişisel verilerin işlenmesine</a> ilişkin metni okudum. *
                </label>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[#8B1A1A] hover:bg-[#6B1117] disabled:opacity-60 text-white font-semibold py-3.5 rounded transition-colors">
                {loading ? 'Gönderiliyor...' : 'Gönder'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
