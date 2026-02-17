import { useState, useEffect, useRef } from 'react'
import { X, Mail, Phone, Calendar, DollarSign, Clock, User, CheckSquare, Target } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import tasksJson from '@/data/tasks.json'
import {
  PIPELINE_STAGES,
  getAgingStatus,
  getAgingBorderClass,
  getAgingTextClass,
} from '../types'
import type { Opportunity } from '../types'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

interface OpportunityDetailDrawerProps {
  opportunity: Opportunity | null
  open: boolean
  onClose: () => void
}

export function OpportunityDetailDrawer({ opportunity, open, onClose }: OpportunityDetailDrawerProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
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
  }, [open])

  function handleClose() {
    setIsAnimating(false)
    setTimeout(onClose, 300)
  }

  if (!open || !opportunity) return null

  const stageConfig = PIPELINE_STAGES.find((s) => s.id === opportunity.pipelineStage)
  const aging = stageConfig ? getAgingStatus(opportunity.daysInStage, stageConfig) : 'fresh'
  const agingBorder = getAgingBorderClass(aging)
  const agingText = getAgingTextClass(aging)

  // Get related tasks
  const relatedTasks = tasksJson.filter((t) => t.relatedMemberId === opportunity.customerId)

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 transition-opacity duration-300',
          isAnimating ? 'bg-black/40' : 'bg-black/0'
        )}
        onClick={handleClose}
      />
      <div
        ref={drawerRef}
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-[1000px] max-w-full bg-background border-l shadow-xl flex flex-col overflow-hidden transition-transform duration-300 ease-out',
          isAnimating ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Opportunity Details</h2>
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
                  {getInitials(opportunity.customerName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-foreground">{opportunity.name}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{opportunity.customerName}</p>
                <div className="flex items-center gap-2 mt-2">
                  {stageConfig && (
                    <Badge className={cn(stageConfig.colorClass, stageConfig.textColorClass, 'border-0')}>
                      {stageConfig.label}
                    </Badge>
                  )}
                  <Badge variant="outline">{opportunity.source}</Badge>
                  <Badge variant="outline" className={cn('border-0', agingText, aging === 'stale' ? 'bg-red-50' : aging === 'aging' ? 'bg-amber-50' : 'bg-green-50')}>
                    {opportunity.daysInStage}d in stage
                  </Badge>
                </div>
              </div>
              <div className={cn('text-right border-l-4 pl-3', agingBorder)}>
                <p className="text-2xl font-bold text-foreground">
                  ${opportunity.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-muted-foreground">potential revenue</p>
              </div>
            </div>
          </div>

          {/* Opportunity Information */}
          <div className="px-6 py-5 border-b">
            <h4 className="text-sm font-semibold text-foreground mb-3">Opportunity Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Pipeline Stage</p>
                <p className="text-sm font-medium text-foreground">{stageConfig?.label}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Days in Stage</p>
                <p className={cn('text-sm font-bold tabular-nums', agingText)}>
                  {opportunity.daysInStage} days
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Owner</p>
                <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  {opportunity.owner}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Source</p>
                <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5" />
                  {opportunity.source}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Created Date</p>
                <p className="text-sm text-foreground flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(opportunity.createdDate)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Expected Close</p>
                <p className="text-sm text-foreground flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {formatDate(opportunity.expectedCloseDate)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Value</p>
                <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5" />
                  ${opportunity.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}/mo
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Stage Entered</p>
                <p className="text-sm text-foreground flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(opportunity.stageEnteredDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Related Tasks */}
          <div className="px-6 py-5 border-b">
            <h4 className="text-sm font-semibold text-foreground mb-3">
              Related Tasks ({relatedTasks.length})
            </h4>
            {relatedTasks.length > 0 ? (
              <div className="space-y-2">
                {relatedTasks.map((task) => (
                  <Card key={task.id} className="p-3">
                    <div className="flex items-start gap-3">
                      <CheckSquare
                        className={cn(
                          'h-4 w-4 mt-0.5 flex-shrink-0',
                          task.status === 'completed'
                            ? 'text-green-500'
                            : task.status === 'overdue'
                              ? 'text-red-500'
                              : 'text-muted-foreground'
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{task.title}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground">
                            Assigned to {task.assignedTo}
                          </span>
                          <Badge
                            variant="outline"
                            className={cn(
                              'text-[10px] px-1.5 py-0',
                              task.status === 'completed' && 'text-green-700 bg-green-50 border-green-200',
                              task.status === 'overdue' && 'text-red-700 bg-red-50 border-red-200',
                              task.status === 'in-progress' && 'text-blue-700 bg-blue-50 border-blue-200',
                              task.status === 'open' && 'text-gray-700 bg-gray-50 border-gray-200'
                            )}
                          >
                            {task.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Due {formatDate(task.dueDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No tasks linked to this opportunity.</p>
            )}
          </div>

          {/* Activity Timeline */}
          <div className="px-6 py-5 border-b">
            <h4 className="text-sm font-semibold text-foreground mb-3">Activity Timeline</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 py-2 border-b last:border-0">
                <div className="mt-0.5 h-2 w-2 rounded-full shrink-0 bg-green-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">Opportunity created from {opportunity.source}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(opportunity.createdDate)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 py-2 border-b last:border-0">
                <div className="mt-0.5 h-2 w-2 rounded-full shrink-0 bg-blue-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">Assigned to {opportunity.owner}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(opportunity.createdDate)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 py-2 border-b last:border-0">
                <div className={cn('mt-0.5 h-2 w-2 rounded-full shrink-0', aging === 'stale' ? 'bg-red-500' : aging === 'aging' ? 'bg-amber-500' : 'bg-purple-500')} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    Entered {stageConfig?.label} stage
                  </p>
                  <p className="text-xs text-muted-foreground">{formatDate(opportunity.stageEnteredDate)}</p>
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
                  <p className="text-xs text-muted-foreground mb-0.5">Customer</p>
                  <p className="text-sm text-foreground font-medium">{opportunity.customerName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Type</p>
                  <p className="text-sm text-foreground capitalize flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    {opportunity.customerType}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Customer ID</p>
                  <p className="text-sm text-foreground flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    {opportunity.customerId}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Location</p>
                  <p className="text-sm text-foreground flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    {opportunity.locationId}
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
            <Button>View Customer Profile</Button>
          </div>
        </div>
      </div>
    </>
  )
}
