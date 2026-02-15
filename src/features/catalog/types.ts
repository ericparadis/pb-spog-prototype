export interface ProductTierPrice {
  tierNumber: number
  frequency: string
  price: number
  included?: boolean
}

export interface ProductItem {
  name: string
  optional: boolean
  quantity: number
  replenish: string
  billingType: string
  tierPricing: ProductTierPrice[]
}

export interface BillingMechanics {
  initialTermMonths: number
  renewalSetting: 'n-to-n' | 'to-term' | 'terminates'
  renewalAlertMonths: number
}

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
  description: string
  region: string
  items: ProductItem[]
  billingMechanics: BillingMechanics
}

export interface AdjustmentItemDetail {
  name: string
  adjustmentType: string
  periods: number
  value: string
}

export interface AdjustmentTableRow {
  id: string
  name: string
  code: string
  scope: 'National' | 'Available-for-Local'
  category: string
  howManyUses: number
  activeDateStart: string
  activeDateEnd: string
  tier: number
  region: string
  locations: number
  adjustmentItems: AdjustmentItemDetail[]
}

export interface PricingTierTableRow {
  id: string
  tierNumber: number
  tierName: string
}
