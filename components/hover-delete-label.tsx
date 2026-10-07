import { DeleteRecordButton } from "@/components/delete-record-button";
import { cn } from "@/lib/utils";

type HoverDeleteLabelProps = {
  deleteUrl: string;
  label: string;
  children: React.ReactNode;
  className?: string;
};

export function HoverDeleteLabel({
  deleteUrl,
  label,
  children,
  className,
}: HoverDeleteLabelProps) {
  return (
    <span
      className={cn(
        "group/hover-delete inline-flex min-w-0 items-center gap-2",
        className,
      )}
    >
      <span className="min-w-0 truncate">{children}</span>
      <DeleteRecordButton deleteUrl={deleteUrl} label={label} />
    </span>
  );
}
