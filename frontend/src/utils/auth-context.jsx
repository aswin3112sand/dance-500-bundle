import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { fetchMe, logout as logoutRequest } from '../services/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadUser = useCallback(async () => {
    try {
      const data = await fetchMe()
      setUser(data)
    } catch (err) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  const logout = useCallback(async () => {
    await logoutRequest()
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, setUser, loading, refresh: loadUser, logout }), [user, loading, loadUser, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
