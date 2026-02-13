import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface MembershipBadgeProps {
  tier: string
}

const tierStyles: Record<string, string> = {
  Elite: 'bg-foreground text-background border-transparent',
  Basic: 'bg-transparent text-muted-foreground border-border',
  Premier: 'bg-primary/15 text-primary border-primary/30',
  Premium: 'bg-primary/15 text-primary border-primary/30',
  Wellness: 'bg-accent text-accent-foreground border-transparent',
}

export function MembershipBadge({ tier }: MembershipBadgeProps) {
  const style = tierStyles[tier] || tierStyles['Basic']
  return (
    <Badge
      variant="outline"
      className={cn('text-xs font-medium px-2.5 py-0.5', style)}
    >
      {tier}
    </Badge>
  )
}
