import { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/firestore';

const BASE_URL = 'https://www.relighteal.com';

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: BASE_URL,                         lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
  { url: `${BASE_URL}/about`,              lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.5 },
  { url: `${BASE_URL}/contact`,            lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.6 },
  { url: `${BASE_URL}/faq`,               lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.5 },
  { url: `${BASE_URL}/categories/hanging-lights`,    lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/categories/spotlight`,         lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/categories/pendant-lights`,    lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/categories/magnetic-light`,    lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/categories/led-tube`,          lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/categories/office-lights`,     lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/categories/led-strip`,         lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/categories/aluminum-profile`,  lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/categories/mirror-light`,      lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/categories/led-track-lights`,  lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/categories/wall`,              lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/categories/garden-light`,      lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/categories/floodlight`,        lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/categories/solar-light`,       lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/categories/others`,            lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await getAllProducts();
    productPages = products.map(product => ({
      url: `${BASE_URL}/products/${product.id}`,
      lastModified: product.updatedAt ?? product.createdAt ?? new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));
  } catch {
    // Firestore unavailable at build time — products omitted from sitemap
  }
  return [...STATIC_PAGES, ...productPages];
}
