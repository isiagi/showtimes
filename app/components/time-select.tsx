"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Clock, Plus, X } from "lucide-react"
import React from "react" // Import React

interface TimeSelectProps {
  selectedTimes: string[]
  onAddTime: (time: string) => void
  onRemoveTime: (time: string) => void
}

export function TimeSelect({ selectedTimes, onAddTime, onRemoveTime }: TimeSelectProps) {
  const [newTime, setNewTime] = React.useState("")

  const addTime = () => {
    if (newTime && !selectedTimes.includes(newTime)) {
      onAddTime(newTime)
      setNewTime("")
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Daily Showtimes</label>
      <div className="flex gap-2">
        <Select value={newTime} onValueChange={setNewTime}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 32 }, (_, i) => {
              const hour = Math.floor(i / 2) + 8 // Start from 8 AM
              const minute = i % 2 === 0 ? "00" : "30"
              const time = `${hour.toString().padStart(2, "0")}:${minute}`
              if (hour < 24 && !selectedTimes.includes(time)) {
                return (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                )
              }
              return null
            })}
          </SelectContent>
        </Select>
        <Button type="button" onClick={addTime} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 pt-2">
        {selectedTimes.map((time) => (
          <Badge key={time} variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            {time}
            <button onClick={() => onRemoveTime(time)} className="ml-1 rounded-full hover:bg-muted">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  )
}

