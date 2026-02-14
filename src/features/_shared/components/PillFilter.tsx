import { cn } from '@/lib/utils'

export interface PillFilterOption<T extends string = string> {
  label: string
  value: T
  count?: number
}

interface PillFilterProps<T extends string = string> {
  options: PillFilterOption<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
}

export function PillFilter<T extends string = string>({
  options,
  value,
  onChange,
  className,
}: PillFilterProps<T>) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-lg bg-muted p-1',
        className
      )}
    >
      {options.map((option) => {
        const isActive = option.value === value
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              'px-4 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap',
              isActive
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {option.label}
            {option.count !== undefined && (
              <span
                className={cn(
                  'ml-1.5 text-xs',
                  isActive ? 'text-muted-foreground' : 'text-muted-foreground/60'
                )}
              >
                {option.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
