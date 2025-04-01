"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./contexts/auth-context"
import { LoginForm } from "./components/login-form"

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/showtime-generator")
    }
  }, [user, router])

  if (user) {
    return null // or a loading spinner
  }

  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <LoginForm />
    </div>
  )
}

