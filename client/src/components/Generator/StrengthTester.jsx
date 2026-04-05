import React, { useState } from 'react';
import { analyzePassword } from '../../utils/strengthChecker';

const StrengthTester = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const stats = analyzePassword(password);

  return (
    <div className="max-w-3xl w-full mx-auto space-y-12">
      <div className="bg-surface-container p-10 rounded-[2rem] space-y-10 relative overflow-hidden">
        {/* Atmospheric Glow Decor */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 blur-[80px] rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 blur-[80px] rounded-full"></div>
        
        <div className="relative space-y-8 z-10">
          {/* Password Input Area */}
          <div className="space-y-4">
            <div className="relative group">
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-low text-[#E8EEF4] font-mono text-xl md:text-3xl py-6 px-4 md:px-14 rounded-2xl border-none outline-none focus:bg-surface-container-high transition-all text-center tracking-widest placeholder:text-outline/30 placeholder:tracking-normal placeholder:font-body" 
                placeholder="Type to analyze..." 
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
                title={showPassword ? "Hide password" : "Show password"}
              >
                <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
              {password.length > 0 && (
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-[2px] ${stats.color} shadow-[0_0_12px_rgba(118,214,213,0.5)] transition-colors duration-300`}></div>
              )}
            </div>
            
            {/* Strength Bar */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-semibold tracking-wider uppercase text-on-surface-variant px-1">
                <span>Security Level</span>
                <span className={stats.level === 'None' ? 'text-on-surface-variant' : 'text-primary'}>{stats.level}</span>
              </div>
              <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden flex gap-1">
                <div className={`h-full w-1/4 rounded-full transition-colors duration-300 ${stats.bars[0] ? stats.color : 'bg-transparent'}`}></div>
                <div className={`h-full w-1/4 rounded-full transition-colors duration-300 ${stats.bars[1] ? stats.color : 'bg-transparent'}`}></div>
                <div className={`h-full w-1/4 rounded-full transition-colors duration-300 ${stats.bars[2] ? stats.color : 'bg-transparent'}`}></div>
                <div className={`h-full w-1/4 rounded-full transition-colors duration-300 ${stats.bars[3] ? stats.color : 'bg-transparent'}`}></div>
              </div>
            </div>
          </div>
          
          {/* Hero Metric: Crack Time */}
          <div className="flex flex-col items-center justify-center p-8 bg-surface-container-low rounded-2xl border border-outline-variant/10">
            <span className="text-on-surface-variant text-sm font-medium mb-1">Estimated Crack Time</span>
            <span className="font-headline text-5xl md:text-6xl font-extrabold text-[#E8EEF4] tracking-tight text-center">
              {stats.crackTime.value} <span className="text-xl md:text-2xl text-on-surface-variant font-normal">{stats.crackTime.unit}</span>
            </span>
            {stats.level === 'Exceptional' && (
              <div className="mt-4 flex items-center gap-2 text-primary bg-primary/10 px-4 py-1 rounded-full text-xs font-bold">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                QUANTUM RESISTANT
              </div>
            )}
          </div>
          
          {/* Breakdown Chips */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-surface-container-high rounded-xl flex flex-col items-center gap-1">
              <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">Length</span>
              <span className="text-xl font-bold text-on-surface">{stats.length}</span>
            </div>
            <div className="p-4 bg-surface-container-high rounded-xl flex flex-col items-center gap-1">
              <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">Digits</span>
              <span className="text-xl font-bold text-on-surface">{stats.digits}</span>
            </div>
            <div className="p-4 bg-surface-container-high rounded-xl flex flex-col items-center gap-1">
              <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">Symbols</span>
              <span className="text-xl font-bold text-on-surface">{stats.symbols}</span>
            </div>
            <div className="p-4 bg-surface-container-high rounded-xl flex flex-col items-center gap-1">
              <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">Entropy</span>
              <span className="text-xl font-bold text-on-surface">{stats.entropy}<span className="text-xs ml-1 opacity-50">bits</span></span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bento Tips Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/5 space-y-4 z-10">
          <div className="w-12 h-12 rounded-2xl bg-secondary-container/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
          </div>
          <h3 className="font-headline text-lg font-bold text-[#E8EEF4]">Security Tip: Phrases over Words</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Use "passphrases"—random sequences of four or more words. They are easier for humans to remember but exponentially harder for computers to brute-force.
          </p>
        </div>
        
        <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/5 space-y-4 z-10">
          <div className="w-12 h-12 rounded-2xl bg-primary-container/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
          </div>
          <h3 className="font-headline text-lg font-bold text-[#E8EEF4]">Cognitive Load</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            This password shows high character variance. Ensure you have stored it in your Vaultly Sanctuary as complex strings are prone to human memory leakage.
          </p>
        </div>
      </div>
      
      {/* Background Aesthetic Elements */}
      <div className="fixed bottom-0 right-0 p-12 opacity-5 pointer-events-none z-0">
        <span className="material-symbols-outlined text-[20rem]" style={{ fontVariationSettings: "'wght' 100" }}>shield</span>
      </div>
    </div>
  );
};

export default StrengthTester;
