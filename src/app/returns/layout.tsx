import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Returns',
  description: 'Return and warranty policy for SK Light House. 7-day return policy on unused products, plus 1-3 year warranty coverage on lighting fixtures.',
  openGraph: {
    title: 'Returns | SK Light House',
    description: '7-day return policy on unused products, plus warranty coverage on lighting fixtures.',
  },
  alternates: { canonical: 'https://www.sklighthouse.com/returns' },
};

export default function ReturnsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
