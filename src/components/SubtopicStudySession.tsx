import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { VocabWord, OxfordSubtopic, OxfordUnit } from '../types';
import { speakWord, playAudioFeedback } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Lightbulb, 
  RotateCw, 
  ArrowRight, 
  Trophy, 
  Layers, 
  BookOpen, 
  Shuffle,
  Eye,
  Check,
  ChevronRight,
  X
} from 'lucide-react';

interface SubtopicStudySessionProps {
  subtopic: OxfordSubtopic;
  unit: OxfordUnit;
  words: VocabWord[];
  onClose: () => void;
  onUpdateWordLevel: (wordId: string, rating: 'again' | 'hard' | 'good') => void;
  onShowToast: (msg: string) => void;
  onNextSubtopic?: (nextSubtopic: OxfordSubtopic) => void;
}

type SessionStage = 'round_1' | 'round_1_complete' | 'round_2' | 'all_complete';
type Round1Step = 'flashcard' | 'spelling';

/**
 * Normalizes strings for spelling comparisons
 * Handles case, leading/trailing whitespace, punctuation variations (apostrophes)
 */
function normalizeAnswer(str: string): string {
  return str
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9\s']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Shuffles an array randomly (Fisher-Yates)
 */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const SubtopicStudySession: React.FC<SubtopicStudySessionProps> = ({
  subtopic,
  unit,
  words,
  onClose,
  onUpdateWordLevel,
  onShowToast,
  onNextSubtopic,
}) => {
  // Ensure we have words to study
  const orderedWords = useMemo(() => {
    return words.length > 0 ? words : [];
  }, [words]);

  // Session state
  const [stage, setStage] = useState<SessionStage>('round_1');
  const [round1Index, setRound1Index] = useState(0);
  const [round1Step, setRound1Step] = useState<Round1Step>('flashcard');

  // Round 2 states (shuffled)
  const [shuffledWords, setShuffledWords] = useState<VocabWord[]>([]);
  const [round2Index, setRound2Index] = useState(0);

  // Spelling inputs & feedback
  const [spellingInput, setSpellingInput] = useState('');
  const [spellingStatus, setSpellingStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showHint, setShowHint] = useState(false);
  const [peekFlashcard, setPeekFlashcard] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Input reference for auto-focusing
  const inputRef = useRef<HTMLInputElement>(null);
  const advanceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speechFallbackTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasAdvancedRef = useRef(false);

  // Clear all pending timers
  const clearAdvanceTimers = useCallback(() => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
    if (speechFallbackTimerRef.current) {
      clearTimeout(speechFallbackTimerRef.current);
      speechFallbackTimerRef.current = null;
    }
  }, []);

  // Current active word based on stage
  const currentWord: VocabWord | undefined = useMemo(() => {
    if (stage === 'round_1') {
      return orderedWords[round1Index];
    }
    if (stage === 'round_2') {
      return shuffledWords[round2Index];
    }
    return undefined;
  }, [stage, round1Index, round2Index, orderedWords, shuffledWords]);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      clearAdvanceTimers();
    };
  }, [clearAdvanceTimers]);

  // Speak word helper
  const handleSpeakCurrentWord = useCallback((text?: string) => {
    const wordToSpeak = text || currentWord?.word;
    if (!wordToSpeak) return;
    setIsSpeaking(true);
    speakWord(wordToSpeak, undefined, () => setIsSpeaking(false));
  }, [currentWord]);

  // Auto-speak on flashcard step
  useEffect(() => {
    if (stage === 'round_1' && round1Step === 'flashcard' && currentWord) {
      // Small timeout for smooth experience
      const timer = setTimeout(() => {
        handleSpeakCurrentWord(currentWord.word);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [stage, round1Index, round1Step, currentWord, handleSpeakCurrentWord]);

  // Focus input when entering spelling step or changing words
  useEffect(() => {
    setSpellingInput('');
    setSpellingStatus('idle');
    setShowHint(false);
    setPeekFlashcard(false);
    clearAdvanceTimers();

    if ((stage === 'round_1' && round1Step === 'spelling') || stage === 'round_2') {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [stage, round1Index, round1Step, round2Index, clearAdvanceTimers]);

  // Move from Flashcard to Spelling (Step 1 -> Step 2)
  const handleProceedToSpelling = () => {
    playAudioFeedback('click');
    setRound1Step('spelling');
  };

  // Next word in Round 1
  const advanceRound1 = useCallback(() => {
    clearAdvanceTimers();
    hasAdvancedRef.current = false;
    if (round1Index < orderedWords.length - 1) {
      setRound1Index(prev => prev + 1);
      setRound1Step('flashcard');
    } else {
      // Completed Round 1!
      playAudioFeedback('success');
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
      setStage('round_1_complete');
      onShowToast('🎉 Tuyệt vời! Bạn đã hoàn thành Lượt 1!');
    }
  }, [round1Index, orderedWords.length, onShowToast, clearAdvanceTimers]);

  // Next word in Round 2
  const advanceRound2 = useCallback(() => {
    clearAdvanceTimers();
    hasAdvancedRef.current = false;
    if (round2Index < shuffledWords.length - 1) {
      setRound2Index(prev => prev + 1);
    } else {
      // Completed Round 2! Mastered entire subtopic!
      playAudioFeedback('success');
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 }
      });
      setStage('all_complete');
      onShowToast('🏆 Xuất sắc! Bạn đã làm chủ 100% nhóm từ vựng!');
    }
  }, [round2Index, shuffledWords.length, onShowToast, clearAdvanceTimers]);

  // Check spelling handler
  const handleCheckSpelling = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentWord) return;

    // If user already typed correctly and presses Enter again, advance immediately
    if (spellingStatus === 'correct') {
      clearAdvanceTimers();
      if (stage === 'round_1') {
        advanceRound1();
      } else if (stage === 'round_2') {
        advanceRound2();
      }
      return;
    }

    const normalizedInput = normalizeAnswer(spellingInput);
    const normalizedTarget = normalizeAnswer(currentWord.word);
    
    // Check if correct (also allow without punctuation like apostrophes)
    const rawTargetNoApos = normalizedTarget.replace(/'/g, '');
    const rawInputNoApos = normalizedInput.replace(/'/g, '');

    const isMatch = normalizedInput === normalizedTarget || rawInputNoApos === rawTargetNoApos;

    if (isMatch) {
      setSpellingStatus('correct');
      playAudioFeedback('correct');
      onUpdateWordLevel(currentWord.id, 'good');

      hasAdvancedRef.current = false;
      clearAdvanceTimers();

      const safeAdvance = () => {
        if (hasAdvancedRef.current) return;
        hasAdvancedRef.current = true;
        clearAdvanceTimers();
        setIsSpeaking(false);
        if (stage === 'round_1') {
          advanceRound1();
        } else if (stage === 'round_2') {
          advanceRound2();
        }
      };

      // Play audio pronunciation: Wait until pronunciation has COMPLETELY finished reading before advancing!
      // Add a slight 180ms delay so the chime and first word syllable do not overlap
      setTimeout(() => {
        setIsSpeaking(true);
        speakWord(
          currentWord.word,
          () => {
            setIsSpeaking(true);
          },
          () => {
            setIsSpeaking(false);
            // Speech has completely finished reading the word/phrase!
            // Wait a comfortable 500ms visual buffer before advancing to the next word
            advanceTimerRef.current = setTimeout(() => {
              safeAdvance();
            }, 500);
          }
        );
      }, 180);

      // Fallback safeguard in case browser TTS onEnd is delayed or not supported
      const wordCount = currentWord.word.split(/\s+/).length;
      const fallbackMs = Math.max(3000, wordCount * 800 + 2500);
      speechFallbackTimerRef.current = setTimeout(() => {
        safeAdvance();
      }, fallbackMs);
    } else {
      setSpellingStatus('wrong');
      playAudioFeedback('wrong');
      onShowToast('Chưa chính xác, hãy thử lại hoặc bấm Gợi ý!');
      inputRef.current?.focus();
    }
  }, [currentWord, spellingInput, spellingStatus, stage, advanceRound1, advanceRound2, onUpdateWordLevel, onShowToast, clearAdvanceTimers]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // In Flashcard step, Enter or Space proceeds to spelling
      if (stage === 'round_1' && round1Step === 'flashcard') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleProceedToSpelling();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage, round1Step, onClose]);

  // Start Round 2 (Shuffle and start)
  const handleStartRound2 = () => {
    playAudioFeedback('click');
    const shuffled: VocabWord[] = shuffleArray<VocabWord>(orderedWords);
    // Ensure shuffled order isn't identical if more than 2 items
    if (shuffled.length > 2 && shuffled[0]?.id === orderedWords[0]?.id) {
      const first = shuffled.shift();
      if (first) shuffled.push(first);
    }
    setShuffledWords(shuffled);
    setRound2Index(0);
    setStage('round_2');
    onShowToast('🔀 Đã đảo lộn thứ tự! Bắt đầu đánh vần lại!');
  };

  // Restart entire session
  const handleRestartSession = () => {
    playAudioFeedback('click');
    setRound1Index(0);
    setRound1Step('flashcard');
    setStage('round_1');
    onShowToast('Bắt đầu học lại từ đầu nhóm từ vựng!');
  };

  // Find next subtopic in unit if available
  const nextSubtopicObj = useMemo(() => {
    const currentIndex = unit.subtopics.findIndex(s => s.id === subtopic.id);
    if (currentIndex >= 0 && currentIndex < unit.subtopics.length - 1) {
      return unit.subtopics[currentIndex + 1];
    }
    return null;
  }, [unit, subtopic]);

  // Overall Progress Percentage
  const progressPercent = useMemo(() => {
    const totalSteps = orderedWords.length * 2; // Round 1 (each has 1 flashcard+spelling) + Round 2 (each has 1 spelling)
    if (totalSteps === 0) return 0;
    
    if (stage === 'round_1') {
      const completedR1 = round1Index;
      return Math.round((completedR1 / totalSteps) * 100);
    }
    if (stage === 'round_1_complete') {
      return 50;
    }
    if (stage === 'round_2') {
      const completedTotal = orderedWords.length + round2Index;
      return Math.round((completedTotal / totalSteps) * 100);
    }
    return 100;
  }, [stage, round1Index, round2Index, orderedWords.length]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 overflow-y-auto">
      {/* Top Navigation & Status Bar */}
      <div className="w-full max-w-3xl flex items-center justify-between bg-white/10 backdrop-blur-md px-4 sm:px-6 py-3.5 rounded-2xl border border-white/15 text-white shrink-0 shadow-lg">
        {/* Left: Back & Unit Info */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            title="Thoát phiên học (Esc)"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-300">
                Unit {unit.unitNumber} • Mục {subtopic.subtopicNumber}
              </span>
              <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full text-slate-300">
                Trang {subtopic.pages}
              </span>
            </div>
            <h3 className="font-headline font-bold text-sm sm:text-base text-white truncate max-w-[200px] sm:max-w-md">
              {subtopic.englishTitle} ({subtopic.vietnameseTitle})
            </h3>
          </div>
        </div>

        {/* Right: Round & Progress Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          {stage === 'round_1' && (
            <div className="text-right">
              <div className="flex items-center gap-1.5 justify-end">
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                  VÒNG 1: Học &amp; Đánh vần
                </span>
              </div>
              <span className="text-xs text-white/70 font-semibold mt-0.5 block">
                Từ {round1Index + 1} / {orderedWords.length}
              </span>
            </div>
          )}

          {stage === 'round_2' && (
            <div className="text-right">
              <div className="flex items-center gap-1.5 justify-end">
                <span className="text-[11px] font-bold text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Shuffle className="w-3 h-3" />
                  VÒNG 2: Đảo lộn ngẫu nhiên
                </span>
              </div>
              <span className="text-xs text-white/70 font-semibold mt-0.5 block">
                Từ {round2Index + 1} / {shuffledWords.length}
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-500/80 text-white/80 hover:text-white flex items-center justify-center transition-colors ml-1"
            title="Đóng cửa sổ"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-3xl my-2.5 shrink-0">
        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden p-0.5 border border-white/10">
          <div 
            className="bg-gradient-to-r from-indigo-500 via-emerald-400 to-teal-300 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Interactive Stage Container */}
      <div className="w-full max-w-3xl flex-1 flex flex-col justify-center my-auto py-2">
        {/* ========================================================================= */}
        {/* 1. ROUND 1 - STEP 1: HIỆN FLASHCARD */}
        {/* ========================================================================= */}
        {stage === 'round_1' && round1Step === 'flashcard' && currentWord && (
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 flex flex-col">
            {/* Step 1 Indicator Pill */}
            <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold text-[#3525cd] bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full uppercase tracking-wider">
                  Bước 1 / 2: Xem thẻ Flashcard
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Ghi nhớ mặt chữ, phiên âm và nghĩa
                </span>
              </div>
              <span className="text-xs font-bold text-slate-400">
                Thẻ #{round1Index + 1}
              </span>
            </div>

            {/* Word Content */}
            <div className="p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              {/* Image Preview */}
              <div className="w-full md:w-5/12 h-52 sm:h-64 rounded-2xl overflow-hidden bg-slate-950 border border-slate-100 shadow-inner shrink-0 relative group">
                <img
                  src={currentWord.imageUrl}
                  alt={currentWord.imageAlt || currentWord.word}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-white px-2 py-0.5 rounded-md border border-white/20">
                    Oxford OPD
                  </span>
                </div>
              </div>

              {/* Word Details */}
              <div className="w-full md:w-7/12 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {currentWord.partOfSpeech}
                    </span>
                    {currentWord.oxfordTier && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                        CEFR {currentWord.oxfordTier}
                      </span>
                    )}
                  </div>

                  {/* English Word & Audio */}
                  <div className="flex items-center gap-3 mt-2">
                    <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {currentWord.word}
                    </h2>
                    <button
                      type="button"
                      onClick={() => handleSpeakCurrentWord(currentWord.word)}
                      className={`w-10 h-10 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-[#3525cd] flex items-center justify-center transition-all shadow-xs shrink-0 ${
                        isSpeaking ? 'scale-110 ring-4 ring-indigo-200' : ''
                      }`}
                      title="Phát âm âm thanh bản xứ"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Phonetics */}
                  <p className="font-mono text-sm text-indigo-600 font-semibold mt-0.5">
                    {currentWord.phonetic}
                  </p>

                  {/* Vietnamese Meaning */}
                  <div className="mt-3 p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-100">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 block">
                      Nghĩa tiếng Việt
                    </span>
                    <p className="text-base sm:text-lg font-bold text-emerald-900 mt-0.5">
                      {currentWord.vietnameseMeaning}
                    </p>
                  </div>

                  {/* English Definition */}
                  {currentWord.englishDefinition && (
                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                      <strong>Định nghĩa:</strong> {currentWord.englishDefinition}
                    </p>
                  )}

                  {/* Example Sentence */}
                  {currentWord.exampleSentence && (
                    <div className="mt-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <p className="italic">"{currentWord.exampleSentence}"</p>
                      {currentWord.exampleVietnamese && (
                        <p className="text-slate-500 mt-0.5 font-medium">{currentWord.exampleVietnamese}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Big Button: Step 2 - Proceed to Spelling */}
                <button
                  type="button"
                  onClick={handleProceedToSpelling}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#3525cd] hover:bg-indigo-700 active:scale-[0.98] text-white font-extrabold text-sm sm:text-base transition-all shadow-lg flex items-center justify-center gap-2 group mt-2"
                >
                  <span>Bước 2: Nhập đánh vần từ này</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span className="text-[11px] font-normal opacity-75 hidden sm:inline bg-white/20 px-2 py-0.5 rounded-md ml-1">
                    Nhấn Enter ↵
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. ROUND 1 - STEP 2: NHẬP ĐÁNH VẦN (SPELLING) */}
        {/* ========================================================================= */}
        {stage === 'round_1' && round1Step === 'spelling' && currentWord && (
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 flex flex-col">
            {/* Step 2 Indicator Pill */}
            <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
                  Bước 2 / 2: Nhập đánh vần
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Nhìn tranh &amp; nghĩa tiếng Việt để gõ chính xác từ vựng
                </span>
              </div>
              <button
                type="button"
                onClick={() => setRound1Step('flashcard')}
                className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Xem lại thẻ</span>
              </button>
            </div>

            {/* Spelling Form Area */}
            <form onSubmit={handleCheckSpelling} className="p-6 sm:p-8 flex flex-col items-center gap-6">
              <div className="w-full flex flex-col sm:flex-row items-center gap-6">
                {/* Visual Image Clue */}
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-slate-950 border border-slate-100 shadow-md shrink-0 relative">
                  <img
                    src={currentWord.imageUrl}
                    alt={currentWord.vietnameseMeaning}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Meaning & Clues */}
                <div className="flex-1 text-center sm:text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                    {currentWord.partOfSpeech}
                  </span>
                  
                  <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                    {currentWord.vietnameseMeaning}
                  </h3>

                  <div className="flex items-center gap-3 mt-3 justify-center sm:justify-start flex-wrap">
                    <button
                      type="button"
                      onClick={() => handleSpeakCurrentWord(currentWord.word)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-[#3525cd] text-xs font-bold transition-colors border border-indigo-100 shadow-xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe phát âm gợi ý</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowHint(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold transition-colors border border-amber-100 shadow-xs"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Gợi ý chữ cái ({currentWord.word.length} ký tự)</span>
                    </button>
                  </div>

                  {/* Hint Reveal */}
                  {showHint && (
                    <div className="mt-2.5 text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 animate-in fade-in">
                      💡 <strong>Gợi ý:</strong> Bắt đầu bằng chữ <strong>"{currentWord.word.slice(0, 2)}"</strong> • Gồm <strong>{currentWord.word.split(' ').length} từ</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Input Box */}
              <div className="w-full flex flex-col items-center gap-3 pt-2">
                <div className="w-full relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={spellingInput}
                    onChange={(e) => {
                      setSpellingInput(e.target.value);
                      if (spellingStatus === 'wrong') setSpellingStatus('idle');
                    }}
                    disabled={spellingStatus === 'correct'}
                    placeholder="Gõ từ vựng tiếng Anh vào đây..."
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    className={`w-full text-center sm:text-left px-5 py-4 text-xl sm:text-2xl font-bold font-mono rounded-2xl border-2 transition-all shadow-inner outline-none ${
                      spellingStatus === 'correct'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-4 ring-emerald-100'
                        : spellingStatus === 'wrong'
                        ? 'border-red-400 bg-red-50/50 text-red-900 animate-shake'
                        : 'border-slate-300 bg-slate-50 focus:border-[#3525cd] focus:bg-white focus:ring-4 focus:ring-indigo-100 text-slate-900'
                    }`}
                  />

                  {spellingStatus === 'correct' && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 flex items-center gap-1.5 font-bold text-sm bg-emerald-100 px-3 py-1.5 rounded-xl animate-in fade-in">
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Chính xác!</span>
                    </div>
                  )}
                </div>

                {/* Feedback & Action */}
                <div className="w-full flex items-center justify-between gap-3 flex-wrap">
                  <div className="text-xs">
                    {spellingStatus === 'wrong' && (
                      <span className="text-red-600 font-bold flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        Chưa chính xác! Thử lại hoặc bấm xem gợi ý
                      </span>
                    )}
                    {spellingStatus === 'correct' && (
                      <span className="text-emerald-700 font-bold flex items-center gap-1.5 animate-in fade-in">
                        <Volume2 className={`w-4 h-4 text-emerald-600 ${isSpeaking ? 'animate-bounce text-indigo-600' : ''}`} />
                        <span>
                          {isSpeaking 
                            ? `Đang đọc phát âm chuẩn: "${currentWord.word}"` 
                            : 'Chính xác! Đang chuyển tiếp sang từ tiếp theo...'}
                        </span>
                      </span>
                    )}
                    {spellingStatus === 'idle' && (
                      <span className="text-slate-400">
                        Nhấn <strong>Enter</strong> để kiểm tra đánh vần
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={spellingStatus === 'correct' || !spellingInput.trim()}
                    className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm transition-all shadow-md flex items-center gap-1.5"
                  >
                    <span>Kiểm tra</span>
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. TRANSITION: COMPLETED ROUND 1 -> READY FOR SHUFFLED ROUND 2 */}
        {/* ========================================================================= */}
        {stage === 'round_1_complete' && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200 text-center flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-200 max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-inner border border-amber-100">
              <Sparkles className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                Hoàn thành Lượt 1 (100%)
              </span>
              <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Xuất sắc! Đã học xong Lượt 1
              </h3>
              <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                Bạn đã ghi nhớ qua Thẻ Flashcard và hoàn thành đánh vần toàn bộ <strong>{orderedWords.length} từ vựng</strong> trong nhóm <strong>{subtopic.englishTitle}</strong>.
              </p>
            </div>

            {/* Explaining Round 2 as requested by user */}
            <div className="w-full bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#3525cd] flex items-center justify-center shrink-0">
                <Shuffle className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-900 text-sm block mb-1">
                  Tiếp theo: VÒNG 2 – Đánh vần đảo lộn ngẫu nhiên
                </strong>
                Hệ thống sẽ <strong>đảo lộn thứ tự từ vựng</strong> trong bài học và yêu cầu bạn <strong>đánh vần lại một lần nữa</strong> nhằm kích thích phản xạ không theo quán tính, giúp khắc sâu vào trí nhớ dài hạn vĩnh viễn!
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full">
              <button
                type="button"
                onClick={handleStartRound2}
                className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold text-base transition-all shadow-lg flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Shuffle className="w-5 h-5" />
                <span>Bắt đầu Vòng 2 (Đảo lộn &amp; Đánh vần)</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. ROUND 2: ĐẢO LỘN TỪ VỰNG VÀ CHO ĐÁNH VẦN LẠI */}
        {/* ========================================================================= */}
        {stage === 'round_2' && currentWord && (
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-amber-200 animate-in fade-in zoom-in-95 duration-200 flex flex-col">
            {/* Round 2 Indicator Pill */}
            <div className="bg-amber-50/80 px-6 py-3 border-b border-amber-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold text-amber-800 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Shuffle className="w-3 h-3" />
                  Vòng 2: Đánh vần ngẫu nhiên
                </span>
                <span className="text-xs text-amber-900/80 font-medium">
                  Đánh vần lại phản xạ ngẫu nhiên (Từ #{round2Index + 1}/{shuffledWords.length})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPeekFlashcard(prev => !prev)}
                className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{peekFlashcard ? 'Ẩn đáp án' : 'Xem đáp án'}</span>
              </button>
            </div>

            {/* Peek Answer if needed */}
            {peekFlashcard && (
              <div className="bg-indigo-50/90 px-6 py-2 border-b border-indigo-100 text-xs text-indigo-900 flex items-center justify-between">
                <span>Đáp án từ: <strong>{currentWord.word}</strong> ({currentWord.phonetic})</span>
                <button
                  type="button"
                  onClick={() => setPeekFlashcard(false)}
                  className="text-indigo-700 hover:text-indigo-900 font-bold"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Spelling Form Area */}
            <form onSubmit={handleCheckSpelling} className="p-6 sm:p-8 flex flex-col items-center gap-6">
              <div className="w-full flex flex-col sm:flex-row items-center gap-6">
                {/* Visual Image Clue */}
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-slate-950 border border-slate-100 shadow-md shrink-0 relative">
                  <img
                    src={currentWord.imageUrl}
                    alt={currentWord.vietnameseMeaning}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="text-[9px] font-extrabold bg-amber-600 text-white px-2 py-0.5 rounded shadow-sm">
                      Shuffle #{round2Index + 1}
                    </span>
                  </div>
                </div>

                {/* Meaning & Clues */}
                <div className="flex-1 text-center sm:text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md">
                    {currentWord.partOfSpeech}
                  </span>
                  
                  <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                    {currentWord.vietnameseMeaning}
                  </h3>

                  <div className="flex items-center gap-3 mt-3 justify-center sm:justify-start flex-wrap">
                    <button
                      type="button"
                      onClick={() => handleSpeakCurrentWord(currentWord.word)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-[#3525cd] text-xs font-bold transition-colors border border-indigo-100 shadow-xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe phát âm</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowHint(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold transition-colors border border-amber-100 shadow-xs"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Gợi ý ký tự ({currentWord.word.length} chữ)</span>
                    </button>
                  </div>

                  {/* Hint Reveal */}
                  {showHint && (
                    <div className="mt-2.5 text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 animate-in fade-in">
                      💡 <strong>Gợi ý:</strong> Bắt đầu bằng chữ <strong>"{currentWord.word.slice(0, 2)}"</strong> • {currentWord.word.split(' ').length} từ
                    </div>
                  )}
                </div>
              </div>

              {/* Input Box */}
              <div className="w-full flex flex-col items-center gap-3 pt-2">
                <div className="w-full relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={spellingInput}
                    onChange={(e) => {
                      setSpellingInput(e.target.value);
                      if (spellingStatus === 'wrong') setSpellingStatus('idle');
                    }}
                    disabled={spellingStatus === 'correct'}
                    placeholder="Đánh vần lại từ tiếng Anh..."
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    className={`w-full text-center sm:text-left px-5 py-4 text-xl sm:text-2xl font-bold font-mono rounded-2xl border-2 transition-all shadow-inner outline-none ${
                      spellingStatus === 'correct'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-4 ring-emerald-100'
                        : spellingStatus === 'wrong'
                        ? 'border-red-400 bg-red-50/50 text-red-900 animate-shake'
                        : 'border-slate-300 bg-slate-50 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-100 text-slate-900'
                    }`}
                  />

                  {spellingStatus === 'correct' && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 flex items-center gap-1.5 font-bold text-sm bg-emerald-100 px-3 py-1.5 rounded-xl animate-in fade-in">
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Chuẩn xác!</span>
                    </div>
                  )}
                </div>

                {/* Feedback & Action */}
                <div className="w-full flex items-center justify-between gap-3 flex-wrap">
                  <div className="text-xs">
                    {spellingStatus === 'wrong' && (
                      <span className="text-red-600 font-bold flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        Chưa chính xác! Thử lại hoặc bấm xem gợi ý
                      </span>
                    )}
                    {spellingStatus === 'correct' && (
                      <span className="text-emerald-700 font-bold flex items-center gap-1.5 animate-in fade-in">
                        <Volume2 className={`w-4 h-4 text-emerald-600 ${isSpeaking ? 'animate-bounce text-amber-600' : ''}`} />
                        <span>
                          {isSpeaking 
                            ? `Đang đọc phát âm chuẩn: "${currentWord.word}"` 
                            : 'Chuẩn xác! Đang chuyển tiếp sang từ tiếp theo...'}
                        </span>
                      </span>
                    )}
                    {spellingStatus === 'idle' && (
                      <span className="text-slate-400">
                        Nhấn <strong>Enter</strong> để kiểm tra đánh vần
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={spellingStatus === 'correct' || !spellingInput.trim()}
                    className="py-3 px-6 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-sm transition-all shadow-md flex items-center gap-1.5"
                  >
                    <span>Kiểm tra</span>
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. ALL COMPLETE: FINAL VICTORY SCREEN */}
        {/* ========================================================================= */}
        {stage === 'all_complete' && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200 text-center flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-200 max-w-xl mx-auto">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-900 flex items-center justify-center shadow-lg border-2 border-white">
              <Trophy className="w-12 h-12" />
            </div>

            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Hoàn thành 100% Cả 2 Vòng
              </span>
              <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Chúc mừng! Bạn đã làm chủ hoàn toàn!
              </h3>
              <p className="text-sm font-semibold text-emerald-700 mt-1">
                Mục {subtopic.subtopicNumber}: {subtopic.englishTitle} ({subtopic.vietnameseTitle})
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Toàn bộ {orderedWords.length} từ vựng đã được học qua Flashcard, đánh vần thứ tự và vượt qua thử thách đánh vần ngẫu nhiên!
              </p>
            </div>

            {/* Achievement Badges */}
            <div className="grid grid-cols-2 gap-3 w-full text-xs">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 text-left">
                <span className="text-emerald-700 font-bold block text-sm">✓ Vòng 1 Hoàn Tất</span>
                <span className="text-slate-500 text-[11px]">Học Flashcard + Đánh vần</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-100 text-left">
                <span className="text-amber-800 font-bold block text-sm">✓ Vòng 2 Đảo Lộn</span>
                <span className="text-slate-500 text-[11px]">Đánh vần phản xạ ngẫu nhiên</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
              <button
                type="button"
                onClick={handleRestartSession}
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <RotateCw className="w-4 h-4" />
                <span>Học lại bài học này</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-[#3525cd] hover:bg-indigo-700 text-white font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Quay lại kho từ vựng</span>
              </button>
            </div>

            {/* Next Subtopic Shortcut if available */}
            {nextSubtopicObj && onNextSubtopic && (
              <button
                type="button"
                onClick={() => onNextSubtopic(nextSubtopicObj)}
                className="text-xs text-indigo-700 font-bold hover:underline flex items-center gap-1 pt-1"
              >
                <span>Chuyển sang học mục tiếp theo: #{nextSubtopicObj.subtopicNumber} {nextSubtopicObj.englishTitle}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="w-full max-w-3xl flex items-center justify-between text-[11px] text-white/50 pt-2 shrink-0">
        <span>The Oxford Picture Dictionary • SRS Smart Learning</span>
        <span>Phím tắt: [Enter] Kiểm tra / Tiếp tục • [Esc] Thoát</span>
      </div>
    </div>
  );
};
