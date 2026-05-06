import { auth } from "@/auth"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { KPICard } from "@/components/kpi-card"
import { ReachChart } from "@/components/reach-chart"
import { DemographicsChart } from "@/components/demographics-chart"
import { TopPostsTable } from "@/components/top-posts-table"
import { kpiData } from "@/lib/mock-data"
import { TrendingUp, Users, MousePointerClick, DollarSign } from "lucide-react"

export default async function Home() {
  const session = await auth()

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader
          userName={session?.user?.name}
          userEmail={session?.user?.email}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <KPICard
                title="Total Reach"
                value={`${(kpiData.totalReach / 1000).toFixed(0)}K`}
                trend={kpiData.reachTrend}
                icon={TrendingUp}
              />
              <KPICard
                title="Avg. Engagement Rate"
                value={`${kpiData.avgEngagementRate}%`}
                trend={kpiData.engagementTrend}
                icon={Users}
              />
              <KPICard
                title="Profile/Link Clicks"
                value={kpiData.profileClicks.toLocaleString("en-US")}
                trend={kpiData.clicksTrend}
                icon={MousePointerClick}
              />
              <KPICard
                title="Est. Revenue from Leads"
                value={`Rp ${(kpiData.estRevenue / 1000000).toFixed(0)}M`}
                trend={kpiData.revenueTrend}
                icon={DollarSign}
              />
            </div>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
              <ReachChart />
              <DemographicsChart />
            </div>

            {/* Top Posts Table */}
            <TopPostsTable />
          </div>
        </main>
      </div>
    </div>
  )
}
