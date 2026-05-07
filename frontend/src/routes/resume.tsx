import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { ScoreRing } from "@/components/ui-kit/ScoreRing";
import { CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import pdfToText from "react-pdftotext";
import { analyzeResume } from "@/lib/analyzeResume";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [{ title: "Resume Analyzer — InterviewOS" }],
  }),
  component: ResumePage,
});

function ResumePage() {
  const [uploading, setUploading] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [atsScore, setAtsScore] = useState(0);

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];

      if (!file) return;

      setUploading(true);

      // Upload to Supabase
      const fileName = `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("resumes")
        .upload(fileName, file);

      if (error) {
        alert(error.message);
        setUploading(false);
        return;
      }

      // Extract PDF text
      const extractedText = await pdfToText(file);

      console.log(extractedText);

      // Send to AI
      const aiResult = await analyzeResume(extractedText);

      setAnalysis(aiResult || "No analysis returned.");

      const scoreMatch = aiResult?.match(/ATS Score:\s*(\d+)/i);

      if (scoreMatch) {
        setAtsScore(Number(scoreMatch[1]));
      }

      alert("Resume analyzed successfully");
    } catch (err) {
      console.error(err);
      alert("Resume analysis failed");
    }

    setUploading(false);
  };

  return (
    <PageShell
      title="Resume Analyzer"
      subtitle="AI-powered ATS scoring and rewrite suggestions."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GlassCard
          title="Resume Upload"
          subtitle="Upload your PDF resume for ATS analysis"
        >
          <label className="relative block rounded-xl border-2 border-dashed border-white/15 hover:border-white/30 hover:bg-white/5 p-10 text-center cursor-pointer transition">
            <input
              type="file"
              accept=".pdf"
              onChange={handleUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            <div className="text-white text-lg font-medium">
              Drop your resume here
            </div>

            <div className="text-sm text-gray-400 mt-2">
              or click to browse • PDF only
            </div>
          </label>

          {uploading && (
            <p className="text-white mt-4">
              Analyzing resume with AI...
            </p>
          )}
        </GlassCard>

        <GlassCard
          title="Overall Score"
          subtitle="Benchmarked against 50k tech resumes"
        >
          <div className="flex items-center gap-6">
          <ScoreRing score={atsScore || 0} label="ATS Match" />

            <div className="space-y-2 text-sm flex-1">
              {[
                { ok: true, t: "Strong action verbs detected" },
                { ok: true, t: "Quantified impact in 8 bullets" },
                { ok: false, t: "Add keywords: Kubernetes, gRPC" },
                { ok: false, t: "Shorten summary to <60 words" },
              ].map((i, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  {i.ok ? (
                    <CheckCircle2 className="size-4 text-[oklch(0.82_0.17_155)] mt-0.5" />
                  ) : (
                    <AlertTriangle className="size-4 text-[oklch(0.82_0.17_80)] mt-0.5" />
                  )}

                  <span className={i.ok ? "" : "text-muted-foreground"}>
                    {i.t}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard
        title="AI Suggestions"
        subtitle="Tap to apply rewrites instantly"
      >
        {analysis && (
          <div className="mb-6 whitespace-pre-wrap text-sm text-white rounded-xl border border-white/10 bg-white/[3%] p-4">
            {analysis}
          </div>
        )}

        <div className="space-y-3">
          {[
            {
              b: "Led team of 5 engineers to ship feature",
              a: "Led 5-engineer team to ship checkout v2, lifting conversion 18% ($2.1M ARR).",
            },
            {
              b: "Worked on backend services",
              a: "Architected 12 Go microservices handling 40k RPS at p99 < 80ms.",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 p-4 bg-white/[3%]"
            >
              <div className="text-xs text-muted-foreground line-through">
                {s.b}
              </div>

              <div className="mt-2 flex items-start gap-2">
                <Sparkles className="size-4 text-[oklch(0.78_0.18_270)] mt-0.5" />

                <div className="text-sm">{s.a}</div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  );
}