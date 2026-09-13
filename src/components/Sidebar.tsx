import React, { useRef } from 'react';
import { NavigationTab } from '../types';
import { APP_LOGO_URL } from '../data/mockWords';
import { 
  LayoutDashboard, 
  BookOpen, 
  Layers, 
  Calendar, 
  BookMarked, 
  BarChart3, 
  Flame, 
  Database, 
  Download, 
  Upload,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  streakDays: number;
  tier: number;
  onExportJSON: () => void;
  onImportJSON: (file: File) => void;
  onOpenOxfordBook?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  streakDays,
  tier,
  onExportJSON,
  onImportJSON,
  onOpenOxfordBook,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'trang-chu', label: 'Trang chủ', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'tu-vung', label: 'Kho từ vựng', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'on-tap', label: 'Ôn tập SRS', icon: <Layers className="w-5 h-5" /> },
    { id: 'thu-gian', label: 'Thư giãn (Phim & Nhạc)', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'lich-hoc', label: 'Lịch học & Mục tiêu', icon: <Calendar className="w-5 h-5" /> },
    { id: 'nhat-ky', label: 'Nhật ký từ vựng', icon: <BookMarked className="w-5 h-5" /> },
    { id: 'thong-ke', label: 'Thống kê & Cấp độ', icon: <BarChart3 className="w-5 h-5" /> },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportJSON(file);
      e.target.value = '';
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-white z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-[#eaedff]">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div 
          onClick={() => onSelectTab('trang-chu')}
          className="h-20 px-6 flex items-center gap-2 cursor-pointer select-none hover:opacity-90 transition-opacity"
        >
          <img 
            alt="VocabSRS Logo" 
            className="h-8 w-auto object-contain" 
            src={APP_LOGO_URL} 
          />
          <div className="flex flex-col">
            <span className="font-headline font-bold text-lg text-[#3525cd] leading-none tracking-tight">
              VocabSRS
            </span>
            <span className="text-[11px] font-medium text-slate-500 tracking-wider uppercase mt-1">
              Oxford Spaced System
            </span>
          </div>
        </div>

        {/* Learning Streak Card */}
        <div className="px-4 py-1">
          <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-center justify-between border border-[#e2e7ff]/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#6cf8bb]/30 flex items-center justify-center text-[#006c49]">
                <Flame className="w-5 h-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-medium">Chuỗi học tập</span>
                <span className="text-sm font-semibold text-slate-900">{streakDays} Ngày liên tiếp</span>
              </div>
            </div>
            <span className="text-[11px] bg-[#6cf8bb] text-[#00714d] px-2.5 py-0.5 rounded-full font-bold">
              Tier {tier}
            </span>
          </div>
        </div>

        {/* Oxford Book Curriculum Badge */}
        {onOpenOxfordBook && (
          <div className="px-4 pt-2 pb-1">
            <button
              type="button"
              onClick={onOpenOxfordBook}
              className="w-full text-left bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 p-3 rounded-xl border border-indigo-200/80 transition-all flex items-center justify-between group shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#3525cd] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    Oxford Picture Dict.
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">12 Chủ đề • Tr. 2–169</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1 px-4 mt-2">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                  isActive
                    ? 'bg-[#4f46e5] text-white shadow-sm shadow-indigo-200'
                    : 'text-slate-600 hover:bg-[#eaedff] hover:text-slate-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Backup & Version Bottom Footer */}
      <div className="p-4 flex flex-col gap-2">
        <div className="bg-[#f2f3ff] rounded-xl p-3 flex flex-col gap-2 border border-[#e2e7ff]/60">
          <div className="flex items-center justify-between text-slate-600 text-xs font-semibold">
            <span>Sao lưu từ vựng</span>
            <Database className="w-3.5 h-3.5" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button 
              type="button"
              onClick={onExportJSON}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white rounded-lg text-xs font-medium text-slate-800 hover:bg-slate-50 transition-colors shadow-xs border border-slate-200"
            >
              <Download className="w-3.5 h-3.5 text-indigo-600" />
              Xuất JSON
            </button>
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white rounded-lg text-xs font-medium text-slate-800 hover:bg-slate-50 transition-colors shadow-xs border border-slate-200"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-600" />
              Nhập JSON
            </button>
            <input 
              ref={fileInputRef} 
              type="file" 
              accept=".json" 
              onChange={handleFileChange} 
              className="hidden" 
            />
          </div>
        </div>

        <div className="flex items-center justify-between px-2 py-1">
          <span className="text-xs text-slate-500 font-medium">v2.4 Spaced Repetition</span>
          <span className="h-2 w-2 rounded-full bg-[#006c49] animate-pulse"></span>
        </div>
      </div>
    </aside>
  );
};
