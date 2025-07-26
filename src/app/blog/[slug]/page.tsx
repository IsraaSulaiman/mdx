import { notFound } from 'next/navigation';
import { getPostBySlug, getPostSlugs } from '@/lib/mdx';
import { processMDX } from '@/services/mdxService';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const slug = await params.slug;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Debug logging
  console.log('Post slug:', params.slug);
  console.log('Post title:', post.title);
  console.log('Post content length:', post.content.length);
  console.log('Post content preview:', post.content.substring(0, 200));

  const mdxContent = await processMDX(post.content);
   

  return (
    <div className="min-h-screen bg-white py-12">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-600 mb-4">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.author && <span>By {post.author}</span>}
            {post.readingTime && <span>{post.readingTime}</span>}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          {mdxContent}
        </div>
      </article>
    </div>
  );
} 