import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, SlidersHorizontal, Download } from 'lucide-react'

interface MemberToolbarProps {
  searchValue: string
  onSearchChange: (value: string) => void
}

export function MemberToolbar({ searchValue, onSearchChange }: MemberToolbarProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-[240px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-9"
        />
      </div>
      <Button variant="outline" size="sm" className="rounded-full">
        <SlidersHorizontal className="h-4 w-4 mr-1.5" />
        Filters
      </Button>
      <Button size="sm" className="rounded-full">
        <Download className="h-4 w-4 mr-1.5" />
        Export
      </Button>
    </div>
  )
}
