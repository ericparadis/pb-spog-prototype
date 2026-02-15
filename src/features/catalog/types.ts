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
