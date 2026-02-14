import { Users, CheckCircle, AlertTriangle, Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import type { MemberTableRow } from '../types'

interface MemberStatsProps {
  data: MemberTableRow[]
}

export function MemberStats({ data }: MemberStatsProps) {
  const total = data.length
  const active = data.filter((m) => m.agreementStatus === 'Active').length
  // Mock "needs attention" as a proportion for demo purposes
  const needsAttention = Math.round(total * 0.1)
  const pastDue = data.filter((m) => m.agreementStatus === 'Expired').length

  const stats = [
    {
      label: 'Total Members',
      value: total.toLocaleString(),
      icon: Users,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      label: 'Active',
      value: active.toLocaleString(),
      icon: CheckCircle,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      label: 'Needs Attention',
      value: needsAttention.toLocaleString(),
      icon: AlertTriangle,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      label: 'Past Due',
      value: pastDue.toLocaleString(),
      icon: Clock,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
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
