import { PageHeader } from '@/components/PageHeader'
import { PageContent } from '@/components/PageContent'
import { StatCard } from '@/components/StatCard'
import { Users, CalendarDays, DollarSign, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  return (
    <PageContent>
      <PageHeader title="Dashboard" description="Overview of your gym performance" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Members"
          value="1,234"
          description="Active memberships"
          icon={Users}
          trend={{ value: 12, label: 'from last month' }}
        />
        <StatCard
          title="Classes Today"
          value="18"
          description="Scheduled classes"
          icon={CalendarDays}
        />
        <StatCard
          title="Revenue This Month"
          value="$45,231"
          description="This month"
          icon={DollarSign}
          trend={{ value: 8, label: 'from last month' }}
        />
        <StatCard title="Check-Ins" value="342" description="Today" icon={TrendingUp} />
      </div>
    </PageContent>
  )
}
