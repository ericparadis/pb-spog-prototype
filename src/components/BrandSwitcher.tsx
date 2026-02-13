import { useBrand } from '@/lib/contexts/BrandContext'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function BrandSwitcher() {
  const { currentBrand, brands, switchBrand } = useBrand()

  return (
    <Select value={currentBrand.id} onValueChange={switchBrand}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select brand" />
      </SelectTrigger>
      <SelectContent>
        {brands.map((brand) => (
          <SelectItem key={brand.id} value={brand.id}>
            {brand.displayName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
