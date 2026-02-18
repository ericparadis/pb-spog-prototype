import { AlertTriangle } from 'lucide-react'
import { OpportunityCard } from './OpportunityCard'
import { getAgingStatus } from '../types'
import type { Opportunity, StageConfig } from '../types'

const ARROW_WIDTH = 14

/* ---------- Chevron Header ---------- */

interface PipelineHeaderProps {
  stage: StageConfig
  opportunities: Opportunity[]
  isFirst?: boolean
  isLast?: boolean
}

function getClipPath(isFirst?: boolean, isLast?: boolean) {
  const leftFlat = '0 0'
  const leftIndentTop = '0 0'
  const leftIndentPoint = `${ARROW_WIDTH}px 50%`
  const leftIndentBottom = '0 100%'
  const rightArrowTop = `calc(100% - ${ARROW_WIDTH}px) 0`
  const rightArrowPoint = '100% 50%'
  const rightArrowBottom = `calc(100% - ${ARROW_WIDTH}px) 100%`
  const rightFlat = '100% 0'
  const rightFlatBottom = '100% 100%'

  if (isFirst && isLast) return undefined
  if (isFirst) return `polygon(${leftFlat}, ${rightArrowTop}, ${rightArrowPoint}, ${rightArrowBottom}, 0 100%)`
  if (isLast) return `polygon(${leftIndentTop}, ${leftIndentPoint}, ${leftIndentBottom}, ${rightFlatBottom}, ${rightFlat})`
  return `polygon(${leftIndentTop}, ${leftIndentPoint}, ${leftIndentBottom}, ${rightArrowBottom}, ${rightArrowPoint}, ${rightArrowTop})`
}

export function PipelineHeader({ stage, opportunities, isFirst, isLast }: PipelineHeaderProps) {
  const totalValue = opportunities.reduce((sum, opp) => sum + opp.value, 0)
  const staleCount = opportunities.filter(
    (opp) => getAgingStatus(opp.daysInStage, stage) === 'stale'
  ).length

  const clipPath = getClipPath(isFirst, isLast)

  return (
    <div className="w-[240px] min-w-[240px] flex-shrink-0 relative flex items-center" style={{ height: 48 }}>
      {/* Grey outline shape */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: '#e5e7eb', clipPath }}
      />
      {/* White fill (inset by 1px to show grey border) */}
      <div
        className="absolute"
        style={{ top: 1, left: 1, right: 1, bottom: 1, backgroundColor: '#ffffff', clipPath }}
      />
      {/* Header content */}
      <div
        className="relative z-10 flex flex-col justify-center w-full px-3"
        style={{ paddingLeft: isFirst ? 12 : ARROW_WIDTH + 8 }}
      >
        <div className="flex items-center justify-between gap-1">
          <span className="text-xs font-semibold truncate text-gray-700">
            {stage.label}
          </span>
          <div className="flex items-center gap-1 flex-shrink-0" style={{ paddingRight: isLast ? 0 : 8 }}>
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
  )
}

/* ---------- Card Column ---------- */

interface PipelineCardColumnProps {
  stage: StageConfig
  opportunities: Opportunity[]
  onCardClick: (opportunity: Opportunity) => void
}

export function PipelineCardColumn({ stage, opportunities, onCardClick }: PipelineCardColumnProps) {
  return (
    <div className="w-[232px] min-w-[232px] flex-shrink-0 flex flex-col min-h-0 h-full bg-gray-100 rounded-lg">
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
