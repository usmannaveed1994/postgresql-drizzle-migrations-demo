import { db } from "@/db";
import { posts } from "@/db/schema";

export async function listPostsWithAuthor() {
  return db.query.posts.findMany({ with: { author: true } });
}

export async function createPost(title: string, authorId: string) {
  const [post] = await db
    .insert(posts)
    .values({ title, authorId })
    .returning();
  return post;
}
