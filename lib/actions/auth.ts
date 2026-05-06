"use server"

import { signIn, signOut } from "@/auth"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { AuthError } from "next-auth"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export type ActionResult = {
  success: boolean
  error?: string
}

export async function registerAction(
  formData: FormData
): Promise<ActionResult> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const parsed = registerSchema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors ? Object.values(parsed.error.flatten().fieldErrors).flat()[0] ?? "Validation error" : "Validation error" }
  }

  const { name, email, password } = parsed.data

  const existing = await db.user.findUnique({ where: { email } })
  if (existing) {
    return { success: false, error: "An account with this email already exists" }
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  await db.user.create({
    data: { name, email, password: hashedPassword },
  })

  // Auto sign-in after registration
  await signIn("credentials", { email, password, redirectTo: "/" })

  return { success: true }
}

export async function loginAction(
  formData: FormData
): Promise<ActionResult> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/",
    })
    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, error: "Invalid email or password" }
        default:
          return { success: false, error: "Something went wrong. Please try again." }
      }
    }
    throw error // re-throw redirect
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/landing" })
}
