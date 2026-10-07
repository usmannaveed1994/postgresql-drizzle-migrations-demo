import { createPost, listPostsWithAuthor } from "@/lib/queries/posts";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await listPostsWithAuthor();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const title =
    "title" in body && typeof body.title === "string" ? body.title.trim() : "";
  const authorId =
    "authorId" in body && typeof body.authorId === "string"
      ? body.authorId.trim()
      : "";

  if (!title || !authorId) {
    return NextResponse.json(
      { error: "Title and authorId are required" },
      { status: 400 },
    );
  }

  const post = await createPost(title, authorId);
  return NextResponse.json(post, { status: 201 });
}
