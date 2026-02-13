import { PageHeader } from '@/components/PageHeader'
import { PageContent } from '@/components/PageContent'
import { FigmaDataTable } from '@/features/_shared/components/FigmaDataTable'
import { memberColumns } from './components/MemberTableColumns'
import { getMemberTableData } from './data/member-table-data'
import { useBrand } from '@/lib/contexts/BrandContext'

export default function MemberManagement() {
  const { currentBrand } = useBrand()
  const data = getMemberTableData(currentBrand.id)

  return (
    <PageContent>
      <PageHeader
        title="Member Management"
        description="Manage gym members and memberships"
      />
      <FigmaDataTable columns={memberColumns} data={data} />
    </PageContent>
  )
}
