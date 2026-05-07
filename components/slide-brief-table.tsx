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

interface SlideRow {
  slideNumber: string
  title: string
  content: string
  visualConcept: string
  notes: string
}

interface SlideBriefTableProps {
  rows: SlideRow[]
}

export function SlideBriefTable({ rows }: SlideBriefTableProps) {
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
            <TableHead className="w-[80px] font-semibold">Slide</TableHead>
            <TableHead className="w-[180px] font-semibold">Judul Slide</TableHead>
            <TableHead className="font-semibold">Konten / Teks</TableHead>
            <TableHead className="font-semibold">Konsep Visual & Desain</TableHead>
            <TableHead className="w-[180px] font-semibold">Catatan Desainer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => {
            const isFirst = i === 0
            const isLast = i === rows.length - 1
            return (
              <TableRow key={i} className="align-top">
                <TableCell>
                  <Badge
                    className={`border-0 font-semibold ${
                      isFirst
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        : isLast
                        ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {row.slideNumber}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm font-medium">
                  {row.title}
                </TableCell>
                <TableCell className="text-sm leading-relaxed max-w-[260px]">
                  {row.content}
                </TableCell>
                <TableCell className="text-sm leading-relaxed max-w-[220px] text-muted-foreground">
                  {row.visualConcept}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {row.notes}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
