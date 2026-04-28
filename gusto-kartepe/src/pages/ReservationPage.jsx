import { useState } from 'react';
import { useCompany } from '../hooks/useCompany';
import { postReservation } from '../api/client';

const DEFAULT_SLOTS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '19:00', '20:00', '21:00'];

export default function ReservationPage() {
  const { company } = useCompany();
  const [form, setForm] = useState({ fullName: '', phone: '', email: '', date: '', time: '', partySize: '2', note: '', kvkkConsent: false });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const subtitle = company?.content?.reservationSubtitle?.tr || 'En az 24 saat öncesinden rezervasyon oluşturmanızı öneririz.';
  const slots = company?.content?.reservationSlots?.length ? company.content.reservationSlots : DEFAULT_SLOTS;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await postReservation({ ...form, partySize: Number(form.partySize) });
      setSent(true);
    } catch (err) {
      setError(err.message || 'Bir hata oluştu, lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-[#E8E4E0] rounded px-4 py-3 text-sm outline-none focus:border-[#8B1A1A] focus:ring-2 focus:ring-[#8B1A1A]/10 transition-all";
  const labelClass = "block text-xs font-semibold uppercase tracking-wide text-[#6B6B6B] mb-1.5";
  const hours = company?.workingHours || [];
  const contact = company?.contact || {};

  return (
    <>
      <div className="bg-[#FAF8F5] py-14 text-center border-b border-[#E8E4E0]">
        <p className="text-xs tracking-[0.3em] uppercase text-[#8B1A1A] mb-2">Masa Seçin</p>
        <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>Rezervasyon</h1>
        <p className="text-[#6B6B6B] mt-3 max-w-md mx-auto text-sm">{subtitle}</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          {sent ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5 text-2xl">✓</div>
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Talebiniz Alındı</h2>
              <p className="text-[#6B6B6B] text-sm max-w-sm mx-auto">
                Rezervasyon talebiniz bize ulaştı. En kısa sürede telefon veya e-posta ile geri dönüş yapacağız.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Ad Soyad *</label>
                  <input required value={form.fullName} onChange={set('fullName')} placeholder="Ahmet Yılmaz" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Telefon *</label>
                  <input required value={form.phone} onChange={set('phone')} placeholder="+90 5XX XXX XX XX" className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>E-posta</label>
                <input type="email" value={form.email} onChange={set('email')} placeholder="ornek@email.com" className={inputClass} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className={labelClass}>Tarih *</label>
                  <input required type="date" value={form.date} onChange={set('date')} min={new Date().toISOString().split('T')[0]} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Saat *</label>
                  <select required value={form.time} onChange={set('time')} className={inputClass}>
                    <option value="">Seçin</option>
                    {slots.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Kişi Sayısı *</label>
                <select value={form.partySize} onChange={set('partySize')} className={inputClass}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => <option key={n} value={n}>{n} Kişi</option>)}
                  <option value="11">10+ Kişi (Özel Etkinlik)</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Notlar / Özel İstekler</label>
                <textarea value={form.note} onChange={set('note')} rows={3} placeholder="Doğum günü, vejetaryen menü, vb." className={`${inputClass} resize-none`} />
              </div>
              {error && <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded">{error}</p>}
              <div className="flex items-start gap-3">
                <input required type="checkbox" id="kvkk" checked={form.kvkkConsent} onChange={set('kvkkConsent')} className="mt-0.5 accent-[#8B1A1A]" />
                <label htmlFor="kvkk" className="text-xs text-[#6B6B6B] leading-relaxed">
                  <a href="#" className="text-[#8B1A1A] hover:underline">Kişisel verilerin işlenmesine</a> ilişkin aydınlatma metnini okudum ve kabul ediyorum. *
                </label>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[#8B1A1A] hover:bg-[#6B1117] disabled:opacity-60 text-white font-semibold py-3.5 rounded transition-colors">
                {loading ? 'Gönderiliyor...' : 'Rezervasyon Talebi Gönder'}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          {hours.length > 0 && (
            <div className="bg-[#FAF8F5] rounded-xl p-6 border border-[#E8E4E0]">
              <h3 className="font-bold mb-4" style={{ fontFamily: 'var(--font-serif)' }}>Çalışma Saatleri</h3>
              <div className="space-y-2 text-sm text-[#6B6B6B]">
                {hours.map((h, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{h.days}</span>
                    <span className="font-medium text-[#1A1A1A]">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {(contact.phone || contact.email || contact.address) && (
            <div className="bg-[#FAF8F5] rounded-xl p-6 border border-[#E8E4E0]">
              <h3 className="font-bold mb-4" style={{ fontFamily: 'var(--font-serif)' }}>İletişim</h3>
              <div className="space-y-2.5 text-sm text-[#6B6B6B]">
                {contact.phone && <p>📞 {contact.phone}</p>}
                {contact.email && <p>✉ {contact.email}</p>}
                {contact.address && <p>📍 {[contact.address, contact.city].filter(Boolean).join(', ')}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
