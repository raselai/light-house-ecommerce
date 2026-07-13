import { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/firestore';

const BASE_URL = 'https://www.sklighthouse.com';

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: BASE_URL,                         changeFrequency: 'daily',   priority: 1.0 },
  { url: `${BASE_URL}/about`,              changeFrequency: 'monthly',  priority: 0.5 },
  { url: `${BASE_URL}/contact`,            changeFrequency: 'monthly',  priority: 0.6 },
  { url: `${BASE_URL}/faq`,               changeFrequency: 'monthly',  priority: 0.5 },
  { url: `${BASE_URL}/shipping`,          changeFrequency: 'monthly',  priority: 0.4 },
  { url: `${BASE_URL}/returns`,           changeFrequency: 'monthly',  priority: 0.4 },
  { url: `${BASE_URL}/categories/hanging-lights`,    changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/categories/spotlight`,         changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/categories/pendant-lights`,    changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/categories/magnetic-light`,    changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/categories/led-tube`,          changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/categories/office-lights`,     changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/categories/led-strip`,         changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/categories/aluminum-profile`,  changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/categories/mirror-light`,      changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/categories/led-track-lights`,  changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/categories/wall`,              changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/categories/garden-light`,      changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/categories/floodlight`,        changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/categories/solar-light`,       changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/categories/others`,            changeFrequency: 'weekly', priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await getAllProducts();
    productPages = products.map(product => ({
      url: `${BASE_URL}/products/${product.id}`,
      lastModified: product.updatedAt ?? product.createdAt ?? undefined,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));
  } catch {
    // Firestore unavailable at build time — products omitted from sitemap
  }
  return [...STATIC_PAGES, ...productPages];
}
