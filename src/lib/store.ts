import { useEffect, useState, useCallback } from "react";
import { DEFAULT_WORKOUTS, type WorkoutTemplate } from "./exercises";

export interface SetEntry { weight: number; reps: number }
export interface Session {
  id: string;
  workoutId: string;
  date: string;
  entries: { exerciseId: string; sets: SetEntry[] }[];
}

const K_W = "gym.workouts.v1";
const K_S = "gym.sessions.v1";
const EVT = "gym-store";

function read<T>(k: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(k: string, v: unknown) {
  localStorage.setItem(k, JSON.stringify(v));
  window.dispatchEvent(new Event(EVT));
}

function useStored<T>(k: string, fallback: T) {
  const [val, setVal] = useState<T>(fallback);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sync = () => setVal(read(k, fallback));
    sync();
    setReady(true);
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [k]);
  const set = useCallback((v: T) => write(k, v), [k]);
  return [val, set, ready] as const;
}

export function useWorkouts() {
  const [w, set, ready] = useStored<WorkoutTemplate[]>(K_W, DEFAULT_WORKOUTS);
  const update = (id: string, fn: (t: WorkoutTemplate) => WorkoutTemplate) =>
    set(w.map((t) => (t.id === id ? fn(t) : t)));
  const reset = (id: string) =>
    set(w.map((t) => (t.id === id ? DEFAULT_WORKOUTS.find((d) => d.id === id)! : t)));
  return { workouts: w, update, reset, ready };
}

export function useSessions() {
  const [s, set, ready] = useStored<Session[]>(K_S, []);
  return {
    sessions: s,
    ready,
    add: (x: Session) => set([x, ...s]),
    remove: (id: string) => set(s.filter((x) => x.id !== id)),
  };
}

export function lastSetsFor(sessions: Session[], exerciseId: string): SetEntry[] | undefined {
  for (const s of sessions) {
    const e = s.entries.find((e) => e.exerciseId === exerciseId);
    if (e && e.sets.length) return e.sets;
  }
}

export function topWeight(sets: SetEntry[]) {
  return sets.reduce((m, s) => Math.max(m, s.weight), 0);
}
