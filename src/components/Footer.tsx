import React from 'react';
import { Newspaper, Heart, Sparkles, BookOpen, Clock, Headphones, Bookmark } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  onSelectCategory: (cat: Category) => void;
  onOpenAbout: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenAbout }) => {
  return (
    <footer className="mt-16 bg-white border-t border-stone-200">
      {/* Reader Advice Strip */}
      <div className="bg-stone-100/70 border-b border-stone-200/60 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-600">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-stone-200/60">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <strong className="block text-stone-900 font-semibold mb-0.5">Read for 5 Minutes Daily</strong>
              <span>Even one short article every morning builds confidence and vocabulary quickly.</span>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-stone-200/60">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <strong className="block text-stone-900 font-semibold mb-0.5">Listen & Read Together</strong>
              <span>Use the "Listen Now" button to hear how words sound while your eyes follow the text.</span>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-stone-200/60">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <strong className="block text-stone-900 font-semibold mb-0.5">Save Words to Practice</strong>
              <span>Bookmark articles to come back later and review the "Words to Know" section.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">
              <Newspaper className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-news font-bold text-lg text-stone-900">
                SimpleNews
              </h3>
              <p className="text-xs text-stone-500">
                Making the world easy to understand, one story at a time.
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-stone-600">
            <button
              onClick={() => onSelectCategory('World')}
              className="hover:text-amber-700 cursor-pointer"
            >
              World
            </button>
            <span>•</span>
            <button
              onClick={() => onSelectCategory('Tech')}
              className="hover:text-amber-700 cursor-pointer"
            >
              Technology
            </button>
            <span>•</span>
            <button
              onClick={() => onSelectCategory('Science')}
              className="hover:text-amber-700 cursor-pointer"
            >
              Space & Science
            </button>
            <span>•</span>
            <button
              onClick={() => onSelectCategory('Nature')}
              className="hover:text-amber-700 cursor-pointer"
            >
              Environment
            </button>
            <span>•</span>
            <button
              onClick={() => onSelectCategory('Life')}
              className="hover:text-amber-700 cursor-pointer"
            >
              School & Daily Life
            </button>
            <span>•</span>
            <button
              onClick={onOpenAbout}
              className="text-amber-800 font-bold hover:underline cursor-pointer"
            >
              How it Works
            </button>
          </div>

          <div className="text-xs text-stone-400 text-center md:text-right">
            <span>SimpleNews Media Group • Daily Editorial Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
