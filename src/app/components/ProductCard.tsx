
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { getProductImagePath } from '@/lib/utils';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const handleWhatsAppInquiry = () => {
    const message = `Hi! I'm interested in the ${product.name} priced at AED ${product.price.toFixed(2)}. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/971506970154?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const imagePath = getProductImagePath(product, product.category);

  return (
    <div className="product-card">
      <Link
        href={`/products/${product.id}`}
        style={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'block'
        }}
      >
        <div style={{ 
          height: '200px', 
          position: 'relative',
          borderRadius: '8px',
          marginBottom: '1rem',
          overflow: 'hidden'
        }}>
          <Image
            src={imagePath}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            priority={false}
          />
        </div>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>{product.name}</h3>
        <p style={{ color: '#6b7280', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
          {product.category}
        </p>
      </Link>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          AED {product.price.toLocaleString()}
        </span>
        <button 
          onClick={handleWhatsAppInquiry}
          className="btn btn-outline"
        >
          Inquire on WhatsApp
        </button>
      </div>
    </div>
  );
}
