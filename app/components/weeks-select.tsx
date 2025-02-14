import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WeeksSelectProps {
  weeks: string
  onSelectWeeks: (weeks: string) => void
}

export function WeeksSelect({ weeks, onSelectWeeks }: WeeksSelectProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Number of Weeks</label>
      <Select value={weeks} onValueChange={onSelectWeeks}>
        <SelectTrigger>
          <SelectValue placeholder="Select weeks" />
        </SelectTrigger>
        <SelectContent>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <SelectItem key={num} value={num.toString()}>
              {num} {num === 1 ? "week" : "weeks"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

