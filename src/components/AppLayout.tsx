import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  CheckSquare,
  MessageSquare,
  MapPin,
  Users,
  CreditCard,
  Package,
  Calendar,
  UserCircle,
  Megaphone,
  BookOpen,
  BarChart3,
  ChevronRight,
} from 'lucide-react'
import { useBrand } from '@/lib/contexts/BrandContext'
import { useAuth } from '@/lib/contexts/AuthContext'

interface AppLayoutProps {
  children: ReactNode
}

interface NavItem {
  path: string
  label: string
  icon: typeof LayoutDashboard
  badge?: string
  hasSubmenu?: boolean
}

interface NavSection {
  title?: string
  items: NavItem[]
}

export function AppLayout({ children }: AppLayoutProps) {
  const { currentBrand } = useBrand()
  const { user } = useAuth()
  const location = useLocation()

  const navSections: NavSection[] = [
    {
      items: [
        { path: '/', label: 'Overview', icon: LayoutDashboard },
        { path: '/tasks', label: 'Tasks', icon: CheckSquare, badge: '10' },
        { path: '/conversations', label: 'Conversations', icon: MessageSquare, badge: '8' },
        { path: '/schedule', label: 'Schedule', icon: Calendar, hasSubmenu: true },
        { path: '/customers', label: 'Customers', icon: UserCircle, badge: '2', hasSubmenu: true },
        { path: '/marketing', label: 'Marketing', icon: Megaphone, hasSubmenu: true },
        { path: '/resources', label: 'Resources', icon: BookOpen, hasSubmenu: true },
        { path: '/reporting', label: 'Reporting', icon: BarChart3, hasSubmenu: true },
      ],
    },
    {
      title: 'ADMIN',
      items: [
        { path: '/locations', label: 'Location Management', icon: MapPin },
        { path: '/staff', label: 'Staff Management', icon: Users },
        { path: '/memberships', label: 'Memberships & Packages', icon: CreditCard },
        { path: '/catalog', label: 'Catalog Administration', icon: Package },
      ],
    },
  ]

  return (
    <div className="flex min-h-screen bg-background font-sans">
      {/* Left Sidebar - 280px wide from Figma */}
      <aside className="w-[280px] border-r border-border flex flex-col" style={{ backgroundColor: 'hsl(var(--sidebar-bg))' }}>
        {/* Logo & Brand - 74.23px high from Figma */}
        <div className="h-[74px] px-6 flex items-center justify-center border-b border-border">
          <Link to="/" className="flex items-center">
            <img
              src={currentBrand.logo}
              alt={currentBrand.displayName}
              className="h-9 max-w-[200px] object-contain"
            />
          </Link>
        </div>

        {/* Navigation - exact Figma specs */}
        <nav className="flex-1 overflow-y-auto py-6">
          {navSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {sectionIndex > 0 && (
                <div className="mx-6 my-4 border-t border-border" />
              )}
              {section.title && (
                <div
                  className="px-6 mb-3 text-[11px] font-medium uppercase tracking-[0.614px]"
                  style={{ color: 'rgb(153, 161, 175)' }}
                >
                  {section.title}
                </div>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 mx-3 px-3 h-[44px] rounded-lg text-[13px] font-medium transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                      style={{
                        letterSpacing: '-0.234px',
                        ...(!isActive ? { color: 'hsl(var(--sidebar-text))' } : {}),
                      }}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {item.hasSubmenu && (
                        <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Info - 93px high from Figma */}
        <div className="h-[93px] border-t border-border px-6 flex items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">
                {user?.name}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {user?.role}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header - 80px high from Figma */}
        <header className="h-[80px] border-b border-border bg-card flex items-center px-8">
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">
              Staff Management
            </h1>
          </div>
        </header>

        {/* Detail Body Area */}
        <main className="flex-1 overflow-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  )
}
