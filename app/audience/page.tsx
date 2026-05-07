import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function AudiencePage() {
  return (
    <DashboardLayout>
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
          <div className="flex h-[300px] md:h-[400px] items-center justify-center text-muted-foreground">
            Audience insights and demographics will be displayed here
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
