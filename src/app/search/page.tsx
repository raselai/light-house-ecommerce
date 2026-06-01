'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProductImagePath } from '@/lib/utils';
import { fetchProducts } from '@/lib/productService';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { addToCart } = useCart();

  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [availability, setAvailability] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(err => console.error('Error loading products:', err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!query.trim()) { setFilteredProducts([]); return; }

    const searchResults = products.filter(product => {
      const term = query.toLowerCase().trim();
      const fields = [
        product.name, product.category, product.subcategory,
        product.description, product.style, product.material, product.lightType
      ].map(f => (f || '').toLowerCase());
      return term.split(' ').filter(Boolean).some(t => fields.some(f => f.includes(t)));
    });

    let filtered = searchResults;
    if (selectedCategory !== 'all') filtered = filtered.filter(p => p.category === selectedCategory);
    if (availability !== 'all')     filtered = filtered.filter(p => p.availability === availability);
    if (priceRange !== 'all') {
      filtered = filtered.filter(p => {
        const price = p.price || 0;
        if (priceRange === '0-500')    return price <= 500;
        if (priceRange === '500-1000') return price > 500 && price <= 1000;
        if (priceRange === '1000+')    return price > 1000;
        return true;
      });
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'price-low')  return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'rating')     return (b.rating || 0) - (a.rating || 0);
      const aExact = (a.name || '').toLowerCase() === query.toLowerCase();
      const bExact = (b.name || '').toLowerCase() === query.toLowerCase();
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      return (b.rating || 0) - (a.rating || 0);
    });

    setFilteredProducts(sorted);
  }, [query, products, selectedCategory, priceRange, availability, sortBy]);

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Search Results</h1>
          {query && <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>Showing results for &quot;{query}&quot;</p>}
          <p style={{ color: '#6b7280' }}>Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Filters */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem', marginBottom: '2rem', padding: '1.5rem',
          backgroundColor: '#f9fafb', borderRadius: '8px'
        }}>
          {[
            { label: 'Category', value: selectedCategory, setter: setSelectedCategory,
              options: categories.map(c => ({ value: c, label: c === 'all' ? 'All Categories' : c })) },
            { label: 'Price Range', value: priceRange, setter: setPriceRange,
              options: [{ value: 'all', label: 'All Prices' }, { value: '0-500', label: 'Under AED 500' },
                        { value: '500-1000', label: 'AED 500 - 1000' }, { value: '1000+', label: 'Over AED 1000' }] },
            { label: 'Availability', value: availability, setter: setAvailability,
              options: [{ value: 'all', label: 'All Availability' }, { value: 'In Stock', label: 'In Stock' },
                        { value: 'Limited Stock', label: 'Limited Stock' }, { value: 'Out of Stock', label: 'Out of Stock' }] },
            { label: 'Sort By', value: sortBy, setter: setSortBy,
              options: [{ value: 'relevance', label: 'Relevance' }, { value: 'price-low', label: 'Price: Low to High' },
                        { value: 'price-high', label: 'Price: High to Low' }, { value: 'rating', label: 'Rating' }] },
          ].map(({ label, value, setter, options }) => (
            <div key={label}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>{label}</label>
              <select value={value} onChange={e => setter(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.9rem' }}>
                {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          ))}
        </div>

        {(selectedCategory !== 'all' || priceRange !== 'all' || availability !== 'all') && (
          <div style={{ marginBottom: '2rem' }}>
            <button onClick={() => { setSelectedCategory('all'); setPriceRange('all'); setAvailability('all'); }}
              style={{ padding: '0.5rem 1rem', backgroundColor: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
              Clear Filters
            </button>
          </div>
        )}

        {query ? (
          loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: '#6b7280' }}>
              <p>Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <Link href={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <div style={{ height: '200px', position: 'relative', borderRadius: '8px', marginBottom: '1rem', overflow: 'hidden' }}>
                      <Image src={getProductImagePath(product, product.category)} alt={product.name} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <h3 style={{ margin: '0 0 0.5rem 0' }}>{product.name}</h3>
                    <p style={{ color: '#6b7280', margin: '0 0 1rem 0', fontSize: '0.9rem' }}>{product.category}</p>
                  </Link>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>AED {product.price.toLocaleString()}</span>
                    <button onClick={() => addToCart(product)}
                      style={{ padding: '0.5rem 1rem', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: '#6b7280' }}>
              <h3 style={{ marginBottom: '1rem' }}>No products found</h3>
              <p>Try adjusting your search terms or filters</p>
              <Link href="/" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.75rem 1.5rem', backgroundColor: '#8b5cf6', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}>
                Browse All Products
              </Link>
            </div>
          )
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: '#6b7280' }}>
            <h3>Search for products</h3>
            <p>Enter a search term in the navbar to find lighting products</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', color: '#6b7280' }}>Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
