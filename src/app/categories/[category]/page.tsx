import CategoryContent from './CategoryContent';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categorySlug = decodeURIComponent(category);
  
  return <CategoryContent categorySlug={categorySlug} />;
}
