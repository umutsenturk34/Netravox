import { notFound } from 'next/navigation';
import { getProduct, getProducts, getCompany } from '../../../lib/api';
import ProductDetailClient from '../../../components/pages/ProductDetailClient';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: 'Ürün Bulunamadı' };
  return {
    title: product.name?.tr || product.name,
    description: product.description?.tr,
  };
}

export async function generateStaticParams() {
  const products = await getProducts() || [];
  return products.map((p) => ({ id: p._id.toString() }));
}

export default async function UrunDetayPage({ params }) {
  const { id } = await params;
  const [product, allProducts, company] = await Promise.all([
    getProduct(id),
    getProducts(),
    getCompany(),
  ]);

  if (!product) notFound();

  const related = (allProducts || []).filter((p) => p._id !== id).slice(0, 4);
  return <ProductDetailClient product={product} related={related} company={company} />;
}
