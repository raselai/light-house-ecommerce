import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
});

const SITE_URL = 'https://www.relighteal.com';
const SITE_NAME = 'AL MESBAH ALABYAD LIGHTS TRADING L.L.C';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Relight EAL — Premium Lighting Solutions in UAE',
    template: '%s | Relight EAL',
  },
  description: 'Premium lighting solutions for homes and businesses across UAE. Shop chandeliers, LED strips, spotlights, pendant lights, garden lights and more at Dragon Mart, Dubai.',
  keywords: ['lighting UAE', 'LED lights Dubai', 'chandeliers UAE', 'indoor lighting', 'outdoor lighting', 'Dragon Mart lights', 'pendant lights', 'spotlight UAE'],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: SITE_URL,
    siteName: 'Relight EAL',
    title: 'Relight EAL — Premium Lighting Solutions in UAE',
    description: 'Premium lighting solutions for homes and businesses across UAE. Shop chandeliers, LED strips, spotlights, pendant lights and more.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Relight EAL — Premium Lighting Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Relight EAL — Premium Lighting Solutions in UAE',
    description: 'Premium lighting solutions for homes and businesses across UAE.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${poppins.variable}`} suppressHydrationWarning={true}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LightingStore',
          name: 'AL MESBAH ALABYAD LIGHTS TRADING L.L.C',
          alternateName: 'Relight EAL',
          url: 'https://www.relighteal.com',
          telephone: '+971506970154',
          email: 'kingon503@gmail.com',
          address: { '@type': 'PostalAddress', streetAddress: 'Dragon Mart, Near EB2 Gate', addressLocality: 'International City', addressRegion: 'Dubai', addressCountry: 'AE' },
          geo: { '@type': 'GeoCoordinates', latitude: 25.1688, longitude: 55.4130 },
          openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '10:00', closes: '22:00' }],
          priceRange: 'AED',
          currenciesAccepted: 'AED',
          sameAs: [],
        }) }} />
        <CartProvider>
          <Navbar />
          <main>
            {children}
          </main>
        
        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              {/* Row 1: AL MESBAH ALABYAD LIGHTS TRADING L.L.C | Quick Links */}
              <div className="footer-row">
                <div className="footer-section">
                  <h3>AL MESBAH ALABYAD LIGHTS TRADING L.L.C</h3>
                  <p>Premium lighting solutions for your home and business. Quality LED lights and modern fixtures.</p>
                  <div className="footer-contact">
                    <p>📍 International City, Dragon Mart, Near EB2 Gate</p>
                    <p>📧 kingon503@gmail.com</p>
                    <p>📞 +971 50 697 0154</p>
                  </div>
                </div>
                
                <div className="footer-section">
                  <h3>Quick Links</h3>
                  <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/contact">Contact</a></li>

                  </ul>
                </div>
              </div>
              
              {/* Row 2: Categories | Customer Service */}
              <div className="footer-row">
                <div className="footer-section">
                  <h3>Categories</h3>
                  <ul>
                    <li><a href="/categories/indoor-lights">Indoor Lights</a></li>
                    <li><a href="/categories/outdoor-lights">Outdoor Lights</a></li>
                    <li><a href="/categories/led-strip">LED Strip</a></li>
                    <li><a href="/categories/spotlight">Spotlight</a></li>
                  </ul>
                </div>
                
                <div className="footer-section">
                  <h3>Customer Service</h3>
                  <ul>
                    <li><a href="/contact">Contact Support</a></li>
                    <li><a href="/faq">FAQ</a></li>
                    <li><a href="/shipping">Shipping Info</a></li>
                    <li><a href="/returns">Returns</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <p>&copy; 2024 AL MESBAH ALABYAD LIGHTS TRADING L.L.C. All rights reserved.</p>
            </div>
          </div>
        </footer>
        </CartProvider>
      </body>
    </html>
  );
}
