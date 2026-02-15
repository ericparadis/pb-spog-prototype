import type { PricingTierTableRow } from '../types'

const pricingTiersByBrand: Record<string, PricingTierTableRow[]> = {
  'anytime-fitness': [
    {
      id: 'tier-1',
      tierName: 'Retail',
      description: 'Standard walk-in pricing for non-members',
      discountPercent: 0,
      eligibility: 'Non-members',
      productCount: 15,
      status: 'Active',
    },
    {
      id: 'tier-2',
      tierName: 'Member',
      description: 'Standard discount for active members',
      discountPercent: 10,
      eligibility: 'Active Members',
      productCount: 15,
      status: 'Active',
    },
    {
      id: 'tier-3',
      tierName: 'Premium Member',
      description: 'Enhanced discount for premium plan holders',
      discountPercent: 15,
      eligibility: 'Premium Plan',
      productCount: 15,
      status: 'Active',
    },
    {
      id: 'tier-4',
      tierName: 'Staff',
      description: 'Employee pricing for all staff',
      discountPercent: 25,
      eligibility: 'Staff & Trainers',
      productCount: 15,
      status: 'Active',
    },
    {
      id: 'tier-5',
      tierName: 'Wholesale',
      description: 'Bulk ordering for multi-location distribution',
      discountPercent: 35,
      eligibility: 'Franchise Owners',
      productCount: 8,
      status: 'Inactive',
    },
  ],
  'orangetheory': [
    {
      id: 'tier-6',
      tierName: 'Retail',
      description: 'Standard pricing for non-members',
      discountPercent: 0,
      eligibility: 'Non-members',
      productCount: 10,
      status: 'Active',
    },
    {
      id: 'tier-7',
      tierName: 'Member',
      description: 'Discount for active members',
      discountPercent: 10,
      eligibility: 'Active Members',
      productCount: 10,
      status: 'Active',
    },
    {
      id: 'tier-8',
      tierName: 'Elite Member',
      description: 'Enhanced discount for unlimited plan holders',
      discountPercent: 20,
      eligibility: 'Unlimited Plan',
      productCount: 10,
      status: 'Active',
    },
    {
      id: 'tier-9',
      tierName: 'Staff',
      description: 'Employee pricing for coaches and staff',
      discountPercent: 30,
      eligibility: 'Staff & Coaches',
      productCount: 10,
      status: 'Active',
    },
  ],
}

export function getPricingTierTableData(brandId: string): PricingTierTableRow[] {
  return pricingTiersByBrand[brandId] || []
}
