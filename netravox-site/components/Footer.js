export default function Footer({ company }) {
  const social = company?.socialLinks || {};

  const socialLinks = [
    social.instagram && { label: "Instagram", href: social.instagram },
    social.twitter   && { label: "Twitter / X", href: social.twitter },
    social.facebook  && { label: "Facebook", href: social.facebook },
    social.linkedin  && { label: "LinkedIn", href: social.linkedin },
    social.youtube   && { label: "YouTube", href: social.youtube },
  ].filter(Boolean);

  return (
    <footer className="border-t border-white/6 py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">N</span>
          </div>
          <span className="text-sm font-bold text-white/60">Netravox</span>
        </div>

        <p className="text-xs text-white/25">
          © {new Date().getFullYear()} Netravox. Tüm hakları saklıdır.
        </p>

        <div className="flex items-center gap-5">
          {socialLinks.length > 0
            ? socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  {s.label}
                </a>
              ))
            : ["Gizlilik", "KVKK", "İletişim"].map((l) => (
                <a key={l} href="#iletisim" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                  {l}
                </a>
              ))
          }
        </div>
      </div>
    </footer>
  );
}
