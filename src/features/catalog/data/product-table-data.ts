import productsJson from '@/data/products.json'
import locationsJson from '@/data/locations.json'
import type { ProductTableRow } from '../types'

const locationMap = new Map(
  locationsJson.map((loc) => [loc.id, loc.name])
)

export function getProductTableData(brandId: string): ProductTableRow[] {
  return productsJson
    .filter((p) => p.brandId === brandId)
    .map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      subCategory: p.subCategory,
      retailPrice: p.retailPrice,
      cogs: p.cogs,
      marginPercent: p.marginPercent,
      status: p.status as 'Active' | 'Inactive',
      location: locationMap.get(p.locationId) || p.locationId,
      locationId: p.locationId,
    }))
}
