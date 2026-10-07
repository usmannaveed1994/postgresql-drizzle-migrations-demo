import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HoverDeleteLabel } from "@/components/hover-delete-label";
import { UserPostItem } from "@/components/users/user-post-item";
import type { UserWithPosts } from "@/lib/types";
import { User } from "lucide-react";

type UserCardProps = {
  user: UserWithPosts;
};

function postCountLabel(count: number) {
  if (count === 0) return "No posts";
  return `${count} post${count === 1 ? "" : "s"}`;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <User
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden
          />
          <HoverDeleteLabel
            deleteUrl={`/api/users/${user.id}`}
            label="Delete user"
          >
            {user.name}
          </HoverDeleteLabel>
        </CardTitle>
        <Badge className="h-5 shrink-0 border-0 bg-amber-400/70 px-2 text-[0.65rem] font-semibold">
          {postCountLabel(user.posts.length)}
        </Badge>
      </CardHeader>
      {user.posts.length > 0 && (
        <CardContent className="pt-0">
          <ul className="space-y-1.5">
            {user.posts.map((post) => (
              <UserPostItem key={post.id} post={post} />
            ))}
          </ul>
        </CardContent>
      )}
    </Card>
  );
}
