/* eslint-disable @typescript-eslint/no-explicit-any */
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
  movie_title: string;
  date: string;
  time: string;
}

interface ShowtimeListProps {
  showtimes: any[];
  onDelete: (id: string) => void;
}

export function ShowtimeList({ showtimes, onDelete }: ShowtimeListProps) {
  const groupedShowtimes = showtimes.reduce((acc, showtime) => {
    const date = showtime.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(showtime);
    return acc;
  }, {} as Record<string, Showtime[]>);

  console.log(showtimes, "showtimes");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scheduled Showtimes</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          {Object.entries(groupedShowtimes).map(([date, showtimes]: any) => (
            <div key={date} className="mb-6">
              <h3 className="font-semibold mb-2">
                {format(new Date(date), "MMMM d, yyyy")}
              </h3>
              {showtimes.map((showtime: any) => (
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
                    <Trash2 className="h-4 w-4" />
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
