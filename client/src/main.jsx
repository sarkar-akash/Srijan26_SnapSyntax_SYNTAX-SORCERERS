import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1c2026',
              color: '#dfe2eb',
              border: '1px solid rgba(62,73,73,0.3)',
              borderRadius: '0.75rem',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
            },
            success: { iconTheme: { primary: '#76d6d5', secondary: '#003737' } },
            error: { iconTheme: { primary: '#ffb4ab', secondary: '#690005' } },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
