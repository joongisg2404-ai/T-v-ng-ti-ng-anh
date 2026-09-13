import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info' | 'warning';
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#283044] text-[#eef0ff] rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 duration-200 pointer-events-none border border-slate-700/50">
      {type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#6cf8bb] shrink-0" />}
      {type === 'warning' && <AlertCircle className="w-5 h-5 text-[#ffb95f] shrink-0" />}
      {type === 'info' && <Info className="w-5 h-5 text-[#c3c0ff] shrink-0" />}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};
