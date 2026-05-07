import { Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { GlassCard } from "./GlassCard";

type Msg = { role: "user" | "ai"; text: string };

export function AIChat({ title = "AI Career Coach" }: { title?: string }) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hi Alex 👋 — want me to review yesterday's mock interview or polish your resume bullets?" },
    { role: "user", text: "Help me sharpen my STAR answer for leadership questions." },
    { role: "ai", text: "Got it. Share the question and your draft answer — I'll restructure it with quantified impact." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: input },
      { role: "ai", text: "Analyzing your input… here's a tighter version with measurable outcomes." },
    ]);
    setInput("");
  };

  return (
    <GlassCard
      title={title}
      subtitle="GPT-powered, fine-tuned on 12k interviews"
      action={
        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10">
          <Sparkles className="size-3 text-[oklch(0.78_0.18_270)]" /> Online
        </span>
      }
    >
      <div className="space-y-3 h-72 overflow-y-auto pr-1">
        {messages.map((m, i) => (
          <div key={i} className={"flex " + (m.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={
                "max-w-[85%] text-sm rounded-2xl px-3.5 py-2.5 " +
                (m.role === "user"
                  ? "gradient-brand text-white rounded-br-sm"
                  : "bg-white/5 border border-white/10 rounded-bl-sm")
              }
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl pl-3 pr-1.5 py-1.5">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask anything about your career…"
          className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
        />
        <button
          onClick={send}
          className="size-8 grid place-items-center rounded-lg gradient-brand text-white hover:opacity-90 transition"
        >
          <Send className="size-3.5" />
        </button>
      </div>
    </GlassCard>
  );
}
