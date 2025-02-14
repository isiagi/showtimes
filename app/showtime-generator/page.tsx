"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/auth-context"
import ShowtimeGenerator from "../components/showtime-generator"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ShowtimeGeneratorPage() {
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

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Movie Showtime Scheduler</h1>
        <div className="space-x-2">
          <Link href="/showtimes">
            <Button variant="outline">View Showtimes</Button>
          </Link>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      <ShowtimeGenerator />
    </div>
  )
}

