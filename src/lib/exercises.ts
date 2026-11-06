export type Group = "upper" | "lower" | "glutes" | "hips";

export interface Exercise {
  id: string;
  name: string;
  group: Group;
  url: string;
}

const FB = "https://fitbod.me/exercises/";
const YT = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q + " exercise form")}`;

const fb = (id: string, name: string, group: Group): Exercise => ({ id, name, group, url: FB + id });
const yt = (id: string, name: string, group: Group): Exercise => ({ id, name, group, url: YT(name) });

export const LIBRARY: Exercise[] = [
  // Upper
  fb("barbell-bench-press", "Barbell Bench Press", "upper"),
  fb("dumbbell-bench-press", "Dumbbell Bench Press", "upper"),
  fb("dumbbell-fly", "Dumbbell Fly", "upper"),
  fb("lat-pulldown", "Lat Pulldown", "upper"),
  fb("lat-pulldown-machine", "Machine Lat Pulldown", "upper"),
  fb("cable-row", "Seated Cable Row", "upper"),
  fb("dumbbell-row", "Dumbbell Row", "upper"),
  fb("dumbbell-shoulder-press", "Dumbbell Shoulder Press", "upper"),
  fb("dumbbell-bicep-curl", "Dumbbell Bicep Curl", "upper"),
  fb("hammer-curls", "Hammer Curls", "upper"),
  fb("dumbbell-skullcrusher", "Dumbbell Skullcrusher", "upper"),
  yt("tricep-pushdown", "Cable Tricep Pushdown", "upper"),
  yt("lateral-raise", "Dumbbell Lateral Raise", "upper"),
  yt("face-pull", "Cable Face Pull", "upper"),
  // Lower
  yt("back-squat", "Barbell Back Squat", "lower"),
  yt("leg-press", "Leg Press", "lower"),
  yt("leg-extension", "Leg Extension", "lower"),
  fb("romanian-deadlift", "Romanian Deadlift", "lower"),
  fb("dumbbell-romanian-deadlift", "Dumbbell Romanian Deadlift", "lower"),
  fb("deadlift", "Deadlift", "lower"),
  fb("seated-leg-curl", "Seated Leg Curl", "lower"),
  fb("lying-hamstrings-curl", "Lying Hamstring Curl", "lower"),
  fb("kettlebell-sumo-squat", "Kettlebell Sumo Squat", "lower"),
  yt("bulgarian-split-squat", "Bulgarian Split Squat", "lower"),
  yt("standing-calf-raise", "Standing Calf Raise", "lower"),
  // Glutes
  fb("barbell-hip-thrust", "Barbell Hip Thrust", "glutes"),
  fb("dumbbell-hip-thrust", "Dumbbell Hip Thrust", "glutes"),
  fb("smith-machine-glute-bridge", "Smith Machine Glute Bridge", "glutes"),
  fb("glute-kickback-machine", "Glute Kickback Machine", "glutes"),
  fb("single-leg-cable-kickback", "Cable Kickback", "glutes"),
  fb("cable-pull-through", "Cable Pull Through", "glutes"),
  fb("step-up", "Step Up", "glutes"),
  fb("dumbbell-glute-bridge", "Dumbbell Glute Bridge", "glutes"),
  fb("single-leg-hip-thrust", "Single Leg Hip Thrust", "glutes"),
  fb("frog-pump", "Frog Pump", "glutes"),
  fb("kettlebell-swing", "Kettlebell Swing", "glutes"),
  fb("back-extensions", "Back Extensions", "glutes"),
  // Hips
  fb("machine-hip-abductor", "Hip Abductor Machine", "hips"),
  fb("machine-hip-adductor", "Hip Adductor Machine", "hips"),
  fb("cable-hip-abduction", "Cable Hip Abduction", "hips"),
  fb("cable-hip-adduction", "Cable Hip Adduction", "hips"),
  fb("cable-hip-extension", "Cable Hip Extension", "hips"),
  fb("mini-loop-band-lateral-walk", "Banded Lateral Walk", "hips"),
  fb("mini-loop-band-side-lying-clam", "Banded Clamshell", "hips"),
  fb("mini-loop-band-fire-hydrant", "Banded Fire Hydrant", "hips"),
  fb("standing-hip-abduction", "Standing Hip Abduction", "hips"),
  fb("lateral-lunge-stretch", "Lateral Lunge", "hips"),
  fb("pigeon-pose", "Pigeon Pose", "hips"),
  fb("kneeling-hip-flexor-stretch", "Kneeling Hip Flexor Stretch", "hips"),
];

export const byId = (id: string) => LIBRARY.find((e) => e.id === id);

export const GROUP_LABEL: Record<Group, string> = {
  upper: "Upper",
  lower: "Lower",
  glutes: "Glutes",
  hips: "Hips",
};

export interface WorkoutTemplate {
  id: string;
  name: string;
  group: Group;
  tagline: string;
  exerciseIds: string[];
}

export const DEFAULT_WORKOUTS: WorkoutTemplate[] = [
  { id: "upper", name: "Upper Body", group: "upper", tagline: "Push, pull & arms", exerciseIds: ["dumbbell-bench-press", "lat-pulldown", "cable-row", "dumbbell-shoulder-press", "lateral-raise", "dumbbell-bicep-curl", "tricep-pushdown"] },
  { id: "lower", name: "Lower Body", group: "lower", tagline: "Quads, hams & calves", exerciseIds: ["back-squat", "romanian-deadlift", "leg-press", "leg-extension", "seated-leg-curl", "standing-calf-raise"] },
  { id: "glutes", name: "Glute Focus", group: "glutes", tagline: "Thrust, bridge & kick", exerciseIds: ["barbell-hip-thrust", "cable-pull-through", "bulgarian-split-squat", "single-leg-cable-kickback", "step-up", "frog-pump"] },
  { id: "hips", name: "Hip Focus", group: "hips", tagline: "Abduct, adduct & mobilise", exerciseIds: ["machine-hip-abductor", "machine-hip-adductor", "cable-hip-extension", "mini-loop-band-lateral-walk", "mini-loop-band-side-lying-clam", "pigeon-pose"] },
];
