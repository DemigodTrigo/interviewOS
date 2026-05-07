import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, FileText, Mic, TrendingUp, Plus } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { StatCard } from "@/components/ui-kit/StatCard";
import { AreaChartCard } from "@/components/ui-kit/AreaChartCard";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { ScoreRing } from "@/components/ui-kit/ScoreRing";
import { AIChat } from "@/components/ui-kit/AIChat";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — InterviewOS" },
      { name: "description", content: "Your AI-powered career command center." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();
  return (
    <PageShell
      title={`Welcome back, ${user?.email || "User"}`}
      subtitle="Here's how your career engine is running today."
      actions={
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl gradient-brand text-white text-sm font-medium ring-glow hover:opacity-95 transition">
          <Plus className="size-4" /> New mock interview
        </button>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Resume Score" value="87" delta="+6%" icon={FileText} />
        <StatCard label="Interviews" value="24" delta="+12%" icon={Mic} />
        <StatCard label="Applications" value="142" delta="+8%" icon={Briefcase} />
        <StatCard label="Response Rate" value="38%" delta="-2%" icon={TrendingUp} trend="down" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2"><AreaChartCard /></div>
        <GlassCard title="Skill Mastery" subtitle="Last 30 days">
          <div className="grid grid-cols-3 gap-2 place-items-center">
            <ScoreRing score={92} label="Behavioral" />
            <ScoreRing score={78} label="System Design" />
            <ScoreRing score={84} label="Coding" />
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <GlassCard title="Recent Interviews" subtitle="Click any to review the full transcript">
            <div className="divide-y divide-white/5">
              {[
                { co: "Stripe", role: "Senior PM", score: 91, when: "2h ago" },
                { co: "Figma", role: "Product Designer", score: 84, when: "Yesterday" },
                { co: "Linear", role: "Frontend Eng", score: 76, when: "2 days ago" },
                { co: "Vercel", role: "DevRel", score: 88, when: "4 days ago" },
              ].map((r) => (
                <div key={r.co} className="flex items-center gap-4 py-3">
                  <div className="size-10 rounded-xl bg-white/5 border border-white/10 grid place-items-center font-display font-semibold">
                    {r.co[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{r.co} · {r.role}</div>
                    <div className="text-xs text-muted-foreground">{r.when}</div>
                  </div>
                  <div className="text-sm font-semibold gradient-text">{r.score}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
        <AIChat />
      </div>
    </PageShell>
  );
}
