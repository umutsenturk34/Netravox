"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Paintbrush, Rocket, LifeBuoy, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Bize ulaşın",
    desc: "İşletmenizi, sektörünüzü ve hedeflerinizi anlayalım. Görüşme tamamen ücretsiz, randevu gerekmez.",
    accent: "#6366f1",
    glow: "rgba(99,102,241,0.18)",
    tag: "Ücretsiz görüşme",
  },
  {
    number: "02",
    icon: Paintbrush,
    title: "Kurulum ve özelleştirme",
    desc: "Logonuzu, renklerinizi ve içeriklerinizi sisteme yüklüyoruz. Sitenizi beraber yapılandırıyoruz.",
    accent: "#8b5cf6",
    glow: "rgba(139,92,246,0.18)",
    tag: "Ortalama 2 gün",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Yayına alın",
    desc: "Domain bağlantısı, SSL sertifikası ve CDN kurulumu tamamlanır. Siteniz live.",
    accent: "#06b6d4",
    glow: "rgba(6,182,212,0.18)",
    tag: "Ortalama 1 gün",
  },
  {
    number: "04",
    icon: LifeBuoy,
    title: "Siz yönetin, biz destekleyelim",
    desc: "Panel üzerinden her içeriği kendiniz güncelleyin. Teknik sorularda 7/24 destek ekibimiz yanınızda.",
    accent: "#10b981",
    glow: "rgba(16,185,129,0.18)",
    tag: "Sürekli destek",
  },
];

const stats = [
  { value: "5", unit: "gün", label: "Ortalama kurulum", accent: "#6366f1" },
  { value: "99.9", unit: "%", label: "Uptime garantisi", accent: "#06b6d4" },
  { value: "7/24", unit: "", label: "Teknik destek", accent: "#10b981" },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="nasil-calisir" className="py-28 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-violet-600/4 blur-3xl rounded-full" />
        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-cyan-600/3 blur-3xl rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/25 bg-violet-500/8 text-violet-300 text-xs font-semibold uppercase tracking-widest mb-5">
            Nasıl Çalışır
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            4 adımda canlı site
          </h2>
          <p className="text-white/45 max-w-lg mx-auto text-lg">
            Görüşmeden yayına, ortalama 5 iş günü.
          </p>
        </motion.div>

        {/* Steps — horizontal timeline on desktop */}
        <div className="relative">

          {/* Connector line (desktop only) */}
          <div className="absolute top-[52px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px hidden lg:block"
            style={{ background: "linear-gradient(90deg, #6366f130, #8b5cf630, #06b6d430, #10b98130)" }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                className="group relative flex flex-col"
              >
                {/* Gradient border */}
                <div
                  className="p-px rounded-3xl h-full"
                  style={{
                    background: `linear-gradient(160deg, ${step.accent}35, rgba(255,255,255,0.05) 50%, transparent)`,
                  }}
                >
                  <div className="rounded-3xl bg-[#08080f] p-6 flex flex-col h-full relative overflow-hidden">

                    {/* Corner glow */}
                    <div
                      className="absolute -top-12 -left-12 w-40 h-40 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(circle, ${step.glow}, transparent 70%)` }}
                    />

                    {/* Step number + icon row */}
                    <div className="relative flex items-center justify-between mb-6">
                      {/* Icon */}
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                        style={{
                          background: `${step.accent}18`,
                          border: `1px solid ${step.accent}30`,
                          boxShadow: `0 0 28px ${step.accent}22`,
                        }}
                      >
                        <step.icon size={24} style={{ color: step.accent }} />
                      </div>

                      {/* Number badge */}
                      <div
                        className="text-xs font-black tabular-nums px-2.5 py-1 rounded-xl tracking-widest"
                        style={{ background: `${step.accent}12`, color: `${step.accent}90` }}
                      >
                        {step.number}
                      </div>
                    </div>

                    {/* Tag */}
                    <div
                      className="relative text-[10px] font-semibold uppercase tracking-widest mb-3"
                      style={{ color: `${step.accent}80` }}
                    >
                      {step.tag}
                    </div>

                    {/* Title */}
                    <h3 className="relative text-base font-bold text-white mb-3 leading-snug tracking-tight">
                      {step.title}
                    </h3>

                    {/* Desc */}
                    <p className="relative text-sm text-white/45 leading-relaxed flex-1">
                      {step.desc}
                    </p>

                    {/* Bottom accent bar */}
                    <div
                      className="relative mt-6 h-0.5 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${step.accent}50, ${step.accent}15, transparent)`,
                      }}
                    />

                  </div>
                </div>

                {/* Arrow connector between cards (desktop, hidden on last) */}
                {i < steps.length - 1 && (
                  <div className="absolute -right-3 top-12 hidden lg:flex items-center justify-center z-10">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: "#08080f", border: `1px solid ${step.accent}25` }}
                    >
                      <ArrowRight size={10} style={{ color: step.accent + "70" }} />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="group relative"
            >
              <div
                className="p-px rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${stat.accent}28, rgba(255,255,255,0.04), transparent)`,
                }}
              >
                <div className="rounded-2xl bg-[#08080f] py-8 px-4 text-center relative overflow-hidden">

                  {/* Subtle glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 100%, ${stat.accent}10, transparent 70%)` }}
                  />

                  <div className="relative flex items-baseline justify-center gap-1 mb-2">
                    <span
                      className="text-4xl sm:text-5xl font-black tracking-tight"
                      style={{
                        color: "white",
                        textShadow: `0 0 40px ${stat.accent}50`,
                      }}
                    >
                      {stat.value}
                    </span>
                    {stat.unit && (
                      <span
                        className="text-xl sm:text-2xl font-bold"
                        style={{ color: stat.accent }}
                      >
                        {stat.unit}
                      </span>
                    )}
                  </div>
                  <div className="relative text-xs text-white/40 font-medium tracking-wide">{stat.label}</div>

                  {/* Bottom line */}
                  <div
                    className="relative mt-5 mx-auto w-10 h-0.5 rounded-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${stat.accent}60, transparent)` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
