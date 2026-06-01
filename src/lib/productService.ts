import { Product } from '@/types/product';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch('/api/products', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<Product | null> {
  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(`Failed to add product: ${errorData.error || 'Unknown error'}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}

export async function updateProduct(id: string, product: Product): Promise<Product | null> {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(`Failed to delete product: ${errorData.error || 'Unknown error'}`);
    }
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}
