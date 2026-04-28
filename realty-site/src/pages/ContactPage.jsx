import { useState } from 'react';
import { useCompany } from '../hooks/useCompany';
import { postContact } from '../api/client';

export default function ContactPage() {
  const { company } = useCompany();
  const [form, setForm] = useState({ name: '', email: '', message: '', kvkkConsent: false });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try { await postContact(form); setSent(true); }
    catch (err) { setError(err.message || 'Bir hata oluştu.'); }
    finally { setLoading(false); }
  };

  const inputClass = "w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/10 transition-all bg-white";
  const labelClass = "block text-xs font-semibold uppercase tracking-wide text-[#64748B] mb-1.5";
  const contact = company?.contact || {};
  const hours = company?.workingHours || [];
  const social = company?.socialLinks || {};

  return (
    <>
      <div className="bg-[#0F172A] py-16 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-[#C9A96E] font-semibold mb-3">Bize Ulaşın</p>
        <h1 className="text-4xl text-white">İletişim</h1>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-14">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl text-[#0F172A] mb-6">Bilgilerimiz</h2>
            <div className="space-y-4">
              {[
                { show: contact.address, icon: '📍', label: 'Adres', text: [contact.address, contact.city, contact.country].filter(Boolean).join(', ') },
                { show: contact.phone, icon: '📞', label: 'Telefon', text: contact.phone },
                { show: contact.email, icon: '✉', label: 'E-posta', text: contact.email },
              ].filter((i) => i.show).map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F5EDD8] flex items-center justify-center shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#C9A96E] mb-1">{item.label}</p>
                    <p className="text-sm text-[#64748B]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {hours.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">Çalışma Saatleri</h3>
              <div className="space-y-2 text-sm text-[#64748B]">
                {hours.map((h, i) => (
                  <div key={i} className="flex justify-between"><span>{h.days}</span><span className="font-medium text-[#0F172A]">{h.hours}</span></div>
                ))}
              </div>
            </div>
          )}

          {Object.values(social).some(Boolean) && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">Sosyal Medya</h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(social).map(([key, url]) => url ? (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                    className="text-sm px-4 py-2 border border-[#E2E8F0] rounded-xl hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors capitalize">{key}</a>
                ) : null)}
              </div>
            </div>
          )}

          {contact.mapUrl ? (
            <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] h-52">
              <iframe src={contact.mapUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy" title="Harita" />
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] bg-[#FAFAF9] h-52 flex items-center justify-center">
              <p className="text-sm text-[#94A3B8]">📍 {contact.city || 'İstanbul'}</p>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl text-[#0F172A] mb-6">Mesaj Gönderin</h2>
          {sent ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-full bg-[#F5EDD8] flex items-center justify-center mx-auto mb-4 text-xl">✓</div>
              <h3 className="font-bold text-[#0F172A] mb-1">Mesajınız İletildi</h3>
              <p className="text-sm text-[#64748B]">En kısa sürede danışmanlarımız sizi arayacak.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className={labelClass}>Ad Soyad *</label>
                <input required value={form.name} onChange={set('name')} placeholder="Ahmet Yılmaz" className={inputClass} /></div>
              <div><label className={labelClass}>E-posta *</label>
                <input required type="email" value={form.email} onChange={set('email')} placeholder="ornek@email.com" className={inputClass} /></div>
              <div><label className={labelClass}>Mesajınız *</label>
                <textarea required value={form.message} onChange={set('message')} rows={5}
                  placeholder="Almak, satmak veya kiralamak istediğiniz mülk hakkında bilgi verin..."
                  className={`${inputClass} resize-none`} /></div>
              {error && <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>}
              <div className="flex items-start gap-3">
                <input required type="checkbox" id="kvkk2" checked={form.kvkkConsent} onChange={set('kvkkConsent')} className="mt-0.5 accent-[#C9A96E]" />
                <label htmlFor="kvkk2" className="text-xs text-[#64748B] leading-relaxed">
                  <a href="#" className="text-[#C9A96E] hover:underline">Kişisel verilerin işlenmesine</a> ilişkin metni okudum. *
                </label>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[#1E293B] hover:bg-[#0F172A] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors">
                {loading ? 'Gönderiliyor...' : 'Gönder'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
