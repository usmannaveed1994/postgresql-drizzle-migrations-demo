import { db } from "@/db";
import { users, posts } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Star, User } from "lucide-react";
import {
  UsersPageShell,
  usersPageContentClass,
} from "@/components/users-page-shell";

export const dynamic = "force-dynamic";

async function addUser(formData: FormData) {
  "use server";
  await db.insert(users).values({ name: String(formData.get("name")) });
  revalidatePath("/");
}

async function addPost(formData: FormData) {
  "use server";
  await db.insert(posts).values({
    title: String(formData.get("title")),
    authorId: String(formData.get("authorId")),
  });
  revalidatePath("/");
}

const selectClassName = cn(
  "h-8 w-full min-w-0 shrink-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30",
  "flex-none md:max-w-[12rem]",
);

export default async function Home() {
  const allUsers = await db.query.users.findMany({ with: { posts: true } });
  const env = process.env.VERCEL_ENV ?? "local";

  return (
    <UsersPageShell>
      <main className={usersPageContentClass}>
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Users & Posts
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage users and their posts in one place.
            </p>
          </div>
          <Badge variant="secondary" className="uppercase tracking-wide">
            {env}
          </Badge>
        </header>

        <Card>
          <CardHeader className="border-b">
            <CardTitle>Add records</CardTitle>
            <CardDescription>
              Create a user first, then attach posts to an author.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <form action={addUser} className="flex flex-col gap-2 sm:flex-row">
              <Input
                name="name"
                placeholder="User name"
                required
                className="flex-1"
              />
              <Button type="submit" className="sm:shrink-0">
                Add user
              </Button>
            </form>

            <form action={addPost} className="flex flex-col gap-2 sm:flex-row">
              <Input
                name="title"
                placeholder="Post title"
                required
                className="flex-1"
              />
              <select
                name="authorId"
                required
                className={selectClassName}
                disabled={allUsers.length === 0}
                defaultValue={allUsers[0]?.id ?? ""}
              >
                {allUsers.length === 0 ? (
                  <option value="">No users yet</option>
                ) : (
                  allUsers.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))
                )}
              </select>
              <Button
                type="submit"
                className="sm:shrink-0"
                disabled={allUsers.length === 0}
              >
                Add post
              </Button>
            </form>
          </CardContent>
        </Card>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground">
            All users
          </h2>
          {allUsers.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No users yet. Add one above to get started.
                </p>
              </CardContent>
            </Card>
          ) : (
            <ul className="space-y-3">
              {allUsers.map((u) => (
                <li key={u.id}>
                  <Card>
                    <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <User
                          className="size-4 shrink-0 text-muted-foreground"
                          aria-hidden
                        />
                        {u.name}
                      </CardTitle>
                      <Badge className="h-5 shrink-0 border-0 bg-amber-400/70 px-2 text-[0.65rem] font-semibold">
                        {u.posts.length === 0
                          ? "No posts"
                          : `${u.posts.length} post${u.posts.length === 1 ? "" : "s"}`}
                      </Badge>
                    </CardHeader>
                    {u.posts.length > 0 && (
                      <CardContent className="pt-0">
                        <ul className="space-y-1.5">
                          {u.posts.map((p) => (
                            <li
                              key={p.id}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <Star
                                className="mt-0.5 size-3.5 shrink-0 text-primary"
                                aria-hidden
                              />
                              <span>{p.title}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    )}
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </UsersPageShell>
  );
}
