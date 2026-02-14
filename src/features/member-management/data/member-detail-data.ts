import membersJson from '@/data/members.json'
import membershipsJson from '@/data/memberships.json'
import locationsJson from '@/data/locations.json'

interface MemberDetail {
  dateOfBirth: string
  age: string
  gender: string
  joinDate: string
  address: string
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
  agreement: {
    plan: string
    status: string
    startDate: string
    nextBilling: string
    monthlyRate: string
    paymentMethod: string
  }
  purchases: Array<{
    item: string
    date: string
    amount: string
  }>
  visitSummary: {
    thisMonth: number
    lastMonth: number
    total: number
  }
  recentActivity: Array<{
    type: 'check-in' | 'class' | 'purchase' | 'other'
    description: string
    date: string
  }>
  communications: Array<{
    channel: 'Email' | 'SMS' | 'Phone' | 'In-App'
    subject: string
    summary: string
    date: string
  }>
  notes: Array<{
    author: string
    date: string
    content: string
  }>
}

function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function calcAge(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth)
  const now = new Date()
  let age = now.getFullYear() - dob.getFullYear()
  const m = now.getMonth() - dob.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--
  return age
}

const membershipMap = new Map(membershipsJson.map((m) => [m.id, m]))
const locationMap = new Map(locationsJson.map((l) => [l.id, l]))

const genders = ['Male', 'Female', 'Male', 'Female', 'Male', 'Non-binary', 'Female', 'Male']
const streets = [
  '742 Evergreen Terrace',
  '1234 Oak Avenue',
  '567 Pine Street',
  '890 Maple Drive',
  '321 Cedar Lane',
  '456 Elm Court',
  '789 Birch Road',
  '234 Walnut Way',
]
const paymentMethods = ['Visa ending 4242', 'Mastercard ending 8888', 'Visa ending 1234', 'Amex ending 5678', 'Visa ending 9012']

const purchaseItems = [
  { item: 'Monthly Membership', amounts: ['$49.99', '$79.99', '$99.99', '$119.99', '$129.99'] },
  { item: 'Personal Training (4 sessions)', amounts: ['$199.00', '$249.00'] },
  { item: 'Protein Shake Pack (10)', amounts: ['$45.00', '$55.00'] },
  { item: 'Gym Towel', amounts: ['$15.00', '$12.00'] },
  { item: 'Water Bottle', amounts: ['$25.00', '$18.00'] },
  { item: 'Locker Rental (Monthly)', amounts: ['$10.00', '$15.00'] },
  { item: 'Guest Pass (5-pack)', amounts: ['$50.00', '$75.00'] },
]

const activityTypes: Array<{ type: MemberDetail['recentActivity'][0]['type']; templates: string[] }> = [
  { type: 'check-in', templates: ['Checked in at front desk', 'Checked in via mobile app', 'Checked in at kiosk'] },
  { type: 'class', templates: ['Attended Spin Class', 'Attended Yoga Flow', 'Attended HIIT Bootcamp', 'Attended Strength Training', 'Attended Pilates'] },
  { type: 'purchase', templates: ['Purchased protein shake', 'Purchased towel service', 'Renewed monthly membership'] },
  { type: 'other', templates: ['Updated profile information', 'Booked personal training session', 'Submitted feedback'] },
]

const commTemplates: Array<{ channel: MemberDetail['communications'][0]['channel']; subjects: Array<{ subject: string; summary: string }> }> = [
  {
    channel: 'Email',
    subjects: [
      { subject: 'Welcome to your new membership!', summary: 'Onboarding email sent with gym guidelines and class schedule.' },
      { subject: 'Your February Invoice', summary: 'Monthly billing statement for February 2025.' },
      { subject: 'New Classes Available', summary: 'Promotional email about new group fitness classes starting next month.' },
      { subject: 'Membership Renewal Reminder', summary: 'Automated reminder about upcoming membership renewal date.' },
    ],
  },
  {
    channel: 'SMS',
    subjects: [
      { subject: 'Check-in Confirmation', summary: 'Automated check-in confirmation sent.' },
      { subject: 'Class Reminder', summary: 'Reminder for upcoming Yoga Flow class at 6:00 PM.' },
      { subject: 'Payment Received', summary: 'Confirmation of monthly payment processing.' },
    ],
  },
  {
    channel: 'Phone',
    subjects: [
      { subject: 'Follow-up call', summary: 'Called to discuss membership upgrade options. Member interested in premium tier.' },
      { subject: 'Billing inquiry', summary: 'Member called about a charge. Resolved — duplicate charge refunded.' },
    ],
  },
  {
    channel: 'In-App',
    subjects: [
      { subject: 'Achievement Unlocked', summary: '10-visit streak! Badge awarded for consistent attendance.' },
      { subject: 'Schedule Change Notice', summary: 'Notification about updated Saturday class schedule.' },
    ],
  },
]

