import { useAuth } from '@/lib/contexts/AuthContext'
import type { UserRole } from '@/lib/contexts/AuthContext'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const roleLabels: Record<UserRole, string> = {
  'franchise-owner': 'Franchise Owner',
  'regional-manager': 'Regional Manager',
  'gym-manager': 'Gym Manager',
  'front-desk': 'Front Desk Staff',
  'trainer': 'Trainer',
}

export function RoleSwitcher() {
  const { role, switchRole } = useAuth()

  return (
    <Select value={role} onValueChange={(value) => switchRole(value as UserRole)}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(roleLabels).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
