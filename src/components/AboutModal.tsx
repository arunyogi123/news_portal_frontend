import React from "react";

import {
  X,
  Sparkles,
  BookOpen,
  Volume2,
  Type,
  Bookmark,
  Heart,
} from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs">
      <div
        className="bg-white rounded-2xl sm:rounded-3xl border 
        border-stone-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full 
          hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 
          flex items-center justify-center font-bold"
          >
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-stone-900 font-news">
              Welcome to SimpleNews
            </h3>
            <p className="text-xs text-stone-500">
              News made easy, simple, and friendly for everyone
            </p>
          </div>
        </div>

        <p className="text-sm text-stone-600 leading-relaxed mb-5">
          Many news sites use difficult jargon, walls of text, and complicated
          charts that confuse beginners. SimpleNews is designed to make staying
          informed enjoyable, accessible, and educational.
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100">
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">
                Two Reading Levels
              </h4>
              <p className="text-xs text-stone-600">
                Switch anytime between "Super Simple" (Level 1) and "Standard
                Easy" (Level 2) at the top.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">
                Words to Know
              </h4>
              <p className="text-xs text-stone-600">
                Every story highlights difficult words with plain-language
                definitions and sample sentences.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100">
            <div className="p-1.5 rounded-lg bg-sky-100 text-sky-800 shrink-0 mt-0.5">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Listen Aloud</h4>
              <p className="text-xs text-stone-600">
                Click "Listen Now" on any article to hear it read aloud slowly
                and clearly.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100">
            <div className="p-1.5 rounded-lg bg-purple-100 text-purple-800 shrink-0 mt-0.5">
              <Type className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">
                Custom Text Size & Save
              </h4>
              <p className="text-xs text-stone-600">
                Adjust text size for comfortable reading and bookmark stories to
                review vocabulary anytime.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold 
          transition-colors cursor-pointer"
        >
          Got it, let's explore!
        </button>
      </div>
    </div>
  );
};

