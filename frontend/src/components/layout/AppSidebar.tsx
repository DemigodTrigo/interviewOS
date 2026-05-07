import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, FileText, Mic, Briefcase, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/resume", label: "Resume Analyzer", icon: FileText },
  { to: "/interview", label: "Interview Simulator", icon: Mic },
  { to: "/jobs", label: "Job Tracker", icon: Briefcase },
  { to: "/coach", label: "Career Coach", icon: Sparkles },
] as const;

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 z-30 w-64 flex-col p-4">
      <div className="glass rounded-2xl flex-1 flex flex-col p-4">
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="size-9 rounded-xl gradient-brand grid place-items-center ring-glow">
            <Zap className="size-5 text-white" />
          </div>
          <div>
            <div className="font-display text-lg font-semibold leading-none">InterviewOS</div>
            <div className="text-[11px] text-muted-foreground mt-1">AI Career Suite</div>
          </div>
        </div>

        <nav className="mt-6 flex flex-col gap-1">
          {items.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? path === "/" : path.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                  active
                    ? "bg-white/5 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                )}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full gradient-brand" />
                )}
                <Icon className={cn("size-4", active && "text-[oklch(0.78_0.18_270)]")} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto glass-strong rounded-xl p-4 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 size-32 rounded-full gradient-brand opacity-30 blur-2xl" />
          <div className="relative">
            <div className="text-sm font-semibold">Upgrade to Pro</div>
            <p className="text-xs text-muted-foreground mt-1">
              Unlock unlimited mock interviews & deeper AI feedback.
            </p>
            <button className="mt-3 w-full text-xs font-medium py-2 rounded-lg gradient-brand text-white ring-glow hover:opacity-95 transition">
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
