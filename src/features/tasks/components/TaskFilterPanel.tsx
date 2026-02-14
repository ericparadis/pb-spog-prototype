import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { TaskStatus, TaskType } from '../types'

export interface TaskFilters {
  status: TaskStatus | 'all'
  type: TaskType | 'all'
  assignedTo: string
}

interface TaskFilterPanelProps {
  filters: TaskFilters
  onChange: (filters: TaskFilters) => void
  onClose: () => void
  staffNames: string[]
}

export function TaskFilterPanel({ filters, onChange, onClose, staffNames }: TaskFilterPanelProps) {
  const activeCount = [
    filters.status !== 'all',
    filters.type !== 'all',
    filters.assignedTo !== 'all',
  ].filter(Boolean).length

  return (
    <div className="border rounded-lg p-4 mb-4 bg-muted/30">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-foreground">
          Filters {activeCount > 0 && `(${activeCount} active)`}
        </span>
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onChange({ status: 'all', type: 'all', assignedTo: 'all' })}
            >
              Clear all
            </Button>
          )}
          <button onClick={onClose} className="opacity-70 hover:opacity-100">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Status</label>
          <Select
            value={filters.status}
            onValueChange={(val) => onChange({ ...filters, status: val as TaskFilters['status'] })}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Type</label>
          <Select
            value={filters.type}
            onValueChange={(val) => onChange({ ...filters, type: val as TaskFilters['type'] })}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="lead-followup">Lead Followup</SelectItem>
              <SelectItem value="member-followup">Member Followup</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Assigned To</label>
          <Select
            value={filters.assignedTo}
            onValueChange={(val) => onChange({ ...filters, assignedTo: val })}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="All staff" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All staff</SelectItem>
              {staffNames.map((name) => (
                <SelectItem key={name} value={name}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
