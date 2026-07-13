import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Other Lighting Products',
  description: 'Discover unique and specialty lighting products at SK Light House. Custom lighting solutions, one-of-a-kind designs, and specialist fixtures for any space in UAE.',
  openGraph: {
    title: 'Other Lighting Products | SK Light House',
    description: 'Unique and specialty lighting solutions. Custom designs and specialist fixtures for any space in UAE.',
  },
  alternates: { canonical: 'https://www.sklighthouse.com/others' },
};

export default function OthersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
