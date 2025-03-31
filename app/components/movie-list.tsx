/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Star, Clock, Calendar, User } from "lucide-react";

interface Movie {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  rating: number;
  actor: string[];
  duration: string;
  highlight: string;
  size: string;
  language: string;
  releaseDate: string;
  director: string;
  trailerUrl: string;
  status: string;
}

interface MovieListProps {
  movies: any[];
  onEdit: (movie: Movie) => void;
  onDelete: (id: string) => void;
}

export function MovieList({ movies, onEdit, onDelete }: MovieListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Now_Showing":
        return "bg-green-500";
      case "Coming_Soon":
        return "bg-yellow-500";
      case "Archived":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  const formatStatus = (status: string) => {
    return status.replace("_", " ");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <Card key={movie.id} className="overflow-hidden flex flex-col h-full">
          <div className="relative h-48 w-full">
            {movie.image ? (
              <img
                src={movie.image || "/placeholder.svg"}
                alt={movie.title}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
            <div className="absolute top-2 right-2 flex space-x-1">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {movie.rating}
              </Badge>
              <Badge className={`${getStatusColor(movie.status)} text-white`}>
                {formatStatus(movie.status)}
              </Badge>
            </div>
          </div>

          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="line-clamp-1">{movie.title}</CardTitle>
                <CardDescription className="flex flex-wrap gap-2 mt-1">
                  <span className="flex items-center gap-1 text-xs">
                    <Clock className="h-3 w-3" />
                    {movie.duration}
                  </span>
                  <span className="flex items-center gap-1 text-xs">
                    <Calendar className="h-3 w-3" />
                    {movie.releaseDate
                      ? new Date(movie.releaseDate).getFullYear()
                      : "N/A"}
                  </span>
                </CardDescription>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(movie)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(movie.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
              {movie.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {movie.language && (
                <Badge variant="outline">{movie.language}</Badge>
              )}
              {movie.size && (
                <Badge variant="outline" className="capitalize">
                  {movie.size}
                </Badge>
              )}
              {movie.highlight && (
                <Badge variant="secondary">{movie.highlight}</Badge>
              )}
            </div>
            {movie.actor && movie.actor.length > 0 && (
              <div className="mt-3">
                <span className="text-xs flex items-center gap-1 text-muted-foreground">
                  <User className="h-3 w-3" />
                  {movie.actor.slice(0, 2).join(", ")}
                  {movie.actor.length > 2 &&
                    ` (+${movie.actor.length - 2} more)`}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
