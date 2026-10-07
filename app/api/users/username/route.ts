import { findUserByUsername } from "@/lib/queries/users";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username")?.trim() ?? "";

  if (!username) {
    return NextResponse.json(
      { error: "Username query parameter is required" },
      { status: 400 },
    );
  }

  const existing = await findUserByUsername(username);
  return NextResponse.json({ available: !existing });
}
