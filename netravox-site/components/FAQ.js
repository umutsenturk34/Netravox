"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const STATIC_FAQS = [
  {
    question: { tr: "Kurulum süreci ne kadar sürer?" },
    answer: { tr: "Ortalama 5 iş günü içinde siteniz yayına alınır. Bu süreç; tasarım konfigürasyonu, içerik girişi, domain bağlantısı ve SSL kurulumunu kapsar. İçeriklerin tarafınızdan hızlı iletilmesi durumunda 3 iş gününe kadar düşebilir." },
  },
  {
    question: { tr: "Panel üzerinden hangi içerikleri yönetebilirim?" },
    answer: { tr: "Sayfa içerikleri, görsel ve video galerisi, menü öğeleri (restoranlar için), hizmet listesi, rezervasyon talepleri, SEO ayarları (meta, Open Graph, schema), dil içerikleri (TR/EN) ve firma marka ayarlarını tamamen kendiniz yönetebilirsiniz." },
  },
  {
    question: { tr: "Teknik bilgim olmasa da kullanabilir miyim?" },
    answer: { tr: "Evet. Panel, teknik bilgi gerektirmeden kullanılmak üzere tasarlanmıştır. Sürükle-bırak yerine şablon tabanlı bir yapı kullandığımız için hata payı minimumdur. Onboarding sürecinde panel kullanımını adım adım gösteriyoruz." },
  },
  {
    question: { tr: "Aylık ücrete neler dahil?" },
    answer: { tr: "Hosting, SSL sertifikası yenileme, CDN hizmetleri, platform güncellemeleri, güvenlik yamaları, teknik destek (e-posta/WhatsApp) ve 7/24 uptime izleme aylık ücrete dahildir. Ek sayfa ya da modül talep edilmedikçe ekstra ücret alınmaz." },
  },
  {
    question: { tr: "Sitenin içerikleri birden fazla dilde olabilir mi?" },
    answer: { tr: "Evet. Tüm planlarda Türkçe ve İngilizce içerik yönetimi standarttır. Her sayfa ve bileşen için ayrı dil alanları mevcuttur. Kurumsal planda ek dil desteği talep üzerine eklenebilir." },
  },
  {
    question: { tr: "Mevcut domain adımı kullanabilir miyim?" },
    answer: { tr: "Evet, mevcut domain adresinizi Netravox altyapısına bağlayabiliriz. Domain sağlayıcınızın DNS ayarlarında yönlendirme yapmanız yeterlidir; bu işlemi kurulum sürecinde sizin adınıza gerçekleştiriyoruz." },
  },
  {
    question: { tr: "Sözleşmeyi istediğim zaman iptal edebilir miyim?" },
    answer: { tr: "Aylık abonelik modeliyle çalışıyoruz. Minimum taahhüt süresi yoktur; dilediğiniz ayın sonunda hizmeti sonlandırabilirsiniz. İptal sonrası verilerinizi belirli bir süre boyunca dışa aktarmanıza yardımcı oluruz." },
  },
  {
    question: { tr: "Birden fazla şubem için tek bir panel yeterli mi?" },
    answer: { tr: "Kurumsal planda çok lokasyon / şube yönetimi desteklenmektedir. Her şube kendi içerik paneline sahip olabilir ya da merkezi bir yönetimle tek panel üzerinden yönetilebilir. Detaylar için bizimle iletişime geçin." },
  },
];

function FAQItem({ item, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="group"
    >
      <div
        className="p-px rounded-2xl transition-all duration-300"
        style={{
          background: isOpen
            ? "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(139,92,246,0.15), transparent)"
            : "linear-gradient(135deg, rgba(255,255,255,0.06), transparent)",
        }}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: isOpen ? "#0c0c20" : "#09090f" }}
        >
          {/* Question row */}
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200"
          >
            <span className="text-sm sm:text-base font-semibold text-white/85 leading-snug group-hover:text-white transition-colors">
              {item.q}
            </span>
            <div
              className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{
                background: isOpen ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.06)",
                border: isOpen ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {isOpen
                ? <Minus size={14} className="text-indigo-400" />
                : <Plus size={14} className="text-white/40 group-hover:text-white/70 transition-colors" />
              }
            </div>
          </button>

          {/* Answer */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div
                  className="px-6 pb-5 text-sm text-white/50 leading-relaxed"
                  style={{ borderTop: "1px solid rgba(99,102,241,0.12)" }}
                >
                  <div className="pt-4">{item.a}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function FAQ({ initialFaqs }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState(0);

  const rawFaqs = initialFaqs?.length ? initialFaqs : STATIC_FAQS;
  const faqs = rawFaqs.map((f) => ({
    q: f.question?.tr || '',
    a: f.answer?.tr || '',
  }));

  return (
    <section id="sss" className="py-28 px-4 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-indigo-600/4 blur-3xl rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto">

        {/* Title */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/25 bg-indigo-500/8 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-5">
            SSS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Sıkça sorulan sorular
          </h2>
          <p className="text-white/45 max-w-lg mx-auto text-lg">
            Aklınızdaki soruların yanıtlarını burada bulamazsanız
            bizimle doğrudan iletişime geçin.
          </p>
        </motion.div>

        {/* FAQ list */}
        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-white/35 mb-4">
            Başka sorunuz var mı?
          </p>
          <a
            href="#iletisim"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-indigo-500/25 bg-indigo-500/8 text-indigo-300 text-sm font-semibold hover:bg-indigo-500/15 hover:border-indigo-500/40 transition-all"
          >
            Bize yazın
          </a>
        </motion.div>

      </div>
    </section>
  );
}
