import { useState, useEffect, useRef } from 'react'
import { X, ChevronDown, ChevronRight, Mail, Phone, MessageSquare, Bell, Globe, MapPin, PlayCircle, Dumbbell, UserCheck } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { TaskStatusBadge } from './TaskStatusBadge'
import { TaskPriorityBadge } from './TaskPriorityBadge'
import type { TaskTableRow, CommunicationType } from '../types'
import { useLocationContext } from '@/lib/contexts/LocationContext'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

const commTypeConfig: Record<CommunicationType, { icon: typeof Mail; label: string; className: string }> = {
  email: { icon: Mail, label: 'Email', className: 'text-blue-600 bg-blue-50' },
  call: { icon: Phone, label: 'Call', className: 'text-green-600 bg-green-50' },
  text: { icon: MessageSquare, label: 'Text', className: 'text-purple-600 bg-purple-50' },
  push: { icon: Bell, label: 'Push', className: 'text-amber-600 bg-amber-50' },
}

const activityTypeConfig: Record<string, { icon: typeof Mail; label: string; className: string }> = {
  'website-viewed': { icon: Globe, label: 'Website Viewed', className: 'text-blue-600 bg-blue-50' },
  'location-visit': { icon: MapPin, label: 'Location Visit', className: 'text-emerald-600 bg-emerald-50' },
  'trial-started': { icon: PlayCircle, label: 'Trial Started', className: 'text-violet-600 bg-violet-50' },
  'class-attended': { icon: Dumbbell, label: 'Class Attended', className: 'text-indigo-600 bg-indigo-50' },
  'fitness-consultation': { icon: UserCheck, label: 'Consultation', className: 'text-amber-600 bg-amber-50' },
}

const defaultActivityConfig = { icon: MapPin, label: 'Activity', className: 'text-gray-600 bg-gray-50' }

const sampleScripts: Record<CommunicationType, { subject?: string; message: string }> = {
  email: {
    subject: 'Following up on your membership inquiry at {location}',
    message: `Hi {name},

Thank you for your interest in joining {location}! I wanted to follow up and see if you have any questions about our membership plans or facilities.

We're located at {locationAddress} and would love to schedule a tour at your convenience. You can reply to this email or call us at {locationPhone} to set up a time that works for you.

Looking forward to hearing from you!

Best regards,
{staff}
{location}`,
  },
  text: {
    message: `Hi {name}! This is {staff} from {location}. Just following up on your recent visit. Would you like to schedule a time to come back in? We're at {locationAddress}. Let me know if you have any questions!`,
  },
  push: {
    message: `Hey {name}! We noticed you haven't been in to {location} recently. We have some great new classes starting this week - come check them out! Reply STOP to opt out.`,
  },
  call: {
    message: `CALL SCRIPT:

1. Greeting: "Hi, this is {staff} calling from {location}. May I speak with {name}?"

2. Purpose: "I'm reaching out regarding your recent inquiry about membership / your upcoming renewal / your recent visit at our {locationAddress} location."

3. Discovery Questions:
   - "What are your main fitness goals right now?"
   - "Have you had a chance to visit our facility at {locationAddress}?"
   - "Is there anything specific you're looking for in a gym?"

4. Value Proposition: "Based on what you've told me, I think our [plan name] would be a great fit because..."

5. Close: "I'd love to set up a time for you to come in to {location}. Would [day] or [day] work better for you?"

6. Objection Handling:
   - Price: "I understand budget is important. Let me share our current promotion..."
   - Timing: "No problem! When would be a better time to revisit this?"
   - Comparison: "I appreciate you doing your research. Here's what sets us apart..."`,
  },
}

interface TaskDetailDrawerProps {
  task: TaskTableRow
  onClose: () => void
  onComplete: (taskId: string) => void
}

