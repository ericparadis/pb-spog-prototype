export type LeadStatus =
  | 'lead'
  | 'missed-guest'
  | 'appt-no-show'
  | 'lead-remarketing'
  | 'expired-guest'
  | 'appt-booked'

export type LeadPriority = 'high' | 'medium' | 'low'

export interface LeadTableRow {
  id: string
  name: string
  status: LeadStatus
  priority: LeadPriority
  source: string
  assignedStaff: string
  appointment: string
  lastActivity: string
  daysOpen: number
}
