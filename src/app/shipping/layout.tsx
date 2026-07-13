import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Info',
  description: 'Delivery information for SK Light House. We deliver across all 7 Emirates with standard, express, and installation options for lighting products.',
  openGraph: {
    title: 'Shipping Info | SK Light House',
    description: 'Delivery across all 7 Emirates. Standard, express, and installation options for your lighting order.',
  },
  alternates: { canonical: 'https://www.sklighthouse.com/shipping' },
};

export default function ShippingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
