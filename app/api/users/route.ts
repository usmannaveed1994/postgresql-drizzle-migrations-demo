import {
  createUser,
  findUserByUsername,
  listUsersWithPosts,
} from "@/lib/queries/users";
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

  const username =
    typeof body === "object" &&
    body !== null &&
    "username" in body &&
    typeof body.username === "string"
      ? body.username.trim()
      : "";

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  const existing = await findUserByUsername(username);
  if (existing) {
    return NextResponse.json(
      { error: "Username is already taken" },
      { status: 409 },
    );
  }

  const user = await createUser(name, username);
  return NextResponse.json(user, { status: 201 });
}
