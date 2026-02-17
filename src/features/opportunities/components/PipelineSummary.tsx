import { Card } from '@/components/ui/card'
import { UserPlus, Users, Award, TrendingUp, AlertTriangle } from 'lucide-react'
import type { PipelineSummaryData } from '../types'

interface PipelineSummaryProps {
  summary: PipelineSummaryData
}

export function PipelineSummary({ summary }: PipelineSummaryProps) {
  const stats = [
    {
      label: 'Total Leads',
      value: summary.totalLeads.toString(),
      icon: UserPlus,
      iconBg: 'bg-amber-500',
    },
    {
      label: 'Total Patrons',
      value: summary.totalPatrons.toString(),
      icon: Users,
      iconBg: 'bg-sky-500',
    },
    {
      label: 'Total Members',
      value: summary.totalMembers.toString(),
      icon: Award,
      iconBg: 'bg-indigo-500',
    },
    {
      label: 'Conversion Rate',
      value: `${summary.conversionRate}%`,
      icon: TrendingUp,
      iconBg: 'bg-emerald-500',
    },
    {
      label: 'At Risk',
      value: summary.atRiskCount.toString(),
      icon: AlertTriangle,
      iconBg: summary.atRiskCount > 0 ? 'bg-red-500' : 'bg-gray-400',
    },
  ]

  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center justify-center h-10 w-10 rounded-lg ${stat.iconBg}`}
            >
              <stat.icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
