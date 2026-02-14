import trainersJson from '@/data/trainers.json'
import locationsJson from '@/data/locations.json'
import type { StaffTableRow } from '../types'

const locationMap = new Map(
  locationsJson.map((loc) => [loc.id, loc.name])
)

// Additional staff members per brand (managers, front desk, etc.)
const additionalStaff: Array<{
  id: string
  brandId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  title: string
  role: string
  locationIds: string[]
  status: 'Active' | 'Inactive'
  hireDate: string
  certifications: string[]
  specialties: string[]
  bio: string
}> = [
  {
    id: 'staff-1',
    brandId: 'anytime-fitness',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@fitzone.example.com',
    phone: '(415) 555-1001',
    title: 'General Manager',
    role: 'gym-manager',
    locationIds: ['loc-fz-1'],
    status: 'Active',
    hireDate: '2021-03-15',
    certifications: ['CPR/AED', 'Club Management Certified'],
    specialties: ['Operations', 'Team Leadership', 'Member Retention'],
    bio: 'Experienced gym manager with 8+ years in the fitness industry.',
  },
  {
    id: 'staff-2',
    brandId: 'anytime-fitness',
    firstName: 'Mike',
    lastName: 'Chen',
    email: 'mike.chen@fitzone.example.com',
    phone: '(415) 555-1002',
    title: 'Assistant Manager',
    role: 'gym-manager',
    locationIds: ['loc-fz-2'],
    status: 'Active',
    hireDate: '2022-06-01',
    certifications: ['CPR/AED', 'NASM-CPT'],
    specialties: ['Sales', 'Member Onboarding', 'Scheduling'],
    bio: 'Passionate about fitness and helping members reach their goals.',
  },
  {
    id: 'staff-3',
    brandId: 'anytime-fitness',
    firstName: 'Jessica',
    lastName: 'Williams',
    email: 'jessica.w@fitzone.example.com',
    phone: '(415) 555-1003',
    title: 'Front Desk Associate',
    role: 'front-desk',
    locationIds: ['loc-fz-1'],
    status: 'Active',
    hireDate: '2023-09-10',
    certifications: ['CPR/AED'],
    specialties: ['Customer Service', 'Check-in Operations'],
    bio: 'Friendly and organized front desk professional.',
  },
  {
    id: 'staff-4',
    brandId: 'anytime-fitness',
    firstName: 'Ryan',
    lastName: 'Brooks',
    email: 'ryan.brooks@fitzone.example.com',
    phone: '(415) 555-1004',
    title: 'Sales Consultant',
    role: 'front-desk',
    locationIds: ['loc-fz-1', 'loc-fz-2'],
    status: 'Active',
    hireDate: '2023-01-20',
    certifications: ['Sales Mastery'],
    specialties: ['Membership Sales', 'Lead Conversion', 'Tours'],
    bio: 'Top-performing sales consultant driving membership growth.',
  },
  {
    id: 'staff-5',
    brandId: 'anytime-fitness',
    firstName: 'Emma',
    lastName: 'Wilson',
    email: 'emma.wilson@zengym.example.com',
    phone: '(415) 555-0300',
    title: 'Studio Manager',
    role: 'gym-manager',
    locationIds: ['loc-zg-1'],
    status: 'Active',
    hireDate: '2022-02-14',
    certifications: ['CPR/AED', 'RYT-200'],
    specialties: ['Wellness Programs', 'Studio Operations'],
    bio: 'Dedicated to creating a welcoming wellness environment.',
  },
  {
    id: 'staff-6',
    brandId: 'anytime-fitness',
    firstName: 'Carlos',
    lastName: 'Rivera',
    email: 'carlos.r@zengym.example.com',
    phone: '(415) 555-1005',
    title: 'Front Desk Associate',
    role: 'front-desk',
    locationIds: ['loc-zg-2'],
    status: 'Inactive',
    hireDate: '2023-04-01',
    certifications: ['CPR/AED'],
    specialties: ['Customer Service', 'Scheduling'],
    bio: 'Currently on leave.',
  },
  {
    id: 'staff-7',
    brandId: 'orangetheory',
    firstName: 'David',
    lastName: 'Martinez',
    email: 'david.martinez@powerlift.example.com',
    phone: '(510) 555-0200',
    title: 'Head Coach',
    role: 'gym-manager',
    locationIds: ['loc-pl-1'],
    status: 'Active',
    hireDate: '2020-11-01',
    certifications: ['NSCA-CSCS', 'CPR/AED', 'USAW Level 1'],
    specialties: ['Strength Coaching', 'Program Design', 'Team Management'],
    bio: 'Experienced coach with a background in competitive athletics.',
  },
  {
    id: 'staff-8',
    brandId: 'orangetheory',
    firstName: 'Jessica',
    lastName: 'Lee',
    email: 'jessica.lee@powerlift.example.com',
    phone: '(510) 555-0201',
    title: 'Assistant Coach',
    role: 'gym-manager',
    locationIds: ['loc-pl-2'],
    status: 'Active',
    hireDate: '2022-08-15',
    certifications: ['NASM-CPT', 'CPR/AED'],
    specialties: ['Group Training', 'Member Assessment'],
    bio: 'Passionate about group fitness and building community.',
  },
  {
    id: 'staff-9',
    brandId: 'orangetheory',
    firstName: 'Tyler',
    lastName: 'Adams',
    email: 'tyler.adams@powerlift.example.com',
    phone: '(510) 555-1006',
    title: 'Front Desk Lead',
    role: 'front-desk',
    locationIds: ['loc-pl-1', 'loc-pl-2'],
    status: 'Active',
    hireDate: '2023-03-01',
    certifications: ['CPR/AED'],
    specialties: ['Customer Service', 'Membership Operations'],
    bio: 'Organized front desk lead managing two locations.',
  },
  {
    id: 'staff-10',
    brandId: 'orangetheory',
    firstName: 'Samantha',
    lastName: 'Park',
    email: 'samantha.park@powerlift.example.com',
    phone: '(510) 555-1007',
    title: 'Sales Manager',
    role: 'front-desk',
    locationIds: ['loc-pl-1'],
    status: 'Inactive',
    hireDate: '2022-05-10',
    certifications: ['Sales Leadership'],
    specialties: ['Membership Sales', 'Marketing Campaigns'],
    bio: 'Results-driven sales manager currently on sabbatical.',
  },
]

