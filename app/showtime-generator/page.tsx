"use client"
import ShowtimeGenerator from "../components/showtime-generator"
import { AuthenticatedLayout } from "../layouts/authenticated-layout"

export default function ShowtimeGeneratorPage() {
  return (
    <AuthenticatedLayout>
      <h1 className="text-2xl font-bold mb-6">Generate Showtimes</h1>
      <ShowtimeGenerator />
    </AuthenticatedLayout>
  )
}

