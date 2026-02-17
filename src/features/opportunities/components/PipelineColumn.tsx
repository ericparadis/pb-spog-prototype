import { cn } from '@/lib/utils'
import { AlertTriangle } from 'lucide-react'
import { OpportunityCard } from './OpportunityCard'
import { getAgingStatus } from '../types'
import type { Opportunity, StageConfig } from '../types'

interface PipelineColumnProps {
  stage: StageConfig
  opportunities: Opportunity[]
  onCardClick: (opportunity: Opportunity) => void
}

export function PipelineColumn({ stage, opportunities, onCardClick }: PipelineColumnProps) {
  const totalValue = opportunities.reduce((sum, opp) => sum + opp.value, 0)
  const staleCount = opportunities.filter(
    (opp) => getAgingStatus(opp.daysInStage, stage) === 'stale'
  ).length

  return (
    <div className="w-[260px] min-w-[260px] flex-shrink-0 flex flex-col rounded-lg border bg-muted/20">
      {/* Column header */}
      <div className={cn('px-3 py-2.5 rounded-t-lg', stage.colorClass)}>
        <div className="flex items-center justify-between gap-1">
          <span className={cn('text-xs font-semibold truncate', stage.textColorClass)}>
            {stage.label}
          </span>
          <span
            className={cn(
              'text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/60 flex-shrink-0',
              stage.textColorClass
            )}
          >
            {opportunities.length}
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className={cn('text-[11px] font-medium', stage.textColorClass, 'opacity-80')}>
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          {staleCount > 0 && (
            <span className="flex items-center gap-0.5 text-[10px] font-medium text-red-700">
              <AlertTriangle className="h-3 w-3" />
              {staleCount}
            </span>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2" style={{ maxHeight: 'calc(100vh - 320px)' }}>
        {opportunities.map((opp) => (
          <OpportunityCard
            key={opp.id}
            opportunity={opp}
            stageConfig={stage}
            onClick={() => onCardClick(opp)}
          />
        ))}
        {opportunities.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-6">No opportunities</p>
        )}
      </div>
    </div>
  )
}
