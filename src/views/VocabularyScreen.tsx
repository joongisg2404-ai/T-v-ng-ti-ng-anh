import React, { useState, useMemo } from 'react';
import { VocabWord, NavigationTab, OxfordUnit, OxfordSubtopic } from '../types';
import { OXFORD_UNITS, getWordsForUnit, getWordsForSubtopic } from '../data/mockWords';
import { generateSampleWordsForSubtopic } from '../data/oxfordSampleGenerator';
import { OPD_CLASSROOM_SCENE_IMAGE } from '../data/classroomWords';
import { OPD_PERSONAL_INFO_SCENE_IMAGE } from '../data/personalInfoWords';
import { OPD_SCHOOL_SCENE_IMAGE } from '../data/schoolWords';
import { OPD_STUDYING_SCENE_IMAGE } from '../data/studyingWords';
import { SubtopicStudySession } from '../components/SubtopicStudySession';
import { speakWord } from '../utils/audio';
import { 
  Download, 
  Upload, 
  Plus, 
  Search, 
  Volume2, 
  Play, 
  CheckCircle2, 
  Layers, 
  Clock, 
  Sparkles, 
  Lightbulb, 
  Trash2,
  Filter,
  ChevronRight,
  ArrowLeft,
  BookOpen,
  FolderTree,
  LayoutGrid,
  BookMarked,
  GraduationCap,
  Maximize2,
  Eye,
  Image as ImageIcon
} from 'lucide-react';

interface VocabularyScreenProps {
  words: VocabWord[];
  onAddWordClick: (defaultUnitId?: string, defaultSubtopicId?: string) => void;
  onExportJSON: () => void;
  onImportJSONClick: () => void;
  onReviewWord: (wordId: string) => void;
  onDeleteWord: (wordId: string) => void;
  onNavigate: (tab: NavigationTab) => void;
  onShowToast: (msg: string) => void;
  onOpenOxfordBook?: () => void;
  onStartStudySubtopic: (subtopic: OxfordSubtopic, unit: OxfordUnit) => void;
  onStartStudyUnit: (unit: OxfordUnit) => void;
  onAddBatchWords?: (newWords: VocabWord[]) => void;
  onUpdateWordLevel?: (wordId: string, rating: 'again' | 'hard' | 'good') => void;
}

