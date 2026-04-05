import React, { useState, useRef, useEffect } from 'react';

const VaultTopBar = ({ filter, setFilter, onAdd }) => {
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

  return (
    <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 w-full z-40 font-['Inter'] text-sm tracking-wide">
      <div className="flex items-center flex-1 w-full max-w-xl">
        <div className="relative w-full group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
          <input 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-surface-container border-none rounded-full py-3 pl-10 pr-4 text-sm text-on-surface focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-on-surface-variant/40 outline-none" 
            placeholder="Search your vault..." 
            type="text" 
          />
        </div>
      </div>
      <div className="flex items-center gap-4 lg:gap-6 w-full md:w-auto justify-between md:justify-end">
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
                <button className="w-full mt-4 py-2 text-xs font-bold text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  View all activity
                </button>
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
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-primary text-xl">sync</span>
                    <div>
                      <p className="text-on-surface text-xs font-bold">Auto-Sync</p>
                      <p className="text-on-surface-variant text-[11px] leading-relaxed">Changes in your vault are synced across all your devices.</p>
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
        <button 
          onClick={onAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-xl shadow-lg shadow-primary/10 hover:brightness-110 transition-all"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          <span className="hidden md:inline">Add Password</span>
        </button>
      </div>
    </header>
  );
};

export default VaultTopBar;
