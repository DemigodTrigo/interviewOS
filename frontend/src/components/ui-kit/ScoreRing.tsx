export function ScoreRing({ score, label }: { score: number; label: string }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative size-28">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90">
          <defs>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.68 0.22 285)" />
              <stop offset="100%" stopColor="oklch(0.72 0.18 245)" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r={r} stroke="oklch(1 0 0 / 8%)" strokeWidth="8" fill="none" />
          <circle
            cx="50"
            cy="50"
            r={r}
            stroke="url(#ringGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-2xl font-semibold font-display">{score}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">/100</div>
          </div>
        </div>
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
