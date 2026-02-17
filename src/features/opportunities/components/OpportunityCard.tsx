import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { User, ClipboardList } from 'lucide-react'
import type { Opportunity, StageConfig } from '../types'
import { getAgingStatus, getAgingTextClass } from '../types'

interface OpportunityCardProps {
  opportunity: Opportunity
  stageConfig: StageConfig
  onClick: () => void
}

export function OpportunityCard({ opportunity, stageConfig, onClick }: OpportunityCardProps) {
  const aging = getAgingStatus(opportunity.daysInStage, stageConfig)
  const daysTextClass = getAgingTextClass(aging)
  const hasTasks = opportunity.taskCount > 0

  return (
    <Card
      className="p-3 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      {/* Opportunity name */}
      <p className="text-sm font-semibold text-foreground truncate">{opportunity.name}</p>

      {/* Customer name */}
      <p className="text-xs text-muted-foreground mt-0.5 truncate">{opportunity.customerName}</p>

      {/* Owner */}
      <div className="flex items-center gap-1 mt-2">
        <User className="h-3 w-3 text-muted-foreground flex-shrink-0" />
        <span className="text-xs text-muted-foreground truncate">{opportunity.owner}</span>
      </div>

      {/* Value + Days in stage */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs font-medium text-foreground">
          ${opportunity.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
        <span className={cn('text-xs font-medium', daysTextClass)}>
          {opportunity.daysInStage}d
        </span>
      </div>

      {/* Task highlight */}
      {hasTasks && (
        <div className="mt-2 flex items-center gap-1.5 rounded-md bg-blue-50 border border-blue-200 px-2 py-1.5">
          <ClipboardList className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />
          <span className="text-[11px] font-medium text-blue-700">
            {opportunity.taskCount} {opportunity.taskCount === 1 ? 'task' : 'tasks'} assigned
          </span>
        </div>
      )}
    </Card>
  )
}
