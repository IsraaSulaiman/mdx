import { getAllCategories, getAllPostMeta } from '@/lib/mdx';
import CategoryFilter from '@/components/CategoryFilter';


export default async function CategoriesPage() {
  const categories = getAllCategories();
  const allPosts = getAllPostMeta();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Categories</h1>
          <p className="text-xl text-gray-600">
            Filter and explore posts by category
          </p>
        </div>

        {/* Category Filter Component */}
        <CategoryFilter categories={categories} allPosts={allPosts} />
      </div>
    </div>
  );
} 