import { useEffect, useState } from 'react'
import { X, Pencil, Info, Plus } from 'lucide-react'
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
import type { ProductTableRow, ProductItem } from '../types'

interface ProductDrawerProps {
  product: ProductTableRow | null
  open: boolean
  onClose: () => void
}

function ProductItemCard({ item }: { item: ProductItem }) {
  return (
    <div className="border rounded-lg">
      {/* Item header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
        <span className="text-sm font-semibold text-foreground">{item.name}</span>
        <button className="text-xs text-red-600 hover:text-red-700 font-medium">Remove</button>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Optional toggle */}
        <div className="flex items-center gap-2">
          <div
            className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer ${
              item.optional ? 'bg-primary' : 'bg-gray-200'
            }`}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                item.optional ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </div>
          <span className="text-sm text-foreground">Optional Item</span>
          <Info className="h-3.5 w-3.5 text-muted-foreground" />
        </div>

        {/* Fields row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Quantity</Label>
            <Input value={item.quantity} readOnly className="h-9" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Replenish</Label>
            <Select defaultValue={item.replenish}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Never">Never</SelectItem>
                <SelectItem value="Monthly">Monthly</SelectItem>
                <SelectItem value="Quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Billing Type</Label>
            <Select defaultValue={item.billingType}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Reoccurring">Reoccurring</SelectItem>
                <SelectItem value="One-Time">One-Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tier Pricing */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Tier Pricing ({item.tierPricing.length} tiers)
            </span>
          </div>
          <div className="space-y-2">
            {item.tierPricing.map((tier) => (
              <div
                key={tier.tierNumber}
                className="flex items-center justify-between px-3 py-2.5 bg-muted/40 rounded-md border"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-muted-foreground w-12">
                    Tier {tier.tierNumber}
                  </span>
                  {tier.included ? (
                    <span className="text-sm text-muted-foreground italic">
                      Included at no additional charge (all frequencies $0.00)
                    </span>
                  ) : (
                    <span className="text-sm text-foreground">
                      {tier.frequency} &middot;{' '}
                      <span className="font-semibold">
                        ${tier.price.toFixed(2)}
                        {tier.frequency === 'Monthly' ? '/mo' : ''}
                      </span>
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-xs text-red-600 hover:text-red-700 font-medium">
                    Remove Tier
                  </button>
                  <button className="text-primary hover:text-primary/80">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
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
  const [renewalSetting, setRenewalSetting] = useState('n-to-n')
  const [renewalAlertMonths, setRenewalAlertMonths] = useState('0')

  // Sync form state when product changes
  useEffect(() => {
    if (product) {
      setBundleName(product.name)
      setSku(product.id.toUpperCase())
      setProductType(product.category)
      setRegion(product.region)
      setStatus(product.status)
      setDescription(product.description)
      setTerm(String(product.billingMechanics.initialTermMonths || 12))
      setRenewalSetting(product.billingMechanics.renewalSetting)
      setRenewalAlertMonths(String(product.billingMechanics.renewalAlertMonths))
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

  const renewalOptions = [
    {
      value: 'n-to-n',
      label: 'N-to-N',
      description:
        'Continues billing at the base billing frequency. Month-to-Month, Bi-Weekly to Bi-Weekly, etc.',
    },
    {
      value: 'to-term',
      label: 'To Term',
      description: 'Renews to the identical term length.',
    },
    {
      value: 'terminates',
      label: 'Terminates',
      description: 'Agreement self-terminates.',
    },
  ]

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
        <div className="flex items-start justify-between px-8 py-6 border-b shrink-0">
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

          {/* Product Items */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground">
                Product Items ({product.items.length})
              </h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/5">
                  <Plus className="h-3.5 w-3.5 mr-1.5" />
                  Add Tier Pricing
                </Button>
                <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/5">
                  <Plus className="h-3.5 w-3.5 mr-1.5" />
                  Add Item
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {product.items.map((item, idx) => (
                <ProductItemCard key={idx} item={item} />
              ))}
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
                      <SelectItem value="0">No Term</SelectItem>
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
                    {renewalOptions.map((option) => {
                      const isSelected = renewalSetting === option.value
                      return (
                        <label
                          key={option.value}
                          className={`flex items-start gap-3 p-3 rounded-md border cursor-pointer transition-colors ${
                            isSelected
                              ? 'border-primary bg-primary/5 border-l-[3px]'
                              : 'border-border hover:bg-muted/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="renewalSetting"
                            value={option.value}
                            checked={isSelected}
                            onChange={(e) => setRenewalSetting(e.target.value)}
                            className="h-4 w-4 text-primary border-gray-300 mt-0.5 shrink-0"
                          />
                          <div>
                            <span className="text-sm font-medium text-foreground">{option.label}</span>
                            <p className="text-xs text-muted-foreground mt-0.5">{option.description}</p>
                          </div>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </Card>
            </div>

            {/* Renewal Alert */}
            <Card className="p-5 mt-4">
              <h4 className="text-sm font-semibold text-foreground mb-3">Renewal Alert</h4>
              <div className="space-y-2">
                <Label htmlFor="renewalAlert">Notice Period (months)</Label>
                <Input
                  id="renewalAlert"
                  type="number"
                  min="0"
                  value={renewalAlertMonths}
                  onChange={(e) => setRenewalAlertMonths(e.target.value)}
                  className="w-32"
                />
                <p className="text-xs text-muted-foreground">
                  Months before renewal to alert customer. Example: 1-month notice triggers alert 1 month before renewal.
                </p>
              </div>
            </Card>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 py-4 border-t bg-background shrink-0">
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
