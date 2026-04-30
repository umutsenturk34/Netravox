import { getCompany, getFaqs, getPageBySlug } from '../../lib/api';
import IletisimClient from '../../components/pages/IletisimClient';

export const metadata = { title: 'İletişim' };

export default async function IletisimPage() {
  const [company, faqs, page] = await Promise.all([getCompany(), getFaqs(), getPageBySlug('iletisim')]);
  return <IletisimClient company={company} faqs={faqs} page={page} />;
}
