import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function AudiencePage() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <Card className="rounded-xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6" />
                <CardTitle>Audience Insights</CardTitle>
              </div>
              <CardDescription>
                Detailed audience demographics and behavior analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] items-center justify-center text-muted-foreground">
                Audience insights and demographics will be displayed here
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
