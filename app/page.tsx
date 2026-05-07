"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Zap,
  BarChart3,
  TrendingUp,
  Users,
  Shield,
  ArrowRight,
  CheckCircle2,
  Star,
  Menu,
  X,
} from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Unified Analytics",
    description:
      "Track Instagram dan TikTok dalam satu dashboard. Tidak perlu buka banyak aplikasi.",
  },
  {
    icon: TrendingUp,
    title: "Real-time Insights",
    description:
      "Sinkronisasi langsung dari Meta Graph API dan TikTok API. Data selalu terbaru.",
  },
  {
    icon: Users,
    title: "Audience Demographics",
    description:
      "Pahami siapa yang engage dengan konten EV kamu — usia, gender, lokasi, dan lebih.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Token API dienkripsi saat disimpan. Kami tidak pernah menyimpan password media sosialmu.",
  },
]

const stats = [
  { value: "125K+", label: "Monthly Reach" },
  { value: "4.5%", label: "Avg. Engagement" },
  { value: "2", label: "Platforms Connected" },
  { value: "Rp 45M", label: "Est. Revenue Tracked" },
]

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Marketing Manager",
    company: "PT Strum Technology Asia",
    content:
      "Dashboard ini menghemat 3 jam kerja per minggu. Semua data marketing EV kami ada di satu tempat.",
    rating: 5,
  },
  {
    name: "Rina Kusuma",
    role: "Content Creator",
    company: "Strum.id",
    content:
      "Akhirnya bisa lihat performa konten TikTok dan Instagram sekaligus. Sangat membantu untuk optimasi konten.",
    rating: 5,
  },
]

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#stats", label: "Stats" },
  { href: "#testimonials", label: "Testimonials" },
]

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  )
}

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        {/* Capsule — morphs to rounded-2xl when dropdown is open */}
        <div
          className={`w-full max-w-3xl border border-border/60 bg-background/90 shadow-lg shadow-black/10 backdrop-blur-md transition-[border-radius] duration-300 dark:border-white/10 dark:bg-zinc-900/95 dark:shadow-black/40 ${
            mobileOpen ? "rounded-2xl" : "rounded-full"
          }`}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between gap-2 px-3 py-2">
            {/* Logo */}
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 font-semibold shrink-0 pl-1"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Zap className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold">Strum.id</span>
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-1 rounded-full bg-muted/50 px-1.5 py-1 dark:bg-white/5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground hover:shadow-sm dark:hover:bg-white/10 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1.5">
              <ThemeToggle />

              {/* Desktop CTA */}
              <div className="hidden md:flex items-center gap-1.5">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="rounded-full h-8 px-4 text-xs">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="rounded-full h-8 px-4 text-xs gap-1.5">
                    Get Started
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>

              {/* Mobile toggle — hamburger ↔ X */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted dark:hover:bg-white/10"
                aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
              >
                <Menu
                  className={`h-4 w-4 absolute transition-all duration-200 ${
                    mobileOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                  }`}
                />
                <X
                  className={`h-4 w-4 absolute transition-all duration-200 ${
                    mobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Mobile dropdown — expands from capsule */}
          {/*
            grid-rows trick: animating grid-template-rows from 0fr → 1fr
            is smoother than max-height because the browser knows the exact
            target size. The inner div needs min-h-0 to collapse properly.
          */}
          <div
            className="md:hidden grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ gridTemplateRows: mobileOpen ? "1fr" : "0fr" }}
          >
            <div className="min-h-0 overflow-hidden">
              <div
                className={`border-t border-border/40 px-3 pb-4 pt-2 dark:border-white/10 transition-opacity duration-200 ${
                  mobileOpen ? "opacity-100 delay-100" : "opacity-0"
                }`}
              >
                {/* Nav links — staggered fade-in */}
                <nav className="flex flex-col gap-0.5 mb-3">
                  {navLinks.map((link, i) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        transitionDelay: mobileOpen ? `${120 + i * 40}ms` : "0ms",
                      }}
                      className={`rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground dark:hover:bg-white/10 dark:hover:text-white ${
                        mobileOpen
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 -translate-y-1"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* CTA buttons — staggered after nav links */}
                <div className="flex flex-col gap-2 pt-2 border-t border-border/40 dark:border-white/10">
                  {[
                    { href: "/login", label: "Sign In", variant: "outline" as const, delay: 240 },
                    { href: "/register", label: "Get Started", variant: "default" as const, delay: 280 },
                  ].map(({ href, label, variant, delay }) => (
                    <div
                      key={href}
                      style={{ transitionDelay: mobileOpen ? `${delay}ms` : "0ms" }}
                      className={`transition-all duration-200 ${
                        mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                      }`}
                    >
                      <Link href={href} onClick={() => setMobileOpen(false)}>
                        <Button variant={variant} className="w-full rounded-xl h-9 text-sm gap-2">
                          {label}
                          {variant === "default" && <ArrowRight className="h-3.5 w-3.5" />}
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-28">
        <Container className="text-center">
          <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs sm:text-sm">
            <Zap className="mr-1.5 h-3 w-3 text-primary" />
            Built for EV Conversion Startups
          </Badge>

          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Social Media Analytics
            <span className="text-primary"> Khusus untuk </span>
            Bisnis EV Kamu
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:mt-6 sm:text-lg">
            Pantau performa Instagram dan TikTok PT Strum Technology Asia dalam satu
            dashboard yang bersih. Dari reach hingga estimasi revenue — semua ada di sini.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full rounded-xl px-8 sm:w-auto">
                Mulai Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full rounded-xl px-8 sm:w-auto">
                Masuk ke Dashboard
              </Button>
            </Link>
          </div>

          {/* Hero visual — mock dashboard */}
          <div className="mt-12 overflow-hidden rounded-2xl border bg-muted/30 shadow-2xl sm:mt-16">
            <div className="flex items-center gap-2 border-b bg-background/60 px-4 py-3">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-muted-foreground">strum.id/dashboard</span>
            </div>
            <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4 sm:gap-4 sm:p-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border bg-background p-3 text-left shadow-sm sm:p-4"
                >
                  <p className="text-lg font-bold sm:text-2xl">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mx-4 mb-4 overflow-hidden rounded-xl border bg-background shadow-sm sm:mx-6 sm:mb-6">
              <div className="flex items-end gap-1 px-4 pb-4 pt-6 sm:gap-2 sm:px-8">
                {[40, 65, 45, 80, 60, 90, 70, 85, 75, 95, 80, 100].map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-0.5">
                    <div className="w-full rounded-t-sm bg-primary/70" style={{ height: `${h * 0.7}px` }} />
                    <div className="w-full rounded-t-sm bg-cyan-400/70" style={{ height: `${h * 0.5}px` }} />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 border-t px-4 py-2 sm:px-8">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-sm bg-primary/70" /> Instagram
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-sm bg-cyan-400/70" /> TikTok
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────────────── */}
      <section id="stats" className="border-y bg-muted/30">
        <Container className="py-12 sm:py-16">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Features ───────────────────────────────────────────────────── */}
      <section id="features" className="py-16 sm:py-24">
        <Container>
          <div className="text-center">
            <Badge variant="outline" className="mb-4 rounded-full">Features</Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Semua yang kamu butuhkan
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">
              Dirancang khusus untuk tim marketing EV yang ingin data-driven.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="rounded-xl">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                    <feature.icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Platform section ───────────────────────────────────────────── */}
      <section className="border-y bg-muted/30">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
            <div>
              <Badge variant="outline" className="mb-4 rounded-full">Platform</Badge>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Koneksi langsung ke API resmi
              </h2>
              <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                Data diambil langsung dari Meta Graph API dan TikTok Business API.
                Tidak ada scraping, tidak ada data palsu.
              </p>
              <ul className="mt-6 space-y-3 sm:mt-8">
                {[
                  "Instagram Insights via Meta Graph API",
                  "TikTok Analytics via TikTok Business API",
                  "Auto-refresh data setiap 24 jam",
                  "Historical data hingga 90 hari",
                  "Export laporan ke PDF / CSV",
                  "Multi-account support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <Card className="rounded-xl">
                <CardContent className="pt-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E4405F]/10">
                      <span className="text-sm font-bold text-[#E4405F]">IG</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">Instagram</p>
                      <p className="text-xs text-muted-foreground">Meta Graph API v18</p>
                    </div>
                    <Badge className="ml-auto shrink-0" variant="outline">Connected</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                    {[["72K", "Reach"], ["4.2%", "Engagement"], ["680", "Clicks"]].map(([val, lbl]) => (
                      <div key={lbl} className="rounded-lg bg-muted p-2.5 sm:p-3">
                        <p className="text-base font-bold sm:text-lg">{val}</p>
                        <p className="text-xs text-muted-foreground">{lbl}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-xl">
                <CardContent className="pt-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#00F2EA]/10">
                      <span className="text-sm font-bold text-[#00F2EA]">TT</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">TikTok</p>
                      <p className="text-xs text-muted-foreground">TikTok Business API v2</p>
                    </div>
                    <Badge className="ml-auto shrink-0" variant="outline">Connected</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                    {[["53K", "Reach"], ["5.1%", "Engagement"], ["520", "Clicks"]].map(([val, lbl]) => (
                      <div key={lbl} className="rounded-lg bg-muted p-2.5 sm:p-3">
                        <p className="text-base font-bold sm:text-lg">{val}</p>
                        <p className="text-xs text-muted-foreground">{lbl}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────── */}
      <section id="testimonials" className="py-16 sm:py-24">
        <Container>
          <div className="text-center">
            <Badge variant="outline" className="mb-4 rounded-full">Testimonials</Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Dipercaya tim Strum.id
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <Card key={t.name} className="rounded-xl">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {t.name[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {t.role} · {t.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="border-t bg-muted/30">
        <Container className="py-16 text-center sm:py-24">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Siap mulai tracking performa EV kamu?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
            Daftar sekarang dan hubungkan akun Instagram & TikTok kamu dalam 2 menit.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full rounded-xl px-10 sm:w-auto">
                Daftar Sekarang — Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t">
        <Container className="py-8">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
                <Zap className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">Strum.id</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2026 PT Strum Technology Asia. All rights reserved.
            </p>
            <div className="flex gap-5 text-xs text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
        </Container>
      </footer>

    </div>
  )
}
