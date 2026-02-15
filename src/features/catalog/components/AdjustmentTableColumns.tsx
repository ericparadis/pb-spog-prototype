import type { ColumnDef } from '@tanstack/react-table'
import type { AdjustmentTableRow } from '../types'
import { Badge } from '@/components/ui/badge'
import { SortableHeader } from '@/features/_shared/components/cell-renderers'

function formatDateRange(start: string, end: string): string {
  const s = new Date(start)
  const e = new Date(end)
  const fmt = (d: Date) =>
    `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getFullYear()).slice(2)}`
  return `${fmt(s)} → ${fmt(e)}`
}

export const adjustmentColumns: ColumnDef<AdjustmentTableRow>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        className="h-4 w-4 rounded border-gray-300"
        aria-label="Select all rows"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        className="h-4 w-4 rounded border-gray-300"
        onClick={(e) => e.stopPropagation()}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <SortableHeader column={column} label="Name" />
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">{row.original.name}</span>
    ),
  },
  {
    accessorKey: 'code',
    header: ({ column }) => (
      <SortableHeader column={column} label="Code" />
    ),
    cell: ({ row }) => (
      <code className="text-sm font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
        {row.original.code}
      </code>
    ),
  },
  {
    accessorKey: 'scope',
    header: ({ column }) => (
      <SortableHeader column={column} label="Scope" />
    ),
    cell: ({ row }) => {
      const scope = row.original.scope
      const isNational = scope === 'National'
      return (
        <Badge
          variant="outline"
          className={`text-xs font-medium px-2.5 py-0.5 border-transparent ${
            isNational
              ? 'bg-blue-100 text-blue-800'
              : 'bg-amber-100 text-amber-800'
          }`}
        >
          {scope}
        </Badge>
      )
    },
  },
  {
    id: 'items',
    accessorFn: (row) => row.adjustmentItems.length,
    header: ({ column }) => (
      <SortableHeader column={column} label="Items" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-foreground">{row.original.adjustmentItems.length}</span>
    ),
  },
  {
    id: 'activeDates',
    accessorKey: 'activeDateStart',
    header: ({ column }) => (
      <SortableHeader column={column} label="Active Dates" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDateRange(row.original.activeDateStart, row.original.activeDateEnd)}
      </span>
    ),
  },
  {
    accessorKey: 'locations',
    header: ({ column }) => (
      <SortableHeader column={column} label="Locations" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-foreground">{row.original.locations}</span>
    ),
  },
]
