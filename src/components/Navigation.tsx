import Link from 'next/link';
import SearchInput from './SearchInput';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              My Blog
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/categories" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Categories
            </Link>
            <SearchInput />
          </div>
        </div>
      </div>
    </nav>
  );
} 