import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, SlidersHorizontal, Download } from 'lucide-react'

interface TasksToolbarProps {
  searchValue: string
  onSearchChange: (value: string) => void
  onFiltersClick: () => void
}

export function TasksToolbar({ searchValue, onSearchChange, onFiltersClick }: TasksToolbarProps) {
  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="sm" className="rounded-full" onClick={onFiltersClick}>
        <SlidersHorizontal className="h-4 w-4 mr-1.5" />
        Filters
      </Button>
      <Button size="sm" className="rounded-full">
        <Download className="h-4 w-4 mr-1.5" />
        Export
      </Button>
      <div className="relative w-[240px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-9"
        />
      </div>
    </div>
  )
}
