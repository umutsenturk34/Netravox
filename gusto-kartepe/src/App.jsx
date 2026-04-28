import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MenuPage from './pages/MenuPage';
import GalleryPage from './pages/GalleryPage';
import ReservationPage from './pages/ReservationPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hakkimizda" element={<AboutPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/galeri" element={<GalleryPage />} />
          <Route path="/rezervasyon" element={<ReservationPage />} />
          <Route path="/iletisim" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
