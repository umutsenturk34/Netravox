import { getPageBySlug } from '../../lib/api';
import KoleksiyonlarClient from '../../components/pages/KoleksiyonlarClient';

export const metadata = { title: 'Koleksiyonlar' };

export default async function KoleksiyonlarPage() {
  const page = await getPageBySlug('koleksiyonlar');
  return <KoleksiyonlarClient page={page} />;
}
