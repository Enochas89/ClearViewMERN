import React, { createContext, useContext, useState, useEffect } from 'react'
import { login } from '../api/auth'

const Ctx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('cv_user')
    if (saved) setUser(JSON.parse(saved))
  }, [])

  const signIn = async (email) => {
    const u = await login(email)
    setUser(u)
    localStorage.setItem('cv_user', JSON.stringify(u))
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('cv_user')
  }

  return <Ctx.Provider value={{ user, signIn, signOut }}>{children}</Ctx.Provider>
}

export const useAuth = () => useContext(Ctx)
