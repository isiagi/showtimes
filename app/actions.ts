"use server";

import { revalidatePath } from "next/cache";

export async function generateSchedule(data: {
  movie_id: string;
  start_date: string;
  daily_times: string[];
  weeks: number;
}) {
  const response = await fetch(
    `http://localhost:8000/showings/showings/generate-schedule/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to generate schedule");
  }

  const result = await response.json();
  revalidatePath("/");
  return result;
}

export async function getSchedule(data: {
  movie_id: string;
  start_date: string;
  end_date: string;
}) {
  const params = new URLSearchParams(data);
  const response = await fetch(
    `http://localhost:8000/showings/showings/generate-schedule/${data.movie_id}/?${params}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch schedule");
  }

  const result = await response.json();
  return result;
}
