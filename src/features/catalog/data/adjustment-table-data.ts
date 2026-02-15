import adjustmentsJson from '@/data/adjustments.json'
import type { AdjustmentTableRow } from '../types'

export function getAdjustmentTableData(brandId: string): AdjustmentTableRow[] {
  return adjustmentsJson
    .filter((a) => a.brandId === brandId)
    .map((a) => ({
      id: a.id,
      name: a.name,
      code: a.code,
      scope: a.scope as 'National' | 'Available-for-Local',
      category: a.category,
      howManyUses: a.howManyUses,
      activeDateStart: a.activeDateStart,
      activeDateEnd: a.activeDateEnd,
      tier: a.tier,
      region: a.region,
      locations: a.locations,
      adjustmentItems: a.adjustmentItems,
    }))
}
