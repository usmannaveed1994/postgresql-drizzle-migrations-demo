import { Badge } from "@/components/ui/badge";

type UsersPageHeaderProps = {
  env: string;
};

export function UsersPageHeader({ env }: UsersPageHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Users & Posts</h1>
        <p className="text-sm text-muted-foreground">
          Manage users and their posts in one place.
        </p>
      </div>
      <Badge variant="secondary" className="uppercase tracking-wide">
        {env}
      </Badge>
    </header>
  );
}
