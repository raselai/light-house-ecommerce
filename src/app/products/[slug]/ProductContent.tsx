'use client';

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ImageGallery from '@/components/ImageGallery';
import { fetchProducts } from '@/lib/productService';
import WhatsAppIcon from '@/components/WhatsAppIcon';

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
            <WhatsAppIcon 
              onClick={handleWhatsAppInquiry}
              size={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 