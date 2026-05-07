import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { GlassCard } from "./GlassCard";

const data = [
  { d: "Mon", a: 42, b: 30 },
  { d: "Tue", a: 55, b: 38 },
  { d: "Wed", a: 49, b: 44 },
  { d: "Thu", a: 68, b: 51 },
  { d: "Fri", a: 75, b: 58 },
  { d: "Sat", a: 82, b: 64 },
  { d: "Sun", a: 91, b: 72 },
];

export function AreaChartCard() {
  return (
    <GlassCard
      title="Performance Trend"
      subtitle="Mock interview & resume scores"
      action={
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[oklch(0.68_0.22_285)]" /> Interview
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[oklch(0.72_0.18_245)]" /> Resume
          </span>
        </div>
      }
    >
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: -20, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.68 0.22 285)" stopOpacity={0.7} />
                <stop offset="100%" stopColor="oklch(0.68 0.22 285)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.18 245)" stopOpacity={0.6} />
                <stop offset="100%" stopColor="oklch(0.72 0.18 245)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 6%)" vertical={false} />
            <XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fill: "oklch(0.7 0.02 260)", fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "oklch(0.7 0.02 260)", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                background: "oklch(0.18 0.03 268)",
                border: "1px solid oklch(1 0 0 / 10%)",
                borderRadius: 12,
                fontSize: 12,
              }}
            />
            <Area type="monotone" dataKey="a" stroke="oklch(0.78 0.2 285)" strokeWidth={2} fill="url(#g1)" />
            <Area type="monotone" dataKey="b" stroke="oklch(0.78 0.18 245)" strokeWidth={2} fill="url(#g2)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
