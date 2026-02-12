import { ReactNode, useState } from 'react'
import { Settings, X } from 'lucide-react'
import { BrandSwitcher } from './BrandSwitcher'
import { RoleSwitcher } from './RoleSwitcher'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

interface PrototypeControlsProps {
  children: ReactNode
}

export function PrototypeControls({ children }: PrototypeControlsProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      {/* Floating Controls Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Open prototype controls"
      >
        <Settings className="h-5 w-5" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg">
            <div className="bg-card border border-border rounded-lg shadow-lg">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-lg font-semibold font-mono">🔧 Prototype Controls</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Context Controls */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Brand</label>
                    <BrandSwitcher />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Role</label>
                    <RoleSwitcher />
                  </div>
                </div>

                <Separator />

                {/* Metadata */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Build Information</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">Version</span>
                      <span className="font-mono">v1.0.0</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">Build Date</span>
                      <span className="font-mono">2026-02-12</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">Status</span>
                      <span className="font-mono text-green-600">Deployed</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">Environment</span>
                      <span className="font-mono">Development</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Actual App Content */}
      {children}
    </div>
  )
}
