import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera } from "lucide-react"

export default function InstagramPage() {
  return (
    <DashboardLayout>
      <Card className="rounded-xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Camera className="h-6 w-6 text-[#E4405F]" />
            <CardTitle>Instagram Analytics</CardTitle>
          </div>
          <CardDescription>
            Detailed Instagram performance metrics and insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] md:h-[400px] items-center justify-center text-muted-foreground">
            Instagram-specific analytics will be displayed here
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
