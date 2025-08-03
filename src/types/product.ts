export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  image?: string; // Single image for display
  mainImage?: string; // Primary product image
  galleryImages?: string[]; // Additional product images
  imagePath?: string; // Organized path like 'hanging-lights/crystal-chandelier-1.jpg'
  description: string;
  dimensions: string;
  bulbType: string;
  wattage: number | string;
  voltage: string;
  material: string;
  category: string;
  subcategory: string;
  room: string;
  lightType: string;
  style: string;
  availability: 'In Stock' | 'Out of Stock' | 'Limited Stock';
  inStock: boolean; // Required for Firestore
  isFeatured: boolean;
  isOnSale: boolean;
  featured?: boolean; // For Firestore compatibility
  seasonal?: boolean; // For Firestore compatibility
  rating: number;
  reviewCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}