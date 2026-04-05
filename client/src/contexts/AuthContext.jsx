import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userEmail, setUserEmail] = useState(null);

  const isAuthenticated = !!token;

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token: newToken, email: returnedEmail } = response.data;
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUserEmail(returnedEmail);
    toast.success('Welcome back! Vault unlocked.');
  };

  const register = async (email, password) => {
    const response = await api.post('/auth/register', { email, password });
    const { token: newToken, email: returnedEmail } = response.data;
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUserEmail(returnedEmail);
    toast.success('Sanctuary created! Welcome to Vaultly.');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUserEmail(null);
    toast('Logged out. Stay secure.', { icon: '🔒' });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
