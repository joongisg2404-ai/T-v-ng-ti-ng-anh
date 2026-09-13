import React, { useState, useEffect } from 'react';
import { X, Plus, Image as ImageIcon } from 'lucide-react';
import { VocabWord } from '../types';
import { OXFORD_UNITS } from '../data/mockWords';

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWord: (word: VocabWord) => void;
  defaultUnitId?: string;
  defaultSubtopicId?: string;
}

export const AddWordModal: React.FC<AddWordModalProps> = ({
  isOpen,
  onClose,
  onAddWord,
  defaultUnitId,
  defaultSubtopicId,
}) => {
  const [word, setWord] = useState('');
  const [phonetic, setPhonetic] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('noun [C]');
  const [vietnameseMeaning, setVietnameseMeaning] = useState('');
  const [englishDefinition, setEnglishDefinition] = useState('');
  const [exampleSentence, setExampleSentence] = useState('');
  const [selectedUnitId, setSelectedUnitId] = useState(defaultUnitId || OXFORD_UNITS[0].id);
  const [selectedSubtopicId, setSelectedSubtopicId] = useState(defaultSubtopicId || OXFORD_UNITS[0].subtopics[0].id);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (defaultUnitId) setSelectedUnitId(defaultUnitId);
    if (defaultSubtopicId) setSelectedSubtopicId(defaultSubtopicId);
  }, [defaultUnitId, defaultSubtopicId]);

  // When unit changes, update subtopic to first subtopic of new unit
  const activeUnit = OXFORD_UNITS.find(u => u.id === selectedUnitId) || OXFORD_UNITS[0];
  const activeSubtopic = activeUnit.subtopics.find(s => s.id === selectedSubtopicId) || activeUnit.subtopics[0];

  const handleUnitChange = (newUnitId: string) => {
    setSelectedUnitId(newUnitId);
    const unitObj = OXFORD_UNITS.find(u => u.id === newUnitId);
    if (unitObj && unitObj.subtopics.length > 0) {
      setSelectedSubtopicId(unitObj.subtopics[0].id);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim() || !vietnameseMeaning.trim()) return;

    const newWord: VocabWord = {
      id: `w-${Date.now()}`,
      word: word.trim(),
      phonetic: phonetic.trim() || `/${word.toLowerCase()}/`,
      partOfSpeech: partOfSpeech || 'noun',
      vietnameseMeaning: vietnameseMeaning.trim(),
      englishDefinition: englishDefinition.trim() || 'Custom vocabulary entry.',
      exampleSentence: exampleSentence.trim() || `Example with ${word.trim()}.`,
      topic: `${activeUnit.name} (${activeUnit.vietnameseName})`,
      subtopic: `${activeSubtopic.englishTitle} (${activeSubtopic.vietnameseTitle})`,
      unitId: activeUnit.id,
      subtopicId: activeSubtopic.id,
      level: 0,
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=700&q=80',
      dueStatus: 'due_today',
      dueText: 'Hôm nay',
      oxfordTier: 'B2',
      collocations: [],
      synonyms: [],
      retentionScore: 0.5,
      nextReviewDays: 0,
    };

    onAddWord(newWord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl flex flex-col gap-4 border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-[#3525cd]">
              <Plus className="w-5 h-5" />
            </div>
            <h4 className="font-headline text-lg font-bold text-slate-900">
              Thêm từ vựng Oxford mới
            </h4>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Từ vựng (English) *
              </label>
              <input
                required
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Ví dụ: Resilience"
                className="w-full bg-[#f2f3ff] border-0 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phiên âm IPA
              </label>
              <input
                type="text"
                value={phonetic}
                onChange={(e) => setPhonetic(e.target.value)}
                placeholder="/rɪˈzɪl.jəns/"
                className="w-full bg-[#f2f3ff] border-0 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Từ loại (Part of speech)
              </label>
              <select
                value={partOfSpeech}
                onChange={(e) => setPartOfSpeech(e.target.value)}
                className="w-full bg-[#f2f3ff] border-0 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="noun [C]">noun [C]</option>
                <option value="noun [U]">noun [U]</option>
                <option value="verb">verb</option>
                <option value="adjective">adjective</option>
                <option value="adverb">adverb</option>
                <option value="idiom">idiom / phrase</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Chủ đề lớn (Unit)
              </label>
              <select
                value={selectedUnitId}
                onChange={(e) => handleUnitChange(e.target.value)}
                className="w-full bg-[#f2f3ff] border-0 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none truncate"
              >
                {OXFORD_UNITS.map(u => (
                  <option key={u.id} value={u.id}>
                    Unit {u.unitNumber}: {u.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Chủ đề nhỏ (Subtopic)
              </label>
              <select
                value={selectedSubtopicId}
                onChange={(e) => setSelectedSubtopicId(e.target.value)}
                className="w-full bg-[#f2f3ff] border-0 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none truncate"
              >
                {activeUnit.subtopics.map(s => (
                  <option key={s.id} value={s.id}>
                    #{s.subtopicNumber}: {s.englishTitle}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nghĩa tiếng Việt *
            </label>
            <input
              required
              type="text"
              value={vietnameseMeaning}
              onChange={(e) => setVietnameseMeaning(e.target.value)}
              placeholder="Khả năng phục hồi, kiên cường vượt qua khó khăn"
              className="w-full bg-[#f2f3ff] border-0 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Định nghĩa tiếng Anh (Oxford Definition)
            </label>
            <textarea
              rows={2}
              value={englishDefinition}
              onChange={(e) => setEnglishDefinition(e.target.value)}
              placeholder="The capacity to recover quickly from difficulties; toughness."
              className="w-full bg-[#f2f3ff] border-0 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Câu ví dụ minh hoạ
            </label>
            <input
              type="text"
              value={exampleSentence}
              onChange={(e) => setExampleSentence(e.target.value)}
              placeholder="Courage is not the absence of fear, but the resilience to continue."
              className="w-full bg-[#f2f3ff] border-0 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
              Đường dẫn hình ảnh minh hoạ (URL)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-[#f2f3ff] border-0 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Huỷ
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-sm font-semibold bg-[#4f46e5] text-white hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Thêm vào kho từ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
