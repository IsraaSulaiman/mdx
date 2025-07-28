import { getAllPostMeta } from '@/lib/mdx';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

export default function BlogPage() {
  const posts = getAllPostMeta();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600 mb-6">
            Thoughts, ideas, and insights about technology and development
          </p>
          <Link
            href="/categories"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Browse by Category
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No posts yet
            </h2>
            <p className="text-gray-600">
              Create your first blog post by adding a markdown file to{' '}
              <code className="bg-gray-100 px-2 py-1 rounded">src/content/posts</code>
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