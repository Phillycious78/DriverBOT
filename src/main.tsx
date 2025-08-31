import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { DataProvider } from './contexts/DataContext.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DataProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </DataProvider>
  </React.StrictMode>,
)