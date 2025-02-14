"use client";

import { useEffect, useState } from "react";
import { ShowtimeList } from "../components/showtime-list";

interface Showtime {
  id: string;
  movieId: string;
  movieTitle: string;
  date: string;
  time: string;
  movie_title: string;
}

export default function ShowtimesPage() {
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);

  useEffect(() => {
    fetchShowtimes();
  }, []);

  const fetchShowtimes = async () => {
    try {
      const response = await fetch("http://localhost:8000/showings/showings/");
      if (!response.ok) {
        throw new Error("Failed to fetch showtimes");
      }
      const data = await response.json();
      console.log(data);

      setShowtimes(data);
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/showings/showings/${id}/`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete showtime");
      }
      // Refresh the showtimes list after successful deletion
      fetchShowtimes();
    } catch (error) {
      console.error("Error deleting showtime:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Showtimes</h1>
      <ShowtimeList showtimes={showtimes} onDelete={handleDelete} />
    </div>
  );
}
