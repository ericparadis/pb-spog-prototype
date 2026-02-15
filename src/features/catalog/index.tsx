import { useState, useMemo } from 'react'
import { PageContent } from '@/components/PageContent'
import { FigmaDataTable } from '@/features/_shared/components/FigmaDataTable'
import { productColumns } from './components/ProductTableColumns'
import { getProductTableData } from './data/product-table-data'
import { CatalogToolbar } from './components/CatalogToolbar'
import { useBrand } from '@/lib/contexts/BrandContext'

export default function CatalogAdministration() {
  const { currentBrand } = useBrand()
  const allData = getProductTableData(currentBrand.id)
  const [search, setSearch] = useState('')

  const filteredData = useMemo(() => {
    if (!search.trim()) return allData
    const term = search.toLowerCase()
    return allData.filter(
      (row) =>
        row.name.toLowerCase().includes(term) ||
        row.category.toLowerCase().includes(term) ||
        row.subCategory.toLowerCase().includes(term) ||
        row.location.toLowerCase().includes(term) ||
        row.status.toLowerCase().includes(term)
    )
  }, [allData, search])

  return (
    <PageContent>
      <CatalogToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onAddProduct={() => {}}
      />
      <FigmaDataTable
        columns={productColumns}
        data={filteredData}
        enableRowSelection
      />
    </PageContent>
  )
}
