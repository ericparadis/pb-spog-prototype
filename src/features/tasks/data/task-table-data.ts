import type { TaskTableRow, TaskStatus, TaskPriority, TaskCategory } from '../types'

const statuses: TaskStatus[] = ['open', 'in-progress', 'completed', 'overdue']
const priorities: TaskPriority[] = ['high', 'medium', 'low']
const categories: TaskCategory[] = [
  'follow-up',
  'maintenance',
  'administrative',
  'billing',
  'onboarding',
  'training',
]

const staffNames = [
  'Michael Torres',
  'Sarah Mitchell',
  'David Chen',
  'Jessica Park',
  'Ryan Cooper',
  'Alex Turner',
  'Maya Patel',
]

const memberNames = [
  'John Doe',
  'Emily Smith',
  'Carlos Rivera',
  'Amanda Foster',
  'Brian Mitchell',
  'Diana Chang',
  null,
  null,
]

const taskTemplates: { title: string; category: TaskCategory }[] = [
  { title: 'Follow up with new member signup', category: 'follow-up' },
  { title: 'Process membership renewal', category: 'billing' },
  { title: 'Schedule equipment maintenance - treadmills', category: 'maintenance' },
  { title: 'Complete new hire orientation', category: 'onboarding' },
  { title: 'Review overdue member payments', category: 'billing' },
  { title: 'Update class schedule for next month', category: 'administrative' },
  { title: 'Conduct staff CPR recertification', category: 'training' },
  { title: 'Follow up on cancelled membership', category: 'follow-up' },
  { title: 'Inspect and replace gym floor mats', category: 'maintenance' },
  { title: 'Send welcome email to trial members', category: 'onboarding' },
  { title: 'Resolve billing dispute', category: 'billing' },
  { title: 'Prepare monthly attendance report', category: 'administrative' },
  { title: 'Schedule personal training intro session', category: 'follow-up' },
  { title: 'Order replacement cables for cable machine', category: 'maintenance' },
  { title: 'Update emergency contact records', category: 'administrative' },
  { title: 'Conduct quarterly safety walkthrough', category: 'training' },
  { title: 'Follow up on guest pass visit', category: 'follow-up' },
  { title: 'Process refund request', category: 'billing' },
  { title: 'Set up new member key fob access', category: 'onboarding' },
  { title: 'Review and update cleaning schedule', category: 'administrative' },
]

function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function getTaskTableData(): TaskTableRow[] {
  return taskTemplates.map((template, index) => {
    const seed = hashCode(`task-${index}`)

    const createdDaysAgo = (seed % 30) + 1
    const createdDate = new Date()
    createdDate.setDate(createdDate.getDate() - createdDaysAgo)

    const dueDaysFromNow = (seed % 20) - 5
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + dueDaysFromNow)

    let status: TaskStatus
    if (seed % 7 === 0) {
      status = 'completed'
    } else if (dueDaysFromNow < 0 && seed % 3 !== 0) {
      status = 'overdue'
    } else if (seed % 3 === 0) {
      status = 'in-progress'
    } else {
      status = 'open'
    }

    return {
      id: `task-${index + 1}`,
      title: template.title,
      category: template.category,
      status,
      priority: priorities[seed % priorities.length],
      assignedTo: staffNames[seed % staffNames.length],
      relatedMember: memberNames[seed % memberNames.length],
      dueDate: formatDate(dueDate),
      createdDate: formatDate(createdDate),
    }
  })
}
