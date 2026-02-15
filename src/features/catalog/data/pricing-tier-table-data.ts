import pricingTiersJson from '@/data/pricing-tiers.json'
import type { PricingTierTableRow } from '../types'

export function getPricingTierTableData(brandId: string): PricingTierTableRow[] {
  return pricingTiersJson
    .filter((t) => t.brandId === brandId)
    .map((t) => ({
      id: t.id,
      tierNumber: t.tierNumber,
      tierName: t.tierName,
    }))
}
