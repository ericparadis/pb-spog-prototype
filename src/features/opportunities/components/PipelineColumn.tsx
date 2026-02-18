import { cn } from '@/lib/utils'
import { AlertTriangle } from 'lucide-react'
import { OpportunityCard } from './OpportunityCard'
import { getAgingStatus } from '../types'
import type { Opportunity, StageConfig } from '../types'

interface PipelineColumnProps {
  stage: StageConfig
  opportunities: Opportunity[]
  onCardClick: (opportunity: Opportunity) => void
  isFirst?: boolean
  isLast?: boolean
}

export function PipelineColumn({ stage, opportunities, onCardClick, isFirst, isLast }: PipelineColumnProps) {
  const totalValue = opportunities.reduce((sum, opp) => sum + opp.value, 0)
  const staleCount = opportunities.filter(
    (opp) => getAgingStatus(opp.daysInStage, stage) === 'stale'
  ).length

  return (
    <div className="w-[240px] min-w-[240px] flex-shrink-0 flex flex-col h-full">
      {/* Column header — white with light grey border */}
      <div
        className={cn(
          'flex items-center bg-white border border-gray-200',
          isFirst ? 'rounded-l-md' : '-ml-px',
          isLast && 'rounded-r-md'
        )}
        style={{ height: 48 }}
      >
        <div className="flex flex-col justify-center w-full px-3">
          <div className="flex items-center justify-between gap-1">
            <span className="text-xs font-semibold truncate text-gray-700">
              {stage.label}
            </span>
            <div className="flex items-center gap-1 flex-shrink-0">
              {staleCount > 0 && (
                <span className="flex items-center gap-0.5 text-[10px] font-medium text-red-700">
                  <AlertTriangle className="h-3 w-3" />
                  {staleCount}
                </span>
              )}
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600 flex-shrink-0">
                {opportunities.length}
              </span>
            </div>
          </div>
          <span className="text-[11px] font-medium text-gray-500">
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 0 })}
          </span>
        </div>
      </div>

      {/* Cards — light grey column background */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 min-h-0 bg-gray-100">
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
