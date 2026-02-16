import type { ColumnDef } from '@tanstack/react-table'
import type { TaskTableRow, CommunicationType } from '../types'
import { SortableHeader } from '@/features/_shared/components/cell-renderers'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Mail, Phone, MessageSquare, Bell } from 'lucide-react'
import { TaskPriorityBadge } from './TaskPriorityBadge'

const commTypeDisplay: Record<CommunicationType, { icon: typeof Mail; label: string; className: string }> = {
  email: { icon: Mail, label: 'Email', className: 'text-muted-foreground' },
  call: { icon: Phone, label: 'Call', className: 'text-muted-foreground' },
  text: { icon: MessageSquare, label: 'Text', className: 'text-muted-foreground' },
  push: { icon: Bell, label: 'Push', className: 'text-muted-foreground' },
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export const taskColumns: ColumnDef<TaskTableRow>[] = [
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
    accessorKey: 'relatedMember',
    header: ({ column }) => (
      <SortableHeader column={column} label="Lead/Member" />
    ),
    cell: ({ row }) => {
      const name = row.original.relatedMember
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
      <TaskPriorityBadge priority={row.original.priority} />
    ),
  },
  {
    accessorKey: 'communicationType',
    header: 'Type',
    cell: ({ row }) => {
      const config = commTypeDisplay[row.original.communicationType]
      const Icon = config.icon
      return (
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${config.className}`} />
          <span className="text-sm text-foreground">{config.label}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <SortableHeader column={column} label="Task" />
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">
        {row.original.title}
      </span>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => (
      <span className="text-sm text-foreground">
        {row.original.category}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span className="text-sm text-foreground">
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: 'assignedTo',
    header: 'Assigned To',
    cell: ({ row }) => (
      <span className="text-sm text-foreground">
        {row.original.assignedTo}
      </span>
    ),
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => (
      <SortableHeader column={column} label="Due Date" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-foreground">
        {row.original.dueDate}
      </span>
    ),
  },
  {
    accessorKey: 'createdDate',
    header: ({ column }) => (
      <SortableHeader column={column} label="Created" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.createdDate}
      </span>
    ),
  },
]
