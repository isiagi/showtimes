"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { generateSchedule } from "../actions"

export function ScheduleForm() {
  const [movieId, setMovieId] = useState("")
  const [startDate, setStartDate] = useState("")
  const [dailyTimes, setDailyTimes] = useState("")
  const [weeks, setWeeks] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await generateSchedule({
        movie_id: movieId,
        start_date: startDate,
        daily_times: dailyTimes.split(",").map((time) => time.trim()),
        weeks: Number.parseInt(weeks),
      })
      console.log("Schedule generated:", result)
      // You can add a success message or update the UI here
    } catch (error) {
      console.error("Error generating schedule:", error)
      // You can add an error message here
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="movie-id">Movie ID</Label>
        <Input id="movie-id" value={movieId} onChange={(e) => setMovieId(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="start-date">Start Date</Label>
        <Input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="daily-times">Daily Times (comma-separated)</Label>
        <Input
          id="daily-times"
          value={dailyTimes}
          onChange={(e) => setDailyTimes(e.target.value)}
          placeholder="14:00, 17:00, 20:00"
          required
        />
      </div>
      <div>
        <Label htmlFor="weeks">Number of Weeks</Label>
        <Input id="weeks" type="number" value={weeks} onChange={(e) => setWeeks(e.target.value)} required />
      </div>
      <Button type="submit">Generate Schedule</Button>
    </form>
  )
}

