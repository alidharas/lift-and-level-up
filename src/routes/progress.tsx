import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/Shell";
import { byId } from "@/lib/exercises";
import { topWeight, useSessions } from "@/lib/store";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress — Lift Log" },
      { name: "description", content: "See your top weights climb over time." },
      { property: "og:title", content: "Progress — Lift Log" },
      { property: "og:description", content: "See your top weights climb over time." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const { sessions } = useSessions();
  const series = useMemo(() => {
    const m = new Map<string, { date: string; w: number }[]>();
    [...sessions].reverse().forEach((s) =>
      s.entries.forEach((e) => {
        const arr = m.get(e.exerciseId) ?? [];
        arr.push({ date: s.date, w: topWeight(e.sets) });
        m.set(e.exerciseId, arr);
      }),
    );
    return [...m.entries()];
  }, [sessions]);
  const [sel, setSel] = useState<string | null>(null);
  const active = series.find(([id]) => id === sel) ?? series[0];

  return (
    <Shell>
      <h1 className="font-display px-5 pt-10 text-6xl">Progress</h1>
      {!active ? (
        <p className="px-5 pt-4 text-muted-foreground">Finish a workout to start seeing your progress.</p>
      ) : (
        <div className="px-5 pt-4">
          <select className="input-lift w-full" value={active[0]} onChange={(e) => setSel(e.target.value)}>
            {series.map(([id]) => <option key={id} value={id}>{byId(id)?.name ?? id}</option>)}
          </select>
          <div className="card-lift mt-4 p-4">
            <Chart points={active[1]} />
          </div>
          <h2 className="font-display mt-8 text-3xl">Personal bests</h2>
          <ul className="mt-2 divide-y divide-border">
            {series.map(([id, pts]) => {
              const best = Math.max(...pts.map((p) => p.w));
              const diff = (pts.at(-1)?.w ?? 0) - (pts[0]?.w ?? 0);
              return (
                <li key={id} className="flex items-center justify-between py-3">
                  <button className="text-left" onClick={() => setSel(id)}>{byId(id)?.name ?? id}</button>
                  <span className="text-right">
                    <span className="font-display text-2xl">{best} kg</span>
                    {pts.length > 1 && (
                      <span className={`ml-2 text-xs ${diff >= 0 ? "text-primary" : "text-destructive"}`}>{diff >= 0 ? "+" : ""}{diff}</span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </Shell>
  );
}

function Chart({ points }: { points: { date: string; w: number }[] }) {
  const W = 320, H = 160, P = 24;
  const max = Math.max(...points.map((p) => p.w), 1);
  const min = Math.min(...points.map((p) => p.w), 0);
  const x = (i: number) => P + (points.length === 1 ? (W - 2 * P) / 2 : (i * (W - 2 * P)) / (points.length - 1));
  const y = (v: number) => H - P - ((v - min) / (max - min || 1)) * (H - 2 * P);
  const d = points.map((p, i) => `${i ? "L" : "M"}${x(i)},${y(p.w)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <path d={d} fill="none" stroke="var(--primary)" strokeWidth={3} strokeLinejoin="round" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(p.w)} r={4} fill="var(--primary)" />
          <text x={x(i)} y={y(p.w) - 10} textAnchor="middle" fontSize={10} fill="var(--foreground)">{p.w}</text>
          <text x={x(i)} y={H - 6} textAnchor="middle" fontSize={9} fill="var(--muted-foreground)">
            {new Date(p.date).toLocaleDateString([], { day: "numeric", month: "short" })}
          </text>
        </g>
      ))}
    </svg>
  );
}
