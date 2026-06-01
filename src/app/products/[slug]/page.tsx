import { Metadata } from 'next';
import ProductContent from './ProductContent';
import { getProductById } from '@/lib/firestore';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProductById(slug);
    if (!product) return { title: 'Product Not Found' };
    const price = product.isOnSale && product.offerPrice ? product.offerPrice : product.price;
    const description = product.description
      ? `${product.description.slice(0, 140)} — AED ${price?.toLocaleString()}. Shop at Relight EAL UAE.`
      : `${product.name} — AED ${price?.toLocaleString()}. Premium lighting available at Relight EAL, Dragon Mart Dubai.`;
    const image = product.image ?? product.images?.[0];
    return {
      title: product.name,
      description,
      openGraph: {
        title: `${product.name} | Relight EAL`,
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
  return <ProductContent slug={slug} />;
}
