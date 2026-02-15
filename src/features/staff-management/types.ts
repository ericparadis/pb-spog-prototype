export interface StaffTableRow {
  id: string
  name: string
  email: string
  phone: string
  title: string
  role: string
  locations: string[]
  locationIds: string[]
  status: 'Active' | 'Inactive'
  hireDate: string
  certifications: string[]
  specialties: string[]
  bio: string
}
