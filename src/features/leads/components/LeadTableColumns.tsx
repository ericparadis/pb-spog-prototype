import type { ColumnDef } from '@tanstack/react-table'
import type { LeadTableRow } from '../types'
import { SortableHeader } from '@/features/_shared/components/cell-renderers'
import { LeadStatusBadge } from './LeadStatusBadge'
import { LeadPriorityBadge } from './LeadPriorityBadge'

export const leadColumns: ColumnDef<LeadTableRow>[] = [
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
        aria-label="Select row"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <SortableHeader column={column} label="Lead Name" />
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">
        {row.original.name}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <LeadStatusBadge status={row.original.status} />
    ),
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <SortableHeader column={column} label="Priority" />
    ),
    cell: ({ row }) => (
      <LeadPriorityBadge priority={row.original.priority} />
    ),
  },
  {
    accessorKey: 'source',
    header: 'Source',
    cell: ({ row }) => (
      <span className="text-sm text-foreground">
        {row.original.source}
      </span>
    ),
  },
  {
    accessorKey: 'assignedStaff',
    header: 'Assigned Staff',
    cell: ({ row }) => (
      <span className="text-sm text-foreground">
        {row.original.assignedStaff}
      </span>
    ),
  },
  {
    accessorKey: 'appointment',
    header: 'Appointment',
    cell: ({ row }) => (
      <span className={`text-sm ${row.original.appointment === 'N/A' || row.original.appointment === 'Not Scheduled' ? 'text-muted-foreground' : 'text-foreground'}`}>
        {row.original.appointment}
      </span>
    ),
  },
  {
    accessorKey: 'lastActivity',
    header: ({ column }) => (
      <SortableHeader column={column} label="Last Activity" />
    ),
  },
  {
    accessorKey: 'daysOpen',
    header: ({ column }) => (
      <SortableHeader column={column} label="Days Open" />
    ),
    cell: ({ row }) => (
      <span className="text-sm tabular-nums font-semibold text-foreground">
        {row.original.daysOpen}
      </span>
    ),
  },
]
