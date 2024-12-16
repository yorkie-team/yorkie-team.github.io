import { Metadata } from 'next';
import ProductPage from './product-page';

export const metadata: Metadata = {
  title: 'Products · Yorkie',
};

export default async function Page() {
  return <ProductPage />;
}
