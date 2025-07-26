import { compileMDX } from 'next-mdx-remote/rsc';

export async function processMDX(content: string) {
  console.log('processMDX called with content length:', content.length);
  console.log('Content preview:', content.substring(0, 100));
  
  try {
    const { content: mdxContent } = await compileMDX({
      source: content,
    });

    console.log('MDX processing successful, result type:', typeof mdxContent);
    return mdxContent;
  } catch (error) {
    console.error('Error processing MDX:', error);
    throw error;
  }
} 