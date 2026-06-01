'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AddProductForm from '@/components/AddProductForm';
import EditProductForm from '@/components/EditProductForm';
import DashboardOverview from '@/components/DashboardOverview';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '@/lib/productService';
import { useAuth } from '@/hooks/useAuth';
import { Product } from '@/types/product';
import { getAllOrders } from '@/lib/firestore';
import { Order } from '@/types/cart';

const TABS = [
  { key: 'dashboard',  label: '📊 Dashboard' },
  { key: 'products',   label: '📦 Products'  },
  { key: 'orders',     label: '🛒 Orders'    },
  { key: 'inquiries',  label: '💬 Inquiries' },
];

const statusBadge = (status: string, map: Record<string, { bg: string; color: string }>) => {
  const s = map[status] ?? { bg: '#f3f4f6', color: '#374151' };
  return (
    <span style={{ padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem',
      fontWeight: 'bold', background: s.bg, color: s.color, whiteSpace: 'nowrap' }}>
      {status}
    </span>
  );
};

export default function AdminPanel() {
  const { isAuthenticated, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddForm, setShowAddForm]     = useState(false);
  const [showEditForm, setShowEditForm]   = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [adminProducts, setAdminProducts] = useState<Product[]>([]);
  const [loading, setLoading]             = useState(true);
  const [orders, setOrders]               = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const inquiries = [
    { id: 1, product: 'Crystal Palace Chandelier', customer: '+971 50 697 0154',
      message: "Hi! I'm interested in the Crystal Palace Chandelier priced at AED 2,850.", date: '2024-01-15', status: 'New' },
    { id: 2, product: 'Modern Gold Chandelier',    customer: '+971 50 697 0154',
      message: "Hi! I'm interested in the Modern Gold Chandelier priced at AED 1,950.",    date: '2024-01-14', status: 'Contacted' },
  ];

  useEffect(() => {
    if (!authLoading && !isAuthenticated) { router.push('/admin/login'); return; }
    if (isAuthenticated) loadProducts();
  }, [isAuthenticated, authLoading, router]);

  const loadProducts = async () => {
    setLoading(true);
    try { setAdminProducts(await fetchProducts()); }
    catch (e) { console.error('Error loading products:', e); }
    finally { setLoading(false); }
  };

  const loadOrders = async () => {
    setOrdersLoading(true);
    try { setOrders(await getAllOrders()); }
    catch (e) { console.error('Error loading orders:', e); }
    finally { setOrdersLoading(false); }
  };

  const handleAddProduct = async (newProduct: Omit<Product, 'id'>) => {
    try {
      const added = await addProduct(newProduct);
      if (added) { setAdminProducts(prev => [...prev, added]); setShowAddForm(false); alert('Product added!'); }
      else alert('Failed to add product.');
    } catch (e) { alert(e instanceof Error ? e.message : 'Failed to add product.'); }
  };

  const handleEditProduct = async (updatedProduct: Product) => {
    try {
      const edited = await updateProduct(updatedProduct.id.toString(), updatedProduct);
      if (edited) {
        setAdminProducts(prev => prev.map(p => p.id === updatedProduct.id ? edited : p));
        setShowEditForm(false); setSelectedProduct(null); alert('Product updated!');
      } else alert('Failed to update product.');
    } catch { alert('Failed to update product.'); }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      if (await deleteProduct(productId)) {
        setAdminProducts(prev => prev.filter(p => p.id !== productId));
        alert('Product deleted!'); loadProducts();
      } else alert('Failed to delete product.');
    } catch (e) { alert(e instanceof Error ? e.message : 'Failed to delete product.'); }
  };

  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
        <p>Loading...</p>
      </div>
    );
  }
  if (!isAuthenticated) return null;

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <style>{`
        .admin-header { padding: 0.875rem 0; }
        .admin-header h1 { font-size: 1.25rem; margin: 0; color: #1f2937; }
        .admin-logout-btn { padding: 0.4rem 0.875rem; font-size: 0.85rem; }
        .admin-tabs { display: flex; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; border-bottom: 1px solid #e5e7eb; margin-bottom: 1.5rem; gap: 0; }
        .admin-tabs::-webkit-scrollbar { display: none; }
        .admin-tab-btn { padding: 0.75rem 1rem; white-space: nowrap; border: none; cursor: pointer; font-weight: 600; font-size: 0.85rem; background: transparent; color: #6b7280; border-bottom: 3px solid transparent; transition: all 0.2s; flex-shrink: 0; }
        .admin-tab-btn.active { color: #8b5cf6; border-bottom-color: #8b5cf6; background: #faf5ff; }
        .admin-container { padding: 1rem; }
        .admin-section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem; }
        .admin-section-header h2 { margin: 0; font-size: 1.1rem; }
        .add-product-btn { padding: 0.6rem 1.25rem; font-size: 0.9rem; }

        /* Product cards for mobile */
        .products-table { display: none; }
        .products-cards { display: flex; flex-direction: column; gap: 0.75rem; }
        .product-card-admin { background: white; border-radius: 10px; padding: 1rem; box-shadow: 0 1px 4px rgba(0,0,0,0.07); }
        .product-card-admin-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; gap: 0.5rem; }
        .product-card-admin-name { font-weight: 700; font-size: 0.95rem; color: #1f2937; }
        .product-card-admin-meta { font-size: 0.82rem; color: #6b7280; margin-bottom: 0.75rem; }
        .product-card-admin-footer { display: flex; justify-content: space-between; align-items: center; }
        .product-card-admin-actions { display: flex; gap: 0.5rem; }

        /* Order cards for mobile */
        .orders-table { display: none; }
        .orders-cards { display: flex; flex-direction: column; gap: 0.75rem; }
        .order-card { background: white; border-radius: 10px; padding: 1rem; box-shadow: 0 1px 4px rgba(0,0,0,0.07); }
        .order-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
        .order-card-row { display: flex; gap: 0.5rem; font-size: 0.85rem; margin-bottom: 0.3rem; }
        .order-card-label { color: #6b7280; min-width: 56px; flex-shrink: 0; }
        .order-card-value { color: #1f2937; font-weight: 500; }
        .order-card-items { font-size: 0.82rem; color: #6b7280; margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid #f3f4f6; }

        /* Inquiries cards for mobile */
        .inquiries-table { display: none; }
        .inquiries-cards { display: flex; flex-direction: column; gap: 0.75rem; }
        .inquiry-card { background: white; border-radius: 10px; padding: 1rem; box-shadow: 0 1px 4px rgba(0,0,0,0.07); }
        .inquiry-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
        .inquiry-card-product { font-weight: 700; font-size: 0.9rem; color: #1f2937; }
        .inquiry-card-meta { font-size: 0.82rem; color: #6b7280; margin-bottom: 0.5rem; }
        .inquiry-card-message { font-size: 0.85rem; color: #374151; line-height: 1.5; }

        @media (min-width: 640px) {
          .admin-header h1 { font-size: 1.5rem; }
          .admin-tab-btn { padding: 0.875rem 1.5rem; font-size: 0.95rem; }
          .admin-container { padding: 1.5rem 0; }
          .admin-section-header h2 { font-size: 1.25rem; }
          .products-table { display: block; }
          .products-cards { display: none; }
          .orders-table { display: block; }
          .orders-cards { display: none; }
          .inquiries-table { display: block; }
          .inquiries-cards { display: none; }
        }

        @media (min-width: 768px) {
          .admin-tab-btn { padding: 1rem 2rem; }
        }
      `}</style>

      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb' }} className="admin-header">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Admin Panel</h1>
            <button
              onClick={logout}
              className="admin-logout-btn"
              style={{ background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container admin-container">
        {/* Tabs */}
        <div className="admin-tabs">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`admin-tab-btn${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => { setActiveTab(tab.key); if (tab.key === 'orders') loadOrders(); }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          loading
            ? <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}><p>Loading dashboard...</p></div>
            : <DashboardOverview products={adminProducts} inquiries={inquiries} />
        )}

        {/* Products */}
        {activeTab === 'products' && (
          loading
            ? <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}><p>Loading products...</p></div>
            : (
              <div>
                <div className="admin-section-header">
                  <h2>Product Management ({adminProducts.length})</h2>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="add-product-btn"
                    style={{ background: '#059669', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    + Add Product
                  </button>
                </div>

                {/* Mobile: cards */}
                <div className="products-cards">
                  {adminProducts.map(product => (
                    <div key={product.id} className="product-card-admin">
                      <div className="product-card-admin-header">
                        <div className="product-card-admin-name">{product.name}</div>
                        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                          {product.isFeatured && <span style={{ fontSize: '0.7rem', background: '#ede9fe', color: '#7c3aed', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>⭐ Featured</span>}
                          {product.isOnSale   && <span style={{ fontSize: '0.7rem', background: '#fef2f2', color: '#dc2626', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>🔥 Sale</span>}
                        </div>
                      </div>
                      <div className="product-card-admin-meta">
                        {product.category} · AED {product.price?.toLocaleString()}
                      </div>
                      <div className="product-card-admin-footer">
                        {statusBadge(product.availability ?? 'Unknown', {
                          'In Stock':      { bg: '#dcfce7', color: '#059669' },
                          'Out of Stock':  { bg: '#fef2f2', color: '#dc2626' },
                          'Limited Stock': { bg: '#fef3c7', color: '#d97706' },
                        })}
                        <div className="product-card-admin-actions">
                          <button onClick={() => handleEditClick(product)}
                            style={{ padding: '0.35rem 0.75rem', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600' }}>
                            Edit
                          </button>
                          <button onClick={() => handleDeleteProduct(product.id)}
                            style={{ padding: '0.35rem 0.75rem', background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600' }}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {adminProducts.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>No products yet.</div>
                  )}
                </div>

                {/* Desktop: table */}
                <div className="products-table" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                    <thead>
                      <tr style={{ background: '#f9fafb' }}>
                        {['Product', 'Category', 'Price', 'Status', 'Actions'].map(h => (
                          <th key={h} style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {adminProducts.map(product => (
                        <tr key={product.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ fontWeight: 'bold' }}>{product.name}</div>
                            <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.2rem' }}>
                              {product.isFeatured && <span style={{ color: '#8b5cf6', marginRight: '0.5rem' }}>⭐ Featured</span>}
                              {product.isOnSale   && <span style={{ color: '#dc2626' }}>🔥 On Sale</span>}
                            </div>
                          </td>
                          <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{product.category}</td>
                          <td style={{ padding: '1rem', fontWeight: '600' }}>AED {product.price?.toLocaleString()}</td>
                          <td style={{ padding: '1rem' }}>
                            {statusBadge(product.availability ?? 'Unknown', {
                              'In Stock':      { bg: '#dcfce7', color: '#059669' },
                              'Out of Stock':  { bg: '#fef2f2', color: '#dc2626' },
                              'Limited Stock': { bg: '#fef3c7', color: '#d97706' },
                            })}
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button onClick={() => handleEditClick(product)}
                                style={{ padding: '0.25rem 0.75rem', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600' }}>
                                Edit
                              </button>
                              <button onClick={() => handleDeleteProduct(product.id)}
                                style={{ padding: '0.25rem 0.75rem', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600' }}>
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <div>
            <div className="admin-section-header">
              <h2>Customer Orders</h2>
            </div>
            {ordersLoading ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}><p>Loading orders...</p></div>
            ) : orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</p>
                <p>No orders yet.</p>
              </div>
            ) : (
              <>
                {/* Mobile: cards */}
                <div className="orders-cards">
                  {orders.map(order => {
                    const date = order.createdAt
                      ? new Date((order.createdAt as any).seconds ? (order.createdAt as any).seconds * 1000 : order.createdAt).toLocaleDateString()
                      : '—';
                    return (
                      <div key={order.id} className="order-card">
                        <div className="order-card-header">
                          <span style={{ fontSize: '0.82rem', color: '#6b7280' }}>{date}</span>
                          {statusBadge(order.status, {
                            pending:    { bg: '#fef3c7', color: '#d97706' },
                            completed:  { bg: '#dcfce7', color: '#059669' },
                            cancelled:  { bg: '#fef2f2', color: '#dc2626' },
                            processing: { bg: '#dbeafe', color: '#2563eb' },
                          })}
                        </div>
                        <div className="order-card-row"><span className="order-card-label">Name</span><span className="order-card-value">{order.customerName}</span></div>
                        <div className="order-card-row"><span className="order-card-label">Phone</span><span className="order-card-value">{order.customerPhone}</span></div>
                        <div className="order-card-row"><span className="order-card-label">Emirate</span><span className="order-card-value">{order.customerState || '—'}</span></div>
                        <div className="order-card-row"><span className="order-card-label">Address</span><span className="order-card-value">{order.customerAddress}</span></div>
                        <div className="order-card-row"><span className="order-card-label">Total</span><span className="order-card-value" style={{ color: '#8b5cf6', fontWeight: '700' }}>AED {order.totalAmount.toLocaleString()}</span></div>
                        <div className="order-card-items">
                          {order.items.map(i => `${i.name} ×${i.quantity}`).join(' · ')}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Desktop: table */}
                <div className="orders-table" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                    <thead>
                      <tr style={{ background: '#f9fafb' }}>
                        {['Date', 'Customer', 'Phone', 'Emirate', 'Address', 'Items', 'Total', 'Status'].map(h => (
                          <th key={h} style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => {
                        const date = order.createdAt
                          ? new Date((order.createdAt as any).seconds ? (order.createdAt as any).seconds * 1000 : order.createdAt).toLocaleDateString()
                          : '—';
                        return (
                          <tr key={order.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                            <td style={{ padding: '1rem', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>{date}</td>
                            <td style={{ padding: '1rem', fontWeight: '600' }}>{order.customerName}</td>
                            <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{order.customerPhone}</td>
                            <td style={{ padding: '1rem', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>{order.customerState || '—'}</td>
                            <td style={{ padding: '1rem', fontSize: '0.85rem', maxWidth: '160px' }}>{order.customerAddress}</td>
                            <td style={{ padding: '1rem', fontSize: '0.85rem', maxWidth: '200px' }}>{order.items.map(i => `${i.name} ×${i.quantity}`).join(', ')}</td>
                            <td style={{ padding: '1rem', fontWeight: '700', whiteSpace: 'nowrap', color: '#8b5cf6' }}>AED {order.totalAmount.toLocaleString()}</td>
                            <td style={{ padding: '1rem' }}>
                              {statusBadge(order.status, {
                                pending:    { bg: '#fef3c7', color: '#d97706' },
                                completed:  { bg: '#dcfce7', color: '#059669' },
                                cancelled:  { bg: '#fef2f2', color: '#dc2626' },
                                processing: { bg: '#dbeafe', color: '#2563eb' },
                              })}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {/* Inquiries */}
        {activeTab === 'inquiries' && (
          <div>
            <div className="admin-section-header">
              <h2>Customer Inquiries</h2>
            </div>

            {/* Mobile: cards */}
            <div className="inquiries-cards">
              {inquiries.map(inquiry => (
                <div key={inquiry.id} className="inquiry-card">
                  <div className="inquiry-card-header">
                    <div className="inquiry-card-product">{inquiry.product}</div>
                    {statusBadge(inquiry.status, {
                      New:       { bg: '#fef3c7', color: '#d97706' },
                      Contacted: { bg: '#dcfce7', color: '#059669' },
                    })}
                  </div>
                  <div className="inquiry-card-meta">{inquiry.customer} · {inquiry.date}</div>
                  <div className="inquiry-card-message">{inquiry.message}</div>
                </div>
              ))}
            </div>

            {/* Desktop: table */}
            <div className="inquiries-table" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ background: '#f9fafb' }}>
                    {['Date', 'Product', 'Customer', 'Message', 'Status'].map(h => (
                      <th key={h} style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map(inquiry => (
                    <tr key={inquiry.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '1rem', whiteSpace: 'nowrap', fontSize: '0.9rem' }}>{inquiry.date}</td>
                      <td style={{ padding: '1rem', fontWeight: '600' }}>{inquiry.product}</td>
                      <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{inquiry.customer}</td>
                      <td style={{ padding: '1rem', maxWidth: '300px', fontSize: '0.9rem' }}>{inquiry.message}</td>
                      <td style={{ padding: '1rem' }}>
                        {statusBadge(inquiry.status, {
                          New:       { bg: '#fef3c7', color: '#d97706' },
                          Contacted: { bg: '#dcfce7', color: '#059669' },
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showAddForm && (
        <AddProductForm onClose={() => setShowAddForm(false)} onSave={handleAddProduct} />
      )}
      {showEditForm && selectedProduct && (
        <EditProductForm
          product={selectedProduct}
          onClose={() => { setShowEditForm(false); setSelectedProduct(null); }}
          onSave={handleEditProduct}
        />
      )}
    </div>
  );

  function handleEditClick(product: any) {
    setSelectedProduct(product);
    setShowEditForm(true);
  }
}
