import { createContext, useContext, useState, ReactNode } from 'react'

export type UserRole =
  | 'franchise-owner'
  | 'regional-manager'
  | 'gym-manager'
  | 'front-desk'
  | 'trainer'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  brandId: string
  locationIds: string[]
}

interface AuthContextType {
  user: User | null
  role: UserRole
  isAuthenticated: boolean
  switchRole: (role: UserRole) => void
  login: (email: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    id: 'demo-user',
    name: 'Demo User',
    email: 'demo@fitzone.com',
    role: 'franchise-owner',
    brandId: 'fitzone',
    locationIds: ['loc-1', 'loc-2', 'loc-3'],
  })

  const switchRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role })
    }
  }

  const login = (email: string, password: string) => {
    // Mock login implementation
    setUser({
      id: 'demo-user',
      name: 'Demo User',
      email,
      role: 'franchise-owner',
      brandId: 'fitzone',
      locationIds: ['loc-1', 'loc-2', 'loc-3'],
    })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'front-desk',
        isAuthenticated: !!user,
        switchRole,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
