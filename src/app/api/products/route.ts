import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, addProduct, Product as FirestoreProduct } from '@/lib/firestore';
import { Product } from '@/types/product';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/adminAuth';

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error reading products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) return unauthorizedResponse();
  try {
    const newProduct: Omit<Product, 'id'> = await request.json();

    if (!newProduct.name?.trim()) {
      return NextResponse.json({ error: 'Product name is required' }, { status: 400 });
    }
    if (newProduct.price && parseFloat(String(newProduct.price)) <= 0) {
      return NextResponse.json({ error: 'Price must be greater than 0 if provided' }, { status: 400 });
    }
    if (newProduct.isOnSale && newProduct.offerPrice) {
      if (parseFloat(String(newProduct.offerPrice)) <= 0) {
        return NextResponse.json({ error: 'Offer price must be greater than 0' }, { status: 400 });
      }
      if (newProduct.price && parseFloat(String(newProduct.offerPrice)) >= parseFloat(String(newProduct.price))) {
        return NextResponse.json({ error: 'Offer price must be less than the original price' }, { status: 400 });
      }
    }
    if (!newProduct.category?.trim()) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }
    if (!newProduct.subcategory?.trim()) {
      return NextResponse.json({ error: 'Subcategory is required' }, { status: 400 });
    }
    const hasImage = newProduct.image ||
      (newProduct.images && newProduct.images.length > 0) ||
      (newProduct.galleryImages && newProduct.galleryImages.length > 0);
    if (!hasImage) {
      return NextResponse.json({ error: 'At least one image is required' }, { status: 400 });
    }

    const firestoreProduct: Omit<FirestoreProduct, 'id'> = {
      name: newProduct.name,
      price: newProduct.price || 0,
      description: newProduct.description || '',
      category: newProduct.category,
      subcategory: newProduct.subcategory,
      image: newProduct.image || newProduct.images?.[0] || '',
      images: newProduct.images || [],
      wattage: newProduct.wattage || '',
      material: newProduct.material || '',
      dimensions: newProduct.dimensions || '',
      inStock: newProduct.inStock ?? (newProduct.availability === 'In Stock'),
      featured: newProduct.featured ?? newProduct.isFeatured ?? false,
      seasonal: newProduct.seasonal ?? newProduct.isOnSale ?? false,
      isOnSale: newProduct.isOnSale || false,
    };
    if (newProduct.offerPrice && newProduct.offerPrice > 0) {
      (firestoreProduct as any).offerPrice = newProduct.offerPrice;
    }
    const cleanProduct = Object.fromEntries(
      Object.entries(firestoreProduct).filter(([, value]) => value !== undefined)
    ) as Omit<FirestoreProduct, 'id'>;

    const addedProduct = await addProduct(cleanProduct);
    return NextResponse.json(addedProduct, { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}
