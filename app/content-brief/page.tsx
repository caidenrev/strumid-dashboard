"use client"

import { useState } from "react"
import { Sparkles, History } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ContentBriefGenerator } from "@/components/content-brief-generator"
import { ContentBriefHistory } from "@/components/content-brief-history"

type Tab = "generator" | "history"

export default function ContentBriefPage() {
  const [activeTab, setActiveTab] = useState<Tab>("generator")

  return (
    <DashboardLayout>
      <div className="space-y-4 md:space-y-6">
        {/* Page Header */}
        <div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            Content Brief AI
          </h2>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Generate brief konten video atau slide otomatis dengan Gemini AI.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b">
          <button
            onClick={() => setActiveTab("generator")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "generator"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Generator
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "history"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <History className="h-4 w-4" />
            Riwayat
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "generator" ? (
          <ContentBriefGenerator />
        ) : (
          <ContentBriefHistory />
        )}
      </div>
    </DashboardLayout>
  )
}
