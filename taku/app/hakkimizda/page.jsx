import { getCompany, getPageBySlug } from '../../lib/api';
import HakkimizdaClient from '../../components/pages/HakkimizdaClient';

export const metadata = { title: 'Hakkımızda' };

export default async function HakkimizdaPage() {
  const [company, page] = await Promise.all([getCompany(), getPageBySlug('hakkimizda')]);
  return <HakkimizdaClient company={company} page={page} />;
}
