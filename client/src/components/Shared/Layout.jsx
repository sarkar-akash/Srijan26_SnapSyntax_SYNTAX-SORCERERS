import React, { useState } from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface flex selection:bg-primary/20 selection:text-primary">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main Content Area Container */}
      <div className="flex-1 flex flex-col md:ml-64 h-screen overflow-hidden">
        
        {/* Mobile Header Bar - Only visible on small screens */}
        <header className="md:hidden h-16 bg-surface-container-low/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 border-b border-outline-variant/10 relative z-30">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            </div>
            <h2 className="text-base font-headline font-bold text-primary tracking-tight">Vaultly</h2>
          </div>
          
          <button 
            className="p-1.5 text-on-surface hover:text-primary rounded bg-surface-container border border-outline-variant/20 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="material-symbols-outlined text-xl block">menu</span>
          </button>
        </header>

        {/* Scrollable Main Content area directly mapping to the main canvas */}
        <main className="flex-1 overflow-y-auto w-full max-w-full bg-surface custom-scrollbar">
          {children}
        </main>
      </div>

      {/* Visual Polish: Soft Grain Overlay from Stitch Design Rules */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999]" 
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}
      ></div>
    </div>
  );
};

export default Layout;
