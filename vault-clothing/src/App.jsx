import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppFloat from './components/ui/WhatsAppFloat';
import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-sans)' }}>
      <Header />
      <WhatsAppFloat />
      <main className="flex-1">
        <Routes>
          <Route path="/"                       element={<HomePage />} />
          <Route path="/koleksiyonlar"           element={<CollectionsPage />} />
          <Route path="/koleksiyonlar/:id"       element={<ProductDetailPage />} />
          <Route path="/hakkimizda"              element={<AboutPage />} />
          <Route path="/blog"                    element={<BlogPage />} />
          <Route path="/blog/:slug"              element={<BlogPostPage />} />
          <Route path="/iletisim"                element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
