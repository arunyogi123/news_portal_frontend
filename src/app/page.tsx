"use client";

// React hooks:
// - useState: local component state
// - useEffect: side effects (localStorage, sessionStorage, mount flag)
// - useMemo: memoized/derived values (filtering, featured article, feed)
import React, { useState, useEffect, useMemo } from "react";

// Static data + shared types used across the app
import { ARTICLES_DATA } from "../data/newsData";
import { Article, Category, ReadingLevel, TextSize } from "../types";

// Layout / UI components (header, nav, cards, modals, footer)
import { Header } from "../components/Header";
import { CategoryNav } from "../components/CategoryNav";
import { FeaturedArticle } from "../components/FeaturedArticle";
import { ArticleCard } from "../components/ArticleCard";
import { ArticleModal } from "../components/ArticleModal";
import { WordOfTheDay } from "../components/WordOfTheDay";
import { AboutModal } from "../components/AboutModal";
import { Footer } from "../components/Footer";

// Icons from lucide-react used in banners, empty states, and the sidebar
import {
  Bookmark,
  Search,
  Compass,
  BookOpenCheck,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

export default function Home() {
  // ─────────────────────────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────────────────────────

  // `mounted` prevents hydration mismatches: we only read from
  // localStorage AFTER the first client render.
  const [mounted, setMounted] = useState(false);

  // User preferences (persisted to localStorage)
  const [readingLevel, setReadingLevel] = useState<ReadingLevel>("level1");
  const [textSize, setTextSize] = useState<TextSize>("normal");

  // Feed filters
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Saved (bookmarked) articles — seeded with one demo ID
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>([
    "solar-energy-record",
  ]);

  // When true, the feed only shows bookmarked articles
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Currently opened article (null = modal closed)
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  // About modal visibility
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // How many stories the user has opened this session (for the tracker card)
  const [readCount, setReadCount] = useState<number>(0);

  // ─────────────────────────────────────────────────────────────
  // EFFECTS: load persisted state on mount
  // ─────────────────────────────────────────────────────────────

  useEffect(() => {
    setMounted(true);
    try {
      // Restore reading level
      const savedLevel = localStorage.getItem(
        "simplenews_level",
      ) as ReadingLevel;
      if (savedLevel) setReadingLevel(savedLevel);

      // Restore text size
      const savedSize = localStorage.getItem("simplenews_size") as TextSize;
      if (savedSize) setTextSize(savedSize);

      // Restore bookmarked article IDs
      const savedIds = localStorage.getItem("simplenews_saved");
      if (savedIds) setSavedArticleIds(JSON.parse(savedIds));

      // Restore session read count
      const count = sessionStorage.getItem("simplenews_read_count");
      if (count) setReadCount(parseInt(count, 10));
    } catch {
      // If storage is blocked/corrupt, silently keep the defaults above
    }
  }, []);

  // ─────────────────────────────────────────────────────────────
  // EFFECTS: persist state whenever it changes
  // (guarded by `mounted` so we don't overwrite storage on first render)
  // ─────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("simplenews_level", readingLevel);
  }, [readingLevel, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("simplenews_size", textSize);
  }, [textSize, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("simplenews_saved", JSON.stringify(savedArticleIds));
  }, [savedArticleIds, mounted]);

  // ─────────────────────────────────────────────────────────────
  // HANDLERS
  // ─────────────────────────────────────────────────────────────

  /**
   * Toggle the bookmark state for an article.
   * Stops propagation so clicking the bookmark icon on a card
   * doesn't also open the article modal.
   */
  const handleToggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedArticleIds((prev) => {
      if (prev.includes(id)) {
        // Already saved → remove it
        return prev.filter((item) => item !== id);
      } else {
        // Not saved → add it
        return [...prev, id];
      }
    });
  };

  /**
   * Open an article in the modal and bump the session read count.
   */
  const handleSelectArticle = (article: Article) => {
    setActiveArticle(article);
    setReadCount((prev) => {
      const next = prev + 1;
      if (typeof window !== "undefined") {
        sessionStorage.setItem("simplenews_read_count", next.toString());
      }
      return next;
    });
  };

  // ─────────────────────────────────────────────────────────────
  // DERIVED DATA (useMemo)
  // ─────────────────────────────────────────────────────────────

  /**
   * The list of articles that pass all current filters:
   *   1. Saved-only mode (if enabled)
   *   2. Category filter (unless "All" or saved-only)
   *   3. Search query (matches title, snippet, words-to-know, category)
   */
  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((article) => {
      // Saved-only mode overrides category filtering
      if (showSavedOnly && !savedArticleIds.includes(article.id)) {
        return false;
      }

      // Category filter (skipped when in saved-only mode)
      if (
        !showSavedOnly &&
        selectedCategory !== "All" &&
        article.category !== selectedCategory
      ) {
        return false;
      }

      // Search filter — case-insensitive match across several fields
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle =
          article.title.toLowerCase().includes(q) ||
          article.simpleTitle.toLowerCase().includes(q);
        const matchesSnippet =
          article.shortSnippet.toLowerCase().includes(q) ||
          article.superSimpleSnippet.toLowerCase().includes(q);
        const matchesWords = article.wordsToKnow.some((w) =>
          w.word.toLowerCase().includes(q),
        );
        const matchesCategory = article.categoryLabel.toLowerCase().includes(q);
        return (
          matchesTitle || matchesSnippet || matchesWords || matchesCategory
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery, showSavedOnly, savedArticleIds]);

  /**
   * Pick the featured article. We only show the hero card when the user
   * is looking at the unfiltered "All" feed — otherwise it would be
   * confusing/redundant with the filtered results.
   */
  const featuredArticle = useMemo(() => {
    if (showSavedOnly || searchQuery.trim() || selectedCategory !== "All") {
      return null;
    }
    return ARTICLES_DATA.find((a) => a.featured) || ARTICLES_DATA[0];
  }, [showSavedOnly, searchQuery, selectedCategory]);

  /**
   * The rest of the feed. If a featured article is being shown, remove it
   * from the grid below so it isn't displayed twice.
   */
  const feedArticles = useMemo(() => {
    if (
      featuredArticle &&
      !showSavedOnly &&
      !searchQuery.trim() &&
      selectedCategory === "All"
    ) {
      return filteredArticles.filter((a) => a.id !== featuredArticle.id);
    }
    return filteredArticles;
  }, [
    filteredArticles,
    featuredArticle,
    showSavedOnly,
    searchQuery,
    selectedCategory,
  ]);

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800">
      {/* Top navigation bar: reading level, text size, search, saved toggle, about */}
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

      {/* Horizontal category pills (World, Tech, Science, etc.) */}
      <CategoryNav
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        showSavedOnly={showSavedOnly}
        setShowSavedOnly={setShowSavedOnly}
        savedCount={savedArticleIds.length}
      />

      {/* Main content area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Banner shown only in "saved only" mode */}
        {showSavedOnly && (
          <div
            className="bg-amber-100/70 border border-amber-200 rounded-2xl p-5 sm:p-6 flex flex-col 
             sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 
                 flex items-center justify-center font-bold"
              >
                <Bookmark className="w-5 h-5 fill-stone-950" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-stone-900 font-news">
                  Your Saved Stories ({savedArticleIds.length})
                </h2>
                <p className="text-xs text-stone-600">
                  Articles you've bookmarked to practice reading and review new
                  words.
                </p>
              </div>
            </div>

            {/* Exit saved-only mode */}
            <button
              onClick={() => setShowSavedOnly(false)}
              className="self-start sm:self-center px-4 py-2 rounded-xl bg-white 
              border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 
              shadow-2xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All News</span>
            </button>
          </div>
        )}

        {/* Banner shown while a search query is active */}
        {searchQuery.trim() && (
          <div
            className="bg-stone-100 border border-stone-200 rounded-2xl p-4 sm:p-5 
            flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2 text-sm text-stone-700">
              <Search className="w-4 h-4 text-stone-500" />
              <span>
                Search results for{" "}
                <strong className="font-semibold text-stone-900">
                  "{searchQuery}"
                </strong>{" "}
                ({filteredArticles.length} found)
              </span>
            </div>
            {/* Clear the search query */}
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-amber-800 hover:underline cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Hero / featured story (only on the default "All" feed) */}
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

        {/* Two-column layout: article feed + sidebar widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: news feed cards (spans 8 of 12 columns on large screens) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Section header: title, count, and current reading level */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-stone-900 font-news">
                  {showSavedOnly
                    ? "Saved Articles"
                    : selectedCategory === "All"
                      ? "Latest Easy Stories"
                      : `${selectedCategory} Stories`}
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-200/70 text-stone-700">
                  {feedArticles.length}
                </span>
              </div>

              <div className="text-xs text-stone-500 flex items-center gap-1.5">
                <span>Reading Level:</span>
                <span className="font-bold text-amber-700">
                  {readingLevel === "level1" ? "Super Simple" : "Standard Easy"}
                </span>
              </div>
            </div>

            {/* Empty state: no matches for the current filter/search */}
            {feedArticles.length === 0 && (
              <div className="text-center py-16 px-4 bg-white rounded-2xl border border-stone-200">
                <div
                  className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center 
                  justify-center mx-auto mb-3"
                >
                  <Compass className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-stone-800 mb-1">
                  {showSavedOnly
                    ? "No saved stories yet"
                    : "No articles matched your search"}
                </h4>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mb-5">
                  {showSavedOnly
                    ? "Click the bookmark icon on any article to save it here for later reading!"
                    : "Try typing a simpler word or clear the search box to see all news."}
                </p>
                {showSavedOnly ? (
                  // Exit saved-only mode to browse everything
                  <button
                    onClick={() => setShowSavedOnly(false)}
                    className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold 
                    hover:bg-amber-700 cursor-pointer shadow-xs transition-colors"
                  >
                    Browse All Stories
                  </button>
                ) : (
                  // Reset all filters to the default state
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                    }}
                    className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold 
                    hover:bg-stone-800 cursor-pointer shadow-xs transition-colors"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            )}

            {/* Responsive grid of article cards */}
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

          {/* RIGHT: sidebar with learning widgets (4 of 12 columns) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Daily vocabulary widget */}
            <WordOfTheDay />

            {/* Reading progress tracker */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center 
                justify-center font-bold"
                >
                  <BookOpenCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Today's Reading Tracker
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    Keep your reading streak active!
                  </p>
                </div>
              </div>

              {/* Two quick stats: stories opened + saved */}
              <div
                className="flex items-center justify-between p-3.5 rounded-xl 
                bg-stone-50 border border-stone-100 mb-3"
              >
                <div>
                  <span className="text-xs text-stone-500 block">
                    Stories Opened
                  </span>
                  <span className="text-2xl font-bold text-stone-900 font-news">
                    {readCount} {readCount === 1 ? "Story" : "Stories"}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-500 block">
                    Saved to Review
                  </span>
                  <span className="text-2xl font-bold text-amber-700 font-news">
                    {savedArticleIds.length}
                  </span>
                </div>
              </div>

              {/* Encouraging tip */}
              <p className="text-xs text-stone-600 leading-relaxed">
                Reading just{" "}
                <strong className="font-semibold text-stone-800">
                  1 to 2 stories
                </strong>{" "}
                a day teaches you hundreds of new English words each month
                without stress!
              </p>
            </div>

            {/* Beginner "how to read" guide card */}
            <div className="bg-stone-100/80 rounded-2xl border border-stone-200/80 p-5">
              <div className="flex items-center gap-2 mb-2.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  How To Read A News Story
                </h4>
              </div>

              <ol className="space-y-2 text-xs text-stone-600 list-decimal list-inside leading-relaxed">
                <li>
                  <strong className="text-stone-800 font-semibold">
                    Look at the headline:
                  </strong>{" "}
                  Ask yourself what the main event is.
                </li>
                <li>
                  <strong className="text-stone-800 font-semibold">
                    Read the 10-second takeaways:
                  </strong>{" "}
                  Get the 3 big points first.
                </li>
                <li>
                  <strong className="text-stone-800 font-semibold">
                    Check words to know:
                  </strong>{" "}
                  Understand tricky vocabulary before reading.
                </li>
                <li>
                  <strong className="text-stone-800 font-semibold">
                    Press "Listen":
                  </strong>{" "}
                  Hear the pronunciation out loud!
                </li>
              </ol>

              {/* Opens the About modal */}
              <button
                onClick={() => setIsAboutOpen(true)}
                className="mt-4 w-full py-2 rounded-xl bg-white hover:bg-stone-50 border 
                border-stone-200 text-xs font-semibold text-stone-700 transition-colors cursor-pointer"
              >
                Learn more about SimpleNews Media
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* Article reader modal (controlled by `activeArticle`) */}
      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        readingLevel={readingLevel}
        setReadingLevel={setReadingLevel}
        textSize={textSize}
        isSaved={
          activeArticle ? savedArticleIds.includes(activeArticle.id) : false
        }
        onToggleSave={handleToggleSave}
      />

      {/* About modal */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      {/* Footer with category shortcuts + about link */}
      <Footer
        onSelectCategory={(cat) => {
          // Clicking a footer category:
          // 1. exits saved-only mode
          // 2. selects the category
          // 3. scrolls back to top for a fresh view
          setShowSavedOnly(false);
          setSelectedCategory(cat);
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        onOpenAbout={() => setIsAboutOpen(true)}
      />
    </div>
  );
}