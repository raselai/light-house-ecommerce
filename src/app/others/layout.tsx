import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Other Lighting Products',
  description: 'Discover unique and specialty lighting products at Relight EAL. Custom lighting solutions, one-of-a-kind designs, and specialist fixtures for any space in UAE.',
  openGraph: {
    title: 'Other Lighting Products | Relight EAL',
    description: 'Unique and specialty lighting solutions. Custom designs and specialist fixtures for any space in UAE.',
  },
  alternates: { canonical: 'https://www.relighteal.com/others' },
};

export default function OthersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
