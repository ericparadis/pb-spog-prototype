import { cn } from '@/lib/utils'

export interface PillFilterOption<T extends string = string> {
  label: string
  value: T
}

interface PillFilterProps<T extends string = string> {
  options: PillFilterOption<T>[]
  value: T
  onChange: (value: T) => void
}

export function PillFilter<T extends string = string>({
  options,
  value,
  onChange,
}: PillFilterProps<T>) {
  return (
    <div className="flex items-center gap-2">
      {options.map((option) => {
        const isActive = option.value === value
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap',
              isActive
                ? 'bg-foreground text-background'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
