import { PROFILE } from "@/data/site";

export function StatusPill() {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-2">
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
      </span>
      <span className="text-sm font-medium text-muted-foreground">{PROFILE.status}</span>
    </div>
  );
}
