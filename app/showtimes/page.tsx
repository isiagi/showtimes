/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/auth-context";
import { ShowtimeList } from "../components/showtime-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { set } from "date-fns";

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
  const [tokens, setTokens] = useState<any>({
    access_token: "",
    refresh_token: "",
  });
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setTokens({
      access_token: window.localStorage.getItem("access_token"),
      refresh_token: window.localStorage.getItem("refresh_token"),
    });
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      fetchShowtimes();
    }
  }, [user, router]);

  const fetchShowtimes = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/showings/showings/");
      if (!response.ok) {
        throw new Error("Failed to fetch showtimes");
      }
      const data = await response.json();

      console.log("Fetched showtimes:", data);
      setShowtimes(data);
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8000/showings/showings/${id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.access_token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete showtime");
      }
      // Refresh the showtimes list after successful deletion
      console.log("Showtime deleted successfully");
      alert("Showtime deleted successfully");
      setShowtimes(showtimes.filter((showtime) => showtime.id !== id));
      // fetchShowtimes();
    } catch (error) {
      console.error("Error deleting showtime:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Showtimes</h1>
        <div className="space-x-2">
          <Link href="/showtime-generator">
            <Button variant="outline">Generate Showtimes</Button>
          </Link>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      <ShowtimeList
        showtimes={showtimes}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
}
