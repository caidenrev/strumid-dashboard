"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Camera,
  Video,
  Users,
  Settings,
  Zap,
  Sparkles,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Instagram Analytics", href: "/instagram", icon: Camera },
  { name: "TikTok Analytics", href: "/tiktok", icon: Video },
  { name: "Audience", href: "/audience", icon: Users },
  { name: "Content Brief AI", href: "/content-brief", icon: Sparkles },
  { name: "Settings", href: "/settings", icon: Settings },
]

interface DashboardSidebarProps {
  /** Mobile: whether the drawer is open */
  isOpen?: boolean
  /** Mobile: callback to close the drawer */
  onClose?: () => void
}

export function DashboardSidebar({ isOpen = false, onClose }: DashboardSidebarProps) {
  const pathname = usePathname()

  const sidebarContent = (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      {/* Logo row */}
      <div className="flex h-16 items-center justify-between border-b px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold"
          onClick={onClose}
        >
          <span className="text-lg">STRUM ID</span>
        </Link>

        {/* Close button — only visible on mobile */}
        <button
          onClick={onClose}
          className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Tutup menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="rounded-lg bg-muted p-3">
          <p className="text-xs font-medium">PT Strum Technology Asia</p>
          <p className="text-xs text-muted-foreground">EV Conversion Startup</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* ── Desktop: always visible static sidebar ── */}
      <aside className="hidden md:flex h-full shrink-0">
        {sidebarContent}
      </aside>

      {/* ── Mobile: slide-in drawer with backdrop ── */}
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-full transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
