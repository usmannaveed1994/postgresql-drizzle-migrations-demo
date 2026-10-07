"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type DeleteRecordButtonProps = {
  deleteUrl: string;
  label: string;
  className?: string;
};

export function DeleteRecordButton({
  deleteUrl,
  label,
  className,
}: DeleteRecordButtonProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    if (pending) return;
    setPending(true);
    try {
      const res = await fetch(deleteUrl, { method: "DELETE" });
      if (!res.ok) return;
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <Button
      type="button"
      variant="destructive"
      size="xs"
      disabled={pending}
      aria-label={label}
      className={cn(
        "shrink-0 opacity-0 transition-opacity group-hover/hover-delete:opacity-100 focus-visible:opacity-100",
        className,
      )}
      onClick={handleDelete}
    >
      <Trash2 aria-hidden />
      Delete
    </Button>
  );
}
