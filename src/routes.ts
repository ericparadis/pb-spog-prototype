import { lazy } from 'react'
import { UserRole } from '@/lib/contexts/AuthContext'

// Lazy load feature pages
const Dashboard = lazy(() => import('@/features/dashboard/index'))
const MemberManagement = lazy(() => import('@/features/member-management/index'))
const ClassSchedule = lazy(() => import('@/features/class-schedule/index'))
const CheckIn = lazy(() => import('@/features/check-in/index'))

export interface Route {
  path: string
  element: React.LazyExoticComponent<() => JSX.Element>
  allowedRoles?: UserRole[]
}

export const routes: Route[] = [
  {
    path: '/',
    element: Dashboard,
    allowedRoles: ['franchise-owner', 'regional-manager', 'gym-manager'],
  },
  {
    path: '/members',
    element: MemberManagement,
    allowedRoles: ['franchise-owner', 'regional-manager', 'gym-manager', 'front-desk'],
  },
  {
    path: '/schedule',
    element: ClassSchedule,
    // All roles can access schedule
  },
  {
    path: '/check-in',
    element: CheckIn,
    allowedRoles: ['front-desk'],
  },
]
