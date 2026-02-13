import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import type { LeadStatus } from '../types'

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  'lead': {
    label: 'Lead',
    className: 'text-green-700 bg-green-50 border-green-200',
  },
  'missed-guest': {
    label: 'Missed Guest',
    className: 'text-orange-700 bg-orange-50 border-orange-200',
  },
  'appt-no-show': {
    label: 'Appt No Show',
    className: 'text-red-700 bg-red-50 border-red-200',
  },
  'lead-remarketing': {
    label: 'Lead - Remarketing',
    className: 'text-amber-700 bg-amber-50 border-amber-200',
  },
  'expired-guest': {
    label: 'Expired Guest',
    className: 'text-gray-600 bg-gray-100 border-gray-200',
  },
  'appt-booked': {
    label: 'Appt Booked',
    className: 'text-rose-700 bg-rose-50 border-rose-200',
  },
}

interface LeadStatusBadgeProps {
  status: LeadStatus
}

export function LeadStatusBadge({ status }: LeadStatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border',
        config.className
      )}
    >
      {config.label}
      <ChevronDown className="h-3 w-3" />
    </span>
  )
}