function trainerToStaff(trainer: typeof trainersJson[number]): StaffTableRow {
  return {
    id: trainer.id,
    name: `${trainer.firstName} ${trainer.lastName}`,
    email: trainer.email,
    phone: trainer.phone,
    title: trainer.specialties[0] ? `${trainer.specialties[0]} Trainer` : 'Personal Trainer',
    role: 'trainer',
    locations: trainer.locationIds.map((lid) => locationMap.get(lid) || lid),
    locationIds: trainer.locationIds,
    status: 'Active',
    hireDate: '2022-01-15',
    certifications: trainer.certifications,
    specialties: trainer.specialties,
    bio: trainer.bio,
  }
}

export function getStaffTableData(brandId: string): StaffTableRow[] {
  const trainers = trainersJson
    .filter((t) => t.brandId === brandId)
    .map(trainerToStaff)

  const staff = additionalStaff
    .filter((s) => s.brandId === brandId)
    .map((s) => ({
      id: s.id,
      name: `${s.firstName} ${s.lastName}`,
      email: s.email,
      phone: s.phone,
      title: s.title,
      role: s.role,
      locations: s.locationIds.map((lid) => locationMap.get(lid) || lid),
      locationIds: s.locationIds,
      status: s.status,
      hireDate: s.hireDate,
      certifications: s.certifications,
      specialties: s.specialties,
      bio: s.bio,
    }))

  return [...staff, ...trainers]
}
