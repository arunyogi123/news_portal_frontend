import React, { useState, useEffect } from "react";
import { Article, ReadingLevel, TextSize } from "../types";
import {
  X,
  Bookmark,
  Volume2,
  VolumeX,
  Pause,
  Play,
  CheckCircle2,
  HelpCircle,
  Share2,
  ArrowLeft,
  Clock,
  Sparkles,
  Check,
  Camera,
  ArrowRight,
} from "lucide-react";

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  readingLevel: ReadingLevel;
  setReadingLevel: (level: ReadingLevel) => void;
  textSize: TextSize;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  readingLevel,
  setReadingLevel,
  textSize,
  isSaved,
  onToggleSave,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPausedAudio, setIsPausedAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Reset img error on article change
  useEffect(() => {
    setImgError(false);
  }, [article?.id]);

  // Stop speech when modal closes or article changes
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [article]);

  if (!article) return null;

  const displayTitle =
    readingLevel === "level1" ? article.simpleTitle : article.title;

  // Text size classes
  const getTextSizeClasses = () => {
    switch (textSize) {
      case "large":
        return {
          title: "text-2xl sm:text-4xl",
          body: "text-base sm:text-lg leading-relaxed",
          heading: "text-xl font-bold",
        };
      case "xlarge":
        return {
          title: "text-3xl sm:text-5xl",
          body: "text-lg sm:text-xl leading-loose",
          heading: "text-2xl font-bold",
        };
      default:
        return {
          title: "text-xl sm:text-3xl",
          body: "text-sm sm:text-base leading-relaxed",
          heading: "text-lg font-bold",
        };
    }
  };

  const styleClasses = getTextSizeClasses();

  // Speech synthesis handlers
  const handleToggleSpeech = () => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isPlayingAudio) {
      if (isPausedAudio) {
        window.speechSynthesis.resume();
        setIsPausedAudio(false);
      } else {
        window.speechSynthesis.pause();
        setIsPausedAudio(true);
      }
      return;
    }

    window.speechSynthesis.cancel();

    // Prepare clear text to speak
    const textToSpeak = `${displayTitle}. 
    In 10 seconds: ${article.takeaways.join(". ")}. 
    ${article.sections.map((s) => `${s.heading ? s.heading + ". " : ""}${s.paragraph}`).join(" ")}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.88;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
    setIsPausedAudio(false);
  };

  const handleStopSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setIsPausedAudio(false);
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 
    sm:p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn"
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl 
        border border-stone-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header inside modal */}
        <div
          className="flex items-center justify-between px-4 sm:px-6 py-3 border-b 
        border-stone-200 bg-stone-50/95 sticky top-0 z-20 backdrop-blur-xs"
        >
          <button
            id="btn-modal-back"
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 
            hover:text-stone-900 cursor-pointer p-1.5 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to News</span>
          </button>

          {/* Level selector pill */}
          <div className="flex items-center bg-stone-200/70 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setReadingLevel("level1")}
              className={`px-2 py-1 rounded-md font-medium transition-all ${
                readingLevel === "level1"
                  ? "bg-white text-amber-900 shadow-2xs font-semibold"
                  : "text-stone-600"
              }`}
            >
              Super Simple
            </button>
            <button
              onClick={() => setReadingLevel("level2")}
              className={`px-2 py-1 rounded-md font-medium transition-all ${
                readingLevel === "level2"
                  ? "bg-white text-amber-900 shadow-2xs font-semibold"
                  : "text-stone-600"
              }`}
            >
              Standard
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              id={`btn-modal-bookmark-${article.id}`}
              onClick={(e) => onToggleSave(article.id, e)}
              className="p-2 rounded-lg text-stone-600 hover:text-amber-600 
              hover:bg-stone-200/60 transition-colors cursor-pointer"
              title={isSaved ? "Remove from saved" : "Save article"}
            >
              <Bookmark
                className={`w-4 h-4 ${isSaved ? "fill-amber-600 text-amber-600" : ""}`}
              />
            </button>
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 
              transition-colors cursor-pointer relative"
              title="Share article"
            >
              {copiedLink ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>
            <button
              id="btn-modal-close"
              onClick={onClose}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 
              transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto px-5 sm:px-10 py-6 sm:py-8 space-y-6">
          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-stone-500 font-medium">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">
              {article.categoryLabel}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span>•</span>
            <span>{article.date}</span>
          </div>

          {/* Headline */}
          <h1
            className={`font-news font-bold text-stone-900 tracking-tight leading-tight ${styleClasses.title}`}
          >
            {displayTitle}
          </h1>

          {/* Audio Read-Aloud Tool for Beginners */}
          <div
            className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/70 
          flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-200/80 text-amber-900 flex items-center justify-center shrink-0">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-amber-950">
                  Listen to this article (Read Aloud)
                </p>
                <p className="text-[11px] text-stone-600">
                  Great for practicing pronunciation and following along!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                id="btn-audio-toggle"
                onClick={handleToggleSpeech}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 
                hover:bg-amber-700 text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors"
              >
                {isPlayingAudio && !isPausedAudio ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{isPausedAudio ? "Resume" : "Listen Now"}</span>
                  </>
                )}
              </button>

              {isPlayingAudio && (
                <button
                  id="btn-audio-stop"
                  onClick={handleStopSpeech}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-200 
                  hover:bg-stone-300 text-stone-700 text-xs font-medium cursor-pointer transition-colors"
                  title="Stop audio"
                >
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Stop</span>
                </button>
              )}
            </div>
          </div>

          {/* Article Hero Photo */}
          <div className="rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
            {!imgError ? (
              <img
                src={article.imageUrl}
                alt={article.title}
                onError={() => setImgError(true)}
                className="w-full max-h-[380px] object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div
                className="w-full h-48 sm:h-64 bg-gradient-to-br from-stone-800 to-stone-900 f
              lex flex-col items-center justify-center p-6 text-center"
              >
                <Sparkles className="w-12 h-12 text-amber-400 mb-2" />
                <span className="text-stone-300 font-semibold text-sm max-w-md">
                  {article.title}
                </span>
              </div>
            )}
            <div
              className="p-2.5 bg-stone-50 border-t border-stone-100 text-[11px] text-stone-500 
            font-medium flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>{article.imageCaption}</span>
            </div>
          </div>

          {/* "In 10 Seconds" - 3 Key Facts */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>In 10 Seconds: What You Need To Know</span>
            </div>
            <ul className="space-y-2">
              {article.takeaways.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm text-stone-700"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* "Why It Matters" box */}
          <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-950 uppercase tracking-wider mb-1.5">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Why This Matters To You</span>
            </div>
            <p className="text-sm text-sky-900 leading-relaxed">
              {article.whyItMatters}
            </p>
          </div>

          {/* Story Content Sections */}
          <div className="space-y-6 pt-2">
            {article.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                {sec.heading && (
                  <h3
                    className={`text-stone-900 font-news ${styleClasses.heading}`}
                  >
                    {sec.heading}
                  </h3>
                )}
                <p
                  className={`text-stone-700 font-normal ${styleClasses.body}`}
                >
                  {sec.paragraph}
                </p>
              </div>
            ))}
          </div>

          {/* Words To Know & Vocabulary Helper */}
          <div className="pt-4 border-t border-stone-200">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-900 uppercase tracking-wider mb-4">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Words to Know: New Vocabulary In This Story</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {article.wordsToKnow.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80"
                >
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="font-bold text-stone-900 text-sm">
                      {item.word}
                    </span>
                    {item.pronunciation && (
                      <span className="text-[11px] text-amber-800 italic font-medium">
                        [{item.pronunciation}]
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-700 mb-2 leading-relaxed flex items-start gap-1">
                    <ArrowRight className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-semibold text-stone-900">
                        Meaning:
                      </strong>{" "}
                      {item.simpleMeaning}
                    </span>
                  </p>
                  <p className="text-[11px] text-stone-500 italic bg-white/70 p-2 rounded-lg border border-amber-100">
                    “{item.exampleSentence}”
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center 
        justify-between text-xs text-stone-500"
        >
          <span className="inline-flex items-center gap-1.5 font-medium text-stone-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>You finished reading this story!</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white 
            font-semibold cursor-pointer transition-colors"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};
