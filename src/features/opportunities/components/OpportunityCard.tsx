import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { User } from 'lucide-react'
import type { Opportunity, StageConfig } from '../types'
import { getAgingStatus, getAgingBorderClass, getAgingTextClass } from '../types'

interface OpportunityCardProps {
  opportunity: Opportunity
  stageConfig: StageConfig
  onClick: () => void
}

export function OpportunityCard({ opportunity, stageConfig, onClick }: OpportunityCardProps) {
  const aging = getAgingStatus(opportunity.daysInStage, stageConfig)
  const borderClass = getAgingBorderClass(aging)
  const daysTextClass = getAgingTextClass(aging)

  return (
    <Card
      className={cn(
        'p-3 cursor-pointer hover:shadow-md transition-shadow border-l-4',
        borderClass
      )}
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
    </Card>
  )
}
