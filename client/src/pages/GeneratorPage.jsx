import React, { useState, useEffect, useRef } from 'react';
import OutputDisplay from '../components/Generator/OutputDisplay';
import ConfigurationPanel from '../components/Generator/ConfigurationPanel';
import ActionPanel from '../components/Generator/ActionPanel';
import BatchHistory from '../components/Generator/BatchHistory';
import StrengthTester from '../components/Generator/StrengthTester';
import { generatePassword, calculateStrength } from '../utils/passwordUtils';

const GeneratorPage = () => {
  const [activeTab, setActiveTab] = useState('generator'); // 'generator' | 'tester'

  const [options, setOptions] = useState({
    length: 16,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
    rareSymbols: false,
    manualExclusion: ''
  });
  
  const [batchCount, setBatchCount] = useState(1);
  const [history, setHistory] = useState([]);
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentStrength, setCurrentStrength] = useState({ label: '', percent: 0, gradient: '' });

  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const notificationsRef = useRef(null);
  const helpRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (helpRef.current && !helpRef.current.contains(event.target)) {
        setShowHelp(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGenerate = () => {
    let newBatch = [];
    let count = Math.min(Math.max(1, isNaN(batchCount) ? 1 : batchCount), 20); // enforce 1-20 limits securely

    for (let i = 0; i < count; i++) {
        const pwd = generatePassword(options);
        if (pwd) {
            const str = calculateStrength(pwd);
            newBatch.push({ password: pwd, label: str.label, color: str.color });
        }
    }
    
    if (newBatch.length > 0) {
      setCurrentPassword(newBatch[0].password);
      setCurrentStrength(calculateStrength(newBatch[0].password));
      setHistory(prev => [...newBatch, ...prev].slice(0, 100)); // Keep max 100 in history
    } else {
      setCurrentPassword('SELECT AT LEAST ONE CHARACTER SET');
      setCurrentStrength(calculateStrength(''));
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 py-10 lg:pt-16 lg:pb-12 h-screen flex flex-col">
      <header className="mb-10 shrink-0 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline font-extrabold text-[#E8EEF4] tracking-tight mb-2">
            {activeTab === 'generator' ? 'Password Generator' : 'Strength Tester'}
          </h1>
          <p className="text-on-surface-variant max-w-xl text-sm md:text-base">
            {activeTab === 'generator' 
              ? 'Create cryptographically strong passwords using our secure sanctuary-grade algorithms.' 
              : 'Evaluate the cryptographic resilience of your credentials using our military-grade entropy analysis engine.'}
          </p>
        </div>

        {/* Grouping Tab Switcher and Global Actions */}
        <div className="flex items-center gap-6 self-start lg:self-end z-20">
          <div className="flex items-center gap-2">
            <div className="relative" ref={notificationsRef}>
              <button 
                onClick={() => { 
                  setShowNotifications(!showNotifications); 
                  setShowHelp(false); 
                  if (!showNotifications) setHasNotifications(false);
                }}
                className={`p-2 rounded-lg transition-colors relative ${showNotifications ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container'}`}
              >
                <span className="material-symbols-outlined">notifications</span>
                {hasNotifications && <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full"></span>}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-72 bg-surface-container-high rounded-2xl border border-outline-variant/20 shadow-2xl z-50 p-4 transition-all">
                  <h3 className="text-on-surface font-headline font-bold text-sm mb-4 px-1">Notifications</h3>
                  <div className="flex flex-col items-center justify-center py-10 px-4 text-center bg-surface-container-low rounded-xl border border-outline-variant/10">
                    <span className="material-symbols-outlined text-4xl text-on-surface-variant/20 mb-3">notifications_off</span>
                    <p className="text-on-surface text-sm font-medium">All caught up!</p>
                    <p className="text-on-surface-variant text-xs mt-1">No new notifications at this time.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={helpRef}>
              <button 
                onClick={() => { setShowHelp(!showHelp); setShowNotifications(false); }}
                className={`p-2 rounded-lg transition-colors ${showHelp ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container'}`}
              >
                <span className="material-symbols-outlined">help_outline</span>
              </button>

              {showHelp && (
                <div className="absolute right-0 mt-3 w-80 bg-surface-container-high rounded-2xl border border-outline-variant/20 shadow-2xl z-50 p-5 transition-all">
                  <h3 className="text-on-surface font-headline font-bold text-sm mb-4 px-1">Vaultly Help</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <span className="material-symbols-outlined text-primary text-xl">shield</span>
                      <div>
                        <p className="text-on-surface text-xs font-bold">Secure Storage</p>
                        <p className="text-on-surface-variant text-[11px] leading-relaxed">Your data is encrypted locally before being synced to the cloud.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="material-symbols-outlined text-primary text-xl">key</span>
                      <div>
                        <p className="text-on-surface text-xs font-bold">Password Generator</p>
                        <p className="text-on-surface-variant text-[11px] leading-relaxed">Create cryptographically secure passwords with the Generator.</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-outline-variant/10">
                    <button className="w-full py-2.5 bg-primary text-on-primary text-xs font-bold rounded-xl shadow-md hover:brightness-110 transition-all">
                      Documentation
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tab Switcher matching the 'pill' aesthetics from the design system */}
          <div className="bg-surface-container-low p-1.5 rounded-xl border border-outline-variant/10 flex items-center w-full md:w-auto">
            <button 
              onClick={() => setActiveTab('generator')}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'generator' 
                  ? 'bg-surface-container-highest text-[#E8EEF4] shadow-sm' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Generator
            </button>
            <button 
              onClick={() => setActiveTab('tester')}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'tester' 
                  ? 'bg-surface-container-highest text-[#E8EEF4] shadow-sm' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Tester
            </button>
          </div>
        </div>
      </header>

      {activeTab === 'generator' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
          <div className="lg:col-span-7 space-y-6 overflow-y-auto pr-2 custom-scrollbar pb-16 lg:pb-6">
            <OutputDisplay password={currentPassword} strength={currentStrength} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ConfigurationPanel options={options} setOptions={setOptions} />
              <ActionPanel 
                batchCount={batchCount} 
                setBatchCount={setBatchCount} 
                onGenerate={handleGenerate} 
              />
            </div>
          </div>
          <BatchHistory history={history} onClear={handleClearHistory} />
        </div>
      ) : (
        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pb-16">
          <StrengthTester />
        </div>
      )}
    </div>
  );
};

export default GeneratorPage;
