import { useEffect, useState } from 'react'
import { X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { AdjustmentTableRow, AdjustmentItemDetail } from '../types'

interface AdjustmentDrawerProps {
  adjustment: AdjustmentTableRow | null
  open: boolean
  onClose: () => void
}

function AdjustmentItemCard({ item }: { item: AdjustmentItemDetail }) {
  return (
    <div className="border rounded-lg">
      {/* Item header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
        <span className="text-sm font-semibold text-foreground">{item.name}</span>
        <button className="text-xs text-red-600 hover:text-red-700 font-medium">Remove</button>
      </div>

      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Adjustment Type</Label>
            <Select defaultValue={item.adjustmentType}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Set to Value">Set to Value</SelectItem>
                <SelectItem value="Percentage Off">Percentage Off</SelectItem>
                <SelectItem value="Amount Off">Amount Off</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Periods</Label>
            <Select defaultValue={String(item.periods)}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Ongoing</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="12">12</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Value</Label>
            <Input defaultValue={item.value} className="h-9" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function AdjustmentDrawer({ adjustment, open, onClose }: AdjustmentDrawerProps) {
  const [visible, setVisible] = useState(false)
  const [animating, setAnimating] = useState(false)

  // Form state
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [howManyUses, setHowManyUses] = useState('0')
  const [activeDateStart, setActiveDateStart] = useState('')
  const [activeDateEnd, setActiveDateEnd] = useState('')
  const [tier, setTier] = useState('1')
  const [region, setRegion] = useState('')
  const [scope, setScope] = useState('')
  const [category, setCategory] = useState('')

  // Sync form state when adjustment changes
  useEffect(() => {
    if (adjustment) {
      setName(adjustment.name)
      setCode(adjustment.code)
      setHowManyUses(String(adjustment.howManyUses))
      setActiveDateStart(adjustment.activeDateStart)
      setActiveDateEnd(adjustment.activeDateEnd)
      setTier(String(adjustment.tier))
      setRegion(adjustment.region)
      setScope(adjustment.scope)
      setCategory(adjustment.category)
    }
  }, [adjustment])

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

  if (!visible || !adjustment) return null

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
            <h2 className="text-xl font-semibold text-foreground">{adjustment.name}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {adjustment.category} &middot; {adjustment.code}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 mt-1">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
          {/* Adjustment Details */}
          <section>
            <h3 className="text-base font-semibold text-foreground mb-4">Adjustment Details</h3>
            <div className="space-y-4">
              {/* Language selector */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-md border text-sm">
                  <span className="font-medium">EN</span>
                  <span className="text-muted-foreground">US</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adjName">Name</Label>
                  <Input
                    id="adjName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adjCode">Short Code</Label>
                  <Input
                    id="adjCode"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adjUses">How Many Uses</Label>
                  <Input
                    id="adjUses"
                    type="number"
                    min="0"
                    value={howManyUses}
                    onChange={(e) => setHowManyUses(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    0 = unlimited uses
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Scope</Label>
                  <Select value={scope} onValueChange={setScope}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select scope" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="National">National</SelectItem>
                      <SelectItem value="Available-for-Local">Available for Local</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adjDateStart">Valid From</Label>
                  <Input
                    id="adjDateStart"
                    type="date"
                    value={activeDateStart}
                    onChange={(e) => setActiveDateStart(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adjDateEnd">Valid Through</Label>
                  <Input
                    id="adjDateEnd"
                    type="date"
                    value={activeDateEnd}
                    onChange={(e) => setActiveDateEnd(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tier</Label>
                  <Select value={tier} onValueChange={setTier}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Tier 1</SelectItem>
                      <SelectItem value="2">Tier 2</SelectItem>
                      <SelectItem value="3">Tier 3</SelectItem>
                      <SelectItem value="4">Tier 4</SelectItem>
                      <SelectItem value="5">Tier 5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Geographical Region</Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Europe">Europe</SelectItem>
                      <SelectItem value="Asia Pacific">Asia Pacific</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Membership">Membership</SelectItem>
                    <SelectItem value="Class">Class</SelectItem>
                    <SelectItem value="Service">Service</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Adjustment Items */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground">
                Adjustments ({adjustment.adjustmentItems.length})
              </h3>
              <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/5">
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                Add Item
              </Button>
            </div>
            <div className="space-y-4">
              {adjustment.adjustmentItems.map((item, idx) => (
                <AdjustmentItemCard key={idx} item={item} />
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 py-4 border-t bg-background shrink-0">
          <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
            Delete Adjustment
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
