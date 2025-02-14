import { NextResponse } from "next/server"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    // Here, you would typically delete the showtime from your database
    // For this example, we'll just simulate a successful deletion
    console.log(`Deleting showtime with id: ${id}`)

    // Simulating a database operation delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({ message: "Showtime deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting showtime:", error)
    return NextResponse.json({ error: "Failed to delete showtime" }, { status: 500 })
  }
}

