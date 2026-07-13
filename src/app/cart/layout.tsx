import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Cart',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://www.sklighthouse.com/cart' },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
