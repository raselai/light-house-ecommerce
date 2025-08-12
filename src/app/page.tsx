'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchProducts } from '@/lib/productService';
import { getProductImagePath } from '@/lib/utils';

export default function Home() {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const categories = [
    { name: 'Hanging Lights', href: '/categories/hanging-lights', icon: '💎', image: '/images/categories/hanging-light.jpg' },
    { name: 'Spotlight', href: '/categories/spotlight', icon: '💡', image: '/images/categories/Spot-Lights.jpg' },
    { name: 'Pendant Lights', href: '/categories/pendant-lights', icon: '✨', image: '/images/categories/pandent-light.jpg' },
    { name: 'Magnetic Light', href: '/categories/magnetic-light', icon: '🧲', image: '/images/categories/Megnetic-lights.jpg' },
    { name: 'LED Tube', href: '/categories/led-tube', icon: '📏', image: '/images/categories/Led-tube.jpg' },
    { name: 'Office Lights', href: '/categories/office-lights', icon: '🏢', image: '/images/categories/Office-lights.jpg' },
    { name: 'Warehouse Light', href: '/categories/warehouse-light', icon: '🏭', image: '/images/categories/Warehouse-light.jpg' },
    { name: 'LED Strip', href: '/categories/led-strip', icon: '🌈', image: '/images/categories/Led-strip.jpg' },
    { name: 'Aluminum Profile', href: '/categories/aluminum-profile', icon: '🔧', image: '/images/categories/aluminumProfile-Lights.jpg' },
    { name: 'Mirror Light', href: '/categories/mirror-light', icon: '🪞', image: '/images/categories/Mirror-lights.jpg' },
    { name: 'LED Track Lights', href: '/categories/led-track-lights', icon: '🎯', image: '/images/categories/Led-track-lights.jpg' },
    { name: 'Wall', href: '/categories/wall', icon: '🏠', image: '/images/categories/Wall-lights.jpg' },
    { name: 'Stand', href: '/categories/stand', icon: '🛣️', image: '/images/categories/Stand-lights.jpg' },
    { name: 'Garden Light', href: '/categories/garden-light', icon: '🌿', image: '/images/categories/garden-lights.jpeg' },
    { name: 'Floodlight', href: '/categories/floodlight', icon: '🔦', image: '/images/categories/flood-lights.jpg' },
    { name: 'Solar Light', href: '/categories/solar-light', icon: '☀️', image: '/images/categories/Solar-lights.jpg' },
    { name: 'Others', href: '/others', icon: '✨', image: '/images/categories/ceiling-lights.jpg' }
  ];

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

      {/* Featured Categories */}
      <section style={{ padding: '4rem 0', backgroundColor: '#f9fafb' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '3rem' }}>
              Featured Categories
            </h2>
          <div className="featured-categories-grid">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                style={{
                  backgroundColor: 'white',
                  padding: '1rem',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: '1px solid #e5e7eb',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ 
                  height: '120px', 
                  position: 'relative', 
                  marginBottom: '1rem',
                  borderRadius: '6px',
                  overflow: 'hidden'
                }}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h3 style={{ margin: 0, fontSize: '1rem' }}>{category.name}</h3>
              </Link>
            ))}
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
                    onClick={() => {
                      const message = `Hi! I'm interested in the ${product.name} priced at AED ${product.price.toLocaleString()}. Can you provide more details?`;
                      const whatsappUrl = `https://wa.me/971506970154?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="btn btn-outline"
                  >
                    Inquire on WhatsApp
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
                    onClick={() => {
                      const message = `Hi! I'm interested in the ${product.name} on sale for AED ${product.price.toLocaleString()}. Can you provide more details?`;
                      const whatsappUrl = `https://wa.me/971506970154?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="btn btn-outline"
                    style={{ borderColor: '#f59e0b', color: '#d97706' }}
                  >
                    Inquire on WhatsApp
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
      >
        <span style={{ fontSize: '1.5rem' }}>💬</span>
      </div>
    </div>
  );
}

