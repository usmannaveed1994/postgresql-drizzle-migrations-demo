"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const USERNAME_DEBOUNCE_MS = 400;

type UsernameAvailability = "idle" | "checking" | "available" | "taken";

type AvailabilityResult = {
  username: string;
  status: "available" | "taken" | "error";
};

export function AddUserForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [username, setUsername] = useState("");
  const [availabilityResult, setAvailabilityResult] =
    useState<AvailabilityResult | null>(null);

  const trimmedUsername = username.trim();

  // Derived during render, so the effect never needs to call setState synchronously.
  let usernameAvailability: UsernameAvailability;
  if (!trimmedUsername) {
    usernameAvailability = "idle";
  } else if (
    !availabilityResult ||
    availabilityResult.username !== trimmedUsername
  ) {
    usernameAvailability = "checking";
  } else if (availabilityResult.status === "error") {
    usernameAvailability = "idle";
  } else {
    usernameAvailability = availabilityResult.status;
  }

  const usernameTaken = usernameAvailability === "taken";
  const usernameChecking = usernameAvailability === "checking";

  useEffect(() => {
    if (!trimmedUsername) return;

    const controller = new AbortController();

    const timer = window.setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/users/username?username=${encodeURIComponent(trimmedUsername)}`,
          { signal: controller.signal },
        );
        if (!res.ok) {
          setAvailabilityResult({ username: trimmedUsername, status: "error" });
          return;
        }
        const data = (await res.json()) as { available?: boolean };
        setAvailabilityResult({
          username: trimmedUsername,
          status: data.available ? "available" : "taken",
        });
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setAvailabilityResult({ username: trimmedUsername, status: "error" });
      }
    }, USERNAME_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [trimmedUsername]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending || usernameTaken || usernameChecking) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name");
    const usernameValue = data.get("username");
    if (typeof name !== "string" || typeof usernameValue !== "string") return;

    const trimmedName = name.trim();
    const trimmedUsernameValue = usernameValue.trim();
    if (!trimmedName || !trimmedUsernameValue) return;

    if (usernameAvailability !== "available") return;

    setPending(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          username: trimmedUsernameValue,
        }),
      });
      if (!res.ok) return;
      form.reset();
      setUsername("");
      // Clear the cached result so a re-used username is checked again.
      setAvailabilityResult(null);
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="user-full-name" className="text-sm font-medium">
            Full Name
          </label>
          <Input
            id="user-full-name"
            name="name"
            placeholder="Jane Doe"
            required
            disabled={pending}
          />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="user-username" className="text-sm font-medium">
            Username
          </label>
          <Input
            id="user-username"
            name="username"
            placeholder="jane_doe"
            required
            autoComplete="off"
            disabled={pending}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-invalid={usernameTaken}
            aria-describedby={
              usernameTaken || usernameChecking ? "username-hint" : undefined
            }
            className={cn(usernameTaken && "border-destructive")}
          />
        </div>
        <Button
          type="submit"
          className="sm:shrink-0 mt-6.25"
          disabled={
            pending || !trimmedUsername || usernameAvailability !== "available"
          }
        >
          Add user
        </Button>
      </div>
      <div className="h-4">
        {(usernameChecking || usernameTaken) && trimmedUsername.length > 0 && (
          <p
            id="username-hint"
            className={cn(
              "text-sm",
              usernameTaken ? "text-destructive" : "text-muted-foreground",
            )}
          >
            {usernameChecking
              ? "Checking username…"
              : "This username is already taken."}
          </p>
        )}
      </div>
    </form>
  );
}
