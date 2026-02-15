import type { ColumnDef } from '@tanstack/react-table'
import type { PricingTierTableRow } from '../types'
import { Badge } from '@/components/ui/badge'
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
    accessorKey: 'tierName',
    header: ({ column }) => (
      <SortableHeader column={column} label="Tier Name" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">{row.original.tierName}</span>
        <span className="text-xs text-muted-foreground">{row.original.description}</span>
      </div>
    ),
  },
  {
    accessorKey: 'discountPercent',
    header: ({ column }) => (
      <SortableHeader column={column} label="Discount" />
    ),
    cell: ({ row }) => {
      const discount = row.original.discountPercent
      return (
        <span className="text-sm font-medium text-foreground">
          {discount === 0 ? 'None' : `${discount}% off`}
        </span>
      )
    },
  },
  {
    accessorKey: 'eligibility',
    header: ({ column }) => (
      <SortableHeader column={column} label="Eligibility" />
    ),
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="text-xs font-normal px-2 py-0.5 bg-gray-100 text-gray-700 border-transparent"
      >
        {row.original.eligibility}
      </Badge>
    ),
  },
  {
    accessorKey: 'productCount',
    header: ({ column }) => (
      <SortableHeader column={column} label="Products" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-foreground">{row.original.productCount}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <SortableHeader column={column} label="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status
      const isActive = status === 'Active'
      return (
        <Badge
          variant="outline"
          className={`text-xs font-medium px-2.5 py-0.5 border-transparent ${
            isActive
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {status}
        </Badge>
      )
    },
  },
]
