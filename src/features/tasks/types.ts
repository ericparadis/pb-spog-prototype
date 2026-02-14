export type TaskStatus = 'open' | 'in-progress' | 'completed' | 'overdue'

export type TaskPriority = 'high' | 'medium' | 'low'

export type TaskCategory =
  | 'follow-up'
  | 'maintenance'
  | 'administrative'
  | 'billing'
  | 'onboarding'
  | 'training'

export interface TaskTableRow {
  id: string
  title: string
  category: TaskCategory
  status: TaskStatus
  priority: TaskPriority
  assignedTo: string
  relatedMember: string | null
  dueDate: string
  createdDate: string
}
