import membersJson from '@/data/members.json'
import membershipsJson from '@/data/memberships.json'
import type { MemberTableRow, WeekData, MemberAlert } from '../types'

// Simple deterministic hash from member ID for stable mock data
function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function generateWeekData(seed: number, weekOffset: number): WeekData {
  const value = ((seed + weekOffset * 7) % 5) + 1
  const trendSeed = (seed + weekOffset) % 3
  const trend: WeekData['trend'] =
    trendSeed === 0 ? 'up' : trendSeed === 1 ? 'down' : undefined
  return { value, trend }
}

function generateAlerts(seed: number, joinDate: string): MemberAlert[] {
  const allAlerts: MemberAlert[] = [
    { type: 'new-join', label: 'New Join' },
    { type: 'no-hrm', label: 'No HRM' },
    { type: 'low-utilization', label: 'Low Utilization' },
    { type: 'at-risk', label: 'At Risk' },
    { type: 'milestone', label: 'Milestone: 100 Classes!' },
    { type: 'anniversary', label: 'Anniversary Today!' },
    { type: 'freeze', label: 'Freeze Scheduled' },
  ]

  const alerts: MemberAlert[] = []

  // Recent join dates get "New Join"
  const joinYear = new Date(joinDate).getFullYear()
  if (joinYear >= 2026) {
    alerts.push(allAlerts[0])
  }

  // Deterministically assign 0-1 additional alerts based on seed
  const primaryIndex = seed % allAlerts.length
  if (seed % 3 !== 0) {
    const alert = allAlerts[primaryIndex]
    // Avoid duplicating new-join
    if (!alerts.some((a) => a.type === alert.type)) {
      alerts.push(alert)
    }
  }

  // Some members get a second alert
  if (seed % 4 === 0) {
    const secondaryIndex = (seed + 3) % allAlerts.length
    const alert = allAlerts[secondaryIndex]
    if (!alerts.some((a) => a.type === alert.type)) {
      alerts.push(alert)
    }
  }

  return alerts
}

const coachNames = [
  'Hannah Lee',
  'Frank Green',
  'Alice Johnson',
  'Bob Brown',
  'Eve White',
  'Charlie Davis',
  'Grace Black',
  'Jane Smith',
  'David Wilson',
  'Sarah Miller',
]

function generateCoach(seed: number): string {
  return coachNames[seed % coachNames.length]
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function generateLastVisit(seed: number): string {
  const daysAgo = seed % 30
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return formatDate(date.toISOString())
}

const membershipMap = new Map(
  membershipsJson.map((m) => [m.id, m.name])
)

export function getMemberTableData(brandId: string): MemberTableRow[] {
  return membersJson
    .filter((m) => m.brandId === brandId)
    .map((member) => {
      const seed = hashCode(member.id)
      const membershipName = membershipMap.get(member.membershipId) || 'Basic'
      // Extract the tier keyword (e.g., "Premium Zen" -> "Premium", "Elite Lifter" -> "Elite")
      const tier =
        membershipName.split(' ')[0].charAt(0).toUpperCase() +
        membershipName.split(' ')[0].slice(1)

      return {
        id: member.id,
        name: `${member.firstName} ${member.lastName}`,
        memberId: member.id.toUpperCase().replace('MEM-', 'M0'),
        membershipTier: tier,
        joinDate: formatDate(member.joinDate),
        week1: generateWeekData(seed, 1),
        week2: generateWeekData(seed, 2),
        week3: generateWeekData(seed, 3),
        week4: generateWeekData(seed, 4),
        classes: ((seed % 200) + 5),
        lastVisit: generateLastVisit(seed),
        alerts: generateAlerts(seed, member.joinDate),
        coach: generateCoach(seed),
      }
    })
}
