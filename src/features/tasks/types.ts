export type TaskStatus = 'open' | 'in-progress' | 'completed' | 'overdue'

export type TaskPriority = 'high' | 'medium' | 'low'

export type TaskCategory =
  | 'follow-up'
  | 'maintenance'
  | 'administrative'
  | 'billing'
  | 'onboarding'
  | 'training'

export type TaskType = 'lead-followup' | 'member-followup' | 'revenue'

export type CommunicationType = 'email' | 'call' | 'text' | 'push'

export interface CommunicationEntry {
  type: CommunicationType
  date: string
  summary: string
  direction: 'inbound' | 'outbound'
}

export interface NoteEntry {
  date: string
  author: string
  text: string
}

export interface TaskTableRow {
  id: string
  title: string
  type: TaskType
  category: TaskCategory
  status: TaskStatus
  priority: TaskPriority
  assignedTo: string
  relatedMember: string | null
  relatedMemberType: 'lead' | 'member' | null
  relatedMemberId: string | null
  relatedMemberEmail: string | null
  relatedMemberPhone: string | null
  dueDate: string
  createdDate: string
  description: string
  communicationHistory: CommunicationEntry[]
  notes: NoteEntry[]
}
