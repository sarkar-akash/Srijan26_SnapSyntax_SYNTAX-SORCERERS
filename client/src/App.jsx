import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Shared/Layout';
import GeneratorPage from './pages/GeneratorPage';
import VaultPage from './pages/VaultPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/Shared/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Protected Routes wrapped in Layout */}
      <Route 
        path="/generator" 
        element={
          <ProtectedRoute>
            <Layout>
              <GeneratorPage />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/vault" 
        element={
          <ProtectedRoute>
            <Layout>
              <VaultPage />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/generator" replace />} />
    </Routes>
  );
}

export default App;
