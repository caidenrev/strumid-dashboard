import { auth } from "@/auth"
import { DashboardLayout } from "@/components/dashboard-layout"
import { KPICard } from "@/components/kpi-card"
import { ReachChart } from "@/components/reach-chart"
import { DemographicsChart } from "@/components/demographics-chart"
import { TopPostsTable } from "@/components/top-posts-table"
import { kpiData } from "@/lib/mock-data"
import { TrendingUp, Users, MousePointerClick, DollarSign } from "lucide-react"

export default async function Home() {
  const session = await auth()

  return (
    <DashboardLayout
      userName={session?.user?.name}
      userEmail={session?.user?.email}
    >
      <div className="space-y-4 md:space-y-6">
        {/* KPI Cards */}
        <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Reach"
            value={`${(kpiData.totalReach / 1000).toFixed(0)}K`}
            trend={kpiData.reachTrend}
            icon={TrendingUp}
          />
          <KPICard
            title="Avg. Engagement"
            value={`${kpiData.avgEngagementRate}%`}
            trend={kpiData.engagementTrend}
            icon={Users}
          />
          <KPICard
            title="Profile Clicks"
            value={kpiData.profileClicks.toLocaleString("en-US")}
            trend={kpiData.clicksTrend}
            icon={MousePointerClick}
          />
          <KPICard
            title="Est. Revenue"
            value={`Rp ${(kpiData.estRevenue / 1000000).toFixed(0)}M`}
            trend={kpiData.revenueTrend}
            icon={DollarSign}
          />
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
          <ReachChart />
          <DemographicsChart />
        </div>

        {/* Top Posts Table */}
        <TopPostsTable />
      </div>
    </DashboardLayout>
  )
}
