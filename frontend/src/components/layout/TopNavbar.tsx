import { Bell, Search, Settings } from "lucide-react";

export function TopNavbar() {
  return (
    <header className="sticky top-0 z-20 px-4 lg:px-6 pt-4">
      <div className="glass rounded-2xl flex items-center gap-3 px-4 py-3">
        <div className="flex-1 flex items-center gap-2 max-w-xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              placeholder="Search jobs, skills, prompts…"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="size-9 grid place-items-center rounded-xl bg-white/5 hover:bg-white/10 transition">
            <Bell className="size-4" />
          </button>
          <button className="size-9 grid place-items-center rounded-xl bg-white/5 hover:bg-white/10 transition">
            <Settings className="size-4" />
          </button>
          <div className="ml-2 flex items-center gap-2 pl-3 border-l border-white/10">
            <div className="size-9 rounded-xl gradient-brand grid place-items-center text-sm font-semibold">
              AK
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-medium leading-tight">Alex Kim</div>
              <div className="text-[11px] text-muted-foreground">Pro plan</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
