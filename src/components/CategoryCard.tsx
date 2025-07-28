import Link from 'next/link';
import { Category } from '@/types/blog';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const { name, slug } = category;
  
  return (
    <Link 
      href={`/categories/${slug}`}
      className="block group"
    >
      <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200 hover:border-blue-300 bg-white">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {name}
        </h3>
      </div>
    </Link>
  );
} 