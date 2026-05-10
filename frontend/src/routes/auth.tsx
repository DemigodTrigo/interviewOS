import { createFileRoute } from "@tanstack/react-router";

import { useState } from "react";

import {
  ArrowRight,
  BrainCircuit,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export const Route =
  createFileRoute("/auth")({
    component: AuthPage,
  });

function AuthPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSignup =
    async () => {
      setLoading(true);

      const { error } =
        await supabase.auth.signUp({
          email,
          password,
        });

      setLoading(false);

      if (error) {
        alert(error.message);
      } else {
        window.location.href =
          "/";
      }
    };

  const handleLogin =
    async () => {
      setLoading(true);

      const { error } =
        await supabase.auth.signInWithPassword(
          {
            email,
            password,
          }
        );

      setLoading(false);

      if (error) {
        alert(error.message);
      } else {
        window.location.href =
          "/";
      }
    };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* GLOW */}
      <div className="absolute top-[-120px] left-[-120px] h-[350px] w-[350px] rounded-full bg-purple-600/30 blur-[120px]" />

      <div className="absolute bottom-[-120px] right-[-120px] h-[350px] w-[350px] rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="relative z-10 flex min-h-screen">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-1 flex-col justify-center px-20">

          <div className="max-w-xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-xl">
              <Sparkles className="size-4 text-purple-400" />
              AI-Powered Career Platform
            </div>

            <h1 className="mt-8 text-6xl font-bold leading-tight">
              Crack Your
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {" "}
                Dream Job
              </span>
            </h1>

            <p className="mt-6 text-lg text-zinc-400 leading-8">
              Practice mock interviews, analyze resumes,
              track applications, and receive AI-powered
              feedback built for modern engineers.
            </p>

            <div className="mt-10 space-y-5">

              <div className="flex items-center gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <BrainCircuit className="size-6 text-purple-400" />
                </div>

                <div>
                  <div className="font-semibold">
                    AI Interview Simulator
                  </div>

                  <div className="text-sm text-zinc-400">
                    Real-time coding, behavioral & system design interviews.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <ShieldCheck className="size-6 text-blue-400" />
                </div>

                <div>
                  <div className="font-semibold">
                    Smart Career Analytics
                  </div>

                  <div className="text-sm text-zinc-400">
                    Track scores, progress, strengths & weaknesses.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-1 items-center justify-center px-6 py-12">

          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

            <div className="mb-8">

              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-xl font-bold shadow-2xl shadow-purple-500/20">
                IO
              </div>

              <h2 className="text-4xl font-bold">
                Welcome Back
              </h2>

              <p className="mt-2 text-zinc-400">
                Login to continue your AI interview journey.
              </p>
            </div>

            <div className="space-y-5">

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                />
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 py-4 font-semibold transition hover:scale-[1.02]"
              >
                {loading
                  ? "Loading..."
                  : "Login"}

                <ArrowRight className="size-4" />
              </button>

              <button
                onClick={handleSignup}
                disabled={loading}
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 font-semibold transition hover:bg-white/10"
              >
                Create Account
              </button>
            </div>

            <div className="mt-8 text-center text-sm text-zinc-500">
              Powered by AI • Built for Engineers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}