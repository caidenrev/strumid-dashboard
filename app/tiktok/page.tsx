import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Video } from "lucide-react"

export default function TikTokPage() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
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
              <div className="flex h-[400px] items-center justify-center text-muted-foreground">
                TikTok-specific analytics will be displayed here
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
