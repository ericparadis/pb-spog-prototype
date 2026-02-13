import { useState, useMemo } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { PageContent } from '@/components/PageContent'
import { FigmaDataTable } from '@/features/_shared/components/FigmaDataTable'
import { memberColumns } from './components/MemberTableColumns'
import { getMemberTableData } from './data/member-table-data'
import { MemberToolbar } from './components/MemberToolbar'
import { useBrand } from '@/lib/contexts/BrandContext'

export default function MemberManagement() {
  const { currentBrand } = useBrand()
  const allData = getMemberTableData(currentBrand.id)
  const [search, setSearch] = useState('')

  const filteredData = useMemo(() => {
    if (!search.trim()) return allData
    const term = search.toLowerCase()
    return allData.filter(
      (row) =>
        row.name.toLowerCase().includes(term) ||
        row.memberId.toLowerCase().includes(term) ||
        row.membershipTier.toLowerCase().includes(term) ||
        (row.coach && row.coach.toLowerCase().includes(term))
    )
  }, [allData, search])

  return (
    <PageContent>
      <PageHeader
        title="Members"
        description="Manage gym members and memberships"
      />
      <MemberToolbar searchValue={search} onSearchChange={setSearch} />
      <FigmaDataTable
        columns={memberColumns}
        data={filteredData}
        enableRowSelection
      />
    </PageContent>
  )
}
