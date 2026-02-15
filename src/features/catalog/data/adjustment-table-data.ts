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
      items: a.items,
      activeDateStart: a.activeDateStart,
      activeDateEnd: a.activeDateEnd,
      locations: a.locations,
    }))
}
