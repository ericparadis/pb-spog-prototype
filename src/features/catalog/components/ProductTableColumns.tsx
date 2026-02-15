import type { ColumnDef } from '@tanstack/react-table'
import type { ProductTableRow } from '../types'
import { Badge } from '@/components/ui/badge'
import { SortableHeader } from '@/features/_shared/components/cell-renderers'

function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`
}

export const productColumns: ColumnDef<ProductTableRow>[] = [
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
      <SortableHeader column={column} label="Product Name" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">{row.original.name}</span>
        <span className="text-xs text-muted-foreground">{row.original.subCategory}</span>
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <SortableHeader column={column} label="Category" />
    ),
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="text-xs font-normal px-2 py-0.5 bg-gray-100 text-gray-700 border-transparent"
      >
        {row.original.category}
      </Badge>
    ),
  },
  {
    accessorKey: 'retailPrice',
    header: ({ column }) => (
      <SortableHeader column={column} label="Retail Price" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-foreground">{formatCurrency(row.original.retailPrice)}</span>
    ),
  },
  {
    accessorKey: 'cogs',
    header: ({ column }) => (
      <SortableHeader column={column} label="COGS" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{formatCurrency(row.original.cogs)}</span>
    ),
  },
  {
    accessorKey: 'marginPercent',
    header: ({ column }) => (
      <SortableHeader column={column} label="Margin %" />
    ),
    cell: ({ row }) => {
      const margin = row.original.marginPercent
      return (
        <span className={`text-sm font-medium ${margin >= 65 ? 'text-green-700' : margin >= 55 ? 'text-yellow-700' : 'text-red-700'}`}>
          {margin}%
        </span>
      )
    },
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
          className={`text-xs font-medium px-2.5 py-0.5 ${
            isActive
              ? 'bg-green-100 text-green-800 border-transparent'
              : 'bg-red-100 text-red-800 border-transparent'
          }`}
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'location',
    header: ({ column }) => (
      <SortableHeader column={column} label="Location" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-foreground">{row.original.location}</span>
    ),
  },
]
