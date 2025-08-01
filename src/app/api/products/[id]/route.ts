import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Product } from '@/types/product';

const dataFilePath = path.join(process.cwd(), 'src/app/data/products.json');

// Helper function to delete image files
async function deleteImageFiles(product: Product) {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    
    // Collect all image paths from the product
    const imagePaths = [
      product.image,
      product.mainImage,
      ...(product.images || []),
      ...(product.galleryImages || [])
    ].filter(Boolean); // Remove any undefined/null values
    
    // Delete each image file
    for (const imagePath of imagePaths) {
      if (imagePath && imagePath.startsWith('/images/')) {
        const filePath = path.join(publicDir, imagePath);
        try {
          await fs.unlink(filePath);
          console.log(`Deleted image file: ${imagePath}`);
        } catch (fileError) {
          console.warn(`Could not delete image file ${imagePath}:`, fileError);
          // Continue with other files even if one fails
        }
      }
    }
  } catch (error) {
    console.error('Error deleting image files:', error);
    // Don't throw error - product deletion should still succeed
  }
}

// PUT - Update a product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    const updatedProduct: Product = await request.json();
    
    // Read existing products
    const data = await fs.readFile(dataFilePath, 'utf8');
    const products: Product[] = JSON.parse(data);
    
    // Find and update the product
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    updatedProduct.id = productId; // Ensure ID doesn't change
    products[productIndex] = updatedProduct;
    
    // Write back to file
    await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2));
    
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE - Delete a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    
    // Read existing products
    const data = await fs.readFile(dataFilePath, 'utf8');
    const products: Product[] = JSON.parse(data);
    
    // Find and remove the product
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    const deletedProduct = products.splice(productIndex, 1)[0];
    
    // Delete associated image files
    await deleteImageFiles(deletedProduct);
    
    // Write back to file
    await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2));
    
    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
} 