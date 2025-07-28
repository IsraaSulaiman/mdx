import { BlogPostMeta } from '@/types/blog';

let cachedPosts: BlogPostMeta[] | null = null;

async function fetchAllPosts(): Promise<BlogPostMeta[]> {
  if (cachedPosts) {
    return cachedPosts;
  }

  try {
    const response = await fetch('/api/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const posts = await response.json();
    cachedPosts = posts;
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function searchPosts(query: string): Promise<BlogPostMeta[]> {
  if (!query.trim()) {
    return [];
  }

  const allPosts = await fetchAllPosts();
  const searchTerm = query.toLowerCase().trim();

  return allPosts.filter(post => {
    const title = post.frontMatter.title.toLowerCase();
    const excerpt = post.frontMatter.excerpt.toLowerCase();
    const tags = post.frontMatter.tags.map(tag => tag.toLowerCase());
    const author = post.frontMatter.author.toLowerCase();
    const slug = post.slug.toLowerCase();

    return (
      title.includes(searchTerm) ||
      excerpt.includes(searchTerm) ||
      tags.some(tag => tag.includes(searchTerm)) ||
      author.includes(searchTerm) ||
      slug.includes(searchTerm)
    );
  });
} 