import React, { useState, useEffect, useCallback } from 'react';
import { VocabWord, LearningMode, NavigationTab, StudySessionFilter } from '../types';
import { speakWord, playAudioFeedback } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  RotateCw, 
  CheckCircle2, 
  HelpCircle, 
  SpellCheck, 
  Layers, 
  ArrowLeft, 
  Sparkles, 
  AlertCircle, 
  Lightbulb, 
  RefreshCw,
  BookOpen,
  X,
  ArrowRight,
  Shuffle,
  Check,
  Languages
} from 'lucide-react';

interface SRSScreenProps {
  words: VocabWord[];
  initialMode?: LearningMode;
  studyFilter?: StudySessionFilter | null;
  onClearStudyFilter?: () => void;
  onNavigate: (tab: NavigationTab) => void;
  onShowToast: (msg: string) => void;
  onUpdateWordLevel: (wordId: string, rating: 'again' | 'hard' | 'good') => void;
}

export const SRSScreen: React.FC<SRSScreenProps> = ({
  words,
  initialMode = 'flashcard',
  studyFilter,
  onClearStudyFilter,
  onNavigate,
  onShowToast,
  onUpdateWordLevel,
}) => {
  const [learningMode, setLearningMode] = useState<LearningMode>(initialMode);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [consecutiveGood, setConsecutiveGood] = useState(12);

  // Spelling mode states
  const [spellingInput, setSpellingInput] = useState<string[]>([]);
  const [spellingStatus, setSpellingStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Quiz mode states
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isQuizAnswered, setIsQuizAnswered] = useState(false);
  const [quizDirection, setQuizDirection] = useState<'auto' | 'vi_to_en' | 'en_to_vi'>('auto');
  const recentDistractorIdsRef = React.useRef<string[]>([]);

  // Filter deck by studyFilter if present
  const scopedWords = React.useMemo(() => {
    if (!studyFilter) return words;
    const filtered = words.filter(w => {
      if (studyFilter.type === 'subtopic') {
        if (w.subtopicId && w.subtopicId === studyFilter.id) return true;
        if (w.subtopic && w.subtopic.toLowerCase().includes(studyFilter.title.toLowerCase())) return true;
        return false;
      } else {
        if (w.unitId && w.unitId === studyFilter.id) return true;
        const uClean = studyFilter.title.toLowerCase();
        return w.topic.toLowerCase().includes(uClean);
      }
    });
    return filtered.length > 0 ? filtered : words;
  }, [words, studyFilter]);

  // Study deck (when studying a specific subtopic/unit, prioritize its words)
  const studyQueue = studyFilter 
    ? scopedWords 
    : words.filter(w => w.dueStatus === 'due_today' || w.dueStatus === 'overdue');
  const deck = studyQueue.length > 0 ? studyQueue : (scopedWords.length > 0 ? scopedWords : words);
  const currentWord = deck[currentIndex] || deck[0];

  // Reset when word changes
  const resetCardState = useCallback(() => {
    setIsFlipped(false);
    setSpellingInput([]);
    setSpellingStatus('idle');
    setSelectedAnswer(null);
    setIsQuizAnswered(false);
  }, []);

  useEffect(() => {
    resetCardState();
  }, [currentIndex, learningMode, resetCardState]);

  // Flashcard Rating Handler
  const handleRating = (rating: 'again' | 'hard' | 'good') => {
    if (!currentWord) return;

    onUpdateWordLevel(currentWord.id, rating);
    if (rating === 'good') {
      playAudioFeedback('correct');
      setConsecutiveGood(prev => prev + 1);
      onShowToast(`Đã thăng hạng: ${currentWord.word} (Level +1)`);
    } else if (rating === 'hard') {
      playAudioFeedback('click');
      onShowToast(`Giữ nhịp ôn: ${currentWord.word}`);
    } else {
      playAudioFeedback('wrong');
      setConsecutiveGood(0);
      onShowToast(`Đặt lại về Level 1: ${currentWord.word}`);
    }

    if (currentIndex < deck.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      playAudioFeedback('success');
      onShowToast('Chúc mừng! Bạn đã hoàn thành phiên ôn tập hôm nay!');
      setCurrentIndex(0);
    }
  };

  // Spelling mode handler
  const targetLetters = currentWord ? currentWord.word.toUpperCase().split('') : [];

  const handleVirtualLetter = (letter: string) => {
    if (spellingInput.length < targetLetters.length) {
      const nextInput = [...spellingInput, letter];
      setSpellingInput(nextInput);
      playAudioFeedback('click');

      if (nextInput.length === targetLetters.length) {
        if (nextInput.join('') === targetLetters.join('')) {
          setSpellingStatus('correct');
          playAudioFeedback('correct');
          confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
          setTimeout(() => {
            handleRating('good');
          }, 1200);
        } else {
          setSpellingStatus('wrong');
          playAudioFeedback('wrong');
        }
      }
    }
  };

  const handleBackspace = () => {
    setSpellingInput(prev => prev.slice(0, -1));
    setSpellingStatus('idle');
  };

  const handleHint = () => {
    const nextIdx = spellingInput.length;
    if (nextIdx < targetLetters.length) {
      handleVirtualLetter(targetLetters[nextIdx]);
    }
  };

  // Determine if current question is Vietnamese -> English or English -> Vietnamese
  const isViToEn = React.useMemo(() => {
    if (quizDirection === 'vi_to_en') return true;
    if (quizDirection === 'en_to_vi') return false;
    // 'auto': alternate every question to challenge both receptive & productive recall
    return currentIndex % 2 === 0;
  }, [quizDirection, currentIndex]);

  // Mask example sentence safely without regex syntax breakages
  const maskedExampleSentence = React.useMemo(() => {
    if (!currentWord || !currentWord.exampleSentence) return '';
    try {
      const escaped = currentWord.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return currentWord.exampleSentence.replace(new RegExp(escaped, 'gi'), '_____');
    } catch {
      return currentWord.exampleSentence;
    }
  }, [currentWord]);

  // Smarter, challenging Quiz Options generator (Anti-repetition & Context-Aware distractors)
  const quizOptions = React.useMemo(() => {
    if (!currentWord) return [];

    // Filter candidate pool: exclude current word and any with duplicate word or Vietnamese meaning
    const candidatePool = words.filter(w => 
      w.id !== currentWord.id &&
      w.word.trim().toLowerCase() !== currentWord.word.trim().toLowerCase() &&
      w.vietnameseMeaning.trim().toLowerCase() !== currentWord.vietnameseMeaning.trim().toLowerCase()
    );

    if (candidatePool.length === 0) {
      return [currentWord];
    }

    const shuffle = <T,>(arr: T[]): T[] => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    // Tier 1: Same subtopic or unit (highest relevance, hardest to eliminate blindly)
    const tier1 = candidatePool.filter(w => 
      (w.subtopicId && currentWord.subtopicId && w.subtopicId === currentWord.subtopicId) ||
      (w.unitId && currentWord.unitId && w.unitId === currentWord.unitId) ||
      (w.topic && currentWord.topic && w.topic.toLowerCase() === currentWord.topic.toLowerCase())
    );

    // Tier 2: Same part of speech or phrasal structure (e.g. verbs with verbs)
    const tier2 = candidatePool.filter(w => 
      !tier1.some(t => t.id === w.id) &&
      (
        (w.partOfSpeech && currentWord.partOfSpeech && w.partOfSpeech.toLowerCase() === currentWord.partOfSpeech.toLowerCase()) ||
        (w.word.includes(' ') && currentWord.word.includes(' ')) ||
        (!w.word.includes(' ') && !currentWord.word.includes(' '))
      )
    );

    // Tier 3: General vocabulary pool
    const tier3 = candidatePool.filter(w => 
      !tier1.some(t => t.id === w.id) && 
      !tier2.some(t => t.id === w.id)
    );

    // Selection with Anti-Repetition filter
    const selectedDistractors: VocabWord[] = [];
    const recent = recentDistractorIdsRef.current;

    const pickFromList = (list: VocabWord[]) => {
      // First try picking candidates NOT in recent distractors
      const freshCandidates = shuffle(list.filter(w => !recent.includes(w.id)));
      for (const item of freshCandidates) {
        if (selectedDistractors.length < 3 && !selectedDistractors.some(d => d.id === item.id)) {
          selectedDistractors.push(item);
        }
      }
      // If still need more, pick from previously recent candidates in this tier
      if (selectedDistractors.length < 3) {
        const remainingInTier = shuffle(list.filter(w => !selectedDistractors.some(d => d.id === w.id)));
        for (const item of remainingInTier) {
          if (selectedDistractors.length < 3) {
            selectedDistractors.push(item);
          }
        }
      }
    };

    // Priority 1: Pick from Tier 1 (Contextually related)
    pickFromList(tier1);
    // Priority 2: If need more, pick from Tier 2 (Grammatically related)
    if (selectedDistractors.length < 3) {
      pickFromList(tier2);
    }
    // Priority 3: If still need more, pick from Tier 3 (General vocabulary pool)
    if (selectedDistractors.length < 3) {
      pickFromList(tier3);
    }

    // Update recent distractors ref (keep last 8 items to prevent repetition in next 2-3 questions)
    const newDistractorIds = selectedDistractors.map(d => d.id);
    recentDistractorIdsRef.current = [...newDistractorIds, ...recent].slice(0, 8);

    // Combine currentWord + distractors and shuffle positions
    return shuffle([currentWord, ...selectedDistractors]);
  }, [currentWord, words]);

  const handleQuizSelect = (optId: string) => {
    if (isQuizAnswered) return;
    setSelectedAnswer(optId);
    setIsQuizAnswered(true);

    if (optId === currentWord.id) {
      playAudioFeedback('correct');
      onShowToast('Chính xác! (+1 Level SRS)');
      speakWord(currentWord.word);
    } else {
      playAudioFeedback('wrong');
      onShowToast(`Chưa đúng. Đáp án là: ${currentWord.word}`);
      speakWord(currentWord.word);
    }
  };

  // Keyboard shortcut listeners for space, 1, 2, 3, r, and quiz answers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (learningMode === 'flashcard') {
        if (e.code === 'Space') {
          e.preventDefault();
          setIsFlipped(prev => !prev);
          playAudioFeedback('click');
        } else if (e.key === '1') {
          handleRating('again');
        } else if (e.key === '2') {
          handleRating('hard');
        } else if (e.key === '3') {
          handleRating('good');
        } else if (e.key.toLowerCase() === 'r' && currentWord) {
          speakWord(currentWord.word);
        }
      } else if (learningMode === 'quiz') {
        if (!isQuizAnswered) {
          const keyMap: { [k: string]: number } = {
            '1': 0, 'a': 0, 'A': 0,
            '2': 1, 'b': 1, 'B': 1,
            '3': 2, 'c': 2, 'C': 2,
            '4': 3, 'd': 3, 'D': 3,
          };
          if (e.key in keyMap) {
            const idx = keyMap[e.key];
            if (quizOptions[idx]) {
              handleQuizSelect(quizOptions[idx].id);
            }
          }
        } else {
          if (e.key === 'Enter' || e.code === 'Space') {
            e.preventDefault();
            handleRating(selectedAnswer === currentWord.id ? 'good' : 'again');
          }
        }
        if (e.key.toLowerCase() === 'r' && currentWord) {
          speakWord(currentWord.word);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [learningMode, isFlipped, currentWord, isQuizAnswered, quizOptions, selectedAnswer]);

  const progressPercent = Math.round(((currentIndex + 1) / deck.length) * 100);

  if (!currentWord) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Không có thẻ nào trong hàng chờ.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-[64rem] mx-auto px-6 py-8 gap-6">
      {/* Top Bar with Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('trang-chu')}
            className="w-10 h-10 rounded-xl bg-white border border-[#dae2fd] text-slate-600 flex items-center justify-center hover:bg-[#f2f3ff] transition-colors shadow-xs"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wider text-[#3525cd] font-bold">
              Phiên ôn tập chủ động • Oxford 3000™ Tier 3
            </span>
            <h1 className="font-headline text-2xl font-extrabold text-slate-900 tracking-tight">
              Không gian Ôn tập SRS
            </h1>
          </div>
        </div>

        {/* Mode Segmented Controls */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-[#dae2fd] shadow-xs">
          <button
            type="button"
            onClick={() => setLearningMode('flashcard')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              learningMode === 'flashcard'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Flashcard SRS</span>
          </button>

          <button
            type="button"
            onClick={() => setLearningMode('spelling')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              learningMode === 'spelling'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <SpellCheck className="w-3.5 h-3.5" />
            <span>Đánh vần ảnh</span>
          </button>

          <button
            type="button"
            onClick={() => setLearningMode('quiz')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              learningMode === 'quiz'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Trắc nghiệm 4 đáp án</span>
          </button>
        </div>
      </div>

      {/* Active Study Filter Banner (When studying a specific subtopic or unit) */}
      {studyFilter && (
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 p-4 rounded-2xl flex items-center justify-between gap-4 flex-wrap shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3525cd] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-200">
                  {studyFilter.type === 'subtopic' ? 'Chủ đề nhỏ' : 'Unit Oxford'}
                </span>
                {studyFilter.pages && (
                  <span className="text-xs text-slate-500 font-medium">Trang {studyFilter.pages}</span>
                )}
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                  {deck.length} thẻ học
                </span>
              </div>
              <span className="font-headline font-bold text-sm sm:text-base text-slate-900 mt-0.5">
                🎯 {studyFilter.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('tu-vung')}
              className="px-3 py-1.5 rounded-xl bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold border border-slate-200 transition-colors shadow-xs"
            >
              Mục lục từ vựng
            </button>
            {onClearStudyFilter && (
              <button
                type="button"
                onClick={onClearStudyFilter}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-[#3525cd] text-xs font-bold transition-colors"
                title="Học tất cả từ vựng trong kho"
              >
                <X className="w-3.5 h-3.5" />
                <span>Thoát lọc</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Progress & Algorithm Metrics Card */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#dae2fd] shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-2">
            <span>Thẻ {currentIndex + 1} / {deck.length}</span>
            <span className="text-[#3525cd] font-bold">({progressPercent}%)</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500 font-medium">
            <span className="hidden sm:inline">Ước tính: ~{Math.max(1, Math.ceil((deck.length - currentIndex) * 0.4))} phút còn lại</span>
            <span className="text-[#006c49] font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> {consecutiveGood} từ nhớ tốt liên tiếp
            </span>
            <span className="hidden md:inline px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px]">
              Thuật toán: SM-2 SuperMemo
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-[#f2f3ff] rounded-full overflow-hidden">
          <div
            className="bg-[#3525cd] h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* MODE 1: 3D FLIP FLASHCARD */}
      {learningMode === 'flashcard' && (
        <div className="flex flex-col items-center gap-6">
          {/* 3D Flip Card Container */}
          <div className="w-full max-w-2xl h-[28rem] perspective-1000">
            <div
              className={`relative w-full h-full transition-transform duration-500 transform-style-3d cursor-pointer ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              onClick={() => setIsFlipped(prev => !prev)}
            >
              {/* FRONT FACE */}
              <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-3xl border border-[#dae2fd] shadow-md p-8 flex flex-col justify-between overflow-hidden">
                {/* Top Badges */}
                <div className="flex items-center justify-between">
                  <span className="text-xs px-3 py-1 rounded-full bg-[#f2f3ff] text-[#3525cd] font-semibold border border-[#e2e7ff]">
                    {currentWord.topic}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold">
                      SRS Level {currentWord.level}
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-medium">
                      {currentWord.dueText}
                    </span>
                  </div>
                </div>

                {/* Center Visual Clue & English Term */}
                <div className="flex flex-col items-center text-center my-auto gap-4">
                  <div className="relative w-44 h-32 rounded-2xl overflow-hidden shadow-inner border border-slate-200">
                    <img
                      src={currentWord.imageUrl}
                      alt={currentWord.word}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <h2 className="font-headline text-4xl font-extrabold text-[#131b2e] tracking-tight">
                      {currentWord.word}
                    </h2>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWord(currentWord.word);
                      }}
                      className="w-10 h-10 rounded-full bg-indigo-50 text-[#3525cd] flex items-center justify-center hover:bg-[#3525cd] hover:text-white transition-all shadow-xs"
                      title="Phát âm [R]"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  <span className="text-base text-slate-500 font-medium">
                    {currentWord.phonetic} <span className="italic text-slate-400">({currentWord.partOfSpeech})</span>
                  </span>
                </div>

                {/* Bottom Flip Trigger */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    Nhấn thanh Space hoặc bấm thẻ để lật
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFlipped(true);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f2f3ff] text-[#3525cd] font-bold hover:bg-[#eaedff] transition-colors"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Lật thẻ xem định nghĩa [Space]</span>
                  </button>
                </div>
              </div>

              {/* BACK FACE */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white rounded-3xl border border-[#dae2fd] shadow-md p-8 flex flex-col justify-between overflow-y-auto">
                <div className="flex items-center justify-between">
                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-[#006c49] font-bold">
                    Định nghĩa &amp; Cách dùng • {currentWord.partOfSpeech}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakWord(currentWord.word);
                    }}
                    className="flex items-center gap-1 text-xs font-semibold text-[#3525cd] hover:underline"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe lại [R]</span>
                  </button>
                </div>

                {/* Definition Details */}
                <div className="flex flex-col gap-3 my-auto">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-headline text-2xl font-bold text-slate-900">
                      {currentWord.word}
                    </h3>
                    <span className="text-xs text-slate-400">{currentWord.phonetic}</span>
                  </div>

                  <p className="text-lg font-bold text-[#3525cd]">
                    {currentWord.vietnameseMeaning}
                  </p>

                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    {currentWord.englishDefinition}
                  </p>

                  {/* Example sentence */}
                  <div className="p-3.5 bg-[#f2f3ff] rounded-xl border border-[#dae2fd]/80">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Oxford Example Sentence
                    </span>
                    <p className="text-xs font-semibold text-slate-900 leading-relaxed">
                      "{currentWord.exampleSentence}"
                    </p>
                    {currentWord.exampleVietnamese && (
                      <p className="text-[11px] text-slate-500 italic mt-1">
                        "{currentWord.exampleVietnamese}"
                      </p>
                    )}
                  </div>

                  {/* Collocations */}
                  {currentWord.collocations && currentWord.collocations.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] text-slate-400 font-semibold">Cụm từ hay gặp:</span>
                      {currentWord.collocations.map((col, idx) => (
                        <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                          {col}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <span>Bạn nhớ từ này ở mức độ nào?</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFlipped(false);
                    }}
                    className="text-xs text-[#3525cd] font-semibold hover:underline"
                  >
                    Quay lại mặt trước
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SM-2 Rating Controls (3 options matching screenshot) */}
          <div className="w-full max-w-2xl grid grid-cols-3 gap-4">
            {/* 1: Không nhớ */}
            <button
              type="button"
              onClick={() => handleRating('again')}
              className="p-4 rounded-2xl bg-white hover:bg-red-50 border border-[#dae2fd] hover:border-red-200 transition-all flex flex-col items-center text-center group shadow-xs cursor-pointer active:scale-95"
            >
              <span className="font-headline text-sm font-bold text-[#ba1a1a] group-hover:scale-105 transition-transform">
                Không nhớ
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5">
                Reset Level • Ôn ngày mai
              </span>
              <kbd className="mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                Phím 1
              </kbd>
            </button>

            {/* 2: Khó nhớ */}
            <button
              type="button"
              onClick={() => handleRating('hard')}
              className="p-4 rounded-2xl bg-white hover:bg-amber-50 border border-[#dae2fd] hover:border-amber-200 transition-all flex flex-col items-center text-center group shadow-xs cursor-pointer active:scale-95"
            >
              <span className="font-headline text-sm font-bold text-amber-700 group-hover:scale-105 transition-transform">
                Khó nhớ
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5">
                Giữ nhịp • Ôn sau 2 ngày
              </span>
              <kbd className="mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                Phím 2
              </kbd>
            </button>

            {/* 3: Nhớ rõ */}
            <button
              type="button"
              onClick={() => handleRating('good')}
              className="p-4 rounded-2xl bg-[#3525cd] text-white hover:bg-indigo-700 transition-all flex flex-col items-center text-center group shadow-md cursor-pointer active:scale-95"
            >
              <span className="font-headline text-sm font-bold group-hover:scale-105 transition-transform">
                Nhớ rõ
              </span>
              <span className="text-[11px] text-indigo-100 mt-0.5">
                Level +1 • Ôn sau 6 ngày
              </span>
              <kbd className="mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-white/20 text-white border border-white/30">
                Phím 3
              </kbd>
            </button>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-4">
            <span>Phím tắt: Space (Lật thẻ)</span>
            <span>•</span>
            <span>1-3 (Chấm điểm)</span>
            <span>•</span>
            <span>R (Nghe lại)</span>
          </div>
        </div>
      )}

      {/* MODE 2: SPELLING DRILL (ĐÁNH VẦN ẢNH) */}
      {learningMode === 'spelling' && (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-[#dae2fd] shadow-md p-8 flex flex-col items-center gap-6">
          <div className="flex items-center justify-between w-full">
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-[#006c49] font-bold">
              Gợi ý hình ảnh thị giác
            </span>
            <button
              type="button"
              onClick={() => speakWord(currentWord.word)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-[#3525cd] text-xs font-bold hover:bg-indigo-100 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>Phát âm gợi ý</span>
            </button>
          </div>

          <div className="relative w-56 h-36 rounded-2xl overflow-hidden shadow-sm border border-slate-200">
            <img
              src={currentWord.imageUrl}
              alt="Spelling clue"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center">
            <p className="text-base font-bold text-slate-900">
              {currentWord.vietnameseMeaning}
            </p>
            <p className="text-xs text-slate-400 mt-1 italic">
              ({currentWord.partOfSpeech}) • {targetLetters.length} ký tự
            </p>
          </div>

          {/* Letter Slots */}
          <div className="flex items-center gap-2 flex-wrap justify-center my-2">
            {targetLetters.map((_, idx) => {
              const enteredChar = spellingInput[idx];
              const isFilled = enteredChar !== undefined;
              return (
                <div
                  key={idx}
                  className={`w-10 h-12 rounded-xl flex items-center justify-center font-headline text-xl font-bold border-2 transition-all ${
                    spellingStatus === 'correct'
                      ? 'bg-emerald-50 border-[#006c49] text-[#006c49]'
                      : spellingStatus === 'wrong'
                      ? 'bg-red-50 border-red-500 text-red-600 animate-shake'
                      : isFilled
                      ? 'bg-indigo-50 border-[#3525cd] text-[#3525cd]'
                      : 'bg-[#f2f3ff] border-slate-200 text-slate-300'
                  }`}
                >
                  {enteredChar || ''}
                </div>
              );
            })}
          </div>

          {spellingStatus === 'correct' && (
            <div className="flex items-center gap-2 text-sm font-bold text-[#006c49] animate-bounce">
              <CheckCircle2 className="w-5 h-5" />
              <span>Chính xác! Chuẩn bị chuyển thẻ tiếp theo...</span>
            </div>
          )}

          {spellingStatus === 'wrong' && (
            <div className="flex items-center gap-2 text-sm font-bold text-red-600">
              <AlertCircle className="w-5 h-5" />
              <span>Chưa chính xác. Thử lại hoặc dùng gợi ý!</span>
            </div>
          )}

          {/* Virtual Keyboard and Action Controls */}
          <div className="flex flex-col items-center gap-3 w-full">
            {/* Action Bar */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleHint}
                className="px-4 py-2 rounded-xl bg-[#f2f3ff] text-slate-700 text-xs font-semibold hover:bg-[#eaedff] transition-colors flex items-center gap-1.5"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>Gợi ý 1 chữ</span>
              </button>
              <button
                type="button"
                onClick={handleBackspace}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                Xoá ký tự
              </button>
              <button
                type="button"
                onClick={() => setSpellingInput([])}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Làm lại</span>
              </button>
            </div>

            {/* Quick Virtual Letter Buttons */}
            <div className="flex flex-wrap justify-center gap-1.5 max-w-md pt-2">
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                <button
                  key={letter}
                  type="button"
                  onClick={() => handleVirtualLetter(letter)}
                  className="w-8 h-8 rounded-lg bg-[#f2f3ff] hover:bg-[#3525cd] hover:text-white font-bold text-xs text-slate-800 transition-colors active:scale-95"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: 4-CHOICE QUIZ (TRẮC NGHIỆM 4 ĐÁP ÁN) */}
      {learningMode === 'quiz' && (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-[#dae2fd] shadow-md p-6 sm:p-8 flex flex-col gap-6">
          {/* Quiz Header & Direction Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Trắc nghiệm phản xạ • Câu {currentIndex + 1}/{deck.length}</span>
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                {currentWord.subtopic || currentWord.topic}
              </span>
            </div>

            {/* Direction toggles to prevent guessing by pattern */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setQuizDirection('auto')}
                title="Tự động xen kẽ giữa Anh-Việt và Việt-Anh"
                className={`px-2 py-1 rounded-lg transition-all ${
                  quizDirection === 'auto'
                    ? 'bg-white text-[#3525cd] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🔀 Xen kẽ
              </button>
              <button
                type="button"
                onClick={() => setQuizDirection('vi_to_en')}
                title="Cho nghĩa tiếng Việt, chọn từ tiếng Anh"
                className={`px-2 py-1 rounded-lg transition-all ${
                  quizDirection === 'vi_to_en'
                    ? 'bg-white text-[#3525cd] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇻🇳➔🇬🇧 Nghĩa
              </button>
              <button
                type="button"
                onClick={() => setQuizDirection('en_to_vi')}
                title="Cho từ tiếng Anh, chọn nghĩa tiếng Việt"
                className={`px-2 py-1 rounded-lg transition-all ${
                  quizDirection === 'en_to_vi'
                    ? 'bg-white text-[#3525cd] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇬🇧➔🇻🇳 Từ
              </button>
            </div>
          </div>

          {/* Question Prompt Card */}
          <div className="flex flex-col gap-2.5 p-5 bg-[#f2f3ff] rounded-2xl border border-[#dae2fd]/80">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                {isViToEn 
                  ? 'Chọn từ vựng tiếng Anh phù hợp với định nghĩa:' 
                  : 'Chọn nghĩa tiếng Việt chính xác của từ vựng:'}
              </span>
              <button
                type="button"
                onClick={() => speakWord(currentWord.word)}
                className="flex items-center gap-1 text-xs font-semibold text-[#3525cd] hover:text-indigo-800 transition-colors cursor-pointer"
                title="Nghe phát âm chuẩn (Phím R)"
              >
                <Volume2 className="w-4 h-4" />
                <span>Phát âm (R)</span>
              </button>
            </div>

            {isViToEn ? (
              <>
                <h3 className="font-headline text-2xl font-bold text-slate-900 leading-snug">
                  "{currentWord.vietnameseMeaning}"
                </h3>
                {maskedExampleSentence && (
                  <p className="text-xs text-slate-600 italic bg-white/70 p-2.5 rounded-xl border border-indigo-100/60 mt-1">
                    <span className="font-semibold text-slate-500 not-italic">Ngữ cảnh: </span>
                    "{maskedExampleSentence}"
                  </p>
                )}
              </>
            ) : (
              <>
                <div className="flex items-baseline gap-3">
                  <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-[#3525cd]">
                    {currentWord.word}
                  </h3>
                  <span className="text-sm text-slate-500 font-mono">
                    /{currentWord.phonetic}/
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-semibold">
                    {currentWord.partOfSpeech}
                  </span>
                </div>
                {currentWord.exampleSentence && (
                  <p className="text-xs text-slate-600 italic bg-white/70 p-2.5 rounded-xl border border-indigo-100/60 mt-1">
                    <span className="font-semibold text-slate-500 not-italic">Ví dụ: </span>
                    "{currentWord.exampleSentence}"
                  </p>
                )}
              </>
            )}
          </div>

          {/* 4 Choices Grid with Keyboard Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {quizOptions.map((opt, idx) => {
              const isSelected = selectedAnswer === opt.id;
              const isCorrect = opt.id === currentWord.id;

              let btnClass = 'bg-white hover:bg-[#f2f3ff] border-[#dae2fd] text-slate-900 hover:border-indigo-300';
              let badgeClass = 'bg-slate-100 text-slate-600';

              if (isQuizAnswered) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-50 border-[#006c49] text-[#006c49] font-bold ring-2 ring-emerald-500/20';
                  badgeClass = 'bg-[#006c49] text-white';
                } else if (isSelected) {
                  btnClass = 'bg-red-50 border-red-500 text-red-700 font-bold';
                  badgeClass = 'bg-red-600 text-white';
                } else {
                  btnClass = 'bg-slate-50 border-slate-200 text-slate-500 opacity-70';
                  badgeClass = 'bg-slate-200 text-slate-600';
                }
              }

              const keyLetter = String.fromCharCode(65 + idx);

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isQuizAnswered}
                  onClick={() => handleQuizSelect(opt.id)}
                  className={`p-4 rounded-2xl border text-left flex items-start justify-between transition-all shadow-xs cursor-pointer active:scale-98 ${btnClass}`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${badgeClass}`}>
                      {keyLetter}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      {isViToEn ? (
                        <>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-headline text-base font-bold text-inherit">
                              {opt.word}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              /{opt.phonetic}/
                            </span>
                          </div>
                          {/* Reveal meaning on answer to deepen understanding */}
                          {isQuizAnswered && (
                            <span className="text-xs text-slate-600 mt-0.5 font-medium animate-in fade-in">
                              = {opt.vietnameseMeaning}
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          <span className="font-headline text-sm font-semibold text-inherit">
                            {opt.vietnameseMeaning}
                          </span>
                          {/* Reveal English word and phonetic on answer */}
                          {isQuizAnswered && (
                            <span className="text-[11px] text-slate-500 mt-0.5 font-mono animate-in fade-in">
                              {opt.word} /{opt.phonetic}/
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {isQuizAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-[#006c49] shrink-0 mt-1" />
                  )}
                  {isQuizAnswered && isSelected && !isCorrect && (
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Detailed Explanation */}
          {isQuizAnswered && (
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
              <div className={`p-4 rounded-2xl border flex items-start justify-between gap-4 ${
                selectedAnswer === currentWord.id 
                  ? 'bg-emerald-50/80 border-emerald-200' 
                  : 'bg-amber-50/80 border-amber-200'
              }`}>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    {selectedAnswer === currentWord.id ? (
                      <span className="text-xs font-bold text-[#006c49] flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Chính xác! (+1 Level SRS)
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-red-700 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        Chưa chính xác! (Đặt lại Level 1)
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-900 font-bold">{currentWord.word}</strong> /{currentWord.phonetic}/ ({currentWord.partOfSpeech}): {currentWord.vietnameseMeaning}
                  </p>
                  {currentWord.exampleVietnamese && (
                    <p className="text-[11px] text-slate-500 italic mt-0.5">
                      Dịch nghĩa ví dụ: "{currentWord.exampleVietnamese}"
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleRating(selectedAnswer === currentWord.id ? 'good' : 'again')}
                  className="px-5 py-2.5 bg-[#3525cd] text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-xs shrink-0 active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Câu tiếp theo</span>
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">Enter ↵</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                <span>Phím tắt: 1-4 hoặc A-D để chọn đáp án</span>
                <span>Enter / Space: Tiếp tục</span>
                <span>R: Nghe lại phát âm</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
