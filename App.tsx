import React, { useState, useEffect } from 'react';
import { Button } from './components/Button';
import { HistorySidebar } from './components/HistorySidebar';
import { AuthModal } from './components/AuthModal';
import { ShareModal } from './components/ShareModal';
import { STANDARD_UNITS } from './constants';
import { calculateConversion } from './services/conversionService';
import { ConversionHistoryItem, UiVibe, WeirdUnit } from './types';
import { useTheme } from './hooks/useTheme';

function App() {
  const [view, setView] = useState<'landing' | 'app'>('landing');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [history, setHistory] = useState<ConversionHistoryItem[]>([]);

  // Theme State
  const { theme, setTheme } = useTheme();

  // Converter State
  const [amount, setAmount] = useState<string>('17');
  const [selectedUnit, setSelectedUnit] = useState<string>('m');
  const [vibe, setVibe] = useState<UiVibe>('Quirky');
  const [result, setResult] = useState<{ value: number; unit: WeirdUnit } | null>(null);

  // Initialize from URL params if present (Deep Linking)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramAmount = params.get('amount');
    const paramUnit = params.get('unit');
    const paramVibe = params.get('vibe') as UiVibe;

    if (paramAmount) setAmount(paramAmount);
    if (paramUnit && STANDARD_UNITS.some(u => u.id === paramUnit)) setSelectedUnit(paramUnit);
    if (paramVibe && ['Boring', 'Quirky', 'Wild', 'Unhinged'].includes(paramVibe)) setVibe(paramVibe);

    // If we have params, switch to app view immediately
    if (paramAmount || paramUnit || paramVibe) {
      setView('app');
    }
  }, []);

  useEffect(() => {
    handleConvert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, selectedUnit, vibe]);

  const handleConvert = () => {
    if (!amount || isNaN(Number(amount))) {
      setResult(null);
      return;
    }
    // Pass undefined for excludeUnitId when inputs change to allow any valid unit
    const res = calculateConversion(Number(amount), selectedUnit, vibe);
    setResult(res);
  };

  const handleShuffle = () => {
    if (!amount || isNaN(Number(amount)) || !result) return;

    // Pass the current result.unit.id to exclude it from the next random selection
    const res = calculateConversion(Number(amount), selectedUnit, vibe, result.unit.id);
    setResult(res);
  };

  const saveToHistory = () => {
    if (!result) return;
    const standardUnitLabel = STANDARD_UNITS.find(u => u.id === selectedUnit)?.label || '';

    const newItem: ConversionHistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      originalAmount: Number(amount),
      originalUnit: standardUnitLabel,
      convertedAmount: Number(result.value.toFixed(2)),
      convertedUnit: result.unit.name,
      emoji: result.unit.emoji,
      timestamp: new Date()
    };

    setHistory(prev => [newItem, ...prev]);
    setIsHistoryOpen(true);
  };

  const copyToClipboard = async () => {
    if (!result) return;
    const unitName = STANDARD_UNITS.find(u => u.id === selectedUnit)?.name || selectedUnit;
    const text = `${amount} ${unitName} = ~${result.value.toFixed(2)} ${result.unit.name}`;
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const cycleTheme = () => {
    if (theme === 'system') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('system');
  };

  const getThemeIcon = () => {
    if (theme === 'system') return 'desktop_windows';
    if (theme === 'light') return 'light_mode';
    return 'dark_mode';
  };

  const renderLanding = () => (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden p-4 sm:p-8 transition-colors duration-300">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 sm:mb-16">
        <div className="flex items-center gap-2">
          {/* <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[26px] border-b-black dark:border-b-[#f8f8f5] transform rotate-12"></div> */}
          <img src="/logo.png" alt="Logo" width={32} height={32} />
          <span className="text-xl font-bold tracking-tight text-black dark:text-white">VibeConverter</span>
        </div>
        <div className="flex gap-3">
          <Button variant="icon" onClick={cycleTheme} title={`Theme: ${theme}`}>
            <span className="material-symbols-outlined">{getThemeIcon()}</span>
          </Button>
          <Button onClick={() => setView('app')}>Sign Up</Button>
        </div>
      </header>

      {/* Hero Card */}
      <main className="flex-1 flex justify-center items-center">
        <div className="relative w-full max-w-4xl aspect-[4/3] md:aspect-[16/9] bg-primary rounded-[3rem] border-4 border-black dark:border-[#f8f8f5] shadow-hard-xl dark:shadow-hard-xl-white p-8 md:p-16 flex flex-col overflow-hidden group">
          {/* Decorative Banana */}
          <div className="absolute -top-12 -right-12 md:-top-24 md:-right-24 text-[12rem] md:text-[20rem] opacity-20 rotate-12 select-none pointer-events-none transition-transform duration-700 group-hover:rotate-45">
            🍌
          </div>

          <div className="mt-auto relative z-10">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6 text-black">
              Hey crazy <br /> human.
            </h1>
            <p className="text-lg md:text-2xl font-medium mb-10 max-w-xl text-black">
              Stop measuring in boring meters. Start measuring in bananas, giraffes, and existential dread.
            </p>
            <Button onClick={() => setView('app')} className="h-14 md:h-16 text-xl px-10 border-black text-black">
              Get Weird
            </Button>
          </div>
        </div>
      </main>

      <footer className="mt-12 text-center text-sm font-bold opacity-30 text-black dark:text-white">
        © 2024 VibeConverter. Stay weird.
      </footer>
    </div>
  );

  const renderApp = () => (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
      {/* App Header */}
      <header className="border-b-4 border-black dark:border-[#f8f8f5] bg-white dark:bg-black px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
          {/* <div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center text-primary dark:text-black">
            <span className="material-symbols-outlined">change_history</span>
          </div> */}
          <img src="/logo.png" alt="Logo" width={32} height={32} />
          <span className="text-xl font-black hidden sm:block text-black dark:text-white">VibeConverter</span>
        </div>

        <div className="flex gap-3">
          <Button variant="icon" onClick={cycleTheme} title={`Theme: ${theme}`}>
            <span className="material-symbols-outlined">{getThemeIcon()}</span>
          </Button>
          <Button variant="icon" onClick={() => setIsHistoryOpen(true)}>
            <span className="material-symbols-outlined">history</span>
          </Button>
          <Button onClick={() => setIsAuthOpen(true)}>Sign In</Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-3xl space-y-12">

          {/* Inputs */}
          <div className="flex flex-col md:flex-row gap-6 items-end">
            <label className="flex-1 w-full space-y-2">
              <span className="font-bold text-lg text-black dark:text-white">Amount</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-16 px-6 border-4 border-black dark:border-[#f8f8f5] rounded-xl text-2xl font-bold bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:shadow-hard dark:focus:shadow-hard-white transition-shadow placeholder:text-gray-300"
                placeholder="0"
              />
            </label>
            <label className="flex-1 w-full space-y-2">
              <span className="font-bold text-lg text-black dark:text-white">Unit</span>
              <div className="relative">
                <select
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value)}
                  className="w-full h-16 px-6 border-4 border-black dark:border-[#f8f8f5] rounded-xl text-xl font-bold bg-white dark:bg-black text-black dark:text-white appearance-none focus:outline-none focus:shadow-hard dark:focus:shadow-hard-white transition-shadow cursor-pointer"
                >
                  <optgroup label="Mass" className="dark:bg-black">
                    {STANDARD_UNITS.filter(u => u.type === 'mass').map(u => (
                      <option key={u.id} value={u.id}>{u.name} ({u.label})</option>
                    ))}
                  </optgroup>
                  <optgroup label="Length" className="dark:bg-black">
                    {STANDARD_UNITS.filter(u => u.type === 'length').map(u => (
                      <option key={u.id} value={u.id}>{u.name} ({u.label})</option>
                    ))}
                  </optgroup>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black dark:text-white">
                  <span className="material-symbols-outlined text-3xl">expand_more</span>
                </span>
              </div>
            </label>
          </div>

          {/* Vibe Selector */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl text-black dark:text-white">Creativity Level</h3>
            <div className="flex bg-[#f5f4f0] dark:bg-gray-900 border-4 border-black dark:border-[#f8f8f5] rounded-full p-2 gap-2 h-16 relative">
              {(['Boring', 'Quirky', 'Wild', 'Unhinged'] as UiVibe[]).map((v) => (
                <label key={v} className="flex-1 relative cursor-pointer group">
                  <input
                    type="radio"
                    name="vibe"
                    value={v}
                    checked={vibe === v}
                    onChange={() => setVibe(v)}
                    className="sr-only"
                  />
                  <div className={`w-full h-full rounded-full flex items-center justify-center font-bold text-lg transition-all duration-200 z-10 relative ${vibe === v ? 'text-black' : 'text-gray-400 group-hover:text-black dark:group-hover:text-white'}`}>
                    {v}
                  </div>
                  {/* Active Pill Background */}
                  {vibe === v && (
                    <div className="absolute inset-0 bg-white border-2 border-black rounded-full shadow-sm" />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Result Card */}
          <div className="relative border-4 border-black dark:border-[#f8f8f5] bg-white dark:bg-black rounded-[2rem] shadow-hard-xl dark:shadow-hard-xl-white overflow-hidden transition-all duration-300">
            {/* Shuffle Button Top Right */}
            {result && (
              <div className="absolute top-4 right-4 z-10">
                <Button variant="icon" onClick={handleShuffle} title="Shuffle Result" className="w-12 h-12">
                  <span className="material-symbols-outlined">shuffle</span>
                </Button>
              </div>
            )}

            <div className="p-8 md:p-12 text-center flex flex-col items-center gap-6 min-h-[300px] justify-center">
              {result ? (
                <>
                  <p className="text-gray-500 font-medium">
                    {amount} {STANDARD_UNITS.find(u => u.id === selectedUnit)?.label} is approximately...
                  </p>
                  <div className="space-y-4 animate-in zoom-in-50 duration-300" key={result.unit.id}>
                    <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tight text-black dark:text-white">
                      ~{result.value < 0.01 ? result.value.toExponential(2) : parseFloat(result.value.toFixed(2)).toLocaleString()}
                    </h2>
                    <div className="flex flex-col items-center">
                      <span className="text-6xl mb-4">{result.unit.emoji}</span>
                      <h3 className="text-3xl md:text-4xl font-bold bg-primary px-4 py-1 inline-block border-2 border-black transform -rotate-1 text-black">
                        {result.unit.name}
                      </h3>
                    </div>
                  </div>
                  {result.unit.id === 'giraffe_neck' && (
                    <p className="text-sm text-gray-400 font-mono">(stacked head to toe)</p>
                  )}

                  <div className="flex flex-wrap gap-4 mt-4 w-full justify-center">
                    <Button onClick={copyToClipboard} className="flex-1 min-w-[120px] gap-2">
                      <span className="material-symbols-outlined">content_copy</span>
                      Copy
                    </Button>
                    <Button variant="secondary" onClick={saveToHistory} className="flex-1 min-w-[120px] gap-2">
                      <span className="material-symbols-outlined">save</span>
                      Save
                    </Button>
                    <Button variant="secondary" onClick={() => setIsShareOpen(true)} className="flex-1 min-w-[120px] gap-2">
                      <span className="material-symbols-outlined">share</span>
                      Share
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-gray-300 flex flex-col items-center gap-4">
                  <span className="material-symbols-outlined text-6xl">calculate</span>
                  <p className="font-bold text-xl">Enter a number to get weird.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      <HistorySidebar
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClear={(id) => setHistory(prev => prev.filter(i => i.id !== id))}
      />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        result={result}
        inputs={{ amount, unit: selectedUnit, vibe }}
      />
    </div>
  );

  return view === 'landing' ? renderLanding() : renderApp();
}

export default App;