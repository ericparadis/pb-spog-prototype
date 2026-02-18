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
 * Maps stage colorClass (bg-*) to the raw color value for the CSS chevron.
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

const ARROW_WIDTH = 14

export function PipelineColumn({ stage, opportunities, onCardClick, isFirst, isLast }: PipelineColumnProps) {
  const totalValue = opportunities.reduce((sum, opp) => sum + opp.value, 0)
  const staleCount = opportunities.filter(
    (opp) => getAgingStatus(opp.daysInStage, stage) === 'stale'
  ).length

  const stageColor = getStageColor(stage.colorClass)

  // Build the chevron clip-path:
  // - First column: flat left edge, arrow right
  // - Middle columns: indented left edge (to receive previous arrow), arrow right
  // - Last column: indented left edge, flat right edge
  const getClipPath = () => {
    const leftFlat = '0 0'
    const leftIndentTop = '0 0'
    const leftIndentPoint = `${ARROW_WIDTH}px 50%`
    const leftIndentBottom = '0 100%'
    const rightArrowTop = `calc(100% - ${ARROW_WIDTH}px) 0`
    const rightArrowPoint = '100% 50%'
    const rightArrowBottom = `calc(100% - ${ARROW_WIDTH}px) 100%`
    const rightFlat = '100% 0'
    const rightFlatBottom = '100% 100%'

    if (isFirst && isLast) {
      return undefined // single column, no chevron
    }
    if (isFirst) {
      // flat left, arrow right
      return `polygon(${leftFlat}, ${rightArrowTop}, ${rightArrowPoint}, ${rightArrowBottom}, 0 100%)`
    }
    if (isLast) {
      // indented left, flat right
      return `polygon(${leftIndentTop}, ${leftIndentPoint}, ${leftIndentBottom}, ${rightFlatBottom}, ${rightFlat})`
    }
    // middle: indented left, arrow right
    return `polygon(${leftIndentTop}, ${leftIndentPoint}, ${leftIndentBottom}, ${rightArrowBottom}, ${rightArrowPoint}, ${rightArrowTop})`
  }

  return (
    <div className="w-[240px] min-w-[240px] flex-shrink-0 flex flex-col h-full">
      {/* Chevron-shaped column header */}
      <div className="relative flex items-center" style={{ height: 48 }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: stageColor,
            clipPath: getClipPath(),
          }}
        />
        {/* Header content */}
        <div
          className="relative z-10 flex flex-col justify-center w-full px-3"
          style={{ paddingLeft: isFirst ? 12 : ARROW_WIDTH + 8 }}
        >
          <div className="flex items-center justify-between gap-1">
            <span className={cn('text-xs font-semibold truncate', stage.textColorClass)}>
              {stage.label}
            </span>
            <div className="flex items-center gap-1 flex-shrink-0" style={{ paddingRight: isLast ? 0 : 8 }}>
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
