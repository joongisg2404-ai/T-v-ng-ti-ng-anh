import React from 'react';
import { UserStats, VocabWord } from '../types';
import { 
  BarChart3, 
  Award, 
  Flame, 
  Zap, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  Target 
} from 'lucide-react';

interface StatsScreenProps {
  stats: UserStats;
  words: VocabWord[];
}

export const StatsScreen: React.FC<StatsScreenProps> = ({ stats, words }) => {
  const levelCounts = {
    l5: words.filter(w => w.level === 5).length,
    l4: words.filter(w => w.level === 4).length,
    l3: words.filter(w => w.level === 3).length,
    l2: words.filter(w => w.level === 2).length,
    l1: words.filter(w => w.level === 1).length,
    l0: words.filter(w => w.level === 0).length,
  };

  const cefrCounts = [
    { level: 'A1 Beginner', count: 45, percent: 15 },
    { level: 'A2 Elementary', count: 68, percent: 23 },
    { level: 'B1 Intermediate', count: 82, percent: 27 },
    { level: 'B2 Upper-Intermediate', count: 74, percent: 25 },
    { level: 'C1 Advanced Mastery', count: 32, percent: 10 },
  ];

  return (
    <div className="flex flex-col w-full max-w-[75rem] mx-auto px-6 lg:px-8 py-8 gap-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs uppercase tracking-wider text-[#3525cd] font-bold">
            Oxford Analytics Suite
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
          <span className="text-xs text-slate-500">Dữ liệu thời gian thực</span>
        </div>
        <h1 className="font-headline text-3xl font-extrabold text-[#131b2e] tracking-tight">
          Thống kê &amp; Cấp độ Thành thạo
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Báo cáo định lượng về tốc độ ghi nhớ, độ bền phản xạ và lộ trình đạt chuẩn C1.
        </p>
      </div>

      {/* Top Highlight Cards (4 metrics) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#dae2fd] shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium">Tỷ lệ nhớ chuẩn</span>
            <span className="font-headline text-3xl font-bold text-[#006c49] mt-1">92.4%</span>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1">Chuẩn Oxford SRS</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#006c49] flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#dae2fd] shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium">Tốc độ phản xạ</span>
            <span className="font-headline text-3xl font-bold text-[#3525cd] mt-1">1.8s</span>
            <span className="text-[11px] text-indigo-700 font-semibold mt-1">Trung bình mỗi từ</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-[#3525cd] flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#dae2fd] shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium">Chuỗi liên tiếp</span>
            <span className="font-headline text-3xl font-bold text-amber-600 mt-1">14 Ngày</span>
            <span className="text-[11px] text-amber-700 font-semibold mt-1">Tier 4 Active</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Flame className="w-6 h-6 fill-current" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#dae2fd] shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium">Dự kiến cán mốc C1</span>
            <span className="font-headline text-3xl font-bold text-slate-900 mt-1">28 Ngày</span>
            <span className="text-[11px] text-slate-500 font-medium mt-1">Dựa trên tốc độ hiện tại</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Two Columns: CEFR Pyramid & SRS Level Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: CEFR Framework Breakdown (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-2xl border border-[#dae2fd] shadow-xs flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline text-lg font-bold text-slate-900">
                Phân bổ Khung tham chiếu CEFR
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Kho 301 từ vựng tương thích chuẩn Oxford 3000™
              </p>
            </div>
            <Award className="w-5 h-5 text-indigo-600" />
          </div>

          <div className="flex flex-col gap-4">
            {cefrCounts.map((c) => (
              <div key={c.level} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-800">{c.level}</span>
                  <span className="text-slate-900">
                    {c.count} từ <span className="text-slate-400 font-normal">({c.percent}%)</span>
                  </span>
                </div>
                <div className="h-3 w-full bg-[#f2f3ff] rounded-full overflow-hidden">
                  <div
                    className="bg-[#3525cd] h-full rounded-full transition-all duration-500"
                    style={{ width: `${c.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: SRS Level Breakdown (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-2xl border border-[#dae2fd] shadow-xs flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline text-lg font-bold text-slate-900">
                Cấp độ phân bố Trí nhớ SRS
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Độ bền ký ức theo thuật toán lặp lại ngắt quãng
              </p>
            </div>
            <Layers className="w-5 h-5 text-[#006c49]" />
          </div>

          <div className="flex flex-col gap-3.5">
            {[
              { lvl: 'Level 5 • Vĩnh viễn (Interval > 60d)', count: 114, color: 'bg-[#006c49]' },
              { lvl: 'Level 4 • Rất sâu (Interval 14d - 60d)', count: 48, color: 'bg-emerald-600' },
              { lvl: 'Level 3 • Tốt (Interval 7d - 14d)', count: 38, color: 'bg-[#3525cd]' },
              { lvl: 'Level 2 • Đang nhớ (Interval 3d - 7d)', count: 42, color: 'bg-indigo-500' },
              { lvl: 'Level 1 • Mới học (Interval 1d)', count: 35, color: 'bg-amber-500' },
              { lvl: 'Level 0 • Chưa ôn lần nào', count: 24, color: 'bg-slate-300' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#faf8ff] border border-[#dae2fd]">
                <div className="flex items-center gap-2.5">
                  <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                  <span className="text-xs font-semibold text-slate-800">{item.lvl}</span>
                </div>
                <span className="text-xs font-bold text-slate-900">{item.count} từ</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
