import { useState, useMemo } from 'react'
import { Package, Percent, Tag } from 'lucide-react'
import { PageContent } from '@/components/PageContent'
import { FigmaDataTable } from '@/features/_shared/components/FigmaDataTable'
import { TableCategorySelector, type TableCategoryOption } from '@/features/_shared/components/TableCategorySelector'
import { productColumns } from './components/ProductTableColumns'
import { adjustmentColumns } from './components/AdjustmentTableColumns'
import { pricingTierColumns } from './components/PricingTierTableColumns'
import { CatalogToolbar } from './components/CatalogToolbar'
import { ProductDrawer } from './components/ProductDrawer'
import { AdjustmentDrawer } from './components/AdjustmentDrawer'
import { PricingTierDrawer } from './components/PricingTierDrawer'
import { getProductTableData } from './data/product-table-data'
import { getAdjustmentTableData } from './data/adjustment-table-data'
import { getPricingTierTableData } from './data/pricing-tier-table-data'
import { useBrand } from '@/lib/contexts/BrandContext'
import type { ProductTableRow, AdjustmentTableRow, PricingTierTableRow } from './types'

export type CatalogTab = 'products' | 'adjustments' | 'pricing-tiers'

const catalogTabOptions: TableCategoryOption<CatalogTab>[] = [
  { value: 'products', label: 'Products', icon: Package },
  { value: 'adjustments', label: 'Adjustment Catalog', icon: Percent },
  { value: 'pricing-tiers', label: 'Pricing Tiers', icon: Tag },
]

export default function CatalogAdministration() {
  const { currentBrand } = useBrand()
  const [activeTab, setActiveTab] = useState<CatalogTab>('products')
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<ProductTableRow | null>(null)
  const [selectedAdjustment, setSelectedAdjustment] = useState<AdjustmentTableRow | null>(null)
  const [selectedTier, setSelectedTier] = useState<PricingTierTableRow | null>(null)

  const productData = getProductTableData(currentBrand.id)
  const adjustmentData = getAdjustmentTableData(currentBrand.id)
  const pricingTierData = getPricingTierTableData(currentBrand.id)

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return productData
    const term = search.toLowerCase()
    return productData.filter(
      (row) =>
        row.name.toLowerCase().includes(term) ||
        row.category.toLowerCase().includes(term) ||
        row.subCategory.toLowerCase().includes(term) ||
        row.location.toLowerCase().includes(term) ||
        row.status.toLowerCase().includes(term)
    )
  }, [productData, search])

  const filteredAdjustments = useMemo(() => {
    if (!search.trim()) return adjustmentData
    const term = search.toLowerCase()
    return adjustmentData.filter(
      (row) =>
        row.name.toLowerCase().includes(term) ||
        row.code.toLowerCase().includes(term) ||
        row.scope.toLowerCase().includes(term)
    )
  }, [adjustmentData, search])

  const filteredPricingTiers = useMemo(() => {
    if (!search.trim()) return pricingTierData
    const term = search.toLowerCase()
    return pricingTierData.filter(
      (row) =>
        row.tierName.toLowerCase().includes(term) ||
        String(row.tierNumber).includes(term)
    )
  }, [pricingTierData, search])

  const handleTabChange = (tab: CatalogTab) => {
    setActiveTab(tab)
    setSearch('')
  }

  const searchPlaceholder =
    activeTab === 'products'
      ? 'Search products...'
      : activeTab === 'adjustments'
        ? 'Search adjustments...'
        : 'Search pricing tiers...'

  const addLabel =
    activeTab === 'products'
      ? 'Add Product'
      : activeTab === 'adjustments'
        ? 'Add Adjustment'
        : 'Add Pricing Tier'

  return (
    <PageContent>
      <div className="flex items-center justify-between mb-4">
        <TableCategorySelector
          options={catalogTabOptions}
          value={activeTab}
          onChange={handleTabChange}
        />
        <CatalogToolbar
          searchValue={search}
          onSearchChange={setSearch}
          onAddProduct={() => {}}
          searchPlaceholder={searchPlaceholder}
          addLabel={addLabel}
        />
      </div>
      {activeTab === 'products' && (
        <FigmaDataTable
          columns={productColumns}
          data={filteredProducts}
          className="table-standard"
          enableRowSelection
          onRowClick={(row) => setSelectedProduct(row)}
        />
      )}
      {activeTab === 'adjustments' && (
        <FigmaDataTable
          columns={adjustmentColumns}
          data={filteredAdjustments}
          className="table-standard"
          enableRowSelection
          onRowClick={(row) => setSelectedAdjustment(row)}
        />
      )}
      {activeTab === 'pricing-tiers' && (
        <FigmaDataTable
          columns={pricingTierColumns}
          data={filteredPricingTiers}
          className="table-standard"
          enableRowSelection
          onRowClick={(row) => setSelectedTier(row)}
        />
      )}
      <ProductDrawer
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <AdjustmentDrawer
        adjustment={selectedAdjustment}
        open={!!selectedAdjustment}
        onClose={() => setSelectedAdjustment(null)}
      />
      <PricingTierDrawer
        tier={selectedTier}
        open={!!selectedTier}
        onClose={() => setSelectedTier(null)}
      />
    </PageContent>
  )
}
