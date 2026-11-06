import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { Shell } from "@/components/Shell";
import { byId } from "@/lib/exercises";
import { useSessions, useWorkouts } from "@/lib/store";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "History — Lift Log" },
      { name: "description", content: "Every workout you've logged." },
      { property: "og:title", content: "History — Lift Log" },
      { property: "og:description", content: "Every workout you've logged." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const { sessions, remove } = useSessions();
  const { workouts } = useWorkouts();
  return (
    <Shell>
      <h1 className="font-display px-5 pt-10 text-6xl">History</h1>
      <div className="space-y-3 px-5 pt-4">
        {!sessions.length && <p className="text-muted-foreground">No workouts logged yet.</p>}
        {sessions.map((s) => {
          const vol = s.entries.reduce((a, e) => a + e.sets.reduce((b, x) => b + x.weight * x.reps, 0), 0);
          return (
            <article key={s.id} className="card-lift p-4">
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-3xl">{workouts.find((w) => w.id === s.workoutId)?.name ?? s.workoutId}</h2>
                <button aria-label="Delete workout" onClick={() => confirm("Delete this workout?") && remove(s.id)} className="text-muted-foreground"><Trash2 className="h-4 w-4" /></button>
              </div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {new Date(s.date).toLocaleString([], { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} · {Math.round(vol)} kg volume
              </p>
              <ul className="mt-3 space-y-1 text-sm">
                {s.entries.map((e) => (
                  <li key={e.exerciseId} className="flex justify-between gap-3">
                    <span>{byId(e.exerciseId)?.name ?? e.exerciseId}</span>
                    <span className="text-right text-muted-foreground">{e.sets.map((x) => `${x.weight}×${x.reps}`).join("  ")}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </Shell>
  );
}
