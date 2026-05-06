import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface KPICardProps {
  title: string
  value: string
  trend: number
  icon: LucideIcon
  format?: "number" | "percentage" | "currency"
}

export function KPICard({ title, value, trend, icon: Icon, format = "number" }: KPICardProps) {
  const isPositive = trend >= 0

  return (
    <Card className="rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="rounded-lg bg-primary/10 p-2">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 text-xs">
          {isPositive ? (
            <ArrowUpIcon className="h-3 w-3 text-green-600" />
          ) : (
            <ArrowDownIcon className="h-3 w-3 text-red-600" />
          )}
          <span
            className={cn(
              "font-medium",
              isPositive ? "text-green-600" : "text-red-600"
            )}
          >
            {Math.abs(trend)}%
          </span>
          <span className="text-muted-foreground">from last month</span>
        </div>
      </CardContent>
    </Card>
  )
}
