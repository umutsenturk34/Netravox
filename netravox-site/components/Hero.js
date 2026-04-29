"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ModelViewer from "./ModelViewer";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
});

export default function Hero({ company }) {
  const subtitle = company?.description?.tr ||
    "Restoranlar, klinikler ve yerel işletmeler için tasarlanmış hazır CMS altyapısı. Kodlama bilgisi gerekmez — sayfanızı, menünüzü ve rezervasyonlarınızı dakikalar içinde yönetin.";
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-20 overflow-hidden">

      {/* 3D model — full-section background, behind all content */}
      <div className="absolute inset-0 pointer-events-none">
        <ModelViewer style={{ width: "100%", height: "100%" }} />
      </div>

      {/* Bottom fade so it blends into next section */}
      <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-[#06060f] via-[#06060f]/60 to-transparent pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Text content — above the canvas */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">

        {/* Dark vignette behind text block so it stays readable over the 3D model */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 85% 70% at 50% 42%, rgba(6,6,15,0.72) 0%, rgba(6,6,15,0.38) 55%, transparent 100%)",
          }}
        />

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.2)}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
          style={{ textShadow: "0 2px 40px rgba(6,6,15,0.9), 0 1px 4px rgba(6,6,15,0.8)" }}
        >
          <span className="text-white">Web sitenizi yönetin,</span>
          <br />
          <span
            className="inline-block"
            style={{
              background: "linear-gradient(100deg, #ffffff 0%, #c7d2fe 35%, #a78bfa 65%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 28px rgba(139,92,246,0.55)) drop-shadow(0 0 8px rgba(199,210,254,0.35))",
            }}
          >
            işinize odaklanın
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.3)}
          className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ textShadow: "0 1px 20px rgba(6,6,15,0.95)" }}
        >
          {subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20">
          <a
            href="#iletisim"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all hover:shadow-xl hover:shadow-indigo-900/50 hover:-translate-y-0.5"
          >
            Hemen İletişime Geç
            <ArrowRight size={15} />
          </a>
          <a
            href="#nasil-calisir"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/15 hover:border-white/25 bg-[#06060f]/50 backdrop-blur-sm text-white/80 hover:text-white font-medium text-sm transition-all hover:bg-white/8"
          >
            Nasıl çalışır?
          </a>
        </motion.div>

      </div>
    </section>
  );
}
