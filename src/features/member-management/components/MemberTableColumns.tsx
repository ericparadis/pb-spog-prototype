import type { ColumnDef } from '@tanstack/react-table'
import type { MemberTableRow } from '../types'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { SortableHeader } from '@/features/_shared/components/cell-renderers'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

const memberTypeStyles: Record<string, string> = {
  Member: 'bg-blue-100 text-blue-800 border-transparent',
  'Pay Per Visit': 'bg-amber-100 text-amber-800 border-transparent',
  Trial: 'bg-purple-100 text-purple-800 border-transparent',
  Staff: 'bg-gray-100 text-gray-800 border-transparent',
}

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
    cell: ({ row }) => {
      const { name } = row.original
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
    id: 'contact',
    header: 'Contact',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm text-foreground">{row.original.email}</span>
        <span className="text-xs text-muted-foreground">{row.original.phone}</span>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'memberType',
    header: ({ column }) => (
      <SortableHeader column={column} label="Member Type" />
    ),
    cell: ({ row }) => {
      const type = row.original.memberType
      const style = memberTypeStyles[type] || memberTypeStyles['Member']
      return (
        <Badge variant="outline" className={`text-xs font-medium px-2.5 py-0.5 ${style}`}>
          {type}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'membershipName',
    header: ({ column }) => (
      <SortableHeader column={column} label="Membership" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className="text-xs font-medium px-2.5 py-0.5 bg-gray-100 text-gray-700 border-transparent">
        {row.original.membershipName}
      </Badge>
    ),
  },
  {
    accessorKey: 'agreementStatus',
    header: ({ column }) => (
      <SortableHeader column={column} label="Agreement Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.agreementStatus
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
    accessorKey: 'lastVisit',
    header: ({ column }) => (
      <SortableHeader column={column} label="Last Visit" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.lastVisit}
      </span>
    ),
  },
]
