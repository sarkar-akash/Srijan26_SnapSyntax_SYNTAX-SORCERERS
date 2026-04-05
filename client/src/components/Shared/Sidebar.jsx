import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const activePage = location.pathname.includes('vault') ? 'vault' : 'generator';
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-surface-container-lowest/80 backdrop-blur-sm z-40 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 left-0 h-screen w-64 bg-surface-container-low flex flex-col py-6 transition-transform duration-300 z-50 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Section */}
        <div className="px-6 mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            </div>
            <div>
              <h2 className="text-xl font-headline font-bold text-primary tracking-tight leading-none">Vaultly</h2>
              <p className="text-[10px] font-body text-on-surface-variant uppercase tracking-widest mt-1 opacity-50">Digital Sanctuary</p>
            </div>
          </div>
          
          {/* Mobile Close Button */}
          <button 
            className="md:hidden text-on-surface-variant hover:text-on-surface p-1 rounded-lg transition-colors" 
            onClick={() => setIsOpen(false)}
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1">
          <Link 
            to="/generator"
            onClick={() => setIsOpen(false)}
            className={`w-full text-left flex items-center gap-3 px-4 py-3 transition-all ${
              activePage === 'generator' 
                ? 'text-primary border-l-4 border-primary bg-surface-container' 
                : 'text-on-surface opacity-60 hover:opacity-100 border-l-4 border-transparent hover:bg-surface-container hover:text-primary group'
            }`}
          >
            <span className="material-symbols-outlined">enhanced_encryption</span>
            <span className="font-semibold font-body text-sm">Generator</span>
          </Link>
          
          <Link 
            to="/vault"
            onClick={() => setIsOpen(false)}
            className={`w-full text-left flex items-center gap-3 px-4 py-3 transition-all ${
              activePage === 'vault' 
                ? 'text-primary border-l-4 border-primary bg-surface-container' 
                : 'text-on-surface opacity-60 hover:opacity-100 border-l-4 border-transparent hover:bg-surface-container hover:text-primary group'
            }`}
          >
            <span className="material-symbols-outlined group-hover:fill-current">lock</span>
            <span className="font-semibold font-body text-sm">Password Vault</span>
          </Link>
        </nav>

        {/* Logout Bottom */}
        <div className="px-6 mt-auto">
          <div className="pt-4 border-t border-outline-variant/20">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 py-2 text-on-surface-variant hover:text-error transition-all group rounded-lg focus:outline-none"
            >
              <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">logout</span>
              <span className="font-body font-bold text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
