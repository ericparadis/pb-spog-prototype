import { useState, useMemo } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { PageContent } from '@/components/PageContent'
import { FigmaDataTable } from '@/features/_shared/components/FigmaDataTable'
import { leadColumns } from './components/LeadTableColumns'
import { getLeadTableData } from './data/lead-table-data'
import { LeadsToolbar } from './components/LeadsToolbar'

export default function Leads() {
  const allData = getLeadTableData()
  const [search, setSearch] = useState('')

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
      <LeadsToolbar searchValue={search} onSearchChange={setSearch} />
      <FigmaDataTable
        columns={leadColumns}
        data={filteredData}
        enableRowSelection
      />
    </PageContent>
  )
}
