import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { WeirdUnit, UiVibe } from '../types';
import { STANDARD_UNITS } from '../constants';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: { value: number; unit: WeirdUnit } | null;
  inputs: { amount: string; unit: string; vibe: UiVibe };
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, result, inputs }) => {
  const [copyLabel, setCopyLabel] = useState('Copy Link');
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !result) return null;

  const handleCopyLink = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set('amount', inputs.amount);
    url.searchParams.set('unit', inputs.unit);
    url.searchParams.set('vibe', inputs.vibe);

    try {
      await navigator.clipboard.writeText(url.toString());
      setCopyLabel('Copied!');
      setTimeout(() => setCopyLabel('Copy Link'), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2, // Higher quality
      });

      const link = document.createElement('a');
      link.download = `vibe-check-${inputs.amount}${inputs.unit}-to-${result.unit.name}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to generate image:', err);
      alert('Failed to generate image. Try again?');
    }
  };

  const formattedValue = result.value < 0.01
    ? result.value.toExponential(2)
    : parseFloat(result.value.toFixed(2)).toLocaleString();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative flex flex-col gap-6 w-full max-w-md animate-in zoom-in-95 duration-200 z-50">

        {/* Close Button Toolbar */}
        <div className="w-full flex justify-end -mb-3 z-10">
          <button
            onClick={onClose}
            className="p-2 text-[#221f10] dark:text-[#f8f8f5] bg-[#f8f8f5] dark:bg-[#221f10] rounded-full border-2 border-[#221f10] dark:border-[#f8f8f5] shadow-hard dark:shadow-hard-white hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-none transition-all"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Main Card */}
        <div ref={cardRef} className="p-4 bg-white border-2 border-[#221f10] rounded-xl shadow-[8px_8px_0px_#221f10]">
          <div className="flex flex-col items-stretch justify-start rounded-lg bg-white font-grotesk">

            {/* Hero Image Area (Dynamic based on Emoji) */}
            <div
              className="w-full aspect-video rounded-lg border-2 border-[#221f10] bg-[#f2cc0d] flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              <span className="text-[8rem] relative z-10 drop-shadow-lg transform hover:scale-110 transition-transform duration-300 cursor-default">
                {result.unit.emoji}
              </span>
            </div>

            {/* Card Content */}
            <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-2 py-4">
              <p className="text-[#221f10]/60 text-base font-normal leading-normal">
                {inputs.amount} {STANDARD_UNITS.find(u => u.id === inputs.unit)?.name || inputs.unit} is...
              </p>

              <div className="flex items-baseline gap-2 flex-wrap">
                <p className="text-[#221f10] text-6xl font-bold leading-tight tracking-tighter">
                  ≈ {formattedValue}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-[#221f10] text-2xl font-medium leading-normal">
                  {result.unit.name}
                </p>
                <p className="text-[#221f10]/60 text-base font-normal leading-normal">
                  Vibes successfully converted.
                </p>
              </div>

              <div className="mt-2 text-center text-xs text-[#221f10]/50 font-mono">
                vibeconverter.app
              </div>
            </div>
          </div>
        </div>

        {/* Button Group */}
        <div className="flex justify-center">
          <div className="flex w-full flex-col sm:flex-row gap-4 px-4 py-3 justify-center">
            <button
              onClick={handleDownload}
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#f2cc0d] text-[#221f10] text-base font-bold leading-normal tracking-[0.015em] grow border-2 border-[#221f10] dark:border-[#f8f8f5] shadow-hard dark:shadow-hard-white hover:bg-[#ffe140] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150"
            >
              <span className="truncate">Download Image</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#f8f8f5] dark:bg-[#221f10] text-[#221f10] dark:text-[#f8f8f5] text-base font-bold leading-normal tracking-[0.015em] grow border-2 border-[#221f10] dark:border-[#f8f8f5] shadow-hard dark:shadow-hard-white hover:bg-gray-100 dark:hover:bg-gray-900 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150"
            >
              <span className="truncate">{copyLabel}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
