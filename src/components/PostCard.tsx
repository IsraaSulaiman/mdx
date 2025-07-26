import Link from 'next/link';
import { BlogPostMeta } from '@/types/blog';

interface PostCardProps {
  post: BlogPostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  const { slug, frontMatter } = post;
  
  return (
    <article className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <Link href={`/blog/${slug}`} className="block">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
          {frontMatter.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {frontMatter.excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <time dateTime={frontMatter.date}>
            {new Date(frontMatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {frontMatter.author && (
            <span>By {frontMatter.author}</span>
          )}
        </div>
        {frontMatter.tags && frontMatter.tags.length > 0 && (
          <div className="flex gap-2 mt-3">
            {frontMatter.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
} 