import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  UsersPageShell,
  usersPageContentClass,
} from "@/components/users-page-shell";

export function UsersPageSkeleton() {
  return (
    <UsersPageShell>
    <main className={usersPageContentClass}>
      <header className="flex items-center justify-between">
        <Skeleton className="h-8 w-44" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </header>

      <Card>
        <CardHeader className="border-b pb-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-2 h-4 w-56" />
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="flex gap-2">
            <Skeleton className="h-8 flex-1" />
            <Skeleton className="h-8 w-24" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 flex-1" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-24" />
          </div>
        </CardContent>
      </Card>

      <ul className="space-y-3">
        {[1, 2, 3].map((i) => (
          <li key={i}>
            <Card>
              <CardContent className="space-y-3 pt-4">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </main>
    </UsersPageShell>
  );
}
