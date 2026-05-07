"use client"

import { useState } from "react"
import { CalendarIcon, Download, Filter, Menu } from "lucide-react"
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
  /** Called when the hamburger button is tapped on mobile */
  onMenuClick?: () => void
}

export function DashboardHeader({ userName, userEmail, onMenuClick }: DashboardHeaderProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2026, 3, 4),
    to: new Date(2026, 4, 3),
  })
  const [platform, setPlatform] = useState<string>("all")

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6 shrink-0">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Buka menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <h1 className="text-base md:text-xl font-semibold truncate">
          Dashboard Overview
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Date Range Picker — hidden on small screens */}
        <div className="hidden lg:block">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[260px] justify-start text-left font-normal rounded-lg",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} –{" "}
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
        </div>

        {/* Date icon only — small screens */}
        <div className="lg:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-lg h-9 w-9">
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={1}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Platform Filter — hidden on mobile */}
        <div className="hidden sm:block">
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="w-[140px] rounded-lg">
              <Filter className="mr-2 h-4 w-4 shrink-0" />
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Export — icon only on mobile */}
        <Button className="rounded-lg hidden sm:flex gap-2">
          <Download className="h-4 w-4" />
          <span className="hidden md:inline">Export Report</span>
        </Button>
        <Button size="icon" className="rounded-lg sm:hidden h-9 w-9">
          <Download className="h-4 w-4" />
        </Button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Menu */}
        <UserMenu name={userName} email={userEmail} />
      </div>
    </header>
  )
}
