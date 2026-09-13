import React, { useState } from 'react';
import { UserStats, NavigationTab } from '../types';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  Flame, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  Target 
} from 'lucide-react';

interface ScheduleScreenProps {
  stats: UserStats;
  onNavigate: (tab: NavigationTab) => void;
  onShowToast: (msg: string) => void;
  onOpenQuotaModal: () => void;
}

export const ScheduleScreen: React.FC<ScheduleScreenProps> = ({
  stats,
  onNavigate,
  onShowToast,
  onOpenQuotaModal,
}) => {
  const [selectedDay, setSelectedDay] = useState('Hôm nay');

  const upcomingDays = [
    { day: 'Hôm nay', date: '24/10', count: 18, isToday: true, status: 'urgent' },
    { day: 'Ngày mai', date: '25/10', count: 24, isToday: false, status: 'normal' },
    { day: 'Thứ Năm', date: '26/10', count: 15, isToday: false, status: 'normal' },
    { day: 'Thứ Sáu', date: '27/10', count: 32, isToday: false, status: 'heavy' },
    { day: 'Thứ Bảy', date: '28/10', count: 12, isToday: false, status: 'light' },
    { day: 'Chủ Nhật', date: '29/10', count: 8, isToday: false, status: 'light' },
    { day: 'Thứ Hai', date: '30/10', count: 20, isToday: false, status: 'normal' },
  ];

  return (
    <div className="flex flex-col w-full max-w-[75rem] mx-auto px-6 lg:px-8 py-8 gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider text-[#3525cd] font-bold">
              Kế hoạch Spaced Repetition
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
            <span className="text-xs text-slate-500">Thuật toán SM-2</span>
          </div>
          <h1 className="font-headline text-3xl font-extrabold text-[#131b2e] tracking-tight">
            Lịch học &amp; Dự báo Ôn tập
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Phân bổ tải lượng thẻ ghi nhớ tối ưu theo từng khung giờ và ngày trong tuần.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenQuotaModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#dae2fd] text-slate-800 text-xs font-bold hover:bg-slate-50 transition-all shadow-xs"
        >
          <Target className="w-4 h-4 text-indigo-600" />
          <span>Định ngạch: {stats.dailyQuota} từ/ngày</span>
        </button>
      </div>

      {/* 7-Day Forecast Horizon */}
      <div className="bg-white p-6 rounded-2xl border border-[#dae2fd] shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-headline text-base font-bold text-slate-900 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[#3525cd]" />
            <span>Dự báo hàng chờ 7 ngày tới</span>
          </h3>
          <span className="text-xs text-slate-400">Tổng cộng: 129 lượt ôn tập</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {upcomingDays.map((d) => (
            <div
              key={d.date}
              onClick={() => setSelectedDay(d.day)}
              className={`p-4 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                selectedDay === d.day
                  ? 'bg-indigo-50 border-[#3525cd] shadow-xs'
                  : 'bg-[#faf8ff] border-[#dae2fd] hover:bg-white'
              }`}
            >
              <span className={`text-xs font-bold ${d.isToday ? 'text-[#3525cd]' : 'text-slate-500'}`}>
                {d.day}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">{d.date}</span>

              <div className="my-3 font-headline text-2xl font-extrabold text-slate-900">
                {d.count}
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  d.status === 'urgent'
                    ? 'bg-red-100 text-red-700'
                    : d.status === 'heavy'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-emerald-100 text-[#006c49]'
                }`}
              >
                {d.status === 'urgent' ? 'Đến hạn' : `${d.count} thẻ`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Schedule Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Hourly Review Intervals (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#dae2fd] shadow-xs flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline text-base font-bold text-slate-900">
                Khung giờ kích hoạt trí nhớ ({selectedDay})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Ôn tập vào các thời điểm vàng để não bộ ghi nhớ sâu nhất
              </p>
            </div>
            <Clock className="w-5 h-5 text-slate-400" />
          </div>

          <div className="flex flex-col gap-3">
            {[
              { time: '08:00 - 08:30', label: 'Ôn tập ban mai (Khởi động trí não)', words: 8, done: true },
              { time: '12:30 - 13:00', label: 'Củng cố sau bữa trưa (Reflect & Quiz)', words: 4, done: true },
              { time: '18:00 - 18:30', label: 'Ôn nhóm từ Food & Dining', words: 6, done: false },
              { time: '21:00 - 21:30', label: 'Phiên ôn sâu trước khi ngủ (Sleep Consolidation)', words: 6, done: false },
            ].map((slot, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#faf8ff] border border-[#dae2fd] flex items-center justify-between hover:bg-[#f2f3ff] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      slot.done ? 'bg-[#006c49]' : 'bg-[#3525cd]'
                    }`}
                  ></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">{slot.time}</span>
                    <span className="text-xs text-slate-500 mt-0.5">{slot.label}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-700">{slot.words} từ</span>
                  {slot.done ? (
                    <span className="text-xs font-bold text-[#006c49] flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Đã xong
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onNavigate('on-tap')}
                      className="px-3 py-1 bg-[#3525cd] text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Bắt đầu
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Ebbinghaus Curve & Retention Science (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#dae2fd] shadow-xs flex flex-col gap-4">
            <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Đường cong quên lãng Ebbinghaus</span>
            </div>

            <h3 className="font-headline text-lg font-bold text-slate-900">
              Tại sao Spaced Repetition hiệu quả hơn học dồn?
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              Nếu không ôn tập, sau 24 giờ não bộ mất đi 70% lượng từ vựng vừa nạp. Mỗi lần ôn ngắt quãng đúng thời điểm (1 ngày, 3 ngày, 7 ngày, 14 ngày, 60 ngày), độ dốc quên lãng giảm dần cho đến khi kiến thức trở thành trí nhớ vĩnh viễn.
            </p>

            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex flex-col gap-2">
              <span className="text-xs font-bold text-indigo-900">Chỉ số duy trì của bạn:</span>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Xác suất nhớ đúng sau 30 ngày:</span>
                <span className="font-bold text-[#006c49]">92.4%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Số ngày dự kiến lên C1:</span>
                <span className="font-bold text-[#3525cd]">28 ngày nữa</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('on-tap')}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#3525cd] text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors shadow-xs"
            >
              <span>Vào phiên ôn tập ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
