import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about SK Light House lighting products. Learn about installation services, warranty, delivery across UAE, and product specifications.',
  openGraph: {
    title: 'FAQ | SK Light House',
    description: 'Answers to common questions about our lighting products, installation services, warranty, and delivery across UAE.',
  },
  alternates: { canonical: 'https://www.sklighthouse.com/faq' },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
