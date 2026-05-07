"use client"

import { useState, useEffect } from "react"
import { StickyNote, Save, Loader2, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface BriefNotesEditorProps {
  notes: string
  onChange: (value: string) => void
  /** If provided, saving will PATCH the brief in the database */
  briefId?: string | null
}

export function BriefNotesEditor({ notes, onChange, briefId }: BriefNotesEditorProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Reset saved indicator when notes change
  useEffect(() => {
    setSaved(false)
  }, [notes])

  async function handleSaveNotes() {
    if (!briefId) return
    setIsSaving(true)
    try {
      await fetch(`/api/content-brief/${briefId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      })
      setSaved(true)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card className="rounded-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StickyNote className="h-5 w-5 text-yellow-500" />
            <CardTitle className="text-base">Notes Konten</CardTitle>
          </div>
          {briefId && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleSaveNotes}
              disabled={isSaving || saved}
              className="gap-2"
            >
              {isSaving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : saved ? (
                <Check className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              {saved ? "Tersimpan" : "Simpan Notes"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <textarea
          className="w-full min-h-[140px] resize-y rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Tambahkan catatan untuk konten ini... (referensi, revisi, ide tambahan, dll.)"
          value={notes}
          onChange={(e) => onChange(e.target.value)}
        />
        {!briefId && (
          <p className="mt-1.5 text-xs text-muted-foreground">
            Simpan brief terlebih dahulu untuk menyimpan notes ke database.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
