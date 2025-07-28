import { NextResponse } from 'next/server';
import { getAllPostMeta } from '@/lib/mdx';

export async function GET() {
  try {
    const posts = getAllPostMeta();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
} 