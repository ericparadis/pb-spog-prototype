import { http, HttpResponse } from 'msw'
import brands from '@/data/brands.json'
import locations from '@/data/locations.json'
import members from '@/data/members.json'
import memberships from '@/data/memberships.json'
import classes from '@/data/classes.json'
import trainers from '@/data/trainers.json'
import equipment from '@/data/equipment.json'
import transactions from '@/data/transactions.json'

export const handlers = [
  // Brands
  http.get('/api/brands', () => {
    return HttpResponse.json(brands)
  }),

  http.get('/api/brands/:brandId', ({ params }) => {
    const brand = brands.find((b) => b.id === params.brandId)
    return brand ? HttpResponse.json(brand) : new HttpResponse(null, { status: 404 })
  }),

  // Locations
  http.get('/api/locations', ({ request }) => {
    const url = new URL(request.url)
    const brandId = url.searchParams.get('brandId')
    const filtered = brandId ? locations.filter((l) => l.brandId === brandId) : locations
    return HttpResponse.json(filtered)
  }),

  // Members
  http.get('/api/members', ({ request }) => {
    const url = new URL(request.url)
    const brandId = url.searchParams.get('brandId')
    const locationId = url.searchParams.get('locationId')
    let filtered = members
    if (brandId) filtered = filtered.filter((m) => m.brandId === brandId)
    if (locationId) filtered = filtered.filter((m) => m.locationId === locationId)
    return HttpResponse.json(filtered)
  }),

  // Memberships
  http.get('/api/memberships', ({ request }) => {
    const url = new URL(request.url)
    const brandId = url.searchParams.get('brandId')
    const filtered = brandId ? memberships.filter((m) => m.brandId === brandId) : memberships
    return HttpResponse.json(filtered)
  }),

  // Classes
  http.get('/api/classes', ({ request }) => {
    const url = new URL(request.url)
    const brandId = url.searchParams.get('brandId')
    const locationId = url.searchParams.get('locationId')
    let filtered = classes
    if (brandId) filtered = filtered.filter((c) => c.brandId === brandId)
    if (locationId) filtered = filtered.filter((c) => c.locationId === locationId)
    return HttpResponse.json(filtered)
  }),

  // Trainers
  http.get('/api/trainers', ({ request }) => {
    const url = new URL(request.url)
    const brandId = url.searchParams.get('brandId')
    const filtered = brandId ? trainers.filter((t) => t.brandId === brandId) : trainers
    return HttpResponse.json(filtered)
  }),

  // Equipment
  http.get('/api/equipment', ({ request }) => {
    const url = new URL(request.url)
    const brandId = url.searchParams.get('brandId')
    const locationId = url.searchParams.get('locationId')
    let filtered = equipment
    if (brandId) filtered = filtered.filter((e) => e.brandId === brandId)
    if (locationId) filtered = filtered.filter((e) => e.locationId === locationId)
    return HttpResponse.json(filtered)
  }),

  // Transactions
  http.get('/api/transactions', ({ request }) => {
    const url = new URL(request.url)
    const brandId = url.searchParams.get('brandId')
    const locationId = url.searchParams.get('locationId')
    let filtered = transactions
    if (brandId) filtered = filtered.filter((t) => t.brandId === brandId)
    if (locationId) filtered = filtered.filter((t) => t.locationId === locationId)
    return HttpResponse.json(filtered)
  }),
]
