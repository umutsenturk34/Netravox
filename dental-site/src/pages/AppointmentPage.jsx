import { useState, useEffect } from 'react';
import { useCompany } from '../hooks/useCompany';
import { getServices, postAppointment } from '../api/client';

const DEFAULT_SLOTS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

export default function AppointmentPage() {
  const { company } = useCompany();
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ fullName: '', phone: '', email: '', date: '', time: '', service: '', note: '', kvkkConsent: false });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { getServices().then(setServices).catch(() => {}); }, []);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const slots = company?.content?.reservationSlots?.length ? company.content.reservationSlots : DEFAULT_SLOTS;
  const subtitle = company?.content?.reservationSubtitle?.tr || 'En az 24 saat öncesinden randevu oluşturmanızı öneririz.';
  const hours = company?.workingHours || [];
  const contact = company?.contact || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await postAppointment(form);
      setSent(true);
    } catch (err) {
      setError(err.message || 'Bir hata oluştu, lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-[#E0F2FE] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/10 transition-all bg-white";
  const labelClass = "block text-xs font-semibold uppercase tracking-wide text-[#64748B] mb-1.5";

  return (
    <>
      <div className="bg-[#F0FDFF] py-16 text-center border-b border-[#E0F2FE]">
        <p className="text-xs tracking-[0.3em] uppercase text-[#0E7490] font-semibold mb-3">Online Randevu</p>
        <h1 className="text-4xl text-[#0C1B2E]">Randevu Al</h1>
        <p className="text-[#64748B] mt-3 max-w-md mx-auto text-sm">{subtitle}</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          {sent ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#CFFAFE] flex items-center justify-center mx-auto mb-5 text-2xl text-[#0E7490]">✓</div>
              <h2 className="text-2xl text-[#0C1B2E] mb-2">Randevu Talebiniz Alındı</h2>
              <p className="text-[#64748B] text-sm max-w-sm mx-auto">En kısa sürede sizi arayarak randevunuzu teyit edeceğiz.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>Ad Soyad *</label>
                  <input required value={form.fullName} onChange={set('fullName')} placeholder="Ahmet Yılmaz" className={inputClass} /></div>
                <div><label className={labelClass}>Telefon *</label>
                  <input required value={form.phone} onChange={set('phone')} placeholder="+90 5XX XXX XX XX" className={inputClass} /></div>
              </div>
              <div><label className={labelClass}>E-posta</label>
                <input type="email" value={form.email} onChange={set('email')} placeholder="ornek@email.com" className={inputClass} /></div>
              {services.length > 0 && (
                <div><label className={labelClass}>Hizmet Seçin</label>
                  <select value={form.service} onChange={set('service')} className={inputClass}>
                    <option value="">Seçiniz (opsiyonel)</option>
                    {services.map((s) => <option key={s._id} value={s.name?.tr}>{s.name?.tr}</option>)}
                  </select></div>
              )}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2"><label className={labelClass}>Tarih *</label>
                  <input required type="date" value={form.date} onChange={set('date')} min={new Date().toISOString().split('T')[0]} className={inputClass} /></div>
                <div><label className={labelClass}>Saat *</label>
                  <select required value={form.time} onChange={set('time')} className={inputClass}>
                    <option value="">Seçin</option>
                    {slots.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select></div>
              </div>
              <div><label className={labelClass}>Notlar</label>
                <textarea value={form.note} onChange={set('note')} rows={3} placeholder="Özel istekleriniz veya şikayetleriniz..." className={`${inputClass} resize-none`} /></div>
              {error && <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>}
              <div className="flex items-start gap-3">
                <input required type="checkbox" id="kvkk" checked={form.kvkkConsent} onChange={set('kvkkConsent')} className="mt-0.5 accent-[#0E7490]" />
                <label htmlFor="kvkk" className="text-xs text-[#64748B] leading-relaxed">
                  <a href="#" className="text-[#0E7490] hover:underline">Kişisel verilerin işlenmesine</a> ilişkin metni okudum ve kabul ediyorum. *
                </label>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[#0E7490] hover:bg-[#155E75] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors">
                {loading ? 'Gönderiliyor...' : 'Randevu Talebi Gönder'}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-5">
          {hours.length > 0 && (
            <div className="bg-[#F0FDFF] rounded-2xl p-6 border border-[#E0F2FE]">
              <h3 className="font-bold mb-4 text-[#0C1B2E]">Çalışma Saatleri</h3>
              <div className="space-y-2 text-sm text-[#64748B]">
                {hours.map((h, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{h.days}</span><span className="font-medium text-[#0C1B2E]">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {(contact.phone || contact.email || contact.address) && (
            <div className="bg-[#F0FDFF] rounded-2xl p-6 border border-[#E0F2FE]">
              <h3 className="font-bold mb-4 text-[#0C1B2E]">İletişim</h3>
              <div className="space-y-2.5 text-sm text-[#64748B]">
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
