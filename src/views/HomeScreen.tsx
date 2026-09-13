import React, { useState } from 'react';
import { VocabWord, NavigationTab, LearningMode } from '../types';
import { speakWord } from '../utils/audio';
import { 
  Flame, 
  Play, 
  ArrowRight, 
  Sliders, 
  Volume2, 
  Lightbulb, 
  Layers, 
  SpellCheck, 
  HelpCircle, 
  BookOpen, 
  Download, 
  Upload, 
  AlertTriangle, 
  Quote, 
  Timer,
  Sparkles
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (tab: NavigationTab, mode?: LearningMode) => void;
  onOpenQuotaModal: () => void;
  dailyQuota: number;
  words: VocabWord[];
  onShowToast: (msg: string) => void;
  onExportJSON: () => void;
  onImportJSONClick: () => void;
  onStartReviewWord: (wordId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenQuotaModal,
  dailyQuota,
  words,
  onShowToast,
  onExportJSON,
  onImportJSONClick,
  onStartReviewWord,
}) => {
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(true);

  // 5 urgent words matching screenshot
  const urgentWords = words.filter(w => ['w-perseverance', 'w-commute', 'w-tenancy', 'w-nutritious', 'w-pedestrian'].includes(w.id));
  const displayUrgentWords = urgentWords.length > 0 ? urgentWords : words.slice(0, 5);

  const handlePlayWord = (w: VocabWord) => {
    speakWord(w.word);
    onShowToast(`Đang phát âm: /${w.word.toLowerCase()}/`);
  };

  return (
    <div className="flex flex-col w-full max-w-[75rem] mx-auto px-6 lg:px-8 py-8 gap-8">
      {/* Top Row: Editorial Hero Banner & Motivation */}
      <section className="relative overflow-hidden rounded-2xl bg-[#eaedff] p-8 shadow-xs border border-[#dae2fd]">
        <div className="absolute -right-20 -top-24 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/4 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-col max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider text-[#3525cd] font-bold">
                SRS Protocol v2.4
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-xs text-xs text-[#006c49] font-medium border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] animate-pulse"></span>
                Đồng bộ lúc 07:15 sáng
              </span>
            </div>

            <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-[#131b2e] tracking-tight">
              Chào buổi sáng, <span className="text-[#3525cd]">Lan!</span>
            </h1>

            <div className="mt-3 flex items-start gap-2 text-slate-600">
              <Quote className="w-5 h-5 text-[#3525cd] shrink-0 fill-current mt-0.5" />
              <p className="text-sm italic text-slate-600 leading-relaxed">
                "Small disciplines repeated with consistency every day lead to great achievements gained slowly over time."
                <span className="not-italic text-xs text-slate-400 ml-1.5 font-medium">— John C. Maxwell</span>
              </p>
            </div>
          </div>

          {/* Right Streak & Daily Goal */}
          <div className="flex flex-row lg:flex-col sm:flex-row items-center lg:items-end justify-between w-full lg:w-auto gap-4 pt-2 lg:pt-0">
            <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-xs border border-[#dae2fd]/80">
              <div className="w-10 h-10 rounded-lg bg-[#ffddb8] flex items-center justify-center text-[#885500]">
                <Flame className="w-6 h-6 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                  Chuỗi kỷ lục
                </span>
                <span className="font-headline text-base font-bold text-slate-900">
                  12 ngày liên tục 🔥
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-xs text-slate-600 font-medium">Mục tiêu ngày:</span>
              <div className="w-32 h-2.5 bg-[#dae2fd] rounded-full overflow-hidden">
                <div className="bg-[#4f46e5] h-full rounded-full transition-all duration-500" style={{ width: '65%' }}></div>
              </div>
              <span className="text-xs font-bold text-[#3525cd]">65%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Daily SRS Queue (Cards with Clear Sequence) */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-6 bg-[#3525cd] rounded-full"></div>
            <h2 className="font-headline text-2xl font-bold text-[#131b2e] tracking-tight">
              Hàng chờ học tập hôm nay
            </h2>
          </div>

          {/* Order of operations pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e2e7ff] text-[#131b2e] text-xs font-medium border border-[#dae2fd]">
            <span className="font-semibold text-[#3525cd]">Nguyên tắc Oxford:</span>
            <span>Ưu tiên ôn tập từ đến hạn trước</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-600">Học từ mới sau</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Priority 1: Due Review Card */}
          <div className="lg:col-span-7 bg-[#3525cd] text-white rounded-2xl p-7 shadow-md flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>

            <div className="flex flex-col gap-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wide uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#6cf8bb]"></span>
                  Đến hạn ôn tập (Due Now)
                </span>
                <span className="text-xs text-indigo-200 font-medium">Ưu tiên số #1</span>
              </div>

              <div className="flex items-baseline gap-3 mt-2">
                <span className="font-headline text-5xl font-extrabold tracking-tight">
                  18
                </span>
                <span className="text-xl font-bold text-indigo-100">
                  từ vựng cần củng cố
                </span>
              </div>

              <p className="text-sm text-indigo-100 max-w-md leading-relaxed">
                Não bộ đang trong thời điểm kích hoạt trí nhớ tốt nhất cho nhóm từ này theo đường cong quên lãng Ebbinghaus.
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 mt-4 relative z-10 border-t border-white/10">
              <div className="flex items-center gap-2 text-indigo-100 text-xs font-medium">
                <Timer className="w-4 h-4 text-indigo-200" />
                <span>Thời gian ước tính: ~6 phút</span>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('on-tap', 'flashcard')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#3525cd] text-sm font-bold shadow-md hover:bg-slate-50 transition-all active:scale-95 cursor-pointer"
              >
                <span>Bắt đầu ôn ngay</span>
                <Play className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>

          {/* Priority 2: New Words Queue */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-7 shadow-xs border border-[#dae2fd] flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2f3ff] text-xs text-slate-700 font-semibold uppercase tracking-wide border border-[#e2e7ff]">
                  <span className="w-2 h-2 rounded-full bg-[#3525cd]"></span>
                  Từ vựng mới
                </span>

                {/* Settings popover trigger */}
                <button
                  type="button"
                  onClick={onOpenQuotaModal}
                  className="flex items-center gap-1 text-slate-500 hover:text-[#3525cd] text-xs font-medium transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Cài đặt định ngạch</span>
                </button>
              </div>

              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-headline text-5xl font-extrabold text-[#131b2e]">
                  {dailyQuota}
                </span>
                <span className="text-lg font-semibold text-slate-600">
                  từ mới hôm nay
                </span>
              </div>

              <div className="p-3 bg-[#f2f3ff] rounded-xl flex items-center justify-between border border-[#e2e7ff]/80">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500">Bộ từ đang nạp</span>
                  <span className="text-sm font-bold text-slate-900">
                    Oxford 3000™ • Upper Intermediate
                  </span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-[#dae2fd] text-slate-700 font-semibold">
                  B2
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Học sau khi hoàn thành 18 từ ôn</span>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('tu-vung')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-slate-800 text-sm font-semibold transition-colors border border-[#e2e7ff]"
              >
                <span>Khám phá</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Modes (Bento 4 items) */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-6 bg-[#006c49] rounded-full"></div>
            <h2 className="font-headline text-2xl font-bold text-[#131b2e] tracking-tight">
              Phương thức rèn luyện nhanh
            </h2>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Chọn chế độ học phù hợp với quỹ thời gian của bạn
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Action 1 */}
          <div
            onClick={() => onNavigate('on-tap', 'flashcard')}
            className="p-6 rounded-2xl bg-white shadow-xs border border-[#dae2fd] hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group flex flex-col justify-between h-48"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-[#3525cd] group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#3525cd] font-semibold">
                Cốt lõi SRS
              </span>
            </div>
            <div>
              <h3 className="font-headline text-base font-bold text-slate-900 group-hover:text-[#3525cd] transition-colors">
                Lật thẻ Flashcard
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Đánh giá độ nhớ 4 mức độ: Again, Hard, Good, Easy.
              </p>
            </div>
          </div>

          {/* Action 2 */}
          <div
            onClick={() => onNavigate('on-tap', 'spelling')}
            className="p-6 rounded-2xl bg-white shadow-xs border border-[#dae2fd] hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer group flex flex-col justify-between h-48"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-[#006c49] group-hover:scale-110 transition-transform">
                <SpellCheck className="w-6 h-6" />
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#006c49] font-semibold">
                Gợi ý ảnh
              </span>
            </div>
            <div>
              <h3 className="font-headline text-base font-bold text-slate-900 group-hover:text-[#006c49] transition-colors">
                Luyện đánh vần
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Gõ chính xác từng ký tự theo gợi ý thị giác &amp; âm thanh.
              </p>
            </div>
          </div>

          {/* Action 3 */}
          <div
            onClick={() => onNavigate('on-tap', 'quiz')}
            className="p-6 rounded-2xl bg-white shadow-xs border border-[#dae2fd] hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group flex flex-col justify-between h-48"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-6 h-6" />
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                Phản xạ
              </span>
            </div>
            <div>
              <h3 className="font-headline text-base font-bold text-slate-900 group-hover:text-[#3525cd] transition-colors">
                Trắc nghiệm 4 đáp án
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Nhận diện định nghĩa và ngữ cảnh câu mẫu trong 10 giây.
              </p>
            </div>
          </div>

          {/* Action 4 */}
          <div
            onClick={() => onNavigate('nhat-ky')}
            className="p-6 rounded-2xl bg-white shadow-xs border border-[#dae2fd] hover:shadow-md hover:border-amber-200 transition-all cursor-pointer group flex flex-col justify-between h-48"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-[#885500] group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100/60 text-[#885500] font-semibold">
                +3 từ gợi ý
              </span>
            </div>
            <div>
              <h3 className="font-headline text-base font-bold text-slate-900 group-hover:text-[#885500] transition-colors">
                Viết nhật ký hôm nay
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Sử dụng: <span className="font-bold text-[#885500]">Persevere, Commute, Tenancy</span>
              </p>
            </div>
          </div>
        </div>

        {/* Relaxation Feature Spotlight Banner */}
        <div 
          onClick={() => onNavigate('thu-gian')}
          className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-sm border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer hover:border-indigo-500/50 transition-all group relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-indigo-500/10 to-transparent pointer-events-none" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3525cd] to-pink-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
              <Sparkles className="w-7 h-7" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#6cf8bb] text-[#006c49] font-bold uppercase tracking-wider">
                  Mới ra mắt
                </span>
                <span className="text-xs text-slate-400">
                  Cấp độ A1 đến B2
                </span>
              </div>
              <h3 className="font-headline text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">
                Góc Thư Giãn: Xem Phim Hội Thoại & Nghe Nhạc Karaoke
              </h3>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                Vừa xem vừa luyện phản xạ dịch từ tiếng Việt sang tiếng Anh theo vai diễn, hoặc luyện nghe bắt âm với lời bài hát song ngữ cuộn karaoke và thử thách điền từ khuyết (Cloze).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10 self-end md:self-auto">
            <span className="text-xs font-bold text-indigo-300 group-hover:text-white flex items-center gap-1">
              Trải nghiệm ngay <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </section>

      {/* Two-column split: SRS Mastery Distribution & Data Backup Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SRS Mastery Pyramid & Progress (7 cols) */}
        <section className="lg:col-span-7 bg-white rounded-2xl p-7 shadow-xs border border-[#dae2fd] flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline text-lg font-bold text-[#131b2e]">
                  Kim tự tháp trí nhớ SRS
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tổng cộng 301 từ vựng đã nạp trong kho dữ liệu
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 bg-indigo-50 text-indigo-700 font-bold rounded-lg">
                Tier 4 Active
              </span>
            </div>

            {/* Pyramid Bar Breakdown */}
            <div className="mt-6 flex flex-col gap-4">
              {/* Level 5 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 font-semibold text-[#006c49]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006c49]"></span>
                    Level 5 • Thành thạo vĩnh viễn
                  </span>
                  <span className="text-slate-900 font-bold">
                    142 từ <span className="text-slate-400 font-normal">(47.2%)</span>
                  </span>
                </div>
                <div className="h-3 w-full bg-[#f2f3ff] rounded-full overflow-hidden">
                  <div className="bg-[#006c49] h-full rounded-full transition-all duration-500" style={{ width: '47.2%' }}></div>
                </div>
              </div>

              {/* Level 3-4 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 font-semibold text-[#3525cd]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3525cd]"></span>
                    Level 3-4 • Ghi nhớ tốt (Khoảng giãn cách &gt; 14 ngày)
                  </span>
                  <span className="text-slate-900 font-bold">
                    86 từ <span className="text-slate-400 font-normal">(28.6%)</span>
                  </span>
                </div>
                <div className="h-3 w-full bg-[#f2f3ff] rounded-full overflow-hidden">
                  <div className="bg-[#3525cd] h-full rounded-full transition-all duration-500" style={{ width: '28.6%' }}></div>
                </div>
              </div>

              {/* Level 1-2 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 font-semibold text-amber-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    Level 1-2 • Đang củng cố (Khoảng giãn cách 1-3 ngày)
                  </span>
                  <span className="text-slate-900 font-bold">
                    48 từ <span className="text-slate-400 font-normal">(15.9%)</span>
                  </span>
                </div>
                <div className="h-3 w-full bg-[#f2f3ff] rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: '15.9%' }}></div>
                </div>
              </div>

              {/* Level 0 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 font-semibold text-slate-500">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                    Level 0 • Mới nạp (Chưa kiểm tra SRS)
                  </span>
                  <span className="text-slate-900 font-bold">
                    25 từ <span className="text-slate-400 font-normal">(8.3%)</span>
                  </span>
                </div>
                <div className="h-3 w-full bg-[#f2f3ff] rounded-full overflow-hidden">
                  <div className="bg-slate-300 h-full rounded-full transition-all duration-500" style={{ width: '8.3%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Metric summary tags */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100">
            <div className="p-3 bg-[#f2f3ff] rounded-xl flex flex-col">
              <span className="text-xs text-slate-500">Tỷ lệ nhớ chuẩn</span>
              <span className="font-headline text-lg font-bold text-[#006c49]">92.4%</span>
            </div>
            <div className="p-3 bg-[#f2f3ff] rounded-xl flex flex-col">
              <span className="text-xs text-slate-500">Tốc độ phản xạ</span>
              <span className="font-headline text-lg font-bold text-[#3525cd]">1.8s/từ</span>
            </div>
            <div className="p-3 bg-[#f2f3ff] rounded-xl flex flex-col">
              <span className="text-xs text-slate-500">Dự kiến cán mốc C1</span>
              <span className="font-headline text-lg font-bold text-[#885500]">28 Ngày</span>
            </div>
          </div>
        </section>

        {/* Utility & Data Integrity Hub (5 cols) */}
        <section className="lg:col-span-5 bg-white rounded-2xl p-7 shadow-xs border border-[#dae2fd] flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-lg font-bold text-[#131b2e]">
                Quản lý &amp; Tiện ích
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#006c49] font-semibold border border-emerald-100">
                Auto-sync ON
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Dữ liệu học tập được lưu cục bộ và mã hoá. Xuất tệp dự phòng thường xuyên để tránh mất chuỗi tiến trình.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-1">
              <button
                type="button"
                onClick={onExportJSON}
                className="flex items-center justify-center gap-2 p-3 bg-[#f2f3ff] hover:bg-[#eaedff] rounded-xl text-xs text-slate-900 font-semibold transition-colors border border-[#dae2fd]"
              >
                <Download className="w-4 h-4 text-[#3525cd]" />
                <span>Xuất JSON sao lưu</span>
              </button>
              <button
                type="button"
                onClick={onImportJSONClick}
                className="flex items-center justify-center gap-2 p-3 bg-[#f2f3ff] hover:bg-[#eaedff] rounded-xl text-xs text-slate-900 font-semibold transition-colors border border-[#dae2fd]"
              >
                <Upload className="w-4 h-4 text-[#006c49]" />
                <span>Nhập file từ vựng</span>
              </button>
            </div>

            {/* Quick setting toggles */}
            <div className="flex flex-col gap-2.5 pt-2">
              <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-xl border border-[#e2e7ff]/80">
                <div className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                  <Volume2 className="w-4 h-4 text-slate-500" />
                  <span>Tự động phát âm thanh khi lật thẻ</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoPlayAudio}
                  onChange={(e) => {
                    setAutoPlayAudio(e.target.checked);
                    onShowToast(e.target.checked ? 'Đã bật tự động phát âm thanh' : 'Đã tắt tự động phát âm thanh');
                  }}
                  className="accent-[#3525cd] h-4 w-4 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-xl border border-[#e2e7ff]/80">
                <div className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                  <Timer className="w-4 h-4 text-slate-500" />
                  <span>Lời nhắc ôn tập qua thông báo lúc 20:00</span>
                </div>
                <input
                  type="checkbox"
                  checked={dailyReminder}
                  onChange={(e) => {
                    setDailyReminder(e.target.checked);
                    onShowToast(e.target.checked ? 'Đã bật nhắc nhở 20:00' : 'Đã tắt nhắc nhở');
                  }}
                  className="accent-[#3525cd] h-4 w-4 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#eaedff] text-slate-600 flex items-center justify-between text-xs">
            <span>Lần sao lưu cuối: Hôm qua, 22:45</span>
            <span 
              onClick={() => onShowToast('Lịch sử sao lưu: 5 phiên bản lưu trữ sẵn sàng')} 
              className="font-semibold text-[#3525cd] cursor-pointer hover:underline"
            >
              Xem lịch sử
            </span>
          </div>
        </section>
      </div>

      {/* Top Due Words Preview (5 Urgent Words Table) */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-6 bg-[#ba1a1a] rounded-full"></div>
              <h2 className="font-headline text-2xl font-bold text-[#131b2e] tracking-tight">
                Danh sách 5 từ cần ôn gấp hôm nay
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Sắp xếp theo thứ tự ưu tiên giảm sút của hệ số ghi nhớ SRS
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('tu-vung')}
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[#3525cd] hover:underline"
          >
            <span>Xem tất cả 18 từ đến hạn</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Word Table Card */}
        <div className="bg-white rounded-2xl shadow-xs border border-[#dae2fd] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f2f3ff] text-xs font-semibold text-slate-600 border-b border-[#dae2fd]">
                <tr>
                  <th className="py-3 px-6">Từ vựng &amp; Phiên âm IPA</th>
                  <th className="py-3 px-4">Nghĩa tiếng Việt</th>
                  <th className="py-3 px-4">Cấp độ SRS</th>
                  <th className="py-3 px-4">Hạn ôn tập</th>
                  <th className="py-3 px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-900 divide-y divide-slate-100">
                {displayUrgentWords.map((w, idx) => (
                  <tr 
                    key={w.id} 
                    className={`hover:bg-[#f2f3ff]/60 transition-colors ${idx % 2 === 1 ? 'bg-slate-50/40' : ''}`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handlePlayWord(w)}
                          className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-[#3525cd] hover:bg-[#3525cd] hover:text-white transition-colors shadow-xs"
                          title="Nghe phát âm"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <div className="flex flex-col">
                          <span className="font-headline font-bold text-slate-900 tracking-tight">
                            {w.word}
                          </span>
                          <span className="text-xs text-slate-500 font-normal">
                            {w.phonetic} <span className="italic text-[11px] text-slate-400">({w.partOfSpeech})</span>
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 max-w-xs">
                      <span className="font-medium text-slate-900 block">{w.vietnameseMeaning}</span>
                      <span className="text-xs text-slate-500 italic line-clamp-1 mt-0.5">
                        "{w.exampleSentence}"
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f2f3ff] text-xs font-semibold text-slate-800 border border-[#e2e7ff]">
                        <span 
                          className={`w-2 h-2 rounded-full ${
                            w.level >= 4 ? 'bg-[#006c49]' : w.level >= 3 ? 'bg-[#3525cd]' : w.level >= 1 ? 'bg-amber-500' : 'bg-slate-400'
                          }`}
                        ></span>
                        Level {w.level}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      {w.dueStatus === 'overdue' ? (
                        <span className="px-2.5 py-1 rounded-lg bg-[#ffdad6] text-[#93000a] text-xs font-bold inline-flex items-center gap-1 border border-red-200">
                          <AlertTriangle className="w-3.5 h-3.5" /> Quá hạn 2 giờ
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-lg bg-[#f2f3ff] text-slate-700 text-xs font-medium border border-[#e2e7ff]">
                          {w.dueText}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => onStartReviewWord(w.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                          w.dueStatus === 'overdue'
                            ? 'bg-[#3525cd] text-white hover:bg-indigo-700'
                            : 'bg-[#f2f3ff] text-slate-800 hover:bg-[#eaedff] border border-[#dae2fd]'
                        }`}
                      >
                        {w.dueStatus === 'overdue' ? 'Kiểm tra ngay' : 'Ôn từ này'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
