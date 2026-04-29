"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Zap, ArrowRight, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Başlangıç",
    setup: "15.000",
    monthly: "1.500",
    desc: "Küçük işletmeler için hızlı başlangıç paketi.",
    features: [
      "5 sayfaya kadar",
      "Türkçe + İngilizce içerik",
      "Medya kütüphanesi (10 GB)",
      "SEO araçları",
      "1 kullanıcı",
      "SSL + CDN dahil",
      "E-posta desteği",
    ],
    cta: "Teklif Alın",
    highlight: false,
    accent: "#6366f1",
  },
  {
    name: "Profesyonel",
    setup: "25.000",
    monthly: "2.500",
    desc: "Büyüyen işletmeler için rezervasyon ve analitik dahil.",
    features: [
      "Sınırsız sayfa",
      "Türkçe + İngilizce içerik",
      "Medya kütüphanesi (50 GB)",
      "SEO + Redirect + Sitemap",
      "Rezervasyon sistemi",
      "GA4 analitik entegrasyonu",
      "5 kullanıcı + rol yönetimi",
      "Öncelikli destek",
    ],
    cta: "İletişime Geç",
    highlight: true,
    badge: "En Popüler",
    accent: "#818cf8",
  },
  {
    name: "Kurumsal",
    setup: "Özel",
    monthly: "Özel",
    desc: "Birden fazla şube veya franchise modeli için.",
    features: [
      "Çok lokasyon / şube",
      "Özel sektör modülü",
      "Sınırsız kullanıcı",
      "API erişimi",
      "Özel entegrasyonlar",
      "SLA garantisi",
      "Özel onboarding",
      "Hesap yöneticisi",
    ],
    cta: "Görüşme Ayarlayın",
    highlight: false,
    accent: "#06b6d4",
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="fiyatlar" className="py-28 px-4 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-indigo-600/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-violet-600/4 blur-3xl rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/25 bg-indigo-500/8 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-5">
            Fiyatlandırma
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Şeffaf, sürprizsiz fiyatlar
          </h2>
          <p className="text-white/45 max-w-lg mx-auto text-lg">
            Tek seferlik kurulum + aylık panel kullanım ücreti.
            Gizli maliyet yok.
          </p>
        </motion.div>

        {/* Pricing model boxes */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-4 mb-14"
        >
          {[
            {
              step: "1",
              title: "Tek seferlik kurulum",
              desc: "Web sitenizin tasarımı, kurulumu ve yayına alınması. Bir kez ödenir.",
              accent: "#6366f1",
            },
            {
              step: "2",
              title: "Aylık panel ücreti",
              desc: "Hosting, bakım, güncelleme ve teknik destek. Her ay aynı fiyat.",
              accent: "#8b5cf6",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex-1 p-px rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${item.accent}30, rgba(255,255,255,0.05), transparent)`,
              }}
            >
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#08080f] h-full">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                  style={{ background: item.accent + "20", color: item.accent }}
                >
                  {item.step}
                </div>
                <div>
                  <div className="text-sm font-bold text-white mb-1">{item.title}</div>
                  <div className="text-xs text-white/40 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              className="group relative flex flex-col"
            >
              {/* Badge */}
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-900/60">
                    <Zap size={10} fill="currentColor" />
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Gradient border */}
              <div
                className="p-px rounded-3xl flex-1 flex flex-col"
                style={{
                  background: plan.highlight
                    ? `linear-gradient(145deg, ${plan.accent}60, ${plan.accent}20 40%, ${plan.accent}40 100%)`
                    : `linear-gradient(145deg, ${plan.accent}25, rgba(255,255,255,0.04), transparent)`,
                }}
              >
                <div
                  className="rounded-3xl flex flex-col flex-1 p-7 relative overflow-hidden"
                  style={{
                    background: plan.highlight
                      ? `linear-gradient(160deg, #0f0f2a, #080810)`
                      : "#08080f",
                  }}
                >

                  {/* Corner glow */}
                  <div
                    className="absolute -top-16 -left-16 w-48 h-48 rounded-full pointer-events-none transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      opacity: plan.highlight ? 0.7 : 0.3,
                      background: `radial-gradient(circle, ${plan.accent}22, transparent 70%)`,
                    }}
                  />

                  {/* Plan name */}
                  <div
                    className="text-[10px] font-black uppercase tracking-[0.18em] mb-6"
                    style={{ color: plan.accent + "90" }}
                  >
                    {plan.name}
                  </div>

                  {/* Setup fee */}
                  <div className="mb-4 pb-4" style={{ borderBottom: `1px solid ${plan.accent}18` }}>
                    <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1.5">
                      Kurulum (tek seferlik)
                    </div>
                    {plan.setup === "Özel" ? (
                      <div className="text-2xl font-bold text-white">Özel Fiyat</div>
                    ) : (
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className="text-3xl font-black tracking-tight text-white"
                          style={{ textShadow: `0 0 30px ${plan.accent}35` }}
                        >
                          ₺{plan.setup}
                        </span>
                        <span className="text-xs text-white/30">+ KDV</span>
                      </div>
                    )}
                  </div>

                  {/* Monthly fee */}
                  <div className="mb-5">
                    <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1.5">
                      Aylık panel ücreti
                    </div>
                    {plan.monthly === "Özel" ? (
                      <div className="text-xl font-bold text-white">Özel Fiyat</div>
                    ) : (
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className="text-2xl font-black tracking-tight"
                          style={{
                            color: plan.highlight ? plan.accent : "white",
                            textShadow: plan.highlight ? `0 0 25px ${plan.accent}50` : "none",
                          }}
                        >
                          ₺{plan.monthly}
                        </span>
                        <span className="text-xs text-white/30">/ay + KDV</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-white/38 leading-relaxed mb-6">{plan.desc}</p>

                  {/* Features */}
                  <ul className="space-y-2.5 flex-1 mb-7">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-xs text-white/65">
                        <div
                          className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            background: plan.accent + "18",
                            border: `1px solid ${plan.accent}28`,
                          }}
                        >
                          <Check size={8} style={{ color: plan.accent }} strokeWidth={3} />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="#iletisim"
                    className="relative flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
                    style={
                      plan.highlight
                        ? {
                            background: `linear-gradient(135deg, ${plan.accent}, #6366f1)`,
                            color: "white",
                            boxShadow: `0 8px 32px ${plan.accent}35`,
                          }
                        : {
                            border: `1px solid ${plan.accent}25`,
                            color: plan.accent + "cc",
                            background: plan.accent + "08",
                          }
                    }
                  >
                    {plan.highlight && <Sparkles size={13} />}
                    {plan.cta}
                    <ArrowRight size={13} />
                  </a>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center space-y-1.5"
        >
          <p className="text-xs text-white/22">
            Tüm fiyatlara KDV dahil değildir. Yıllık ödemede %15 indirim uygulanır.
          </p>
          <p className="text-xs text-white/18">
            Kurulum ücreti domain bağlantısı, SSL sertifikası, ilk içerik girişi ve 1 ay ücretsiz revizyonu kapsar.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
