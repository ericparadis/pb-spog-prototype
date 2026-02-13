import { cn } from '@/lib/utils'

interface AlertPillProps {
  type: string
  label: string
}

const alertStyles: Record<string, string> = {
  'new-join': 'text-green-700 bg-green-50',
  'no-hrm': 'text-red-700 bg-red-50',
  'low-utilization': 'text-amber-700 bg-amber-50',
  'milestone': 'text-blue-700 bg-blue-50',
  'anniversary': 'text-orange-700 bg-orange-50',
  'freeze': 'text-sky-700 bg-sky-50',
}

export function AlertPill({ type, label }: AlertPillProps) {
  const style = alertStyles[type] || 'text-muted-foreground bg-muted'
  return (
    <span
      className={cn(
        'inline-block text-xs font-medium px-2 py-0.5 rounded-full truncate max-w-[100px]',
        style
      )}
      title={label}
    >
      {label}
    </span>
  )
}
