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
    const newProduct: Product = await request.json();
    
    // Read existing products
    const data = await fs.readFile(dataFilePath, 'utf8');
    const products: Product[] = JSON.parse(data);
    
    // Generate new ID (max existing ID + 1)
    const maxId = Math.max(...products.map(p => p.id), 0);
    newProduct.id = maxId + 1;
    
    // Add new product
    products.push(newProduct);
    
    // Write back to file
    await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2));
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
} 