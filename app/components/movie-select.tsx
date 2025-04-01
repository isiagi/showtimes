"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Movie {
  id: string;
  title: string;
}

interface MovieSelectProps {
  selectedMovie: string;
  onSelectMovie: (movieId: string) => void;
}

export function MovieSelect({
  selectedMovie,
  onSelectMovie,
}: MovieSelectProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://cinema-vmbf.onrender.com/movies/movies/"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select Movie</label>
      <Select
        value={selectedMovie}
        onValueChange={onSelectMovie}
        disabled={isLoading}
      >
        <SelectTrigger>
          <SelectValue
            placeholder={isLoading ? "Loading movies..." : "Select a movie"}
          />
        </SelectTrigger>
        <SelectContent>
          {movies.map((movie) => (
            <SelectItem key={movie.id} value={movie.id}>
              {movie.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
