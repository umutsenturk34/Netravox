"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  LayoutDashboard, Globe, FileText, Image, Search,
  Calendar, BarChart3, Shield, Zap, Smartphone, Users, Palette,
  UtensilsCrossed, Stethoscope, Building2, Check, ArrowUpRight,
} from "lucide-react";

const sectors = [
  {
    id: "restaurant",
    label: "Restoran",
    icon: UtensilsCrossed,
    title: "Restoranlar için her şey",
    desc: "Menünüzü, rezervasyonlarınızı ve müşteri yorumlarınızı tek panelden yönetin.",
    features: [
      "Online menü yönetimi (TR/EN)",
      "Masa rezervasyon sistemi",
      "Galeri ve görseller",
      "Google Maps entegrasyonu",
      "SEO optimizasyonu",
    ],
    accent: "#f97316",
    gradient: "from-orange-500/20 via-red-500/5 to-transparent",
    border: "rgba(249,115,22,0.25)",
    glow: "rgba(249,115,22,0.12)",
  },
  {
    id: "dental",
    label: "Klinik",
    icon: Stethoscope,
    title: "Klinikler için profesyonel kimlik",
    desc: "Hasta güvenini kazanacak modern bir web sitesi ve randevu yönetim sistemi.",
    features: [
      "Hizmet ve fiyat listesi",
      "Online randevu formu",
      "Doktor ve ekip sayfası",
      "KVKK uyumlu formlar",
      "Çok dilli destek",
    ],
    accent: "#06b6d4",
    gradient: "from-cyan-500/20 via-blue-500/5 to-transparent",
    border: "rgba(6,182,212,0.25)",
    glow: "rgba(6,182,212,0.12)",
  },
  {
    id: "realty",
    label: "Emlak",
    icon: Building2,
    title: "Emlak ofisleri için güçlü vitrin",
    desc: "İlan portföyünüzü, ekibinizi ve iletişim bilgilerinizi kolayca yönetin.",
    features: [
      "İlan listeleme ve filtreleme",
      "Galeri ve sanal tur linkleri",
      "Ekip profil sayfaları",
      "Lead form entegrasyonu",
      "Responsive mobil tasarım",
    ],
    accent: "#10b981",
    gradient: "from-emerald-500/20 via-teal-500/5 to-transparent",
    border: "rgba(16,185,129,0.25)",
    glow: "rgba(16,185,129,0.12)",
  },
];

const coreFeatures = [
  { icon: LayoutDashboard, title: "Merkezi Yönetim",   desc: "Tüm içeriklerinizi tek bir panelden yönetin.",               accent: "#6366f1" },
  { icon: Globe,           title: "Çok Dilli",          desc: "TR/EN içerik yapısı, hreflang ve çeviri yönetimi.",          accent: "#0ea5e9" },
  { icon: Search,          title: "SEO Araçları",       desc: "Meta, OG, schema, sitemap ve robots.txt kontrolü.",          accent: "#8b5cf6" },
  { icon: BarChart3,       title: "Analitik",           desc: "GA4 entegrasyonu ile gerçek zamanlı ziyaretçi verileri.",    accent: "#06b6d4" },
  { icon: Image,           title: "Medya Kütüphanesi",  desc: "S3 tabanlı görsel ve video yönetimi, CDN desteği.",          accent: "#10b981" },
  { icon: Shield,          title: "Rol Tabanlı Yetki",  desc: "8 farklı rol, granüler izin matrisi, çok kullanıcı.",        accent: "#f43f5e" },
  { icon: Zap,             title: "Hızlı Yayın",        desc: "Taslak → yayında → arşiv. Onay akışı gerekmez.",            accent: "#f59e0b" },
  { icon: Smartphone,      title: "Mobil Öncelikli",    desc: "WCAG 2.1 AA uyumlu, iOS zoom sorunlarından arınmış.",        accent: "#14b8a6" },
  { icon: Calendar,        title: "Rezervasyon",        desc: "Müşteri talep formu, durum yönetimi ve e-posta bildirimleri.", accent: "#f97316" },
  { icon: Users,           title: "Çok Kullanıcı",      desc: "Ekibinize ayrı rol ve erişim seviyeleri atayın.",            accent: "#a855f7" },
  { icon: FileText,        title: "Sayfa Editörü",      desc: "Şablon tabanlı sayfa oluşturma, bilingual alan yapısı.",     accent: "#3b82f6" },
  { icon: Palette,         title: "Marka Renkleri",     desc: "Her firmaya özel logo, renk ve tema ayarları.",              accent: "#ec4899" },
];

