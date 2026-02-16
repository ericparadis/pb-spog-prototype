import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

export interface TableCategoryOption<T extends string = string> {
  label: string
  value: T
  icon?: LucideIcon
}

interface TableCategorySelectorProps<T extends string = string> {
  options: TableCategoryOption<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
}

export function TableCategorySelector<T extends string = string>({
  options,
  value,
  onChange,
  className,
}: TableCategorySelectorProps<T>) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-muted p-1',
        className
      )}
    >
      {options.map((option) => {
        const isActive = option.value === value
        const Icon = option.icon
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap',
              isActive
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {Icon && <Icon className="h-4 w-4" />}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
