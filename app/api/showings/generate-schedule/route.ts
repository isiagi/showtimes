import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server"

export async function POST(request: Request) {
  // const { userId } = auth()

  // if (!userId) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // }

  try {
    const data = await request.json();

    // Here, you would typically save the schedule to your database
    // For this example, we'll just simulate a successful operation
    console.log("Generating schedule with data:", data);

    // Simulating a database operation delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        message: "Schedule generated successfully",
        data: {
          movie_id: data.movie_id,
          start_date: data.start_date,
          daily_times: data.daily_times,
          weeks: data.weeks,
          // user_id: userId,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating schedule:", error);
    return NextResponse.json(
      { error: "Failed to generate schedule" },
      { status: 500 }
    );
  }
}
