/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  NavigationTab, 
  LearningMode, 
  VocabWord, 
  UserStats,
  StudySessionFilter,
  OxfordUnit,
  OxfordSubtopic
} from './types';
import { INITIAL_WORDS, INITIAL_USER_STATS, OXFORD_UNITS } from './data/mockWords';
import { CLASSROOM_WORDS } from './data/classroomWords';
import { PERSONAL_INFO_WORDS } from './data/personalInfoWords';
import { SCHOOL_WORDS } from './data/schoolWords';
import { STUDYING_WORDS } from './data/studyingWords';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { QuotaModal } from './components/QuotaModal';
import { AddWordModal } from './components/AddWordModal';
import { SearchModal } from './components/SearchModal';
import { OxfordBookModal } from './components/OxfordBookModal';
import { Toast } from './components/Toast';

import { HomeScreen } from './views/HomeScreen';
import { VocabularyScreen } from './views/VocabularyScreen';
import { SRSScreen } from './views/SRSScreen';
import { JournalScreen } from './views/JournalScreen';
import { ScheduleScreen } from './views/ScheduleScreen';
import { StatsScreen } from './views/StatsScreen';
import { RelaxationScreen } from './views/RelaxationScreen';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('trang-chu');
  const [learningMode, setLearningMode] = useState<LearningMode>('flashcard');

  // Words list with localStorage persistence (v3 with full 39 Oxford Classroom items)
  const [words, setWords] = useState<VocabWord[]>(() => {
    try {
      const savedV3 = localStorage.getItem('vocabsrs_words_v3');
      if (savedV3) {
        const parsed = JSON.parse(savedV3);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Synchronize canonical classroom and personal info words
          let updated = parsed.map((w: VocabWord) => {
            if (w.subtopicId === 'sub-1-1') {
              const canonical = CLASSROOM_WORDS.find(c => c.id === w.id);
              if (canonical) {
                return {
                  ...w,
                  imageUrl: canonical.imageUrl,
                  imageAlt: canonical.imageAlt,
                  vietnameseMeaning: canonical.vietnameseMeaning,
                  word: canonical.word,
                };
              }
            }
            if (w.subtopicId === 'sub-1-2') {
              const canonical = PERSONAL_INFO_WORDS.find(c => c.id === w.id || c.word.toLowerCase() === w.word.toLowerCase());
              if (canonical) {
                return {
                  ...w,
                  imageUrl: canonical.imageUrl,
                  imageAlt: canonical.imageAlt,
                  vietnameseMeaning: canonical.vietnameseMeaning,
                  word: canonical.word,
                  englishDefinition: canonical.englishDefinition,
                  exampleSentence: canonical.exampleSentence,
                  exampleVietnamese: canonical.exampleVietnamese,
                };
              }
            }
            if (w.subtopicId === 'sub-1-3') {
              const canonical = SCHOOL_WORDS.find(c => c.id === w.id || c.word.toLowerCase() === w.word.toLowerCase());
              if (canonical) {
                return {
                  ...w,
                  imageUrl: canonical.imageUrl,
                  imageAlt: canonical.imageAlt,
                  vietnameseMeaning: canonical.vietnameseMeaning,
                  word: canonical.word,
                  englishDefinition: canonical.englishDefinition,
                  exampleSentence: canonical.exampleSentence,
                  exampleVietnamese: canonical.exampleVietnamese,
                };
              }
            }
            if (w.subtopicId === 'sub-1-4') {
              const canonical = STUDYING_WORDS.find(c => c.id === w.id || c.word.toLowerCase() === w.word.toLowerCase());
              if (canonical) {
                return {
                  ...w,
                  imageUrl: canonical.imageUrl,
                  imageAlt: canonical.imageAlt,
                  vietnameseMeaning: canonical.vietnameseMeaning,
                  word: canonical.word,
                  englishDefinition: canonical.englishDefinition,
                  exampleSentence: canonical.exampleSentence,
                  exampleVietnamese: canonical.exampleVietnamese,
                };
              }
            }
            return w;
          });

          // Ensure all 16 canonical personal info words are loaded
          for (const piWord of PERSONAL_INFO_WORDS) {
            if (!updated.some(u => u.id === piWord.id || (u.subtopicId === 'sub-1-2' && u.word.toLowerCase() === piWord.word.toLowerCase()))) {
              updated.push(piWord);
            }
          }

          // Ensure all 18 canonical school words are loaded
          for (const sWord of SCHOOL_WORDS) {
            if (!updated.some(u => u.id === sWord.id || (u.subtopicId === 'sub-1-3' && u.word.toLowerCase() === sWord.word.toLowerCase()))) {
              updated.push(sWord);
            }
          }

          // Ensure all 26 canonical studying words are loaded
          for (const stWord of STUDYING_WORDS) {
            if (!updated.some(u => u.id === stWord.id || (u.subtopicId === 'sub-1-4' && u.word.toLowerCase() === stWord.word.toLowerCase()))) {
              updated.push(stWord);
            }
          }

          return updated;
        }
      }

      // Upgrade from v2 or load INITIAL_WORDS
      const savedV2 = localStorage.getItem('vocabsrs_words_v2');
      if (savedV2) {
        const parsedV2 = JSON.parse(savedV2);
        if (Array.isArray(parsedV2) && parsedV2.length > 0) {
          // Keep words that aren't the outdated classroom items
          const nonClassroomSaved = parsedV2.filter((w: VocabWord) => 
            w.subtopicId !== 'sub-1-1' && 
            w.id !== 'opd-1-chalkboard' && 
            w.id !== 'opd-1-bulletin-board'
          );
          const merged = [...INITIAL_WORDS];
          for (const customW of nonClassroomSaved) {
            if (!merged.some(m => m.id === customW.id)) {
              merged.push(customW);
            }
          }
          return merged;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_WORDS;
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vocabsrs_words_v3', JSON.stringify(words));
    } catch {
      // Ignore storage limit
    }
  }, [words]);

  // User Stats
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem('vocabsrs_stats');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_USER_STATS;
  });

  // Modals state
  const [isQuotaModalOpen, setIsQuotaModalOpen] = useState(false);
  const [isAddWordModalOpen, setIsAddWordModalOpen] = useState(false);
  const [addWordDefaultUnitId, setAddWordDefaultUnitId] = useState<string | undefined>();
  const [addWordDefaultSubtopicId, setAddWordDefaultSubtopicId] = useState<string | undefined>();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isOxfordModalOpen, setIsOxfordModalOpen] = useState(false);

  // Active study session filter (when studying a specific subtopic or unit)
  const [studyFilter, setStudyFilter] = useState<StudySessionFilter | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(message);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Export JSON handler
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(words, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `vocabsrs-oxford-backup-${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Đã xuất thành công tệp sao lưu JSON!');
  };

  // Import JSON handler
  const handleImportJSON = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedWords = JSON.parse(content);
        if (Array.isArray(importedWords) && importedWords.length > 0) {
          setWords(importedWords);
          showToast(`Đã nhập thành công ${importedWords.length} thẻ từ vựng!`);
        } else {
          showToast('Tệp không đúng định dạng danh sách từ vựng.');
        }
      } catch {
        showToast('Lỗi khi đọc tệp JSON. Vui lòng kiểm tra lại!');
      }
    };
    reader.readAsText(file);
  };

  // Trigger hidden file input click
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  // Add new word
  const handleAddWord = (newWord: VocabWord) => {
    setWords(prev => [newWord, ...prev]);
    showToast(`Đã thêm thành công: "${newWord.word}" vào kho từ!`);
  };

  // Batch add words from Oxford book
  const handleBatchAddWords = (newWords: VocabWord[]) => {
    setWords(prev => [...newWords, ...prev]);
    showToast(`Đã nạp ${newWords.length} từ vựng từ sách vào hệ thống SRS!`);
  };

  // Delete word
  const handleDeleteWord = (wordId: string) => {
    setWords(prev => prev.filter(w => w.id !== wordId));
    showToast('Đã xoá thẻ từ vựng khỏi kho lưu trữ.');
  };

  // Update word level after review
  const handleUpdateWordLevel = (wordId: string, rating: 'again' | 'hard' | 'good') => {
    setWords(prev =>
      prev.map(w => {
        if (w.id !== wordId) return w;
        let newLevel = w.level;
        let dueStatus: VocabWord['dueStatus'] = w.dueStatus;
        let dueText = w.dueText;

        if (rating === 'good') {
          newLevel = Math.min(5, (w.level + 1)) as any;
          if (newLevel === 5) {
            dueStatus = 'mastered';
            dueText = 'Đã làm chủ';
          } else {
            dueStatus = 'upcoming';
            dueText = `Ôn tập: ${newLevel === 4 ? 14 : newLevel === 3 ? 7 : 3} ngày nữa`;
          }
        } else if (rating === 'hard') {
          dueStatus = 'upcoming';
          dueText = 'Ôn tập: 2 ngày nữa';
        } else {
          newLevel = 1;
          dueStatus = 'due_today';
          dueText = 'Ôn ngày mai';
        }

        return {
          ...w,
          level: newLevel,
          dueStatus,
          dueText,
          lastReviewed: new Date().toISOString(),
        };
      })
    );
  };

  // Review single word
  const handleStartReviewWord = (wordId: string) => {
    const target = words.find(w => w.id === wordId);
    if (target) {
      // Put target word first in array
      const others = words.filter(w => w.id !== wordId);
      setWords([target, ...others]);
    }
    setLearningMode('flashcard');
    setCurrentTab('on-tap');
  };

  // Start study session for a specific subtopic
  const handleStartStudySubtopic = (subtopic: OxfordSubtopic, unit: OxfordUnit) => {
    setStudyFilter({
      type: 'subtopic',
      id: subtopic.id,
      title: `${subtopic.englishTitle} (${subtopic.vietnameseTitle})`,
      pages: subtopic.pages,
      parentUnitName: unit.name,
    });
    setLearningMode('flashcard');
    setCurrentTab('on-tap');
    showToast(`🎯 Bắt đầu học chủ đề: ${subtopic.englishTitle} - ${subtopic.vietnameseTitle}`);
  };

  // Start study session for an entire Unit
  const handleStartStudyUnit = (unit: OxfordUnit) => {
    setStudyFilter({
      type: 'unit',
      id: unit.id,
      title: `Unit ${unit.unitNumber}: ${unit.name} (${unit.vietnameseName})`,
      pages: unit.pages,
    });
    setLearningMode('flashcard');
    setCurrentTab('on-tap');
    showToast(`🎯 Bắt đầu học Unit ${unit.unitNumber}: ${unit.name}`);
  };

  // Calculate due words count
  const dueWordsCount = words.filter(w => w.dueStatus === 'due_today' || w.dueStatus === 'overdue').length;

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Hidden file input for file picker */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleImportJSON(file);
            e.target.value = '';
          }
        }}
      />

      {/* Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        streakDays={stats.streakDays}
        tier={stats.tier}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        onOpenOxfordBook={() => setIsOxfordModalOpen(true)}
      />

      {/* Top Header */}
      <Header
        onOpenSearch={() => setIsSearchModalOpen(true)}
        dueWordsCount={dueWordsCount}
        onGoToReview={() => {
          setLearningMode('flashcard');
          setCurrentTab('on-tap');
        }}
        onOpenOxfordBook={() => setIsOxfordModalOpen(true)}
      />

      {/* Main Content Area (offset by left sidebar 72 = 18rem, top header 20 = 5rem) */}
      <div className="pl-72 pt-20 flex-1 flex flex-col">
        <main className="flex-1 pb-16">
          {currentTab === 'trang-chu' && (
            <HomeScreen
              onNavigate={(tab, mode) => {
                if (mode) setLearningMode(mode);
                setCurrentTab(tab);
              }}
              onOpenQuotaModal={() => setIsQuotaModalOpen(true)}
              dailyQuota={stats.dailyQuota}
              words={words}
              onShowToast={showToast}
              onExportJSON={handleExportJSON}
              onImportJSONClick={handleImportClick}
              onStartReviewWord={handleStartReviewWord}
            />
          )}

          {currentTab === 'tu-vung' && (
            <VocabularyScreen
              words={words}
              onAddWordClick={(unitId, subtopicId) => {
                setAddWordDefaultUnitId(unitId);
                setAddWordDefaultSubtopicId(subtopicId);
                setIsAddWordModalOpen(true);
              }}
              onExportJSON={handleExportJSON}
              onImportJSONClick={handleImportClick}
              onReviewWord={handleStartReviewWord}
              onDeleteWord={handleDeleteWord}
              onNavigate={(tab) => setCurrentTab(tab)}
              onShowToast={showToast}
              onOpenOxfordBook={() => setIsOxfordModalOpen(true)}
              onStartStudySubtopic={handleStartStudySubtopic}
              onStartStudyUnit={handleStartStudyUnit}
              onAddBatchWords={handleBatchAddWords}
              onUpdateWordLevel={handleUpdateWordLevel}
            />
          )}

          {currentTab === 'on-tap' && (
            <SRSScreen
              words={words}
              initialMode={learningMode}
              studyFilter={studyFilter}
              onClearStudyFilter={() => setStudyFilter(null)}
              onNavigate={(tab) => setCurrentTab(tab)}
              onShowToast={showToast}
              onUpdateWordLevel={handleUpdateWordLevel}
            />
          )}

          {currentTab === 'lich-hoc' && (
            <ScheduleScreen
              stats={stats}
              onNavigate={(tab) => setCurrentTab(tab)}
              onShowToast={showToast}
              onOpenQuotaModal={() => setIsQuotaModalOpen(true)}
            />
          )}

          {currentTab === 'nhat-ky' && (
            <JournalScreen
              onShowToast={showToast}
              onExportJSON={handleExportJSON}
              onImportJSONClick={handleImportClick}
            />
          )}

          {currentTab === 'thong-ke' && (
            <StatsScreen
              stats={stats}
              words={words}
            />
          )}

          {currentTab === 'thu-gian' && (
            <RelaxationScreen
              onSaveWordToSRS={(wordData) => {
                const existing = words.find(w => w.word.toLowerCase() === wordData.word?.toLowerCase());
                if (existing) {
                  showToast(`Từ "${wordData.word}" đã có trong kho từ vựng của bạn!`);
                  return;
                }
                const newWord: VocabWord = {
                  id: `word-relax-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
                  word: wordData.word || '',
                  phonetic: wordData.phonetic || '',
                  partOfSpeech: wordData.partOfSpeech || 'noun',
                  vietnameseMeaning: wordData.vietnameseMeaning || '',
                  englishDefinition: wordData.englishDefinition || wordData.vietnameseMeaning || '',
                  exampleSentence: wordData.exampleSentence || '',
                  exampleVietnamese: wordData.exampleVietnamese || '',
                  level: 1,
                  topic: wordData.topic || 'Thư giãn & Giải trí',
                  subtopic: wordData.subtopic || 'Hội thoại & Ca khúc',
                  oxfordTier: (wordData.oxfordTier as any) || 'B1',
                  dueStatus: 'due_today',
                  dueText: 'Học ngay hôm nay',
                  imageUrl: wordData.imageUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
                  lastReviewed: new Date().toISOString(),
                };
                setWords(prev => [newWord, ...prev]);
                showToast(`Đã lưu "${newWord.word}" vào Sổ từ vựng & Hàng chờ ôn tập SRS!`);
              }}
              onShowToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <QuotaModal
        isOpen={isQuotaModalOpen}
        onClose={() => setIsQuotaModalOpen(false)}
        currentQuota={stats.dailyQuota}
        onSave={(newQuota) => {
          setStats(prev => ({ ...prev, dailyQuota: newQuota }));
          showToast(`Đã lưu định ngạch: ${newQuota} từ mới mỗi ngày!`);
        }}
      />

      <AddWordModal
        isOpen={isAddWordModalOpen}
        onClose={() => {
          setIsAddWordModalOpen(false);
          setAddWordDefaultUnitId(undefined);
          setAddWordDefaultSubtopicId(undefined);
        }}
        onAddWord={handleAddWord}
        defaultUnitId={addWordDefaultUnitId}
        defaultSubtopicId={addWordDefaultSubtopicId}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        words={words}
        onSelectWord={(word) => {
          handleStartReviewWord(word.id);
        }}
      />

      <OxfordBookModal
        isOpen={isOxfordModalOpen}
        onClose={() => setIsOxfordModalOpen(false)}
        onSelectUnit={(unitName) => {
          setCurrentTab('tu-vung');
          showToast(`Đang hiển thị danh sách từ: ${unitName}`);
        }}
        onStartStudyUnit={(unitName) => {
          const matchingUnit = OXFORD_UNITS.find(u => 
            u.name.toLowerCase() === unitName.toLowerCase() ||
            unitName.toLowerCase().includes(u.name.toLowerCase())
          );
          if (matchingUnit) {
            handleStartStudyUnit(matchingUnit);
          } else {
            setLearningMode('flashcard');
            setCurrentTab('on-tap');
            showToast(`Bắt đầu buổi ôn tập SRS cho: ${unitName}`);
          }
        }}
        onBatchAddWords={handleBatchAddWords}
      />

      {/* Toast notifications */}
      <Toast message={toastMessage} />
    </div>
  );
}
