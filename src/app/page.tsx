'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchProducts } from '@/lib/productService';
import { getProductImagePath } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

export default function Home() {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'indoor' | 'outdoor' | 'others'>('all');
  const { addToCart } = useCart();

  const heroImages = [
    '/images/hero/hero-1.jpg',
    '/images/hero/hero-2.jpg',
    '/images/hero/hero-3.jpg'
  ];

  // Load products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  // Ensure client-side rendering for animations
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Animate hero background images (only on client)
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isClient, heroImages.length]);

  // Get featured products from actual product data
  const featuredProducts = products.filter((product: any) => product.isFeatured).slice(0, 6);

  // Get seasonal sale products (products that are on sale)
  const seasonalProducts = products.filter((product: any) => product.isOnSale).slice(0, 6);

  // Filter products by category for the new products section
  const indoorProducts = products.filter((product: any) => 
    product.category && product.category.toLowerCase().includes('indoor')
  );

  const outdoorProducts = products.filter((product: any) =>
    product.category && product.category.toLowerCase().includes('outdoor')
  );

  const othersProducts = products.filter((product: any) =>
    product.category && product.category.toLowerCase().includes('others')
  );

  // Get current tab products
  const currentTabProducts = activeTab === 'all'
    ? products
    : activeTab === 'indoor'
    ? indoorProducts
    : activeTab === 'outdoor'
    ? outdoorProducts
    : othersProducts;


  return (
    <div>
      {/* Hero Section with Animated Background */}
      <section className="hero" style={{
        backgroundImage: `linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%), url(${heroImages[isClient ? currentHeroImage : 0]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
        transition: isClient ? 'background-image 0.5s ease-in-out' : 'none'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            The Art of Lighting
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            Premium lighting solutions for residential and commercial spaces across UAE
          </p>

          <Link href="/contact" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </section>

      {/* New Products Section */}
      <section style={{ padding: '4rem 0', backgroundColor: '#f9fafb' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2rem' }}>
            New Products
            </h2>
          
          {/* Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem',
            gap: '1rem'
          }}>
            <button
              onClick={() => setActiveTab('all')}
              style={{
                padding: '0.75rem 2rem',
                background: activeTab === 'all' ? '#8b5cf6' : 'white',
                color: activeTab === 'all' ? 'white' : '#374151',
                border: '2px solid #8b5cf6',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                fontFamily: 'Inter, sans-serif'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== 'all') {
                  e.currentTarget.style.background = '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'all') {
                  e.currentTarget.style.background = 'white';
                }
              }}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('indoor')}
              style={{
                padding: '0.75rem 2rem',
                background: activeTab === 'indoor' ? '#8b5cf6' : 'white',
                color: activeTab === 'indoor' ? 'white' : '#374151',
                border: '2px solid #8b5cf6',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                fontFamily: 'Inter, sans-serif'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== 'indoor') {
                  e.currentTarget.style.background = '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'indoor') {
                  e.currentTarget.style.background = 'white';
                }
              }}
            >
              Indoor Lights
            </button>
            <button
              onClick={() => setActiveTab('outdoor')}
                style={{
                padding: '0.75rem 2rem',
                background: activeTab === 'outdoor' ? '#8b5cf6' : 'white',
                color: activeTab === 'outdoor' ? 'white' : '#374151',
                border: '2px solid #8b5cf6',
                  borderRadius: '8px',
                  cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                  transition: 'all 0.3s ease',
                fontFamily: 'Inter, sans-serif'
                }}
                onMouseEnter={(e) => {
                if (activeTab !== 'outdoor') {
                  e.currentTarget.style.background = '#f3f4f6';
                }
                }}
                onMouseLeave={(e) => {
                if (activeTab !== 'outdoor') {
                  e.currentTarget.style.background = 'white';
                }
              }}
            >
              Outdoor Lights
            </button>
            <button
              onClick={() => setActiveTab('others')}
              style={{
                padding: '0.75rem 2rem',
                background: activeTab === 'others' ? '#8b5cf6' : 'white',
                color: activeTab === 'others' ? 'white' : '#374151',
                border: '2px solid #8b5cf6',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                fontFamily: 'Inter, sans-serif'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== 'others') {
                  e.currentTarget.style.background = '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'others') {
                  e.currentTarget.style.background = 'white';
                }
              }}
            >
              Others
            </button>
          </div>

          {/* Products Grid */}
          <div className="new-products-grid" style={{
            marginTop: '2rem'
          }}>
            {loading ? (
              <div style={{ 
                gridColumn: '1 / -1', 
                textAlign: 'center', 
                padding: '2rem' 
              }}>
                <p>Loading products...</p>
              </div>
            ) : currentTabProducts.length > 0 ? (
              currentTabProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <Link
                    href={`/products/${product.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block'
                }}
              >
                <div style={{ 
                      height: '140px', 
                      width: '100%',
                      aspectRatio: '1 / 1', // Square aspect ratio
                  position: 'relative', 
                      borderRadius: '8px',
                  marginBottom: '1rem',
                  overflow: 'hidden'
                }}>
                  <Image
                        src={getProductImagePath(product, product.category)}
                        alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>
                      {product.name}
                    </h3>
                    <p style={{ color: '#6b7280', margin: '0 0 1rem 0', fontSize: '0.9rem' }}>
                      {product.category}
                    </p>
              </Link>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                      AED {product.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      style={{
                        padding: '0.4rem 0.875rem',
                        background: '#8b5cf6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.8rem'
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '2rem',
                color: '#6b7280'
              }}>
                <p>No {activeTab} products available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '3rem' }}>
              Featured Products
          </h2>
          <div className="product-grid">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>Loading products...</p>
              </div>
            ) : (
              featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
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
                      src={getProductImagePath(product, product.category)}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <h3 style={{ margin: '0 0 0.5rem 0' }}>{product.name}</h3>
                  <p style={{ color: '#6b7280', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
                    {product.category}
                  </p>
                  <p style={{ color: '#6b7280', margin: '0 0 1rem 0' }}>
                    {product.description}
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
                    onClick={() => addToCart(product)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#8b5cf6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.85rem'
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
            )}
          </div>
        </div>
      </section>

      {/* Seasonal Sales */}
      <section style={{ padding: '4rem 0', backgroundColor: '#fef3c7' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#d97706' }}>
              🎉 Seasonal Sales
            </h2>
            <p style={{ color: '#92400e', fontSize: '1.1rem' }}>
              Limited time offers on premium lighting products
            </p>
          </div>
          <div className="product-grid">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>Loading products...</p>
              </div>
            ) : (
              seasonalProducts.map((product) => (
              <div key={product.id} className="product-card" style={{ 
                position: 'relative',
                border: '2px solid #f59e0b'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: '#dc2626',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  zIndex: 10
                }}>
                  SALE
                </div>
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
                      src={getProductImagePath(product, product.category)}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <h3 style={{ margin: '0 0 0.5rem 0' }}>{product.name}</h3>
                  <p style={{ color: '#6b7280', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
                    {product.category}
                  </p>
                  <p style={{ color: '#6b7280', margin: '0 0 1rem 0' }}>
                    {product.description}
                  </p>
                </Link>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}>
                  <div>
                    <span style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: 'bold', 
                      color: '#dc2626' 
                    }}>
                      AED {product.price.toLocaleString()}
                    </span>
                    <span style={{ 
                      fontSize: '0.9rem', 
                      color: '#6b7280', 
                      textDecoration: 'line-through',
                      marginLeft: '0.5rem'
                    }}>
                      AED {(product.price * 1.2).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#8b5cf6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.85rem'
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
            )}
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <div 
        className="whatsapp-float"
        onClick={() => {
          const message = "Hi! I'm interested in your lighting products. Can you help me?";
          const whatsappUrl = `https://wa.me/971506970154?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
        }}
        aria-label="Chat on WhatsApp"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.197.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.074-.149-.668-1.612-.916-2.207-.241-.579-.486-.5-.668-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
        </svg>
      </div>
    </div>
  );
}

