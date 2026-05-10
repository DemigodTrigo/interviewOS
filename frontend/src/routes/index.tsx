import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import {
  Briefcase,
  FileText,
  Mic,
  TrendingUp,
  Plus,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { PageShell } from "@/components/layout/PageShell";
import { StatCard } from "@/components/ui-kit/StatCard";
import { AreaChartCard } from "@/components/ui-kit/AreaChartCard";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { ScoreRing } from "@/components/ui-kit/ScoreRing";
import { AIChat } from "@/components/ui-kit/AIChat";

import { useAuth } from "@/hooks/useAuth";

import { getDashboardStats } from "@/lib/dashboard";

export const Route =
  createFileRoute("/")({
    component: Dashboard,
  });

function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] =
    useState<any>({
      totalInterviews: 0,
      averageScore: 0,
      recentInterviews: [],
      chartData: [],
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!user) return;

    async function loadStats() {
      const data =
        await getDashboardStats(
          user.id
        );

      console.log(
        "Dashboard Stats:",
        data
      );

      setStats(data);

      setLoading(false);
    }

    loadStats();
  }, [user]);

  return (
    <PageShell
      title={`Welcome back, ${
        user?.email || "User"
      } 👋`}
      subtitle="Here’s how your AI career engine is running today."
      actions={
        <Link
          to="/interview"
          className="inline-flex items-center gap-2 rounded-xl gradient-brand px-4 py-2 text-sm font-medium text-white"
        >
          <Plus className="size-4" />
          New mock interview
        </Link>
      }
    >
      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <StatCard
          label="Average Score"
          value={String(
            stats.averageScore
          )}
          delta="+4%"
          icon={FileText}
        />

        <StatCard
          label="Interviews"
          value={String(
            stats.totalInterviews
          )}
          delta="+12%"
          icon={Mic}
        />

        <StatCard
          label="Applications"
          value={String(
            stats.totalInterviews *
              3
          )}
          delta="+8%"
          icon={Briefcase}
        />

        <StatCard
          label="Response Rate"
          value={`${
            stats.totalInterviews > 0
              ? 82
              : 0
          }%`}
          delta="-2%"
          icon={TrendingUp}
          trend="down"
        />
      </div>

      {/* CHART */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">

        <div className="xl:col-span-2">
          <AreaChartCard
            data={
              stats.chartData
            }
          />
        </div>

        <GlassCard
          title="Skill Mastery"
          subtitle="AI-generated performance insights"
        >
          <div className="grid grid-cols-3 gap-2 place-items-center">

            <ScoreRing
              score={
                stats.averageScore || 92
              }
              label="Behavioral"
            />

            <ScoreRing
              score={78}
              label="System Design"
            />

            <ScoreRing
              score={84}
              label="Coding"
            />
          </div>
        </GlassCard>
      </div>

      {/* RECENT INTERVIEWS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">

        <div className="xl:col-span-2">

          <GlassCard
            title="Recent Interviews"
            subtitle="Your latest AI interview sessions"
          >
            <div className="divide-y divide-white/5">

              {stats.recentInterviews
                ?.length === 0 && (
                <div className="py-10 text-center text-muted-foreground">
                  No interviews yet.
                  Start your first AI mock interview 🚀
                </div>
              )}

              {stats.recentInterviews?.map(
                (item: any) => (
                  <Link
                    key={item.id}
                    to="/interview-details/$id"
                    params={{
                      id: item.id,
                    }}
                    className="flex items-center gap-4 py-4 hover:bg-white/5 transition rounded-xl px-3 cursor-pointer"
                  >
                    <div className="size-11 rounded-2xl bg-white/5 border border-white/10 grid place-items-center font-semibold">
                      {item.company?.[0] ||
                        "A"}
                    </div>

                    <div className="flex-1">
                      <div className="font-medium text-white">
                        {item.role} at{" "}
                        {item.company}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {
                          item.interview_type
                        }
                      </div>
                    </div>

                    <div className="text-lg font-bold gradient-text">
                      {item.score}
                    </div>
                  </Link>
                )
              )}
            </div>
          </GlassCard>
        </div>

        <AIChat />
      </div>
    </PageShell>
  );
}