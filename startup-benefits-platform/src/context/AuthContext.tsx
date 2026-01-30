'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type User = {
  _id: string
  name: string
  email: string
  isVerified: boolean
  isPremium: boolean
}

type AuthContextType = {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('sb_user')
    const storedToken = localStorage.getItem('sb_token')

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
    }
  }, [])

  const login = (user: User, token: string) => {
    localStorage.setItem('sb_user', JSON.stringify(user))
    localStorage.setItem('sb_token', token)
    setUser(user)
    setToken(token)
  }

  const logout = () => {
    localStorage.clear()
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)!
