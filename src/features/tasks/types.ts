export type TaskStatus = 'open' | 'in-progress' | 'completed' | 'overdue'

export type TaskPriority = 1 | 2 | 3 | 4 | 5

export type TaskCategory =
  | 'follow-up'
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
  relatedMember: string
  relatedMemberType: 'lead' | 'member'
  relatedMemberId: string
  relatedMemberEmail: string | null
  relatedMemberPhone: string | null
  dueDate: string
  createdDate: string
  description: string
  communicationHistory: CommunicationEntry[]
  notes: NoteEntry[]
}
