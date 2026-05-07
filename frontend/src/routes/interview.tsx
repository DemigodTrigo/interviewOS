import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { ScoreRing } from "@/components/ui-kit/ScoreRing";
import { Mic, Play, Code, Users, Brain } from "lucide-react";

export const Route = createFileRoute("/interview")({
  head: () => ({ meta: [{ title: "Interview Simulator — InterviewOS" }] }),
  component: InterviewPage,
});

const tracks = [
  { icon: Users, name: "Behavioral", q: 32, color: "oklch(0.68 0.22 285)" },
  { icon: Code, name: "Coding", q: 120, color: "oklch(0.72 0.18 245)" },
  { icon: Brain, name: "System Design", q: 18, color: "oklch(0.78 0.16 200)" },
];

function InterviewPage() {
  return (
    <PageShell title="Interview Simulator" subtitle="Practice live with our voice-enabled AI interviewer.">
      <GlassCard className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute -top-20 -right-20 size-72 rounded-full gradient-brand opacity-20 blur-3xl" />
        <div className="relative grid lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="size-1.5 rounded-full bg-[oklch(0.82_0.17_155)] animate-pulse" />
              Live AI Interviewer
            </div>
            <h2 className="mt-4 text-3xl font-display font-semibold">Senior PM at Stripe</h2>
            <p className="text-sm text-muted-foreground mt-2">45-minute behavioral round · 12 calibrated questions</p>
            <div className="mt-6 flex gap-3">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-brand text-white font-medium ring-glow">
                <Play className="size-4" /> Start Session
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                <Mic className="size-4" /> Voice only
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <ScoreRing score={91} label="Clarity" />
            <ScoreRing score={84} label="Structure" />
            <ScoreRing score={76} label="Depth" />
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tracks.map(({ icon: Icon, name, q, color }) => (
          <GlassCard key={name} className="hover:-translate-y-0.5 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <div
                className="size-11 rounded-xl grid place-items-center"
                style={{ background: `${color.replace(")", " / 18%)")}`, border: `1px solid ${color.replace(")", " / 35%)")}` }}
              >
                <Icon className="size-5" style={{ color }} />
              </div>
              <div>
                <div className="font-semibold">{name}</div>
                <div className="text-xs text-muted-foreground">{q} curated questions</div>
              </div>
            </div>
            <div className="mt-4 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full gradient-brand" style={{ width: `${40 + q / 3}%` }} />
            </div>
          </GlassCard>
        ))}
      </div>
    </PageShell>
  );
}
