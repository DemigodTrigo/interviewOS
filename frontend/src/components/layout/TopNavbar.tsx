import { useState } from "react";
import {
  Bell,
  Search,
  Settings,
  LogOut,
  User,
  Briefcase,
  FileText,
  Mic,
} from "lucide-react";

import { useNavigate } from "@tanstack/react-router";

import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

export function TopNavbar() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  const userName =
    user?.email?.split("@")[0] || "User";

  const initials =
    userName.slice(0, 2).toUpperCase();

  const handleSearch = () => {
    const value = search.toLowerCase();

    if (value.includes("resume")) {
      navigate({ to: "/resume" });
    } else if (value.includes("interview")) {
      navigate({ to: "/interview" });
    } else if (value.includes("job")) {
      navigate({ to: "/jobs" });
    } else {
      navigate({ to: "/" });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  return (
    <>
      <header className="sticky top-0 z-20 px-4 lg:px-6 pt-4">
        <div className="glass rounded-2xl flex items-center gap-3 px-4 py-3 border border-white/10 backdrop-blur-xl">
          
          {/* SEARCH */}
          <div className="flex-1 flex items-center gap-2 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search jobs, skills, prompts..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2">

            {/* NOTIFICATIONS */}
            <button
              className="size-9 grid place-items-center rounded-xl bg-white/5 hover:bg-white/10 transition"
              onClick={() =>
                alert("Notifications coming soon 🚀")
              }
            >
              <Bell className="size-4" />
            </button>

            {/* SETTINGS */}
            <button
              onClick={() =>
                setShowSettings(!showSettings)
              }
              className="size-9 grid place-items-center rounded-xl bg-white/5 hover:bg-white/10 transition"
            >
              <Settings className="size-4" />
            </button>

            {/* USER */}
            <div className="ml-2 flex items-center gap-2 pl-3 border-l border-white/10">
              <div className="size-9 rounded-xl gradient-brand grid place-items-center text-sm font-semibold">
                {initials}
              </div>

              <div className="hidden sm:block">
                <div className="text-sm font-medium leading-tight">
                  {userName}
                </div>

                <div className="text-[11px] text-muted-foreground">
                  AI Career Suite
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SETTINGS MODAL */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0B1020] p-6 shadow-2xl">
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Settings
              </h2>

              <button
                onClick={() =>
                  setShowSettings(false)
                }
                className="text-sm text-muted-foreground hover:text-white"
              >
                Close
              </button>
            </div>

            {/* USER INFO */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 mb-5">
              <div className="flex items-center gap-3">
                
                <div className="size-12 rounded-2xl gradient-brand grid place-items-center font-bold">
                  {initials}
                </div>

                <div>
                  <div className="font-medium">
                    {userName}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {user?.email}
                  </div>
                </div>
              </div>
            </div>

            {/* SETTINGS ITEMS */}
            <div className="space-y-3">

              <button
                onClick={() => navigate({ to: "/" })}
                className="w-full flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition"
              >
                <User className="size-4" />
                Dashboard
              </button>

              <button
                onClick={() =>
                  navigate({ to: "/resume" })
                }
                className="w-full flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition"
              >
                <FileText className="size-4" />
                Resume Analyzer
              </button>

              <button
                onClick={() =>
                  navigate({ to: "/interview" })
                }
                className="w-full flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition"
              >
                <Mic className="size-4" />
                Interview Simulator
              </button>

              <button
                onClick={() =>
                  navigate({ to: "/jobs" })
                }
                className="w-full flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition"
              >
                <Briefcase className="size-4" />
                Job Tracker
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-400 hover:bg-red-500/20 transition"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}