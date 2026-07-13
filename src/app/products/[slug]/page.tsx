import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import ProductContent from './ProductContent';
import { getProductById } from '@/lib/firestore';

// Render per request so product edits from the admin panel show immediately
export const dynamic = 'force-dynamic';

// Deduped so generateMetadata and the page share one Firestore read per request
const getProduct = cache(async (id: string) => {
  const product = await getProductById(id);
  if (!product) return null;
  // Strip non-serializable Firestore Timestamps before crossing the client boundary
  return JSON.parse(JSON.stringify(product)) as typeof product;
});

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProduct(slug);
    if (!product) return { title: 'Product Not Found' };
    const price = product.isOnSale && product.offerPrice ? product.offerPrice : product.price;
    const description = product.description
      ? `${product.description.slice(0, 140)} — AED ${price?.toLocaleString()}. Shop at SK Light House UAE.`
      : `${product.name} — AED ${price?.toLocaleString()}. Premium lighting available at SK Light House, Dragon Mart Dubai.`;
    const image = product.image ?? product.images?.[0];
    return {
      title: product.name,
      description,
      openGraph: {
        title: `${product.name} | SK Light House`,
        description,
        images: image ? [{ url: image, alt: product.name }] : undefined,
      },
      alternates: { canonical: `https://www.sklighthouse.com/products/${slug}` },
    };
  } catch {
    return { title: 'Product' };
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) {
    notFound();
  }

  const displayPrice = product.isOnSale && product.offerPrice ? product.offerPrice : product.price;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images?.length ? product.images : product.image ? [product.image] : undefined,
    sku: product.id,
    category: product.category,
    offers: {
      '@type': 'Offer',
      url: `https://www.sklighthouse.com/products/${product.id}`,
      priceCurrency: 'AED',
      price: displayPrice,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'AL MESBAH ALABYAD LIGHTS TRADING L.L.C' },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductContent product={product} />
    </>
  );
}
