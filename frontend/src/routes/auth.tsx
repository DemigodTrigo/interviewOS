import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      window.location.href = "/";
    }
  };

  const handleLogin = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
  } else {
    window.location.href = "/";
  }
};

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl">
        <h1 className="text-3xl font-bold mb-6">
          InterviewOS Auth
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-zinc-800 mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-zinc-800 mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 py-3 rounded-lg mb-3"
        >
          Sign Up
        </button>

        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 py-3 rounded-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
}