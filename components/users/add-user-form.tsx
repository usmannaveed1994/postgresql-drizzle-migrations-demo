"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AddUserForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;

    const form = e.currentTarget;
    const name = new FormData(form).get("name");
    if (typeof name !== "string" || !name.trim()) return;

    setPending(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
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
        name="name"
        placeholder="User name"
        required
        className="flex-1"
        disabled={pending}
      />
      <Button type="submit" className="sm:shrink-0" disabled={pending}>
        Add user
      </Button>
    </form>
  );
}
