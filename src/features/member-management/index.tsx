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
        row.email.toLowerCase().includes(term) ||
        row.memberType.toLowerCase().includes(term) ||
        row.membershipName.toLowerCase().includes(term)
    )
  }, [allData, search])

  return (
    <PageContent>
      <PageHeader
        title="Members"
        actions={<MemberToolbar searchValue={search} onSearchChange={setSearch} />}
      />
      <FigmaDataTable
        columns={memberColumns}
        data={filteredData}
        enableRowSelection
      />
    </PageContent>
  )
}
