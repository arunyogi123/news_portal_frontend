import React from 'react';
import { Newspaper, Search, Bookmark, Type, Sparkles, X, Info, Building2 } from 'lucide-react';
import { ReadingLevel, TextSize } from '../types';

interface HeaderProps {
  readingLevel: ReadingLevel;
  setReadingLevel: (level: ReadingLevel) => void;
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  savedCount: number;
  showSavedOnly: boolean;
  setShowSavedOnly: (val: boolean) => void;
  onOpenAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  readingLevel,
  setReadingLevel,
  textSize,
  setTextSize,
  searchQuery,
  setSearchQuery,
  savedCount,
  showSavedOnly,
  setShowSavedOnly,
  onOpenAbout,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-stone-50/95 backdrop-blur-md border-b border-stone-200 transition-colors">
      {/* Top Banner: Company Info */}
      <div className="bg-amber-50 border-b border-amber-200/60 px-4 py-1.5 text-xs text-amber-900 flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200/80 text-amber-950 uppercase tracking-wide">
            <Building2 className="w-3 h-3 text-amber-800" />
            SimpleNews Media Group
          </span>
          <span className="hidden sm:inline text-stone-700">
            Independent Daily News & Educational Journalism
          </span>
          <span className="sm:hidden text-stone-700 font-medium">SimpleNews Media</span>
        </div>
        <button
          id="btn-learn-how-it-works"
          onClick={onOpenAbout}
          className="hidden sm:flex items-center gap-1 font-medium hover:underline cursor-pointer text-amber-900"
        >
          <Info className="w-3.5 h-3.5" />
          <span>About SimpleNews</span>
        </button>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          
          {/* Logo & Tagline */}
          <div className="flex items-center justify-between">
            <div 
              onClick={() => {
                setShowSavedOnly(false);
                setSearchQuery('');
              }}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-sm group-hover:bg-amber-700 transition-colors">
                <Newspaper className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-xl font-bold tracking-tight text-stone-900 font-news">
                    SimpleNews
                  </h1>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 bg-amber-100 text-amber-900 rounded-full">
                    Media Group
                  </span>
                </div>
                <p className="text-xs text-stone-500 font-medium">
                  Daily Global Coverage & Vocabulary Edition
                </p>
              </div>
            </div>

            {/* Mobile Actions: Saved toggle button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                id="btn-saved-mobile"
                onClick={() => setShowSavedOnly(!showSavedOnly)}
                className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  showSavedOnly
                    ? 'bg-amber-100 border-amber-300 text-amber-900'
                    : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${showSavedOnly ? 'fill-amber-600 text-amber-600' : ''}`} />
                <span>{savedCount}</span>
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g. space, nature, solar, bike)..."
              className="w-full pl-9.5 pr-8 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 placeholder-stone-400 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Reading Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5">
            
            {/* Reading Level Switcher */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs">
              <button
                id="btn-reading-level-1"
                onClick={() => setReadingLevel('level1')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1 ${
                  readingLevel === 'level1'
                    ? 'bg-white text-amber-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Super Simple: short sentences and easiest words"
              >
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Super Simple</span>
              </button>
              <button
                id="btn-reading-level-2"
                onClick={() => setReadingLevel('level2')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  readingLevel === 'level2'
                    ? 'bg-white text-amber-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Standard Easy: clear articles with normal detail"
              >
                Standard Easy
              </button>
            </div>

            {/* Font Size Selector */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs">
              <span className="pl-1.5 pr-1 text-stone-400">
                <Type className="w-3.5 h-3.5" />
              </span>
              <button
                id="btn-text-size-normal"
                onClick={() => setTextSize('normal')}
                className={`w-6 h-6 rounded-md font-bold transition-colors ${
                  textSize === 'normal'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Standard text size"
              >
                A
              </button>
              <button
                id="btn-text-size-large"
                onClick={() => setTextSize('large')}
                className={`w-6 h-6 rounded-md font-bold text-sm transition-colors ${
                  textSize === 'large'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Larger text size"
              >
                A+
              </button>
              <button
                id="btn-text-size-xlarge"
                onClick={() => setTextSize('xlarge')}
                className={`w-6 h-6 rounded-md font-extrabold text-base transition-colors ${
                  textSize === 'xlarge'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Extra large text size"
              >
                A++
              </button>
            </div>

            {/* Desktop Saved Articles Button */}
            <button
              id="btn-saved-desktop"
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                showSavedOnly
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-white' : ''}`} />
              <span>Saved ({savedCount})</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
