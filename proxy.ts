import { auth } from "@/auth"
import { NextResponse } from "next/server"

// Routes that require authentication
const protectedRoutes = ["/", "/instagram", "/tiktok", "/audience", "/settings"]

// Routes only for unauthenticated users
const authRoutes = ["/login", "/register"]

// Fully public routes (no redirect either way)
const publicRoutes = ["/landing"]

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isProtectedRoute = protectedRoutes.some(
    (route) => nextUrl.pathname === route || nextUrl.pathname.startsWith(route + "/")
  )
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isPublicRoute = publicRoutes.some((route) => nextUrl.pathname.startsWith(route))

  // Allow public routes through unconditionally
  if (isPublicRoute) return NextResponse.next()

  // Redirect unauthenticated users away from protected routes
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/landing", nextUrl))
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
}
