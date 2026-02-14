export type LeadStatus =
  | 'lead'
  | 'missed-guest'
  | 'appt-no-show'
  | 'lead-remarketing'
  | 'expired-guest'
  | 'appt-booked'

export type LeadPriority = 1 | 2 | 3 | 4 | 5

export interface LeadTableRow {
  id: string
  name: string
  email: string
  phone: string
  status: LeadStatus
  priority: LeadPriority
  source: string
  assignedStaff: string
  appointment: string
  lastActivity: string
  daysOpen: number
}
