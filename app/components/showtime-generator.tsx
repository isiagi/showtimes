"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock } from "lucide-react"
import { format } from "date-fns"
import { MovieSelect } from "./movie-select"
import { DateSelect } from "./date-select"
import { WeeksSelect } from "./weeks-select"
import { TimeSelect } from "./time-select"

export default function ShowtimeGenerator() {
  const [selectedMovie, setSelectedMovie] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [weeks, setWeeks] = useState("2")
  const [selectedTimes, setSelectedTimes] = useState<string[]>([])
  const [previewDates, setPreviewDates] = useState<{ date: string; times: string[] }[]>([])

  // Generate preview dates when inputs change
  useEffect(() => {
    if (startDate) {
      const dates: { date: string; times: string[] }[] = []
      const numWeeks = Number.parseInt(weeks)
      const numDays = numWeeks * 7

      for (let i = 0; i < numDays; i++) {
        const currentDate = new Date(startDate)
        currentDate.setDate(startDate.getDate() + i)
        dates.push({
          date: format(currentDate, "MMM dd, yyyy"),
          times: selectedTimes,
        })
      }

      setPreviewDates(dates)
    }
  }, [startDate, weeks, selectedTimes])

  const handleAddTime = (time: string) => {
    setSelectedTimes([...selectedTimes, time].sort())
  }

  const handleRemoveTime = (timeToRemove: string) => {
    setSelectedTimes(selectedTimes.filter((time) => time !== timeToRemove))
  }

  const handleGenerateSchedule = async () => {
    if (startDate && selectedMovie) {
      try {
        const response = await fetch("/api/showings/generate-schedule/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movie_id: selectedMovie,
            start_date: format(startDate, "yyyy-MM-dd"),
            daily_times: selectedTimes,
            weeks: Number.parseInt(weeks),
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to generate schedule")
        }

        const result = await response.json()
        console.log("Schedule generated:", result)
        // You can add logic here to display a success message or update the UI
      } catch (error) {
        console.error("Error generating schedule:", error)
        // You can add logic here to display an error message
      }
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Input Card */}
      <Card>
        <CardHeader>
          <CardTitle>Schedule Details</CardTitle>
          <CardDescription>Set up your movie screening schedule</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <MovieSelect selectedMovie={selectedMovie} onSelectMovie={setSelectedMovie} />
          <DateSelect startDate={startDate} onSelectDate={setStartDate} />
          <WeeksSelect weeks={weeks} onSelectWeeks={setWeeks} />
          <TimeSelect selectedTimes={selectedTimes} onAddTime={handleAddTime} onRemoveTime={handleRemoveTime} />
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleGenerateSchedule}
            className="w-full"
            disabled={!startDate || selectedTimes.length === 0 || !selectedMovie}
          >
            Generate Schedule
          </Button>
        </CardFooter>
      </Card>

      {/* Preview Card */}
      <Card className="order-first md:order-last">
        <CardHeader>
          <CardTitle>Schedule Preview</CardTitle>
          <CardDescription>
            {previewDates.length} days, {selectedTimes.length} shows per day
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] md:h-[500px] pr-4">
            <div className="space-y-4">
              {previewDates.map((date, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-medium text-muted-foreground">{date.date}</h3>
                  <div className="flex flex-wrap gap-2">
                    {date.times.map((time) => (
                      <Badge key={time} variant="outline" className="gap-1">
                        <Clock className="h-3 w-3" />
                        {time}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

