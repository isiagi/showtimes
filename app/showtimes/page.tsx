"use client";

import { useState, useEffect } from "react";
import { ShowtimeList } from "../components/showtime-list";
import { AuthenticatedLayout } from "../layouts/authenticated-layout";

interface Showtime {
  id: string;
  movieId: string;
  movieTitle: string;
  date: string;
  time: string;
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
      setShowtimes(data);
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/showings/schedule/${id}`, {
        method: "DELETE",
      });
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
    <AuthenticatedLayout>
      <h1 className="text-2xl font-bold mb-6">Manage Showtimes</h1>
      <ShowtimeList showtimes={showtimes} onDelete={handleDelete} />
    </AuthenticatedLayout>
  );
}
