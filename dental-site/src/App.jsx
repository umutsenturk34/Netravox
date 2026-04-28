import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import AppointmentPage from './pages/AppointmentPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hizmetler" element={<ServicesPage />} />
          <Route path="/hakkimizda" element={<AboutPage />} />
          <Route path="/galeri" element={<GalleryPage />} />
          <Route path="/randevu" element={<AppointmentPage />} />
          <Route path="/iletisim" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
