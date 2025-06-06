import { NextResponse } from "next/server";

// Mock data for movies with the updated schema
const movies = [
  {
    id: "1",
    title: "Moana",
    description:
      "An adventurous teenager sails out on a daring mission to save her people",
    longDescription:
      "Three thousand years ago, the greatest sailors in the world voyaged across the vast Pacific Ocean, discovering the many islands of Oceania. But then, for a millennium, their voyages stopped – and no one knows why...",
    image:
      "https://m.media-amazon.com/images/M/MV5BMjI4MzU5NTExNF5BMl5BanBnXkFtZTgwNzY1MTEwMDI@._V1_.jpg",
    rating: 7.6,
    actor: ["Auli'i Cravalho", "Dwayne Johnson"],
    duration: "1h 47m",
    highlight: "Animated Adventure",
    size: "large",
    language: "English",
    releaseDate: "2016-11-23",
    director: "Ron Clements, John Musker",
    trailerUrl: "https://www.youtube.com/watch?v=LKFuXETZUsI",
    status: "Now_Showing",
  },
  {
    id: "2",
    title: "The Dark Knight",
    description: "Batman fights the menace known as the Joker.",
    longDescription:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    image:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    rating: 9.0,
    actor: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    duration: "2h 32m",
    highlight: "Best Supporting Actor",
    size: "large",
    language: "English",
    releaseDate: "2008-07-18",
    director: "Christopher Nolan",
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    status: "Archived",
  },
  {
    id: "3",
    title: "Dune",
    description:
      "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family trying to avenge his father's death.",
    longDescription:
      'A mythic and emotionally charged hero\'s journey, "Dune" tells the story of Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, who must travel to the most dangerous planet in the universe to ensure the future of his family and his people.',
    image:
      "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    rating: 8.0,
    actor: ["Timothée Chalamet", "Rebecca Ferguson", "Zendaya"],
    duration: "2h 35m",
    highlight: "Oscar Winner",
    size: "large",
    language: "English",
    releaseDate: "2021-10-22",
    director: "Denis Villeneuve",
    trailerUrl: "https://www.youtube.com/watch?v=8g18jFHCLXk",
    status: "Now_Showing",
  },
];

// In a real application, this would be a server-side storage solution
const filesMap = new Map();

export async function GET() {
  try {
    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const movieData = formData.get("movieData");

    if (!movieData) {
      return NextResponse.json(
        { error: "Missing movie data" },
        { status: 400 }
      );
    }

    const movie = JSON.parse(movieData.toString());

    // Handle image file
    const imageFile = formData.get("image") as File;

    if (imageFile) {
      // In a real application, you would upload this to a storage service
      const fileName = `movie-image-${Date.now()}`;

      // For mock purposes, we'll just store a reference
      filesMap.set(fileName, imageFile);

      // In a real app, this would be the URL to the uploaded file
      movie.image = `/api/images/${fileName}`;
    }

    // Generate a new ID
    const newId = (
      Math.max(...movies.map((m) => Number.parseInt(m.id))) + 1
    ).toString();

    const newMovie = {
      id: newId,
      ...movie,
    };

    movies.push(newMovie);

    return NextResponse.json(newMovie, { status: 201 });
  } catch (error) {
    console.error("Error creating movie:", error);
    return NextResponse.json(
      { error: "Failed to create movie" },
      { status: 500 }
    );
  }
}
