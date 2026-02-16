import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, SlidersHorizontal, Download } from 'lucide-react'
import { TableCategorySelector } from './TableCategorySelector'
import type { TableCategoryOption } from './TableCategorySelector'

interface TableStandardHeaderProps<T extends string = string> {
  categories?: TableCategoryOption<T>[]
  categoryValue?: T
  onCategoryChange?: (value: T) => void
  searchValue: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  onFiltersClick?: () => void
  actions?: ReactNode
}

export function TableStandardHeader<T extends string = string>({
  categories,
  categoryValue,
  onCategoryChange,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  onFiltersClick,
  actions,
}: TableStandardHeaderProps<T>) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-muted/50">
      <div>
        {categories && categoryValue !== undefined && onCategoryChange && (
          <TableCategorySelector
            options={categories}
            value={categoryValue}
            onChange={onCategoryChange}
          />
        )}
      </div>
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
        <Button variant="outline" size="sm" className="rounded-full" onClick={onFiltersClick}>
          <SlidersHorizontal className="h-4 w-4 mr-1.5" />
          Filters
        </Button>
        <Button variant="outline" size="sm" className="rounded-full">
          <Download className="h-4 w-4 mr-1.5" />
          Export
        </Button>
        {actions}
      </div>
    </div>
  )
}
