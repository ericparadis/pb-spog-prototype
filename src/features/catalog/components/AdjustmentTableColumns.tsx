import type { ColumnDef } from '@tanstack/react-table'
import type { AdjustmentTableRow } from '../types'
import { Badge } from '@/components/ui/badge'
import { SortableHeader } from '@/features/_shared/components/cell-renderers'

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
      <SortableHeader column={column} label="Adjustment Name" />
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">{row.original.name}</span>
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <SortableHeader column={column} label="Type" />
    ),
    cell: ({ row }) => {
      const type = row.original.type
      const colorMap: Record<string, string> = {
        Discount: 'bg-blue-100 text-blue-800',
        Surcharge: 'bg-orange-100 text-orange-800',
        Promotion: 'bg-purple-100 text-purple-800',
      }
      return (
        <Badge
          variant="outline"
          className={`text-xs font-medium px-2.5 py-0.5 border-transparent ${colorMap[type] || ''}`}
        >
          {type}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'appliesTo',
    header: ({ column }) => (
      <SortableHeader column={column} label="Applies To" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-foreground">{row.original.appliesTo}</span>
    ),
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">{row.original.value}</span>
    ),
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => (
      <SortableHeader column={column} label="Start Date" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.original.startDate).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: 'endDate',
    header: ({ column }) => (
      <SortableHeader column={column} label="End Date" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.original.endDate).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <SortableHeader column={column} label="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status
      const colorMap: Record<string, string> = {
        Active: 'bg-green-100 text-green-800',
        Scheduled: 'bg-yellow-100 text-yellow-800',
        Expired: 'bg-gray-100 text-gray-500',
      }
      return (
        <Badge
          variant="outline"
          className={`text-xs font-medium px-2.5 py-0.5 border-transparent ${colorMap[status] || ''}`}
        >
          {status}
        </Badge>
      )
    },
  },
]
