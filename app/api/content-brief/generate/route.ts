import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { z } from "zod"

const generateSchema = z.object({
  title: z.string().min(1),
  topic: z.string().min(1),
  platform: z.string().min(1),
  contentType: z.enum(["VIDEO", "SLIDE"]),
  additionalContext: z.string().optional(),
})

// ─── Video brief row ──────────────────────────────────────────────────────────
interface VideoRow {
  segment: string
  duration: string
  script: string
  visualConcept: string
  notes: string
}

// ─── Slide brief row ──────────────────────────────────────────────────────────
interface SlideRow {
  slideNumber: string
  title: string
  content: string
  visualConcept: string
  notes: string
}

export type BriefResult =
  | { type: "VIDEO"; rows: VideoRow[] }
  | { type: "SLIDE"; rows: SlideRow[] }

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const parsed = generateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { title, topic, platform, contentType, additionalContext } = parsed.data

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured" },
      { status: 500 }
    )
  }

  const prompt = buildPrompt({ title, topic, platform, contentType, additionalContext })

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4096,
          },
        }),
      }
    )

    if (!geminiRes.ok) {
      const err = await geminiRes.text()
      console.error("Gemini API error:", err)
      return NextResponse.json(
        { error: "Failed to generate content from Gemini" },
        { status: 502 }
      )
    }

    const geminiData = await geminiRes.json()
    const rawText: string =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ?? ""

    const result = parseGeminiResponse(rawText, contentType)

    return NextResponse.json({ result, rawText })
  } catch (err) {
    console.error("Generate error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// ─── Prompt builder ───────────────────────────────────────────────────────────

function buildPrompt(params: {
  title: string
  topic: string
  platform: string
  contentType: "VIDEO" | "SLIDE"
  additionalContext?: string
}): string {
  const { title, topic, platform, contentType, additionalContext } = params
  const ctx = additionalContext ? `\nKonteks tambahan: ${additionalContext}` : ""

  if (contentType === "VIDEO") {
    return `Kamu adalah content strategist profesional untuk brand EV (Electric Vehicle) bernama Strum.id.
Buat brief konten VIDEO untuk platform ${platform} dengan detail berikut:
- Judul konten: ${title}
- Topik: ${topic}${ctx}

Hasilkan tabel brief video dalam format JSON array berikut (HANYA JSON, tanpa teks lain):
[
  {
    "segment": "Intro",
    "duration": "0:00 - 0:15",
    "script": "Naskah/dialog untuk segmen ini",
    "visualConcept": "Deskripsi visual, angle kamera, efek",
    "notes": "Catatan produksi tambahan"
  }
]

Buat 6-10 segmen yang logis (Intro, Hook, Konten Utama 1-N, CTA, Outro). Durasi total sekitar 60-90 detik untuk Reels/TikTok atau 3-5 menit untuk YouTube. Sesuaikan dengan platform ${platform}.
Pastikan naskah dalam Bahasa Indonesia yang natural dan engaging.`
  }

  return `Kamu adalah content strategist profesional untuk brand EV (Electric Vehicle) bernama Strum.id.
Buat brief konten SLIDE/POSTER untuk platform ${platform} dengan detail berikut:
- Judul konten: ${title}
- Topik: ${topic}${ctx}

Hasilkan tabel brief slide dalam format JSON array berikut (HANYA JSON, tanpa teks lain):
[
  {
    "slideNumber": "1",
    "title": "Judul slide",
    "content": "Teks/poin utama yang ditampilkan di slide ini",
    "visualConcept": "Deskripsi desain, warna, layout, elemen visual",
    "notes": "Catatan desainer tambahan"
  }
]

Buat 5-8 slide yang logis (Cover, Isi 1-N, CTA/Penutup). Sesuaikan dengan format carousel ${platform}.
Pastikan konten dalam Bahasa Indonesia yang singkat, padat, dan menarik.`
}

// ─── Response parser ──────────────────────────────────────────────────────────

function parseGeminiResponse(
  rawText: string,
  contentType: "VIDEO" | "SLIDE"
): BriefResult {
  // Strip markdown code fences if present
  const cleaned = rawText
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim()

  // Find the JSON array
  const start = cleaned.indexOf("[")
  const end = cleaned.lastIndexOf("]")

  if (start === -1 || end === -1) {
    // Return empty fallback
    if (contentType === "VIDEO") return { type: "VIDEO", rows: [] }
    return { type: "SLIDE", rows: [] }
  }

  try {
    const parsed = JSON.parse(cleaned.slice(start, end + 1))
    if (contentType === "VIDEO") {
      return { type: "VIDEO", rows: parsed as VideoRow[] }
    }
    return { type: "SLIDE", rows: parsed as SlideRow[] }
  } catch {
    if (contentType === "VIDEO") return { type: "VIDEO", rows: [] }
    return { type: "SLIDE", rows: [] }
  }
}
