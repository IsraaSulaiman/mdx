import { useState, useMemo } from 'react';
import { Category, BlogPostMeta } from '@/types/blog';

export function useCategoryFilter(
  categories: Category[],
  allPosts: BlogPostMeta[]
) {
  // Initialize with all categories selected
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(categories.map(cat => cat.slug))
  );

  const toggleCategory = (categorySlug: string) => {
    setSelectedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categorySlug)) {
        newSet.delete(categorySlug);
      } else {
        newSet.add(categorySlug);
      }
      return newSet;
    });
  };

  const filteredPosts = useMemo(() => {
    if (selectedCategories.size === 0) {
      return allPosts; // Show all posts if no categories selected
    }

    return allPosts.filter(post => {
      // Check if the post has any tags that match the selected categories
      return post.frontMatter.tags.some(tag => {
        const tagSlug = tag.toLowerCase().replace(/\s+/g, '-');
        return selectedCategories.has(tagSlug);
      });
    });
  }, [allPosts, selectedCategories]);

  const isCategorySelected = (categorySlug: string) => {
    return selectedCategories.has(categorySlug);
  };

  const selectAllCategories = () => {
    setSelectedCategories(new Set(categories.map(cat => cat.slug)));
  };

  const clearAllCategories = () => {
    setSelectedCategories(new Set());
  };

  return {
    selectedCategories,
    filteredPosts,
    toggleCategory,
    isCategorySelected,
    selectAllCategories,
    clearAllCategories,
  };
} 