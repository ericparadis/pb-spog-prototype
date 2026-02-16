import { PageContent } from '@/components/PageContent'
import { Card } from '@/components/ui/card'
import {
  Users,
  UserCheck,
  UserPlus,
  Target,
  DollarSign,
  ScanLine,
} from 'lucide-react'

const stats = [
  { label: 'Total Members', value: '1,234', icon: Users, iconBg: 'bg-indigo-500' },
  { label: 'Active Members', value: '1,089', icon: UserCheck, iconBg: 'bg-emerald-500' },
  { label: 'New This Month', value: '47', icon: UserPlus, iconBg: 'bg-cyan-500' },
  { label: 'Total Leads', value: '128', icon: Target, iconBg: 'bg-violet-500' },
  { label: 'Monthly Revenue', value: '$45,231', icon: DollarSign, iconBg: 'bg-amber-500' },
  { label: 'Check-Ins Today', value: '342', icon: ScanLine, iconBg: 'bg-rose-500' },
]

export default function Dashboard() {
  return (
    <PageContent>
      {/* Stats Row */}
      <div className="grid grid-cols-6 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center h-10 w-10 rounded-lg ${stat.iconBg}`}>
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
    </PageContent>
  )
}
