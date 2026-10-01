import React, { useState } from 'react';
import { Article, ReadingLevel } from '../types';
import { Clock, Bookmark, ArrowRight, Sparkles, BookOpen, CheckCircle2, Sun } from 'lucide-react';

interface FeaturedArticleProps {
  article: Article;
  readingLevel: ReadingLevel;
  onSelectArticle: (article: Article) => void;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

export const FeaturedArticle: React.FC<FeaturedArticleProps> = ({
  article,
  readingLevel,
  onSelectArticle,
  isSaved,
  onToggleSave,
}) => {
  const [imgError, setImgError] = useState(false);
  const displayTitle = readingLevel === 'level1' ? article.simpleTitle : article.title;
  const displaySnippet = readingLevel === 'level1' ? article.superSimpleSnippet : article.shortSnippet;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left / Top: Image */}
        <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[340px] overflow-hidden bg-stone-100 group">
          {!imgError ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-amber-900 to-stone-900 flex flex-col items-center justify-center p-8 text-center">
              <Sun className="w-16 h-16 text-amber-400 mb-3" />
              <span className="text-stone-200 font-bold text-lg font-news max-w-sm">
                {article.title}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
          
          {/* Badge & Bookmark Overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-stone-950 shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              Today's Big Story
            </span>
          </div>

          <button
            id={`btn-bookmark-featured-${article.id}`}
            onClick={(e) => onToggleSave(article.id, e)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 hover:text-amber-600 hover:bg-white shadow-md transition-colors cursor-pointer"
            title={isSaved ? "Remove from saved stories" : "Save story for later"}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600 text-amber-600' : ''}`} />
          </button>

          <p className="absolute bottom-2 left-4 right-4 text-[11px] text-white/90 truncate lg:hidden font-medium">
            {article.imageCaption}
          </p>
        </div>

        {/* Right / Bottom: Content */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-stone-50/50">
          <div>
            {/* Meta tags */}
            <div className="flex items-center gap-2.5 text-xs text-stone-500 mb-3">
              <span className="font-semibold text-amber-700 uppercase tracking-wider text-[11px]">
                {article.categoryLabel}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                {article.readTime}
              </span>
              <span>•</span>
              <span>{article.date}</span>
            </div>

            {/* Headline */}
            <h2 
              onClick={() => onSelectArticle(article)}
              className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-news hover:text-amber-700 cursor-pointer transition-colors leading-tight mb-3"
            >
              {displayTitle}
            </h2>

            {/* Summary Snippet */}
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-5">
              {displaySnippet}
            </p>

            {/* 3 Quick Takeaways Box */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950 uppercase tracking-wider mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700" />
                <span>3 Quick Facts in 10 Seconds</span>
              </div>
              <ul className="space-y-1.5">
                {article.takeaways.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <div className="flex items-center gap-1.5 text-xs text-stone-500">
              <BookOpen className="w-3.5 h-3.5 text-stone-400" />
              <span>{article.wordsToKnow.length} key words explained</span>
            </div>

            <button
              id={`btn-read-featured-${article.id}`}
              onClick={() => onSelectArticle(article)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold cursor-pointer shadow-xs transition-colors"
            >
              <span>Read Full Story</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
