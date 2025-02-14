"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/auth-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [user, router])

  if (!user) {
    return null // or a loading spinner
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}</h1>
      <div className="space-y-4">
        <Link href="/showtimes">
          <Button>View Showtimes</Button>
        </Link>
        <Link href="/showtime-generator">
          <Button>Generate Showtimes</Button>
        </Link>
        <Button
          variant="outline"
          onClick={() => {
            logout()
            router.push("/")
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  )
}

