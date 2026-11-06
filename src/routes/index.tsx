import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Shell } from "@/components/Shell";
import { useSessions, useWorkouts } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lift Log — My Workouts" },
      { name: "description", content: "Personal gym tracker for upper, lower, glute and hip workouts." },
      { property: "og:title", content: "Lift Log — My Workouts" },
      { property: "og:description", content: "Personal gym tracker for upper, lower, glute and hip workouts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const { workouts } = useWorkouts();
  const { sessions } = useSessions();
  const week = sessions.filter((s) => Date.now() - +new Date(s.date) < 7 * 864e5).length;

  return (
    <Shell>
      <header className="px-5 pt-10 pb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Lift Log</p>
        <h1 className="font-display mt-1 text-6xl leading-none">Pick today's<br />session</h1>
        <div className="mt-6 flex gap-3">
          <Stat label="This week" value={week} />
          <Stat label="All time" value={sessions.length} />
        </div>
      </header>
      <div className="space-y-3 px-5">
        {workouts.map((w, i) => {
          const last = sessions.find((s) => s.workoutId === w.id);
          return (
            <Link key={w.id} to="/workout/$id" params={{ id: w.id }} className="card-lift group flex items-center gap-4 p-5">
              <span className="font-display text-4xl text-primary">0{i + 1}</span>
              <div className="flex-1">
                <h2 className="font-display text-3xl leading-none">{w.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {w.exerciseIds.length} exercises · {w.tagline}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {last ? `Last: ${new Date(last.date).toLocaleDateString()}` : "Not done yet"}
                </p>
              </div>
              <ChevronRight className="h-6 w-6 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          );
        })}
      </div>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex-1 rounded-lg bg-secondary px-4 py-3">
      <div className="font-display text-3xl">{value}</div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}
