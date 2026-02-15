import type { ColumnDef } from '@tanstack/react-table'
import type { StaffTableRow } from '../types'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { SortableHeader } from '@/features/_shared/components/cell-renderers'
import { Briefcase } from 'lucide-react'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export const staffColumns: ColumnDef<StaffTableRow>[] = [
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
      <SortableHeader column={column} label="Profile" />
    ),
    cell: ({ row }) => {
      const { name, email } = row.original
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">{name}</span>
            <span className="text-xs text-muted-foreground">{email}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <SortableHeader column={column} label="Title" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Briefcase className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className="text-sm text-foreground">{row.original.title}</span>
      </div>
    ),
  },
  {
    accessorKey: 'locations',
    header: 'Locations',
    cell: ({ row }) => {
      const locations = row.original.locations
      return (
        <div className="flex flex-wrap gap-1.5">
          {locations.map((loc) => (
            <Badge
              key={loc}
              variant="outline"
              className="text-xs font-normal px-2 py-0.5 bg-gray-100 text-gray-700 border-transparent"
            >
              {loc}
            </Badge>
          ))}
        </div>
      )
    },
    enableSorting: false,
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
]
