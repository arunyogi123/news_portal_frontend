import React, { useState } from "react";
import { GLOSSARY_TERMS } from "../data/newsData";
import {
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

export const WordOfTheDay: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const term = GLOSSARY_TERMS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % GLOSSARY_TERMS.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + GLOSSARY_TERMS.length) % GLOSSARY_TERMS.length,
    );
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 rounded-2xl border border-amber-200/80 p-5 sm:p-6 shadow-2xs">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
              News Reading Helper
            </span>
            <h4 className="text-sm font-bold text-stone-900">
              News Word #{currentIndex + 1} of {GLOSSARY_TERMS.length}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            className="p-1 rounded-lg hover:bg-amber-200/50 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            title="Previous term"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1 rounded-lg hover:bg-amber-200/50 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            title="Next term"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white/90 rounded-xl p-4 border border-amber-200/60 mb-3 shadow-2xs">
        <div className="flex items-baseline gap-2 mb-1.5">
          <h3 className="text-base font-bold text-stone-900">{term.term}</h3>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
            {term.category}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-2.5">
          {term.simpleDefinition}
        </p>

        <div className="flex items-start gap-1.5 text-xs text-stone-500 italic bg-stone-50 p-2 rounded-lg border border-stone-100">
          <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
          <span>{term.example}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-stone-500">
        <span>Click arrows to learn more news vocabulary</span>
        <button
          onClick={handleNext}
          className="font-bold text-amber-800 hover:underline cursor-pointer inline-flex items-center gap-1"
        >
          <span>Next word</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