export function TaskDetailDrawer({ task, onClose, onComplete }: TaskDetailDrawerProps) {
  const { currentLocation } = useLocationContext()
  const [activityOpen, setActivityOpen] = useState(false)
  const [commHistoryOpen, setCommHistoryOpen] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState<CommunicationType>(task.communicationType)
  const [showChannelPicker, setShowChannelPicker] = useState(false)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
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

  const script = sampleScripts[selectedChannel]
  const memberName = task.relatedMember
  const staffName = task.assignedTo

  const locationName = currentLocation?.name ?? ''
  const locationAddress = currentLocation
    ? `${currentLocation.address}, ${currentLocation.city}, ${currentLocation.state} ${currentLocation.zip}`
    : ''
  const locationPhone = currentLocation?.phone ?? ''

  function fillSampleCopy() {
    const fill = (text: string) =>
      text
        .replace(/\{name\}/g, memberName)
        .replace(/\{staff\}/g, staffName)
        .replace(/\{location\}/g, locationName)
        .replace(/\{locationAddress\}/g, locationAddress)
        .replace(/\{locationPhone\}/g, locationPhone)
    setMessage(fill(script.message))
    if (script.subject) {
      setSubject(fill(script.subject))
    }
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
        <div className="flex items-start justify-between px-6 py-4 border-b">
          <div className="flex-1 min-w-0 pr-4">
            <h2 className="text-lg font-semibold text-foreground">{task.title}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">{task.description}</p>
          </div>
          <button
            onClick={handleClose}
            className="rounded-sm opacity-70 hover:opacity-100 transition-opacity mt-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Profile Card with Communication History & Notes */}
          <div className="m-4 border rounded-lg bg-muted/30 overflow-hidden">
            {/* Profile */}
            <div className="px-5 py-5">
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="text-base bg-primary/10 text-primary">
                    {getInitials(task.relatedMember)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-foreground">{task.relatedMember}</h3>
                    <Badge variant="outline" className={`text-xs capitalize ${
                      task.relatedMemberType === 'lead'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {task.relatedMemberType}
                    </Badge>
                  </div>
                  {task.relatedMemberEmail && (
                    <p className="text-sm text-muted-foreground mt-0.5">{task.relatedMemberEmail}</p>
                  )}
                  {task.relatedMemberPhone && (
                    <p className="text-sm text-muted-foreground">{task.relatedMemberPhone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Communication History Accordion */}
            <div className="border-t">
              <button
                onClick={() => setCommHistoryOpen(!commHistoryOpen)}
                className="flex items-center gap-2 w-full px-5 py-3 text-left hover:bg-muted/50 transition-colors"
              >
                {commHistoryOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <span className="text-sm font-semibold text-foreground">
                  Communication History ({task.communicationHistory.length})
                </span>
              </button>
              {commHistoryOpen && (
                <div className="px-5 pb-4">
                  {task.communicationHistory.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No communication history yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {task.communicationHistory.map((entry, idx) => {
                        const config = commTypeConfig[entry.type]
                        const Icon = config.icon
                        return (
                          <div key={idx} className="flex items-start gap-3">
                            <div className={`rounded-full p-1.5 ${config.className}`}>
                              <Icon className="h-3.5 w-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-foreground">{config.label}</span>
                                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                  {entry.direction}
                                </Badge>
                                <span className="text-xs text-muted-foreground ml-auto">{entry.date}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-0.5">{entry.summary}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Activity Accordion */}
            <div className="border-t">
              <button
                onClick={() => setActivityOpen(!activityOpen)}
                className="flex items-center gap-2 w-full px-5 py-3 text-left hover:bg-muted/50 transition-colors"
              >
                {activityOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <span className="text-sm font-semibold text-foreground">
                  Activity ({task.activity.length})
                </span>
              </button>
              {activityOpen && (
                <div className="px-5 pb-4">
                  {task.activity.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No activity recorded yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {task.activity.map((entry, idx) => {
                        const config = activityTypeConfig[entry.type] ?? defaultActivityConfig
                        const Icon = config.icon
                        return (
                          <div key={idx} className="flex items-start gap-3">
                            <div className={`rounded-full p-1.5 ${config.className}`}>
                              <Icon className="h-3.5 w-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-foreground">{config.label}</span>
                                <span className="text-xs text-muted-foreground ml-auto">{entry.date}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-0.5">{entry.detail}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Notes Accordion */}
            <div className="border-t">
              <button
                onClick={() => setNotesOpen(!notesOpen)}
                className="flex items-center gap-2 w-full px-5 py-3 text-left hover:bg-muted/50 transition-colors"
              >
                {notesOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <span className="text-sm font-semibold text-foreground">
                  Notes ({task.notes.length})
                </span>
              </button>
              {notesOpen && (
                <div className="px-5 pb-4">
                  {task.notes.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No notes yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {task.notes.map((note, idx) => (
                        <div key={idx} className="bg-muted/50 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-foreground">{note.author}</span>
                            <span className="text-xs text-muted-foreground">{note.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{note.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Task Details — condensed */}
          <div className="px-6 py-4 border-b">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
              <span><TaskStatusBadge status={task.status} /></span>
              <span><TaskPriorityBadge priority={task.priority} /></span>
              <span className="capitalize">{task.category}</span>
              <span>{task.assignedTo}</span>
              <span>Due {task.dueDate}</span>
            </div>
          </div>

          {/* Messaging Section */}
          <div className="px-6 py-5">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="text-sm font-semibold text-foreground">Send Communication</h4>
              <span className="text-sm text-muted-foreground">—</span>
              {(() => {
                const activeConfig = commTypeConfig[selectedChannel]
                const ActiveIcon = activeConfig.icon
                return (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <ActiveIcon className={`h-3.5 w-3.5 ${activeConfig.className.split(' ')[0]}`} />
                    {activeConfig.label}
                  </span>
                )
              })()}
              <button
                onClick={() => setShowChannelPicker(!showChannelPicker)}
                className="text-xs text-primary hover:underline ml-1"
              >
                {showChannelPicker ? 'hide' : 'change'}
              </button>
            </div>

            {/* Channel Tabs — hidden until "change" is clicked */}
            {showChannelPicker && (
              <div className="flex gap-2 mb-4">
                {(Object.keys(commTypeConfig) as CommunicationType[]).map((channel) => {
                  const config = commTypeConfig[channel]
                  const Icon = config.icon
                  const isActive = selectedChannel === channel
                  return (
                    <button
                      key={channel}
                      onClick={() => {
                        setSelectedChannel(channel)
                        setSubject('')
                        setMessage('')
                        setShowChannelPicker(false)
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {config.label}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Sample script button */}
            <div className="mb-4">
              <Button variant="outline" size="sm" onClick={fillSampleCopy}>
                Load Sample Script
              </Button>
            </div>

            {/* Input fields */}
            <div className="space-y-3">
              {selectedChannel === 'email' && (
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Subject</label>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Email subject..."
                  />
                </div>
              )}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  {selectedChannel === 'call' ? 'Call Script / Notes' : 'Message'}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={selectedChannel === 'call' ? 'Call notes...' : 'Type your message...'}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[280px] resize-y"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="border-t px-6 py-4 bg-background">
          <div className="flex items-center gap-3 justify-end">
            {selectedChannel === 'call' ? (
              <Button onClick={() => onComplete(task.id)}>
                Mark Complete
              </Button>
            ) : (
              <Button onClick={() => onComplete(task.id)}>
                Send & Mark Complete
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
