import { useState, useMemo } from 'react'
import { PageContent } from '@/components/PageContent'
import { FigmaDataTable } from '@/features/_shared/components/FigmaDataTable'
import { productColumns } from './components/ProductTableColumns'
import { adjustmentColumns } from './components/AdjustmentTableColumns'
import { pricingTierColumns } from './components/PricingTierTableColumns'
import { getProductTableData } from './data/product-table-data'
import { getAdjustmentTableData } from './data/adjustment-table-data'
import { getPricingTierTableData } from './data/pricing-tier-table-data'
import { CatalogToolbar } from './components/CatalogToolbar'
import { CatalogPillTabs, type CatalogTab } from './components/CatalogPillTabs'
import { ProductDrawer } from './components/ProductDrawer'
import { useBrand } from '@/lib/contexts/BrandContext'
import type { ProductTableRow } from './types'

export default function CatalogAdministration() {
  const { currentBrand } = useBrand()
  const [activeTab, setActiveTab] = useState<CatalogTab>('products')
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<ProductTableRow | null>(null)

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
      <CatalogPillTabs activeTab={activeTab} onChange={handleTabChange} />
      <CatalogToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onAddProduct={() => {}}
        searchPlaceholder={searchPlaceholder}
        addLabel={addLabel}
      />
      {activeTab === 'products' && (
        <FigmaDataTable
          columns={productColumns}
          data={filteredProducts}
          enableRowSelection
          onRowClick={(row) => setSelectedProduct(row)}
        />
      )}
      {activeTab === 'adjustments' && (
        <FigmaDataTable
          columns={adjustmentColumns}
          data={filteredAdjustments}
          enableRowSelection
        />
      )}
      {activeTab === 'pricing-tiers' && (
        <FigmaDataTable
          columns={pricingTierColumns}
          data={filteredPricingTiers}
          enableRowSelection
        />
      )}
      <ProductDrawer
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </PageContent>
  )
}
