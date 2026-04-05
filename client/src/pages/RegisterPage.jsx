import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }
    setIsLoading(true);
    try {
      await register(email, password);
      navigate('/generator');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to initialize Vault.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex selection:bg-tertiary/20 selection:text-tertiary font-body flex-col justify-center items-center p-6 relative overflow-y-auto">

      {/* Aesthetic Grain Background & Blurs using alternate tint variant */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-tertiary/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      
      <div className="flex items-center gap-3 mb-10 z-10 pt-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-tertiary to-tertiary-container flex items-center justify-center shadow-lg shadow-tertiary/20">
          <span className="material-symbols-outlined text-on-tertiary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield_locked</span>
        </div>
        <div>
          <h1 className="text-3xl font-headline font-bold text-tertiary tracking-tight leading-none">Vaultly</h1>
          <p className="text-[10px] font-body text-on-surface-variant uppercase tracking-widest mt-1 opacity-50 font-bold">Digital Sanctuary</p>
        </div>
      </div>

      <div className="w-full max-w-md bg-surface-container rounded-[2.5rem] p-8 md:p-10 z-10 border border-outline-variant/10 shadow-2xl relative overflow-hidden mb-10">
        <h2 className="text-3xl font-headline font-extrabold text-[#E8EEF4] tracking-tight mb-2">Create Sanctuary</h2>
        <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">Establish your zero-knowledge cryptographic vault today.</p>

        <form onSubmit={handleRegister} className="space-y-6">
          {error && (
            <div className="bg-error/10 text-error p-3 rounded-xl text-sm border border-error/20 mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">error</span>
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant ml-1">Email Address</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">mail</span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-xl py-3.5 pl-12 pr-4 text-sm text-[#E8EEF4] focus:ring-1 focus:ring-tertiary/40 transition-all placeholder:text-on-surface-variant/40 outline-none" 
                placeholder="alex@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant ml-1">Master Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">key</span>
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-xl py-3.5 pl-12 pr-12 text-sm font-mono tracking-widest text-[#E8EEF4] focus:ring-1 focus:ring-tertiary/40 transition-all placeholder:text-on-surface-variant/40 placeholder:tracking-normal outline-none" 
                placeholder="••••••••••••"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-tertiary transition-colors focus:outline-none">
                <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant ml-1">Confirm Master Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">enhanced_encryption</span>
              <input 
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-xl py-3.5 pl-12 pr-12 text-sm font-mono tracking-widest text-[#E8EEF4] focus:ring-1 focus:ring-tertiary/40 transition-all placeholder:text-on-surface-variant/40 placeholder:tracking-normal outline-none" 
                placeholder="••••••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full py-4 mt-2 font-bold bg-gradient-to-br from-tertiary to-tertiary-container text-on-tertiary rounded-xl hover:brightness-110 transition-all shadow-lg shadow-tertiary/10 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
            {isLoading ? (
              <><div className="w-4 h-4 border-2 border-on-tertiary/30 border-t-on-tertiary rounded-full animate-spin" />Initializing…</>
            ) : (
              <>Initialize Vault<span className="material-symbols-outlined text-lg">rocket_launch</span></>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-on-surface-variant mt-8">
          Already secured? <Link to="/login" className="text-tertiary font-bold hover:underline transition-all">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
