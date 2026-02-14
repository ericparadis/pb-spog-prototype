import membersJson from '@/data/members.json'
import membershipsJson from '@/data/memberships.json'
import type { MemberTableRow } from '../types'

// Simple deterministic hash from member ID for stable mock data
function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

const memberTypes = ['Member', 'Pay Per Visit', 'Trial', 'Staff']

function generateMemberType(seed: number): string {
  return memberTypes[seed % memberTypes.length]
}

function generateRelativeLastVisit(seed: number): string {
  const minutesAgo = seed % 4320 // up to 3 days in minutes
  if (minutesAgo < 60) {
    const mins = Math.max(minutesAgo, 1)
    return `${mins} min ago`
  }
  if (minutesAgo < 1440) {
    const hours = Math.floor(minutesAgo / 60)
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`
  }
  const days = Math.floor(minutesAgo / 1440)
  return days === 1 ? '1 day ago' : `${days} days ago`
}

const membershipMap = new Map(
  membershipsJson.map((m) => [m.id, m.name])
)

export function getMemberTableData(brandId: string): MemberTableRow[] {
  return membersJson
    .filter((m) => m.brandId === brandId)
    .map((member) => {
      const seed = hashCode(member.id)
      const membershipName = membershipMap.get(member.membershipId) || 'Base'

      // Determine a short membership label (e.g. "Base", "Coaching", "Premium")
      const nameLower = membershipName.toLowerCase()
      let shortMembership = 'Base'
      if (nameLower.includes('premium') || nameLower.includes('elite')) {
        shortMembership = 'Coaching'
      } else if (nameLower.includes('wellness')) {
        shortMembership = 'Base'
      }

      return {
        id: member.id,
        name: `${member.firstName} ${member.lastName}`,
        email: member.email,
        phone: member.phone,
        memberType: generateMemberType(seed),
        membershipName: shortMembership,
        agreementStatus: member.membershipStatus === 'active' ? 'Active' : 'Expired',
        lastVisit: generateRelativeLastVisit(seed),
      }
    })
}
