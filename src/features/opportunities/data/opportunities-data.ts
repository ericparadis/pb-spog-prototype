import leadsJson from '@/data/leads.json'
import membersJson from '@/data/members.json'
import membershipsJson from '@/data/memberships.json'
import tasksJson from '@/data/tasks.json'
import {
  PIPELINE_STAGES,
  getAgingStatus,
  type Opportunity,
  type OpportunityTask,
  type PipelineStage,
  type PipelineSummaryData,
} from '../types'

function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

const staffNames = [
  'Michael Torres',
  'Sarah Mitchell',
  'David Chen',
  'Jessica Park',
  'Ryan Cooper',
  'Alex Turner',
  'Maya Patel',
]

const membershipPriceMap = new Map(
  membershipsJson.map((m) => [m.id, m.price])
)

const membershipNameMap = new Map(
  membershipsJson.map((m) => [m.id, m.name])
)

function getTaskInfo(customerId: string): { count: number; recentTask: OpportunityTask | null } {
  const related = tasksJson.filter((t) => t.relatedMemberId === customerId)
  if (related.length === 0) return { count: 0, recentTask: null }

  // Pick the most recent task: prefer open/active, then completed — sorted by due date
  const sorted = [...related].sort((a, b) => {
    const aCompleted = a.status === 'completed' ? 1 : 0
    const bCompleted = b.status === 'completed' ? 1 : 0
    if (aCompleted !== bCompleted) return aCompleted - bCompleted
    return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
  })

  const top = sorted[0]
  // Simplify status to just 'open' or 'completed'
  const simplifiedStatus: OpportunityTask['status'] = top.status === 'completed' ? 'completed' : 'open'
  return {
    count: related.length,
    recentTask: {
      id: top.id,
      title: top.title,
      status: simplifiedStatus,
      dueDate: top.dueDate,
    },
  }
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

function daysAgo(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return formatDate(d)
}

function daysFromNow(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return formatDate(d)
}

// Map existing lead statuses to pipeline stages
function mapLeadToPipelineStage(status: string): PipelineStage {
  switch (status) {
    case 'lead':
    case 'lead-remarketing':
      return 'lead-created'
    case 'appt-booked':
      return 'lead-trial-scheduled'
    case 'appt-no-show':
    case 'missed-guest':
      return 'lead-trial-show'
    case 'expired-guest':
      return 'lead-trial-active'
    default:
      return 'lead-created'
  }
}

// Map existing member data to pipeline stages
function mapMemberToPipelineStage(memberType: string, status: string): PipelineStage {
  if (status === 'expired' || status === 'suspended' || status === 'cancelled') {
    return 'patron-transactional'
  }
  switch (memberType) {
    case 'Trial':
      return 'patron-created'
    case 'Pay Per Visit':
      return 'patron-ppv'
    case 'Staff':
      return 'patron-transactional'
    default:
      return 'patron-member'
  }
}

const memberTypes = ['Member', 'Pay Per Visit', 'Trial', 'Staff']

function getMemberType(seed: number): string {
  return memberTypes[seed % memberTypes.length]
}

// Stage-relevant task templates — each stage has tasks that make sense for that phase
const stageTaskTemplates: Record<string, { open: string[]; completed: string[] }> = {
  'lead-created': {
    open: ['Send intro email', 'Make first contact call', 'Qualify lead interest', 'Send gym info packet'],
    completed: ['Logged lead source', 'Added to CRM', 'Verified contact info', 'Sent welcome text'],
  },
  'lead-trial-scheduled': {
    open: ['Confirm trial appointment', 'Send trial prep info', 'Prepare welcome packet', 'Assign tour guide'],
    completed: ['Trial date confirmed', 'Pre-visit email sent', 'Waiver form sent', 'Staff notified of visit'],
  },
  'lead-trial-show': {
    open: ['Follow up after trial', 'Send post-visit survey', 'Schedule follow-up call', 'Share pricing options'],
    completed: ['Trial visit completed', 'Tour feedback collected', 'Guest pass logged', 'Follow-up call made'],
  },
  'lead-trial-active': {
    open: ['Check in on trial experience', 'Present signup options', 'Send special offer', 'Schedule conversion meeting'],
    completed: ['Mid-trial check-in done', 'Pricing brochure sent', 'Trial progress reviewed', 'Offer presented'],
  },
  'patron-created': {
    open: ['Complete onboarding checklist', 'Schedule orientation session', 'Set up patron profile', 'Assign trainer intro'],
    completed: ['Onboarding form completed', 'Orientation scheduled', 'Profile created', 'Welcome email sent'],
  },
  'patron-transactional': {
    open: ['Send re-engagement offer', 'Follow up on last visit', 'Present upgrade options', 'Invite to group class'],
    completed: ['Last visit reviewed', 'Re-engagement email sent', 'Usage pattern analyzed', 'Discount offer sent'],
  },
  'patron-ppv': {
    open: ['Offer class pack upgrade', 'Present plan savings', 'Schedule fitness assessment', 'Send loyalty reward'],
    completed: ['Visit frequency reviewed', 'Savings comparison sent', 'Pack usage tracked', 'Upgrade discussed'],
  },
  'patron-member': {
    open: ['Schedule renewal check-in', 'Present plan upgrade options', 'Conduct satisfaction survey', 'Review fitness goals'],
    completed: ['Renewal reminder sent', 'Annual review completed', 'Satisfaction survey done', 'Goals updated'],
  },
}

function getStageTask(stage: PipelineStage, seed: number, daysInStage: number): OpportunityTask {
  const templates = stageTaskTemplates[stage] || stageTaskTemplates['lead-created']
  // Use seed to deterministically pick completed vs open, and which task title
  const isCompleted = seed % 3 === 0 // roughly 1/3 of tasks are completed
  const titles = isCompleted ? templates.completed : templates.open
  const title = titles[seed % titles.length]
  const status = isCompleted ? 'completed' as const : 'open' as const
  const dueDate = isCompleted ? daysAgo(seed % 5 + 1) : daysFromNow(seed % 7 + 1)

  return {
    id: `stage-task-${stage}-${seed}`,
    title,
    status,
    dueDate,
  }
}

// Opportunity name templates for leads
const leadOpportunityNames: Record<string, string[]> = {
  'lead-created': ['New Lead Inquiry', 'Initial Contact', 'Prospect Outreach', 'Lead Conversion'],
  'lead-trial-scheduled': ['Trial Booking', 'Intro Session Scheduled', 'Tour Appointment', 'Free Pass Activation'],
  'lead-trial-show': ['Trial Visit Follow-up', 'Guest Pass Conversion', 'Tour Completion', 'Trial Re-engagement'],
  'lead-trial-active': ['Active Trial Conversion', 'Trial-to-Member Upgrade', 'Trial Retention', 'Trial Extension'],
  'patron-created': ['New Patron Onboarding', 'First Purchase Conversion', 'Patron Activation', 'Welcome Package'],
}

// Opportunity name templates for members
const memberOpportunityNames: Record<string, string[]> = {
  'patron-transactional': ['Drop-in Conversion', 'Casual Visitor Upsell', 'Re-engagement Offer', 'Reactivation Campaign'],
  'patron-ppv': ['PPV-to-Membership Upgrade', 'Class Pack Upsell', 'Volume Discount Offer', 'Loyalty Conversion'],
  'patron-member': ['Membership Renewal', 'Plan Upgrade', 'Premium Upsell', 'Annual Conversion'],
}

function getOpportunityName(stage: PipelineStage, seed: number): string {
  const names = leadOpportunityNames[stage] || memberOpportunityNames[stage] || ['Opportunity']
  return names[seed % names.length]
}

// Revenue values by stage — leads have potential revenue, members have actual
function getOpportunityValue(stage: PipelineStage, seed: number): number {
  const prices = [49.99, 59.99, 79.99, 99.99, 119.99, 129.99]
  return prices[seed % prices.length]
}

export function getOpportunitiesData(brandId: string): Opportunity[] {
  const opportunities: Opportunity[] = []

  // Map existing leads to opportunities
  const brandLeads = leadsJson.filter((l) => l.brandId === brandId)
  for (const lead of brandLeads) {
    const seed = hashCode(lead.id)
    const stage = mapLeadToPipelineStage(lead.status)
    const daysInStage = (seed % 25) + 1

    const leadTaskInfo = getTaskInfo(lead.id)
    // Lead stages always use stage-relevant generated tasks to avoid "member" wording
    const recentTask = getStageTask(stage, seed, daysInStage)
    opportunities.push({
      id: `opp-${lead.id}`,
      name: getOpportunityName(stage, seed),
      customerName: `${lead.firstName} ${lead.lastName}`,
      customerId: lead.id,
      customerType: 'lead',
      brandId: lead.brandId,
      locationId: lead.locationId,
      pipelineStage: stage,
      value: getOpportunityValue(stage, seed),
      owner: staffNames[seed % staffNames.length],
      createdDate: lead.createdDate,
      expectedCloseDate: daysFromNow((seed % 30) + 7),
      daysInStage,
      stageEnteredDate: daysAgo(daysInStage),
      taskCount: Math.max(leadTaskInfo.count, 1),
      recentTask,
      source: lead.source,
    })
  }

  // Map existing members to opportunities
  const brandMembers = membersJson.filter((m) => m.brandId === brandId)
  for (const member of brandMembers) {
    const seed = hashCode(member.id)
    const memberType = getMemberType(seed)
    const stage = mapMemberToPipelineStage(memberType, member.membershipStatus)
    const daysInStage = (seed % 40) + 1
    const price = membershipPriceMap.get(member.membershipId) || 49.99
    const membershipName = membershipNameMap.get(member.membershipId) || 'Base'

    // Opportunity name for members reflects their situation
    let oppName = getOpportunityName(stage, seed)
    if (stage === 'patron-member' && member.membershipStatus === 'active') {
      oppName = `${membershipName} Renewal`
    }

    const memTaskInfo = getTaskInfo(member.id)
    // Guarantee every opportunity has a task — use data task or generate stage-relevant one
    const memRecentTask = memTaskInfo.recentTask || getStageTask(stage, seed, daysInStage)
    opportunities.push({
      id: `opp-${member.id}`,
      name: oppName,
      customerName: `${member.firstName} ${member.lastName}`,
      customerId: member.id,
      customerType: 'member',
      brandId: member.brandId,
      locationId: member.locationId,
      pipelineStage: stage,
      value: price,
      owner: staffNames[seed % staffNames.length],
      createdDate: member.joinDate,
      expectedCloseDate: daysFromNow((seed % 60) + 14),
      daysInStage,
      stageEnteredDate: daysAgo(daysInStage),
      taskCount: Math.max(memTaskInfo.count, 1),
      recentTask: memRecentTask,
      source: seed % 2 === 0 ? 'Referral' : 'Direct',
    })
  }

  // Generate synthetic opportunities to fill sparse stages
  const syntheticLeads = [
    { name: 'Patricia Hayes', stage: 'lead-trial-scheduled' as PipelineStage, source: 'Instagram', location: 0 },
    { name: 'Robert Chen', stage: 'lead-trial-show' as PipelineStage, source: 'Google Ads', location: 1 },
    { name: 'Maria Gonzalez', stage: 'lead-trial-active' as PipelineStage, source: 'Referral', location: 0 },
    { name: 'Steven Park', stage: 'patron-created' as PipelineStage, source: 'Walk-in', location: 1 },
    { name: 'Linda Torres', stage: 'patron-created' as PipelineStage, source: 'Facebook', location: 0 },
    { name: 'Kevin Brown', stage: 'lead-trial-active' as PipelineStage, source: 'Website', location: 0 },
    { name: 'Angela White', stage: 'patron-transactional' as PipelineStage, source: 'Referral', location: 1 },
    { name: 'Thomas Lee', stage: 'patron-ppv' as PipelineStage, source: 'Instagram', location: 0 },
    { name: 'Denise Clark', stage: 'lead-trial-scheduled' as PipelineStage, source: 'Walk-in', location: 1 },
    { name: 'Jason Wright', stage: 'lead-created' as PipelineStage, source: 'Google Ads', location: 0 },
    { name: 'Michelle Adams', stage: 'patron-ppv' as PipelineStage, source: 'Facebook', location: 0 },
    { name: 'Brian Evans', stage: 'patron-transactional' as PipelineStage, source: 'Website', location: 1 },
  ]

  // Get locations for this brand to assign synthetic records
  const brandLocations = brandMembers.length > 0
    ? [...new Set(brandMembers.map((m) => m.locationId))]
    : [...new Set(brandLeads.map((l) => l.locationId))]

  for (let i = 0; i < syntheticLeads.length; i++) {
    const synth = syntheticLeads[i]
    const seed = hashCode(`synth-${brandId}-${i}`)
    const daysInStage = (seed % 35) + 1
    const locationId = brandLocations[synth.location % brandLocations.length] || brandLocations[0]

    if (!locationId) continue

    const isLeadStage = synth.stage.startsWith('lead-') || synth.stage === 'patron-created'

    // Every synthetic opportunity gets a stage-relevant task
    const synthRecentTask = getStageTask(synth.stage, seed + i, daysInStage)

    opportunities.push({
      id: `opp-synth-${brandId}-${i}`,
      name: getOpportunityName(synth.stage, seed),
      customerName: synth.name,
      customerId: `synth-${i}`,
      customerType: isLeadStage ? 'lead' : 'member',
      brandId,
      locationId,
      pipelineStage: synth.stage,
      value: getOpportunityValue(synth.stage, seed),
      owner: staffNames[seed % staffNames.length],
      createdDate: daysAgo((seed % 60) + 10),
      expectedCloseDate: daysFromNow((seed % 30) + 7),
      daysInStage,
      stageEnteredDate: daysAgo(daysInStage),
      taskCount: 1,
      recentTask: synthRecentTask,
      source: synth.source,
    })
  }

  return opportunities
}

export function getPipelineSummary(opportunities: Opportunity[]): PipelineSummaryData {
  const stageMap = new Map(PIPELINE_STAGES.map((s) => [s.id, s]))

  let totalLeads = 0
  let totalPatrons = 0
  let totalMembers = 0
  let atRiskCount = 0

  for (const opp of opportunities) {
    const stageConfig = stageMap.get(opp.pipelineStage)
    if (!stageConfig) continue

    if (stageConfig.group === 'leads') totalLeads++
    else if (stageConfig.group === 'patrons') totalPatrons++
    else if (stageConfig.group === 'members') totalMembers++

    const aging = getAgingStatus(opp.daysInStage, stageConfig)
    if (aging === 'stale') atRiskCount++
  }

  const total = totalLeads + totalPatrons + totalMembers
  const conversionRate = total > 0 ? Math.round((totalMembers / total) * 100) : 0

  return {
    totalLeads,
    totalPatrons,
    totalMembers,
    conversionRate,
    atRiskCount,
  }
}
