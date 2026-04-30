'use client';

import { useState } from 'react';
import { useLang } from '../lib/lang';

export default function ContactForm() {
  const { lang } = useLang();
  const [form, setForm]     = useState({ name: '', email: '', message: '', kvkkConsent: false });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.kvkkConsent) {
      setError(lang === 'en' ? 'KVKK consent is required.' : 'KVKK onayı zorunludur.');
      return;
    }
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || (lang === 'en' ? 'Send failed' : 'Gönderme başarısız'));
      setStatus('success');
    } catch (err) {
      setError(err.message || (lang === 'en' ? 'An error occurred.' : 'Bir hata oluştu.'));
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-[#F5F4F0] border border-[#E5E5E3] p-8 text-center">
        <div className="text-3xl mb-4">✓</div>
        <h3 className="text-base font-bold mb-2">{lang === 'en' ? 'Message Sent' : 'Mesajınız İletildi'}</h3>
        <p className="text-sm text-[#6B6B6B]">{lang === 'en' ? 'We will get back to you as soon as possible.' : 'En kısa sürede size geri dönüş yapacağız.'}</p>
      </div>
    );
  }

  const inputClass = "w-full border border-[#E5E5E3] px-4 py-3 text-sm focus:outline-none focus:border-[#0A0A0A] transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-[10px] tracking-[0.15em] uppercase font-semibold text-[#0A0A0A] mb-2">
          {lang === 'en' ? 'Full Name *' : 'Ad Soyad *'}
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputClass}
          style={{ fontSize: '16px' }}
          placeholder={lang === 'en' ? 'Your Full Name' : 'Adınız Soyadınız'}
        />
      </div>
      <div>
        <label className="block text-[10px] tracking-[0.15em] uppercase font-semibold text-[#0A0A0A] mb-2">
          {lang === 'en' ? 'Email *' : 'E-posta *'}
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputClass}
          style={{ fontSize: '16px' }}
          placeholder="ornek@email.com"
        />
      </div>
      <div>
        <label className="block text-[10px] tracking-[0.15em] uppercase font-semibold text-[#0A0A0A] mb-2">
          {lang === 'en' ? 'Message *' : 'Mesaj *'}
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputClass} resize-none`}
          style={{ fontSize: '16px' }}
          placeholder={lang === 'en' ? 'Write your message...' : 'Mesajınızı yazın...'}
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.kvkkConsent}
          onChange={(e) => setForm({ ...form, kvkkConsent: e.target.checked })}
          className="mt-0.5 w-4 h-4"
          style={{ accentColor: '#0A0A0A' }}
        />
        <span className="text-xs text-[#6B6B6B] leading-relaxed">
          {lang === 'en' ? (
            <>I have read and accept the{' '}
              <a href="#" className="underline hover:text-[#C8A882] transition-colors">KVKK Disclosure Text</a>
              {' '}regarding the processing of my personal data.</>
          ) : (
            <>Kişisel verilerimin işlenmesine ilişkin{' '}
              <a href="#" className="underline hover:text-[#C8A882] transition-colors">KVKK Aydınlatma Metni</a>
              {'\''}ni okudum ve onaylıyorum.</>
          )}
        </span>
      </label>

      {errorMsg && <p className="text-xs text-red-600 font-medium">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#0A0A0A] text-white text-xs font-bold tracking-[0.15em] uppercase py-4 hover:bg-[#C8A882] hover:text-[#0A0A0A] transition-colors disabled:opacity-50"
      >
        {status === 'loading'
          ? (lang === 'en' ? 'Sending...' : 'Gönderiliyor...')
          : (lang === 'en' ? 'Send Message' : 'Mesaj Gönder')}
      </button>
    </form>
  );
}
