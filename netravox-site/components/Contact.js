"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle } from "lucide-react";

export default function Contact({ company }) {
  const contactEmail = company?.contact?.email || "hello@netravox.com";
  const contactPhone = company?.contact?.phone || null;
  const contactAddress = company?.contact?.address
    ? `${company.contact.address}${company.contact.city ? ", " + company.contact.city : ""}`
    : null;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", phone: "", sector: "", message: "" });
  const [kvkk, setKvkk] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!kvkk) { setError("KVKK onayı zorunludur."); return; }
    setError("");
    setLoading(true);
    try {
      const msgParts = [];
      if (form.sector) msgParts.push(`Sektör: ${form.sector}`);
      if (form.phone) msgParts.push(`Telefon: ${form.phone}`);
      if (form.message) msgParts.push(form.message);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: msgParts.join(" | ") || "Görüşme talebi",
          kvkkConsent: true,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.message || "Bir hata oluştu.");
      } else {
        setSent(true);
      }
    } catch {
      setError("Sunucuya ulaşılamadı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="iletisim" className="py-28 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/6 blur-3xl rounded-full -z-10" />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/25 bg-indigo-500/8 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-6">
              İletişim
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
              Projenizi birlikte<br />
              <span className="text-white/40">hayata geçirelim</span>
            </h2>
            <p className="text-white/50 leading-relaxed mb-8">
              Görüşme tamamen ücretsiz. Size uygun planı belirleyip
              kurulum sürecini birlikte başlatalım.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { icon: Mail, label: "E-posta", value: contactEmail },
                contactPhone && { icon: Phone, label: "Telefon", value: contactPhone },
                contactAddress && { icon: MapPin, label: "Adres", value: contactAddress },
              ].filter(Boolean).map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                    <c.icon size={15} className="text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/30">{c.label}</div>
                    <div className="text-sm font-medium text-white/80">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="p-5 rounded-2xl border border-white/6 bg-white/2">
              <p className="text-sm text-white/60 leading-relaxed mb-4">
                "Netravox ile web sitemizi kendimiz günceller hale geldik. Menü değişiklikleri artık 2 dakika sürüyor."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                  G
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Gusto Kartepe</div>
                  <div className="text-[11px] text-white/35">Restoran · Kartepe, Kocaeli</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-2xl border border-white/8 bg-white/2 p-6"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 flex items-center justify-center mb-4">
                  <CheckCircle size={28} className="text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Mesajınız alındı!</h3>
                <p className="text-sm text-white/50">En geç 24 saat içinde size dönüş yapacağız.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5">Ad Soyad</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Ahmet Yılmaz"
                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all"
                    style={{ fontSize: "16px" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5">E-posta</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="ahmet@sirket.com"
                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all"
                    style={{ fontSize: "16px" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5">Telefon</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="0555 000 00 00"
                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all"
                    style={{ fontSize: "16px" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5">Sektör</label>
                  <select
                    value={form.sector}
                    onChange={(e) => setForm((p) => ({ ...p, sector: e.target.value }))}
                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white/70 outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all appearance-none"
                    style={{ fontSize: "16px" }}
                  >
                    <option value="">Sektörünüzü seçin (isteğe bağlı)</option>
                    <option value="restaurant">Restoran / Kafe</option>
                    <option value="dental">Diş Kliniği</option>
                    <option value="realty">Emlak</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5">Mesaj (isteğe bağlı)</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Projeniz hakkında kısa bilgi..."
                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all resize-none"
                    style={{ fontSize: "16px" }}
                  />
                </div>

                {/* KVKK */}
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={kvkk}
                    onChange={(e) => setKvkk(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded accent-indigo-500 shrink-0"
                  />
                  <span className="text-[11px] text-white/35 leading-relaxed">
                    Kişisel verilerimin KVKK kapsamında işlenmesine ve iletişim amacıyla kullanılmasına onay veriyorum.
                  </span>
                </label>

                {error && (
                  <p className="text-xs text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-indigo-900/40 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="animate-pulse">Gönderiliyor...</span>
                  ) : (
                    <>
                      Mesaj Gönder
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
