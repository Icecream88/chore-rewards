// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState('child')
  const [viewMode, setViewMode] = useState(
    () => localStorage.getItem('viewMode') || 'parent'
  )
  const [loading, setLoading] = useState(true)

  // Keep viewMode in sync with localStorage
  useEffect(() => {
    localStorage.setItem('viewMode', viewMode)
  }, [viewMode])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u)
      if (u) {
        const storedRole = localStorage.getItem(`role:${u.uid}`)
        setRole(storedRole === 'parent' ? 'parent' : 'child')
      } else {
        setRole('child')
      }
      setLoading(false)
    })
    return unsub
  }, [])

  const login  = (email, pass) => signInWithEmailAndPassword(auth, email, pass)
  const signup = async (email, pass, signupRole) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass)
    localStorage.setItem(`role:${cred.user.uid}`, signupRole)
    return cred
  }
  const logout = () => signOut(auth)

  return (
    <AuthContext.Provider value={{
      user,
      role,
      viewMode,
      setViewMode,
      loading,
      login,
      signup,
      logout
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
