import React from 'react';

const BatchHistory = ({ history, onClear }) => {
  const handleCopy = (pwd) => {
    navigator.clipboard.writeText(pwd);
  };

  return (
    <div className="lg:col-span-5 flex flex-col h-[600px] lg:h-full">
      <div className="bg-surface-container-low rounded-2xl flex-1 flex flex-col border border-outline-variant/5 overflow-hidden">
        <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center shrink-0">
          <h3 className="font-bold text-on-surface flex items-center gap-2 text-base">
            <span className="material-symbols-outlined text-primary">history</span>
            Batch Results
          </h3>
          <button 
            onClick={onClear}
            className="text-[10px] font-bold uppercase text-on-surface-variant hover:text-primary transition-colors"
          >
            Clear History
          </button>
        </div>
        
        <div className="max-h-64 overflow-y-auto p-6 space-y-3 custom-scrollbar">
          {history.length === 0 && (
            <p className="text-on-surface-variant text-sm text-center mt-4">No passwords generated yet.</p>
          )}
          {history.map((item, idx) => (
            <div key={idx} className="bg-surface-container p-4 rounded-xl flex items-center justify-between group flex-shrink-0 hover:bg-surface-container-high transition-all">
              <div className="flex-1 min-w-0 pr-4">
                <p className="monospace-font text-on-surface text-sm truncate tracking-tight">{item.password}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-10 h-1 rounded-full ${item.color}`}></span>
                  <span className="text-[10px] text-on-surface-variant">{item.label}</span>
                </div>
              </div>
              <button 
                onClick={() => handleCopy(item.password)}
                className="p-2 shrink-0 text-on-surface-variant opacity-100 lg:opacity-0 lg:group-hover:opacity-100 hover:text-primary transition-all"
              >
                <span className="material-symbols-outlined text-lg">content_copy</span>
              </button>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-surface-container-high/50 text-center rounded-b-2xl shrink-0">
          <p className="text-xs text-on-surface-variant">Generated passwords are never stored on our servers.</p>
        </div>
      </div>

      {/* Security Insight Card */}
      <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-[#1c2026] to-[#10141a] border border-outline-variant/10 shrink-0">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-tertiary-container/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-tertiary">security</span>
          </div>
          <div>
            <h4 className="font-bold text-on-surface text-sm mb-1">Sanctuary Security Tip</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Longer is almost always better. A 16-character password with only letters is often stronger than an 8-character password with mixed symbols.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchHistory;
