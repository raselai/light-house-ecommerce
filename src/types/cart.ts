export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

export interface Order {
  id?: string;
  customerName: string;
  customerPhone: string;
  customerState: string;
  customerAddress: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt?: Date;
}
