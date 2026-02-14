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

export interface TaskTableRow {
  id: string
  title: string
  type: TaskType
  category: TaskCategory
  status: TaskStatus
  priority: TaskPriority
  assignedTo: string
  relatedMember: string | null
  dueDate: string
  createdDate: string
}
