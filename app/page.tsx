import { AddRecordsCard } from "@/components/users/add-records-card";
import { UsersListSection } from "@/components/users/users-list-section";
import { UsersPageHeader } from "@/components/users/users-page-header";
import {
  UsersPageShell,
  usersPageContentClass,
} from "@/components/users-page-shell";
import { fetchFromApi } from "@/lib/server-api";
import type { UserWithPosts } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const users = await fetchFromApi<UserWithPosts[]>("/api/users");
  const env = process.env.VERCEL_ENV ?? "local";

  const authors = users.map((user) => ({ id: user.id, name: user.name }));

  return (
    <UsersPageShell>
      <main className={usersPageContentClass}>
        <UsersPageHeader env={env} />
        <AddRecordsCard authors={authors} />
        <UsersListSection users={users} />
      </main>
    </UsersPageShell>
  );
}
