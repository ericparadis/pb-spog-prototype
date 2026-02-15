import { lazy } from 'react'
import { UserRole } from '@/lib/contexts/AuthContext'

// Lazy load feature pages
const Dashboard = lazy(() => import('@/features/dashboard/index'))
const MemberManagement = lazy(() => import('@/features/member-management/index'))
const Leads = lazy(() => import('@/features/leads/index'))
const ClassSchedule = lazy(() => import('@/features/class-schedule/index'))
const CheckIn = lazy(() => import('@/features/check-in/index'))
const Tasks = lazy(() => import('@/features/tasks/index'))
const StaffManagement = lazy(() => import('@/features/staff-management/index'))
const CatalogAdministration = lazy(() => import('@/features/catalog/index'))

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
    path: '/customers',
    element: MemberManagement,
    allowedRoles: ['franchise-owner', 'regional-manager', 'gym-manager', 'front-desk'],
  },
  {
    path: '/customers/members',
    element: MemberManagement,
    allowedRoles: ['franchise-owner', 'regional-manager', 'gym-manager', 'front-desk'],
  },
  {
    path: '/customers/leads',
    element: Leads,
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
  {
    path: '/tasks',
    element: Tasks,
    // All roles can access tasks
  },
  {
    path: '/staff',
    element: StaffManagement,
    allowedRoles: ['franchise-owner', 'regional-manager', 'gym-manager'],
  },
  {
    path: '/catalog',
    element: CatalogAdministration,
    allowedRoles: ['franchise-owner', 'regional-manager', 'gym-manager'],
  },
]
