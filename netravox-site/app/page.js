import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
const SLUG = process.env.NEXT_PUBLIC_TENANT_SLUG || "netravox";

async function fetchJSON(path) {
  try {
    const res = await fetch(`${API}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function Home() {
  const [company, faqs] = await Promise.all([
    fetchJSON(`/api/public/${SLUG}/company`),
    fetchJSON(`/api/public/${SLUG}/faqs`),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero company={company} />
        <Features />
        <HowItWorks />
        <Pricing />
        <FAQ initialFaqs={faqs} />
        <Contact company={company} />
      </main>
      <Footer company={company} />
    </>
  );
}
