import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Movie {
  id: string
  title: string
}

interface MovieSelectProps {
  movies: Movie[]
  selectedMovie: string
  onSelectMovie: (movieId: string) => void
}

export function MovieSelect({ movies, selectedMovie, onSelectMovie }: MovieSelectProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select Movie</label>
      <Select value={selectedMovie} onValueChange={onSelectMovie}>
        <SelectTrigger>
          <SelectValue placeholder="Select a movie" />
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
  )
}

