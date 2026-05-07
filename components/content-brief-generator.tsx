"use client"

import { useState } from "react"
import { Sparkles, Video, LayoutTemplate, Loader2, Save, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { VideoBriefTable } from "@/components/video-brief-table"
import { SlideBriefTable } from "@/components/slide-brief-table"
import { BriefNotesEditor } from "@/components/brief-notes-editor"

type ContentType = "VIDEO" | "SLIDE"

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

export function ContentBriefGenerator() {
  const [contentType, setContentType] = useState<ContentType>("VIDEO")
  const [title, setTitle] = useState("")
  const [topic, setTopic] = useState("")
  const [platform, setPlatform] = useState("instagram")
  const [additionalContext, setAdditionalContext] = useState("")
  const [notes, setNotes] = useState("")

  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [result, setResult] = useState<BriefResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [savedId, setSavedId] = useState<string | null>(null)

  async function handleGenerate() {
    if (!title.trim() || !topic.trim()) {
      setError("Judul dan topik wajib diisi.")
      return
    }
    setError(null)
    setResult(null)
    setSavedId(null)
    setIsGenerating(true)

    try {
      const res = await fetch("/api/content-brief/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, topic, platform, contentType, additionalContext }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Gagal generate brief.")
        return
      }
      setResult(data.result as BriefResult)
    } catch {
      setError("Terjadi kesalahan. Coba lagi.")
    } finally {
      setIsGenerating(false)
    }
  }

  async function handleSave() {
    if (!result) return
    setIsSaving(true)
    try {
      const res = await fetch("/api/content-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          topic,
          platform,
          contentType,
          prompt: `${title} | ${topic}`,
          result,
          notes,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setSavedId(data.brief.id)
      } else {
        setError(data.error ?? "Gagal menyimpan.")
      }
    } catch {
      setError("Gagal menyimpan brief.")
    } finally {
      setIsSaving(false)
    }
  }

  function handleReset() {
    setResult(null)
    setSavedId(null)
    setError(null)
    setNotes("")
  }

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <Card className="rounded-xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-500" />
            <CardTitle>Generate Content Brief</CardTitle>
          </div>
          <CardDescription>
            Isi detail konten, pilih tipe, lalu biarkan Gemini AI menyusun brief-nya.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Content Type Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => { setContentType("VIDEO"); setResult(null) }}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                contentType === "VIDEO"
                  ? "border-violet-500 bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
                  : "border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              <Video className="h-4 w-4" />
              Video
            </button>
            <button
              onClick={() => { setContentType("SLIDE"); setResult(null) }}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                contentType === "SLIDE"
                  ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  : "border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              <LayoutTemplate className="h-4 w-4" />
              Slide / Poster
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Judul Konten</label>
              <Input
                placeholder="Contoh: Konversi Motor Listrik Murah 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Platform</label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram Reels</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="youtube">YouTube Shorts</SelectItem>
                  <SelectItem value="youtube_long">YouTube (Long Form)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Topik / Deskripsi Singkat</label>
            <Input
              placeholder="Contoh: Cara konversi motor bebek ke listrik dengan budget 5 juta"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Konteks Tambahan{" "}
              <span className="text-muted-foreground font-normal">(opsional)</span>
            </label>
            <Input
              placeholder="Contoh: Target audiens anak muda 18-25 tahun, tone santai dan informatif"
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <div className="flex gap-2">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="gap-2"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {isGenerating ? "Generating..." : "Generate Brief"}
            </Button>
            {result && (
              <Button variant="outline" onClick={handleReset} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Result */}
      {result && (
        <>
          <Card className="rounded-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {result.type === "VIDEO" ? (
                    <Video className="h-5 w-5 text-violet-500" />
                  ) : (
                    <LayoutTemplate className="h-5 w-5 text-blue-500" />
                  )}
                  <CardTitle className="text-base">{title}</CardTitle>
                  <Badge variant="secondary" className="capitalize">
                    {platform}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={
                      result.type === "VIDEO"
                        ? "border-violet-300 text-violet-600"
                        : "border-blue-300 text-blue-600"
                    }
                  >
                    {result.type === "VIDEO" ? "Video" : "Slide"}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={isSaving || !!savedId}
                    className="gap-2"
                  >
                    {isSaving ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Save className="h-3.5 w-3.5" />
                    )}
                    {savedId ? "Tersimpan" : "Simpan Brief"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {result.type === "VIDEO" ? (
                <VideoBriefTable rows={result.rows} />
              ) : (
                <SlideBriefTable rows={result.rows} />
              )}
            </CardContent>
          </Card>

          {/* Notes */}
          <BriefNotesEditor
            notes={notes}
            onChange={setNotes}
            briefId={savedId}
          />
        </>
      )}
    </div>
  )
}
