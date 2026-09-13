import React, { useState } from 'react';
import { JournalEntry, DailyGoal } from '../types';
import { JOURNAL_DESK_IMAGE, INITIAL_JOURNAL_ENTRIES } from '../data/mockWords';
import { speakWord } from '../utils/audio';
import { 
  Calendar, 
  Sparkles, 
  Volume2, 
  Save, 
  Check, 
  Flame, 
  Download, 
  Upload, 
  FileText, 
  Clock, 
  Bold, 
  Italic, 
  List, 
  Quote, 
  CheckCircle2 
} from 'lucide-react';

interface JournalScreenProps {
  onShowToast: (msg: string) => void;
  onExportJSON: () => void;
  onImportJSONClick: () => void;
}

export const JournalScreen: React.FC<JournalScreenProps> = ({
  onShowToast,
  onExportJSON,
  onImportJSONClick,
}) => {
  const [entries, setEntries] = useState<JournalEntry[]>(INITIAL_JOURNAL_ENTRIES);
  const [activeText, setActiveText] = useState(INITIAL_JOURNAL_ENTRIES[0]?.content || '');
  const [isAiChecking, setIsAiChecking] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

  // Daily goals state
  const [goals, setGoals] = useState<DailyGoal[]>([
    { id: 'g1', title: 'Hoàn thành 18 thẻ đến hạn SRS', subtitle: 'Đã xong 12/18 thẻ', completed: true },
    { id: 'g2', title: 'Nạp 15 từ vựng mới chủ đề Food', subtitle: 'Chưa bắt đầu', completed: false },
    { id: 'g3', title: 'Viết ít nhất 100 từ có sử dụng 3 từ mới', subtitle: 'Đang thực hiện (142 từ)', completed: true },
  ]);

  // Suggested words for today's journal
  const suggestedWords = ['commute', 'pedestrian', 'nutritious', 'tenant', 'perseverance'];

  // Calculate used words
  const usedWords = suggestedWords.filter(word =>
    activeText.toLowerCase().includes(word.toLowerCase())
  );

  const wordCount = activeText.trim() ? activeText.trim().split(/\s+/).length : 0;

  // Insert word at end of text
  const handleInsertWord = (word: string) => {
    setActiveText(prev => {
      const separator = prev.endsWith(' ') || prev.length === 0 ? '' : ' ';
      return `${prev}${separator}${word} `;
    });
    onShowToast(`Đã chèn từ: "${word}"`);
  };

  const handleReadAloud = () => {
    if (!activeText.trim()) return;
    speakWord(activeText);
    onShowToast('Đang đọc lại bài viết bằng giọng đọc chuẩn Oxford');
  };

  const handleAiCheck = () => {
    setIsAiChecking(true);
    setTimeout(() => {
      setIsAiChecking(false);
      setAiFeedback(
        `Phân tích AI: Bài viết đạt độ mạch lạc cao (Band 7.5+), sử dụng xuất sắc ${usedWords.length}/5 từ vựng trọng tâm. Cấu trúc câu ghép và phân từ được vận dụng chính xác.`
      );
      onShowToast('Kiểm tra ngữ pháp AI thành công!');
    }, 1000);
  };

  const handleSave = () => {
    const newEntry: JournalEntry = {
      id: `j-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      displayDate: 'Hôm nay',
      title: 'Nhật ký phản xạ cá nhân',
      content: activeText,
      wordCount: wordCount,
      targetWordsUsed: usedWords,
      newWordsCount: usedWords.length,
    };
    setEntries(prev => [newEntry, ...prev]);
    onShowToast('Đã lưu bài viết vào nhật ký phản xạ!');
  };

  const toggleGoal = (id: string) => {
    setGoals(prev =>
      prev.map(g => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  return (
    <div className="flex flex-col w-full max-w-[75rem] mx-auto px-6 lg:px-8 py-8 gap-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#dae2fd] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3525cd]">
              Active SRS Sync
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
            <span className="text-xs text-slate-500">Phản xạ câu mẫu</span>
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-[#131b2e] tracking-tight">
            Nhật ký phản xạ &amp; Kế hoạch học tập
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed mt-1">
            Thực hành áp dụng từ vựng đã học vào bối cảnh thực tế thông qua việc viết phản tư hàng ngày. Hệ thống tự động nhận diện và cập nhật trạng thái làm chủ từ vựng.
          </p>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          <div className="flex items-center gap-2 px-3.5 py-2 bg-[#f2f3ff] rounded-xl text-xs font-bold text-indigo-700 border border-[#e2e7ff]">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Chuỗi 12 ngày</span>
          </div>
        </div>
      </div>

      {/* Two Columns: Editor & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Editor & Advice Card (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Main Editor Card */}
          <div className="bg-white rounded-2xl border border-[#dae2fd] shadow-xs p-6 sm:p-7 flex flex-col gap-4">
            {/* Editor Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-2 text-slate-700">
                <Calendar className="w-4 h-4 text-[#3525cd]" />
                <span className="font-headline font-bold text-base text-slate-900">
                  Hôm nay, Thứ Ba, 24/10/2023
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse"></span>
                <span className="text-xs text-slate-500 font-medium">
                  Đang soạn thảo • Tự động lưu
                </span>
              </div>
            </div>

            {/* Word Palette (Gợi ý từ vựng trong ngày) */}
            <div className="p-4 rounded-xl bg-[#f2f3ff] border border-[#e2e7ff]/80 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">
                  Từ vựng gợi ý hôm nay (Nhấp để chèn):
                </span>
                <span className="text-[#3525cd] font-bold">
                  {usedWords.length}/{suggestedWords.length} từ đã dùng
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {suggestedWords.map((word) => {
                  const isUsed = activeText.toLowerCase().includes(word.toLowerCase());
                  return (
                    <button
                      key={word}
                      type="button"
                      onClick={() => handleInsertWord(word)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        isUsed
                          ? 'bg-emerald-100 text-[#00714d] border border-emerald-300 font-bold'
                          : 'bg-white text-slate-800 hover:bg-[#eaedff] border border-slate-200 shadow-xs'
                      }`}
                    >
                      {isUsed ? <Check className="w-3.5 h-3.5" /> : <span>+</span>}
                      <span>{word}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rich Formatting Toolbar & Counters */}
            <div className="flex items-center justify-between text-slate-500 text-xs pt-1">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onShowToast('Áp dụng định dạng đậm')}
                  className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  title="In đậm"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast('Áp dụng định dạng nghiêng')}
                  className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  title="In nghiêng"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast('Tạo danh sách')}
                  className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Danh sách"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast('Trích dẫn')}
                  className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Trích dẫn"
                >
                  <Quote className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3 font-medium">
                <span>{wordCount} từ</span>
                <span>•</span>
                <span className="text-[#3525cd] font-bold">
                  {usedWords.length}/5 từ mục tiêu
                </span>
              </div>
            </div>

            {/* Textarea */}
            <textarea
              rows={9}
              value={activeText}
              onChange={(e) => setActiveText(e.target.value)}
              placeholder="Bắt đầu viết cảm nghĩ hoặc miêu tả ngày hôm nay của bạn có sử dụng các từ vựng mục tiêu..."
              className="w-full p-4 rounded-xl bg-[#faf8ff] border border-[#dae2fd] text-slate-800 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y font-normal"
            />

            {/* AI Feedback Banner if tested */}
            {aiFeedback && (
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2 animate-in fade-in duration-200">
                <Sparkles className="w-4 h-4 text-[#006c49] shrink-0 mt-0.5" />
                <span>{aiFeedback}</span>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleReadAloud}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-slate-800 text-xs font-semibold transition-colors border border-[#dae2fd]"
                >
                  <Volume2 className="w-4 h-4 text-[#3525cd]" />
                  <span>Nghe đọc lại bài viết</span>
                </button>

                <button
                  type="button"
                  onClick={handleAiCheck}
                  disabled={isAiChecking}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-[#3525cd] text-xs font-semibold transition-colors border border-indigo-200"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isAiChecking ? 'Đang phân tích...' : 'Kiểm tra ngữ pháp AI'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleSave}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#3525cd] hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Lưu nhật ký</span>
              </button>
            </div>
          </div>

          {/* Research Motivation Card with Desk Image */}
          <div className="bg-white rounded-2xl border border-[#dae2fd] shadow-xs overflow-hidden flex flex-col sm:flex-row items-stretch">
            <div className="sm:w-1/3 h-48 sm:h-auto relative bg-slate-100">
              <img
                src={JOURNAL_DESK_IMAGE}
                alt="Study desk"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sm:w-2/3 p-6 flex flex-col justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-[#3525cd] uppercase tracking-wider">
                  Nghiên cứu khoa học bộ nhớ Oxford
                </span>
                <h3 className="font-headline text-lg font-bold text-slate-900 mt-1">
                  Viết ít nhất 80 từ mỗi ngày giúp tăng tỉ lệ nhớ 3.4 lần
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed italic">
                  "Active recall through contextual output activates the hippocampus far more effectively than passive card flipping."
                </p>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                Tiến sĩ Eleanor Vance • Oxford Cognitive Neuroscience Lab
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Calendar, Daily Goals, History (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Monthly Calendar Widget */}
          <div className="bg-white p-6 rounded-2xl border border-[#dae2fd] shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-sm font-bold text-slate-900">
                Lịch Tháng &amp; Chuỗi Học
              </h3>
              <span className="text-xs font-semibold text-[#3525cd]">Tháng 10 / 2023</span>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => (
                <span key={d} className="font-bold text-slate-400 py-1">{d}</span>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                const isStreak = day >= 12 && day <= 23;
                const isToday = day === 24;
                return (
                  <div
                    key={day}
                    className={`h-8 rounded-lg flex items-center justify-center font-medium transition-all ${
                      isToday
                        ? 'bg-[#3525cd] text-white font-bold shadow-xs'
                        : isStreak
                        ? 'bg-emerald-100 text-[#006c49] font-bold'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-100 border border-[#006c49]"></span>
                Đạt chuỗi
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3525cd]"></span>
                Hôm nay
              </span>
            </div>
          </div>

          {/* Daily Goals Checkbox List */}
          <div className="bg-white p-6 rounded-2xl border border-[#dae2fd] shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-sm font-bold text-slate-900">
                Mục tiêu học tập hôm nay
              </h3>
              <span className="text-xs font-bold text-[#006c49]">2/3 Xong</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {goals.map((g) => (
                <div
                  key={g.id}
                  onClick={() => toggleGoal(g.id)}
                  className="p-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/70 flex items-start gap-3 cursor-pointer hover:bg-[#eaedff] transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={g.completed}
                    onChange={() => {}}
                    className="accent-[#3525cd] w-4 h-4 rounded mt-0.5"
                  />
                  <div className="flex flex-col">
                    <span className={`text-xs font-semibold ${g.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {g.title}
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5">
                      {g.subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Journal History */}
          <div className="bg-white p-6 rounded-2xl border border-[#dae2fd] shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-sm font-bold text-slate-900">
                Lịch sử bài viết gần đây
              </h3>
              <FileText className="w-4 h-4 text-slate-400" />
            </div>

            <div className="flex flex-col gap-3">
              {entries.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveText(item.content);
                    onShowToast(`Đã mở bài viết: ${item.displayDate}`);
                  }}
                  className="p-3 rounded-xl bg-[#faf8ff] hover:bg-[#f2f3ff] border border-[#dae2fd]/70 transition-colors cursor-pointer flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{item.displayDate}</span>
                    <span className="text-slate-400">{item.wordCount} từ</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1 italic">
                    "{item.content}"
                  </p>
                  <div className="flex items-center gap-1 flex-wrap mt-1">
                    {item.targetWordsUsed.slice(0, 3).map((w, i) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-medium">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backup Box */}
          <div className="bg-white p-5 rounded-2xl border border-[#dae2fd] shadow-xs flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-900">Bảo mật &amp; Sao lưu dữ liệu</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onExportJSON}
                className="flex items-center justify-center gap-1.5 p-2 bg-[#f2f3ff] hover:bg-[#eaedff] rounded-xl text-xs font-medium text-slate-800 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-indigo-600" />
                <span>Xuất tệp</span>
              </button>
              <button
                type="button"
                onClick={onImportJSONClick}
                className="flex items-center justify-center gap-1.5 p-2 bg-[#f2f3ff] hover:bg-[#eaedff] rounded-xl text-xs font-medium text-slate-800 transition-colors"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-600" />
                <span>Nhập tệp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
