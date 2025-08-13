'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ImageGallery from '@/components/ImageGallery';
import { fetchProducts } from '@/lib/productService';

type ProductContentProps = {
  slug: string;
};

export default function ProductContent({ slug }: ProductContentProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);

  // Load products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
        const foundProduct = fetchedProducts.find((p: any) => p.id.toString() === slug);
        setProduct(foundProduct);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ padding: '2rem 0', textAlign: 'center' }}>
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const handleWhatsAppInquiry = () => {
    const displayPrice = product.isOnSale && product.offerPrice ? product.offerPrice : product.price;
    const message = `Hi! I'm interested in the ${product.name} priced at AED ${displayPrice.toFixed(2)}. Can you provide more details about:
- Availability
- Installation service
- Warranty information
- Delivery to my location

Product Details:
- Dimensions: ${product.dimensions}
- Wattage: ${product.wattage}W
- Material: ${product.material}`;
    
    const whatsappUrl = `https://wa.me/971506970154?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '3rem',
          marginTop: '2rem'
        }}>
          {/* Product Image Gallery */}
          <div>
            <ImageGallery product={product} />
          </div>

          {/* Product Details */}
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              {product.name}
            </h1>
            <div style={{ marginBottom: '2rem' }}>
              {product.isOnSale && product.offerPrice ? (
                <>
                  <p style={{ 
                    fontSize: '2rem', 
                    color: '#dc2626', 
                    marginBottom: '0.5rem',
                    fontWeight: 'bold'
                  }}>
                    AED {product.offerPrice.toFixed(2)}
                  </p>
                  <p style={{ 
                    fontSize: '1.2rem', 
                    color: '#6b7280', 
                    marginBottom: '0.5rem',
                    textDecoration: 'line-through'
                  }}>
                    AED {product.price.toFixed(2)}
                  </p>
                  <span style={{ 
                    fontSize: '0.9rem', 
                    color: '#dc2626', 
                    fontWeight: '600',
                    backgroundColor: '#fef2f2',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '6px',
                    display: 'inline-block'
                  }}>
                    SALE!
                  </span>
                </>
              ) : (
                <p style={{ 
                  fontSize: '2rem', 
                  color: '#1f2937', 
                  marginBottom: '2rem',
                  fontWeight: 'bold'
                }}>
                  {product.price ? `AED ${product.price.toFixed(2)}` : 'Contact for Price'}
                </p>
              )}
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                {product.description}
              </p>
            </div>
            
            {/* Product Specifications */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Product Specifications
              </h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <strong>Dimensions:</strong> {product.dimensions}
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <strong>Bulb Type:</strong> {product.bulbType}
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <strong>Wattage:</strong> {product.wattage}W
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <strong>Voltage:</strong> {product.voltage}V
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <strong>Material:</strong> {product.material}
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <strong>Room:</strong> {product.room}
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <strong>Light Type:</strong> {product.lightType}
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <strong>Style:</strong> {product.style}
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <strong>Availability:</strong> {product.availability}
                </div>
              </div>
            </div>
            
            {/* WhatsApp Inquiry Button */}
            <button 
              onClick={handleWhatsAppInquiry}
              style={{
                backgroundColor: '#25d366',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#128c7e';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#25d366';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Inquire on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 