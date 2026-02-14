import { cn } from '@/lib/utils'
import type { TaskCategory } from '../types'

const categoryConfig: Record<TaskCategory, { label: string; className: string }> = {
  'follow-up': {
    label: 'Follow-up',
    className: 'text-purple-700 bg-purple-50 border-purple-200',
  },
  administrative: {
    label: 'Administrative',
    className: 'text-slate-700 bg-slate-50 border-slate-200',
  },
  billing: {
    label: 'Billing',
    className: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
  onboarding: {
    label: 'Onboarding',
    className: 'text-sky-700 bg-sky-50 border-sky-200',
  },
  training: {
    label: 'Training',
    className: 'text-indigo-700 bg-indigo-50 border-indigo-200',
  },
}

interface TaskCategoryBadgeProps {
  category: TaskCategory
}

export function TaskCategoryBadge({ category }: TaskCategoryBadgeProps) {
  const config = categoryConfig[category]
  return (
    <span
      className={cn(
        'inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border',
        config.className
      )}
    >
      {config.label}
    </span>
  )
}
