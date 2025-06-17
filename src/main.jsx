// src/main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Login from './components/Login'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import './index.css'

// Root component decides which screen to show based on auth state
const Root = () => {
  const { user, loading } = useAuth()

  if (loading) {
    // You can customize a loading spinner here
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return user ? <App /> : <Login />
}

// Mount the app
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Root />
  </AuthProvider>
)
