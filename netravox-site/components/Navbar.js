"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const NAV = [
  { label: "Özellikler",   hash: "#ozellikler" },
  { label: "Nasıl Çalışır", hash: "#nasil-calisir" },
  { label: "Fiyatlar",     hash: "#fiyatlar" },
  { label: "Blog",         path: "/blog" },
  { label: "İletişim",     hash: "#iletisim" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  function getHref(item) {
    if (item.path) return item.path;
    return isHome ? item.hash : `/${item.hash}`;
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
    >
      <div
        className={`w-full max-w-5xl rounded-2xl px-5 py-3 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "bg-[#0e0e1f]/90 backdrop-blur-xl border border-white/8 shadow-xl shadow-black/40"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">N</span>
          </div>
          <span className="text-sm font-bold tracking-tight text-white">Netravox</span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={getHref(item)}
              className="px-3 py-1.5 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href={isHome ? "#iletisim" : "/#iletisim"}
          className="hidden md:inline-flex text-sm font-semibold px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-lg shadow-indigo-900/40"
        >
          İletişime Geç
        </a>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white/60 hover:text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 bg-[#0e0e1f]/95 backdrop-blur-xl rounded-2xl border border-white/8 p-4 shadow-2xl"
          >
            <nav className="flex flex-col gap-1 mb-4">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={getHref(item)}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 text-sm text-white/70 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href={isHome ? "#iletisim" : "/#iletisim"}
              onClick={() => setOpen(false)}
              className="block w-full text-center text-sm font-semibold px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            >
              İletişime Geç
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
