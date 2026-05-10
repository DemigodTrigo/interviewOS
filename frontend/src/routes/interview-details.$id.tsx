import {
    createFileRoute,
  } from "@tanstack/react-router";
  
  import {
    useEffect,
    useState,
  } from "react";
  
  import { PageShell } from "@/components/layout/PageShell";
  import { GlassCard } from "@/components/ui-kit/GlassCard";
  
  import {
    getInterviewById,
  } from "@/lib/interviews";
  
  export const Route =
    createFileRoute(
      "/interview-details/$id"
    )({
      component:
        InterviewDetailsPage,
    });
  
  function InterviewDetailsPage() {
    const { id } =
      Route.useParams();
  
    const [interview, setInterview] =
      useState<any>(null);
  
    const [loading, setLoading] =
      useState(true);
  
    useEffect(() => {
      async function load() {
        const data =
          await getInterviewById(id);
  
        setInterview(data);
  
        setLoading(false);
      }
  
      load();
    }, [id]);
  
    if (loading) {
      return (
        <PageShell title="Loading...">
          <div className="text-muted-foreground">
            Loading interview...
          </div>
        </PageShell>
      );
    }
  
    if (!interview) {
      return (
        <PageShell title="Not Found">
          <div className="text-muted-foreground">
            Interview not found.
          </div>
        </PageShell>
      );
    }
  
    return (
      <PageShell
        title={`${interview.role} at ${interview.company}`}
        subtitle={`${interview.interview_type} • ${interview.duration}`}
      >
        <div className="grid gap-5">
          <GlassCard>
            <h2 className="text-xl font-semibold mb-3">
              Score
            </h2>
  
            <div className="text-6xl font-bold gradient-text">
              {interview.score}/100
            </div>
          </GlassCard>
  
          <GlassCard>
            <h2 className="text-xl font-semibold mb-3">
              Interview Question
            </h2>
  
            <p className="text-muted-foreground whitespace-pre-wrap leading-7">
              {interview.question}
            </p>
          </GlassCard>
  
          <GlassCard>
            <h2 className="text-xl font-semibold mb-3">
              Your Answer
            </h2>
  
            <p className="text-muted-foreground whitespace-pre-wrap leading-7">
              {interview.answer}
            </p>
          </GlassCard>
  
          <GlassCard>
            <h2 className="text-xl font-semibold mb-3">
              AI Feedback
            </h2>
  
            <p className="text-muted-foreground whitespace-pre-wrap leading-7">
              {interview.feedback}
            </p>
          </GlassCard>
  
          {interview.analytics && (
            <GlassCard>
              <h2 className="text-xl font-semibold mb-3">
                AI Analytics
              </h2>
  
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass rounded-2xl p-4">
                  <div className="text-sm text-muted-foreground">
                    Clarity
                  </div>
  
                  <div className="text-3xl font-bold">
                    {
                      interview.analytics
                        .clarity
                    }
                  </div>
                </div>
  
                <div className="glass rounded-2xl p-4">
                  <div className="text-sm text-muted-foreground">
                    Technical
                  </div>
  
                  <div className="text-3xl font-bold">
                    {
                      interview.analytics
                        .technical
                    }
                  </div>
                </div>
  
                <div className="glass rounded-2xl p-4">
                  <div className="text-sm text-muted-foreground">
                    Communication
                  </div>
  
                  <div className="text-3xl font-bold">
                    {
                      interview.analytics
                        .communication
                    }
                  </div>
                </div>
              </div>
            </GlassCard>
          )}
        </div>
      </PageShell>
    );
  }