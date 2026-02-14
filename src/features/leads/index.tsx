import { useState, useMemo } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { PageContent } from '@/components/PageContent'
import { FigmaDataTable } from '@/features/_shared/components/FigmaDataTable'
import { leadColumns } from './components/LeadTableColumns'
import { getLeadTableData } from './data/lead-table-data'
import { LeadsToolbar } from './components/LeadsToolbar'
import { LeadStats } from './components/LeadStats'
import { LeadDetailDrawer } from './components/LeadDetailDrawer'
import type { LeadTableRow } from './types'

export default function Leads() {
  const allData = getLeadTableData()
  const [search, setSearch] = useState('')
  const [selectedLead, setSelectedLead] = useState<LeadTableRow | null>(null)

  const filteredData = useMemo(() => {
    if (!search.trim()) return allData
    const term = search.toLowerCase()
    return allData.filter(
      (row) =>
        row.name.toLowerCase().includes(term) ||
        row.source.toLowerCase().includes(term) ||
        row.assignedStaff.toLowerCase().includes(term) ||
        row.status.toLowerCase().includes(term)
    )
  }, [allData, search])

  return (
    <PageContent>
      <PageHeader
        title="Leads"
        description="Track and manage prospective members"
      />
      <LeadStats data={allData} />
      <LeadsToolbar searchValue={search} onSearchChange={setSearch} />
      <FigmaDataTable
        columns={leadColumns}
        data={filteredData}
        enableRowSelection
        onRowClick={(row) => setSelectedLead(row)}
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
