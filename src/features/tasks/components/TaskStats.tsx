import { ListTodo, Clock, Loader2, AlertTriangle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import type { TaskTableRow } from '../types'

interface TaskStatsProps {
  data: TaskTableRow[]
}

export function TaskStats({ data }: TaskStatsProps) {
  const total = data.length
  const open = data.filter((t) => t.status === 'open').length
  const inProgress = data.filter((t) => t.status === 'in-progress').length
  const overdue = data.filter((t) => t.status === 'overdue').length

  const stats = [
    {
      label: 'Total Tasks',
      value: total.toLocaleString(),
      icon: ListTodo,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      label: 'Open',
      value: open.toLocaleString(),
      icon: Clock,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      label: 'In Progress',
      value: inProgress.toLocaleString(),
      icon: Loader2,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      label: 'Overdue',
      value: overdue.toLocaleString(),
      icon: AlertTriangle,
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
