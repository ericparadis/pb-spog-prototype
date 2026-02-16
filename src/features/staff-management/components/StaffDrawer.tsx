import { useEffect, useState, useMemo } from 'react'
import {
  X, Mail, Phone, MapPin, Calendar, Award, Briefcase, Shield, Clock, Check,
  Trash2, Plus, ChevronRight, AtSign, Info, Copy,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import locationsJson from '@/data/locations.json'
import { useBrand } from '@/lib/contexts/BrandContext'
import type { StaffTableRow, AuditLogEntry } from '../types'

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
  if (!dateStr) return ''
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

const availableRoles = [
  { id: 'gym-manager', name: 'Manager', description: 'Full location management access' },
  { id: 'front-desk', name: 'Front Desk', description: 'Check-in, member lookup, class rosters' },
  { id: 'trainer', name: 'Trainer', description: 'Schedule, assigned members, class management' },
  { id: 'regional-manager', name: 'Regional Manager', description: 'Multi-location operational oversight' },
  { id: 'franchise-owner', name: 'Owner', description: 'Full brand-level access and analytics' },
]

function generateAuditLog(staff: StaffTableRow): AuditLogEntry[] {
  return [
    {
      id: 'audit-1',
      action: 'Role Updated',
      details: `Role changed to ${roleLabels[staff.role] || staff.role}`,
      performedBy: 'System Admin',
      timestamp: '2025-12-15T14:30:00Z',
    },
    {
      id: 'audit-2',
      action: 'Location Added',
      details: `Assigned to ${staff.locations[0] || 'Primary Location'}`,
      performedBy: 'Sarah Johnson',
      timestamp: '2025-11-20T09:15:00Z',
    },
    {
      id: 'audit-3',
      action: 'Profile Updated',
      details: 'Email and phone number updated',
      performedBy: staff.name,
      timestamp: '2025-10-05T11:45:00Z',
    },
    {
      id: 'audit-4',
      action: 'Account Created',
      details: `Staff account created with ${roleLabels[staff.role] || staff.role} role`,
      performedBy: 'System Admin',
      timestamp: staff.hireDate + 'T08:00:00Z',
    },
  ]
}

export function StaffDrawer({ staff, open, onClose }: StaffDrawerProps) {
  const { currentBrand } = useBrand()

  // Form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [title, setTitle] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [bio, setBio] = useState('')

  // Locations & Roles state
  const [assignedLocationIds, setAssignedLocationIds] = useState<string[]>([])
  const [roleAssignments, setRoleAssignments] = useState<Record<string, string[]>>({})
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null)
  const [showAddRole, setShowAddRole] = useState(false)

  // Change tracking
  const [hasChanges, setHasChanges] = useState(false)
  const [originalSnapshot, setOriginalSnapshot] = useState('')
  const [copiedUsername, setCopiedUsername] = useState(false)

  const brandLocations = useMemo(
    () => locationsJson.filter((loc) => loc.brandId === currentBrand.id),
    [currentBrand.id]
  )

  const availableLocationsToAdd = useMemo(
    () => brandLocations.filter((loc) => !assignedLocationIds.includes(loc.id)),
    [brandLocations, assignedLocationIds]
  )

  // Initialize form when staff changes
  useEffect(() => {
    if (staff && open) {
      setFirstName(staff.firstName)
      setLastName(staff.lastName)
      setUsername(staff.email.split('@')[0])
      setTitle(staff.title)
      setContactEmail(staff.email)
      setPhone(staff.phone)
      setBirthdate(staff.birthdate || '')
      setBio(staff.bio)

      setAssignedLocationIds([...staff.locationIds])
      const initialRoles: Record<string, string[]> = {}
      staff.locationIds.forEach((locId) => {
        initialRoles[locId] = [staff.role]
      })
      setRoleAssignments(initialRoles)
      setSelectedLocationId(staff.locationIds[0] || null)
      setShowAddRole(false)

      const snapshot = JSON.stringify({
        firstName: staff.firstName,
        lastName: staff.lastName,
        title: staff.title,
        email: staff.email,
        phone: staff.phone,
        birthdate: staff.birthdate || '',
        bio: staff.bio,
        locationIds: [...staff.locationIds].sort(),
      })
      setOriginalSnapshot(snapshot)
      setHasChanges(false)
    }
  }, [staff, open])

  // Detect changes
  useEffect(() => {
    if (!staff || !open) return
    const current = JSON.stringify({
      firstName,
      lastName,
      title,
      email: contactEmail,
      phone,
      birthdate,
      bio,
      locationIds: [...assignedLocationIds].sort(),
    })
    setHasChanges(current !== originalSnapshot)
  }, [firstName, lastName, title, contactEmail, phone, birthdate, bio, assignedLocationIds, originalSnapshot, staff, open])

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

  const handleSave = () => {
    setOriginalSnapshot(
      JSON.stringify({
        firstName,
        lastName,
        title,
        email: contactEmail,
        phone,
        birthdate,
        bio,
        locationIds: [...assignedLocationIds].sort(),
      })
    )
    setHasChanges(false)
  }

  const handleAddLocation = (locationId: string) => {
    if (!assignedLocationIds.includes(locationId)) {
      setAssignedLocationIds((prev) => [...prev, locationId])
      setRoleAssignments((prev) => ({ ...prev, [locationId]: [] }))
      setSelectedLocationId(locationId)
    }
  }

  const handleRemoveLocation = (locationId: string) => {
    setAssignedLocationIds((prev) => prev.filter((id) => id !== locationId))
    setRoleAssignments((prev) => {
      const next = { ...prev }
      delete next[locationId]
      return next
    })
    if (selectedLocationId === locationId) {
      setSelectedLocationId(assignedLocationIds.filter((id) => id !== locationId)[0] || null)
    }
  }

  const handleRoleToggle = (locationId: string, roleId: string) => {
    setRoleAssignments((prev) => {
      const current = prev[locationId] || []
      const has = current.includes(roleId)
      return {
        ...prev,
        [locationId]: has ? current.filter((id) => id !== roleId) : [...current, roleId],
      }
    })
  }

  const handleCopyUsername = () => {
    navigator.clipboard.writeText(username)
    setCopiedUsername(true)
    setTimeout(() => setCopiedUsername(false), 2000)
  }

  const auditLogs = staff ? generateAuditLog(staff) : []
  const selectedLocation = brandLocations.find((l) => l.id === selectedLocationId)
  const selectedLocationRoles = selectedLocationId ? roleAssignments[selectedLocationId] || [] : []

  if (!staff) return null

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div
        className={`absolute top-0 right-0 h-full w-[1000px] max-w-full bg-background shadow-2xl border-l flex flex-col transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header with avatar, name, status, save */}
        <div className="px-6 py-5 border-b">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg bg-primary/10 text-primary font-semibold">
                  {getInitials(`${firstName} ${lastName}`)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-semibold text-foreground truncate">
                    {firstName} {lastName}
                  </h3>
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
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
                  <Briefcase className="h-3.5 w-3.5" />
                  {title || 'No Title Assigned'}
                </div>
                <div className="text-sm text-muted-foreground">{contactEmail}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasChanges && (
                <Button size="sm" onClick={handleSave}>
                  <Check className="h-4 w-4 mr-1.5" />
                  Save Changes
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
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
                  value="locations-roles"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5 text-sm"
                >
                  Locations & Roles
                </TabsTrigger>
                <TabsTrigger
                  value="audit-log"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5 text-sm"
                >
                  Audit Log
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Profile Tab */}
              <TabsContent value="profile" className="mt-0 p-6">
                <div className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        First Name <span className="text-primary">*</span>
                      </Label>
                      <Input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Last Name <span className="text-primary">*</span>
                      </Label>
                      <Input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Username (read-only) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Sign-in Username
                      </Label>
                      <span className="text-xs text-muted-foreground">Username cannot be changed.</span>
                    </div>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        readOnly
                        value={username}
                        className="pl-9 pr-10 bg-muted cursor-default"
                      />
                      <button
                        type="button"
                        onClick={handleCopyUsername}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                        title="Copy username"
                      >
                        {copiedUsername ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Title
                    </Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Club Manager, Head Coach"
                        className="pl-9"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Info className="h-3.5 w-3.5 text-primary" />
                      This is the staff member's formal club title.
                    </p>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Email <span className="text-primary">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Phone <span className="text-primary">*</span>
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(555) 000-0000"
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Birthdate */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Birthdate
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="date"
                          value={birthdate}
                          onChange={(e) => setBirthdate(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Hire Date
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="date"
                          value={staff.hireDate}
                          readOnly
                          className="pl-9 bg-muted cursor-default"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Certifications (read-only display) */}
                  {staff.certifications.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-dashed">
                      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Certifications
                      </Label>
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
                      </div>
                    </div>
                  )}

                  {/* Bio */}
                  <div className="space-y-1.5 pt-2 border-t border-dashed">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Bio / Notes
                    </Label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      placeholder="Add any additional context, background, or internal notes about this staff member..."
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Locations & Roles Tab */}
              <TabsContent value="locations-roles" className="mt-0 h-full">
                <div className="flex h-[calc(100vh-220px)]">
                  {/* Location Navigator */}
                  <div className="w-[260px] border-r flex flex-col shrink-0 bg-muted/30">
                    <div className="p-3 border-b">
                      {availableLocationsToAdd.length > 0 ? (
                        <select
                          value=""
                          onChange={(e) => handleAddLocation(e.target.value)}
                          className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground"
                        >
                          <option value="" disabled>
                            Add a location...
                          </option>
                          {availableLocationsToAdd.map((loc) => (
                            <option key={loc.id} value={loc.id}>
                              {loc.name.replace(`${currentBrand.name} `, '')}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className="text-xs text-muted-foreground text-center py-1.5">
                          All locations assigned
                        </p>
                      )}
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
                      {assignedLocationIds.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-center py-10 opacity-50">
                          <MapPin className="h-8 w-8 mb-2 text-muted-foreground" />
                          <p className="text-xs font-medium text-muted-foreground">No locations</p>
                          <p className="text-xs text-muted-foreground mt-1">Add a location to assign roles.</p>
                        </div>
                      ) : (
                        assignedLocationIds.map((locId) => {
                          const loc = brandLocations.find((l) => l.id === locId)
                          const isActive = selectedLocationId === locId
                          const roleCount = roleAssignments[locId]?.length || 0
                          return (
                            <div
                              key={locId}
                              onClick={() => setSelectedLocationId(locId)}
                              className={`p-3 rounded-lg border cursor-pointer group transition-all ${
                                isActive
                                  ? 'border-primary bg-primary/5'
                                  : 'border-transparent hover:bg-accent'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div
                                    className={`p-1.5 rounded-md ${
                                      isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground'
                                    }`}
                                  >
                                    <MapPin className="h-3.5 w-3.5" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-xs font-semibold truncate text-foreground">
                                      {loc?.name.replace(`${currentBrand.name} `, '') || locId}
                                    </div>
                                    <div className="text-[10px] text-primary font-medium">
                                      {roleCount} {roleCount === 1 ? 'role' : 'roles'}
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleRemoveLocation(locId)
                                  }}
                                  className="p-1 rounded text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          )
                        })
                      )}
                    </div>
                  </div>

                  {/* Roles Panel */}
                  <div className="flex-1 flex flex-col overflow-hidden">
                    {selectedLocationId ? (
                      <>
                        <div className="px-5 py-3 border-b bg-muted/30 flex items-center justify-between shrink-0">
                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                              Roles at {selectedLocation?.name.replace(`${currentBrand.name} `, '')}
                            </h4>
                          </div>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => setShowAddRole(!showAddRole)}
                          >
                            <Plus className="h-3.5 w-3.5 mr-1" />
                            Add Role
                          </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 space-y-3">
                          {selectedLocationRoles.length > 0 ? (
                            selectedLocationRoles.map((roleId) => {
                              const role = availableRoles.find((r) => r.id === roleId)
                              return (
                                <Card
                                  key={roleId}
                                  className="p-4 flex items-center justify-between group hover:border-primary/30 transition-colors"
                                >
                                  <div className="flex items-center gap-3 min-w-0">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                      <Shield className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="text-sm font-semibold text-foreground">
                                        {role?.name || roleId}
                                      </div>
                                      <p className="text-xs text-muted-foreground truncate">
                                        {role?.description}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                    <button
                                      onClick={() =>
                                        handleRoleToggle(selectedLocationId!, roleId)
                                      }
                                      className="p-1.5 rounded text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </Card>
                              )
                            })
                          ) : (
                            <div className="flex flex-col items-center justify-center text-center py-16 opacity-50">
                              <Shield className="h-10 w-10 mb-3 text-muted-foreground" />
                              <h4 className="text-sm font-semibold text-foreground">No Roles Assigned</h4>
                              <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                                Click "Add Role" to define this staff member's capabilities at this location.
                              </p>
                            </div>
                          )}

                          {/* Add Role Picker */}
                          {showAddRole && (
                            <Card className="p-4 border-primary/30 space-y-3">
                              <div className="flex items-center justify-between">
                                <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                  Available Roles
                                </h5>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setShowAddRole(false)}
                                  className="h-6 w-6 p-0"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                              <div className="space-y-2">
                                {availableRoles.map((role) => {
                                  const isAssigned = selectedLocationRoles.includes(role.id)
                                  return (
                                    <button
                                      key={role.id}
                                      onClick={() =>
                                        handleRoleToggle(selectedLocationId!, role.id)
                                      }
                                      className={`w-full p-3 rounded-lg border text-left transition-all flex items-center justify-between ${
                                        isAssigned
                                          ? 'border-primary bg-primary/5'
                                          : 'border-border hover:border-primary/30'
                                      }`}
                                    >
                                      <div className="min-w-0 mr-3">
                                        <div
                                          className={`text-sm font-medium ${
                                            isAssigned ? 'text-primary' : 'text-foreground'
                                          }`}
                                        >
                                          {role.name}
                                        </div>
                                        <div className="text-xs text-muted-foreground truncate">
                                          {role.description}
                                        </div>
                                      </div>
                                      <div
                                        className={`h-5 w-5 rounded border flex items-center justify-center shrink-0 ${
                                          isAssigned
                                            ? 'bg-primary border-primary'
                                            : 'border-border'
                                        }`}
                                      >
                                        {isAssigned && (
                                          <Check className="h-3 w-3 text-primary-foreground" />
                                        )}
                                      </div>
                                    </button>
                                  )
                                })}
                              </div>
                            </Card>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center opacity-50">
                          <MapPin className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                          <p className="text-sm font-medium text-muted-foreground">
                            Select a location to manage roles
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Audit Log Tab */}
              <TabsContent value="audit-log" className="mt-0 p-6">
                <div className="space-y-4">
                  {auditLogs.map((log) => (
                    <Card key={log.id} className="p-4 flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-foreground">{log.action}</h4>
                          <span className="text-xs text-muted-foreground tabular-nums">
                            {new Date(log.timestamp).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{log.details}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-[8px] bg-muted">
                              {getInitials(log.performedBy)}
                            </AvatarFallback>
                          </Avatar>
                          <span>
                            Modified by <span className="font-medium text-foreground">{log.performedBy}</span>
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
