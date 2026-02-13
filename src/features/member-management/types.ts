export interface WeekData {
  value: number
  trend?: 'up' | 'down' | 'flat'
}

export interface MemberAlert {
  type: string
  label: string
}

export interface MemberTableRow {
  id: string
  name: string
  memberId: string
  photoUrl?: string
  membershipTier: string
  joinDate: string
  week1: WeekData
  week2: WeekData
  week3: WeekData
  week4: WeekData
  classes: number
  lastVisit: string
  alert?: MemberAlert
}
