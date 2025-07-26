import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostMeta } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export function getPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((fileName) => /\.(md|mdx)$/.test(fileName))
      .map((fileName) => fileName.replace(/\.(md|mdx)$/, ''));
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    // Try .mdx first, then .md
    let fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${slug}.md`);
    }
    
    if (!fs.existsSync(fullPath)) {
      console.log(`File not found for slug: ${slug}`);
      return null;
    }

    console.log(`Reading file: ${fullPath}`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    console.log(`File contents length: ${fileContents.length}`);
    console.log(`File contents preview: ${fileContents.substring(0, 200)}`);
    
    const { data, content } = matter(fileContents);
    console.log(`Parsed content length: ${content.length}`);
    console.log(`Parsed content preview: ${content.substring(0, 200)}`);
    
    const rawFrontMatter = data as Record<string, unknown>;
    const readingTime = calculateReadingTime(content);

    return {
      slug,
      title: rawFrontMatter.title as string,
      date: rawFrontMatter.date as string,
      excerpt: rawFrontMatter.excerpt as string,
      content,
      tags: (rawFrontMatter.tags as string[]) || [],
      author: (rawFrontMatter.author as string) || 'Anonymous',
      readingTime,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  
  return posts;
}

export function getAllPostMeta(): BlogPostMeta[] {
  const slugs = getPostSlugs();
  const postsMeta = slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      
      return {
        slug,
        frontMatter: {
          title: post.title,
          date: post.date,
          excerpt: post.excerpt,
          tags: post.tags,
          author: post.author,
        },
      };
    })
    .filter((postMeta): postMeta is BlogPostMeta => postMeta !== null)
    .sort((post1, post2) => {
      if (!post1 || !post2) return 0;
      return post1.frontMatter.date > post2.frontMatter.date ? -1 : 1;
    });
  
  return postsMeta;
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
} 