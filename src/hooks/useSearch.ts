import { useState, useCallback, useEffect } from 'react';
import { searchPosts } from '@/services/searchService';
import { BlogPostMeta } from '@/types/blog';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchResults, setSearchResults] = useState<BlogPostMeta[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (query.trim()) {
        setIsLoading(true);
        try {
          const results = await searchPosts(query);
          setSearchResults(results);
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
        setIsLoading(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  const clearQuery = useCallback(() => {
    setQuery('');
    setSearchResults([]);
  }, []);

  const handleExpand = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const handleCollapse = useCallback(() => {
    setIsExpanded(false);
    setQuery('');
    setSearchResults([]);
  }, []);

  return {
    query,
    searchResults,
    isLoading,
    isExpanded,
    handleQueryChange,
    clearQuery,
    handleExpand,
    handleCollapse,
  };
} 