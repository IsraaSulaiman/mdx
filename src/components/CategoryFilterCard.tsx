import { Category } from '@/types/blog';

interface CategoryFilterCardProps {
  category: Category;
  isSelected: boolean;
  onToggle: (categorySlug: string) => void;
}

export default function CategoryFilterCard({ 
  category, 
  isSelected, 
  onToggle 
}: CategoryFilterCardProps) {
  const { name, slug } = category;
  
  return (
    <button
      onClick={() => onToggle(slug)}
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
        isSelected
          ? 'bg-blue-600 text-white shadow-md'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
      }`}
    >
      {name}
    </button>
  );
} 