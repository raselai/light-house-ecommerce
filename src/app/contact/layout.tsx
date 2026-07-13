import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with SK Light House. Visit us at Dragon Mart, International City Dubai, or reach us via WhatsApp on +971 50 697 0154. We respond within hours.',
  openGraph: {
    title: 'Contact Us | SK Light House',
    description: 'Visit us at Dragon Mart, Dubai or contact us via WhatsApp. We are here to help with all your lighting needs.',
  },
  alternates: { canonical: 'https://www.sklighthouse.com/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
