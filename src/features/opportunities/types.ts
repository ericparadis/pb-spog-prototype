// Pipeline stage identifiers
export type LeadPipelineStage =
  | 'lead-created'
  | 'lead-trial-scheduled'
  | 'lead-trial-show'
  | 'lead-trial-active'
  | 'patron-created'

export type MemberPipelineStage =
  | 'patron-transactional'
  | 'patron-ppv'
  | 'patron-member'

export type PipelineStage = LeadPipelineStage | MemberPipelineStage

export type StageGroup = 'leads' | 'patrons' | 'members'

export type AgingStatus = 'fresh' | 'aging' | 'stale'

export interface StageConfig {
  id: PipelineStage
  label: string
  group: StageGroup
  colorClass: string
  textColorClass: string
  /** Days thresholds: [freshMax, agingMax] — beyond agingMax is stale */
  agingThresholds: [number, number]
}

export interface OpportunityTask {
  id: string
  title: string
  status: 'open' | 'in-progress' | 'completed' | 'overdue'
  dueDate: string
}

export interface Opportunity {
  id: string
  name: string
  customerName: string
  customerId: string
  customerType: 'lead' | 'member'
  brandId: string
  locationId: string
  pipelineStage: PipelineStage
  value: number
  owner: string
  createdDate: string
  expectedCloseDate: string
  daysInStage: number
  stageEnteredDate: string
  taskCount: number
  recentTask: OpportunityTask | null
  source: string
}

export interface PipelineSummaryData {
  totalLeads: number
  totalPatrons: number
  totalMembers: number
  conversionRate: number
  atRiskCount: number
}

export const PIPELINE_STAGES: StageConfig[] = [
  // Lead stages — warm colors
  { id: 'lead-created', label: 'Lead: Created', group: 'leads', colorClass: 'bg-amber-100', textColorClass: 'text-amber-800', agingThresholds: [7, 14] },
  { id: 'lead-trial-scheduled', label: 'Lead: Trial Scheduled', group: 'leads', colorClass: 'bg-amber-200', textColorClass: 'text-amber-900', agingThresholds: [7, 14] },
  { id: 'lead-trial-show', label: 'Lead: Trial Show', group: 'leads', colorClass: 'bg-orange-100', textColorClass: 'text-orange-800', agingThresholds: [7, 14] },
  { id: 'lead-trial-active', label: 'Lead: Trial Active', group: 'leads', colorClass: 'bg-orange-200', textColorClass: 'text-orange-900', agingThresholds: [7, 14] },
  // Patron stages — transitional colors
  { id: 'patron-created', label: 'Patron: Member Created', group: 'patrons', colorClass: 'bg-sky-100', textColorClass: 'text-sky-800', agingThresholds: [14, 30] },
  { id: 'patron-transactional', label: 'Patron: Transactional', group: 'patrons', colorClass: 'bg-sky-200', textColorClass: 'text-sky-900', agingThresholds: [14, 30] },
  { id: 'patron-ppv', label: 'Patron: PPV', group: 'patrons', colorClass: 'bg-indigo-100', textColorClass: 'text-indigo-800', agingThresholds: [14, 30] },
  // Member stage — cool color, always fresh (converted)
  { id: 'patron-member', label: 'Patron: Member', group: 'members', colorClass: 'bg-indigo-200', textColorClass: 'text-indigo-900', agingThresholds: [9999, 9999] },
]

export function getAgingStatus(daysInStage: number, stage: StageConfig): AgingStatus {
  const [freshMax, agingMax] = stage.agingThresholds
  if (daysInStage <= freshMax) return 'fresh'
  if (daysInStage <= agingMax) return 'aging'
  return 'stale'
}

export function getAgingBorderClass(status: AgingStatus): string {
  switch (status) {
    case 'fresh': return 'border-l-green-500'
    case 'aging': return 'border-l-amber-500'
    case 'stale': return 'border-l-red-500'
  }
}

export function getAgingTextClass(status: AgingStatus): string {
  switch (status) {
    case 'fresh': return 'text-green-700'
    case 'aging': return 'text-amber-700'
    case 'stale': return 'text-red-700'
  }
}
