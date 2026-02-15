import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { ProductTableRow } from '../types'

interface ProductDrawerProps {
  product: ProductTableRow | null
  open: boolean
  onClose: () => void
}

export function ProductDrawer({ product, open, onClose }: ProductDrawerProps) {
  const [visible, setVisible] = useState(false)
  const [animating, setAnimating] = useState(false)

  // Form state
  const [bundleName, setBundleName] = useState('')
  const [sku, setSku] = useState('')
  const [productType, setProductType] = useState('')
  const [region, setRegion] = useState('')
  const [status, setStatus] = useState('')
  const [description, setDescription] = useState('')
  const [term, setTerm] = useState('12')
  const [renewalSetting, setRenewalSetting] = useState('auto-renew')

  // Sync form state when product changes
  useEffect(() => {
    if (product) {
      setBundleName(product.name)
      setSku(product.id.toUpperCase())
      setProductType(product.category)
      setRegion('National')
      setStatus(product.status)
      setDescription(
        `${product.name} — ${product.subCategory} product available at ${product.location}. Retail price $${product.retailPrice.toFixed(2)} with ${product.marginPercent}% margin.`
      )
      setTerm('12')
      setRenewalSetting('auto-renew')
    }
  }, [product])

  // Animate open/close
  useEffect(() => {
    if (open) {
      setVisible(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true))
      })
      document.body.style.overflow = 'hidden'
    } else {
      setAnimating(false)
      const timeout = setTimeout(() => setVisible(false), 300)
      document.body.style.overflow = ''
      return () => clearTimeout(timeout)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  if (!visible || !product) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          animating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Drawer panel — 1000px wide */}
      <div
        className={`absolute top-0 right-0 h-full w-[1000px] max-w-full bg-background shadow-2xl border-l flex flex-col transition-transform duration-300 ease-out ${
          animating ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-8 py-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{product.name}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {product.category} &middot; {product.id.toUpperCase()}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 mt-1">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
          {/* Product Details */}
          <section>
            <h3 className="text-base font-semibold text-foreground mb-4">Product Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bundleName">Bundle Name</Label>
                  <Input
                    id="bundleName"
                    value={bundleName}
                    onChange={(e) => setBundleName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Product Type</Label>
                <Select value={productType} onValueChange={setProductType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Supplements">Supplements</SelectItem>
                    <SelectItem value="Apparel">Apparel</SelectItem>
                    <SelectItem value="Accessories">Accessories</SelectItem>
                    <SelectItem value="Equipment">Equipment</SelectItem>
                    <SelectItem value="Membership">Membership</SelectItem>
                    <SelectItem value="Service">Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Geographical Region</Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="National">National</SelectItem>
                      <SelectItem value="Regional">Regional</SelectItem>
                      <SelectItem value="Local">Local</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                />
              </div>
            </div>
          </section>

          {/* Billing Mechanics */}
          <section>
            <h3 className="text-base font-semibold text-foreground mb-4">Billing Mechanics</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-5">
                <h4 className="text-sm font-semibold text-foreground mb-3">Initial Commitment</h4>
                <div className="space-y-2">
                  <Label>Term</Label>
                  <Select value={term} onValueChange={setTerm}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Month</SelectItem>
                      <SelectItem value="3">3 Months</SelectItem>
                      <SelectItem value="6">6 Months</SelectItem>
                      <SelectItem value="12">12 Months</SelectItem>
                      <SelectItem value="24">24 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Card>
              <Card className="p-5">
                <h4 className="text-sm font-semibold text-foreground mb-3">
                  After Initial Term Expires
                </h4>
                <div className="space-y-2">
                  <Label>Renewal Setting</Label>
                  <div className="space-y-2 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="renewalSetting"
                        value="auto-renew"
                        checked={renewalSetting === 'auto-renew'}
                        onChange={(e) => setRenewalSetting(e.target.value)}
                        className="h-4 w-4 text-primary border-gray-300"
                      />
                      <span className="text-sm text-foreground">Auto-Renew</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="renewalSetting"
                        value="month-to-month"
                        checked={renewalSetting === 'month-to-month'}
                        onChange={(e) => setRenewalSetting(e.target.value)}
                        className="h-4 w-4 text-primary border-gray-300"
                      />
                      <span className="text-sm text-foreground">Convert to Month-to-Month</span>
                    </label>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 py-4 border-t bg-background">
          <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
            Delete Product
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose}>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
