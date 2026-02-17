import { useState, useMemo } from 'react'
import { PageContent } from '@/components/PageContent'
import { useBrand } from '@/lib/contexts/BrandContext'
import { useLocationContext } from '@/lib/contexts/LocationContext'
import { useAuth } from '@/lib/contexts/AuthContext'
import { PipelineColumn } from './components/PipelineColumn'
import { OpportunityDetailDrawer } from './components/OpportunityDetailDrawer'
import { getOpportunitiesData } from './data/opportunities-data'
import { PIPELINE_STAGES } from './types'
import type { Opportunity, PipelineStage } from './types'

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

  return (
    <PageContent className="!max-w-none !px-0">
      {/* Pipeline Board — horizontally scrollable */}
      <div className="overflow-hidden">
        <div className="flex gap-0 overflow-x-auto pb-4 px-6">
          {PIPELINE_STAGES.map((stage, index) => (
            <PipelineColumn
              key={stage.id}
              stage={stage}
              opportunities={groupedByStage.get(stage.id) || []}
              onCardClick={setSelectedOpportunity}
              isFirst={index === 0}
              isLast={index === PIPELINE_STAGES.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Detail Drawer */}
      <OpportunityDetailDrawer
        opportunity={selectedOpportunity}
        open={!!selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
      />
    </PageContent>
  )
}
