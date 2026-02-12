import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { BrandSwitcher } from './BrandSwitcher'
import { RoleSwitcher } from './RoleSwitcher'
import { useBrand } from '@/lib/contexts/BrandContext'
import { useAuth } from '@/lib/contexts/AuthContext'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { currentBrand } = useBrand()
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded" />
              <span className="text-xl font-bold text-foreground">
                {currentBrand.displayName}
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-4">
              <Link
                to="/"
                className="text-sm font-medium text-foreground hover:text-primary"
              >
                Dashboard
              </Link>
              <Link
                to="/members"
                className="text-sm font-medium text-foreground hover:text-primary"
              >
                Members
              </Link>
              <Link
                to="/schedule"
                className="text-sm font-medium text-foreground hover:text-primary"
              >
                Schedule
              </Link>
              <Link
                to="/check-in"
                className="text-sm font-medium text-foreground hover:text-primary"
              >
                Check-In
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <BrandSwitcher />
            <RoleSwitcher />
            <div className="text-sm text-muted-foreground">{user?.name}</div>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  )
}
