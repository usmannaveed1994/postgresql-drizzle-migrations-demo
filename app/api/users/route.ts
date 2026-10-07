import { createUser, listUsersWithPosts } from "@/lib/queries/users";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await listUsersWithPosts();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name =
    typeof body === "object" &&
    body !== null &&
    "name" in body &&
    typeof body.name === "string"
      ? body.name.trim()
      : "";

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const user = await createUser(name);
  return NextResponse.json(user, { status: 201 });
}
