import { useState, useMemo } from 'react'
import { PageContent } from '@/components/PageContent'
import { FigmaDataTable } from '@/features/_shared/components/FigmaDataTable'
import { TableCategorySelector } from '@/features/_shared/components/TableCategorySelector'
import { memberColumns } from '@/features/member-management/components/MemberTableColumns'
import { getMemberTableData } from '@/features/member-management/data/member-table-data'
import { MemberDrawer } from '@/features/member-management/components/MemberDrawer'
import { leadColumns } from '@/features/leads/components/LeadTableColumns'
import { getLeadTableData } from '@/features/leads/data/lead-table-data'
import { LeadDetailDrawer } from '@/features/leads/components/LeadDetailDrawer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, SlidersHorizontal, Download, Users, CheckCircle, AlertTriangle, Clock, UserPlus, Calendar } from 'lucide-react'
import { useBrand } from '@/lib/contexts/BrandContext'
import type { MemberTableRow } from '@/features/member-management/types'
import type { LeadTableRow } from '@/features/leads/types'

type CustomerCategory = 'all' | 'members' | 'leads'

const categoryOptions = [
  { label: 'All Customers', value: 'all' as CustomerCategory },
  { label: 'Members', value: 'members' as CustomerCategory },
  { label: 'Leads', value: 'leads' as CustomerCategory },
]

export default function Customers() {
  const { currentBrand } = useBrand()
  const memberData = getMemberTableData(currentBrand.id)
  const leadData = getLeadTableData()

  const [category, setCategory] = useState<CustomerCategory>('all')
  const [search, setSearch] = useState('')
  const [selectedMember, setSelectedMember] = useState<MemberTableRow | null>(null)
  const [selectedLead, setSelectedLead] = useState<LeadTableRow | null>(null)

  const filteredMembers = useMemo(() => {
    if (!search.trim()) return memberData
    const term = search.toLowerCase()
    return memberData.filter(
      (row) =>
        row.name.toLowerCase().includes(term) ||
        row.email.toLowerCase().includes(term) ||
        row.memberType.toLowerCase().includes(term) ||
        row.membershipName.toLowerCase().includes(term)
    )
  }, [memberData, search])

  const filteredLeads = useMemo(() => {
    if (!search.trim()) return leadData
    const term = search.toLowerCase()
    return leadData.filter(
      (row) =>
        row.name.toLowerCase().includes(term) ||
        row.source.toLowerCase().includes(term) ||
        row.assignedStaff.toLowerCase().includes(term) ||
        row.status.toLowerCase().includes(term)
    )
  }, [leadData, search])

  const showMembers = category === 'all' || category === 'members'
  const showLeads = category === 'all' || category === 'leads'

  const totalMembers = memberData.length
  const activeMembers = memberData.filter((m) => m.agreementStatus === 'Active').length
  const pastDueMembers = memberData.filter((m) => m.agreementStatus === 'Expired').length
  const totalLeads = leadData.length
  const newLeads = leadData.filter((l) => l.status === 'lead').length
  const apptBooked = leadData.filter((l) => l.status === 'appt-booked').length
  const needsFollowUp = leadData.filter(
    (l) => l.status === 'missed-guest' || l.status === 'appt-no-show' || l.status === 'expired-guest'
  ).length

  const stats = [
    { label: 'Total Members', value: totalMembers, icon: Users, iconBg: 'bg-indigo-500', iconColor: 'text-white' },
    { label: 'Active Members', value: activeMembers, icon: CheckCircle, iconBg: 'bg-emerald-500', iconColor: 'text-white' },
    { label: 'Past Due', value: pastDueMembers, icon: Clock, iconBg: 'bg-rose-500', iconColor: 'text-white' },
    { label: 'Total Leads', value: totalLeads, icon: UserPlus, iconBg: 'bg-violet-500', iconColor: 'text-white' },
    { label: 'New Leads', value: newLeads, icon: AlertTriangle, iconBg: 'bg-amber-500', iconColor: 'text-white' },
    { label: 'Appt Booked', value: apptBooked, icon: Calendar, iconBg: 'bg-cyan-500', iconColor: 'text-white' },
    { label: 'Needs Follow-up', value: needsFollowUp, icon: AlertTriangle, iconBg: 'bg-orange-500', iconColor: 'text-white' },
  ]

  return (
    <PageContent>
      <div className="grid grid-cols-7 gap-3 mb-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center h-10 w-10 rounded-lg ${stat.iconBg}`}>
                <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold text-foreground">{stat.value.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <TableCategorySelector
          options={categoryOptions}
          value={category}
          onChange={(val) => {
            setCategory(val)
            setSearch('')
          }}
        />
        <div className="flex items-center gap-3">
          <div className="relative w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <Button variant="outline" size="sm" className="rounded-full">
            <SlidersHorizontal className="h-4 w-4 mr-1.5" />
            Filters
          </Button>
          <Button size="sm" className="rounded-full">
            <Download className="h-4 w-4 mr-1.5" />
            Export
          </Button>
        </div>
      </div>

      {showMembers && (
        <>
          {category === 'all' && (
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Members</h3>
          )}
          <FigmaDataTable
            columns={memberColumns}
            data={filteredMembers}
            className="table-standard"
            enableRowSelection
            onRowClick={(row) => setSelectedMember(row)}
          />
          <MemberDrawer
            member={selectedMember}
            open={!!selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        </>
      )}

      {showLeads && (
        <div className={category === 'all' ? 'mt-8' : ''}>
          {category === 'all' && (
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Leads</h3>
          )}
          <FigmaDataTable
            columns={leadColumns}
            data={filteredLeads}
            className="table-standard"
            enableRowSelection
            onRowClick={(row) => setSelectedLead(row)}
          />
          {selectedLead && (
            <LeadDetailDrawer
              lead={selectedLead}
              onClose={() => setSelectedLead(null)}
            />
          )}
        </div>
      )}
    </PageContent>
  )
}
