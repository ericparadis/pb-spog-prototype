import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { SquareCheckBig, Square } from 'lucide-react'
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

function getTaskStyle(status: string) {
  if (status === 'completed') {
    return { text: 'text-muted-foreground', bg: 'bg-muted/50', border: 'border-muted', icon: SquareCheckBig }
  }
  return { text: 'text-primary', bg: 'bg-white', border: 'border-primary', icon: Square }
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
            getTaskStyle(task.status).bg,
            getTaskStyle(task.status).border
          )}
        >
          {(() => {
            const TaskIcon = getTaskStyle(task.status).icon
            return <TaskIcon className={cn('h-3.5 w-3.5 flex-shrink-0', getTaskStyle(task.status).text)} />
          })()}
          <span className={cn('text-[11px] font-medium truncate', getTaskStyle(task.status).text)}>
            {task.title}
          </span>
        </div>
      )}
    </Card>
  )
}
