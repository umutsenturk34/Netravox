import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Netravox — İşletmeniz için akıllı CMS",
  description: "Restoranlar, klinikler ve yerel işletmeler için hazır, yönetilebilir web sitesi altyapısı. Kodlama gerekmez.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
