import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { z } from "zod"

const saveSchema = z.object({
  title: z.string().min(1),
  topic: z.string().min(1),
  platform: z.string().min(1),
  contentType: z.enum(["VIDEO", "SLIDE"]),
  prompt: z.string().min(1),
  result: z.unknown(),
  notes: z.string().optional(),
})

// GET — list all briefs for the current user
export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const briefs = await db.contentBrief.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      topic: true,
      platform: true,
      contentType: true,
      notes: true,
      createdAt: true,
    },
  })

  return NextResponse.json({ briefs })
}

// POST — save a new brief
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const parsed = saveSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { title, topic, platform, contentType, prompt, result, notes } =
    parsed.data

  const brief = await db.contentBrief.create({
    data: {
      userId: session.user.id,
      title,
      topic,
      platform,
      contentType,
      prompt,
      result: result as object,
      notes,
    },
  })

  return NextResponse.json({ brief }, { status: 201 })
}
