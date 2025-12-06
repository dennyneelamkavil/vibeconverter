import React, { useState } from 'react';
import { Button } from './Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white dark:bg-black border-2 border-black dark:border-[#f8f8f5] rounded-xl p-8 shadow-hard-xl dark:shadow-hard-xl-white animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border-2 border-black dark:border-[#f8f8f5] rounded hover:bg-gray-100 dark:hover:bg-gray-900 text-black dark:text-white"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        <div className="flex bg-[#f5f4f0] dark:bg-gray-900 border-2 border-black dark:border-[#f8f8f5] rounded-lg p-1 mb-8">
          <button 
            onClick={() => setMode('signin')}
            className={`flex-1 py-2 font-bold text-sm rounded transition-all ${mode === 'signin' ? 'bg-primary border-2 border-black dark:border-[#f8f8f5] shadow-sm text-black' : 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 font-bold text-sm rounded transition-all ${mode === 'signup' ? 'bg-primary border-2 border-black dark:border-[#f8f8f5] shadow-sm text-black' : 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'}`}
          >
            Sign Up
          </button>
        </div>

        <h2 className="text-3xl font-black mb-6 text-black dark:text-white">
          {mode === 'signin' ? 'Welcome Back' : 'Join the Weirdness'}
        </h2>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <div className="space-y-2">
            <label className="font-bold block text-black dark:text-white">Username</label>
            <input 
              type="text" 
              placeholder="Enter your username"
              className="w-full h-14 px-4 border-2 border-black dark:border-[#f8f8f5] rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-4 focus:ring-primary/30 font-medium placeholder:text-gray-400"
            />
          </div>
          
          <div className="space-y-2">
             <div className="flex justify-between items-baseline">
                <label className="font-bold block text-black dark:text-white">Password</label>
                {mode === 'signin' && <a href="#" className="text-sm underline font-medium hover:text-primary text-black dark:text-white">Forgot?</a>}
             </div>
            <input 
              type="password" 
              placeholder="Enter your password"
              className="w-full h-14 px-4 border-2 border-black dark:border-[#f8f8f5] rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-4 focus:ring-primary/30 font-medium placeholder:text-gray-400"
            />
          </div>

          <Button fullWidth className="mt-4">
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>
      </div>
    </div>
  );
};