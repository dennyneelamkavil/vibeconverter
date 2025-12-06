import React from 'react';
import { ConversionHistoryItem } from '../types';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: ConversionHistoryItem[];
  onClear: (id: string) => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({ isOpen, onClose, history, onClear }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative w-full max-w-md h-full bg-[#f8f8f5] dark:bg-background-dark border-l-4 border-black dark:border-[#f8f8f5] shadow-[-4px_0px_0px_0px_rgba(0,0,0,1)] dark:shadow-[-4px_0px_0px_0px_rgba(255,255,255,1)] flex flex-col transform transition-transform duration-300 animate-in slide-in-from-right">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-4 border-black dark:border-[#f8f8f5] bg-primary">
          <h2 className="text-2xl font-bold text-black">Conversion History</h2>
          <button 
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-[#f8f8f5] rounded shadow-hard-sm dark:shadow-hard-sm-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:bg-gray-100 dark:active:bg-gray-900"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-50 space-y-4 dark:text-white">
               <span className="material-symbols-outlined text-6xl">history_toggle_off</span>
               <p className="font-bold text-xl">No weird stuff yet.</p>
            </div>
          ) : (
            history.map((item) => (
              <div key={item.id} className="bg-white dark:bg-black border-2 border-black dark:border-[#f8f8f5] rounded-xl p-4 shadow-hard dark:shadow-hard-white flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary border-2 border-black dark:border-[#f8f8f5] rounded-lg flex items-center justify-center text-2xl shadow-sm text-black">
                    {item.emoji}
                  </div>
                  <div className="dark:text-white">
                    <p className="font-bold text-sm">
                      {item.originalAmount} {item.originalUnit} → {item.convertedUnit}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1">
                      {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => onClear(item.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-100 dark:hover:bg-red-900 text-black dark:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};