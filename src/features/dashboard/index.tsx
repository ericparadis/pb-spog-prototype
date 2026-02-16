import { PageHeader } from '@/components/PageHeader'
import { PageContent } from '@/components/PageContent'
import { Card } from '@/components/ui/card'
import {
  Users,
  UserCheck,
  UserPlus,
  Target,
  DollarSign,
  ScanLine,
  UserRoundPlus,
  CreditCard,
  Dumbbell,
  CalendarCheck,
  ArrowRight,
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

// --- Fake data ---

const revenueData = [
  { month: 'Jul', revenue: 38200 },
  { month: 'Aug', revenue: 41500 },
  { month: 'Sep', revenue: 39800 },
  { month: 'Oct', revenue: 43100 },
  { month: 'Nov', revenue: 44600 },
  { month: 'Dec', revenue: 45231 },
]

const membershipData = [
  { name: 'Basic', value: 420, color: '#6366f1' },
  { name: 'Premium', value: 380, color: '#10b981' },
  { name: 'Elite', value: 280, color: '#f59e0b' },
  { name: 'Wellness', value: 154, color: '#8b5cf6' },
]

const classCapacityData = [
  { category: 'Strength', enrolled: 42, capacity: 50 },
  { category: 'Cardio', enrolled: 38, capacity: 45 },
  { category: 'HIIT', enrolled: 28, capacity: 30 },
  { category: 'Yoga', enrolled: 22, capacity: 35 },
  { category: 'Cycling', enrolled: 18, capacity: 25 },
]

const leadSourceData = [
  { source: 'Referral', count: 34 },
  { source: 'Instagram', count: 28 },
  { source: 'Website', count: 24 },
  { source: 'Google Ads', count: 19 },
  { source: 'Walk-in', count: 14 },
  { source: 'Facebook', count: 9 },
]

const recentActivity = [
  { icon: UserRoundPlus, color: 'bg-emerald-500', text: 'Sarah Mitchell joined as a new Premium member', time: '12 min ago' },
  { icon: Target, color: 'bg-violet-500', text: 'Lead James Rivera converted to Basic membership', time: '45 min ago' },
  { icon: CreditCard, color: 'bg-amber-500', text: 'Payment of $89.99 received from Michael Torres', time: '1 hr ago' },
  { icon: Dumbbell, color: 'bg-indigo-500', text: 'HIIT Bootcamp class completed — 28 attendees', time: '2 hrs ago' },
  { icon: CalendarCheck, color: 'bg-cyan-500', text: 'Emily Chen booked a guest tour for tomorrow', time: '2 hrs ago' },
  { icon: UserCheck, color: 'bg-emerald-500', text: 'Member David Park renewed Elite membership', time: '3 hrs ago' },
  { icon: CreditCard, color: 'bg-amber-500', text: 'Refund of $29.99 processed for Lisa Wang', time: '4 hrs ago' },
  { icon: Dumbbell, color: 'bg-indigo-500', text: 'Morning Yoga session completed — 22 attendees', time: '5 hrs ago' },
]

const actionItems = [
  { priority: 1, title: '3 memberships expiring this week', context: 'Renewal outreach needed', color: 'bg-red-500' },
  { priority: 1, title: '2 overdue follow-up tasks', context: 'Leads awaiting response', color: 'bg-red-500' },
  { priority: 2, title: 'Treadmill #4 maintenance overdue', context: 'Last serviced 95 days ago', color: 'bg-orange-500' },
  { priority: 2, title: '5 leads with no activity in 7+ days', context: 'Re-engagement recommended', color: 'bg-orange-500' },
  { priority: 3, title: 'Yoga class under 65% capacity', context: 'Consider schedule adjustment', color: 'bg-amber-500' },
  { priority: 3, title: 'Monthly revenue report ready', context: 'Review and share with team', color: 'bg-amber-500' },
]

// --- Stats config ---

const stats = [
  { label: 'Total Members', value: '1,234', icon: Users, iconBg: 'bg-indigo-500' },
  { label: 'Active Members', value: '1,089', icon: UserCheck, iconBg: 'bg-emerald-500' },
  { label: 'New This Month', value: '47', icon: UserPlus, iconBg: 'bg-cyan-500' },
  { label: 'Total Leads', value: '128', icon: Target, iconBg: 'bg-violet-500' },
  { label: 'Monthly Revenue', value: '$45,231', icon: DollarSign, iconBg: 'bg-amber-500' },
  { label: 'Check-Ins Today', value: '342', icon: ScanLine, iconBg: 'bg-rose-500' },
]

// --- Component ---

export default function Dashboard() {
  return (
    <PageContent>
      <PageHeader title="Overview" description="Dashboard overview of your gym performance" />

      {/* Stats Row */}
      <div className="grid grid-cols-6 gap-4 mb-6">
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

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Revenue Trend */}
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#revenueGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Membership Distribution */}
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Membership Distribution</h3>
          <div className="flex items-center">
            <ResponsiveContainer width="60%" height={260}>
              <PieChart>
                <Pie
                  data={membershipData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {membershipData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number, name: string) => [value, name]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {membershipData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-foreground">{item.name}</span>
                  <span className="text-sm font-medium text-foreground ml-auto">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Class Capacity */}
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Class Capacity</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={classCapacityData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis dataKey="category" type="category" tick={{ fontSize: 12 }} stroke="#9ca3af" width={70} />
              <Tooltip />
              <Bar dataKey="capacity" fill="#e5e7eb" radius={[0, 4, 4, 0]} name="Capacity" />
              <Bar dataKey="enrolled" fill="#6366f1" radius={[0, 4, 4, 0]} name="Enrolled" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Lead Sources */}
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Lead Sources</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={leadSourceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="source" tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Leads" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`flex items-center justify-center h-8 w-8 rounded-lg ${item.color} flex-shrink-0`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Action Items */}
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Action Items</h3>
          <div className="space-y-3">
            {actionItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors cursor-pointer">
                <div className={`flex items-center justify-center h-6 w-6 rounded-full ${item.color} flex-shrink-0`}>
                  <span className="text-xs font-bold text-white">{item.priority}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.context}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageContent>
  )
}
