import type { Column } from '@tanstack/react-table'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

interface SortableHeaderProps<TData> {
  column: Column<TData>
  label: string
}

export function SortableHeader<TData>({
  column,
  label,
}: SortableHeaderProps<TData>) {
  const sorted = column.getIsSorted()
  return (
    <button
      className="flex items-center gap-1 hover:text-foreground transition-colors"
      onClick={() => column.toggleSorting(sorted === 'asc')}
    >
      <span>{label}</span>
      {sorted === 'asc' ? (
        <ArrowUp className="h-3.5 w-3.5" />
      ) : sorted === 'desc' ? (
        <ArrowDown className="h-3.5 w-3.5" />
      ) : (
        <ArrowUpDown className="h-3.5 w-3.5 opacity-50" />
      )}
    </button>
  )
}
