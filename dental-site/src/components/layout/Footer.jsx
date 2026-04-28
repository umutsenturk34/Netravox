import { Link } from 'react-router-dom';
import { useCompany } from '../../hooks/useCompany';

const quickLinks = [
  { to: '/', label: 'Ana Sayfa' },
  { to: '/hizmetler', label: 'Hizmetler' },
  { to: '/hakkimizda', label: 'Hakkımızda' },
  { to: '/galeri', label: 'Galeri' },
  { to: '/randevu', label: 'Randevu Al' },
  { to: '/iletisim', label: 'İletişim' },
];

export default function Footer() {
  const { company } = useCompany();
  const name = company?.name || 'DentCare İstanbul';
  const desc = company?.description?.tr || 'Sağlıklı gülüşler için modern diş hekimliği hizmetleri.';
  const contact = company?.contact || {};
  const hours = company?.workingHours || [];
  const social = company?.socialLinks || {};

  return (
    <footer className="bg-[#0C1B2E] text-white">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-md bg-[#0E7490] flex items-center justify-center">
              <span className="text-white text-xs font-bold">D</span>
            </div>
            <h3 className="text-base font-bold text-white">{name}</h3>
          </div>
          <p className="text-sm leading-relaxed text-[#94A3B8]">{desc}</p>
          {Object.values(social).some(Boolean) && (
            <div className="flex gap-2 mt-5 flex-wrap">
              {Object.entries(social).map(([key, url]) =>
                url ? (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg border border-[#1E3A5F] flex items-center justify-center text-xs text-[#94A3B8] hover:border-[#0E7490] hover:text-white transition-colors">
                    {key[0].toUpperCase()}
                  </a>
                ) : null
              )}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-4">Bağlantılar</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-[#94A3B8] hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-4">İletişim</h4>
          <ul className="space-y-3 text-sm text-[#94A3B8]">
            {contact.phone && <li>📞 {contact.phone}</li>}
            {contact.email && <li>✉ {contact.email}</li>}
            {(contact.address || contact.city) && (
              <li>📍 {[contact.address, contact.city].filter(Boolean).join(', ')}</li>
            )}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-4">Çalışma Saatleri</h4>
          <ul className="space-y-2.5 text-sm text-[#94A3B8]">
            {hours.length > 0 ? hours.map((h, i) => (
              <li key={i} className="flex justify-between gap-3">
                <span>{h.days}</span>
                <span className="text-white font-medium">{h.hours}</span>
              </li>
            )) : (
              <>
                <li className="flex justify-between gap-3"><span>Pzt – Cuma</span><span className="text-white">09:00 – 18:00</span></li>
                <li className="flex justify-between gap-3"><span>Cumartesi</span><span className="text-white">09:00 – 14:00</span></li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-[#1E3A5F]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#475569]">© {new Date().getFullYear()} {name}. Tüm hakları saklıdır.</p>
          <div className="flex gap-5">
            <a href="#" className="text-xs text-[#475569] hover:text-white transition-colors">Gizlilik Politikası</a>
            <a href="#" className="text-xs text-[#475569] hover:text-white transition-colors">KVKK</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
