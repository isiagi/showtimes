// import { NextResponse } from "next/server"

// // Mock data for showtimes
// const mockShowtimes = [
//   { id: "1", movieId: "1", movieTitle: "Inception", date: "2025-02-15", time: "14:00" },
//   { id: "2", movieId: "1", movieTitle: "Inception", date: "2025-02-15", time: "17:00" },
//   { id: "3", movieId: "1", movieTitle: "Inception", date: "2025-02-15", time: "20:00" },
//   { id: "4", movieId: "2", movieTitle: "The Dark Knight", date: "2025-02-16", time: "14:00" },
//   { id: "5", movieId: "2", movieTitle: "The Dark Knight", date: "2025-02-16", time: "17:00" },
//   { id: "6", movieId: "2", movieTitle: "The Dark Knight", date: "2025-02-16", time: "20:00" },
//   { id: "7", movieId: "3", movieTitle: "Interstellar", date: "2025-02-17", time: "14:00" },
//   { id: "8", movieId: "3", movieTitle: "Interstellar", date: "2025-02-17", time: "17:00" },
//   { id: "9", movieId: "3", movieTitle: "Interstellar", date: "2025-02-17", time: "20:00" },
// ]

// export async function GET() {
//   try {
//     // Here, you would typically fetch showtimes from your database
//     // For this example, we'll return the mock data
//     return NextResponse.json(mockShowtimes, { status: 200 })
//   } catch (error) {
//     console.error("Error fetching showtimes:", error)
//     return NextResponse.json({ error: "Failed to fetch showtimes" }, { status: 500 })
//   }
// }
