import React from 'react';

const ActionPanel = ({ batchCount, setBatchCount, onGenerate }) => {
  return (
    <div className="bg-surface-container p-6 rounded-2xl md:col-span-2 flex flex-col md:flex-row items-center gap-4 md:gap-6">
      <div className="flex-1 w-full">
        <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-2">Generate Multiple (1-20)</p>
        <input 
          type="number" 
          min="1" 
          max="20" 
          value={isNaN(batchCount) ? '' : batchCount}
          onChange={(e) => setBatchCount(parseInt(e.target.value, 10))}
          className="w-full md:w-32 outline-none bg-surface-container-low border-none rounded-lg text-sm text-on-surface p-2.5 focus:ring-1 focus:ring-primary/30" 
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <button 
          onClick={onGenerate}
          className="flex-1 w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-outline-variant rounded-xl text-on-surface font-bold hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined text-lg">shuffle</span>
          Shuffle
        </button>
        <button 
          onClick={onGenerate}
          className="flex-1 w-full md:w-auto flex items-center justify-center gap-2 px-10 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          Generate
        </button>
      </div>
    </div>
  );
};

export default ActionPanel;
