import React, { useState } from 'react';

const OutputDisplay = ({ password, strength }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (password && password !== 'SELECT AT LEAST ONE CHARACTER SET') {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-surface-container-low p-6 md:p-8 rounded-2xl shadow-xl border border-outline-variant/5">
      <div className="relative group">
        <div className="w-full bg-surface-container-highest p-4 md:p-6 rounded-xl border-b-2 border-primary/40 flex items-center justify-between min-w-0">
          <span className="monospace-font text-xl sm:text-2xl md:text-3xl font-medium text-primary tracking-wider truncate flex-1 min-w-0">
            {password || '----------------'}
          </span>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleCopy}
              className="p-3 text-primary hover:bg-primary/10 rounded-lg transition-all" 
              title="Copy to clipboard"
            >
              <span className="material-symbols-outlined">{copied ? 'check' : 'content_copy'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-8">
        <div className="flex justify-between items-end mb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Security Strength</span>
          <span className="text-sm font-bold text-primary">{strength.label}</span>
        </div>
        <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${strength.gradient} transition-all duration-1000`} 
            style={{ width: `${strength.percent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default OutputDisplay;
