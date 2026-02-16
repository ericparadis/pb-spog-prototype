export interface StaffTableRow {
  id: string
  name: string
  firstName: string
  lastName: string
  email: string
  phone: string
  title: string
  role: string
  locations: string[]
  locationIds: string[]
  status: 'Active' | 'Inactive'
  hireDate: string
  birthdate: string
  certifications: string[]
  specialties: string[]
  bio: string
}

export interface AuditLogEntry {
  id: string
  action: string
  details: string
  performedBy: string
  timestamp: string
}
