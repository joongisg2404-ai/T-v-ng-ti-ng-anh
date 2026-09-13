import React, { useState } from 'react';
import { OXFORD_UNITS } from '../data/mockWords';
import { VocabWord } from '../types';
import { 
  X, 
  BookOpen, 
  ChevronRight, 
  Layers, 
  Sparkles, 
  Plus, 
  Search, 
  ExternalLink,
  GraduationCap,
  BookmarkCheck
} from 'lucide-react';

interface OxfordBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUnit: (unitName: string) => void;
  onStartStudyUnit: (unitName: string) => void;
  onBatchAddWords: (newWords: VocabWord[]) => void;
}

export const OxfordBookModal: React.FC<OxfordBookModalProps> = ({
  isOpen,
  onClose,
  onSelectUnit,
  onStartStudyUnit,
  onBatchAddWords,
}) => {
  const [activeTab, setActiveTab] = useState<'toc' | 'batch'>('toc');
  const [searchUnit, setSearchUnit] = useState('');

  // Batch add state
  const [batchCategory, setBatchCategory] = useState(OXFORD_UNITS[0].name);
  const [batchInputText, setBatchInputText] = useState('');
  const [batchNotice, setBatchNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredUnits = OXFORD_UNITS.filter(u => 
    u.name.toLowerCase().includes(searchUnit.toLowerCase()) ||
    u.vietnameseName.toLowerCase().includes(searchUnit.toLowerCase()) ||
    u.subtopics.some(s => 
      s.englishTitle.toLowerCase().includes(searchUnit.toLowerCase()) ||
      s.vietnameseTitle.toLowerCase().includes(searchUnit.toLowerCase())
    )
  );

  const handleProcessBatch = () => {
    if (!batchInputText.trim()) return;

    // Parse lines like: "1. chalkboard - bảng" or "chalkboard : bảng" or "chalkboard (bảng)"
    const lines = batchInputText.split('\n');
    const created: VocabWord[] = [];

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      // Clean leading numbers or letters: "1.", "A.", "12."
      const cleanLine = line.replace(/^[0-9A-Za-z]+[\.\-\)\s]+/, '').trim();
      
      let word = '';
      let meaning = '';

      if (cleanLine.includes(' - ')) {
        const parts = cleanLine.split(' - ');
        word = parts[0].trim();
        meaning = parts.slice(1).join(' - ').trim();
      } else if (cleanLine.includes(':')) {
        const parts = cleanLine.split(':');
        word = parts[0].trim();
        meaning = parts.slice(1).join(':').trim();
      } else if (cleanLine.includes('(') && cleanLine.endsWith(')')) {
        const openIdx = cleanLine.indexOf('(');
        word = cleanLine.slice(0, openIdx).trim();
        meaning = cleanLine.slice(openIdx + 1, -1).trim();
      } else {
        word = cleanLine;
        meaning = 'Từ vựng trích xuất từ sách Oxford';
      }

      if (word) {
        created.push({
          id: `opd-custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          word: word.charAt(0).toUpperCase() + word.slice(1),
          phonetic: `/${word.toLowerCase()}/`,
          partOfSpeech: 'noun [C]',
          vietnameseMeaning: meaning || 'Nghĩa tiếng Việt',
          englishDefinition: `Vocabulary item from The Oxford Picture Dictionary (${batchCategory})`,
          exampleSentence: `We practiced using "${word}" in our daily conversation exercise.`,
          exampleVietnamese: `Chúng tôi đã luyện tập dùng từ "${meaning || word}" trong bài hội thoại hàng ngày.`,
          topic: batchCategory,
          level: 0,
          imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
          imageAlt: `Hình ảnh minh họa cho: ${word}`,
          dueStatus: 'due_today',
          dueText: 'Hôm nay',
          oxfordTier: 'B1',
          retentionScore: 0.5,
          nextReviewDays: 1,
        });
      }
    }

    if (created.length > 0) {
      onBatchAddWords(created);
      setBatchNotice(`Đã nạp thành công ${created.length} từ vựng mới vào kho SRS!`);
      setBatchInputText('');
      setTimeout(() => {
        setBatchNotice(null);
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-xl border border-[#dae2fd] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 bg-[#f2f3ff] border-b border-[#dae2fd] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#3525cd] text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">
                  Oxford University Press
                </span>
                <span className="text-xs text-slate-500 font-medium">Bilingual English / Vietnamese</span>
              </div>
              <h2 className="font-headline text-xl sm:text-2xl font-extrabold text-[#131b2e] tracking-tight">
                The Oxford Picture Dictionary (12 Chủ Đề)
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 border-b border-slate-200 bg-white flex items-center gap-6 text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('toc')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'toc'
                ? 'border-[#3525cd] text-[#3525cd]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>Mục lục 12 Chủ đề &amp; Chương sách</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('batch')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'batch'
                ? 'border-[#3525cd] text-[#3525cd]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Nạp thêm từ vựng từ trang sách</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'toc' && (
            <div className="flex flex-col gap-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchUnit}
                  onChange={(e) => setSearchUnit(e.target.value)}
                  placeholder="Tìm nhanh theo tên chủ đề, tiếng Việt hoặc chương bài học (vd: Lớp học, Nhà bếp, Bệnh viện, Y-phục...)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Units List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredUnits.map((unit) => (
                  <div
                    key={unit.id}
                    className="p-4 rounded-xl border border-[#dae2fd] bg-[#faf8ff] hover:bg-white hover:border-[#3525cd] transition-all flex flex-col justify-between gap-3 group shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-indigo-700 uppercase tracking-wider">
                          Unit {unit.unitNumber} • Trang {unit.pages}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold">
                          {unit.subtopics.length} chương
                        </span>
                      </div>

                      <h3 className="font-headline font-bold text-base text-slate-900 mt-1">
                        {unit.name}
                      </h3>
                      <p className="text-xs font-medium text-emerald-700">
                        {unit.vietnameseName}
                      </p>

                      {/* Subtopics snippet */}
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {unit.subtopics.slice(0, 4).map((sub) => (
                          <span
                            key={sub.id}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600"
                          >
                            {sub.subtopicNumber}. {sub.englishTitle}
                          </span>
                        ))}
                        {unit.subtopics.length > 4 && (
                          <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 font-medium">
                            +{unit.subtopics.length - 4} mục nhỏ khác
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60 mt-1">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectUnit(unit.name);
                          onClose();
                        }}
                        className="flex-1 py-1.5 px-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200 transition-colors"
                      >
                        Xem từ trong kho
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onStartStudyUnit(unit.name);
                          onClose();
                        }}
                        className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#3525cd] hover:bg-indigo-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Học SRS</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'batch' && (
            <div className="flex flex-col gap-5">
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div className="flex flex-col text-xs text-slate-700 leading-relaxed">
                  <span className="font-bold text-slate-900 text-sm">
                    Nạp nhanh danh sách từ từ bất kỳ trang sách nào
                  </span>
                  <p className="mt-1">
                    Bạn có thể copy/paste trực tiếp các dòng từ trong sách Oxford vào ô bên dưới. Hệ thống tự động nhận diện tiếng Anh và tiếng Việt theo các định dạng phổ biến:
                  </p>
                  <div className="mt-2 font-mono text-[11px] bg-white p-2 rounded border border-indigo-100 text-slate-600">
                    1. chalkboard - bảng<br />
                    2. overhead projector : máy chiếu lên tường<br />
                    3. teacher (giáo viên)<br />
                    4. bookcase - kệ sách
                  </div>
                </div>
              </div>

              {batchNotice && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold rounded-xl">
                  {batchNotice}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Chọn Unit chủ đề trong sách:
                </label>
                <select
                  value={batchCategory}
                  onChange={(e) => setBatchCategory(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500"
                >
                  {OXFORD_UNITS.map((u) => (
                    <option key={u.id} value={u.name}>
                      Unit {u.unitNumber}: {u.name} ({u.vietnameseName}) - Tr. {u.pages}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Dán các dòng từ vựng vào đây (mỗi từ một dòng):
                </label>
                <textarea
                  rows={8}
                  value={batchInputText}
                  onChange={(e) => setBatchInputText(e.target.value)}
                  placeholder="Ví dụ:&#10;chalkboard - bảng&#10;overhead projector - máy chiếu lên tường&#10;pencil sharpener - máy gọt bút chì&#10;bulletin board - bảng thông cáo"
                  className="w-full p-3.5 rounded-xl border border-slate-300 text-xs leading-relaxed font-mono focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleProcessBatch}
                  disabled={!batchInputText.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#3525cd] hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-xs"
                >
                  Nạp vào hệ thống SRS ngay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
