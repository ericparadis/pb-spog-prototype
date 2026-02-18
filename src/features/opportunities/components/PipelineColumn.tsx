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

/**
 * Maps stage colorClass (bg-*) to the raw color value for the CSS arrow.
 * We use inline styles for the triangle pseudo-element effect.
 */
function getStageColor(colorClass: string): string {
  const colorMap: Record<string, string> = {
    'bg-amber-100': '#fef3c7',
    'bg-amber-200': '#fde68a',
    'bg-orange-100': '#ffedd5',
    'bg-orange-200': '#fed7aa',
    'bg-sky-100': '#e0f2fe',
    'bg-sky-200': '#bae6fd',
    'bg-indigo-100': '#e0e7ff',
    'bg-indigo-200': '#c7d2fe',
  }
  return colorMap[colorClass] || '#e5e7eb'
}

export function PipelineColumn({ stage, opportunities, onCardClick, isFirst, isLast }: PipelineColumnProps) {
  const totalValue = opportunities.reduce((sum, opp) => sum + opp.value, 0)
  const staleCount = opportunities.filter(
    (opp) => getAgingStatus(opp.daysInStage, stage) === 'stale'
  ).length

  const stageColor = getStageColor(stage.colorClass)

  return (
    <div className="w-[240px] min-w-[240px] flex-shrink-0 flex flex-col h-full">
      {/* Arrow-shaped column header */}
      <div className="relative flex items-center" style={{ height: 48 }}>
        {/* Main header background */}
        <div
          className={cn(
            'absolute inset-0',
            isFirst ? 'rounded-l-md' : '',
          )}
          style={{
            backgroundColor: stageColor,
            clipPath: isLast
              ? undefined
              : 'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)',
            borderRadius: isFirst ? '6px 0 0 6px' : undefined,
          }}
        />
        {/* Inset notch on left side (except first) to receive previous arrow */}
        {!isFirst && (
          <div
            className="absolute left-0 top-0 bottom-0 w-[14px]"
            style={{
              backgroundColor: 'var(--background, #ffffff)',
              clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
            }}
          />
        )}
        {/* Header content */}
        <div className="relative z-10 flex flex-col justify-center w-full px-3" style={{ paddingLeft: isFirst ? 12 : 22 }}>
          <div className="flex items-center justify-between gap-1">
            <span className={cn('text-xs font-semibold truncate', stage.textColorClass)}>
              {stage.label}
            </span>
            <div className="flex items-center gap-1 flex-shrink-0">
              {staleCount > 0 && (
                <span className="flex items-center gap-0.5 text-[10px] font-medium text-red-700">
                  <AlertTriangle className="h-3 w-3" />
                  {staleCount}
                </span>
              )}
              <span
                className={cn(
                  'text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/60 flex-shrink-0',
                  stage.textColorClass
                )}
              >
                {opportunities.length}
              </span>
            </div>
          </div>
          <span className={cn('text-[11px] font-medium', stage.textColorClass, 'opacity-70')}>
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 0 })}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 min-h-0">
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
