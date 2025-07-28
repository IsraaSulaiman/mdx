'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSearch } from '@/hooks/useSearch';

export default function SearchInput() {
  const {
    query,
    searchResults,
    isLoading,
    isExpanded,
    handleQueryChange,
    clearQuery,
    handleExpand,
    handleCollapse,
  } = useSearch();

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Handle click outside to collapse
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleCollapse();
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, handleCollapse]);

  return (
    <div ref={containerRef} className="relative">
      <div
        className={`flex items-center transition-all duration-300 ease-in-out ${
          isExpanded 
            ? 'w-80 bg-white border border-gray-300 rounded-lg shadow-lg' 
            : 'w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer'
        }`}
        onMouseEnter={handleExpand}
      >
        {/* Search Icon */}
        <div
          className={`flex items-center justify-center transition-all duration-300 ${
            isExpanded 
              ? 'w-10 h-10 text-gray-500' 
              : 'w-10 h-10 text-gray-600'
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Search Input */}
        {isExpanded && (
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Search posts..."
              className="w-full px-3 py-2 text-sm text-gray-900 bg-transparent border-none outline-none placeholder-gray-500"
            />
            
            {/* Clear Button */}
            {query && (
              <button
                onClick={clearQuery}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isExpanded && query && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {searchResults.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              onClick={handleCollapse}
              className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="text-sm font-medium text-gray-900 mb-1">
                {post.frontMatter.title}
              </div>
              <div className="text-xs text-gray-500">
                {post.slug}
              </div>
            </Link>
          ))}
        </div>
      )}

             {/* No Results */}
       {isExpanded && query && searchResults.length === 0 && !isLoading && (
         <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
           <div className="px-4 py-3 text-sm text-gray-500">
             No posts found for &quot;{query}&quot;
           </div>
         </div>
       )}

       {/* Loading State */}
       {isExpanded && query && isLoading && (
         <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
           <div className="px-4 py-3 text-sm text-gray-500 flex items-center">
             <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
             Searching...
           </div>
         </div>
       )}
    </div>
  );
} 