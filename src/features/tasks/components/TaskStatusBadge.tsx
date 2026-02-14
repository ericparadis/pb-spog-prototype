import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import type { TaskStatus } from '../types'

const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
  open: {
    label: 'Open',
    className: 'text-blue-700 bg-blue-50 border-blue-200',
  },
  'in-progress': {
    label: 'In Progress',
    className: 'text-amber-700 bg-amber-50 border-amber-200',
  },
  completed: {
    label: 'Completed',
    className: 'text-green-700 bg-green-50 border-green-200',
  },
  overdue: {
    label: 'Overdue',
    className: 'text-red-700 bg-red-50 border-red-200',
  },
}

interface TaskStatusBadgeProps {
  status: TaskStatus
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border',
        config.className
      )}
    >
      {config.label}
      <ChevronDown className="h-3 w-3" />
    </span>
  )
}
