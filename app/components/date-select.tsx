import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

interface DateSelectProps {
  startDate: Date | undefined
  onSelectDate: (date: Date | undefined) => void
}

export function DateSelect({ startDate, onSelectDate }: DateSelectProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Start Date</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate ? format(startDate, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={startDate} onSelect={onSelectDate} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  )
}

