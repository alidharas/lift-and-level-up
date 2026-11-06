import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, Play, Plus, Repeat, RotateCcw, Trash2, X } from "lucide-react";
import { Shell } from "@/components/Shell";
import { byId, GROUP_LABEL, LIBRARY, type Group } from "@/lib/exercises";
import { lastSetsFor, useSessions, useWorkouts, type SetEntry } from "@/lib/store";

export const Route = createFileRoute("/workout/$id")({
  head: () => ({
    meta: [
      { title: "Workout — Lift Log" },
      { name: "description", content: "Log your sets, reps and weights." },
      { property: "og:title", content: "Workout — Lift Log" },
      { property: "og:description", content: "Log your sets, reps and weights." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: WorkoutPage,
});

type Draft = Record<string, { weight: string; reps: string; done: boolean }[]>;

function WorkoutPage() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const { workouts, update, reset, ready } = useWorkouts();
  const { sessions, add } = useSessions();
  const w = workouts.find((x) => x.id === id);
  const [draft, setDraft] = useState<Draft>({});
  const [picker, setPicker] = useState<{ mode: "swap" | "add"; target?: string } | null>(null);
  const dkey = `gym.draft.${id}`;

  useEffect(() => {
    try {
      const d = localStorage.getItem(dkey);
      if (d) setDraft(JSON.parse(d));
    } catch { /* ignore */ }
  }, [dkey]);
  useEffect(() => {
    if (Object.keys(draft).length) localStorage.setItem(dkey, JSON.stringify(draft));
  }, [draft, dkey]);

  if (!ready) return <Shell><div /></Shell>;
  if (!w) return <Shell><p className="p-6">Workout not found. <Link to="/" className="text-primary">Back</Link></p></Shell>;

  const setsFor = (exId: string) => {
    if (draft[exId]) return draft[exId];
    const last = lastSetsFor(sessions, exId);
    const base: SetEntry[] = last ?? [{ weight: 0, reps: 10 }, { weight: 0, reps: 10 }, { weight: 0, reps: 10 }];
    return base.map((s) => ({ weight: s.weight ? String(s.weight) : "", reps: String(s.reps), done: false }));
  };
  const patch = (exId: string, fn: (s: Draft[string]) => Draft[string]) =>
    setDraft((d) => ({ ...d, [exId]: fn(d[exId] ?? setsFor(exId)) }));

  const finish = () => {
    const entries = w.exerciseIds
      .map((exId) => ({
        exerciseId: exId,
        sets: (draft[exId] ?? [])
          .filter((s) => s.done)
          .map((s) => ({ weight: Number(s.weight) || 0, reps: Number(s.reps) || 0 })),
      }))
      .filter((e) => e.sets.length);
    if (!entries.length) {
      alert("Tick off at least one set before finishing.");
      return;
    }
    add({ id: crypto.randomUUID(), workoutId: w.id, date: new Date().toISOString(), entries });
    localStorage.removeItem(dkey);
    nav({ to: "/history" });
  };

  const pick = (exId: string) => {
    if (!picker) return;
    if (picker.mode === "swap" && picker.target) {
      update(w.id, (t) => ({ ...t, exerciseIds: t.exerciseIds.map((x) => (x === picker.target ? exId : x)) }));
    } else {
      update(w.id, (t) => ({ ...t, exerciseIds: [...t.exerciseIds, exId] }));
    }
    setPicker(null);
  };

  return (
    <Shell>
      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <Link to="/" className="rounded-full bg-secondary p-2"><ArrowLeft className="h-5 w-5" /></Link>
        <button
          onClick={() => confirm("Restore the original exercise list?") && reset(w.id)}
          className="flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground"
        >
          <RotateCcw className="h-4 w-4" /> Reset list
        </button>
      </header>
      <h1 className="font-display px-5 text-6xl leading-none">{w.name}</h1>
      <p className="px-5 pt-1 text-sm text-muted-foreground">Tap the play icon for a how-to video. Tick each set as you go.</p>

      <div className="mt-6 space-y-4 px-5">
        {w.exerciseIds.map((exId) => {
          const ex = byId(exId);
          if (!ex) return null;
          const sets = setsFor(exId);
          const last = lastSetsFor(sessions, exId);
          return (
            <section key={exId} className="card-lift p-4">
              <div className="flex items-start gap-3">
                <a href={ex.url} target="_blank" rel="noreferrer" className="rounded-full bg-primary p-2 text-primary-foreground" aria-label={`Watch ${ex.name} video`}>
                  <Play className="h-4 w-4 fill-current" />
                </a>
                <div className="flex-1">
                  <a href={ex.url} target="_blank" rel="noreferrer" className="font-semibold underline-offset-4 hover:underline">{ex.name}</a>
                  <p className="text-xs text-muted-foreground">
                    {last ? `Last time: ${last.map((s) => `${s.weight}×${s.reps}`).join(", ")}` : "First time"}
                  </p>
                </div>
                <button aria-label="Swap exercise" onClick={() => setPicker({ mode: "swap", target: exId })} className="p-2 text-muted-foreground hover:text-primary"><Repeat className="h-4 w-4" /></button>
                <button aria-label="Remove exercise" onClick={() => update(w.id, (t) => ({ ...t, exerciseIds: t.exerciseIds.filter((x) => x !== exId) }))} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>

              <div className="mt-3 grid grid-cols-[2rem_1fr_1fr_2.5rem_1.5rem] items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <span>Set</span><span>kg</span><span>Reps</span><span /><span />
              </div>
              {sets.map((s, i) => (
                <div key={i} className="mt-2 grid grid-cols-[2rem_1fr_1fr_2.5rem_1.5rem] items-center gap-2">
                  <span className="font-display text-xl text-muted-foreground">{i + 1}</span>
                  <input inputMode="decimal" className="input-lift" value={s.weight} placeholder="0"
                    onChange={(e) => patch(exId, (a) => a.map((x, j) => (j === i ? { ...x, weight: e.target.value } : x)))} />
                  <input inputMode="numeric" className="input-lift" value={s.reps} placeholder="0"
                    onChange={(e) => patch(exId, (a) => a.map((x, j) => (j === i ? { ...x, reps: e.target.value } : x)))} />
                  <button aria-label="Mark set done" onClick={() => patch(exId, (a) => a.map((x, j) => (j === i ? { ...x, done: !x.done } : x)))}
                    className={`flex h-9 items-center justify-center rounded-md ${s.done ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                    <Check className="h-4 w-4" />
                  </button>
                  <button aria-label="Delete set" onClick={() => patch(exId, (a) => a.filter((_, j) => j !== i))} className="text-muted-foreground"><X className="h-4 w-4" /></button>
                </div>
              ))}
              <button onClick={() => patch(exId, (a) => [...a, { ...(a.at(-1) ?? { weight: "", reps: "10" }), done: false }])}
                className="mt-3 text-xs uppercase tracking-widest text-primary">+ Add set</button>
            </section>
          );
        })}

        <button onClick={() => setPicker({ mode: "add" })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border py-4 text-sm text-muted-foreground">
          <Plus className="h-4 w-4" /> Add exercise
        </button>
        <button onClick={finish} className="btn-lift w-full">Finish workout</button>
      </div>

      {picker && (
        <Picker
          group={w.group}
          exclude={w.exerciseIds}
          title={picker.mode === "swap" ? `Swap ${byId(picker.target!)?.name}` : "Add exercise"}
          onPick={pick}
          onClose={() => setPicker(null)}
        />
      )}
    </Shell>
  );
}

function Picker({ group, exclude, title, onPick, onClose }: { group: Group; exclude: string[]; title: string; onPick: (id: string) => void; onClose: () => void }) {
  const [g, setG] = useState<Group | "all">(group);
  const [q, setQ] = useState("");
  const list = LIBRARY.filter((e) => !exclude.includes(e.id) && (g === "all" || e.group === g) && e.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="fixed inset-0 z-30 flex items-end bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div className="mx-auto max-h-[80vh] w-full max-w-md overflow-y-auto rounded-t-2xl border border-border bg-card p-5" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-3xl">{title}</h3>
          <button onClick={onClose}><X className="h-5 w-5" /></button>
        </div>
        <input className="input-lift mt-3 w-full" placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="mt-3 flex flex-wrap gap-2">
          {(["all", "upper", "lower", "glutes", "hips"] as const).map((x) => (
            <button key={x} onClick={() => setG(x)} className={`rounded-full px-3 py-1 text-xs uppercase tracking-widest ${g === x ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
              {x === "all" ? "All" : GROUP_LABEL[x]}
            </button>
          ))}
        </div>
        <ul className="mt-3 divide-y divide-border">
          {list.map((e) => (
            <li key={e.id} className="flex items-center gap-3 py-3">
              <a href={e.url} target="_blank" rel="noreferrer" className="text-primary" aria-label="Video"><Play className="h-4 w-4" /></a>
              <button className="flex-1 text-left" onClick={() => onPick(e.id)}>{e.name}</button>
              <span className="text-xs text-muted-foreground">{GROUP_LABEL[e.group]}</span>
            </li>
          ))}
          {!list.length && <li className="py-6 text-center text-sm text-muted-foreground">No matches</li>}
        </ul>
      </div>
    </div>
  );
}
