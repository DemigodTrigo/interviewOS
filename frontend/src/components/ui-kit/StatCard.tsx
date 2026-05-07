import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  trend = "up",
}: {
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
  trend?: "up" | "down";
}) {
  const positive = trend === "up";
  return (
    <div className="glass rounded-2xl p-5 relative overflow-hidden group hover:-translate-y-0.5 transition-transform">
      <div className="absolute -top-12 -right-12 size-32 rounded-full bg-[var(--brand)] opacity-10 blur-2xl group-hover:opacity-25 transition" />
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
          <div className="mt-2 text-3xl font-semibold font-display">{value}</div>
        </div>
        <div className="size-10 rounded-xl bg-white/5 grid place-items-center border border-white/10">
          <Icon className="size-5 text-[oklch(0.78_0.18_270)]" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1 text-xs">
        <span
          className={
            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full " +
            (positive
              ? "bg-[oklch(0.74_0.17_155/15%)] text-[oklch(0.82_0.17_155)]"
              : "bg-[oklch(0.65_0.22_25/15%)] text-[oklch(0.78_0.2_25)]")
          }
        >
          {positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
          {delta}
        </span>
        <span className="text-muted-foreground">vs last week</span>
      </div>
    </div>
  );
}
