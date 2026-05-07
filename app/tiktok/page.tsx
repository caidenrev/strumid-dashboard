import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Video } from "lucide-react"

export default function TikTokPage() {
  return (
    <DashboardLayout>
      <Card className="rounded-xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Video className="h-6 w-6 text-[#00F2EA]" />
            <CardTitle>TikTok Analytics</CardTitle>
          </div>
          <CardDescription>
            Detailed TikTok performance metrics and insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] md:h-[400px] items-center justify-center text-muted-foreground">
            TikTok-specific analytics will be displayed here
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
