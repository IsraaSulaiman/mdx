import { processMDX } from '@/services/mdxService';

export default async function TestMDXPage() {
  const testContent = `# Test MDX

This is a test of MDX processing.

## Features

- **Bold text**
- *Italic text*
- \`inline code\`

### Code Block

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## Conclusion

This should render properly if MDX is working.
`;

  const mdxContent = await processMDX(testContent);

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">MDX Test Page</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Raw Content:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {testContent}
          </pre>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Processed MDX:</h2>
          <div className="border border-gray-300 p-4 rounded">
            <div className="prose prose-lg max-w-none">
              {mdxContent}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Debug Info:</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>Content Type:</strong> {typeof mdxContent}</p>
            <p><strong>Content Length:</strong> {testContent.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 