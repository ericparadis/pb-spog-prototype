import type { ColumnDef } from '@tanstack/react-table'
import type { LeadTableRow } from '../types'
import { SortableHeader } from '@/features/_shared/components/cell-renderers'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LeadStatusBadge } from './LeadStatusBadge'
import { LeadPriorityBadge } from './LeadPriorityBadge'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

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
      <div onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="h-4 w-4 rounded border-gray-300"
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <SortableHeader column={column} label="Lead" />
    ),
    cell: ({ row }) => {
      const name = row.original.name
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">{name}</span>
        </div>
      )
    },
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
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <LeadStatusBadge status={row.original.status} />
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
