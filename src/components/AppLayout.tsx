import { ReactNode, useState } from 'react'
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
  ChevronDown,
} from 'lucide-react'
import { useBrand } from '@/lib/contexts/BrandContext'
import { useAuth } from '@/lib/contexts/AuthContext'
import { useLocationContext } from '@/lib/contexts/LocationContext'

interface AppLayoutProps {
  children: ReactNode
}

interface NavChild {
  path: string
  label: string
}

interface NavItem {
  path: string
  label: string
  icon: typeof LayoutDashboard
  badge?: string
  hasSubmenu?: boolean
  children?: NavChild[]
}

interface NavSection {
  title?: string
  items: NavItem[]
}

// Map route paths to page titles for the header
const routeTitles: Record<string, string> = {
  '/': 'Overview',
  '/tasks': 'Tasks',
  '/conversations': 'Conversations',
  '/schedule': 'Schedule',
  '/customers': 'Customers',
  '/members': 'Members',
  '/marketing': 'Marketing',
  '/resources': 'Resources',
  '/reporting': 'Reporting',
  '/locations': 'Location Management',
  '/staff': 'Staff Management',
  '/memberships': 'Memberships & Packages',
  '/catalog': 'Catalog Administration',
}

export function AppLayout({ children }: AppLayoutProps) {
  const { currentBrand } = useBrand()
  const { user } = useAuth()
  const { currentLocation, locations, switchLocation } = useLocationContext()
  const location = useLocation()
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false)

  const navSections: NavSection[] = [
    {
      items: [
        { path: '/', label: 'Overview', icon: LayoutDashboard },
        { path: '/tasks', label: 'Tasks', icon: CheckSquare, badge: '10' },
        { path: '/conversations', label: 'Conversations', icon: MessageSquare, badge: '8' },
        { path: '/schedule', label: 'Schedule', icon: Calendar, hasSubmenu: true },
        { path: '/customers', label: 'Customers', icon: UserCircle, badge: '2' },
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

  // Check if a child route of this item is currently active
  const isChildActive = (item: NavItem) =>
    item.children?.some((child) => location.pathname === child.path) ?? false

  // Auto-expand items whose children match the current path
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => {
    const initial = new Set<string>()
    for (const section of navSections) {
      for (const item of section.items) {
        if (item.children?.some((child) => location.pathname === child.path)) {
          initial.add(item.path)
        }
      }
    }
    return initial
  })

  const toggleExpand = (path: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev)
      if (next.has(path)) {
        next.delete(path)
      } else {
        next.add(path)
      }
      return next
    })
  }

  const pageTitle = routeTitles[location.pathname] || 'Overview'

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

        {/* Location Selector */}
        {currentLocation && (
          <div className="px-4 py-4 relative">
            <button
              onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
              className="flex items-center gap-3 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-left hover:bg-muted/50 transition-colors"
            >
              <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">
                  {currentLocation.name.replace(/^(Anytime Fitness|Orangetheory Fitness)\s*/, '')}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {currentLocation.city}, {currentLocation.state} {currentLocation.zip}
                </div>
              </div>
              <ChevronDown className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform ${locationDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {locationDropdownOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setLocationDropdownOpen(false)} />
                <div className="absolute left-4 right-4 top-full mt-1 z-40 rounded-lg border border-border bg-white shadow-lg overflow-hidden">
                  {locations.map((loc) => {
                    const isActive = loc.id === currentLocation.id
                    return (
                      <button
                        key={loc.id}
                        onClick={() => {
                          switchLocation(loc.id)
                          setLocationDropdownOpen(false)
                        }}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 text-left transition-colors ${
                          isActive ? 'bg-muted' : 'hover:bg-muted/50'
                        }`}
                      >
                        <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground truncate">
                            {loc.name.replace(/^(Anytime Fitness|Orangetheory Fitness)\s*/, '')}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {loc.city}, {loc.state} {loc.zip}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        )}

        <div className="border-b border-border" />

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
                  const hasChildren = item.children && item.children.length > 0
                  const isExpanded = expandedItems.has(item.path) || isChildActive(item)
                  const isActive = location.pathname === item.path
                  const childActive = isChildActive(item)

                  return (
                    <div key={item.path}>
                      {hasChildren ? (
                        // Parent with children: button that toggles expand
                        <button
                          onClick={() => toggleExpand(item.path)}
                          className={`flex items-center gap-3 mx-3 px-3 h-[44px] rounded-lg text-[13px] font-medium transition-colors w-[calc(100%-24px)] text-left ${
                            childActive
                              ? 'bg-primary/10'
                              : 'hover:bg-muted'
                          }`}
                          style={{
                            letterSpacing: '-0.234px',
                            color: 'hsl(var(--sidebar-text))',
                          }}
                        >
                          <Icon className="h-5 w-5 flex-shrink-0" />
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform" />
                          ) : (
                            <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform" />
                          )}
                        </button>
                      ) : (
                        // Leaf item: Link (existing behavior)
                        <Link
                          to={item.path}
                          className={`flex items-center gap-3 mx-3 px-3 h-[44px] rounded-lg text-[13px] font-medium transition-colors ${
                            isActive
                              ? 'bg-white border border-border shadow-sm text-primary'
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
                      )}

                      {/* Render child subnav items when expanded */}
                      {hasChildren && isExpanded && (
                        <div className="mt-0.5 space-y-0.5">
                          {item.children!.map((child) => {
                            const isChildRouteActive = location.pathname === child.path
                            return (
                              <Link
                                key={child.path}
                                to={child.path}
                                className={`flex items-center mx-3 pl-11 pr-3 h-[36px] rounded-lg text-[13px] font-medium transition-colors ${
                                  isChildRouteActive
                                    ? 'bg-white border border-border shadow-sm text-primary'
                                    : 'hover:bg-muted'
                                }`}
                                style={{
                                  letterSpacing: '-0.234px',
                                  ...(!isChildRouteActive ? { color: 'hsl(var(--sidebar-text))' } : {}),
                                }}
                              >
                                {child.label}
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header - 80px high from Figma */}
        <header className="h-[80px] border-b border-border bg-card flex items-center justify-between px-8">
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">
              {pageTitle}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">
                {user?.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {user?.role}
              </div>
            </div>
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
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
