import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { authApi } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('access_token') || '')
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('auth_user')
    return raw ? JSON.parse(raw) : null
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('auth_user')
      return
    }
    localStorage.setItem('access_token', token)
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user))
    }
  }, [token, user])

  const login = async (payload) => {
    setLoading(true)
    try {
      const { data } = await authApi.login(payload)
      setToken(data.access_token)
      setUser(data.user)
      return data
    } finally {
      setLoading(false)
    }
  }

  const register = async (payload) => {
    setLoading(true)
    try {
      const { data } = await authApi.register(payload)
      setToken(data.access_token)
      setUser(data.user)
      return data
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setToken('')
    setUser(null)
    localStorage.removeItem('access_token')
    localStorage.removeItem('auth_user')
  }

  const updateUser = (updates) => {
    setUser((currentUser) => (currentUser ? { ...currentUser, ...updates } : currentUser))
  }

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
      updateUser,
    }),
    [token, user, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
