export interface Brand {
  id: string
  name: string
  displayName: string
  logo: string
  primaryColor: string
  accentColor: string
  website: string
  supportEmail: string
}

export interface Location {
  id: string
  brandId: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  email: string
  managerName: string
  capacity: number
  openingHours: {
    [key: string]: { open: string; close: string }
  }
}

export interface Member {
  id: string
  brandId: string
  locationId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  joinDate: string
  membershipId: string
  membershipStatus: 'active' | 'expired' | 'suspended' | 'cancelled'
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
  photoUrl?: string
}

export interface Membership {
  id: string
  brandId: string
  name: string
  description: string
  price: number
  billingPeriod: 'monthly' | 'quarterly' | 'annual'
  features: string[]
  classCredits: number | 'unlimited'
}

export interface Class {
  id: string
  brandId: string
  locationId: string
  name: string
  description: string
  instructorId: string
  startTime: string
  endTime: string
  capacity: number
  enrolled: number
  waitlist: number
  category: 'strength' | 'cardio' | 'yoga' | 'cycling' | 'hiit' | 'other'
}

export interface Trainer {
  id: string
  brandId: string
  locationIds: string[]
  firstName: string
  lastName: string
  email: string
  phone: string
  certifications: string[]
  specialties: string[]
  bio: string
  photoUrl?: string
  rating: number
}

export interface Equipment {
  id: string
  brandId: string
  locationId: string
  name: string
  category: string
  manufacturer: string
  purchaseDate: string
  lastMaintenance: string
  nextMaintenance: string
  status: 'operational' | 'maintenance' | 'broken'
}

export interface Transaction {
  id: string
  brandId: string
  locationId: string
  memberId: string
  amount: number
  type: 'membership' | 'class' | 'merchandise' | 'personal-training' | 'other'
  status: 'completed' | 'pending' | 'failed' | 'refunded'
  date: string
  description: string
}
