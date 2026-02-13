import type { ColumnDef } from '@tanstack/react-table'
import type { MemberTableRow } from '../types'
import {
  MemberCell,
  MembershipBadge,
  TrendCell,
  AlertPill,
  SortableHeader,
} from '@/features/_shared/components/cell-renderers'

export const memberColumns: ColumnDef<MemberTableRow>[] = [
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
      <SortableHeader column={column} label="Member" />
    ),
    cell: ({ row }) => (
      <MemberCell
        name={row.original.name}
        memberId={row.original.memberId}
        photoUrl={row.original.photoUrl}
      />
    ),
  },
  {
    accessorKey: 'membershipTier',
    header: ({ column }) => (
      <SortableHeader column={column} label="Membership" />
    ),
    cell: ({ row }) => (
      <MembershipBadge tier={row.original.membershipTier} />
    ),
  },
  {
    accessorKey: 'joinDate',
    header: ({ column }) => (
      <SortableHeader column={column} label="Join Date" />
    ),
  },
  {
    id: 'week1',
    header: 'Week 1',
    cell: ({ row }) => (
      <TrendCell
        value={row.original.week1.value}
        trend={row.original.week1.trend}
      />
    ),
  },
  {
    id: 'week2',
    header: 'Week 2',
    cell: ({ row }) => (
      <TrendCell
        value={row.original.week2.value}
        trend={row.original.week2.trend}
      />
    ),
  },
  {
    id: 'week3',
    header: 'Week 3',
    cell: ({ row }) => (
      <TrendCell
        value={row.original.week3.value}
        trend={row.original.week3.trend}
      />
    ),
  },
  {
    id: 'week4',
    header: 'Week 4',
    cell: ({ row }) => (
      <TrendCell
        value={row.original.week4.value}
        trend={row.original.week4.trend}
      />
    ),
  },
  {
    accessorKey: 'classes',
    header: ({ column }) => (
      <SortableHeader column={column} label="Classes" />
    ),
    cell: ({ row }) => (
      <span className="text-sm tabular-nums font-medium">
        {row.original.classes}
      </span>
    ),
  },
  {
    accessorKey: 'lastVisit',
    header: ({ column }) => (
      <SortableHeader column={column} label="Last Visit" />
    ),
  },
  {
    id: 'alerts',
    header: 'Alerts',
    cell: ({ row }) =>
      row.original.alerts.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {row.original.alerts.map((alert, i) => (
            <AlertPill key={i} type={alert.type} label={alert.label} />
          ))}
        </div>
      ) : (
        <span className="text-sm text-muted-foreground">-</span>
      ),
  },
  {
    accessorKey: 'coach',
    header: ({ column }) => (
      <SortableHeader column={column} label="Coach" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-foreground">
        {row.original.coach || '\u2014'}
      </span>
    ),
  },
]
