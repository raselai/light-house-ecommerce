'use client';

import { use, useState, useEffect } from 'react';
import ProductCard from '@/app/components/ProductCard';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { fetchProducts } from '@/lib/productService';

// Category data with descriptions and feature images
const categoryData = {
  'hanging-lights': {
    name: 'Hanging Lights',
    description: 'Transform your space with our exquisite collection of hanging lights. From elegant crystal chandeliers to modern minimalist pendants, our hanging lights combine stunning aesthetics with superior craftsmanship. Perfect for dining rooms, living areas, and entryways.',
    featureImage: '/images/categories/hanging-light.jpg',
    features: [
      'Elegant crystal and glass designs',
      'Energy-efficient LED options',
      'Multiple size and style variations',
      'Easy installation and maintenance'
    ]
  },
  'spotlight': {
    name: 'Spotlight',
    description: 'Illuminate your space with precision using our premium spotlight collection. Whether for accent lighting, task lighting, or general illumination, our spotlights offer versatile solutions with adjustable angles and various beam spreads.',
    featureImage: '/images/categories/Spot-Lights.jpg',
    features: [
      'Adjustable beam angles',
      'Energy-efficient LED technology',
      'Dimmable options available',
      'Perfect for accent lighting'
    ]
  },
  'pendant-lights': {
    name: 'Pendant Lights',
    description: 'Add character and style to any room with our stunning pendant light collection. From industrial chic to contemporary elegance, our pendant lights serve as both functional lighting and artistic centerpieces.',
    featureImage: '/images/categories/pandent-light.jpg',
    features: [
      'Contemporary and classic designs',
      'Multiple height adjustment options',
      'Various material finishes',
      'Suitable for kitchens and dining areas'
    ]
  },
  'magnetic-light': {
    name: 'Magnetic Light',
    description: 'Innovative magnetic lighting solutions that offer flexibility and ease of installation. Perfect for track lighting systems and modular lighting setups.',
    featureImage: '/images/categories/Megnetic-lights.jpg',
    features: [
      'Easy magnetic installation',
      'Flexible positioning',
      'Track system compatibility',
      'Energy-efficient LED technology'
    ]
  },
  'led-tube': {
    name: 'LED Tube',
    description: 'High-performance LED tube lights designed for commercial and residential applications. Energy-efficient and long-lasting lighting solutions.',
    featureImage: '/images/categories/Led-tube.jpg',
    features: [
      'Energy-efficient LED technology',
      'Long lifespan up to 50,000 hours',
      'Instant start capability',
      'Various color temperatures available'
    ]
  },
  'office-lights': {
    name: 'Office Lights',
    description: 'Professional lighting solutions designed for office environments. Enhance productivity and create comfortable working conditions.',
    featureImage: '/images/categories/Office-lights.jpg',
    features: [
      'Anti-glare technology',
      'High CRI for accurate color rendering',
      'Motion sensor options',
      'Energy-efficient designs'
    ]
  },
  'warehouse-light': {
    name: 'Warehouse Light',
    description: 'Industrial-grade lighting solutions for warehouses and large commercial spaces. High-output lighting for maximum visibility.',
    featureImage: '/images/categories/Warehouse-light.jpg',
    features: [
      'High lumen output',
      'Industrial-grade construction',
      'Wide beam angles',
      'Durable and long-lasting'
    ]
  },
  'led-strip': {
    name: 'LED Strip',
    description: 'Versatile LED strip lighting for accent lighting, under-cabinet lighting, and decorative applications. Easy to install and customize.',
    featureImage: '/images/categories/Led-strip.jpg',
    features: [
      'Flexible installation',
      'RGB color options',
      'Remote control capability',
      'Waterproof options available'
    ]
  },
  'aluminum-profile': {
    name: 'Aluminum Profile',
    description: 'Professional aluminum profiles for LED strip installation. Clean and modern mounting solutions for various applications.',
    featureImage: '/images/categories/aluminumProfile-Lights.jpg',
    features: [
      'Aluminum construction',
      'Various mounting options',
      'Diffuser options available',
      'Professional finish'
    ]
  },
  'mirror-light': {
    name: 'Mirror Light',
    description: 'Elegant lighting solutions designed specifically for mirrors and vanity areas. Perfect for bathrooms and dressing rooms.',
    featureImage: '/images/categories/Mirror-lights.jpg',
    features: [
      'Vanity lighting design',
      'Anti-fog technology',
      'Various mounting styles',
      'Perfect for bathrooms'
    ]
  },
  'led-track-lights': {
    name: 'LED Track Lights',
    description: 'Modern track lighting systems with LED technology. Flexible and adjustable lighting for galleries, retail spaces, and homes.',
    featureImage: '/images/categories/Led-track-lights.jpg',
    features: [
      'Adjustable track heads',
      'Easy installation',
      'Energy-efficient LED',
      'Flexible positioning'
    ]
  },
  'wall': {
    name: 'Wall Lights',
    description: 'Beautiful wall-mounted lighting solutions for both indoor and outdoor applications. Enhance your space with elegant wall sconces.',
    featureImage: '/images/categories/Wall-lights.jpg',
    features: [
      'Various mounting styles',
      'Indoor and outdoor options',
      'Energy-efficient designs',
      'Easy installation'
    ]
  },
  'stand': {
    name: 'Stand Lights',
    description: 'Freestanding lighting solutions for gardens, pathways, and outdoor spaces. Create beautiful ambient lighting for your outdoor areas.',
    featureImage: '/images/categories/Stand-lights.jpg',
    features: [
      'Weather-resistant construction',
      'Solar-powered options',
      'Automatic dusk-to-dawn',
      'Various heights available'
    ]
  },
  'garden-light': {
    name: 'Garden Lights',
    description: 'Illuminate your garden with our collection of beautiful outdoor lighting solutions. Create magical evening atmospheres.',
    featureImage: '/images/categories/garden-lights.jpeg',
    features: [
      'Solar-powered options',
      'Weather-resistant design',
      'Automatic operation',
      'Various styles available'
    ]
  },
  'floodlight': {
    name: 'Floodlight',
    description: 'High-power flood lighting for security, sports facilities, and large area illumination. Professional-grade outdoor lighting.',
    featureImage: '/images/categories/flood-lights.jpg',
    features: [
      'High lumen output',
      'Motion sensor options',
      'Weather-resistant construction',
      'Energy-efficient LED technology'
    ]
  },
  'solar-light': {
    name: 'Solar Light',
    description: 'Eco-friendly solar lighting solutions for outdoor applications. Harness the power of the sun for sustainable lighting.',
    featureImage: '/images/categories/Solar-lights.jpg',
    features: [
      'Solar-powered operation',
      'Automatic dusk-to-dawn',
      'No wiring required',
      'Environmentally friendly'
    ]
  }
};

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const categorySlug = decodeURIComponent(category);
  const categoryInfo = categoryData[categorySlug as keyof typeof categoryData];
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load products on component mount
  useEffect(() => {
    console.log('useEffect: Starting to load products');
    const loadProducts = async () => {
      try {
        console.log('Fetching products...');
        const fetchedProducts = await fetchProducts();
        console.log('All fetched products:', fetchedProducts);
        console.log('Number of products loaded:', fetchedProducts.length);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  // Map navbar categories to product categories/subcategories
  const categoryMapping: { [key: string]: { category?: string; subcategory?: string } } = {
    'hanging-lights': { subcategory: 'Hanging Lights' },
    'spotlight': { subcategory: 'Spotlight' },
    'pendant-lights': { subcategory: 'Pendant Lights' },
    'magnetic-light': { subcategory: 'Magnetic Light' },
    'led-tube': { subcategory: 'LED Tube' },
    'office-lights': { subcategory: 'Office Lights' },
    'warehouse-light': { subcategory: 'Warehouse Light' },
    'led-strip': { subcategory: 'LED Strip' },
    'aluminum-profile': { subcategory: 'Aluminum Profile' },
    'mirror-light': { subcategory: 'Mirror Light' },
    'led-track-lights': { subcategory: 'LED Track Lights' },
    'wall': { subcategory: 'Wall Lights' },
    'stand': { subcategory: 'Stand Lights' },
    'garden-light': { subcategory: 'Garden Lights' },
    'floodlight': { subcategory: 'Floodlight' },
    'solar-light': { subcategory: 'Solar Light' }
  };
  
  console.log('Current category slug:', categorySlug);
  console.log('Category mapping for this slug:', categoryMapping[categorySlug]);
  console.log('Current products state:', products);
  console.log('Products length:', products.length);
  
  // Filter products by category or subcategory
  const categoryProducts = products.filter((product: any) => {
    const productCategory = product.category.toLowerCase().replace(/ /g, '-');
    const productSubcategory = product.subcategory?.toLowerCase().replace(/ /g, '-') || '';
    const mapping = categoryMapping[categorySlug];
    
    // Debug logging
    console.log('Category filtering for product:', product.name, {
      categorySlug,
      productCategory,
      productSubcategory,
      productName: product.name,
      mapping
    });
    
    // Check if the category slug matches the product category or subcategory
    if (productCategory === categorySlug || productSubcategory === categorySlug) {
      console.log('Match found by direct comparison');
      return true;
    }
    
    // Check if the mapping exists and matches
    if (mapping) {
      if (mapping.category && product.category.toLowerCase() === mapping.category.toLowerCase()) {
        console.log('Match found by category mapping');
        return true;
      }
      if (mapping.subcategory && product.subcategory?.toLowerCase() === mapping.subcategory.toLowerCase()) {
        console.log('Match found by subcategory mapping');
        return true;
      }
    }
    
    return false;
  });

  console.log('Filtered products count:', categoryProducts.length);

  if (!loading && categoryProducts.length === 0) {
    notFound();
  }

  return (
    <div>
      {/* Feature Image Section */}
      <section className="category-hero">
        <div className="category-hero-image">
          <Image
            src={categoryInfo?.featureImage || '/images/products/crystal-palace-chandelier.jpg'}
            alt={categoryInfo?.name || 'Category'}
            fill
            style={{ objectFit: 'cover' }}
          />
          <div className="category-hero-overlay">
            <div className="container">
              <h1 className="category-hero-title">
                {categoryInfo?.name || categorySlug.replace(/-/g, ' ').toUpperCase()}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Category Description Section */}
      <section className="category-description">
        <div className="container">
          <div className="category-content">
            <div className="category-text">
              <h2>About {categoryInfo?.name || categorySlug.replace(/-/g, ' ')}</h2>
              <p>{categoryInfo?.description || 'Discover our premium collection of lighting solutions.'}</p>
              
              {categoryInfo?.features && (
                <div className="category-features">
                  <h3>Key Features:</h3>
                  <ul>
                    {categoryInfo.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="category-products">
        <div className="container">
          <h2>Our {categoryInfo?.name || categorySlug.replace(/-/g, ' ')} Collection</h2>
          <div className="product-grid">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>Loading products...</p>
              </div>
            ) : (
              categoryProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
