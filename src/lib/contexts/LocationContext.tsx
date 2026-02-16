import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useBrand } from './BrandContext'
import locationsJson from '@/data/locations.json'

export interface Location {
  id: string
  brandId: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
}

interface LocationContextType {
  currentLocation: Location | null
  locations: Location[]
  switchLocation: (locationId: string) => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export function LocationProvider({ children }: { children: ReactNode }) {
  const { currentBrand } = useBrand()
  const brandLocations = (locationsJson as Location[]).filter((l) => l.brandId === currentBrand.id)
  const [currentLocation, setCurrentLocation] = useState<Location | null>(brandLocations[0] ?? null)

  useEffect(() => {
    const newBrandLocations = (locationsJson as Location[]).filter((l) => l.brandId === currentBrand.id)
    setCurrentLocation(newBrandLocations[0] ?? null)
  }, [currentBrand.id])

  const switchLocation = (locationId: string) => {
    const loc = brandLocations.find((l) => l.id === locationId)
    if (loc) setCurrentLocation(loc)
  }

  return (
    <LocationContext.Provider value={{ currentLocation, locations: brandLocations, switchLocation }}>
      {children}
    </LocationContext.Provider>
  )
}

export const useLocationContext = () => {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error('useLocation must be used within LocationProvider')
  }
  return context
}
