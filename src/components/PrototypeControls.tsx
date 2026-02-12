import { ReactNode, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { BrandSwitcher } from './BrandSwitcher'
import { RoleSwitcher } from './RoleSwitcher'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

interface PrototypeControlsProps {
  children: ReactNode
}

export function PrototypeControls({ children }: PrototypeControlsProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="relative">
      {/* Control Panel */}
      <div className="bg-muted/30 border-b border-border">
        {/* Collapsed State */}
        {!isExpanded && (
          <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <span className="text-sm font-mono text-muted-foreground">Prototype Controls</span>
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(true)}>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Expanded State */}
        {isExpanded && (
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium font-mono">🔧 Prototype Controls</span>
              <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)}>
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>

            <Separator />

            {/* Context Controls */}
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Brand:</span>
                <BrandSwitcher />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Role:</span>
                <RoleSwitcher />
              </div>
            </div>

            <Separator />

            {/* Metadata - Placeholders */}
            <div className="flex items-center gap-6 text-xs text-muted-foreground flex-wrap">
              <div className="flex items-center gap-2">
                <span className="font-medium">Version:</span>
                <span className="font-mono">v1.0.0</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Build:</span>
                <span className="font-mono">2026-02-12</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                <span className="font-mono text-green-600">Deployed</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actual App Content */}
      {children}
    </div>
  )
}
