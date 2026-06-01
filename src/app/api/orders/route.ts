import { NextRequest, NextResponse } from 'next/server';
import { getProductById, addOrder } from '@/lib/firestore';
import { CartItem } from '@/types/cart';

export async function POST(request: NextRequest) {
  try {
    const { customerName, customerPhone, customerState, customerAddress, items } = await request.json();

    if (!customerName?.trim() || !customerPhone?.trim() || !customerState || !customerAddress?.trim()) {
      return NextResponse.json({ error: 'All customer fields are required' }, { status: 400 });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Validate item IDs and recompute total from server-side prices
    let serverTotal = 0;
    const verifiedItems: CartItem[] = [];

    for (const item of items) {
      if (!item.id || typeof item.quantity !== 'number' || item.quantity < 1) {
        return NextResponse.json({ error: 'Invalid cart item' }, { status: 400 });
      }
      const product = await getProductById(item.id);
      if (!product) {
        return NextResponse.json({ error: `Product not found: ${item.id}` }, { status: 400 });
      }
      const price = product.isOnSale && product.offerPrice ? product.offerPrice : product.price;
      serverTotal += price * item.quantity;
      verifiedItems.push({
        id: item.id,
        name: product.name,
        price,
        image: item.image ?? '',
        quantity: item.quantity,
        category: product.category,
      });
    }

    const order = await addOrder({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerState,
      customerAddress: customerAddress.trim(),
      items: verifiedItems,
      totalAmount: serverTotal,
      status: 'pending',
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
