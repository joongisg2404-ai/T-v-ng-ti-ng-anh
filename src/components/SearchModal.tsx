import React, { useState, useEffect } from 'react';
import { Search, X, Volume2, ArrowRight } from 'lucide-react';
import { VocabWord } from '../types';
import { speakWord } from '../utils/audio';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  words: VocabWord[];
  onSelectWord: (word: VocabWord) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  words,
  onSelectWord,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open handled by parent
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? words.filter(
        (w) =>
          w.word.toLowerCase().includes(query.toLowerCase()) ||
          w.vietnameseMeaning.toLowerCase().includes(query.toLowerCase()) ||
          w.topic.toLowerCase().includes(query.toLowerCase()) ||
          w.phonetic.toLowerCase().includes(query.toLowerCase())
      )
    : words.slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-xl w-full p-4 shadow-2xl flex flex-col gap-3 border border-slate-100">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-600 w-5 h-5" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tra cứu từ vựng, phiên âm IPA, chủ đề Oxford..."
            className="w-full bg-[#f2f3ff] border-0 rounded-xl pl-11 pr-10 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between px-2 text-xs text-slate-400">
          <span>{filtered.length} kết quả từ vựng</span>
          <span>Bấm Esc để đóng</span>
        </div>

        <div className="flex flex-col gap-1.5 max-h-80 overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              Không tìm thấy từ vựng nào khớp với "{query}"
            </div>
          ) : (
            filtered.map((w) => (
              <div
                key={w.id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[#f2f3ff] transition-colors group cursor-pointer"
                onClick={() => {
                  onSelectWord(w);
                  onClose();
                }}
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakWord(w.word);
                    }}
                    className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">
                        {w.word}
                      </span>
                      <span className="text-xs text-slate-400">{w.phonetic}</span>
                      <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                        Level {w.level}
                      </span>
                    </div>
                    <span className="text-xs text-slate-600 line-clamp-1">
                      {w.vietnameseMeaning}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                    {w.topic}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
