import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useTheme } from '../hooks/useTheme';

export function LandingPage() {
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();

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

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden p-4 sm:p-8 transition-colors duration-300">
            {/* Header */}
            <header className="flex justify-between items-center mb-8 sm:mb-16">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Logo" width={32} height={32} />
                    <span className="text-xl font-bold tracking-tight text-black dark:text-white">VibeConverter</span>
                </div>
                <div className="flex gap-3">
                    <Button variant="icon" onClick={cycleTheme} title={`Theme: ${theme}`}>
                        <span className="material-symbols-outlined">{getThemeIcon()}</span>
                    </Button>
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
                        <Button onClick={() => navigate('/convert')} className="h-14 md:h-16 text-xl px-10 border-black text-black">
                            Get Weird
                        </Button>
                    </div>
                </div>
            </main>

            <footer className="mt-12 text-center text-sm font-bold opacity-30 text-black dark:text-white">
                © 2026 VibeConverter. Stay weird. by{" "}
                <a
                    href="https://dennynj.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-70"
                >
                    Denny N J
                </a>
            </footer>
        </div>
    );
}
