import React from 'react';

const EmptyState = ({ onAdd }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-[50vh] bg-surface-container-low rounded-3xl border border-outline-variant/5 border-dashed p-8 mt-4">
      <div className="w-20 h-20 bg-surface-container flex items-center justify-center rounded-full mb-6 relative">
        <span className="material-symbols-outlined text-outline text-4xl" style={{ fontVariationSettings: "'wght' 200" }}>key_off</span>
        <div className="absolute inset-0 bg-primary/5 blur-xl rounded-full pointer-events-none"></div>
      </div>
      <h3 className="text-2xl font-headline font-extrabold text-on-surface tracking-tight mb-2">Vault is Empty</h3>
      <p className="text-on-surface-variant max-w-md text-sm leading-relaxed mb-8">
        Your digital sanctuary is secure, but empty. Add your first credential to start managing your passwords.
      </p>
      <button 
        onClick={onAdd}
        className="flex items-center gap-2 px-6 py-3 bg-surface-container text-primary font-bold rounded-xl border border-outline-variant/20 hover:border-primary/50 hover:bg-surface-container-high transition-all"
      >
        <span className="material-symbols-outlined text-lg">add</span>
        Add Password
      </button>
    </div>
  );
};

export default EmptyState;
