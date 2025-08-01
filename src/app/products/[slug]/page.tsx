
'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { use, useState, useEffect } from 'react';
import ImageGallery from '@/components/ImageGallery';
import { fetchProducts } from '@/lib/productService';

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
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
    const message = `Hi! I'm interested in the ${product.name} priced at AED ${product.price.toFixed(2)}. Can you provide more details about:
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
            <p style={{ 
              fontSize: '2rem', 
              color: '#1f2937', 
              marginBottom: '2rem',
              fontWeight: 'bold'
            }}>
              AED {product.price.toFixed(2)}
            </p>
            
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
                background: '#f9fafb',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem'
                }}>
                  <div>
                    <strong>Dimensions:</strong> {product.dimensions}
                  </div>
                  <div>
                    <strong>Bulb Type:</strong> {product.bulbType}
                  </div>
                  <div>
                    <strong>Wattage:</strong> {product.wattage}W
                  </div>
                  <div>
                    <strong>Voltage:</strong> {product.voltage}
                  </div>
                  <div>
                    <strong>Material:</strong> {product.material}
                  </div>
                  <div>
                    <strong>Category:</strong> {product.category}
                  </div>
                  <div>
                    <strong>Style:</strong> {product.style}
        </div>
        <div>
                    <strong>Availability:</strong> 
                    <span style={{
                      marginLeft: '0.5rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      background: product.availability === 'In Stock' ? '#dcfce7' : 
                                product.availability === 'Limited Stock' ? '#fef3c7' : '#fef2f2',
                      color: product.availability === 'In Stock' ? '#059669' : 
                             product.availability === 'Limited Stock' ? '#d97706' : '#dc2626'
                    }}>
                      {product.availability}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ratings */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ display: 'flex' }}>
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      style={{ 
                        color: i < Math.floor(product.rating) ? '#f59e0b' : '#d1d5db',
                        fontSize: '1.2rem'
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                  ({product.rating}/5 from {product.reviewCount} reviews)
                </span>
              </div>
            </div>
            
            {/* WhatsApp Button */}
            <button 
              onClick={handleWhatsAppInquiry}
              style={{
                width: '100%',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>💬</span>
              Inquire on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
