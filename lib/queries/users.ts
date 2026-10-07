import { db } from "@/db";
import { users } from "@/db/schema";

export async function listUsersWithPosts() {
  return db.query.users.findMany({ with: { posts: true } });
}

export async function createUser(name: string) {
  const [user] = await db.insert(users).values({ name }).returning();
  return user;
}
