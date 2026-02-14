import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, SlidersHorizontal, Download, Plus } from 'lucide-react'

interface StaffToolbarProps {
  searchValue: string
  onSearchChange: (value: string) => void
  onAddStaff: () => void
}

export function StaffToolbar({ searchValue, onSearchChange, onAddStaff }: StaffToolbarProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="relative w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search staff..."
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
      <Button size="sm" onClick={onAddStaff}>
        <Plus className="h-4 w-4 mr-1.5" />
        Add Staff Member
      </Button>
    </div>
  )
}
