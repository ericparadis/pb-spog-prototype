import { Package, Percent, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'

export type CatalogTab = 'products' | 'adjustments' | 'pricing-tiers'

interface CatalogPillTabsProps {
  activeTab: CatalogTab
  onChange: (tab: CatalogTab) => void
}

const tabs: { value: CatalogTab; label: string; icon: typeof Package }[] = [
  { value: 'products', label: 'Products', icon: Package },
  { value: 'adjustments', label: 'Adjustment Catalog', icon: Percent },
  { value: 'pricing-tiers', label: 'Pricing Tiers', icon: Tag },
]

export function CatalogPillTabs({ activeTab, onChange }: CatalogPillTabsProps) {
  return (
    <div className="flex items-center gap-2 mb-5">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = tab.value === activeTab
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border',
              isActive
                ? 'bg-foreground text-background border-foreground'
                : 'bg-background text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
