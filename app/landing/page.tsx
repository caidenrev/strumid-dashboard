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
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

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

// Reusable container — consistent horizontal padding across all breakpoints
function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <Container className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/landing" className="flex items-center gap-2 font-semibold shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-5 w-5" />
            </div>
            <span className="text-lg">Strum.id</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="outline" size="sm" className="rounded-lg">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="rounded-lg">
                Get Started
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-lg">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 pt-10">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-6 flex flex-col gap-3 border-t pt-6">
                  <Link href="/login">
                    <Button variant="outline" className="w-full rounded-lg">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full rounded-lg">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </Container>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28">
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
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b bg-background/60 px-4 py-3">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-muted-foreground">strum.id/dashboard</span>
            </div>

            {/* KPI mini cards */}
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

            {/* Mock bar chart */}
            <div className="mx-4 mb-4 overflow-hidden rounded-xl border bg-background shadow-sm sm:mx-6 sm:mb-6">
              <div className="flex items-end gap-1 px-4 pb-4 pt-6 sm:gap-2 sm:px-8">
                {[40, 65, 45, 80, 60, 90, 70, 85, 75, 95, 80, 100].map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-0.5">
                    <div
                      className="w-full rounded-t-sm bg-primary/70"
                      style={{ height: `${h * 0.7}px` }}
                    />
                    <div
                      className="w-full rounded-t-sm bg-cyan-400/70"
                      style={{ height: `${h * 0.5}px` }}
                    />
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
            {/* Left: text */}
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

            {/* Right: platform cards */}
            <div className="flex flex-col gap-4">
              {/* Instagram card */}
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

              {/* TikTok card */}
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
