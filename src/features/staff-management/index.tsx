import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { PageContent } from '@/components/PageContent'
import { FigmaDataTable } from '@/features/_shared/components/FigmaDataTable'
import { TableStandardHeader } from '@/features/_shared/components/TableStandardHeader'
import { staffColumns } from './components/StaffTableColumns'
import { getStaffTableData } from './data/staff-table-data'
import { StaffDrawer } from './components/StaffDrawer'
import { Button } from '@/components/ui/button'
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
      <div className="table-standard">
        <TableStandardHeader
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search staff..."
          actions={
            <Button size="sm" onClick={() => setShowAddDialog(!showAddDialog)}>
              <Plus className="h-4 w-4 mr-1.5" />
              Add Staff Member
            </Button>
          }
        />
        <FigmaDataTable
          columns={staffColumns}
          data={filteredData}
          enableRowSelection
          onRowClick={(row) => setSelectedStaff(row)}
        />
      </div>
      <StaffDrawer
        staff={selectedStaff}
        open={!!selectedStaff}
        onClose={() => setSelectedStaff(null)}
      />
    </PageContent>
  )
}
