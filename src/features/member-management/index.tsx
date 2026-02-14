import { useState, useMemo } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { PageContent } from '@/components/PageContent'
import { FigmaDataTable } from '@/features/_shared/components/FigmaDataTable'
import { memberColumns } from './components/MemberTableColumns'
import { getMemberTableData } from './data/member-table-data'
import { MemberToolbar } from './components/MemberToolbar'
import { MemberStats } from './components/MemberStats'
import { MemberDrawer } from './components/MemberDrawer'
import { useBrand } from '@/lib/contexts/BrandContext'
import type { MemberTableRow } from './types'

export default function MemberManagement() {
  const { currentBrand } = useBrand()
  const allData = getMemberTableData(currentBrand.id)
  const [search, setSearch] = useState('')
  const [selectedMember, setSelectedMember] = useState<MemberTableRow | null>(null)

  const filteredData = useMemo(() => {
    if (!search.trim()) return allData
    const term = search.toLowerCase()
    return allData.filter(
      (row) =>
        row.name.toLowerCase().includes(term) ||
        row.email.toLowerCase().includes(term) ||
        row.memberType.toLowerCase().includes(term) ||
        row.membershipName.toLowerCase().includes(term)
    )
  }, [allData, search])

  return (
    <PageContent>
      <PageHeader title="Members" />
      <MemberStats data={allData} />
      <MemberToolbar searchValue={search} onSearchChange={setSearch} />
      <FigmaDataTable
        columns={memberColumns}
        data={filteredData}
        enableRowSelection
        onRowClick={(row) => setSelectedMember(row)}
      />
      <MemberDrawer
        member={selectedMember}
        open={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </PageContent>
  )
}
