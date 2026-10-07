import { AddRecordsCard } from "@/components/users/add-records-card";
import { UsersListSection } from "@/components/users/users-list-section";
import { UsersPageHeader } from "@/components/users/users-page-header";
import {
  UsersPageShell,
  usersPageContentClass,
} from "@/components/users-page-shell";
import { listUsersWithPosts } from "@/lib/queries/users";

export const dynamic = "force-dynamic";

export default async function Home() {
  const users = await listUsersWithPosts();
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
