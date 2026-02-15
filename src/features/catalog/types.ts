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
  tierNumber: number
  tierName: string
}
