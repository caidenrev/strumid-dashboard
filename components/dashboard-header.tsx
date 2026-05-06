"use client"

import { useState } from "react"
import { CalendarIcon, Download, Filter } from "lucide-react"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { cn } from "@/lib/utils"

interface DashboardHeaderProps {
  userName?: string | null
  userEmail?: string | null
}

export function DashboardHeader({ userName, userEmail }: DashboardHeaderProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2026, 3, 4), // April 4, 2026
    to: new Date(2026, 4, 3), // May 3, 2026
  })
  const [platform, setPlatform] = useState<string>("all")

  return (
    <div className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">Dashboard Overview</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Date Range Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[280px] justify-start text-left font-normal rounded-lg",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        {/* Platform Filter */}
        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger className="w-[160px] rounded-lg">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="tiktok">TikTok</SelectItem>
          </SelectContent>
        </Select>

        {/* Export Button */}
        <Button className="rounded-lg">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Menu */}
        <UserMenu name={userName} email={userEmail} />
      </div>
    </div>
  )
}
