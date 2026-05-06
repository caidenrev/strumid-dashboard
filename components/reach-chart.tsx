"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"
import { reachTrendData } from "@/lib/mock-data"
import { format } from "date-fns"

export function ReachChart() {
  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>Reach & Impressions Trend</CardTitle>
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
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => format(new Date(value), "MMM dd")}
              className="text-xs"
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              className="text-xs"
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              labelFormatter={(value) => format(new Date(value), "MMM dd, yyyy")}
            />
            <Legend />
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
