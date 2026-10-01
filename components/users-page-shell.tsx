import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** max-w-2xl (42rem) + 20% on md+ */
export const usersPageContentClass =
  "mx-auto w-full max-w-2xl space-y-8 p-6 md:max-w-[50.4rem]";

export function UsersPageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "dark flex min-h-full flex-1 flex-col bg-background text-foreground",
        className
      )}
    >
      {children}
    </div>
  );
}
