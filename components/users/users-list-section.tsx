import { Card, CardContent } from "@/components/ui/card";
import { UserCard } from "@/components/users/user-card";
import type { UserWithPosts } from "@/lib/types";

type UsersListSectionProps = {
  users: UserWithPosts[];
};

export function UsersListSection({ users }: UsersListSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium text-muted-foreground">All users</h2>
      {users.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-sm text-muted-foreground">
              No users yet. Add one above to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <li key={user.id}>
              <UserCard user={user} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
