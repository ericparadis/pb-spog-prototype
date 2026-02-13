import type { LeadTableRow, LeadStatus, LeadPriority } from '../types'

const statuses: LeadStatus[] = [
  'lead',
  'missed-guest',
  'appt-no-show',
  'lead-remarketing',
  'expired-guest',
  'appt-booked',
]

const priorities: LeadPriority[] = ['high', 'medium', 'low']

const sources = [
  'Referral',
  'Instagram',
  'Website',
  'Google Ads',
  'Walk-in',
  'Facebook',
]

const staffNames = [
  'Michael Torres',
  'Sarah Mitchell',
  'David Chen',
  'Jessica Park',
  'Ryan Cooper',
]

const leadNames = [
  'Amanda Foster',
  'Brian Mitchell',
  'Carlos Rivera',
  'Diana Chang',
  'Elena Petrov',
  'Fernando Lopez',
  'Grace Kim',
  'Henry Walsh',
  'Isabella Santos',
  'James Cooper',
  'Karen Thompson',
  'Luis Hernandez',
  'Monica Williams',
  'Nathan Brooks',
  'Olivia Martinez',
]

function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatAppointment(seed: number): string {
  // Some leads have no appointment
  if (seed % 4 === 0) return 'N/A'
  if (seed % 5 === 0) return 'Not Scheduled'

  const daysAhead = (seed % 14) + 1
  const date = new Date()
  date.setDate(date.getDate() + daysAhead)

  const hours = 9 + (seed % 9) // 9 AM to 5 PM
  const minutes = (seed % 2) === 0 ? '00' : '30'
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHour = hours > 12 ? hours - 12 : hours

  return `${formatDate(date)}, ${displayHour}:${minutes} ${period}`
}

export function getLeadTableData(): LeadTableRow[] {
  return leadNames.map((name, index) => {
    const seed = hashCode(`lead-${index}`)

    const daysOpen = (seed % 90) + 1
    const lastActivityDaysAgo = seed % Math.min(daysOpen, 30)
    const lastActivityDate = new Date()
    lastActivityDate.setDate(lastActivityDate.getDate() - lastActivityDaysAgo)

    return {
      id: `lead-${index + 1}`,
      name,
      status: statuses[seed % statuses.length],
      priority: priorities[seed % priorities.length],
      source: sources[seed % sources.length],
      assignedStaff: staffNames[seed % staffNames.length],
      appointment: formatAppointment(seed),
      lastActivity: formatDate(lastActivityDate),
      daysOpen,
    }
  })
}