const noteTemplates = [
  { author: 'Sarah Johnson', content: 'Member expressed interest in personal training packages. Follow up next visit.' },
  { author: 'Mike Chen', content: 'Preferred workout time is early morning (5-7 AM). Prefers quieter gym hours.' },
  { author: 'Emma Wilson', content: 'Has a knee injury — avoid high-impact exercises. Cleared for swimming and cycling.' },
  { author: 'David Martinez', content: 'Referred two friends last month. Consider for referral rewards program.' },
  { author: 'Front Desk', content: 'Updated emergency contact information on file.' },
  { author: 'Jessica Lee', content: 'Completed fitness assessment. Goals: lose 15 lbs, improve cardiovascular health.' },
]

function generateDaysAgo(seed: number, max: number): string {
  const daysAgo = seed % max
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  return formatDate(d.toISOString())
}

export function getMemberDetailData(memberId: string): MemberDetail {
  const rawMember = membersJson.find((m) => m.id === memberId)
  const seed = hashCode(memberId)

  if (!rawMember) {
    return getDefaultDetail()
  }

  const membership = membershipMap.get(rawMember.membershipId)
  const location = locationMap.get(rawMember.locationId)

  const city = location ? `${location.city}, ${location.state} ${location.zip}` : 'San Francisco, CA 94102'
  const street = streets[seed % streets.length]

  // Purchases
  const purchaseCount = 3 + (seed % 4)
  const purchases: MemberDetail['purchases'] = []
  for (let i = 0; i < purchaseCount; i++) {
    const pItem = purchaseItems[(seed + i) % purchaseItems.length]
    purchases.push({
      item: pItem.item,
      date: generateDaysAgo(seed + i * 17, 90),
      amount: pItem.amounts[(seed + i) % pItem.amounts.length],
    })
  }

  // Activity
  const activityCount = 6 + (seed % 4)
  const recentActivity: MemberDetail['recentActivity'] = []
  for (let i = 0; i < activityCount; i++) {
    const aType = activityTypes[(seed + i) % activityTypes.length]
    recentActivity.push({
      type: aType.type,
      description: aType.templates[(seed + i) % aType.templates.length],
      date: generateDaysAgo(seed + i * 7, 30),
    })
  }

  // Communications
  const commCount = 4 + (seed % 3)
  const communications: MemberDetail['communications'] = []
  for (let i = 0; i < commCount; i++) {
    const cChannel = commTemplates[(seed + i) % commTemplates.length]
    const cSubject = cChannel.subjects[(seed + i) % cChannel.subjects.length]
    communications.push({
      channel: cChannel.channel,
      subject: cSubject.subject,
      summary: cSubject.summary,
      date: generateDaysAgo(seed + i * 11, 60),
    })
  }

  // Notes
  const noteCount = 2 + (seed % 3)
  const notes: MemberDetail['notes'] = []
  for (let i = 0; i < noteCount; i++) {
    const note = noteTemplates[(seed + i) % noteTemplates.length]
    notes.push({
      author: note.author,
      date: generateDaysAgo(seed + i * 23, 90),
      content: note.content,
    })
  }

  return {
    dateOfBirth: formatDate(rawMember.dateOfBirth),
    age: `${calcAge(rawMember.dateOfBirth)}`,
    gender: genders[seed % genders.length],
    joinDate: formatDate(rawMember.joinDate),
    address: `${street}, ${city}`,
    emergencyContact: rawMember.emergencyContact,
    agreement: {
      plan: membership ? membership.name : 'Basic',
      status: rawMember.membershipStatus === 'active' ? 'Active' : 'Expired',
      startDate: formatDate(rawMember.joinDate),
      nextBilling: rawMember.membershipStatus === 'active'
        ? generateDaysAgo(seed, -15) // future date
        : 'N/A',
      monthlyRate: membership ? `$${membership.price}` : '$49.99',
      paymentMethod: paymentMethods[seed % paymentMethods.length],
    },
    purchases,
    visitSummary: {
      thisMonth: 4 + (seed % 12),
      lastMonth: 6 + (seed % 15),
      total: 30 + (seed % 200),
    },
    recentActivity,
    communications,
    notes,
  }
}

function getDefaultDetail(): MemberDetail {
  return {
    dateOfBirth: 'N/A',
    age: 'N/A',
    gender: 'N/A',
    joinDate: 'N/A',
    address: 'N/A',
    emergencyContact: { name: 'N/A', phone: 'N/A', relationship: 'N/A' },
    agreement: {
      plan: 'N/A',
      status: 'N/A',
      startDate: 'N/A',
      nextBilling: 'N/A',
      monthlyRate: 'N/A',
      paymentMethod: 'N/A',
    },
    purchases: [],
    visitSummary: { thisMonth: 0, lastMonth: 0, total: 0 },
    recentActivity: [],
    communications: [],
    notes: [],
  }
}
