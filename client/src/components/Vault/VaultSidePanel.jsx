import React, { useState, useEffect } from 'react';
import { calculateStrength } from '../../utils/passwordUtils';

const VaultSidePanel = ({ isOpen, onClose, entry, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    username: '',
    password: '',
    notes: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (entry) {
      setFormData({
        name: entry.appName || '',
        url: entry.siteUrl || '',
        username: entry.username || '',
        password: entry.password || '',
        notes: entry.notes || '',
      });
    } else {
      setFormData({
        name: '', url: '', username: '', password: '', notes: ''
      });
    }
    setShowPassword(false);
  }, [entry, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
    } finally {
      setIsSaving(false);
    }
  };

  const strength = calculateStrength(formData.password || '');
  const isEditing = !!(entry && entry._id);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-50 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      ></div>
      <aside 
        className={`fixed right-0 top-0 h-full w-full max-w-[400px] bg-surface-container-low flex flex-col z-50 shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-[110%]'} lg:sticky lg:inset-y-auto lg:h-[calc(100vh-140px)] lg:top-8 lg:rounded-3xl lg:translate-x-0 ${!isOpen && 'lg:hidden'}`}
      >
        <div className="p-8 pb-4 flex items-center justify-between shrink-0">
          <h3 className="font-headline font-extrabold text-xl text-on-surface tracking-tight">{isEditing ? 'Edit Entry' : 'New Entry'}</h3>
          <div className="flex items-center gap-3">
             {/* Dynamic Security Indicator */}
             <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary hidden sm:inline">Secure Session</span>
             </div>
             <button onClick={onClose} className="p-1 text-on-surface-variant hover:bg-surface-container rounded-lg lg:hidden focus:outline-none">
               <span className="material-symbols-outlined text-xl">close</span>
             </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-8 py-4 space-y-6 custom-scrollbar">
          {/* Header Graphic */}
          <div className="relative group mb-6 hidden sm:block">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-container rounded-2xl flex items-center justify-center rotate-3 transition-transform shadow-xl shadow-primary/20 hover:rotate-0">
              <span className="material-symbols-outlined text-on-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield_person</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant">App Name</label>
            <input 
              className="w-full bg-surface-container outline-none border-none rounded-xl py-3 px-4 text-sm focus:ring-1 focus:ring-primary/40 text-on-surface transition-all placeholder:text-on-surface-variant/40" 
              type="text" 
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Google Workspace"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant">Website URL</label>
            <input 
              className="w-full bg-surface-container outline-none border-none rounded-xl py-3 px-4 text-sm focus:ring-1 focus:ring-primary/40 text-on-surface transition-all placeholder:text-on-surface-variant/40" 
              type="text" 
              value={formData.url}
              onChange={e => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant">Username / Email</label>
            <input 
              className="w-full bg-surface-container outline-none border-none rounded-xl py-3 px-4 text-sm focus:ring-1 focus:ring-primary/40 text-on-surface transition-all placeholder:text-on-surface-variant/40" 
              type="text" 
              value={formData.username}
              onChange={e => setFormData({ ...formData, username: e.target.value })}
              placeholder="alex@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-end mb-1">
              <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant">Password</label>
              <span className={`text-[10px] font-bold ${formData.password ? strength.textClass : 'text-on-surface-variant'}`}>{formData.password ? strength.label : ''}</span>
            </div>
            <div className="relative">
              <input 
                className="w-full bg-surface-container outline-none border-none rounded-xl py-3 px-4 text-sm font-mono tracking-widest focus:ring-1 focus:ring-primary/40 text-on-surface transition-all pr-12" 
                type={showPassword ? 'text' : 'password'} 
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />
              <button 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
              >
                <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
            <div className="pt-2">
              <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                <div className={`h-full ${strength.color} rounded-full transition-all duration-300`} style={{ width: `${formData.password ? strength.percent : 0}%` }}></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant">Notes</label>
            <textarea 
              className="w-full bg-surface-container outline-none border-none rounded-xl py-3 px-4 text-sm resize-none focus:ring-1 focus:ring-primary/40 text-on-surface transition-all placeholder:text-on-surface-variant/40" 
              rows="4"
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional information..."
            ></textarea>
          </div>
        </div>
        
        <div className="p-6 md:p-8 shrink-0 bg-surface-container-low border-t border-outline-variant/10 flex gap-3 rounded-b-3xl">
          <button 
            onClick={onClose} 
            className="flex-1 py-3 text-sm font-bold bg-surface-container text-on-surface rounded-xl hover:bg-surface-container-highest transition-colors"
          >
            Discard
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="flex-[2] py-3 text-sm font-bold bg-primary text-on-primary rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/10 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <><div className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />Saving…</>
            ) : 'Save Changes'}
          </button>
        </div>
      </aside>
    </>
  );
};

export default VaultSidePanel;
