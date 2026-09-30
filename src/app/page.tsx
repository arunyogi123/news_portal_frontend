'use client';


import React, { useState, useEffect, useMemo } from 'react';
import { ARTICLES_DATA } from '../data/newsData';
import { Article, Category, ReadingLevel, TextSize } from '../types';
import { Header } from '../components/Header';
import { CategoryNav } from '../components/CategoryNav';
import { FeaturedArticle } from '../components/FeaturedArticle';
import { ArticleCard } from '../components/ArticleCard';
import { ArticleModal } from '../components/ArticleModal';
import { WordOfTheDay } from '../components/WordOfTheDay';
import { AboutModal } from '../components/AboutModal';
import { Footer } from '../components/Footer';
import { Bookmark, Search, Compass, BookOpenCheck, Sparkles, ArrowLeft } from 'lucide-react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Reading Level: 'level1' (Super Simple) by default to prioritize beginner-friendly experience
  const [readingLevel, setReadingLevel] = useState<ReadingLevel>('level1');
  const [textSize, setTextSize] = useState<TextSize>('normal');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(['solar-energy-record']);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [readCount, setReadCount] = useState<number>(0);

  // Hydrate from localStorage / sessionStorage on client mount
  useEffect(() => {
    setMounted(true);
    try {
      const savedLevel = localStorage.getItem('simplenews_level') as ReadingLevel;
      if (savedLevel) setReadingLevel(savedLevel);

      const savedSize = localStorage.getItem('simplenews_size') as TextSize;
      if (savedSize) setTextSize(savedSize);

      const savedIds = localStorage.getItem('simplenews_saved');
      if (savedIds) setSavedArticleIds(JSON.parse(savedIds));

      const count = sessionStorage.getItem('simplenews_read_count');
      if (count) setReadCount(parseInt(count, 10));
    } catch {
      // Fallbacks already set in default state
    }
  }, []);

  // Persist settings
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('simplenews_level', readingLevel);
  }, [readingLevel, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('simplenews_size', textSize);
  }, [textSize, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('simplenews_saved', JSON.stringify(savedArticleIds));
  }, [savedArticleIds, mounted]);

  const handleToggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedArticleIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectArticle = (article: Article) => {
    setActiveArticle(article);
    setReadCount((prev) => {
      const next = prev + 1;
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('simplenews_read_count', next.toString());
      }
      return next;
    });
  };

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((article) => {
      if (showSavedOnly && !savedArticleIds.includes(article.id)) {
        return false;
      }

      if (!showSavedOnly && selectedCategory !== 'All' && article.category !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle =
          article.title.toLowerCase().includes(q) || article.simpleTitle.toLowerCase().includes(q);
        const matchesSnippet =
          article.shortSnippet.toLowerCase().includes(q) ||
          article.superSimpleSnippet.toLowerCase().includes(q);
        const matchesWords = article.wordsToKnow.some((w) => w.word.toLowerCase().includes(q));
        const matchesCategory = article.categoryLabel.toLowerCase().includes(q);
        return matchesTitle || matchesSnippet || matchesWords || matchesCategory;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, showSavedOnly, savedArticleIds]);

  const featuredArticle = useMemo(() => {
    if (showSavedOnly || searchQuery.trim() || selectedCategory !== 'All') {
      return null;
    }
    return ARTICLES_DATA.find((a) => a.featured) || ARTICLES_DATA[0];
  }, [showSavedOnly, searchQuery, selectedCategory]);

  const feedArticles = useMemo(() => {
    if (featuredArticle && !showSavedOnly && !searchQuery.trim() && selectedCategory === 'All') {
      return filteredArticles.filter((a) => a.id !== featuredArticle.id);
    }
    return filteredArticles;
  }, [filteredArticles, featuredArticle, showSavedOnly, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800">
      {/* Navigation Header */}
      <Header
        readingLevel={readingLevel}
        setReadingLevel={setReadingLevel}
        textSize={textSize}
        setTextSize={setTextSize}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        savedCount={savedArticleIds.length}
        showSavedOnly={showSavedOnly}
        setShowSavedOnly={setShowSavedOnly}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Category Navigation Pills */}
      <CategoryNav
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        showSavedOnly={showSavedOnly}
        setShowSavedOnly={setShowSavedOnly}
        savedCount={savedArticleIds.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Saved Only Header Banner */}
        {showSavedOnly && (
          <div className="bg-amber-100/70 border border-amber-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
                <Bookmark className="w-5 h-5 fill-stone-950" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-stone-900 font-news">
                  Your Saved Stories ({savedArticleIds.length})
                </h2>
                <p className="text-xs text-stone-600">
                  Articles you've bookmarked to practice reading and review new words.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowSavedOnly(false)}
              className="self-start sm:self-center px-4 py-2 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 shadow-2xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All News</span>
            </button>
          </div>
        )}

        {/* Search Header Banner */}
        {searchQuery.trim() && (
          <div className="bg-stone-100 border border-stone-200 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-stone-700">
              <Search className="w-4 h-4 text-stone-500" />
              <span>
                Search results for <strong className="font-semibold text-stone-900">"{searchQuery}"</strong> ({filteredArticles.length} found)
              </span>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-amber-800 hover:underline cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Featured Story */}
        {featuredArticle && (
          <section aria-label="Featured Story">
            <FeaturedArticle
              article={featuredArticle}
              readingLevel={readingLevel}
              onSelectArticle={handleSelectArticle}
              isSaved={savedArticleIds.includes(featuredArticle.id)}
              onToggleSave={handleToggleSave}
            />
          </section>
        )}

        {/* Main Grid: Articles + Helpful Side Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* News Feed Cards */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-stone-900 font-news">
                  {showSavedOnly
                    ? 'Saved Articles'
                    : selectedCategory === 'All'
                    ? 'Latest Easy Stories'
                    : `${selectedCategory} Stories`}
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-200/70 text-stone-700">
                  {feedArticles.length}
                </span>
              </div>

              <div className="text-xs text-stone-500 flex items-center gap-1.5">
                <span>Reading Level:</span>
                <span className="font-bold text-amber-700">
                  {readingLevel === 'level1' ? 'Super Simple' : 'Standard Easy'}
                </span>
              </div>
            </div>

            {/* Empty State */}
            {feedArticles.length === 0 && (
              <div className="text-center py-16 px-4 bg-white rounded-2xl border border-stone-200">
                <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-3">
                  <Compass className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-stone-800 mb-1">
                  {showSavedOnly ? 'No saved stories yet' : 'No articles matched your search'}
                </h4>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mb-5">
                  {showSavedOnly
                    ? 'Click the bookmark icon on any article to save it here for later reading!'
                    : 'Try typing a simpler word or clear the search box to see all news.'}
                </p>
                {showSavedOnly ? (
                  <button
                    onClick={() => setShowSavedOnly(false)}
                    className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 cursor-pointer shadow-xs transition-colors"
                  >
                    Browse All Stories
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 cursor-pointer shadow-xs transition-colors"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            )}

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {feedArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  readingLevel={readingLevel}
                  onSelectArticle={handleSelectArticle}
                  isSaved={savedArticleIds.includes(article.id)}
                  onToggleSave={handleToggleSave}
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar: Beginner Support Widgets */}
          <aside className="lg:col-span-4 space-y-6">
            <WordOfTheDay />

            {/* Reader Learning Progress Card */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <BookOpenCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Today's Reading Tracker
                  </h4>
                  <p className="text-[11px] text-stone-500">Keep your reading streak active!</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 border border-stone-100 mb-3">
                <div>
                  <span className="text-xs text-stone-500 block">Stories Opened</span>
                  <span className="text-2xl font-bold text-stone-900 font-news">
                    {readCount} {readCount === 1 ? 'Story' : 'Stories'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-500 block">Saved to Review</span>
                  <span className="text-2xl font-bold text-amber-700 font-news">
                    {savedArticleIds.length}
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                Reading just <strong className="font-semibold text-stone-800">1 to 2 stories</strong> a day teaches you hundreds of new English words each month without stress!
              </p>
            </div>

            {/* Beginner Quick Guide Card */}
            <div className="bg-stone-100/80 rounded-2xl border border-stone-200/80 p-5">
              <div className="flex items-center gap-2 mb-2.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  How To Read A News Story
                </h4>
              </div>

              <ol className="space-y-2 text-xs text-stone-600 list-decimal list-inside leading-relaxed">
                <li>
                  <strong className="text-stone-800 font-semibold">Look at the headline:</strong> Ask yourself what the main event is.
                </li>
                <li>
                  <strong className="text-stone-800 font-semibold">Read the 10-second takeaways:</strong> Get the 3 big points first.
                </li>
                <li>
                  <strong className="text-stone-800 font-semibold">Check words to know:</strong> Understand tricky vocabulary before reading.
                </li>
                <li>
                  <strong className="text-stone-800 font-semibold">Press "Listen":</strong> Hear the pronunciation out loud!
                </li>
              </ol>

              <button
                onClick={() => setIsAboutOpen(true)}
                className="mt-4 w-full py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-700 transition-colors cursor-pointer"
              >
                Learn more about SimpleNews Media
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* Full Article Reader Modal */}
      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        readingLevel={readingLevel}
        setReadingLevel={setReadingLevel}
        textSize={textSize}
        isSaved={activeArticle ? savedArticleIds.includes(activeArticle.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* About Modal */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setShowSavedOnly(false);
          setSelectedCategory(cat);
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onOpenAbout={() => setIsAboutOpen(true)}
      />
    </div>
  );
}
