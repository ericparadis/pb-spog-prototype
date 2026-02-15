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
  type: 'Discount' | 'Surcharge' | 'Promotion'
  appliesTo: string
  value: string
  startDate: string
  endDate: string
  status: 'Active' | 'Scheduled' | 'Expired'
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
