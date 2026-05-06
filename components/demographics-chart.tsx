"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"
import { demographicData } from "@/lib/mock-data"

export function DemographicsChart() {
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
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="category"
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
            />
            <Legend />
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
