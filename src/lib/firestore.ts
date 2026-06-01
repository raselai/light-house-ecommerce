import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy
} from "firebase/firestore";
import { db } from "./firebase";
import { Order } from "@/types/cart";

// Product interface
export interface Product {
  id?: string;
  name: string;
  price: number;
  offerPrice?: number; // Sale price when isOnSale is true
  description: string;
  category: string;
  subcategory: string;
  image: string;
  images?: string[];
  galleryImages?: string[]; // Additional gallery images for product detail page
  wattage?: number | string;
  color?: string;
  material?: string;
  dimensions?: string;
  inStock: boolean;
  featured?: boolean;
  seasonal?: boolean;
  isOnSale?: boolean; // Sale flag
  createdAt?: Date;
  updatedAt?: Date;
}

// Add a new product
export const addProduct = async (product: Omit<Product, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { id: docRef.id, ...product };
  } catch (error) {
    console.error("Error adding product: ", error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (id: string, product: Partial<Product>) => {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, {
      ...product,
      updatedAt: new Date()
    });
    return { id, ...product };
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id: string) => {
  try {
    await deleteDoc(doc(db, "products", id));
    return { id };
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw error;
  }
};

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];

    const sortedProducts = products.sort((a, b) => {
      const toMs = (d: any) => {
        if (!d) return 0;
        if (typeof d === 'object' && 'seconds' in d) return d.seconds * 1000;
        return new Date(d).getTime();
      };
      return toMs(b.createdAt) - toMs(a.createdAt);
    });
    return sortedProducts;
  } catch (error) {
    console.error("Error getting products: ", error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting product: ", error);
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, "products"),
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error("Error getting products by category: ", error);
    throw error;
  }
};

// Get products by subcategory
export const getProductsBySubcategory = async (subcategory: string): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, "products"),
      where("subcategory", "==", subcategory),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error("Error getting products by subcategory: ", error);
    throw error;
  }
};

// Get featured products
export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, "products"),
      where("featured", "==", true),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error("Error getting featured products: ", error);
    throw error;
  }
};

// Add a new order
export const addOrder = async (order: Omit<Order, 'id'>): Promise<Order> => {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...order,
      createdAt: new Date(),
    });
    return { id: docRef.id, ...order };
  } catch (error) {
    console.error("Error adding order: ", error);
    throw error;
  }
};

// Get all orders
export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];
    return orders.sort((a, b) => {
      const aDate = a.createdAt ? new Date((a.createdAt as any).seconds ? (a.createdAt as any).seconds * 1000 : a.createdAt).getTime() : 0;
      const bDate = b.createdAt ? new Date((b.createdAt as any).seconds ? (b.createdAt as any).seconds * 1000 : b.createdAt).getTime() : 0;
      return bDate - aDate;
    });
  } catch (error) {
    console.error("Error getting orders: ", error);
    throw error;
  }
};

// Get seasonal products
export const getSeasonalProducts = async (): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, "products"),
      where("seasonal", "==", true),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error("Error getting seasonal products: ", error);
    throw error;
  }
}; 