function SectorCard({ sector, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = sector.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative"
    >
      {/* Gradient border wrapper */}
      <div
        className="p-px rounded-3xl transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, ${sector.border}, rgba(255,255,255,0.06) 40%, transparent 70%)`,
        }}
      >
        <div className="rounded-3xl bg-[#08080f] relative overflow-hidden flex flex-col h-full p-7">

          {/* Radial glow — top left, brightens on hover */}
          <div
            className="absolute -top-20 -left-20 w-64 h-64 rounded-full transition-opacity duration-700 opacity-60 group-hover:opacity-100"
            style={{ background: `radial-gradient(circle, ${sector.glow}, transparent 70%)` }}
          />

          {/* Large watermark number */}
          <div
            className="absolute -right-2 -top-3 text-[108px] font-black leading-none select-none pointer-events-none"
            style={{ color: sector.accent + "09" }}
          >
            0{index + 1}
          </div>

          {/* Header row */}
          <div className="relative flex items-start justify-between mb-7">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background: sector.accent + "18",
                border: `1px solid ${sector.accent}30`,
                boxShadow: `0 0 20px ${sector.accent}18`,
              }}
            >
              <Icon size={20} style={{ color: sector.accent }} />
            </div>
            <div
              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: sector.accent + "15", color: sector.accent }}
            >
              {sector.label}
            </div>
          </div>

          {/* Title */}
          <h3 className="relative text-xl font-bold text-white mb-3 leading-snug tracking-tight">
            {sector.title}
          </h3>

          {/* Desc */}
          <p className="relative text-sm text-white/50 leading-relaxed mb-6">
            {sector.desc}
          </p>

          {/* Accent divider */}
          <div
            className="relative w-full h-px mb-6"
            style={{
              background: `linear-gradient(90deg, ${sector.accent}40, ${sector.accent}10, transparent)`,
            }}
          />

          {/* Features */}
          <ul className="relative space-y-3 flex-1">
            {sector.features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: sector.accent + "18",
                    border: `1px solid ${sector.accent}28`,
                  }}
                >
                  <Check size={8} style={{ color: sector.accent }} strokeWidth={3} />
                </div>
                {f}
              </li>
            ))}
          </ul>

          {/* Bottom link */}
          <div
            className="relative mt-7 flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group-hover:gap-2"
            style={{ color: sector.accent + "b0" }}
          >
            Detaylı incele
            <ArrowUpRight size={13} />
          </div>

        </div>
      </div>
    </motion.div>
  );
}

function FeatureChip({ icon: Icon, title, desc, accent, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.04, ease: "easeOut" }}
      className="group relative"
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      {/* Gradient border */}
      <div
        className="p-px rounded-2xl h-full"
        style={{
          background: `linear-gradient(135deg, ${accent}35, rgba(255,255,255,0.05) 50%, transparent)`,
        }}
      >
        <div className="rounded-2xl bg-[#08080f] p-6 flex flex-col items-center text-center h-full relative overflow-hidden">

          {/* Top glow behind icon */}
          <div
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: `radial-gradient(circle, ${accent}25, transparent 70%)` }}
          />

          {/* Icon container */}
          <div
            className="relative w-13 h-13 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300"
            style={{
              width: 52, height: 52,
              background: `${accent}18`,
              border: `1px solid ${accent}30`,
              boxShadow: `0 0 0 1px ${accent}08, 0 0 28px ${accent}20`,
            }}
          >
            <Icon size={22} style={{ color: accent }} />
          </div>

          {/* Title */}
          <div className="text-sm font-bold text-white mb-2 tracking-tight">{title}</div>

          {/* Desc */}
          <div className="text-xs text-white/42 leading-relaxed">{desc}</div>

          {/* Bottom accent dot */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
          />

        </div>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section id="ozellikler" className="py-28 px-4 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-orange-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-emerald-500/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto">

        {/* Section title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/25 bg-indigo-500/8 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-5">
            Özellikler
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
            Sektörünüze özel,
            <br />
            <span className="text-white/35">ihtiyacınıza göre</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            Her işletme tipi için ayrı ayrı düşünülmüş özellikler — tek bir platform.
          </p>
        </motion.div>

        {/* Sector cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-24">
          {sectors.map((s, i) => (
            <SectorCard key={s.id} sector={s} index={i} />
          ))}
        </div>

        {/* Core features — header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col items-center text-center mb-12"
        >
          {/* Decorative separator */}
          <div className="flex items-center gap-4 mb-10 w-full max-w-sm">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/12" />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/60" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/12" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/8 bg-white/3 text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">
            12 Güçlü Özellik
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">Tüm planlarda dahil</h3>
          <p className="text-white/45 max-w-md">Her Netravox müşterisi bu özellikleri kullanır — ek ücret yok.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {coreFeatures.map((f, i) => (
            <FeatureChip key={f.title} {...f} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
