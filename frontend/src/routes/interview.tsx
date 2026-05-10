import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/layout/PageShell";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { ScoreRing } from "@/components/ui-kit/ScoreRing";

import {
  Mic,
  Play,
  Code,
  Users,
  Brain,
  Plus,
  Send,
  X,
} from "lucide-react";

import {
  useState,
  useEffect,
} from "react";

import { askInterviewQuestion } from "@/lib/interviewAI";
import { evaluateAnswer } from "@/lib/evaluateAnswer";
import { saveInterview } from "@/lib/interviews";

import { useAuth } from "@/hooks/useAuth";


export const Route =
  createFileRoute("/interview")({
    component: InterviewPage,
  });

const tracks = [
  {
    icon: Users,
    name: "Behavioral",
    q: 32,
    color: "oklch(0.68 0.22 285)",
  },

  {
    icon: Code,
    name: "Coding",
    q: 120,
    color: "oklch(0.72 0.18 245)",
  },

  {
    icon: Brain,
    name: "System Design",
    q: 18,
    color: "oklch(0.78 0.16 200)",
  },
];

function InterviewPage() {
  const { user } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [feedback, setFeedback] =
    useState<any>(null);

  const [isListening, setIsListening] =
    useState(false);

  const [showSetup, setShowSetup] =
    useState(false);

  const [
    interviewConfig,
    setInterviewConfig,
  ] = useState({
    company: "Google",
    role: "Backend Engineer",
    type: "Behavioral",
    duration: "45 mins",
  });

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  const speak = (text: string) => {
    speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        text
      );

    utterance.lang = "en-US";

    speechSynthesis.speak(
      utterance
    );
  };

  const generateQuestion =
    async () => {
      try {
        setLoading(true);

        setQuestion("");
        setAnswer("");
        setFeedback(null);

        const prompt = `
Company: ${interviewConfig.company}

Role: ${interviewConfig.role}

Interview Type: ${interviewConfig.type}

Generate one realistic interview question.
`;

        const result =
          await askInterviewQuestion(
            prompt
          );

        setQuestion(result);

        speak(result);

        setShowSetup(false);
      } catch (err) {
        console.error(err);

        alert(
          "Question generation failed"
        );
      }

      setLoading(false);
    };

  const submitAnswer = async (
    finalAnswer: string
  ) => {
    if (!finalAnswer.trim()) {
      alert("Please enter answer");

      return;
    }

    try {
      setLoading(true);

      const result =
        await evaluateAnswer(
          question,
          finalAnswer
        );

      setFeedback(result);

      if (user?.id) {
        await saveInterview({
          user_id: user.id,

          company:
            interviewConfig.company,

          role:
            interviewConfig.role,

          interview_type:
            interviewConfig.type,

          duration:
            interviewConfig.duration,

          question,

          answer: finalAnswer,

          feedback:
            result.summary,

          score:
            Number(result.score),

          analytics: {
            clarity:
              result.clarity,

            technical:
              result.technical,

            communication:
              result.communication,
          },
        });
      }

      speak(result.summary);
    } catch (err) {
      console.error(err);

      alert("Evaluation failed");
    }

    setLoading(false);
  };

  const startListening = () => {
    const SpeechRecognition =
      (window as any)
        .SpeechRecognition ||
      (window as any)
        .webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech recognition unsupported"
      );

      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.onresult =
      async (event: any) => {
        const transcript =
          event.results[0][0]
            .transcript;

        setAnswer(transcript);

        await submitAnswer(
          transcript
        );
      };

    recognition.start();
  };

  return (
    <PageShell
      title="Interview Simulator"
      subtitle="Practice live with AI interviewer."
      actions={
        <button
          onClick={() =>
            setShowSetup(true)
          }
          className="inline-flex items-center gap-2 rounded-xl gradient-brand px-4 py-2 text-sm font-medium text-white"
        >
          <Plus className="size-4" />
          New Mock Interview
        </button>
      }
    >
      {/* MODAL */}
      {showSetup && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0B1020] p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Create Interview
              </h2>

              <button
                onClick={() =>
                  setShowSetup(false)
                }
              >
                <X className="size-5 text-white" />
              </button>
            </div>

            <div className="space-y-4">

              <input
                placeholder="Company"
                value={
                  interviewConfig.company
                }
                onChange={(e) =>
                  setInterviewConfig({
                    ...interviewConfig,
                    company:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white"
              />

              <input
                placeholder="Role"
                value={
                  interviewConfig.role
                }
                onChange={(e) =>
                  setInterviewConfig({
                    ...interviewConfig,
                    role:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white"
              />

              <select
                value={
                  interviewConfig.type
                }
                onChange={(e) =>
                  setInterviewConfig({
                    ...interviewConfig,
                    type:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white"
              >
                <option>
                  Behavioral
                </option>

                <option>
                  Coding
                </option>

                <option>
                  System Design
                </option>
              </select>

              <button
                onClick={
                  generateQuestion
                }
                className="w-full rounded-xl gradient-brand py-3 text-white font-medium"
              >
                {loading
                  ? "Generating..."
                  : "Start Interview"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <GlassCard>
        <div className="grid lg:grid-cols-2 gap-6 items-center">

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
              Live AI Interviewer
            </div>

            <h2 className="mt-5 text-4xl font-bold text-white">
              {interviewConfig.role} at{" "}
              {interviewConfig.company}
            </h2>

            <p className="mt-2 text-muted-foreground">
              {
                interviewConfig.duration
              }{" "}
              ·{" "}
              {
                interviewConfig.type
              }{" "}
              Interview
            </p>

            <div className="mt-6 flex gap-3">

              <button
                onClick={
                  generateQuestion
                }
                className="rounded-xl gradient-brand px-5 py-3 text-white"
              >
                <Play className="size-4 inline mr-2" />

                Start Session
              </button>

              <button
                onClick={
                  startListening
                }
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white"
              >
                <Mic className="size-4 inline mr-2" />

                Voice Answer
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">

            <ScoreRing
              score={
                feedback?.clarity ||
                91
              }
              label="Clarity"
            />

            <ScoreRing
              score={
                feedback?.technical ||
                84
              }
              label="Technical"
            />

            <ScoreRing
              score={
                feedback?.communication ||
                76
              }
              label="Communication"
            />
          </div>
        </div>
      </GlassCard>

      {/* TRACKS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tracks.map(
          ({
            icon: Icon,
            name,
            q,
          }) => (
            <GlassCard key={name}>
              <div className="flex items-center gap-3">
                <Icon className="size-5 text-violet-400" />

                <div>
                  <div className="font-semibold">
                    {name}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {q} questions
                  </div>
                </div>
              </div>
            </GlassCard>
          )
        )}
      </div>

      {/* QUESTION */}
      {question && (
        <GlassCard title="Question">
          <div className="leading-7 text-white">
            {question}
          </div>
        </GlassCard>
      )}

      {/* ANSWER */}
      {question && (
        <GlassCard title="Your Answer">

          <textarea
            value={answer}
            onChange={(e) =>
              setAnswer(
                e.target.value
              )
            }
            className="w-full min-h-[200px] rounded-2xl border border-white/10 bg-white/5 p-4 text-white"
          />

          <div className="mt-4 flex justify-end">
            <button
              onClick={() =>
                submitAnswer(answer)
              }
              className="rounded-xl gradient-brand px-5 py-3 text-white"
            >
              <Send className="size-4 inline mr-2" />

              Submit Answer
            </button>
          </div>
        </GlassCard>
      )}

      {/* FEEDBACK */}
      {feedback && (
        <GlassCard title="AI Feedback">
          <div className="space-y-6">

            <div className="text-5xl font-bold gradient-text">
              {feedback.score}/100
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                Summary
              </h3>

              <p className="text-white/80 leading-7">
                {feedback.summary}
              </p>
            </div>
          </div>
        </GlassCard>
      )}
    </PageShell>
  );
}