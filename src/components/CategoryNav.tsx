import React from 'react';
import { Category } from '../types';
import { Compass, Globe, Cpu, Sparkles, Leaf, Coffee, BookmarkCheck } from 'lucide-react';

interface CategoryNavProps {
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
  showSavedOnly: boolean;
  setShowSavedOnly: (val: boolean) => void;
  savedCount: number;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  setSelectedCategory,
  showSavedOnly,
  setShowSavedOnly,
  savedCount,
}) => {
  const categories: { id: Category; label: string; icon: React.ReactNode }[] = [
    { id: 'All', label: 'All Stories', icon: <Compass className="w-4 h-4" /> },
    { id: 'World', label: 'World & Cities', icon: <Globe className="w-4 h-4" /> },
    { id: 'Tech', label: 'Technology', icon: <Cpu className="w-4 h-4" /> },
    { id: 'Science', label: 'Space & Science', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'Nature', label: 'Nature & Earth', icon: <Leaf className="w-4 h-4" /> },
    { id: 'Life', label: 'Daily Life & School', icon: <Coffee className="w-4 h-4" /> },
  ];

  return (
    <div className="border-b border-stone-200/80 bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          {categories.map((cat) => {
            const isActive = !showSavedOnly && selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`btn-cat-${cat.id.toLowerCase()}`}
                onClick={() => {
                  setShowSavedOnly(false);
                  setSelectedCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}

          {savedCount > 0 && (
            <button
              id="btn-cat-saved"
              onClick={() => setShowSavedOnly(true)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all ${
                showSavedOnly
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>Saved ({savedCount})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
