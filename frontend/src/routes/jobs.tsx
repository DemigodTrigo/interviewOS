import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { StatCard } from "@/components/ui-kit/StatCard";
import {
  Briefcase,
  Send,
  CheckCircle2,
  Clock,
  Plus,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      {
        title:
          "Job Tracker — InterviewOS",
      },
    ],
  }),

  component: JobsPage,
});

const columns = [
  {
    key: "Saved",
    color: "oklch(0.7 0.03 260)",
  },

  {
    key: "Applied",
    color: "oklch(0.72 0.18 245)",
  },

  {
    key: "Interview",
    color: "oklch(0.68 0.22 285)",
  },

  {
    key: "Offer",
    color: "oklch(0.74 0.17 155)",
  },
] as const;

function JobsPage() {
  const [jobs, setJobs] = useState<any[]>(
    []
  );

  const fetchJobs = async () => {
    const {
      data,
      error,
    } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
    } else {
      setJobs(data || []);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const addJob = async () => {
    const company =
      prompt("Company name");

    const role =
      prompt("Role name");

    const status =
      prompt(
        "Status: Saved / Applied / Interview / Offer"
      ) || "Applied";

    const notes =
      prompt("Notes") || "";

    if (!company || !role) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } =
      await supabase
        .from("jobs")
        .insert({
          company,
          role,
          status,
          notes,
          user_id: user?.id,
        });

    if (error) {
      alert(error.message);
    } else {
      fetchJobs();
    }
  };

  return (
    <PageShell
      title="Job Tracker"
      subtitle="Visualize your pipeline. Stay on top of every opportunity."
      actions={
        <button
          onClick={addJob}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl gradient-brand text-white text-sm font-medium ring-glow"
        >
          <Plus className="size-4" />

          Add job
        </button>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Saved"
          value={
            jobs.filter(
              (j) =>
                j.status ===
                "Saved"
            ).length
          }
          delta="+3"
          icon={Briefcase}
        />

        <StatCard
          label="Applied"
          value={
            jobs.filter(
              (j) =>
                j.status ===
                "Applied"
            ).length
          }
          delta="+9"
          icon={Send}
        />

        <StatCard
          label="Interviews"
          value={
            jobs.filter(
              (j) =>
                j.status ===
                "Interview"
            ).length
          }
          delta="+2"
          icon={Clock}
        />

        <StatCard
          label="Offers"
          value={
            jobs.filter(
              (j) =>
                j.status ===
                "Offer"
            ).length
          }
          delta="+1"
          icon={CheckCircle2}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map((col) => (
          <GlassCard
            key={col.key}
            className="min-h-[320px]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full"
                  style={{
                    background:
                      col.color,
                  }}
                />

                <span className="font-semibold text-sm">
                  {col.key}
                </span>

                <span className="text-xs text-muted-foreground">
                  (
                  {
                    jobs.filter(
                      (job) =>
                        job.status ===
                        col.key
                    ).length
                  }
                  )
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {jobs
                .filter(
                  (job) =>
                    job.status ===
                    col.key
                )
                .map((job) => (
                  <div
                    key={job.id}
                    className="rounded-xl border border-white/10 bg-white/[4%] p-3 hover:bg-white/[7%] transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-lg gradient-brand grid place-items-center text-xs font-semibold text-white">
                        {
                          job.company?.[0]
                        }
                      </div>

                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">
                          {
                            job.company
                          }
                        </div>

                        <div className="text-xs text-muted-foreground truncate">
                          {job.role}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 text-xs gradient-text font-semibold">
                      {job.status}
                    </div>

                    {job.notes && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        {job.notes}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </PageShell>
  );
}