import { getProducts } from '../../../lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  const products = await getProducts();
  return Response.json(products || []);
}
