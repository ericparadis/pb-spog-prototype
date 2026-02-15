import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, SlidersHorizontal, Download, Plus } from 'lucide-react'

interface CatalogToolbarProps {
  searchValue: string
  onSearchChange: (value: string) => void
  onAddProduct: () => void
  searchPlaceholder?: string
  addLabel?: string
}

export function CatalogToolbar({
  searchValue,
  onSearchChange,
  onAddProduct,
  searchPlaceholder = 'Search products...',
  addLabel = 'Add Product',
}: CatalogToolbarProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="relative w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <Button variant="outline" size="sm" className="rounded-full">
          <SlidersHorizontal className="h-4 w-4 mr-1.5" />
          Filters
        </Button>
        <Button variant="outline" size="sm" className="rounded-full">
          <Download className="h-4 w-4 mr-1.5" />
          Export
        </Button>
      </div>
      <Button size="sm" onClick={onAddProduct}>
        <Plus className="h-4 w-4 mr-1.5" />
        {addLabel}
      </Button>
    </div>
  )
}
