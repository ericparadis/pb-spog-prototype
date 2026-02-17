import { useState, useMemo, Fragment } from 'react'
import { PageContent } from '@/components/PageContent'
import { PageHeader } from '@/components/PageHeader'
import { useBrand } from '@/lib/contexts/BrandContext'
import { useLocationContext } from '@/lib/contexts/LocationContext'
import { useAuth } from '@/lib/contexts/AuthContext'
import { PipelineSummary } from './components/PipelineSummary'
import { PipelineColumn } from './components/PipelineColumn'
import { OpportunityDetailDrawer } from './components/OpportunityDetailDrawer'
import { getOpportunitiesData, getPipelineSummary } from './data/opportunities-data'
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

  const summary = useMemo(
    () => getPipelineSummary(opportunities),
    [opportunities]
  )

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
    <PageContent className="!max-w-none">
      <PageHeader
        title="Opportunities"
        description="Customer lifecycle pipeline — track leads through conversion to membership"
      />

      {/* Summary Stats */}
      <PipelineSummary summary={summary} />

      {/* Pipeline Board */}
      <div>
        {/* Stage group labels */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Leads
            </span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-sky-400" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Patrons
            </span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-indigo-400" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Members
            </span>
          </div>
        </div>

        {/* Horizontal scrollable pipeline */}
        <div className="flex gap-3 overflow-x-auto pb-4">
          {PIPELINE_STAGES.map((stage, index) => (
            <Fragment key={stage.id}>
              {/* Visual divider between lead group and patron/member group */}
              {index === 5 && (
                <div className="w-px bg-border flex-shrink-0 my-2" />
              )}
              <PipelineColumn
                stage={stage}
                opportunities={groupedByStage.get(stage.id) || []}
                onCardClick={setSelectedOpportunity}
              />
            </Fragment>
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
