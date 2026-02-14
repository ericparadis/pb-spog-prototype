import { UserPlus, Calendar, AlertTriangle, Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import type { LeadTableRow } from '../types'

interface LeadStatsProps {
  data: LeadTableRow[]
}

export function LeadStats({ data }: LeadStatsProps) {
  const total = data.length
  const newLeads = data.filter((l) => l.status === 'lead').length
  const apptBooked = data.filter((l) => l.status === 'appt-booked').length
  const needsFollowUp = data.filter(
    (l) => l.status === 'missed-guest' || l.status === 'appt-no-show' || l.status === 'expired-guest'
  ).length

  const stats = [
    {
      label: 'Total Leads',
      value: total.toLocaleString(),
      icon: UserPlus,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      label: 'New Leads',
      value: newLeads.toLocaleString(),
      icon: Clock,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      label: 'Appt Booked',
      value: apptBooked.toLocaleString(),
      icon: Calendar,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Needs Follow-up',
      value: needsFollowUp.toLocaleString(),
      icon: AlertTriangle,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4">
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center h-10 w-10 rounded-lg ${stat.iconBg}`}>
              <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
