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
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Post</TableHead>
              <TableHead className="w-[100px]">Platform</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Reach</TableHead>
              <TableHead className="text-right">Engagement</TableHead>
              <TableHead className="text-right">Clicks</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topPosts.map((post) => (
              <TableRow
                key={post.id}
                className="hover:bg-muted/50 transition-colors"
              >
                <TableCell>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-2xl">
                    {post.thumbnail}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="gap-1"
                  >
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
                <TableCell className="text-right">
                  <span className="font-medium text-green-600">
                    {post.engagement}%
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  {post.clicks.toLocaleString("en-US")}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {format(new Date(post.date), "MMM dd")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
