
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Image Management Utilities
export function getProductImagePath(product: any, category?: string): string {
  // If product has image, use it (this is the main image path)
  if (product.image) {
    return product.image;
  }
  
  // If product has mainImage, use it
  if (product.mainImage) {
    return product.mainImage;
  }
  
  // If product has images array with at least one image, use the first one
  if (product.images && product.images.length > 0) {
    return product.images[0];
  }
  
  // If product has galleryImages array with at least one image, use the first one
  if (product.galleryImages && product.galleryImages.length > 0) {
    return product.galleryImages[0];
  }
  
  // If product has organized imagePath, use it
  if (product.imagePath) {
    return `/images/products/${product.imagePath}`;
  }
  
  // Fallback based on category
  if (category) {
    const categorySlug = category.toLowerCase().replace(/ /g, '-');
    return `/images/products/${categorySlug}/default.jpg`;
  }
  
  // Final fallback
  return '/images/products/crystal-palace-chandelier.jpg';
}

export function getCategoryImagePath(category: string): string {
  const categorySlug = category.toLowerCase().replace(/ /g, '-');
  return `/images/categories/${categorySlug}-hero.jpg`;
}

export function organizeImagePath(category: string, productName: string, index: number = 1): string {
  const categorySlug = category.toLowerCase().replace(/ /g, '-');
  const productSlug = productName.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
  return `${categorySlug}/${productSlug}-${index}.jpg`;
}
