import React from 'react';
import { Search, AlarmClock, Bell, BookOpen } from 'lucide-react';
import { USER_AVATAR_URL } from '../data/mockWords';

interface HeaderProps {
  onOpenSearch: () => void;
  dueWordsCount: number;
  onGoToReview: () => void;
  onOpenOxfordBook?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  dueWordsCount,
  onGoToReview,
  onOpenOxfordBook,
}) => {
  return (
    <header className="fixed top-0 left-72 right-0 h-20 bg-white/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-8 border-b border-[#eaedff]">
      {/* Search Bar */}
      <div className="flex items-center w-full max-w-md">
        <div 
          onClick={onOpenSearch}
          className="relative w-full cursor-pointer group"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-hover:text-indigo-600 transition-colors" />
          <input 
            readOnly
            onClick={onOpenSearch}
            className="w-full bg-[#f2f3ff] border-0 rounded-xl pl-10 pr-12 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 cursor-pointer group-hover:bg-[#eaedff] transition-all focus:outline-none" 
            placeholder="Tra cứu từ vựng, phiên âm IPA, chủ đề Oxford..." 
            type="text"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-slate-500 bg-white px-1.5 py-0.5 rounded shadow-xs border border-slate-200">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Oxford Book Curriculum Button */}
        {onOpenOxfordBook && (
          <button
            type="button"
            onClick={onOpenOxfordBook}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-[#3525cd] text-xs font-bold transition-colors border border-indigo-200 shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mục lục Sách Oxford (12 Units)</span>
          </button>
        )}

        {/* Due Words Badge */}
        <button
          type="button"
          onClick={onGoToReview}
          className="hidden lg:flex items-center gap-2 bg-[#f2f3ff] hover:bg-[#eaedff] px-3.5 py-1.5 rounded-full transition-colors border border-[#e2e7ff]"
        >
          <AlarmClock className="w-4 h-4 text-[#3525cd]" />
          <span className="text-xs font-semibold text-slate-900">
            {dueWordsCount} từ cần ôn
          </span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button 
            type="button"
            onClick={onGoToReview}
            className="h-10 w-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-[#eaedff] hover:text-slate-900 transition-colors relative" 
            title="Thông báo ôn tập"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-[#ba1a1a]"></span>
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-[#eaedff]">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-sm font-bold text-slate-900 leading-tight">Minh Anh</span>
            <span className="text-xs text-slate-500 font-medium">Oxford C1 Track</span>
          </div>
          <img 
            alt="Profile" 
            className="w-9 h-9 rounded-full object-cover border-2 border-indigo-100 shadow-xs" 
            src={USER_AVATAR_URL} 
          />
        </div>
      </div>
    </header>
  );
};
