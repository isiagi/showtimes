/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { MovieSelect } from "./components/movie-select";
import { DateSelect } from "./components/date-select";
import { WeeksSelect } from "./components/weeks-select";
import { TimeSelect } from "./components/time-select";

// Mock movie data - replace with actual data fetching logic
// const movies = [
//   { id: "1", title: "Inception" },
//   { id: "2", title: "The Dark Knight" },
//   { id: "3", title: "Interstellar" },
// ];

export default function ShowtimeGenerator() {
  const [selectedMovie, setSelectedMovie] = React.useState("");
  const [startDate, setStartDate] = React.useState<Date>();
  const [weeks, setWeeks] = React.useState("2");
  const [selectedTimes, setSelectedTimes] = React.useState<string[]>([]);
  const [previewDates, setPreviewDates] = React.useState<
    { date: string; times: string[] }[]
  >([]);
  const [movies, setMovies] = React.useState<any[]>([]);

  // Get movies from backend
  React.useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:8000/movies/movies/");
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        console.log(data);
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Generate preview dates when inputs change
  React.useEffect(() => {
    if (startDate) {
      const dates: { date: string; times: string[] }[] = [];
      const numWeeks = Number.parseInt(weeks);
      const numDays = numWeeks * 7;

      for (let i = 0; i < numDays; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        dates.push({
          date: format(currentDate, "MMM dd, yyyy"),
          times: selectedTimes,
        });
      }

      setPreviewDates(dates);
    }
  }, [startDate, weeks, selectedTimes]);

  const handleAddTime = (time: string) => {
    setSelectedTimes([...selectedTimes, time].sort());
  };

  const handleRemoveTime = (timeToRemove: string) => {
    setSelectedTimes(selectedTimes.filter((time) => time !== timeToRemove));
  };

  const handleGenerateSchedule = async () => {
    if (startDate && selectedMovie) {
      try {
        const response = await fetch(
          "http://localhost:8000/showings/showings/generate-schedule/",
          {
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
          }
        );

        if (!response.ok) {
          throw new Error("Failed to generate schedule");
        }

        const result = await response.json();
        console.log("Schedule generated:", result);
        // You can add logic here to display a success message or update the UI
      } catch (error) {
        console.error("Error generating schedule:", error);
        // You can add logic here to display an error message
      }
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Movie Showtime Scheduler</h1>
        <Link href="/showtimes">
          <Button variant="outline">View Showtimes</Button>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Input Card */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Showtimes</CardTitle>
            <CardDescription>
              Set up your movie screening schedule
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <MovieSelect
              movies={movies}
              selectedMovie={selectedMovie}
              onSelectMovie={setSelectedMovie}
            />
            <DateSelect startDate={startDate} onSelectDate={setStartDate} />
            <WeeksSelect weeks={weeks} onSelectWeeks={setWeeks} />
            <TimeSelect
              selectedTimes={selectedTimes}
              onAddTime={handleAddTime}
              onRemoveTime={handleRemoveTime}
            />
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleGenerateSchedule}
              className="w-full"
              disabled={
                !startDate || selectedTimes.length === 0 || !selectedMovie
              }
            >
              Generate Schedule
            </Button>
          </CardFooter>
        </Card>

        {/* Preview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Schedule Preview</CardTitle>
            <CardDescription>
              {previewDates.length} days, {selectedTimes.length} shows per day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {previewDates.map((date, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-medium text-muted-foreground">
                      {date.date}
                    </h3>
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
    </div>
  );
}
