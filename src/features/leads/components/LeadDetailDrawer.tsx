import { useState, useEffect, useRef } from 'react'
import { X, Mail, Phone, Calendar, MapPin } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { LeadStatusBadge } from './LeadStatusBadge'
import { LeadPriorityBadge } from './LeadPriorityBadge'
import type { LeadTableRow } from '../types'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

interface LeadDetailDrawerProps {
  lead: LeadTableRow
  onClose: () => void
}

export function LeadDetailDrawer({ lead, onClose }: LeadDetailDrawerProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    requestAnimationFrame(() => setIsAnimating(true))
    document.body.style.overflow = 'hidden'
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [])

  function handleClose() {
    setIsAnimating(false)
    setTimeout(onClose, 300)
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${isAnimating ? 'bg-black/40' : 'bg-black/0'}`}
        onClick={handleClose}
      />
      <div
        ref={drawerRef}
        className={`fixed right-0 top-0 z-50 h-full w-[1000px] max-w-full bg-background border-l shadow-xl flex flex-col overflow-hidden transition-transform duration-300 ease-out ${isAnimating ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Lead Details</h2>
          <button
            onClick={handleClose}
            className="rounded-sm opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Profile Card */}
          <div className="px-6 py-5 border-b bg-muted/30">
            <div className="flex items-start gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="text-base bg-primary/10 text-primary">
                  {getInitials(lead.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-semibold text-foreground">{lead.name}</h3>
                  <LeadStatusBadge status={lead.status} />
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    {lead.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    {lead.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Information */}
          <div className="px-6 py-5 border-b">
            <h4 className="text-sm font-semibold text-foreground mb-3">Lead Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Priority</p>
                <div className="mt-1"><LeadPriorityBadge priority={lead.priority} /></div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Source</p>
                <p className="text-sm font-medium text-foreground">{lead.source}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Assigned Staff</p>
                <p className="text-sm font-medium text-foreground">{lead.assignedStaff}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Days Open</p>
                <p className="text-sm font-bold tabular-nums text-foreground">{lead.daysOpen}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Last Activity</p>
                <p className="text-sm text-foreground">{lead.lastActivity}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Appointment</p>
                <p className={`text-sm ${lead.appointment === 'N/A' || lead.appointment === 'Not Scheduled' ? 'text-muted-foreground' : 'text-foreground font-medium'}`}>
                  {lead.appointment === 'N/A' || lead.appointment === 'Not Scheduled' ? (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {lead.appointment}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {lead.appointment}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="px-6 py-5 border-b">
            <h4 className="text-sm font-semibold text-foreground mb-3">Activity Timeline</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 py-2 border-b last:border-0">
                <div className="mt-0.5 h-2 w-2 rounded-full shrink-0 bg-green-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">Lead created from {lead.source}</p>
                  <p className="text-xs text-muted-foreground">{lead.daysOpen} days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 py-2 border-b last:border-0">
                <div className="mt-0.5 h-2 w-2 rounded-full shrink-0 bg-blue-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">Assigned to {lead.assignedStaff}</p>
                  <p className="text-xs text-muted-foreground">{Math.max(lead.daysOpen - 1, 0)} days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 py-2 border-b last:border-0">
                <div className="mt-0.5 h-2 w-2 rounded-full shrink-0 bg-purple-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">Last activity recorded</p>
                  <p className="text-xs text-muted-foreground">{lead.lastActivity}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="px-6 py-5">
            <h4 className="text-sm font-semibold text-foreground mb-3">Contact Information</h4>
            <Card className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                  <p className="text-sm text-foreground flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    {lead.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                  <p className="text-sm text-foreground flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    {lead.phone}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Source</p>
                  <p className="text-sm text-foreground flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {lead.source}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer actions */}
        <div className="border-t px-6 py-4 bg-background">
          <div className="flex items-center gap-3 justify-end">
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
            <Button>
              Convert to Member
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
