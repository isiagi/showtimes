"use client";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Trash2 } from "lucide-react";

interface Showtime {
  id: string;
  movieId: string;
  movieTitle: string;
  date: string;
  time: string;
  movie_title: string;
}

interface ShowtimeListProps {
  showtimes: Showtime[];
  onDelete: (id: string) => void;
  loading: boolean;
}

export function ShowtimeList({
  showtimes,
  onDelete,
  loading,
}: ShowtimeListProps) {
  const groupedShowtimes = showtimes.reduce((acc, showtime) => {
    const date = showtime.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(showtime);
    return acc;
  }, {} as Record<string, Showtime[]>);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scheduled Showtimes</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <p>Loading...</p>}
        <ScrollArea className="h-[600px] pr-4">
          {Object.entries(groupedShowtimes).map(([date, showtimes]) => (
            <div key={date} className="mb-6">
              <h3 className="font-semibold mb-2">
                {format(new Date(date), "MMMM d, yyyy")}
              </h3>
              {showtimes.map((showtime) => (
                <div
                  key={showtime.id}
                  className="flex items-center justify-between bg-secondary p-3 rounded-md mb-2"
                >
                  <div>
                    <p className="font-medium">{showtime.movie_title}</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {showtime.time}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(showtime.id)}
                  >
                    {loading ? null : <Trash2 className="h-4 w-4" />}
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
