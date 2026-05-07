"use client"

import { useState, useEffect, useCallback } from "react"
import { History, Video, LayoutTemplate, Trash2, ExternalLink, Loader2, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { VideoBriefTable } from "@/components/video-brief-table"
import { SlideBriefTable } from "@/components/slide-brief-table"
import { BriefNotesEditor } from "@/components/brief-notes-editor"
import { formatDistanceToNow } from "date-fns"
import { id as localeId } from "date-fns/locale"

interface BriefSummary {
  id: string
  title: string
  topic: string
  platform: string
  contentType: "VIDEO" | "SLIDE"
  notes: string | null
  createdAt: string
}

interface BriefDetail extends BriefSummary {
  result: unknown
}

interface VideoRow {
  segment: string
  duration: string
  script: string
  visualConcept: string
  notes: string
}

interface SlideRow {
  slideNumber: string
  title: string
  content: string
  visualConcept: string
  notes: string
}

type BriefResult =
  | { type: "VIDEO"; rows: VideoRow[] }
  | { type: "SLIDE"; rows: SlideRow[] }

export function ContentBriefHistory() {
  const [briefs, setBriefs] = useState<BriefSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [expandedDetail, setExpandedDetail] = useState<BriefDetail | null>(null)
  const [expandedNotes, setExpandedNotes] = useState("")
  const [isLoadingDetail, setIsLoadingDetail] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchBriefs = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/content-brief")
      const data = await res.json()
      setBriefs(data.briefs ?? [])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBriefs()
  }, [fetchBriefs])

  async function handleExpand(id: string) {
    if (expandedId === id) {
      setExpandedId(null)
      setExpandedDetail(null)
      return
    }
    setExpandedId(id)
    setIsLoadingDetail(true)
    try {
      const res = await fetch(`/api/content-brief/${id}`)
      const data = await res.json()
      setExpandedDetail(data.brief)
      setExpandedNotes(data.brief.notes ?? "")
    } finally {
      setIsLoadingDetail(false)
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id)
    try {
      await fetch(`/api/content-brief/${id}`, { method: "DELETE" })
      setBriefs((prev) => prev.filter((b) => b.id !== id))
      if (expandedId === id) {
        setExpandedId(null)
        setExpandedDetail(null)
      }
    } finally {
      setDeletingId(null)
    }
  }

  const platformLabel: Record<string, string> = {
    instagram: "Instagram",
    tiktok: "TikTok",
    youtube: "YouTube Shorts",
    youtube_long: "YouTube",
  }

  return (
    <Card className="rounded-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base">Riwayat Generate</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={fetchBriefs} className="gap-2">
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : briefs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <History className="h-10 w-10 text-muted-foreground/40 mb-3" />
            <p className="text-sm text-muted-foreground">Belum ada riwayat generate.</p>
            <p className="text-xs text-muted-foreground mt-1">
              Generate dan simpan brief pertamamu di tab Generator.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {briefs.map((brief) => (
              <div key={brief.id} className="rounded-lg border overflow-hidden">
                {/* Row header */}
                <div className="flex items-center justify-between px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors">
                  <button
                    className="flex-1 flex items-start gap-3 text-left"
                    onClick={() => handleExpand(brief.id)}
                  >
                    <div className="mt-0.5">
                      {brief.contentType === "VIDEO" ? (
                        <Video className="h-4 w-4 text-violet-500" />
                      ) : (
                        <LayoutTemplate className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{brief.title}</p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {brief.topic}
                      </p>
                    </div>
                  </button>
                  <div className="flex items-center gap-2 ml-3 shrink-0">
                    <Badge variant="secondary" className="text-xs">
                      {platformLabel[brief.platform] ?? brief.platform}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        brief.contentType === "VIDEO"
                          ? "border-violet-300 text-violet-600"
                          : "border-blue-300 text-blue-600"
                      }`}
                    >
                      {brief.contentType === "VIDEO" ? "Video" : "Slide"}
                    </Badge>
                    <span className="text-xs text-muted-foreground hidden sm:block">
                      {formatDistanceToNow(new Date(brief.createdAt), {
                        addSuffix: true,
                        locale: localeId,
                      })}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-foreground"
                      onClick={() => handleExpand(brief.id)}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(brief.id)}
                      disabled={deletingId === brief.id}
                    >
                      {deletingId === brief.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Expanded detail */}
                {expandedId === brief.id && (
                  <div className="p-4 space-y-4 border-t">
                    {isLoadingDetail ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                      </div>
                    ) : expandedDetail ? (
                      <>
                        {expandedDetail.contentType === "VIDEO" ? (
                          <VideoBriefTable
                            rows={
                              (expandedDetail.result as BriefResult & { type: "VIDEO" })
                                ?.rows ?? []
                            }
                          />
                        ) : (
                          <SlideBriefTable
                            rows={
                              (expandedDetail.result as BriefResult & { type: "SLIDE" })
                                ?.rows ?? []
                            }
                          />
                        )}
                        <BriefNotesEditor
                          notes={expandedNotes}
                          onChange={setExpandedNotes}
                          briefId={brief.id}
                        />
                      </>
                    ) : null}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
