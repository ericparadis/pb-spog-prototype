import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Brand {
  id: string
  name: string
  displayName: string
  logo: string
}

interface BrandContextType {
  currentBrand: Brand
  brands: Brand[]
  switchBrand: (brandId: string) => void
}

const BrandContext = createContext<BrandContextType | undefined>(undefined)

const defaultBrands: Brand[] = [
  {
    id: 'fitzone',
    name: 'fitzone',
    displayName: 'FitZone',
    logo: '/brands/fitzone/logo.svg',
  },
  {
    id: 'powerlift',
    name: 'powerlift',
    displayName: 'PowerLift',
    logo: '/brands/powerlift/logo.svg',
  },
  {
    id: 'zengym',
    name: 'zengym',
    displayName: 'ZenGym',
    logo: '/brands/zengym/logo.svg',
  },
]

export function BrandProvider({ children }: { children: ReactNode }) {
  const [currentBrand, setCurrentBrand] = useState<Brand>(defaultBrands[0])

  useEffect(() => {
    // Apply brand theme to document root
    document.documentElement.setAttribute('data-brand', currentBrand.id)
  }, [currentBrand])

  const switchBrand = (brandId: string) => {
    const brand = defaultBrands.find((b) => b.id === brandId)
    if (brand) {
      setCurrentBrand(brand)
    }
  }

  return (
    <BrandContext.Provider value={{ currentBrand, brands: defaultBrands, switchBrand }}>
      {children}
    </BrandContext.Provider>
  )
}

export const useBrand = () => {
  const context = useContext(BrandContext)
  if (!context) {
    throw new Error('useBrand must be used within BrandProvider')
  }
  return context
}
