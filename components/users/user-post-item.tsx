import { HoverDeleteLabel } from "@/components/hover-delete-label";
import type { Post } from "@/lib/types";
import { Star } from "lucide-react";

type UserPostItemProps = {
  post: Post;
};

export function UserPostItem({ post }: UserPostItemProps) {
  return (
    <li className="flex items-start gap-2 text-sm text-muted-foreground">
      <Star
        className="mt-0.5 size-3.5 shrink-0 text-primary"
        aria-hidden
      />
      <HoverDeleteLabel
        deleteUrl={`/api/posts/${post.id}`}
        label="Delete post"
      >
        {post.title}
      </HoverDeleteLabel>
    </li>
  );
}
