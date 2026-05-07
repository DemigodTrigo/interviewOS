import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { AIChat } from "@/components/ui-kit/AIChat";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Target, BookOpen, Compass } from "lucide-react";

export const Route = createFileRoute("/coach")({
  head: () => ({ meta: [{ title: "Career Coach — InterviewOS" }] }),
  component: CoachPage,
});

const goals = [
  { icon: Target, t: "Land Senior PM role", p: 68 },
  { icon: BookOpen, t: "Master system design", p: 42 },
  { icon: Compass, t: "Build personal brand", p: 25 },
];

function CoachPage() {
  return (
    <PageShell title="Career Coach" subtitle="Personalized guidance to compound your career growth.">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2"><AIChat title="1:1 with Coach AI" /></div>
        <div className="space-y-4">
          <GlassCard title="Active Goals">
            <div className="space-y-4">
              {goals.map(({ icon: Icon, t, p }) => (
                <div key={t}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className="size-4 text-[oklch(0.78_0.18_270)]" />
                    <div className="text-sm font-medium flex-1">{t}</div>
                    <div className="text-xs text-muted-foreground">{p}%</div>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full gradient-brand transition-all" style={{ width: `${p}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
          <GlassCard title="Weekly Focus" subtitle="Curated by your coach">
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Read: "Staff Engineer's Path" — Ch. 4</li>
              <li>• Practice: 3 system design mocks</li>
              <li>• Reach out to 5 PMs on LinkedIn</li>
            </ul>
          </GlassCard>
        </div>
      </div>
    </PageShell>
  );
}
