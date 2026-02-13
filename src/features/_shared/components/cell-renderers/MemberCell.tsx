import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface MemberCellProps {
  name: string
  memberId: string
  photoUrl?: string
}

export function MemberCell({ name, memberId, photoUrl }: MemberCellProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-9 w-9">
        {photoUrl && <AvatarImage src={photoUrl} alt={name} />}
        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-xs text-muted-foreground">{memberId}</span>
      </div>
    </div>
  )
}
