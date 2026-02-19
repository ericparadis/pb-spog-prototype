import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { SquareCheckBig, Square, Clock, AlertCircle } from 'lucide-react'
import type { Opportunity, StageConfig } from '../types'
import { getAgingStatus, getAgingTextClass } from '../types'

interface OpportunityCardProps {
  opportunity: Opportunity
  stageConfig: StageConfig
  onClick: () => void
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function formatStageDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

function getTaskStatusColor(status: string) {
  switch (status) {
    case 'completed':
      return { text: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200', icon: SquareCheckBig }
    case 'overdue':
      return { text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', icon: AlertCircle }
    case 'in-progress':
      return { text: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', icon: Clock }
    case 'open':
    default:
      return { text: 'text-gray-700', bg: 'bg-gray-50', border: 'border-gray-200', icon: Square }
  }
}

export function OpportunityCard({ opportunity, stageConfig, onClick }: OpportunityCardProps) {
  const aging = getAgingStatus(opportunity.daysInStage, stageConfig)
  const daysTextClass = getAgingTextClass(aging)
  const task = opportunity.recentTask

  return (
    <Card
      className="p-3 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      {/* Headline: avatar with initials + customer name */}
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-[10px] font-semibold text-primary">
            {getInitials(opportunity.customerName)}
          </span>
        </div>
        <span className="text-sm font-semibold text-foreground truncate">
          {opportunity.customerName}
        </span>
      </div>

      {/* Body: date entered stage + days count */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-muted-foreground">
          Entered {formatStageDate(opportunity.stageEnteredDate)}
        </span>
        <span className={cn('text-xs font-semibold', daysTextClass)}>
          {opportunity.daysInStage}d
        </span>
      </div>

      {/* Task: most recent task with color coding */}
      {task && (
        <div
          className={cn(
            'mt-2 flex items-center gap-1.5 rounded-md border px-2 py-1.5',
            getTaskStatusColor(task.status).bg,
            getTaskStatusColor(task.status).border
          )}
        >
          {(() => {
            const TaskIcon = getTaskStatusColor(task.status).icon
            return <TaskIcon className={cn('h-3.5 w-3.5 flex-shrink-0', getTaskStatusColor(task.status).text)} />
          })()}
          <span className={cn('text-[11px] font-medium truncate', getTaskStatusColor(task.status).text)}>
            {task.title}
          </span>
        </div>
      )}
    </Card>
  )
}
