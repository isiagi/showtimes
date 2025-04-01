/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSchedule } from "../actions";

export function ScheduleView() {
  const [movieId, setMovieId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [schedule, setSchedule] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await getSchedule({
        movie_id: movieId,
        start_date: startDate,
        end_date: endDate,
      });
      setSchedule(result);
    } catch (error) {
      console.error("Error fetching schedule:", error);
      // You can add an error message here
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="view-movie-id">Movie ID</Label>
          <Input
            id="view-movie-id"
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="view-start-date">Start Date</Label>
          <Input
            id="view-start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="view-end-date">End Date</Label>
          <Input
            id="view-end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <Button type="submit">View Schedule</Button>
      </form>
      {schedule && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Schedule:</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            {JSON.stringify(schedule, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
