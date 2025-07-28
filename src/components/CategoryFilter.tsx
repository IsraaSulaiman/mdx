'use client';

import { useState } from 'react';
import { Category, BlogPostMeta } from '@/types/blog';
import CategoryFilterCard from './CategoryFilterCard';
import PostCard from './PostCard';
import ClientPagination from './ClientPagination';
import { useCategoryFilter } from '@/hooks/useCategoryFilter';

interface CategoryFilterProps {
  categories: Category[];
  allPosts: BlogPostMeta[];
}

const POSTS_PER_PAGE = 9;

export default function CategoryFilter({ categories, allPosts }: CategoryFilterProps) {
  const {
    filteredPosts,
    toggleCategory,
    isCategorySelected,
    selectAllCategories,
    clearAllCategories,
  } = useCategoryFilter(categories, allPosts);

  const [currentPage, setCurrentPage] = useState(1);
  
  // Pagination logic for filtered posts
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleCategoryToggle = (categorySlug: string) => {
    setCurrentPage(1);
    toggleCategory(categorySlug);
  };

  return (
    <div className="space-y-8">
      {/* Categories Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Filter by Category</h2>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setCurrentPage(1);
                selectAllCategories();
              }}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Select All
            </button>
            <button
              onClick={() => {
                setCurrentPage(1);
                clearAllCategories();
              }}
              className="px-4 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
        
        {categories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No categories found.</p>
          </div>
                 ) : (
           <div className="flex flex-wrap gap-2">
             {categories.map((category) => (
               <CategoryFilterCard
                 key={category.slug}
                 category={category}
                 isSelected={isCategorySelected(category.slug)}
                 onToggle={handleCategoryToggle}
               />
             ))}
           </div>
         )}
      </div>

      {/* Filtered Posts Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Posts ({filteredPosts.length})
          </h2>
        </div>
        
        {currentPosts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              No posts found
            </h3>
            <p className="text-gray-600">
              {filteredPosts.length === 0 
                ? "No posts match the selected categories."
                : "No posts on this page."
              }
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {currentPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="mt-8">
                <ClientPagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 