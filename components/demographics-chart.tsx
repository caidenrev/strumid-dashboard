"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts"
import { demographicData } from "@/lib/mock-data"

export function DemographicsChart() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch — only render theme-dependent values client-side
  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"

  // Colours that adapt to the active theme
  const tickColor    = isDark ? "#a1a1aa" : "#71717a"   // zinc-400 / zinc-500
  const gridColor    = isDark ? "#3f3f46" : "#e4e4e7"   // zinc-700 / zinc-200
  const axisColor    = isDark ? "#52525b" : "#d4d4d8"   // zinc-600 / zinc-300
  const tooltipBg    = isDark ? "#18181b" : "#ffffff"
  const tooltipBorder = isDark ? "#3f3f46" : "#e4e4e7"
  const legendColor  = isDark ? "#e4e4e7" : "#18181b"

  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>Audience Demographics</CardTitle>
        <CardDescription>
          Age distribution across Instagram and TikTok
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={demographicData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="category"
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
              cursor={{ fill: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)" }}
            />
            <Legend
              wrapperStyle={{ color: legendColor, fontSize: 13 }}
            />
            <Bar
              dataKey="instagram"
              fill="#E4405F"
              radius={[8, 8, 0, 0]}
              name="Instagram"
            />
            <Bar
              dataKey="tiktok"
              fill="#00F2EA"
              radius={[8, 8, 0, 0]}
              name="TikTok"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
