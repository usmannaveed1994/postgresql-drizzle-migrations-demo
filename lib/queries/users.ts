import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function listUsersWithPosts() {
  return db.query.users.findMany({ with: { posts: true } });
}

export async function findUserByUsername(username: string) {
  return db.query.users.findFirst({
    where: eq(users.username, username),
  });
}

export async function createUser(name: string, username: string) {
  const [user] = await db
    .insert(users)
    .values({ name, username })
    .returning();
  return user;
}
