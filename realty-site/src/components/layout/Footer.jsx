import { Link } from 'react-router-dom';
import { useCompany } from '../../hooks/useCompany';

export default function Footer() {
  const { company } = useCompany();
  const name = company?.name || 'Prime Gayrimenkul';
  const desc = company?.description?.tr || 'Hayalinizdeki mülkü bulmanız için profesyonel gayrimenkul danışmanlığı.';
  const contact = company?.contact || {};
  const social = company?.socialLinks || {};

  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-1">
          <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            <span className="text-[#C9A96E]">Prime</span> {name.replace('Prime', '').trim()}
          </h3>
          <p className="text-sm leading-relaxed text-[#94A3B8] mb-5">{desc}</p>
          {Object.values(social).some(Boolean) && (
            <div className="flex gap-2 flex-wrap">
              {Object.entries(social).map(([key, url]) => url ? (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-xs text-[#94A3B8] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors">
                  {key[0].toUpperCase()}
                </a>
              ) : null)}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-4">Menü</h4>
          <ul className="space-y-2.5">
            {[['/', 'Ana Sayfa'], ['/ilanlar', 'İlanlar'], ['/hakkimizda', 'Hakkımızda'], ['/iletisim', 'İletişim']].map(([to, label]) => (
              <li key={to}><Link to={to} className="text-sm text-[#94A3B8] hover:text-white transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-4">İletişim</h4>
          <ul className="space-y-3 text-sm text-[#94A3B8]">
            {contact.phone && <li>📞 {contact.phone}</li>}
            {contact.email && <li>✉ {contact.email}</li>}
            {(contact.address || contact.city) && <li>📍 {[contact.address, contact.city].filter(Boolean).join(', ')}</li>}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
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
