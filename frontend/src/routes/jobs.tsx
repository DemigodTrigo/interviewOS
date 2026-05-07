import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { StatCard } from "@/components/ui-kit/StatCard";
import { Briefcase, Send, CheckCircle2, Clock, Plus } from "lucide-react";

export const Route = createFileRoute("/jobs")({
  head: () => ({ meta: [{ title: "Job Tracker — InterviewOS" }] }),
  component: JobsPage,
});

const columns = [
  { key: "Saved", color: "oklch(0.7 0.03 260)" },
  { key: "Applied", color: "oklch(0.72 0.18 245)" },
  { key: "Interview", color: "oklch(0.68 0.22 285)" },
  { key: "Offer", color: "oklch(0.74 0.17 155)" },
] as const;

const cards: Record<string, { co: string; role: string; salary: string }[]> = {
  Saved: [{ co: "Notion", role: "Sr. PM", salary: "$220k" }, { co: "OpenAI", role: "Solutions Eng", salary: "$280k" }],
  Applied: [{ co: "Stripe", role: "PM, Payments", salary: "$240k" }, { co: "Vercel", role: "DevRel", salary: "$200k" }],
  Interview: [{ co: "Linear", role: "Frontend", salary: "$210k" }],
  Offer: [{ co: "Figma", role: "Product Designer", salary: "$235k" }],
};

function JobsPage() {
  return (
    <PageShell
      title="Job Tracker"
      subtitle="Visualize your pipeline. Stay on top of every opportunity."
      actions={
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl gradient-brand text-white text-sm font-medium ring-glow">
          <Plus className="size-4" /> Add job
        </button>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Saved" value="14" delta="+3" icon={Briefcase} />
        <StatCard label="Applied" value="42" delta="+9" icon={Send} />
        <StatCard label="Interviews" value="7" delta="+2" icon={Clock} />
        <StatCard label="Offers" value="3" delta="+1" icon={CheckCircle2} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map((col) => (
          <GlassCard key={col.key} className="min-h-[320px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full" style={{ background: col.color }} />
                <span className="font-semibold text-sm">{col.key}</span>
                <span className="text-xs text-muted-foreground">({cards[col.key].length})</span>
              </div>
            </div>
            <div className="space-y-2">
              {cards[col.key].map((c) => (
                <div key={c.co} className="rounded-xl border border-white/10 bg-white/[4%] p-3 hover:bg-white/[7%] transition cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg gradient-brand grid place-items-center text-xs font-semibold text-white">
                      {c.co[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{c.co}</div>
                      <div className="text-xs text-muted-foreground truncate">{c.role}</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs gradient-text font-semibold">{c.salary}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </PageShell>
  );
}
