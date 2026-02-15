import { useEffect, useState } from 'react'
import { X, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { PricingTierTableRow } from '../types'

interface PricingTierDrawerProps {
  tier: PricingTierTableRow | null
  open: boolean
  onClose: () => void
}

export function PricingTierDrawer({ tier, open, onClose }: PricingTierDrawerProps) {
  const [visible, setVisible] = useState(false)
  const [animating, setAnimating] = useState(false)

  // Form state
  const [tierNumber, setTierNumber] = useState('')
  const [tierName, setTierName] = useState('')

  // Sync form state when tier changes
  useEffect(() => {
    if (tier) {
      setTierNumber(String(tier.tierNumber))
      setTierName(tier.tierName)
    }
  }, [tier])

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

  if (!visible || !tier) return null

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
            <h2 className="text-xl font-semibold text-foreground">Edit Tier</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Tier {tier.tierNumber}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 mt-1">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="tierNumber">Tier Number</Label>
            <Input
              id="tierNumber"
              type="number"
              min="1"
              value={tierNumber}
              onChange={(e) => setTierNumber(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Must be a positive integer (1, 2, 3, etc.)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tierName">Tier Name</Label>
            <Input
              id="tierName"
              value={tierName}
              onChange={(e) => setTierName(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Display name for this tier
            </p>
          </div>

          {/* Warning note */}
          <div className="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="shrink-0 mt-0.5">
              <div className="h-5 w-5 rounded-full bg-amber-400 flex items-center justify-center">
                <span className="text-xs font-bold text-amber-900">!</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-amber-900">Note</p>
              <p className="text-sm text-amber-800 mt-0.5">
                Changes to tier numbers may affect existing product pricing. All products using this tier will be updated automatically.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 py-4 border-t bg-background shrink-0">
          <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
            <Trash2 className="h-4 w-4 mr-1.5" />
            Delete Tier
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
