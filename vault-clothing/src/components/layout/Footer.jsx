import { Link } from 'react-router-dom';
import { useCompany } from '../../hooks/useCompany';
import { useLang } from '../../hooks/useLang';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

export default function Footer() {
  const { company } = useCompany();
  const { lang } = useLang();
  const name      = company?.name || 'VAULT';
  const phone     = company?.contact?.phone;
  const whatsapp  = company?.contact?.whatsapp;
  const email     = company?.contact?.email;
  const address   = company?.contact?.address;
  const city      = company?.contact?.city;
  const ig        = company?.socialLinks?.instagram;
  const tt        = company?.socialLinks?.tiktok;
  const waUrl     = buildWhatsAppUrl(whatsapp || phone);

  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#C8A882] mb-1">E-Bülten</p>
            <h3 className="text-lg font-bold">Yeni Koleksiyonlardan İlk Sen Haber Al</h3>
          </div>
          <form
            className="flex w-full md:w-auto gap-0"
            onSubmit={e => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 md:w-72 bg-white/5 border border-white/20 text-white placeholder-white/30 text-sm px-4 py-3 focus:outline-none focus:border-[#C8A882] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#C8A882] text-[#0A0A0A] text-xs font-bold tracking-[0.1em] uppercase px-6 py-3 hover:bg-white transition-colors"
            >
              Kayıt Ol
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <span className="text-xl font-black tracking-[0.25em] uppercase">{name}</span>
          <p className="text-white/40 text-sm mt-3 leading-relaxed max-w-[200px]">
            Minimal giyim.<br />Maksimal etki.
          </p>
          <div className="flex gap-4 mt-5">
            {ig && (
              <a href={ig} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#C8A882] transition-colors text-xs tracking-wider uppercase">
                Instagram
              </a>
            )}
            {tt && (
              <a href={tt} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#C8A882] transition-colors text-xs tracking-wider uppercase">
                TikTok
              </a>
            )}
          </div>
        </div>

        {/* Koleksiyonlar */}
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">Alışveriş</p>
          <ul className="space-y-3">
            {['T-Shirts', 'Hoodies', 'Dış Giyim', 'Aksesuar'].map(item => (
              <li key={item}>
                <Link to="/koleksiyonlar" className="text-sm text-white/60 hover:text-white transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bilgi */}
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">Bilgi</p>
          <ul className="space-y-3">
            {[
              { to: '/hakkimizda', label: 'Hakkımızda' },
              { to: '/blog',       label: 'Blog' },
              { to: '/iletisim',   label: 'İletişim' },
            ].map(item => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-white/60 hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* İletişim */}
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">{lang === 'en' ? 'Contact' : 'İletişim'}</p>
          <ul className="space-y-3 text-sm text-white/60">
            {waUrl && (
              <li>
                <a href={waUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#25D366] hover:text-[#1ebe5d] transition-colors font-medium">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </li>
            )}
            {phone   && <li>{phone}</li>}
            {email   && <li>{email}</li>}
            {address && <li className="leading-snug">{address}{city && `, ${city}`}</li>}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">© {new Date().getFullYear()} {name}. Tüm hakları saklıdır.</p>
          <div className="flex gap-5">
            <a href="#" className="text-white/25 hover:text-white/50 text-xs transition-colors">KVKK</a>
            <a href="#" className="text-white/25 hover:text-white/50 text-xs transition-colors">Gizlilik</a>
            <a href="#" className="text-white/25 hover:text-white/50 text-xs transition-colors">İade Politikası</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
