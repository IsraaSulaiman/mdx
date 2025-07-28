import { notFound } from 'next/navigation';
import { getCategoryBySlug, getPostsByCategory } from '@/lib/mdx';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  // This would need to be implemented to generate static paths for all categories
  // For now, we'll handle it dynamically
  return [];
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = await params.slug;
  const category = getCategoryBySlug(categorySlug);
  const posts = getPostsByCategory(categorySlug);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/categories"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Back to Categories
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No posts in this category
            </h2>
            <p className="text-gray-600">
              Posts will appear here once they're added to the {category.name.toLowerCase()} category.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 