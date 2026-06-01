import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about AL MESBAH ALABYAD LIGHTS TRADING L.L.C — your trusted lighting partner in UAE. Located at Dragon Mart, Dubai, we offer premium indoor and outdoor lighting solutions.',
  openGraph: {
    title: 'About Us | Relight EAL',
    description: 'Your trusted lighting partner in UAE. Premium LED lights, chandeliers, and modern fixtures at Dragon Mart, Dubai.',
  },
  alternates: { canonical: 'https://www.sklighthouse.com/about' },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
