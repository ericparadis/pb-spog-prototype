import { useState, useMemo } from 'react'
import { PageContent } from '@/components/PageContent'
import { FigmaDataTable } from '@/features/_shared/components/FigmaDataTable'
import { staffColumns } from './components/StaffTableColumns'
import { getStaffTableData } from './data/staff-table-data'
import { StaffToolbar } from './components/StaffToolbar'
import { StaffDrawer } from './components/StaffDrawer'
import { useBrand } from '@/lib/contexts/BrandContext'
import type { StaffTableRow } from './types'

export default function StaffManagement() {
  const { currentBrand } = useBrand()
  const allData = getStaffTableData(currentBrand.id)
  const [search, setSearch] = useState('')
  const [selectedStaff, setSelectedStaff] = useState<StaffTableRow | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)

  const filteredData = useMemo(() => {
    if (!search.trim()) return allData
    const term = search.toLowerCase()
    return allData.filter(
      (row) =>
        row.name.toLowerCase().includes(term) ||
        row.email.toLowerCase().includes(term) ||
        row.title.toLowerCase().includes(term) ||
        row.locations.some((loc) => loc.toLowerCase().includes(term)) ||
        row.status.toLowerCase().includes(term)
    )
  }, [allData, search])

  return (
    <PageContent>
      <StaffToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onAddStaff={() => setShowAddDialog(!showAddDialog)}
      />
      <FigmaDataTable
        columns={staffColumns}
        data={filteredData}
        enableRowSelection
        onRowClick={(row) => setSelectedStaff(row)}
      />
      <StaffDrawer
        staff={selectedStaff}
        open={!!selectedStaff}
        onClose={() => setSelectedStaff(null)}
      />
    </PageContent>
  )
}
