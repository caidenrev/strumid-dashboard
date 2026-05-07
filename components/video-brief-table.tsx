"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface VideoRow {
  segment: string
  duration: string
  script: string
  visualConcept: string
  notes: string
}

interface VideoBriefTableProps {
  rows: VideoRow[]
}

const segmentColors: Record<string, string> = {
  intro: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  hook: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  cta: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  outro: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
}

function getSegmentColor(segment: string): string {
  const lower = segment.toLowerCase()
  for (const [key, cls] of Object.entries(segmentColors)) {
    if (lower.includes(key)) return cls
  }
  return "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
}

export function VideoBriefTable({ rows }: VideoBriefTableProps) {
  if (!rows.length) {
    return (
      <p className="text-center text-sm text-muted-foreground py-8">
        Tidak ada data. Coba generate ulang.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[120px] font-semibold">Segmen</TableHead>
            <TableHead className="w-[110px] font-semibold">Durasi</TableHead>
            <TableHead className="font-semibold">Naskah / Script</TableHead>
            <TableHead className="font-semibold">Konsep Visual</TableHead>
            <TableHead className="w-[180px] font-semibold">Catatan Produksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i} className="align-top">
              <TableCell>
                <Badge className={`${getSegmentColor(row.segment)} border-0 font-medium`}>
                  {row.segment}
                </Badge>
              </TableCell>
              <TableCell className="text-sm font-mono text-muted-foreground whitespace-nowrap">
                {row.duration}
              </TableCell>
              <TableCell className="text-sm leading-relaxed max-w-[280px]">
                {row.script}
              </TableCell>
              <TableCell className="text-sm leading-relaxed max-w-[220px] text-muted-foreground">
                {row.visualConcept}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {row.notes}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
