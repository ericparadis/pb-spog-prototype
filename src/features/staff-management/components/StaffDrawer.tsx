import { useEffect } from 'react'
import { X, Mail, Phone, MapPin, Calendar, Award, Briefcase, Shield } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import type { StaffTableRow } from '../types'

interface StaffDrawerProps {
  staff: StaffTableRow | null
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

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const roleLabels: Record<string, string> = {
  'gym-manager': 'Manager',
  'front-desk': 'Front Desk',
  trainer: 'Trainer',
  'franchise-owner': 'Owner',
  'regional-manager': 'Regional Manager',
}

export function StaffDrawer({ staff, open, onClose }: StaffDrawerProps) {
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

  if (!open || !staff) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="absolute top-0 right-0 h-full w-[600px] max-w-full bg-background shadow-2xl border-l flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-foreground">Staff Details</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Profile Card */}
        <div className="px-6 py-5 border-b">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg bg-primary/10 text-primary font-semibold">
                {getInitials(staff.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-semibold text-foreground truncate">{staff.name}</h3>
                <Badge
                  variant="outline"
                  className={`text-xs font-medium px-2.5 py-0.5 shrink-0 ${
                    staff.status === 'Active'
                      ? 'bg-green-100 text-green-800 border-transparent'
                      : 'bg-red-100 text-red-800 border-transparent'
                  }`}
                >
                  {staff.status}
                </Badge>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                <Briefcase className="h-3.5 w-3.5" />
                {staff.title}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  {staff.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  {staff.phone}
                </span>
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
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="locations"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5 text-sm"
                >
                  Locations
                </TabsTrigger>
                <TabsTrigger
                  value="certifications"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5 text-sm"
                >
                  Certifications
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {/* Profile Tab */}
              <TabsContent value="profile" className="mt-0 space-y-4">
                <Card className="p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Employment Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <InfoRow label="Title" value={staff.title} icon={<Briefcase className="h-3.5 w-3.5" />} />
                    <InfoRow label="Role" value={roleLabels[staff.role] || staff.role} icon={<Shield className="h-3.5 w-3.5" />} />
                    <InfoRow label="Hire Date" value={formatDate(staff.hireDate)} icon={<Calendar className="h-3.5 w-3.5" />} />
                    <InfoRow label="Status" value={staff.status} />
                  </div>
                </Card>
                <Card className="p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <InfoRow label="Email" value={staff.email} icon={<Mail className="h-3.5 w-3.5" />} />
                    <InfoRow label="Phone" value={staff.phone} icon={<Phone className="h-3.5 w-3.5" />} />
                  </div>
                </Card>
                {staff.bio && (
                  <Card className="p-4">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Bio</h4>
                    <p className="text-sm text-muted-foreground">{staff.bio}</p>
                  </Card>
                )}
              </TabsContent>

              {/* Locations Tab */}
              <TabsContent value="locations" className="mt-0 space-y-4">
                <Card className="p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Assigned Locations</h4>
                  <div className="space-y-3">
                    {staff.locations.map((location, i) => (
                      <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0">
                        <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="text-sm text-foreground">{location}</span>
                      </div>
                    ))}
                    {staff.locations.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">No locations assigned.</p>
                    )}
                  </div>
                </Card>
              </TabsContent>

              {/* Certifications Tab */}
              <TabsContent value="certifications" className="mt-0 space-y-4">
                <Card className="p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {staff.certifications.map((cert) => (
                      <Badge
                        key={cert}
                        variant="outline"
                        className="text-xs font-medium px-2.5 py-1 bg-blue-50 text-blue-700 border-transparent"
                      >
                        <Award className="h-3 w-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                    {staff.certifications.length === 0 && (
                      <p className="text-sm text-muted-foreground">No certifications on file.</p>
                    )}
                  </div>
                </Card>
                {staff.specialties.length > 0 && (
                  <Card className="p-4">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {staff.specialties.map((specialty) => (
                        <Badge
                          key={specialty}
                          variant="outline"
                          className="text-xs font-medium px-2.5 py-1 bg-purple-50 text-purple-700 border-transparent"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                )}
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
