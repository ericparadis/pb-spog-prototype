import { useEffect, useRef } from 'react'
import { X, Mail, Phone, MapPin, Calendar, CreditCard, Award } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import type { MemberTableRow } from '../types'
import { getMemberDetailData } from '../data/member-detail-data'

interface MemberDrawerProps {
  member: MemberTableRow | null
  open: boolean
  onClose: () => void
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export function MemberDrawer({ member, open, onClose }: MemberDrawerProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open || !member) return null

  const detail = getMemberDetailData(member.id)

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="absolute top-0 right-0 h-full w-[800px] max-w-full bg-background shadow-2xl border-l flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-foreground">Member Details</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Profile Card */}
        <div className="px-6 py-5 border-b">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg bg-primary/10 text-primary font-semibold">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-semibold text-foreground truncate">{member.name}</h3>
                <Badge
                  variant="outline"
                  className={`text-xs font-medium px-2.5 py-0.5 shrink-0 ${
                    member.agreementStatus === 'Active'
                      ? 'bg-green-100 text-green-800 border-transparent'
                      : 'bg-red-100 text-red-800 border-transparent'
                  }`}
                >
                  {member.agreementStatus}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  {member.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  {member.phone}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800 border-transparent">
                  {member.memberType}
                </Badge>
                <Badge variant="outline" className="text-xs bg-gray-100 text-gray-700 border-transparent">
                  {member.membershipName}
                </Badge>
                <span className="text-xs text-muted-foreground">Last visit: {member.lastVisit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="profile" className="flex flex-col h-full">
            <div className="px-6 border-b">
              <TabsList className="bg-transparent h-auto p-0 gap-0">
                <TabsTrigger
                  value="profile"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5 text-sm"
                >
                  Profile Information
                </TabsTrigger>
                <TabsTrigger
                  value="agreements"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5 text-sm"
                >
                  Agreements & Purchases
                </TabsTrigger>
                <TabsTrigger
                  value="activity"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5 text-sm"
                >
                  Activity
                </TabsTrigger>
                <TabsTrigger
                  value="communication"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5 text-sm"
                >
                  Communication
                </TabsTrigger>
                <TabsTrigger
                  value="notes"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5 text-sm"
                >
                  Notes
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {/* Profile Information Tab */}
              <TabsContent value="profile" className="mt-0 space-y-4">
                <Card className="p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Personal Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <InfoRow label="Date of Birth" value={detail.dateOfBirth} />
                    <InfoRow label="Age" value={detail.age} />
                    <InfoRow label="Gender" value={detail.gender} />
                    <InfoRow label="Member Since" value={detail.joinDate} />
                  </div>
                </Card>
                <Card className="p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <InfoRow label="Email" value={member.email} icon={<Mail className="h-3.5 w-3.5" />} />
                    <InfoRow label="Phone" value={member.phone} icon={<Phone className="h-3.5 w-3.5" />} />
                    <InfoRow label="Address" value={detail.address} icon={<MapPin className="h-3.5 w-3.5" />} />
                  </div>
                </Card>
                <Card className="p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Emergency Contact</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <InfoRow label="Name" value={detail.emergencyContact.name} />
                    <InfoRow label="Phone" value={detail.emergencyContact.phone} />
                    <InfoRow label="Relationship" value={detail.emergencyContact.relationship} />
                  </div>
                </Card>
              </TabsContent>

              {/* Agreements & Purchases Tab */}
              <TabsContent value="agreements" className="mt-0 space-y-4">
                <Card className="p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Current Agreement</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <InfoRow label="Plan" value={detail.agreement.plan} icon={<Award className="h-3.5 w-3.5" />} />
                    <InfoRow label="Status" value={detail.agreement.status} />
                    <InfoRow label="Start Date" value={detail.agreement.startDate} icon={<Calendar className="h-3.5 w-3.5" />} />
                    <InfoRow label="Next Billing" value={detail.agreement.nextBilling} />
                    <InfoRow label="Monthly Rate" value={detail.agreement.monthlyRate} icon={<CreditCard className="h-3.5 w-3.5" />} />
                    <InfoRow label="Payment Method" value={detail.agreement.paymentMethod} />
                  </div>
                </Card>
                <Card className="p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Purchase History</h4>
                  <div className="space-y-3">
                    {detail.purchases.map((purchase, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div>
                          <p className="text-sm font-medium text-foreground">{purchase.item}</p>
                          <p className="text-xs text-muted-foreground">{purchase.date}</p>
                        </div>
                        <span className="text-sm font-medium text-foreground">{purchase.amount}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="mt-0 space-y-4">
                <Card className="p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Visit Summary</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{detail.visitSummary.thisMonth}</p>
                      <p className="text-xs text-muted-foreground">This Month</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{detail.visitSummary.lastMonth}</p>
                      <p className="text-xs text-muted-foreground">Last Month</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{detail.visitSummary.total}</p>
                      <p className="text-xs text-muted-foreground">All Time</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Recent Activity</h4>
                  <div className="space-y-3">
                    {detail.recentActivity.map((activity, i) => (
                      <div key={i} className="flex items-start gap-3 py-2 border-b last:border-0">
                        <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${
                          activity.type === 'check-in' ? 'bg-green-500' :
                          activity.type === 'class' ? 'bg-blue-500' :
                          activity.type === 'purchase' ? 'bg-purple-500' :
                          'bg-gray-400'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Communication History Tab */}
              <TabsContent value="communication" className="mt-0 space-y-4">
                <Card className="p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Communication Log</h4>
                  <div className="space-y-3">
                    {detail.communications.map((comm, i) => (
                      <div key={i} className="py-3 border-b last:border-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={`text-xs px-2 py-0.5 ${
                              comm.channel === 'Email' ? 'bg-blue-50 text-blue-700 border-transparent' :
                              comm.channel === 'SMS' ? 'bg-green-50 text-green-700 border-transparent' :
                              comm.channel === 'Phone' ? 'bg-amber-50 text-amber-700 border-transparent' :
                              'bg-gray-50 text-gray-700 border-transparent'
                            }`}>
                              {comm.channel}
                            </Badge>
                            <span className="text-sm font-medium text-foreground">{comm.subject}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{comm.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{comm.summary}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes" className="mt-0 space-y-4">
                <Card className="p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Member Notes</h4>
                  <div className="space-y-3">
                    {detail.notes.map((note, i) => (
                      <div key={i} className="py-3 border-b last:border-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{note.author}</span>
                          <span className="text-xs text-muted-foreground">{note.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{note.content}</p>
                      </div>
                    ))}
                    {detail.notes.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">No notes yet.</p>
                    )}
                  </div>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      <p className="text-sm text-foreground flex items-center gap-1.5">
        {icon}
        {value}
      </p>
    </div>
  )
}
