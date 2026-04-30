import { useState } from 'react';
import { useCompany } from '../hooks/useCompany';
import { postContact } from '../api/client';

export default function ContactPage() {
  const { company } = useCompany();

  const [form, setForm]       = useState({ name: '', email: '', message: '', kvkkConsent: false });
  const [status, setStatus]   = useState('idle'); // idle | loading | success | error
  const [errorMsg, setError]  = useState('');

  const phone   = company?.contact?.phone;
  const email   = company?.contact?.email;
  const address = company?.contact?.address;
  const city    = company?.contact?.city;
  const ig      = company?.socialLinks?.instagram;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.kvkkConsent) { setError('KVKK onayı zorunludur.'); return; }
    setStatus('loading');
    setError('');
    try {
      await postContact(form);
      setStatus('success');
    } catch (err) {
      setError(err.message || 'Bir hata oluştu.');
      setStatus('error');
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-[#0A0A0A] text-white pt-28 pb-14 px-6 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#C8A882] mb-3">Ulaşın</p>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">İletişim</h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16">
        {/* Info */}
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8A882] mb-6">Bilgiler</p>

          <div className="space-y-8">
            {phone && (
              <div>
                <p className="text-[11px] tracking-[0.15em] uppercase font-bold text-[#0A0A0A] mb-1">Telefon</p>
                <a href={`tel:${phone}`} className="text-sm text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors">{phone}</a>
              </div>
            )}
            {email && (
              <div>
                <p className="text-[11px] tracking-[0.15em] uppercase font-bold text-[#0A0A0A] mb-1">E-posta</p>
                <a href={`mailto:${email}`} className="text-sm text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors">{email}</a>
              </div>
            )}
            {address && (
              <div>
                <p className="text-[11px] tracking-[0.15em] uppercase font-bold text-[#0A0A0A] mb-1">Adres</p>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{address}{city && `, ${city}`}</p>
              </div>
            )}
            {ig && (
              <div>
                <p className="text-[11px] tracking-[0.15em] uppercase font-bold text-[#0A0A0A] mb-1">Instagram</p>
                <a href={ig} target="_blank" rel="noopener noreferrer" className="text-sm text-[#6B6B6B] hover:text-[#C8A882] transition-colors">
                  @vaultclothing
                </a>
              </div>
            )}
          </div>

          {/* Hours */}
          {company?.workingHours?.length > 0 && (
            <div className="mt-10 pt-8 border-t border-[#E5E5E3]">
              <p className="text-[11px] tracking-[0.15em] uppercase font-bold text-[#0A0A0A] mb-4">Mağaza Saatleri</p>
              <div className="space-y-2">
                {company.workingHours.map((h, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-[#6B6B6B]">{h.days}</span>
                    <span className="font-medium text-[#0A0A0A]">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8A882] mb-6">Mesaj Gönder</p>

          {status === 'success' ? (
            <div className="bg-[#F5F4F0] border border-[#E5E5E3] p-8 text-center">
              <div className="text-3xl mb-4">✓</div>
              <h3 className="text-base font-bold mb-2">Mesajınız İletildi</h3>
              <p className="text-sm text-[#6B6B6B]">En kısa sürede size geri dönüş yapacağız.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase font-semibold text-[#0A0A0A] mb-2">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full border border-[#E5E5E3] px-4 py-3 text-sm focus:outline-none focus:border-[#0A0A0A] transition-colors"
                  style={{ fontSize: '16px' }}
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase font-semibold text-[#0A0A0A] mb-2">
                  E-posta *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full border border-[#E5E5E3] px-4 py-3 text-sm focus:outline-none focus:border-[#0A0A0A] transition-colors"
                  style={{ fontSize: '16px' }}
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase font-semibold text-[#0A0A0A] mb-2">
                  Mesaj *
                </label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full border border-[#E5E5E3] px-4 py-3 text-sm focus:outline-none focus:border-[#0A0A0A] transition-colors resize-none"
                  style={{ fontSize: '16px' }}
                />
              </div>

              {/* KVKK */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.kvkkConsent}
                  onChange={e => setForm({ ...form, kvkkConsent: e.target.checked })}
                  className="mt-0.5 w-4 h-4 accent-[#0A0A0A]"
                />
                <span className="text-xs text-[#6B6B6B] leading-relaxed">
                  Kişisel verilerimin işlenmesine ilişkin{' '}
                  <a href="#" className="underline hover:text-[#C8A882] transition-colors">
                    KVKK Aydınlatma Metni
                  </a>
                  'ni okudum ve onaylıyorum.
                </span>
              </label>

              {errorMsg && (
                <p className="text-xs text-red-600 font-medium">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#0A0A0A] text-white text-xs font-bold tracking-[0.15em] uppercase py-4 hover:bg-[#C8A882] hover:text-[#0A0A0A] transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Gönderiliyor...' : 'Mesaj Gönder'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
