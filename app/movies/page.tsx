"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MovieList } from "../components/movie-list";
import { MovieForm } from "../components/movie-form";
import { AuthenticatedLayout } from "../layouts/authenticated-layout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

// interface Actor {
//   name: string;
//   role: string;
// }

interface Movie {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string | File;
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

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredMovies(movies);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredMovies(
        movies.filter(
          (movie) =>
            movie.title.toLowerCase().includes(term) ||
            movie.description.toLowerCase().includes(term) ||
            movie.director.toLowerCase().includes(term) ||
            movie.language.toLowerCase().includes(term) ||
            (movie.actor &&
              movie.actor.some(
                (actor) =>
                  typeof actor === "string" &&
                  actor.toLowerCase().includes(term)
              ))
        )
      );
    }
  }, [searchTerm, movies]);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/movies");
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies(data);
      setFilteredMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      toast({
        title: "Error",
        description: "Failed to fetch movies. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const prepareFormData = (movie: Movie) => {
    const formData = new FormData();

    // Handle image file
    if (movie.image instanceof File) {
      formData.append("image", movie.image);
    }

    // Remove the actual file object and send only the reference for other data
    const movieData = { ...movie };
    if (movie.image instanceof File) {
      movieData.image = "";
    }

    formData.append("movieData", JSON.stringify(movieData));
    return formData;
  };

  const handleAddMovie = async (movie: Movie) => {
    try {
      setIsLoading(true);
      const formData = prepareFormData(movie);

      const response = await fetch("/api/movies", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add movie");
      }

      setIsAddDialogOpen(false);
      toast({
        title: "Success",
        description: "Movie added successfully",
      });
      fetchMovies();
    } catch (error) {
      console.error("Error adding movie:", error);
      toast({
        title: "Error",
        description: "Failed to add movie. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditMovie = async (movie: Movie) => {
    try {
      setIsLoading(true);
      const formData = prepareFormData(movie);

      const response = await fetch(`/api/movies/${movie.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update movie");
      }

      setIsEditDialogOpen(false);
      setCurrentMovie(null);
      toast({
        title: "Success",
        description: "Movie updated successfully",
      });
      fetchMovies();
    } catch (error) {
      console.error("Error updating movie:", error);
      toast({
        title: "Error",
        description: "Failed to update movie. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMovie = async () => {
    if (!deleteId) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/movies/${deleteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete movie");
      }

      setIsDeleteDialogOpen(false);
      setDeleteId(null);
      toast({
        title: "Success",
        description: "Movie deleted successfully",
      });
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
      toast({
        title: "Error",
        description: "Failed to delete movie. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openEditDialog = (movie: Movie) => {
    setCurrentMovie(movie);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  return (
    <AuthenticatedLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Manage Movies</h1>
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search movies..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="flex items-center gap-2"
            disabled={isLoading}
          >
            <PlusCircle className="h-4 w-4" />
            Add Movie
          </Button>
        </div>
      </div>

      {isLoading && !movies.length ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading movies...</p>
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchTerm
              ? "No movies match your search criteria."
              : "No movies found. Add your first movie to get started."}
          </p>
        </div>
      ) : (
        <MovieList
          movies={filteredMovies}
          onEdit={openEditDialog}
          onDelete={openDeleteDialog}
        />
      )}

      {/* Add Movie Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Movie</DialogTitle>
          </DialogHeader>
          <MovieForm
            onSubmit={handleAddMovie}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Movie Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Movie</DialogTitle>
          </DialogHeader>
          {currentMovie && (
            <MovieForm
              movie={currentMovie}
              onSubmit={handleEditMovie}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              movie and all associated showtimes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteMovie} disabled={isLoading}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AuthenticatedLayout>
  );
}
