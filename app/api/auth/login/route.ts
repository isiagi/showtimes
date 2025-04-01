import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { email, password } = await request.json()

  // This is a mock authentication. In a real application, you would validate against a database
  if (email === "user@example.com" && password === "password") {
    // In a real application, you would set a session or JWT token here
    return NextResponse.json({ message: "Login successful" }, { status: 200 })
  } else {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
  }
}

