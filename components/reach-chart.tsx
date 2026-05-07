"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts"
import { reachTrendData } from "@/lib/mock-data"
import { format } from "date-fns"

export function ReachChart() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"

  const tickColor     = isDark ? "#a1a1aa" : "#71717a"
  const gridColor     = isDark ? "#3f3f46" : "#e4e4e7"
  const axisColor     = isDark ? "#52525b" : "#d4d4d8"
  const tooltipBg     = isDark ? "#18181b" : "#ffffff"
  const tooltipBorder = isDark ? "#3f3f46" : "#e4e4e7"
  const legendColor   = isDark ? "#e4e4e7" : "#18181b"

  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>Reach &amp; Impressions Trend</CardTitle>
        <CardDescription>
          Comparing Instagram and TikTok performance over the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            data={reachTrendData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorInstagram" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E4405F" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#E4405F" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTiktok" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00F2EA" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00F2EA" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => format(new Date(value), "MMM dd")}
              stroke={axisColor}
              tick={{ fill: tickColor, fontSize: 12 }}
              tickLine={{ stroke: axisColor }}
            />
            <YAxis
              stroke={axisColor}
              tick={{ fill: tickColor, fontSize: 12 }}
              tickLine={{ stroke: axisColor }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: "8px",
                color: legendColor,
              }}
              labelStyle={{ color: legendColor }}
              labelFormatter={(value) => format(new Date(value), "MMM dd, yyyy")}
              cursor={{ stroke: isDark ? "#52525b" : "#d4d4d8", strokeWidth: 1 }}
            />
            <Legend
              wrapperStyle={{ color: legendColor, fontSize: 13 }}
            />
            <Area
              type="monotone"
              dataKey="instagram"
              stroke="#E4405F"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorInstagram)"
              name="Instagram"
            />
            <Area
              type="monotone"
              dataKey="tiktok"
              stroke="#00F2EA"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTiktok)"
              name="TikTok"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
