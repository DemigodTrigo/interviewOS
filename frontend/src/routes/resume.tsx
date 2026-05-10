import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { ScoreRing } from "@/components/ui-kit/ScoreRing";

import {
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Brain,
  Target,
  XCircle,
} from "lucide-react";

import { useState } from "react";

import { supabase } from "@/lib/supabase";

import pdfToText from "react-pdftotext";

import { analyzeResume } from "@/lib/analyzeResume";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      {
        title:
          "Resume Analyzer — InterviewOS",
      },
    ],
  }),

  component: ResumePage,
});

function ResumePage() {
  const [uploading, setUploading] =
    useState(false);

  const [analysis, setAnalysis] =
    useState("");

  const [atsScore, setAtsScore] =
    useState(0);

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file =
        event.target.files?.[0];

      if (!file) return;

      setUploading(true);

      const fileName = `${Date.now()}-${file.name}`;

      const { error } =
        await supabase.storage
          .from("resumes")
          .upload(fileName, file);

      if (error) {
        alert(error.message);

        setUploading(false);

        return;
      }

      const extractedText =
        await pdfToText(file);

      const aiResult =
        await analyzeResume(
          extractedText
        );

      setAnalysis(
        aiResult ||
          "No analysis returned."
      );

      const scoreMatch =
        aiResult?.match(
          /ATS Score:\s*(\d+)/i
        );

      if (scoreMatch) {
        setAtsScore(
          Number(scoreMatch[1])
        );
      }

      alert(
        "Resume analyzed successfully"
      );
    } catch (err) {
      console.error(err);

      alert(
        "Resume analysis failed"
      );
    }

    setUploading(false);
  };

  return (
    <PageShell
      title="Resume Analyzer"
      subtitle="AI-powered ATS scoring and rewrite suggestions."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Upload Card */}
        <GlassCard
          title="Resume Upload"
          subtitle="Upload your PDF resume for ATS analysis"
          className="lg:col-span-2"
        >
          <label className="relative block rounded-3xl border border-white/10 bg-white/[3%] hover:bg-white/[5%] hover:border-violet-500/30 transition-all p-16 text-center cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5" />

            <input
              type="file"
              accept=".pdf"
              onChange={handleUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-5">
                <Sparkles className="w-10 h-10 text-violet-400" />
              </div>

              <div className="text-2xl font-bold">
                Drop your resume here
              </div>

              <div className="text-sm text-muted-foreground mt-3">
                or click to browse •
                PDF only
              </div>
            </div>
          </label>

          {uploading && (
            <div className="mt-6">
              <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full w-1/2 animate-pulse bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
              </div>

              <p className="mt-3 text-sm text-muted-foreground">
                AI is analyzing your
                resume...
              </p>
            </div>
          )}
        </GlassCard>

        {/* ATS Score */}
        <GlassCard
          title="ATS Score"
          subtitle="AI-powered resume quality"
        >
          <div className="flex flex-col items-center justify-center h-full">
            <ScoreRing
              score={atsScore || 0}
              label="ATS Match"
            />

            <div className="mt-6 w-full space-y-3">
              {[
                {
                  ok:
                    atsScore >= 75,
                  t: "Good technical relevance",
                },

                {
                  ok:
                    atsScore >= 80,
                  t: "Strong project impact",
                },

                {
                  ok:
                    atsScore >= 85,
                  t: "ATS optimized formatting",
                },
              ].map((i, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm"
                >
                  {i.ok ? (
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  )}

                  <span>
                    {i.t}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* AI VISUAL SECTION */}
      {analysis && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-6">
          {/* Full AI Report */}
          <GlassCard
            title="AI Resume Intelligence"
            subtitle="Detailed ATS analysis"
            className="xl:col-span-2"
          >
            <div className="rounded-3xl border border-white/10 bg-white/[3%] p-6 whitespace-pre-wrap leading-8 text-sm text-muted-foreground overflow-auto max-h-[600px]">
              {analysis}
            </div>
          </GlassCard>

          {/* Strengths */}
          <GlassCard
            title="Resume Strengths"
            subtitle="What stands out positively"
          >
            <div className="space-y-4">
              {[
                "Strong backend engineering foundation",
                "Good AI integration projects",
                "Modern tech stack exposure",
                "Solid microservices experience",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-4 rounded-2xl border border-green-500/10 bg-green-500/5"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-1" />

                  <p className="text-sm text-muted-foreground leading-7">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Weaknesses */}
          <GlassCard
            title="Improvement Areas"
            subtitle="Things to improve for higher ATS"
          >
            <div className="space-y-4">
              {[
                "Add stronger cloud keywords",
                "Include measurable metrics",
                "Improve ATS keyword density",
                "Add DevOps terminology",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-4 rounded-2xl border border-red-500/10 bg-red-500/5"
                >
                  <XCircle className="w-5 h-5 text-red-400 mt-1" />

                  <p className="text-sm text-muted-foreground leading-7">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Improved Bullets */}
          <GlassCard
            title="AI Resume Rewrites"
            subtitle="Recruiter-friendly bullet improvements"
            className="xl:col-span-2"
          >
            <div className="grid gap-4">
              {[
                {
                  before:
                    "Worked on backend services",
                  after:
                    "Architected scalable microservices reducing API response latency by 40%",
                },

                {
                  before:
                    "Built AI interview app",
                  after:
                    "Developed AI-powered interview preparation platform using React, Groq APIs and Supabase",
                },

                {
                  before:
                    "Used Java and Spring Boot",
                  after:
                    "Built enterprise-grade REST APIs using Java Spring Boot and microservices architecture",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-white/[3%] p-5 hover:border-violet-500/20 transition-all"
                >
                  <div className="text-xs text-muted-foreground line-through mb-3">
                    {item.before}
                  </div>

                  <div className="flex gap-3">
                    <Sparkles className="w-5 h-5 text-violet-400 mt-1" />

                    <div className="leading-7 text-sm">
                      {item.after}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Interview Readiness */}
          <GlassCard
            title="Interview Readiness"
            subtitle="AI confidence assessment"
            className="xl:col-span-2"
          >
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title:
                    "Backend Engineering",
                  value: "Strong",
                  icon: Brain,
                },

                {
                  title:
                    "System Design",
                  value: "Moderate",
                  icon: Target,
                },

                {
                  title:
                    "AI Engineering",
                  value: "Strong",
                  icon: Sparkles,
                },
              ].map(
                (
                  item,
                  index
                ) => {
                  const Icon =
                    item.icon;

                  return (
                    <div
                      key={index}
                      className="rounded-3xl border border-white/10 bg-white/[3%] p-6"
                    >
                      <Icon className="w-8 h-8 text-violet-400 mb-4" />

                      <div className="text-lg font-semibold">
                        {
                          item.title
                        }
                      </div>

                      <div className="text-sm text-muted-foreground mt-2">
                        {
                          item.value
                        }
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </GlassCard>
        </div>
      )}
    </PageShell>
  );
}