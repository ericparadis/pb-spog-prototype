import { useState, useMemo } from 'react'
import { PageContent } from '@/components/PageContent'
import { FigmaDataTable } from '@/features/_shared/components/FigmaDataTable'
import { TableStandardHeader } from '@/features/_shared/components/TableStandardHeader'
import { memberColumns } from '@/features/member-management/components/MemberTableColumns'
import { getMemberTableData } from '@/features/member-management/data/member-table-data'
import { MemberDrawer } from '@/features/member-management/components/MemberDrawer'
import { leadColumns } from '@/features/leads/components/LeadTableColumns'
import { getLeadTableData } from '@/features/leads/data/lead-table-data'
import { LeadDetailDrawer } from '@/features/leads/components/LeadDetailDrawer'
import { Card } from '@/components/ui/card'
import { Users, CheckCircle, AlertTriangle, UserPlus } from 'lucide-react'
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
  const totalLeads = leadData.length
  const needsFollowUp = leadData.filter(
    (l) => l.status === 'missed-guest' || l.status === 'appt-no-show' || l.status === 'expired-guest'
  ).length

  const stats = [
    { label: 'Total Members', value: totalMembers, icon: Users, iconBg: 'bg-indigo-500', iconColor: 'text-white' },
    { label: 'Active Members', value: activeMembers, icon: CheckCircle, iconBg: 'bg-emerald-500', iconColor: 'text-white' },
    { label: 'Total Leads', value: totalLeads, icon: UserPlus, iconBg: 'bg-violet-500', iconColor: 'text-white' },
    { label: 'Needs Follow-up', value: needsFollowUp, icon: AlertTriangle, iconBg: 'bg-orange-500', iconColor: 'text-white' },
  ]

  const handleCategoryChange = (val: CustomerCategory) => {
    setCategory(val)
    setSearch('')
  }

  const headerProps = {
    categories: categoryOptions,
    categoryValue: category,
    onCategoryChange: handleCategoryChange,
    searchValue: search,
    onSearchChange: setSearch,
  }

  return (
    <PageContent>
      <div className="grid grid-cols-4 gap-4 mb-6">
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

      {/* Members table (with header) — shown for "all" and "members" */}
      {showMembers && (
        <div className="table-standard">
          <TableStandardHeader {...headerProps} />
          <FigmaDataTable
            columns={memberColumns}
            data={filteredMembers}
            enableRowSelection
            onRowClick={(row) => setSelectedMember(row)}
          />
        </div>
      )}

      {/* Leads table — shown for "all" and "leads" */}
      {showLeads && (
        <div className={category === 'all' ? 'mt-8' : ''}>
          {category === 'all' && (
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Leads</h3>
          )}
          <div className="table-standard">
            {/* Only show header here when leads-only (members header handles it otherwise) */}
            {!showMembers && <TableStandardHeader {...headerProps} />}
            <FigmaDataTable
              columns={leadColumns}
              data={filteredLeads}
              enableRowSelection
              onRowClick={(row) => setSelectedLead(row)}
            />
          </div>
        </div>
      )}

      <MemberDrawer
        member={selectedMember}
        open={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />
      {selectedLead && (
        <LeadDetailDrawer
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </PageContent>
  )
}
