import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { GlassCard } from "@/components/ui-kit/GlassCard";
import { PageShell } from "@/components/layout/PageShell";

import { getRecentInterviews } from "@/lib/interviews";
import { useAuth } from "@/hooks/useAuth";

export const Route =
  createFileRoute("/history")({
    component: HistoryPage,
  });

function HistoryPage() {
  const { user } = useAuth();

  const [interviews, setInterviews] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!user?.id) return;

    async function load() {
      setLoading(true);

      const data =
        await getRecentInterviews(
          user.id
        );

      setInterviews(data);

      setLoading(false);
    }

    load();
  }, [user]);

  return (
    <PageShell
      title="Interview History"
      subtitle="Track all your AI interview sessions."
    >
      <GlassCard>
        {loading ? (
          <div className="py-10 text-center text-muted-foreground">
            Loading interviews...
          </div>
        ) : interviews.length === 0 ? (
          <div className="py-10 text-center text-muted-foreground">
            No interviews found.
          </div>
        ) : (
          <div className="space-y-4">
            {interviews.map(
              (item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {item.role} at{" "}
                        {item.company}
                      </h2>

                      <p className="text-sm text-muted-foreground">
                        {
                          item.interview_type
                        }{" "}
                        • {item.duration}
                      </p>
                    </div>

                    <div className="text-3xl font-bold gradient-text">
                      {item.score}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-medium text-white mb-2">
                      Question
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {item.question}
                    </p>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-medium text-white mb-2">
                      Your Answer
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {item.answer}
                    </p>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-medium text-white mb-2">
                      AI Feedback
                    </h3>

                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {item.feedback}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </GlassCard>
    </PageShell>
  );
}