import React from 'react';

const Toggle = ({ label, checked, onChange }) => (
  <label className="flex items-center justify-between cursor-pointer group">
    <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">{label}</span>
    <div className="relative inline-flex items-center">
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
      <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
    </div>
  </label>
);

const ConfigurationPanel = ({ options, setOptions }) => {
  const updateOption = (key, value) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div className="bg-surface-container p-6 rounded-2xl md:col-span-2">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-on-surface text-base">Password Length</h3>
          <div className="px-4 py-1.5 bg-primary-container text-on-primary-container rounded-full text-sm font-bold monospace-font">
            {options.length} characters
          </div>
        </div>
        <input 
          type="range" 
          min="8" 
          max="128" 
          value={options.length}
          onChange={(e) => updateOption('length', parseInt(e.target.value, 10))}
          className="w-full accent-primary cursor-pointer relative z-10" 
        />
        <div className="flex justify-between mt-2 text-[10px] text-on-surface-variant font-bold uppercase">
          <span>8</span>
          <span>64</span>
          <span>128</span>
        </div>
      </div>

      <div className="bg-surface-container p-6 rounded-2xl space-y-5">
        <h3 className="font-bold text-on-surface mb-2 text-base">Characters</h3>
        <Toggle label="Uppercase (A-Z)" checked={options.uppercase} onChange={(e) => updateOption('uppercase', e.target.checked)} />
        <Toggle label="Lowercase (a-z)" checked={options.lowercase} onChange={(e) => updateOption('lowercase', e.target.checked)} />
        <Toggle label="Numbers (0-9)" checked={options.numbers} onChange={(e) => updateOption('numbers', e.target.checked)} />
        <Toggle label="Symbols (!@#$%^*)" checked={options.symbols} onChange={(e) => updateOption('symbols', e.target.checked)} />
      </div>

      <div className="bg-surface-container p-6 rounded-2xl space-y-4">
        <h3 className="font-bold text-on-surface mb-2 text-base">Filtering</h3>
        <label className="flex items-start gap-3 cursor-pointer">
          <input 
            type="checkbox" 
            checked={options.excludeAmbiguous}
            onChange={(e) => updateOption('excludeAmbiguous', e.target.checked)}
            className="mt-1 rounded border-outline-variant bg-surface-container-low text-primary focus:ring-primary/20 accent-primary" 
          />
          <span className="text-xs leading-relaxed text-on-surface-variant">Exclude ambiguous characters (O, 0, l, 1)</span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input 
            type="checkbox" 
            checked={options.rareSymbols}
            onChange={(e) => updateOption('rareSymbols', e.target.checked)}
            className="mt-1 rounded border-outline-variant bg-surface-container-low text-primary focus:ring-primary/20 accent-primary" 
          />
          <span className="text-xs leading-relaxed text-on-surface-variant">Rare symbols only (+, {'}'}, [, ~, ...)</span>
        </label>
        <div className="pt-2">
          <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-2">Manual Exclusion</p>
          <input 
            type="text" 
            value={options.manualExclusion}
            onChange={(e) => updateOption('manualExclusion', e.target.value)}
            className="w-full bg-surface-container-low outline-none border-none rounded-lg text-sm text-on-surface p-2.5 focus:ring-1 focus:ring-primary/30" 
            placeholder="e.g. abc-123" 
          />
        </div>
      </div>
    </>
  );
};

export default ConfigurationPanel;
