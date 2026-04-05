import React, { useState } from 'react';
import toast from 'react-hot-toast';

const VaultCard = ({ entry, onEdit, onDelete, viewMode = 'card' }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleCopy = () => {
    if (!entry.password) return;
    navigator.clipboard.writeText(entry.password).then(() => {
      toast.success('Password copied to clipboard.');
    }).catch(() => {
      toast.error('Failed to copy password.');
    });
  };

  // Helper to dynamically render icon based on entry metadata or a letter avatar fallback
  const renderIcon = () => {
    if (entry.logoUrl) {
      return <img src={entry.logoUrl} alt={entry.appName} className="w-full h-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />;
    } else if (entry.letterIcon) {
      return (
        <div
          className="w-full h-full rounded flex items-center justify-center text-white font-black text-xl"
          style={{ backgroundColor: entry.color || '#E50914' }}
        >
          {entry.letterIcon}
        </div>
      );
    } else if (entry.materialIcon) {
      return (
        <span
          className={`material-symbols-outlined text-3xl ${entry.iconColor || 'text-on-surface'}`}
          style={entry.iconColor ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          {entry.materialIcon}
        </span>
      );
    } else {
      // Auto letter avatar from appName for real API entries
      const letter = (entry.appName || 'V').charAt(0).toUpperCase();
      return (
        <div className="w-full h-full rounded flex items-center justify-center bg-primary/20">
          <span className="font-black text-xl text-primary">{letter}</span>
        </div>
      );
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="group flex items-center gap-4 bg-surface-container rounded-2xl md:rounded-3xl p-3 md:p-4 transition-all duration-300 hover:bg-surface-container-high border border-transparent hover:border-outline-variant/10">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-surface-container-highest flex items-center justify-center p-2 flex-shrink-0">
          {renderIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-headline font-bold text-sm md:text-base text-on-surface truncate">{entry.appName}</h3>
          <p className="text-xs text-on-surface-variant truncate">{entry.username}</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-surface-container-lowest py-1.5 px-3 rounded-lg border border-outline-variant/5 min-w-[170px]">
          <code className="font-mono text-xs tracking-widest text-on-surface-variant/60 truncate flex-1">
            {showPassword ? entry.password : '••••••••••••'}
          </code>
          <button
            className="text-primary hover:text-primary-fixed transition-colors focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? 'Hide password' : 'Reveal password'}
          >
            <span className="material-symbols-outlined text-base">{showPassword ? 'visibility_off' : 'visibility'}</span>
          </button>
        </div>
        <div className="flex items-center gap-0.5 md:gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="p-1.5 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
            onClick={handleCopy}
            title="Copy password"
          >
            <span className="material-symbols-outlined text-lg">content_copy</span>
          </button>
          <button
            onClick={() => onEdit(entry)}
            className="p-1.5 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
            title="Edit"
          >
            <span className="material-symbols-outlined text-lg">edit</span>
          </button>
          <button
            onClick={() => onDelete(entry._id)}
            className="p-1.5 text-on-surface-variant hover:text-error transition-colors focus:outline-none"
            title="Delete"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-surface-container rounded-[2rem] p-6 transition-all duration-300 hover:bg-surface-container-high border border-transparent hover:border-outline-variant/10">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center p-2">
          {renderIcon()}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(entry)}
            className="p-1.5 text-on-surface-variant hover:text-primary transition-colors focus:opacity-100 focus:outline-none"
            title="Edit"
          >
            <span className="material-symbols-outlined text-lg">edit</span>
          </button>
          <button
            onClick={() => onDelete(entry._id)}
            className="p-1.5 text-on-surface-variant hover:text-error transition-colors focus:opacity-100 focus:outline-none"
            title="Delete"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
        </div>
      </div>
      <div>
        <h3 className="font-headline font-bold text-lg text-on-surface truncate pr-2">{entry.appName}</h3>
        <p className="text-sm text-on-surface-variant mb-4 truncate pr-2">{entry.username}</p>
        <div className="flex items-center justify-between bg-surface-container-lowest py-2 px-3 rounded-lg overflow-hidden border border-outline-variant/5">
          <code className="font-mono text-sm tracking-widest text-on-surface-variant/60 truncate pr-2">
            {showPassword ? entry.password : '••••••••••••'}
          </code>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
              onClick={handleCopy}
              title="Copy password"
            >
              <span className="material-symbols-outlined text-lg">content_copy</span>
            </button>
            <button
              className="text-primary hover:text-primary-fixed transition-colors focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Hide password' : 'Reveal password'}
            >
              <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultCard;
