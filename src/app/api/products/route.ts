import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, addProduct, Product as FirestoreProduct } from '@/lib/firestore';
import { Product } from '@/types/product';

// GET - Fetch all products
export async function GET() {
  try {
    console.log('API: Fetching products from Firestore');
    const products = await getAllProducts();
    console.log('API: Found products:', products.length);
    console.log('API: Products:', products);
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error reading products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST - Add a new product
export async function POST(request: NextRequest) {
  try {
    console.log('API: Adding new product to Firestore');
    const newProduct: Omit<Product, 'id'> = await request.json();
    console.log('API: Received product data:', newProduct);
    
    // Validate required fields
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      console.error('API: Missing required fields');
      return NextResponse.json({ 
        error: 'Missing required fields: name, price, and category are required' 
      }, { status: 400 });
    }
    
    // Convert to Firestore Product format
    const firestoreProduct: Omit<FirestoreProduct, 'id'> = {
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
      category: newProduct.category,
      subcategory: newProduct.subcategory,
      image: newProduct.image || newProduct.images?.[0] || '',
      images: newProduct.images || [],
      wattage: newProduct.wattage,
      material: newProduct.material,
      dimensions: newProduct.dimensions,
      inStock: newProduct.inStock ?? (newProduct.availability === 'In Stock'),
      featured: newProduct.featured ?? newProduct.isFeatured,
      seasonal: newProduct.seasonal ?? newProduct.isOnSale
    };
    
    // Add product to Firestore
    const addedProduct = await addProduct(firestoreProduct);
    console.log('API: Product added successfully to Firestore:', addedProduct);
    
    return NextResponse.json(addedProduct, { status: 201 });
    
  } catch (error) {
    console.error('API: Error adding product:', error);
    console.error('API: Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'Unknown'
    });
    return NextResponse.json({ 
      error: 'Failed to add product', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 