'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const UAE_EMIRATES = ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'];

  const [form, setForm] = useState({ customerName: '', customerPhone: '', customerState: '', customerAddress: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    if (!form.customerName.trim() || !form.customerPhone.trim() || !form.customerState || !form.customerAddress.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/^\+?[\d\s\-]{7,20}$/.test(form.customerPhone.trim())) {
      setError('Please enter a valid phone number.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.customerName.trim(),
          customerPhone: form.customerPhone.trim(),
          customerState: form.customerState,
          customerAddress: form.customerAddress.trim(),
          items: cartItems,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? 'Failed to place order. Please try again.');
        return;
      }
      clearCart();
      setSuccess(true);
    } catch {
      setError('Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#059669' }}>Order Placed!</h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '1.1rem' }}>
            Thank you for your order. We&apos;ll contact you soon to confirm the details.
          </p>
          <Link href="/" style={{
            display: 'inline-block',
            padding: '0.875rem 2rem',
            background: '#8b5cf6',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1rem'
          }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>Your cart is empty</h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Browse our products and add items to your cart.</p>
          <Link href="/" style={{
            display: 'inline-block',
            padding: '0.875rem 2rem',
            background: '#8b5cf6',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1rem'
          }}>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0', minHeight: '70vh' }}>
      <div className="container">
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#1f2937' }}>Shopping Cart</h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Cart Items */}
          <div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              overflow: 'hidden'
            }}>
              {cartItems.map((item, index) => (
                <div key={item.id} style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1.25rem',
                  borderBottom: index < cartItems.length - 1 ? '1px solid #f3f4f6' : 'none',
                  alignItems: 'center'
                }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                    {item.image.startsWith('data:') ? (
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ margin: '0 0 0.25rem', fontSize: '0.95rem', fontWeight: '600', color: '#1f2937' }}>{item.name}</h3>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', color: '#6b7280' }}>{item.category}</p>
                    <p style={{ margin: 0, fontWeight: '700', color: '#8b5cf6' }}>AED {(item.price * item.quantity).toLocaleString()}</p>
                    {item.quantity > 1 && (
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#9ca3af' }}>AED {item.price.toLocaleString()} each</p>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #e5e7eb',
                          background: 'white', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                      >−</button>
                      <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: '600' }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #e5e7eb',
                          background: 'white', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                      >+</button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: '#dc2626', fontSize: '0.8rem', padding: '0.25rem'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div style={{
                padding: '1.25rem',
                borderTop: '2px solid #f3f4f6',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#1f2937' }}>Total</span>
                <span style={{ fontWeight: '700', fontSize: '1.25rem', color: '#8b5cf6' }}>
                  AED {cartTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              padding: '1.5rem'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1f2937' }}>
                Your Details
              </h2>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.9rem', color: '#374151' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={form.customerName}
                    onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))}
                    placeholder="Your full name"
                    maxLength={100}
                    style={{
                      width: '100%', padding: '0.75rem', borderRadius: '8px',
                      border: '1px solid #d1d5db', fontSize: '1rem', boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.9rem', color: '#374151' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={form.customerPhone}
                    onChange={e => setForm(f => ({ ...f, customerPhone: e.target.value }))}
                    placeholder="+971 50 000 0000"
                    maxLength={20}
                    style={{
                      width: '100%', padding: '0.75rem', borderRadius: '8px',
                      border: '1px solid #d1d5db', fontSize: '1rem', boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.9rem', color: '#374151' }}>
                    Emirate *
                  </label>
                  <select
                    value={form.customerState}
                    onChange={e => setForm(f => ({ ...f, customerState: e.target.value }))}
                    style={{
                      width: '100%', padding: '0.75rem', borderRadius: '8px',
                      border: '1px solid #d1d5db', fontSize: '1rem', boxSizing: 'border-box',
                      background: 'white', color: form.customerState ? '#1f2937' : '#9ca3af',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="" disabled>Select your emirate</option>
                    {UAE_EMIRATES.map(emirate => (
                      <option key={emirate} value={emirate}>{emirate}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.9rem', color: '#374151' }}>
                    Delivery Address *
                  </label>
                  <textarea
                    value={form.customerAddress}
                    onChange={e => setForm(f => ({ ...f, customerAddress: e.target.value }))}
                    placeholder="Street, area, city..."
                    rows={3}
                    maxLength={500}
                    style={{
                      width: '100%', padding: '0.75rem', borderRadius: '8px',
                      border: '1px solid #d1d5db', fontSize: '1rem', resize: 'vertical', boxSizing: 'border-box'
                    }}
                  />
                </div>

                {error && (
                  <p style={{ color: '#dc2626', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: '100%', padding: '0.875rem',
                    background: submitting ? '#a78bfa' : '#8b5cf6',
                    color: 'white', border: 'none', borderRadius: '8px',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    fontWeight: '700', fontSize: '1rem'
                  }}
                >
                  {submitting ? 'Placing Order...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
