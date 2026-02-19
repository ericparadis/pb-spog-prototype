import { useState, useMemo } from 'react'
import { useBrand } from '@/lib/contexts/BrandContext'
import { useLocationContext } from '@/lib/contexts/LocationContext'
import { useAuth } from '@/lib/contexts/AuthContext'
import { PipelineHeader, PipelineCardColumn } from './components/PipelineColumn'
import { OpportunityDetailDrawer } from './components/OpportunityDetailDrawer'
import { getOpportunitiesData } from './data/opportunities-data'
import { PIPELINE_STAGES } from './types'
import type { Opportunity, PipelineStage } from './types'

const COLUMN_WIDTH = 240
const CARD_COLUMN_WIDTH = 232
const CARD_GAP = 8

export default function Opportunities() {
  const { currentBrand } = useBrand()
  const { currentLocation } = useLocationContext()
  const { role } = useAuth()

  const allOpportunities = useMemo(
    () => getOpportunitiesData(currentBrand.id),
    [currentBrand.id]
  )

  // Filter by location for gym-manager role
  const opportunities = useMemo(() => {
    if (role === 'gym-manager' && currentLocation) {
      return allOpportunities.filter((o) => o.locationId === currentLocation.id)
    }
    return allOpportunities
  }, [allOpportunities, role, currentLocation])

  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)

  // Group opportunities by stage
  const groupedByStage = useMemo(() => {
    const map = new Map<PipelineStage, Opportunity[]>()
    for (const stage of PIPELINE_STAGES) {
      map.set(stage.id, [])
    }
    for (const opp of opportunities) {
      map.get(opp.pipelineStage)?.push(opp)
    }
    return map
  }, [opportunities])

  // Total width of the header row (columns flush, no gaps)
  const headerRowWidth = PIPELINE_STAGES.length * COLUMN_WIDTH
  // Total width of the card row (narrower columns with gaps)
  const cardRowWidth =
    PIPELINE_STAGES.length * CARD_COLUMN_WIDTH +
    (PIPELINE_STAGES.length - 1) * CARD_GAP

  // Use the wider of the two so everything scrolls together
  const contentWidth = Math.max(headerRowWidth, cardRowWidth)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Pipeline Board — horizontally scrollable */}
      <div className="flex-1 min-h-0 min-w-0 overflow-x-auto overflow-y-hidden px-6 pb-4 pt-4">
        <div className="flex flex-col h-full" style={{ width: contentWidth }}>
          {/* Header row — flush chevrons, no gaps */}
          <div className="flex gap-0 flex-shrink-0">
            {PIPELINE_STAGES.map((stage, index) => (
              <PipelineHeader
                key={stage.id}
                stage={stage}
                opportunities={groupedByStage.get(stage.id) || []}
                isFirst={index === 0}
                isLast={index === PIPELINE_STAGES.length - 1}
                stageIndex={index}
                totalStages={PIPELINE_STAGES.length}
              />
            ))}
          </div>

          {/* Card columns — with gaps between them */}
          <div className="flex gap-2 flex-1 min-h-0 mt-2">
            {PIPELINE_STAGES.map((stage) => (
              <PipelineCardColumn
                key={stage.id}
                stage={stage}
                opportunities={groupedByStage.get(stage.id) || []}
                onCardClick={setSelectedOpportunity}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      <OpportunityDetailDrawer
        opportunity={selectedOpportunity}
        open={!!selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
      />
    </div>
  )
}
