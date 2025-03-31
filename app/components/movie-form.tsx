"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Badge } from "@/components/ui/badge";
import { Plus, X, ImageIcon } from "lucide-react";

interface Movie {
  id?: string;
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

interface MovieFormProps {
  movie?: Movie;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: any;
  onCancel: () => void;
}

export function MovieForm({ movie, onSubmit, onCancel }: MovieFormProps) {
  const defaultMovie: Movie = {
    title: "",
    description: "",
    longDescription: "",
    image: "",
    rating: 0,
    actor: [""],
    duration: "",
    highlight: "",
    size: "",
    language: "",
    releaseDate: "",
    director: "",
    trailerUrl: "",
    status: "PENDING",
  };

  const [formData, setFormData] = useState<Movie>(movie || defaultMovie);
  const [activeTab, setActiveTab] = useState("basic");
  const [newActor, setNewActor] = useState("");
  const [isDeleteActorDialogOpen, setIsDeleteActorDialogOpen] = useState(false);
  const [actorToDelete, setActorToDelete] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (movie) {
      setFormData(movie);

      // Set image preview if the movie has an image URL
      if (typeof movie.image === "string" && movie.image) {
        setImagePreview(movie.image);
      }
    }
  }, [movie]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleActorAdd = () => {
    if (newActor.trim()) {
      setFormData((prev) => ({
        ...prev,
        actor: [...prev.actor, newActor],
      }));
      setNewActor("");
    }
  };

  const openDeleteActorDialog = (index: number) => {
    setActorToDelete(index);
    setIsDeleteActorDialogOpen(true);
  };

  const handleActorDelete = () => {
    if (actorToDelete !== null) {
      const updatedActors = [...formData.actor];
      updatedActors.splice(actorToDelete, 1);
      setFormData((prev) => ({ ...prev, actor: updatedActors }));
      setIsDeleteActorDialogOpen(false);
      setActorToDelete(null);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="cast">Cast & Media</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={2}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="longDescription">Long Description</Label>
            <Textarea
              id="longDescription"
              name="longDescription"
              value={formData.longDescription}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Movie Image</Label>
            <div
              className="border-2 border-dashed rounded-md p-4 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={handleImageClick}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />

              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Movie preview"
                    className="mx-auto max-h-64 object-contain rounded-md"
                  />
                  <div className="mt-2 text-center text-sm text-muted-foreground">
                    Click to change image
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-4">
                  <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-center text-sm font-medium">
                    Click to upload movie image
                  </p>
                  <p className="text-center text-xs text-muted-foreground mt-1">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Rating (0-10)</Label>
            <Input
              id="rating"
              name="rating"
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 1h 47m"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="highlight">Highlight</Label>
              <Input
                id="highlight"
                name="highlight"
                value={formData.highlight}
                onChange={handleChange}
                placeholder="e.g., Animated Adventure"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Select
                value={formData.size}
                onValueChange={(value) => handleSelectChange("size", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="releaseDate">Release Date</Label>
              <Input
                id="releaseDate"
                name="releaseDate"
                type="date"
                value={formData.releaseDate}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Coming_Soon">Coming Soon</SelectItem>
                  <SelectItem value="Now_Showing">Now Showing</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cast" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="director">Director</Label>
            <Input
              id="director"
              name="director"
              value={formData.director}
              onChange={handleChange}
              placeholder="e.g., Christopher Nolan"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trailerUrl">Trailer URL</Label>
            <Input
              id="trailerUrl"
              name="trailerUrl"
              value={formData.trailerUrl}
              onChange={handleChange}
              placeholder="YouTube URL"
            />
          </div>

          <div className="space-y-3">
            <Label>Actors</Label>

            <div className="flex flex-wrap gap-2 pt-2">
              {formData.actor.map((actor, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="gap-1 px-3 py-1.5"
                >
                  {actor}
                  <button
                    type="button"
                    onClick={() => openDeleteActorDialog(index)}
                    className="ml-1 rounded-full hover:bg-muted"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add actor"
                value={newActor}
                onChange={(e) => setNewActor(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleActorAdd}
                disabled={!newActor.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between mt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{movie ? "Update" : "Add"} Movie</Button>
      </div>

      {/* Delete Actor Confirmation Dialog */}
      <AlertDialog
        open={isDeleteActorDialogOpen}
        onOpenChange={setIsDeleteActorDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Actor</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this actor?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleActorDelete}>
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
}
