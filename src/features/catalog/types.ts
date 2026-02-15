export interface ProductTableRow {
  id: string
  name: string
  category: string
  subCategory: string
  retailPrice: number
  cogs: number
  marginPercent: number
  status: 'Active' | 'Inactive'
  location: string
  locationId: string
}

export interface AdjustmentTableRow {
  id: string
  name: string
  code: string
  scope: 'National' | 'Available-for-Local'
  items: number
  activeDateStart: string
  activeDateEnd: string
  locations: number
}

export interface PricingTierTableRow {
  id: string
  tierName: string
  description: string
  discountPercent: number
  eligibility: string
  productCount: number
  status: 'Active' | 'Inactive'
}
