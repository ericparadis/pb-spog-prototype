import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import type { TaskPriority } from '../types'

const priorityConfig: Record<TaskPriority, { label: string; className: string }> = {
  high: {
    label: 'High',
    className: 'text-red-600',
  },
  medium: {
    label: 'Medium',
    className: 'text-amber-600',
  },
  low: {
    label: 'Low',
    className: 'text-gray-500',
  },
}

interface TaskPriorityBadgeProps {
  priority: TaskPriority
}

export function TaskPriorityBadge({ priority }: TaskPriorityBadgeProps) {
  const config = priorityConfig[priority]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-sm font-medium',
        config.className
      )}
    >
      {config.label}
      <ChevronDown className="h-3 w-3" />
    </span>
  )
}
