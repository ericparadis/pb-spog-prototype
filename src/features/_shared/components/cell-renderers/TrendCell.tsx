import { TrendingUp, TrendingDown } from 'lucide-react'

interface TrendCellProps {
  value: number
  trend?: 'up' | 'down' | 'flat'
}

export function TrendCell({ value, trend }: TrendCellProps) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-sm tabular-nums">{value}</span>
      {trend === 'up' && (
        <TrendingUp className="h-3.5 w-3.5 text-green-600" />
      )}
      {trend === 'down' && (
        <TrendingDown className="h-3.5 w-3.5 text-destructive" />
      )}
    </div>
  )
}
