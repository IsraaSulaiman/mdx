import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to My Blog
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A place where I share thoughts, ideas, and insights about technology and development.
        </p>
        <div className="space-x-4">
          <Link
            href="/blog"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Read Blog
          </Link>
          <Link
            href="/categories"
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Browse Categories
          </Link>
        </div>
      </main>
    </div>
  );
}
