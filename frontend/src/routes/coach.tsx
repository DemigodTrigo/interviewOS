import { createFileRoute } from "@tanstack/react-router";

import {
  useState,
} from "react";

import { PageShell } from "@/components/layout/PageShell";

import { GlassCard } from "@/components/ui-kit/GlassCard";

import {
  Target,
  BookOpen,
  Compass,
} from "lucide-react";

import { askCareerCoach } from "@/lib/careerCoach";

export const Route =
  createFileRoute("/coach")({
    head: () => ({
      meta: [
        {
          title:
            "Career Coach — InterviewOS",
        },
      ],
    }),

    component: CoachPage,
  });

const goals = [
  {
    icon: Target,
    t: "Land Senior PM role",
    p: 68,
  },

  {
    icon: BookOpen,
    t: "Master system design",
    p: 42,
  },

  {
    icon: Compass,
    t: "Build personal brand",
    p: 25,
  },
];

function CoachPage() {
  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState<
      {
        role: string;
        content: string;
      }[]
    >([
      {
        role: "assistant",
        content:
          "Hi 👋 I'm your AI Career Coach. Ask me anything about resumes, interviews, GenAI careers, backend engineering, salary negotiation, or roadmap planning.",
      },
    ]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setMessage("");

    try {
      setLoading(true);

      const result =
        await askCareerCoach(
          message
        );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            result ||
            "No response",
        },
      ]);

    } catch (error) {
      console.error(error);

      alert(
        "AI Coach failed"
      );
    }

    setLoading(false);
  };

  return (
    <PageShell
      title="Career Coach"
      subtitle="Personalized guidance to compound your career growth."
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <GlassCard
            title="1:1 with Coach AI"
            className="min-h-[650px] flex flex-col"
          >
            <div className="flex-1 space-y-4 overflow-y-auto pr-2">
              {messages.map(
                (
                  msg,
                  index
                ) => (
                  <div
                    key={index}
                    className={
                      msg.role ===
                      "user"
                        ? "ml-auto max-w-[80%] rounded-2xl bg-[oklch(0.68_0.22_285)] text-white px-4 py-3"
                        : "max-w-[80%] rounded-2xl bg-white/5 border border-white/10 text-white px-4 py-3"
                    }
                  >
                    <div className="whitespace-pre-wrap text-sm leading-7">
                      {
                        msg.content
                      }
                    </div>
                  </div>
                )
              )}

              {loading && (
                <div className="max-w-[80%] rounded-2xl bg-white/5 border border-white/10 text-white px-4 py-3">
                  AI Coach is typing...
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-3">
              <input
                type="text"
                placeholder="Ask your AI career coach anything..."
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target
                      .value
                  )
                }
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
              />

              <button
                onClick={
                  sendMessage
                }
                className="px-5 py-3 rounded-xl gradient-brand text-white font-medium"
              >
                Send
              </button>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-4">
          <GlassCard title="Active Goals">
            <div className="space-y-4">
              {goals.map(
                ({
                  icon: Icon,
                  t,
                  p,
                }) => (
                  <div key={t}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="size-4 text-[oklch(0.78_0.18_270)]" />

                      <div className="text-sm font-medium flex-1">
                        {t}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {p}%
                      </div>
                    </div>

                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full gradient-brand transition-all"
                        style={{
                          width: `${p}%`,
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </GlassCard>

          <GlassCard
            title="Weekly Focus"
            subtitle="Curated by your coach"
          >
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>
                • Read:
                "Staff Engineer's
                Path" — Ch. 4
              </li>

              <li>
                • Practice: 3
                system design
                mocks
              </li>

              <li>
                • Reach out to
                5 PMs on
                LinkedIn
              </li>
            </ul>
          </GlassCard>
        </div>
      </div>
    </PageShell>
  );
}