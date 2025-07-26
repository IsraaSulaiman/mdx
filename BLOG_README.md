# Blog App Documentation

This is a Next.js blog application that supports both Markdown (`.md`) and MDX (`.mdx`) files for content creation.

## Features

- ✅ **MDX Support** - Write content with JSX components
- ✅ **Markdown Support** - Standard markdown files
- ✅ **Syntax Highlighting** - Code blocks with syntax highlighting
- ✅ **Front Matter** - Metadata for posts (title, date, excerpt, tags, author)
- ✅ **Reading Time** - Automatically calculated reading time
- ✅ **Responsive Design** - Mobile-friendly layout
- ✅ **TypeScript** - Full type safety
- ✅ **Tailwind CSS** - Modern styling with typography plugin

## Project Structure

```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx              # Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx          # Individual blog post page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   └── PostCard.tsx              # Blog post card component
├── content/
│   └── posts/                    # Your blog posts go here
├── hooks/                        # Custom React hooks
├── lib/
│   └── mdx.ts                    # MDX processing utilities
├── services/
│   └── mdxService.ts             # MDX service for processing
└── types/
    └── blog.ts                   # TypeScript types for blog posts
```

## Creating Blog Posts

### 1. Create a new markdown file

Create a new file in `src/content/posts/` with either `.md` or `.mdx` extension.

### 2. Add Front Matter

Every blog post needs front matter at the top of the file:

```yaml
---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "A brief description of your post that will appear in the blog listing"
author: "Your Name"
tags: ["tag1", "tag2", "tag3"]
---
```

### 3. Write Your Content

Write your content in markdown format below the front matter:

```markdown
# Your Post Title

This is your blog post content.

## Subheading

You can use all standard markdown features:

- **Bold text**
- *Italic text*
- [Links](https://example.com)
- `inline code`

### Code Blocks

```javascript
function hello() {
  console.log("Hello, World!");
}
```

### Lists

1. Numbered list
2. Second item
3. Third item

- Bullet list
- Another item
- And another
```

## Front Matter Options

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | The title of your blog post |
| `date` | string | ✅ | Publication date (YYYY-MM-DD format) |
| `excerpt` | string | ✅ | Brief description for blog listing |
| `author` | string | ❌ | Author name |
| `tags` | string[] | ❌ | Array of tags for categorization |

## MDX Features

If you use `.mdx` files, you can also:

- Import and use React components
- Use JSX syntax
- Add interactive elements

Example MDX file:

```mdx
---
title: "Interactive Post"
date: "2024-01-15"
excerpt: "A post with interactive components"
---

import { useState } from 'react';

# Interactive Post

This post uses MDX for interactive content.

<button onClick={() => alert('Hello!')}>
  Click me!
</button>
```

## Available Routes

- `/` - Home page with blog introduction
- `/blog` - Blog listing page with all posts
- `/blog/[slug]` - Individual blog post page

## Customization

### Styling

- Edit `tailwind.config.ts` to customize the design system
- Modify `src/app/globals.css` for custom CSS
- Update `src/components/PostCard.tsx` to change post card appearance

### Components

- Add new components in `src/components/`
- Create custom hooks in `src/hooks/`
- Add new services in `src/services/`

### Types

- Extend blog post types in `src/types/blog.ts`
- Add new types as needed for your features

## Development

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Create a new blog post:**
   - Add a new `.md` or `.mdx` file to `src/content/posts/`
   - Include proper front matter
   - Write your content

3. **View your blog:**
   - Visit `http://localhost:3000` for the home page
   - Visit `http://localhost:3000/blog` for the blog listing
   - Click on any post to view it individually

## Deployment

The blog is ready for deployment on platforms like Vercel, Netlify, or any other Next.js-compatible hosting service.

All blog posts are statically generated at build time for optimal performance. 