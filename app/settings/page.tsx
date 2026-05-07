import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings } from "lucide-react"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <Card className="rounded-xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6" />
            <CardTitle>Settings</CardTitle>
          </div>
          <CardDescription>
            Configure your dashboard preferences and integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] md:h-[400px] items-center justify-center text-muted-foreground">
            Settings and configuration options will be displayed here
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
