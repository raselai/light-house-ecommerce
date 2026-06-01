import { NextRequest, NextResponse } from 'next/server';
import { updateProduct, deleteProduct, getProductById } from '@/lib/firestore';
import { deleteImage } from '@/lib/storage';
import { Product } from '@/types/product';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/adminAuth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await params;
    const product = await getProductById(productId);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error getting product:', error);
    return NextResponse.json({ error: 'Failed to get product' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminAuth(request)) return unauthorizedResponse();
  try {
    const { id: productId } = await params;
    const updatedProduct: Partial<Product> = await request.json();
    const result = await updateProduct(productId, updatedProduct);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminAuth(request)) return unauthorizedResponse();
  try {
    const { id: productId } = await params;
    const product = await getProductById(productId);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Delete associated images from Firebase Storage
    try {
      const urlsToDelete = [product.image, ...(product.images ?? [])].filter(
        (url): url is string => !!url && url.startsWith('https://firebasestorage.googleapis.com/')
      );
      for (const url of urlsToDelete) {
        const urlParts = url.split('/');
        const pathIndex = urlParts.findIndex(part => part === 'o') + 1;
        if (pathIndex < urlParts.length) {
          const imagePath = decodeURIComponent(urlParts[pathIndex].split('?')[0]);
          await deleteImage(imagePath);
        }
      }
    } catch (imageError) {
      console.warn('Error deleting images:', imageError);
    }

    const result = await deleteProduct(productId);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
