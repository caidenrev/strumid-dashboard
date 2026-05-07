"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { topPosts } from "@/lib/mock-data"
import { Camera, Video } from "lucide-react"
import { format } from "date-fns"

export function TopPostsTable() {
  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>Recent Top Performing Posts</CardTitle>
        <CardDescription>
          Your best content from the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 md:p-6 md:pt-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[52px] pl-4 md:pl-0">Post</TableHead>
                <TableHead className="w-[110px]">Platform</TableHead>
                <TableHead className="min-w-[160px]">Title</TableHead>
                <TableHead className="text-right">Reach</TableHead>
                <TableHead className="text-right hidden sm:table-cell">Engagement</TableHead>
                <TableHead className="text-right hidden sm:table-cell">Clicks</TableHead>
                <TableHead className="text-right pr-4 md:pr-0">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPosts.map((post) => (
                <TableRow
                  key={post.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="pl-4 md:pl-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-2xl">
                      {post.thumbnail}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="gap-1 whitespace-nowrap">
                      {post.platform === "instagram" ? (
                        <>
                          <Camera className="h-3 w-3" />
                          Instagram
                        </>
                      ) : (
                        <>
                          <Video className="h-3 w-3" />
                          TikTok
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell className="text-right">
                    {post.reach.toLocaleString("en-US")}
                  </TableCell>
                  <TableCell className="text-right hidden sm:table-cell">
                    <span className="font-medium text-green-600">
                      {post.engagement}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right hidden sm:table-cell">
                    {post.clicks.toLocaleString("en-US")}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground pr-4 md:pr-0">
                    {format(new Date(post.date), "MMM dd")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
