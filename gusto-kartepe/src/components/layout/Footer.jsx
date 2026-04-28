import { Link } from 'react-router-dom';
import { useCompany } from '../../hooks/useCompany';

const quickLinks = [
  { to: '/', label: 'Ana Sayfa' },
  { to: '/hakkimizda', label: 'Hakkımızda' },
  { to: '/menu', label: 'Menü' },
  { to: '/galeri', label: 'Galeri' },
  { to: '/rezervasyon', label: 'Özel Etkinlikler' },
  { to: '/iletisim', label: 'İletişim' },
];

const socialIcons = { instagram: 'IG', facebook: 'FB', twitter: 'TW', youtube: 'YT', tiktok: 'TK' };

export default function Footer() {
  const { company } = useCompany();

  const name = company?.name || 'Gusto Kartepe';
  const desc = company?.description?.tr || 'Kartepe\'nin eşsiz doğasında, taze ve sürdürülebilir malzemelerle hazırlanan lezzetlerin buluşma noktası.';
  const contact = company?.contact || {};
  const hours = company?.workingHours || [];
  const social = company?.socialLinks || {};

  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-base font-bold tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-serif)', color: '#E8E4E0' }}>
            {name}
          </h3>
          <p className="text-sm leading-relaxed text-[#9A9A9A]">{desc}</p>
          {Object.values(social).some(Boolean) && (
            <div className="flex gap-3 mt-5 flex-wrap">
              {Object.entries(social).map(([key, url]) =>
                url ? (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-[#3A3A3A] flex items-center justify-center text-xs text-[#9A9A9A] hover:border-[#8B1A1A] hover:text-white transition-colors">
                    {socialIcons[key]}
                  </a>
                ) : null
              )}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-[#9A9A9A] mb-4">Hızlı Bağlantılar</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-[#9A9A9A] hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-[#9A9A9A] mb-4">İletişim</h4>
          <ul className="space-y-3 text-sm text-[#9A9A9A]">
            {contact.phone && <li>📞 {contact.phone}</li>}
            {(contact.address || contact.city) && (
              <li>📍 {[contact.address, contact.city, contact.country].filter(Boolean).join(', ')}</li>
            )}
            {contact.email && <li>✉ {contact.email}</li>}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-[#9A9A9A] mb-4">Çalışma Saatleri</h4>
          <ul className="space-y-2.5 text-sm text-[#9A9A9A]">
            {hours.length > 0 ? hours.map((h, i) => (
              <li key={i} className="flex justify-between gap-4">
                <span>{h.days}</span>
                <span className="text-white">{h.hours}</span>
              </li>
            )) : (
              <>
                <li className="flex justify-between gap-4"><span>Pzt – Cum</span><span className="text-white">08:00 – 22:00</span></li>
                <li className="flex justify-between gap-4"><span>Cmt – Paz</span><span className="text-white">07:30 – 23:00</span></li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-[#2A2A2A]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#5A5A5A]">© {new Date().getFullYear()} {name}. Tüm hakları saklıdır.</p>
          <div className="flex gap-5">
            <a href="#" className="text-xs text-[#5A5A5A] hover:text-white transition-colors">Gizlilik Politikası</a>
            <a href="#" className="text-xs text-[#5A5A5A] hover:text-white transition-colors">KVKK</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
