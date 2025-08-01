export interface Product {
  id: number;
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
  isFeatured: boolean;
  isOnSale: boolean;
  rating: number;
  reviewCount: number;
}