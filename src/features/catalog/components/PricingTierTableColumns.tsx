import type { ColumnDef } from '@tanstack/react-table'
import type { PricingTierTableRow } from '../types'
import { SortableHeader } from '@/features/_shared/components/cell-renderers'

export const pricingTierColumns: ColumnDef<PricingTierTableRow>[] = [
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
    accessorKey: 'tierNumber',
    header: ({ column }) => (
      <SortableHeader column={column} label="Tier Number" />
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">{row.original.tierNumber}</span>
    ),
  },
  {
    accessorKey: 'tierName',
    header: ({ column }) => (
      <SortableHeader column={column} label="Tier Name" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-foreground">{row.original.tierName}</span>
    ),
  },
]
