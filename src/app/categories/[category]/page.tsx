import { use } from 'react';
import CategoryContent from './CategoryContent';

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const categorySlug = decodeURIComponent(category);
  
  return <CategoryContent categorySlug={categorySlug} />;
}
