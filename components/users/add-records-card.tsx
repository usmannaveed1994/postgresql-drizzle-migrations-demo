import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AuthorOption } from "@/lib/types";
import { AddPostForm } from "@/components/users/add-post-form";
import { AddUserForm } from "@/components/users/add-user-form";

type AddRecordsCardProps = {
  authors: AuthorOption[];
};

export function AddRecordsCard({ authors }: AddRecordsCardProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Add records</CardTitle>
        <CardDescription>
          Create a user first, then attach posts to an author.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <AddUserForm />
        <AddPostForm authors={authors} />
      </CardContent>
    </Card>
  );
}
