import { products } from '@/app/data/products';

export const staticProducts = products;

export const getStaticProducts = () => {
  return staticProducts;
};

export const getStaticProductById = (id: string) => {
  return staticProducts.find(product => product.id.toString() === id);
};

export const getStaticProductsByCategory = (category: string) => {
  return staticProducts.filter(product => 
    product.category?.toLowerCase() === category.toLowerCase()
  );
};

export const searchStaticProducts = (query: string) => {
  const searchTerm = query.toLowerCase();
  return staticProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.category?.toLowerCase().includes(searchTerm) ||
    product.description?.toLowerCase().includes(searchTerm)
  );
}; 