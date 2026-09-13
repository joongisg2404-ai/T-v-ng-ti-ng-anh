import React, { useState } from 'react';
import { X, Info } from 'lucide-react';

interface QuotaModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentQuota: number;
  onSave: (newQuota: number) => void;
}

export const QuotaModal: React.FC<QuotaModalProps> = ({
  isOpen,
  onClose,
  currentQuota,
  onSave,
}) => {
  const [quota, setQuota] = useState(currentQuota);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl flex flex-col gap-4 border border-slate-100">
        <div className="flex items-center justify-between">
          <h4 className="font-headline text-lg font-bold text-slate-900">
            Định ngạch từ mới mỗi ngày
          </h4>
          <button 
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Chọn số lượng từ mới phù hợp giúp duy trì thói quen ôn tập bền vững mà không bị quá tải hàng chờ SRS ngày hôm sau.
        </p>

        <div className="flex flex-col gap-2 pt-2">
          <div className="flex justify-between items-center text-sm font-medium text-slate-900">
            <span>Số từ mỗi ngày:</span>
            <span className="font-bold text-[#3525cd] text-lg bg-indigo-50 px-3 py-1 rounded-lg">
              {quota} từ
            </span>
          </div>

          <input 
            type="range"
            min="5" 
            max="40" 
            step="5" 
            value={quota}
            onChange={(e) => setQuota(parseInt(e.target.value, 10))}
            className="w-full accent-[#3525cd] h-2 bg-[#dae2fd] rounded-lg cursor-pointer mt-2" 
          />

          <div className="flex justify-between text-xs text-slate-400 px-1 font-medium">
            <span>5 từ (Nhẹ)</span>
            <span>15 từ (Chuẩn)</span>
            <span>40 từ (Cấp tốc)</span>
          </div>
        </div>

        <div className="p-3 bg-[#f2f3ff] rounded-xl flex items-start gap-2.5 text-xs text-slate-600 border border-[#e2e7ff]">
          <Info className="w-4 h-4 text-[#3525cd] shrink-0 mt-0.5" />
          <span>
            Với <strong className="text-slate-900 font-semibold">{quota} từ/ngày</strong>, sau 30 ngày bạn sẽ thành thạo thêm <strong className="text-[#006c49] font-bold">{quota * 30} từ mới</strong>.
          </span>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Huỷ
          </button>
          <button 
            type="button"
            onClick={() => {
              onSave(quota);
              onClose();
            }}
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-[#3525cd] text-white hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};
