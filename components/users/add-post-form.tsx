"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { AuthorOption } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

const selectClassName = cn(
  "h-8 w-full min-w-0 shrink-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30",
  "flex-none md:max-w-[12rem]",
);

type AddPostFormProps = {
  authors: AuthorOption[];
};

export function AddPostForm({ authors }: AddPostFormProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const hasAuthors = authors.length > 0;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending || !hasAuthors) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const title = data.get("title");
    const authorId = data.get("authorId");
    if (typeof title !== "string" || typeof authorId !== "string") return;
    if (!title.trim() || !authorId.trim()) return;

    setPending(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), authorId: authorId.trim() }),
      });
      if (!res.ok) return;
      form.reset();
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 sm:flex-row"
    >
      <Input
        name="title"
        placeholder="Post title"
        required
        className="flex-1"
        disabled={pending || !hasAuthors}
      />
      <select
        name="authorId"
        required
        className={selectClassName}
        disabled={!hasAuthors || pending}
        defaultValue={authors[0]?.id ?? ""}
      >
        {!hasAuthors ? (
          <option value="">No users yet</option>
        ) : (
          authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))
        )}
      </select>
      <Button
        type="submit"
        className="sm:shrink-0"
        disabled={!hasAuthors || pending}
      >
        Add post
      </Button>
    </form>
  );
}
