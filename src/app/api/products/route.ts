import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Product } from '@/types/product';

const dataFilePath = path.join(process.cwd(), 'src/app/data/products.json');

// GET - Fetch all products
export async function GET() {
  try {
    console.log('API: Fetching products from:', dataFilePath);
    const data = await fs.readFile(dataFilePath, 'utf8');
    const products = JSON.parse(data);
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
    console.log('API: Adding new product');
    const newProduct: Product = await request.json();
    console.log('API: Received product data:', newProduct);
    
    // Validate required fields
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      console.error('API: Missing required fields');
      return NextResponse.json({ 
        error: 'Missing required fields: name, price, and category are required' 
      }, { status: 400 });
    }
    
    // Generate new ID (using timestamp for uniqueness)
    newProduct.id = Date.now();
    console.log('API: Generated new ID:', newProduct.id);
    
    // On Vercel, we can't write to files, so we'll simulate success
    // In a real app, you'd use a database
    console.log('API: Product added successfully (simulated on Vercel)');
    console.log('API: Note: Product will not persist on Vercel - use a database for production');
    
    return NextResponse.json({
      ...newProduct,
      _note: 'Product added successfully but will not persist on Vercel. Use a database for production.'
    }, { status: 201 });
    
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