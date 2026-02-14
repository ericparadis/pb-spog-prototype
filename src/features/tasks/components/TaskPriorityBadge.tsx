import { cn } from '@/lib/utils'
import type { TaskPriority } from '../types'

const priorityConfig: Record<TaskPriority, { className: string }> = {
  1: { className: 'text-red-700 bg-red-50 border-red-200' },
  2: { className: 'text-orange-700 bg-orange-50 border-orange-200' },
  3: { className: 'text-amber-700 bg-amber-50 border-amber-200' },
  4: { className: 'text-blue-700 bg-blue-50 border-blue-200' },
  5: { className: 'text-gray-600 bg-gray-100 border-gray-200' },
}

interface TaskPriorityBadgeProps {
  priority: TaskPriority
}

export function TaskPriorityBadge({ priority }: TaskPriorityBadgeProps) {
  const config = priorityConfig[priority]
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold border',
        config.className
      )}
    >
      {priority}
    </span>
  )
}
