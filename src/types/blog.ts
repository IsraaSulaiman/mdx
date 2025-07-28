export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags?: string[];
  author?: string;
  readingTime?: string;
}

export interface BlogPostFrontMatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author: string;
}

export interface BlogPostMeta {
  slug: string;
  frontMatter: BlogPostFrontMatter;
}

export interface Category {
  name: string;
  slug: string;
  postCount: number;
}

export interface CategoryPostMeta {
  slug: string;
  frontMatter: BlogPostFrontMatter;
  category: string;
} 