import { getCompany, getProducts, getBlog, getPageContent } from '../lib/api';
import HomeClient from '../components/pages/HomeClient';

export default async function HomePage() {
  const [company, products, posts, page] = await Promise.all([
    getCompany(),
    getProducts(),
    getBlog(),
    getPageContent('home'),
  ]);
  return <HomeClient company={company} products={products || []} posts={posts || []} page={page} />;
}