export const VocabularyScreen: React.FC<VocabularyScreenProps> = ({
  words,
  onAddWordClick,
  onExportJSON,
  onImportJSONClick,
  onReviewWord,
  onDeleteWord,
  onNavigate,
  onShowToast,
  onOpenOxfordBook,
  onStartStudySubtopic,
  onStartStudyUnit,
  onAddBatchWords,
  onUpdateWordLevel,
}) => {
  // Navigation hierarchy states
  // null = Level 1 (Show Major Units)
  // string = Level 2 (Show Subtopics in that Unit)
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  // null = Level 2, string = Level 3 (Show detail of subtopic with word cards)
  const [selectedSubtopicId, setSelectedSubtopicId] = useState<string | null>(null);

  // Dedicated Sequential Subtopic Mastery Session (User request: Flashcard -> Spelling -> Shuffle & Spelling again)
  const [activeStudySubtopic, setActiveStudySubtopic] = useState<{
    subtopic: OxfordSubtopic;
    unit: OxfordUnit;
  } | null>(null);

  const handleStartSequentialSubtopicStudy = (subtopic: OxfordSubtopic, unit: OxfordUnit) => {
    let targetWords = getWordsForSubtopic(subtopic, unit, words);
    if (targetWords.length === 0) {
      const samples = generateSampleWordsForSubtopic(subtopic, unit);
      if (samples.length > 0 && onAddBatchWords) {
        onAddBatchWords(samples);
        targetWords = samples;
      }
    }
    setActiveStudySubtopic({ subtopic, unit });
    onShowToast(`🎯 Bắt đầu học toàn bộ từ vựng: ${subtopic.englishTitle} (${subtopic.vietnameseTitle})`);
  };

  // View modes: 'hierarchy' (default requested by user) or 'flat' (flat search across all words)
  const [viewMode, setViewMode] = useState<'hierarchy' | 'flat'>('hierarchy');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'az' | 'level' | 'due'>('default');
  const [showClassroomPosterModal, setShowClassroomPosterModal] = useState(false);
  const [showPersonalInfoPosterModal, setShowPersonalInfoPosterModal] = useState(false);
  const [showSchoolPosterModal, setShowSchoolPosterModal] = useState(false);
  const [showStudyingPosterModal, setShowStudyingPosterModal] = useState(false);

  // Currently selected Unit & Subtopic objects
  const currentUnit = useMemo(() => {
    if (!selectedUnitId) return null;
    return OXFORD_UNITS.find(u => u.id === selectedUnitId) || null;
  }, [selectedUnitId]);

  const currentSubtopic = useMemo(() => {
    if (!currentUnit || !selectedSubtopicId) return null;
    return currentUnit.subtopics.find(s => s.id === selectedSubtopicId) || null;
  }, [currentUnit, selectedSubtopicId]);

  // Words for current unit and subtopic
  const unitWords = useMemo(() => {
    if (!currentUnit) return [];
    return getWordsForUnit(currentUnit, words);
  }, [currentUnit, words]);

  const subtopicWords = useMemo(() => {
    if (!currentUnit || !currentSubtopic) return [];
    return getWordsForSubtopic(currentSubtopic, currentUnit, words);
  }, [currentUnit, currentSubtopic, words]);

  // Filtered words for flat view or subtopic view
  const displayWords = useMemo(() => {
    let source = words;
    if (viewMode === 'hierarchy') {
      if (currentSubtopic && currentUnit) {
        source = subtopicWords;
      } else if (currentUnit) {
        source = unitWords;
      }
    }

    return source.filter((w) => {
      // Level filter
      if (selectedLevel !== 'all') {
        const lvlNum = parseInt(selectedLevel, 10);
        if (w.level !== lvlNum) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          w.word.toLowerCase().includes(q) ||
          w.vietnameseMeaning.toLowerCase().includes(q) ||
          w.phonetic.toLowerCase().includes(q) ||
          w.exampleSentence.toLowerCase().includes(q) ||
          w.topic.toLowerCase().includes(q) ||
          (w.subtopic && w.subtopic.toLowerCase().includes(q));
        if (!match) return false;
      }

      return true;
    });
  }, [words, viewMode, currentUnit, currentSubtopic, subtopicWords, unitWords, selectedLevel, searchQuery]);

  // Sorted words
  const sortedWords = useMemo(() => {
    return [...displayWords].sort((a, b) => {
      if (sortBy === 'az') return a.word.localeCompare(b.word);
      if (sortBy === 'level') return b.level - a.level;
      if (sortBy === 'due') {
        if (a.dueStatus === 'overdue') return -1;
        if (b.dueStatus === 'overdue') return 1;
        return 0;
      }
      return 0;
    });
  }, [displayWords, sortBy]);

  // Overall dynamic stats
  const dueCount = words.filter(w => w.dueStatus === 'due_today' || w.dueStatus === 'overdue').length;
  const masteredCount = words.filter(w => w.level >= 5).length;
  const newCardsCount = words.filter(w => w.level === 0).length;

  const handleSpeak = (w: VocabWord) => {
    speakWord(w.word);
    onShowToast(`Đang phát âm: /${w.word.toLowerCase()}/`);
  };

  // Quick action to add sample Oxford words if a subtopic has 0 words
  const handleAddSampleWords = (subtopic: OxfordSubtopic, unit: OxfordUnit) => {
    const samples = generateSampleWordsForSubtopic(subtopic, unit);
    if (onAddBatchWords) {
      onAddBatchWords(samples);
      onShowToast(`Đã nạp ${samples.length} từ vựng mẫu Oxford vào mục "${subtopic.englishTitle}"!`);
    } else {
      onShowToast(`Đã chuẩn bị sẵn từ vựng cho chủ đề!`);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[75rem] mx-auto px-6 lg:px-8 py-8 gap-8">
      {/* Top Header with Title and Global Action Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full">
              The Oxford Picture Dictionary (Bilingual)
            </span>
            <span className="text-xs text-slate-500 font-medium">12 Units • 168 Chủ Đề Nhỏ</span>
          </div>
          <h1 className="font-headline text-3xl font-extrabold text-[#131b2e] tracking-tight mt-1">
            Kho từ vựng chuyên đề
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Khám phá theo các chủ đề lớn, truy cập cụ thể từng chủ đề nhỏ trong sách và bắt đầu học tập ngay với hệ thống lặp lại ngắt quãng (SRS).
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Toggle between Hierarchy and Flat View */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('hierarchy')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'hierarchy'
                  ? 'bg-white text-[#3525cd] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FolderTree className="w-3.5 h-3.5" />
              <span>Theo Chủ đề sách</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('flat')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'flat'
                  ? 'bg-white text-[#3525cd] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Xem tất cả ({words.length})</span>
            </button>
          </div>

          {onOpenOxfordBook && (
            <button
              type="button"
              onClick={onOpenOxfordBook}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100 border border-indigo-200 transition-colors shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Mục lục Sách Oxford</span>
            </button>
          )}

          <button
            type="button"
            onClick={onExportJSON}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-slate-800 text-xs font-semibold hover:bg-slate-50 border border-slate-200 transition-colors shadow-xs"
          >
            <Download className="w-4 h-4 text-indigo-600" />
            <span>Xuất JSON</span>
          </button>

          <button
            type="button"
            onClick={onImportJSONClick}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-slate-800 text-xs font-semibold hover:bg-slate-50 border border-slate-200 transition-colors shadow-xs"
          >
            <Upload className="w-4 h-4 text-emerald-600" />
            <span>Nhập</span>
          </button>

          <button
            type="button"
            onClick={() => onAddWordClick(selectedUnitId || undefined, selectedSubtopicId || undefined)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3525cd] text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-xs active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ Thêm từ</span>
          </button>
        </div>
      </div>

      {/* Global Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#dae2fd] shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium">Tổng thẻ từ lưu trữ</span>
            <span className="font-headline text-2xl font-bold text-slate-900 mt-0.5">{words.length}</span>
            <span className="text-[11px] text-indigo-700 font-semibold mt-1 flex items-center gap-1">
              12 Units Oxford
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#dae2fd] shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium">Đến hạn ôn hôm nay</span>
            <span className="font-headline text-2xl font-bold text-indigo-700 mt-0.5">{dueCount}</span>
            <span className="text-[11px] text-red-600 font-semibold mt-1">
              {dueCount > 0 ? 'Cần ôn ngay' : 'Đã hoàn thành'}
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#dae2fd] shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium">Chủ đề chi tiết</span>
            <span className="font-headline text-2xl font-bold text-[#006c49] mt-0.5">168</span>
            <span className="text-[11px] text-slate-500 font-medium mt-1">
              Chia nhỏ theo trang sách
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#006c49] flex items-center justify-center">
            <BookMarked className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#dae2fd] shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium">Cấp 5 (Thành thạo)</span>
            <span className="font-headline text-2xl font-bold text-amber-700 mt-0.5">{masteredCount}</span>
            <span className="text-[11px] text-slate-400 font-medium mt-1">
              {words.length > 0 ? Math.round((masteredCount / words.length) * 100) : 0}% kho từ
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Breadcrumbs Navigation Bar (When inside a Unit or Subtopic) */}
      {viewMode === 'hierarchy' && (selectedUnitId || selectedSubtopicId) && (
        <nav className="flex items-center justify-between bg-white px-5 py-3.5 rounded-2xl border border-[#dae2fd] shadow-xs flex-wrap gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold flex-wrap">
            {/* Level 1 Button */}
            <button
              type="button"
              onClick={() => {
                setSelectedUnitId(null);
                setSelectedSubtopicId(null);
              }}
              className="text-slate-600 hover:text-[#3525cd] flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Kho từ vựng (12 Chủ đề lớn)</span>
            </button>

            {currentUnit && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setSelectedSubtopicId(null)}
                  className={`flex items-center gap-1 transition-colors ${
                    !selectedSubtopicId
                      ? 'text-[#3525cd] font-bold'
                      : 'text-slate-600 hover:text-[#3525cd]'
                  }`}
                >
                  <span>Unit {currentUnit.unitNumber}: {currentUnit.name}</span>
                </button>
              </>
            )}

            {currentSubtopic && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[#3525cd] font-bold">
                  Mục {currentSubtopic.subtopicNumber}: {currentSubtopic.englishTitle} ({currentSubtopic.vietnameseTitle})
                </span>
              </>
            )}
          </div>

          {/* Quick Back Button */}
          <button
            type="button"
            onClick={() => {
              if (selectedSubtopicId) {
                setSelectedSubtopicId(null);
              } else {
                setSelectedUnitId(null);
              }
            }}
            className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#3525cd] bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{selectedSubtopicId ? 'Quay lại danh sách mục nhỏ' : 'Quay lại 12 chủ đề lớn'}</span>
          </button>
        </nav>
      )}

      {/* ========================================================================= */}
      {/* LEVEL 1: SHOW 12 MAJOR TOPICS (KHI BẤM VÀO KHO TỪ VỰNG SẼ HIỆN CÁC CHỦ ĐỀ LỚN) */}
      {/* ========================================================================= */}
      {viewMode === 'hierarchy' && !selectedUnitId && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-headline text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                <BookOpen className="w-6 h-6 text-[#3525cd]" />
                <span>12 Chủ đề lớn (Major Units) theo Sách Oxford</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Nhấp vào từng chủ đề lớn bên dưới để xem toàn bộ các chủ đề nhỏ cụ thể kỹ lưỡng đúng như mục lục sách và bắt đầu học tập.
              </p>
            </div>

            {/* Quick search input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm chủ đề, từ vựng..."
                className="w-full bg-white border border-[#dae2fd] rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
              />
            </div>
          </div>

          {/* Grid of 12 Major Units */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {OXFORD_UNITS.filter(u => {
              if (!searchQuery.trim()) return true;
              const q = searchQuery.toLowerCase();
              return (
                u.name.toLowerCase().includes(q) ||
                u.vietnameseName.toLowerCase().includes(q) ||
                u.subtopics.some(s => s.englishTitle.toLowerCase().includes(q) || s.vietnameseTitle.toLowerCase().includes(q))
              );
            }).map((unit) => {
              const countInUnit = getWordsForUnit(unit, words).length;
              return (
                <div
                  key={unit.id}
                  className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-xs hover:shadow-md hover:border-[#3525cd] transition-all flex flex-col justify-between gap-4 group cursor-pointer"
                  onClick={() => setSelectedUnitId(unit.id)}
                >
                  <div className="flex flex-col gap-2">
                    {/* Unit header badges */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-indigo-50 text-[#3525cd] border border-indigo-100">
                        Unit {unit.unitNumber}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Trang {unit.pages}
                      </span>
                    </div>

                    {/* Unit Titles */}
                    <h3 className="font-headline text-xl font-bold text-slate-900 group-hover:text-[#3525cd] transition-colors mt-1">
                      {unit.name}
                    </h3>
                    <p className="text-sm font-semibold text-emerald-700">
                      {unit.vietnameseName}
                    </p>

                    {/* Stats Pill */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1 font-medium bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                        <FolderTree className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{unit.subtopics.length} chủ đề nhỏ</span>
                      </span>
                      <span className="flex items-center gap-1 font-medium bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                        <Layers className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{countInUnit} thẻ từ</span>
                      </span>
                    </div>

                    {/* Preview of first 3-4 subtopics */}
                    <div className="mt-2 pt-3 border-t border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                        Bao gồm các mục nhỏ:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {unit.subtopics.slice(0, 3).map((sub) => (
                          <span
                            key={sub.id}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-[#f2f3ff] text-slate-700 font-medium"
                          >
                            {sub.subtopicNumber}. {sub.englishTitle}
                          </span>
                        ))}
                        {unit.subtopics.length > 3 && (
                          <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 font-medium">
                            +{unit.subtopics.length - 3} mục nhỏ khác
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => setSelectedUnitId(unit.id)}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-50 hover:bg-[#3525cd] hover:text-white text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1 border border-slate-200 hover:border-transparent"
                    >
                      <span>Xem {unit.subtopics.length} mục nhỏ</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onStartStudyUnit(unit)}
                      className="py-2 px-3.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-[#3525cd] text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-indigo-200"
                      title="Học toàn bộ từ vựng trong Unit này"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Học Unit</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ====================================================================================== */}
      {/* LEVEL 2: TRONG CHỦ ĐỀ LỚN: HIỆN CÁC CHỦ ĐỀ NHỎ (MỤC LỤC KỸ NHƯ TRONG SÁCH OXFORD) */}
      {/* ====================================================================================== */}
      {viewMode === 'hierarchy' && currentUnit && !selectedSubtopicId && (
        <div className="flex flex-col gap-6">
          {/* Unit Header Banner */}
          <div className="bg-gradient-to-r from-[#1e1b4b] to-[#312e81] text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 shadow-xs">
                <BookOpen className="w-7 h-7 text-indigo-300" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-200 bg-white/10 px-2.5 py-0.5 rounded-md">
                    Unit {currentUnit.unitNumber} • Trang {currentUnit.pages}
                  </span>
                  <span className="text-xs text-indigo-200 font-medium">
                    {currentUnit.subtopics.length} chủ đề nhỏ
                  </span>
                </div>
                <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {currentUnit.name}
                </h2>
                <p className="text-sm font-semibold text-emerald-300 mt-0.5">
                  {currentUnit.vietnameseName}
                </p>
                <p className="text-xs text-indigo-100/80 mt-1">
                  Mục lục chi tiết từng bài học trong sách The Oxford Picture Dictionary. Bấm vào bất kỳ mục nhỏ nào bên dưới để bắt đầu học tập ngay.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
              <button
                type="button"
                onClick={() => onStartStudyUnit(currentUnit)}
                className="px-5 py-2.5 rounded-xl bg-white text-[#312e81] text-xs font-bold hover:bg-slate-100 transition-all flex items-center gap-1.5 shadow-xs"
              >
                <Play className="w-4 h-4 fill-current text-[#3525cd]" />
                <span>Học toàn bộ Unit ({unitWords.length} từ)</span>
              </button>
              <button
                type="button"
                onClick={() => onAddWordClick(currentUnit.id)}
                className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold transition-all flex items-center gap-1.5 border border-white/20"
              >
                <Plus className="w-4 h-4" />
                <span>+ Thêm từ vào Unit</span>
              </button>
            </div>
          </div>

          {/* Subtopics List Header */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-headline text-xl font-bold text-slate-900 flex items-center gap-2">
                <FolderTree className="w-5 h-5 text-[#3525cd]" />
                <span>Các chủ đề nhỏ trong Unit {currentUnit.unitNumber} ({currentUnit.subtopics.length} mục)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Mỗi mục nhỏ tương ứng với 1–2 trang ảnh minh họa chi tiết trong sách. Bấm vào nút <strong>"Học tập chủ đề này"</strong> để bắt đầu phiên Flashcard &amp; SRS ngay.
              </p>
            </div>
          </div>

          {/* Grid of Subtopics (Chủ đề nhỏ) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentUnit.subtopics.map((subtopic) => {
              const wordsInSub = getWordsForSubtopic(subtopic, currentUnit, words);
              const hasWords = wordsInSub.length > 0;

              return (
                <div
                  key={subtopic.id}
                  className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-xs hover:border-[#3525cd] hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
                >
                  <div className="flex flex-col gap-2">
                    {/* Top row: Number and Page */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-[#3525cd] bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                        Mục {subtopic.subtopicNumber}
                      </span>
                      <span className="text-slate-400 font-medium text-[11px]">
                        Trang {subtopic.pages}
                      </span>
                    </div>

                    {/* Subtopic Titles */}
                    <div>
                      <h4 className="font-headline text-lg font-bold text-slate-900 group-hover:text-[#3525cd] transition-colors leading-snug">
                        {subtopic.englishTitle}
                      </h4>
                      <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                        {subtopic.vietnameseTitle}
                      </p>
                    </div>

                    {/* Word count info */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1 font-medium bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 text-[11px]">
                        <Layers className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{hasWords ? `${wordsInSub.length} thẻ từ đã lưu` : 'Chưa có từ riêng'}</span>
                      </span>
                      {hasWords && (
                        <span className="text-[11px] text-emerald-600 font-semibold">
                          Sẵn sàng học
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ACTION BUTTONS: PRIMARY STUDY BUTTON AND VIEW WORDS BUTTON */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                    {/* USER REQUIREMENT: Nút học tập chủ đề đó */}
                    <button
                      type="button"
                      onClick={() => handleStartSequentialSubtopicStudy(subtopic, currentUnit)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#3525cd] hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>🎯 Bắt đầu học toàn bộ từ vựng ({wordsInSub.length} từ)</span>
                    </button>

                    {/* Secondary: View details and words */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedSubtopicId(subtopic.id)}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors text-center"
                      >
                        Xem từ vựng ({wordsInSub.length})
                      </button>

                      <button
                        type="button"
                        onClick={() => onAddWordClick(currentUnit.id, subtopic.id)}
                        className="py-1.5 px-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-indigo-700 text-xs font-bold border border-slate-200 transition-colors"
                        title="Thêm từ mới vào chủ đề này"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ====================================================================================== */}
      {/* LEVEL 3: BẤM VÀO TỪNG CHỦ ĐỀ NHỎ: HIỆN NÚT HỌC TẬP CHỦ ĐỀ ĐÓ & DANH SÁCH TỪ VỰNG CHI TIẾT */}
      {/* ====================================================================================== */}
      {viewMode === 'hierarchy' && currentUnit && currentSubtopic && (
        <div className="flex flex-col gap-6">
          {/* Subtopic Hero Banner with BIG STUDY BUTTON */}
          <div className="bg-white p-6 rounded-2xl border border-[#dae2fd] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-[#3525cd] flex items-center justify-center shrink-0 border border-indigo-100 shadow-xs font-extrabold text-lg">
                #{currentSubtopic.subtopicNumber}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-md">
                    Unit {currentUnit.unitNumber}: {currentUnit.name}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Trang sách {currentSubtopic.pages}
                  </span>
                </div>
                <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {currentSubtopic.englishTitle}
                </h2>
                <p className="text-sm font-bold text-emerald-700 mt-0.5">
                  {currentSubtopic.vietnameseTitle}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Chủ đề nhỏ #{currentSubtopic.subtopicNumber} trong sách Oxford. Có {subtopicWords.length} thẻ từ vựng được liên kết với chủ đề này.
                </p>
              </div>
            </div>

            {/* ACTION BUTTONS: USER REQUIREMENT - NÚT BẮT ĐẦU HỌC TOÀN BỘ TỪ VỰNG NHÓM NHỎ */}
            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <button
                type="button"
                onClick={() => handleStartSequentialSubtopicStudy(currentSubtopic, currentUnit)}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#3525cd] to-indigo-600 hover:from-indigo-700 hover:to-indigo-800 text-white text-sm font-extrabold transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center gap-3 active:scale-95 group"
              >
                <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <span className="block leading-tight">🎯 BẮT ĐẦU HỌC TOÀN BỘ TỪ VỰNG NHÓM NHỎ</span>
                  <span className="text-[10px] font-medium text-indigo-200 block">
                    {subtopicWords.length} từ • 3 bước: Thẻ Flashcard ➔ Đánh vần ➔ Đảo lộn đánh vần lại
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleAddSampleWords(currentSubtopic, currentUnit)}
                className="px-4 py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all border border-indigo-200 flex items-center gap-1.5"
                title="Nạp nhanh từ vựng mẫu Oxford vào chủ đề này"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Nạp từ mẫu</span>
              </button>

              <button
                type="button"
                onClick={() => onAddWordClick(currentUnit.id, currentSubtopic.id)}
                className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>+ Thêm từ</span>
              </button>
            </div>
          </div>

          {/* OPD CLASSROOM MASTER ILLUSTRATION BANNER (For Unit 1, Lesson 1: A Classroom) */}
          {currentSubtopic.id === 'sub-1-1' && (
            <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl overflow-hidden shadow-lg border border-indigo-500/20 text-white">
              <div className="flex flex-col lg:flex-row items-stretch">
                {/* Left side: Image preview */}
                <div 
                  className="lg:w-1/2 relative min-h-[260px] cursor-pointer group overflow-hidden bg-slate-950"
                  onClick={() => setShowClassroomPosterModal(true)}
                  title="Nhấp để phóng to toàn bộ tranh minh họa lớp học"
                >
                  <img
                    src={OPD_CLASSROOM_SCENE_IMAGE}
                    alt="Tranh minh họa gốc The Oxford Picture Dictionary - A Classroom"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Floating Action Button to Enlarge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 font-medium flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Tranh minh họa tổng thể: A Classroom (Trang 2–3)</span>
                    </span>

                    <span className="text-xs bg-white text-slate-900 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-md group-hover:bg-indigo-100 transition-colors">
                      <Maximize2 className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Phóng to</span>
                    </span>
                  </div>
                </div>

                {/* Right side: Educational context and quick navigation */}
                <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 px-2.5 py-1 rounded-full">
                        Oxford Picture Dictionary Visual
                      </span>
                      <span className="text-xs text-indigo-300">
                        39 Mục Từ Vựng Trực Quan
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold font-headline mt-2 text-white">
                      Tranh minh họa chuẩn: 1 A Classroom
                    </h3>
                    <p className="text-sm text-indigo-100/90 mt-2 leading-relaxed">
                      Mỗi từ vựng trong danh mục bên dưới đều được gán ảnh minh họa chính xác tương ứng: máy chiếu lên tường (overhead projector), máy phát băng cát-sét (cassette player), tập sách 3 lỗ (binder/notebook), bảng viết phấn, bàn ghế, gôm tẩy và các hành động trong lớp học.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-4 border-t border-white/10 text-xs">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/10">
                      <span className="text-indigo-300 block text-[10px] font-medium uppercase">Trang sách</span>
                      <span className="font-bold text-white text-sm">Trang 2 – 3</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/10">
                      <span className="text-indigo-300 block text-[10px] font-medium uppercase">Học cụ &amp; Thiết bị</span>
                      <span className="font-bold text-emerald-300 text-sm">39 Từ vựng</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/10 col-span-2 sm:col-span-1">
                      <span className="text-indigo-300 block text-[10px] font-medium uppercase">Phương pháp</span>
                      <span className="font-bold text-amber-300 text-sm">SRS + Hình ảnh</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShowClassroomPosterModal(true)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Xem tranh minh họa lớp học</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onStartStudySubtopic(currentSubtopic, currentUnit)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[#3525cd] hover:bg-indigo-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Luyện tập Flashcard SRS</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ZOOM MODAL FOR CLASSROOM POSTER */}
          {showClassroomPosterModal && (
            <div 
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
              onClick={() => setShowClassroomPosterModal(false)}
            >
              <div 
                className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-[#3525cd] flex items-center justify-center font-bold">
                      #1
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-slate-900 text-base">
                        The Oxford Picture Dictionary: Lesson 1 - A Classroom (Trang 2-3)
                      </h4>
                      <p className="text-xs text-slate-500">
                        39 từ vựng song ngữ Anh - Việt minh họa chi tiết từng vật dụng, dụng cụ và hành động trong lớp học
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowClassroomPosterModal(false)}
                    className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="overflow-auto p-4 flex items-center justify-center bg-slate-950 min-h-[350px]">
                  <img
                    src={OPD_CLASSROOM_SCENE_IMAGE}
                    alt="Oxford Picture Dictionary - A Classroom Poster"
                    className="max-h-[70vh] w-auto object-contain rounded-xl shadow-lg"
                  />
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                  <div className="text-xs text-slate-500">
                    💡 <em>Bạn có thể xem từng thẻ từ riêng biệt tương ứng với từng hình minh họa bên dưới.</em>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowClassroomPosterModal(false)}
                    className="px-5 py-2 rounded-xl bg-[#3525cd] text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-xs"
                  >
                    Đóng cửa sổ
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* OPD PERSONAL INFORMATION MASTER BANNER (For Unit 1, Lesson 2: Personal Information - Lý Lịch) */}
          {currentSubtopic.id === 'sub-1-2' && (
            <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 rounded-3xl overflow-hidden shadow-lg border border-emerald-500/20 text-white">
              <div className="flex flex-col lg:flex-row items-stretch">
                {/* Left side: Image preview */}
                <div 
                  className="lg:w-1/2 relative min-h-[260px] cursor-pointer group overflow-hidden bg-slate-950"
                  onClick={() => setShowPersonalInfoPosterModal(true)}
                  title="Nhấp để phóng to toàn bộ mẫu đơn khai lý lịch"
                >
                  <img
                    src={OPD_PERSONAL_INFO_SCENE_IMAGE}
                    alt="Tranh minh họa gốc The Oxford Picture Dictionary - Personal Information Form"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Floating Action Button to Enlarge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 font-medium flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Mẫu đơn lý lịch chuẩn: Personal Information (Trang 4)</span>
                    </span>

                    <span className="text-xs bg-white text-slate-900 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-md group-hover:bg-emerald-100 transition-colors">
                      <Maximize2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Phóng to</span>
                    </span>
                  </div>
                </div>

                {/* Right side: Educational context and quick navigation */}
                <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-2.5 py-1 rounded-full">
                        Oxford Picture Dictionary Visual
                      </span>
                      <span className="text-xs text-emerald-300">
                        16 Mục Lý Lịch Thiết Yếu
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold font-headline mt-2 text-white">
                      Mẫu đơn lý lịch chuẩn: 2 Personal Information
                    </h3>
                    <p className="text-sm text-emerald-100/90 mt-2 leading-relaxed">
                      Toàn bộ 16 từ vựng về khai báo lý lịch cá nhân theo giáo trình Oxford Picture Dictionary: họ và tên (name), tên (first name), chữ cái tên lót (middle initial), họ (last name), địa chỉ (address), thành phố (city), tiểu bang (state), mã số khu vực (zip code), mã số vùng (area code), số điện thoại, giới tính nam/nữ, ngày sinh, số căn hộ, nơi sinh, số an sinh xã hội và chữ ký.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-4 border-t border-white/10 text-xs">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/10">
                      <span className="text-emerald-300 block text-[10px] font-medium uppercase">Trang sách</span>
                      <span className="font-bold text-white text-sm">Trang 4</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/10">
                      <span className="text-emerald-300 block text-[10px] font-medium uppercase">Mục điền đơn</span>
                      <span className="font-bold text-emerald-300 text-sm">16 Từ vựng</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/10 col-span-2 sm:col-span-1">
                      <span className="text-emerald-300 block text-[10px] font-medium uppercase">Phương pháp</span>
                      <span className="font-bold text-amber-300 text-sm">SRS + Hình ảnh</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShowPersonalInfoPosterModal(true)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Xem mẫu đơn lý lịch</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onStartStudySubtopic(currentSubtopic, currentUnit)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[#006c49] hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Luyện tập Flashcard SRS</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* OPD SCHOOL MASTER BANNER (For Unit 1, Lesson 3: School - Trường Học) */}
          {currentSubtopic.id === 'sub-1-3' && (
            <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 rounded-3xl overflow-hidden shadow-lg border border-blue-500/20 text-white">
              <div className="flex flex-col lg:flex-row items-stretch">
                {/* Left side: Image preview */}
                <div 
                  className="lg:w-1/2 relative min-h-[260px] cursor-pointer group overflow-hidden bg-slate-950"
                  onClick={() => setShowSchoolPosterModal(true)}
                  title="Nhấp để phóng to toàn bộ tranh khuôn viên trường học"
                >
                  <img
                    src={OPD_SCHOOL_SCENE_IMAGE}
                    alt="Tranh minh họa gốc The Oxford Picture Dictionary - School"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Floating Action Button to Enlarge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 font-medium flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                      <span>Khuôn viên trường: 3 School (Trang 5)</span>
                    </span>

                    <span className="text-xs bg-white text-slate-900 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-md group-hover:bg-blue-100 transition-colors">
                      <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Phóng to</span>
                    </span>
                  </div>
                </div>

                {/* Right side: Educational context and quick navigation */}
                <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/30 text-blue-200 border border-blue-400/30 px-2.5 py-1 rounded-full">
                        Oxford Picture Dictionary Visual
                      </span>
                      <span className="text-xs text-blue-300">
                        18 Khu vực & Nhân sự Trường học
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold font-headline mt-2 text-white">
                      Khuôn viên trường học: 3 School
                    </h3>
                    <p className="text-sm text-blue-100/90 mt-2 leading-relaxed">
                      Toàn bộ 18 từ vựng thực tế theo giáo trình Oxford Picture Dictionary: classroom (phòng học), teacher (giáo viên), auditorium (thính đường/giảng đường), cafeteria (phòng ăn), lunch benches (ghế dài ăn trưa), library (thư viện), lockers (hộc để đồ), rest rooms (nhà vệ sinh), gym (phòng tập thể thao), bleachers (khán đài), track (sân điền kinh), field (sân), principal's office, principal, counselor's office, counselor, main office và clerk.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-4 border-t border-white/10 text-xs">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/10">
                      <span className="text-blue-300 block text-[10px] font-medium uppercase">Trang sách</span>
                      <span className="font-bold text-white text-sm">Trang 5</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/10">
                      <span className="text-blue-300 block text-[10px] font-medium uppercase">Số từ vựng</span>
                      <span className="font-bold text-blue-300 text-sm">18 Mục chuẩn</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/10 col-span-2 sm:col-span-1">
                      <span className="text-blue-300 block text-[10px] font-medium uppercase">Phương pháp</span>
                      <span className="font-bold text-amber-300 text-sm">SRS + Trực quan</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShowSchoolPosterModal(true)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Xem khuôn viên trường</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onStartStudySubtopic(currentSubtopic, currentUnit)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Luyện tập Flashcard SRS</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ZOOM MODAL FOR SCHOOL POSTER */}
          {showSchoolPosterModal && (
            <div 
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
              onClick={() => setShowSchoolPosterModal(false)}
            >
              <div 
                className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                      #3
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-slate-900 text-base">
                        The Oxford Picture Dictionary: Lesson 3 - School (Trang 5)
                      </h4>
                      <p className="text-xs text-slate-500">
                        18 vị trí, phòng ban và chức danh thiết yếu trong khuôn viên trường học
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSchoolPosterModal(false)}
                    className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="overflow-auto p-4 flex items-center justify-center bg-slate-950 min-h-[350px]">
                  <img
                    src={OPD_SCHOOL_SCENE_IMAGE}
                    alt="Oxford Picture Dictionary - School Poster"
                    className="max-h-[70vh] w-auto object-contain rounded-xl shadow-lg"
                  />
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                  <div className="text-xs text-slate-500">
                    💡 <em>Bạn có thể học từng thẻ từ riêng biệt với đầy đủ phiên âm, định nghĩa và ví dụ bên dưới.</em>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSchoolPosterModal(false)}
                    className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs"
                  >
                    Đóng cửa sổ
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* OPD STUDYING MASTER BANNER (For Unit 1, Lesson 4: Studying - Học A-Z) */}
          {currentSubtopic.id === 'sub-1-4' && (
            <div className="bg-gradient-to-br from-amber-950 via-slate-900 to-orange-950 rounded-3xl overflow-hidden shadow-lg border border-amber-500/20 text-white">
              <div className="flex flex-col lg:flex-row items-stretch">
                {/* Left side: Image preview */}
                <div 
                  className="lg:w-1/2 relative min-h-[260px] cursor-pointer group overflow-hidden bg-slate-950"
                  onClick={() => setShowStudyingPosterModal(true)}
                  title="Nhấp để phóng to toàn bộ tranh hành động học tập Studying (A-Z)"
                >
                  <img
                    src={OPD_STUDYING_SCENE_IMAGE}
                    alt="Tranh minh họa gốc The Oxford Picture Dictionary - Studying"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Floating Action Button to Enlarge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 font-medium flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>Hành động học tập: 4 Studying (Trang 6–7)</span>
                    </span>

                    <span className="text-xs bg-white text-slate-900 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-md group-hover:bg-amber-100 transition-colors">
                      <Maximize2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>Phóng to</span>
                    </span>
                  </div>
                </div>

                {/* Right side: Educational context and quick navigation */}
                <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/30 text-amber-200 border border-amber-400/30 px-2.5 py-1 rounded-full">
                        Oxford Picture Dictionary Visual
                      </span>
                      <span className="text-xs text-amber-300">
                        26 Hành Động Học Tập A – Z
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold font-headline mt-2 text-white">
                      Hoạt động học tập: 4 Studying
                    </h3>
                    <p className="text-sm text-amber-100/90 mt-2 leading-relaxed">
                      Trọn bộ 26 hành động học tập thực tế từ A đến Z: Look up a word (A), Read the word (B), Say the word (C), Repeat the word (D), Spell the word (E), Copy the word (F), Ask a question (G), Answer a question (H), Share a book (I), Help your partner (J), Brainstorm a list (K), Discuss the list (L), Draw a picture (M), Dictate a sentence (N), Pass out the papers (O), Talk with each other (P), Collect the papers (Q), Fill in the blank (R), Circle the answer (S), Mark the answer sheet (T), Cross out the word (U), Underline the word (V), Put the words in order (W), Match the items (X), Check your work (Y), Correct the mistake (Z).
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-4 border-t border-white/10 text-xs">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/10">
                      <span className="text-amber-300 block text-[10px] font-medium uppercase">Trang sách</span>
                      <span className="font-bold text-white text-sm">Trang 6–7</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/10">
                      <span className="text-amber-300 block text-[10px] font-medium uppercase">Số hoạt động</span>
                      <span className="font-bold text-amber-300 text-sm">26 Mục (A - Z)</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/10 col-span-2 sm:col-span-1">
                      <span className="text-amber-300 block text-[10px] font-medium uppercase">Kỹ năng</span>
                      <span className="font-bold text-emerald-300 text-sm">Lớp học & Thi cử</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShowStudyingPosterModal(true)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Xem tranh hoạt động học tập</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onStartStudySubtopic(currentSubtopic, currentUnit)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[#006c49] hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Luyện tập Flashcard SRS</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ZOOM MODAL FOR STUDYING POSTER */}
          {showStudyingPosterModal && (
            <div 
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
              onClick={() => setShowStudyingPosterModal(false)}
            >
              <div 
                className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                      #4
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-slate-900 text-base">
                        The Oxford Picture Dictionary: Lesson 4 - Studying (Trang 6–7)
                      </h4>
                      <p className="text-xs text-slate-500">
                        26 hành động học tập thực tế trong lớp học và bài tập từ A đến Z
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowStudyingPosterModal(false)}
                    className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="overflow-auto p-4 flex items-center justify-center bg-slate-950 min-h-[350px]">
                  <img
                    src={OPD_STUDYING_SCENE_IMAGE}
                    alt="Oxford Picture Dictionary - Studying Poster"
                    className="max-h-[70vh] w-auto object-contain rounded-xl shadow-lg"
                  />
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                  <div className="text-xs text-slate-500">
                    💡 <em>Bạn có thể học từng thẻ từ riêng biệt với đầy đủ phiên âm, định nghĩa và ví dụ bên dưới.</em>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowStudyingPosterModal(false)}
                    className="px-5 py-2 rounded-xl bg-[#006c49] text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
                  >
                    Đóng cửa sổ
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Vocabulary Cards for this Subtopic */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-lg font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                <span>Danh sách từ vựng trong mục này ({sortedWords.length} từ)</span>
              </h3>

              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-[#dae2fd] rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs"
                >
                  <option value="default">Sắp xếp: Mặc định</option>
                  <option value="az">Theo A-Z</option>
                  <option value="level">Cấp độ SRS cao nhất</option>
                  <option value="due">Cần ôn tập gấp</option>
                </select>
              </div>
            </div>

            {/* Word Cards Grid */}
            {sortedWords.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {sortedWords.map((w) => (
                  <div
                    key={w.id}
                    className="bg-white rounded-2xl border border-[#dae2fd] shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group"
                  >
                    {/* Card Top Image Clue */}
                    <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                      <img
                        src={w.imageUrl}
                        alt={w.word}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-[11px] px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white font-medium truncate max-w-[180px]">
                          {w.subtopic || w.topic}
                        </span>
                        <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 font-bold shadow-xs">
                          Level {w.level}
                        </span>
                      </div>

                      {/* Audio button on image corner */}
                      <button
                        type="button"
                        onClick={() => handleSpeak(w)}
                        className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-indigo-700 flex items-center justify-center hover:bg-[#3525cd] hover:text-white transition-all shadow-md active:scale-95"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-baseline justify-between">
                          <h4 className="font-headline text-xl font-bold text-slate-900 group-hover:text-[#3525cd] transition-colors">
                            {w.word}
                          </h4>
                          <span className="text-xs text-slate-400 font-normal">
                            {w.phonetic}
                          </span>
                        </div>

                        <span className="text-xs text-slate-500 italic">
                          {w.partOfSpeech}
                        </span>

                        <p className="text-sm font-semibold text-slate-800 leading-snug mt-1">
                          {w.vietnameseMeaning}
                        </p>

                        {/* Oxford Sentence */}
                        <div className="p-3 bg-[#f2f3ff] rounded-xl text-xs text-slate-600 mt-2 leading-relaxed border border-[#e2e7ff]/80">
                          "{w.exampleSentence}"
                        </div>
                      </div>

                      {/* Card Bottom Status & Action */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">
                          {w.dueStatus === 'due_today' || w.dueStatus === 'overdue' ? (
                            <span className="text-red-600 font-bold">Đến hạn hôm nay!</span>
                          ) : w.dueStatus === 'mastered' ? (
                            <span className="text-[#006c49] font-bold">Đã làm chủ</span>
                          ) : (
                            <span>{w.dueText}</span>
                          )}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onReviewWord(w.id)}
                            className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="Ôn thẻ này ngay"
                          >
                            <Play className="w-4 h-4 fill-current" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteWord(w.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Xoá thẻ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty state for subtopic with 1-click sample generation */
              <div className="bg-white p-10 rounded-2xl border border-[#dae2fd] text-center flex flex-col items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-headline text-lg font-bold text-slate-900">
                    Chưa có từ vựng riêng cho mục "{currentSubtopic.englishTitle}"
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    Bạn có thể tự thêm từ vựng theo sách, hoặc bấm nút dưới đây để hệ thống tự động trích xuất các từ vựng chuẩn Oxford cho chủ đề này để bạn học ngay!
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleAddSampleWords(currentSubtopic, currentUnit)}
                    className="px-5 py-2.5 rounded-xl bg-[#3525cd] text-white text-xs font-bold hover:bg-indigo-700 transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Nạp nhanh từ vựng mẫu Oxford ({currentSubtopic.englishTitle})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onAddWordClick(currentUnit.id, currentSubtopic.id)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm từ thủ công</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FLAT VIEW: XEM TOÀN BỘ TỪ VỰNG KÈM BỘ LỌC TÌM KIẾM TOÀN CỤC */}
      {/* ========================================================================= */}
      {viewMode === 'flat' && (
        <div className="flex flex-col gap-6">
          {/* Search & Level Filters Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-[#dae2fd] shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm từ vựng, nghĩa tiếng Việt, câu ví dụ, chủ đề..."
                  className="w-full bg-[#f2f3ff] border-0 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#f2f3ff] border-0 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="default">Sắp xếp: Mặc định</option>
                  <option value="az">Theo A-Z</option>
                  <option value="level">Cấp độ SRS cao nhất</option>
                  <option value="due">Cần ôn tập gấp</option>
                </select>
              </div>
            </div>

            {/* SRS Level Filter Chips */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-slate-100">
              <span className="text-xs text-slate-400 mr-1 font-medium">Cấp độ:</span>
              {[
                { id: 'all', label: 'Tất cả SRS' },
                { id: '0', label: 'L0 Mới' },
                { id: '1', label: 'L1 (1d)' },
                { id: '2', label: 'L2 (3d)' },
                { id: '3', label: 'L3 (7d)' },
                { id: '4', label: 'L4 (14d)' },
                { id: '5', label: 'L5 Thành thạo' },
              ].map((lvl) => {
                const isActive = selectedLevel === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setSelectedLevel(lvl.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#3525cd] text-white shadow-xs'
                        : 'bg-[#f2f3ff] text-slate-600 hover:bg-[#eaedff]'
                    }`}
                  >
                    {lvl.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {sortedWords.map((w) => (
              <div
                key={w.id}
                className="bg-white rounded-2xl border border-[#dae2fd] shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group"
              >
                {/* Card Top Image Clue */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={w.imageUrl}
                    alt={w.word}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white font-medium truncate max-w-[200px]">
                      {w.subtopic || w.topic}
                    </span>
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 font-bold shadow-xs">
                      Level {w.level}
                    </span>
                  </div>

                  {/* Audio button on image corner */}
                  <button
                    type="button"
                    onClick={() => handleSpeak(w)}
                    className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-indigo-700 flex items-center justify-center hover:bg-[#3525cd] hover:text-white transition-all shadow-md active:scale-95"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-baseline justify-between">
                      <h4 className="font-headline text-xl font-bold text-slate-900 group-hover:text-[#3525cd] transition-colors">
                        {w.word}
                      </h4>
                      <span className="text-xs text-slate-400 font-normal">
                        {w.phonetic}
                      </span>
                    </div>

                    <span className="text-xs text-slate-500 italic">
                      {w.partOfSpeech}
                    </span>

                    <p className="text-sm font-semibold text-slate-800 leading-snug mt-1">
                      {w.vietnameseMeaning}
                    </p>

                    {/* Oxford Sentence */}
                    <div className="p-3 bg-[#f2f3ff] rounded-xl text-xs text-slate-600 mt-2 leading-relaxed border border-[#e2e7ff]/80">
                      "{w.exampleSentence}"
                    </div>
                  </div>

                  {/* Card Bottom Status & Action */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">
                      {w.dueStatus === 'due_today' || w.dueStatus === 'overdue' ? (
                        <span className="text-red-600 font-bold">Đến hạn hôm nay!</span>
                      ) : w.dueStatus === 'mastered' ? (
                        <span className="text-[#006c49] font-bold">Đã làm chủ</span>
                      ) : (
                        <span>{w.dueText}</span>
                      )}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onReviewWord(w.id)}
                        className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
                        title="Ôn thẻ này ngay"
                      >
                        <Play className="w-4 h-4 fill-current" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteWord(w.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Xoá thẻ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedWords.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#dae2fd] text-slate-500 text-sm">
              Không có từ vựng nào khớp với bộ lọc tìm kiếm hiện tại.
            </div>
          )}
        </div>
      )}

      {/* Dedicated Sequential Subtopic Mastery Session (User request: Flashcard -> Spelling -> Next -> Round 2: Shuffled Spelling) */}
      {activeStudySubtopic && (
        <SubtopicStudySession
          subtopic={activeStudySubtopic.subtopic}
          unit={activeStudySubtopic.unit}
          words={getWordsForSubtopic(activeStudySubtopic.subtopic, activeStudySubtopic.unit, words).length > 0
            ? getWordsForSubtopic(activeStudySubtopic.subtopic, activeStudySubtopic.unit, words)
            : generateSampleWordsForSubtopic(activeStudySubtopic.subtopic, activeStudySubtopic.unit)
          }
          onClose={() => setActiveStudySubtopic(null)}
          onUpdateWordLevel={onUpdateWordLevel || (() => {})}
          onShowToast={onShowToast}
          onNextSubtopic={(nextSub) => {
            setSelectedSubtopicId(nextSub.id);
            setActiveStudySubtopic({
              subtopic: nextSub,
              unit: activeStudySubtopic.unit,
            });
          }}
        />
      )}
    </div>
  );
};
