import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/Shell";
import { byId } from "@/lib/exercises";
import { topWeight, useBodyWeight, useSessions } from "@/lib/store";
import { Trash2 } from "lucide-react";

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
  validateSearch: (s: Record<string, unknown>): { ex?: string } => ({ ex: typeof s.ex === "string" ? s.ex : undefined }),
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
  const { ex } = Route.useSearch();
  const [sel, setSel] = useState<string | null>(ex ?? null);
  const active = series.find(([id]) => id === sel) ?? series[0];

  return (
    <Shell>
      <h1 className="font-display px-5 pt-10 text-6xl">Progress</h1>
      <BodyWeightSection />
      <h2 className="font-display px-5 pt-8 text-3xl">By exercise</h2>
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

function BodyWeightSection() {
  const { entries, add, remove } = useBodyWeight();
  const [v, setV] = useState("");
  const last = entries.at(-1);
  const change = last && entries[0] ? +(last.kg - entries[0].kg).toFixed(1) : 0;
  const save = () => {
    const n = parseFloat(v);
    if (n > 0) { add(n); setV(""); }
  };
  return (
    <section className="px-5 pt-4">
      <div className="card-lift p-4">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-3xl">Body weight</h2>
          {last && (
            <span>
              <span className="font-display text-2xl">{last.kg} kg</span>
              {entries.length > 1 && <span className="ml-2 text-xs text-muted-foreground">{change >= 0 ? "+" : ""}{change} since start</span>}
            </span>
          )}
        </div>
        <div className="mt-3 flex gap-2">
          <input inputMode="decimal" className="input-lift flex-1" placeholder="Today's weight (kg)" value={v}
            onChange={(e) => setV(e.target.value)} onKeyDown={(e) => e.key === "Enter" && save()} />
          <button onClick={save} className="rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground">Log</button>
        </div>
        {entries.length > 0 && <div className="mt-4"><Chart points={entries.map((e) => ({ date: e.date, w: e.kg }))} /></div>}
        {entries.length > 0 && (
          <ul className="mt-2 max-h-40 divide-y divide-border overflow-y-auto text-sm">
            {[...entries].reverse().map((e) => (
              <li key={e.id} className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">{new Date(e.date).toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" })}</span>
                <span className="flex items-center gap-3">{e.kg} kg
                  <button aria-label="Delete entry" onClick={() => remove(e.id)} className="text-muted-foreground"><Trash2 className="h-4 w-4" /></button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
