# Training Knowledge Base for Lift & Level Up

Purpose: reference material for building and tuning the app. It covers running strength, lower body strength, gaining muscle mass (for lean / "hardgainer" builds) and mobility. Everything below is paraphrased from the web sources listed at the end, researched 6 Nov 2026.

How to treat this file:
- It is general fitness information, not medical advice. Anything involving pain, tendon problems or injury should defer to a physio or doctor.
- Evidence quality varies. Items marked **(strong)** are backed by meta-analyses or systematic reviews cited by the sources. Items marked **(practical)** are coaching consensus or single-source guidance. Items marked **(contested)** have conflicting numbers between sources.
- The app stores data in localStorage only (see `src/lib/store.ts`). Keep new features compatible with that.

---

## 1. Core principles the app should encode

### 1.1 Muscle growth drivers
1. **Hard sets near failure matter more than the exact rep count (strong).** Growth happens across roughly 5-30 reps per set if the set finishes close to failure, about 0-3 reps in reserve (RIR). A casual set stopped 6-8 reps short does very little.
2. **Weekly sets per muscle is the main volume dial (strong).** A meta-analysis found 10+ weekly sets per muscle produced about double the gains of fewer than 5 sets (9.8% vs 5.4%) and clearly more than 5-9 sets (6.6%).
3. **Train each muscle about twice a week (practical).** Equal weekly volume split across two sessions tends to beat one session. Some analyses find frequency matters less than total volume once volume is matched.
4. **Progressive overload.** Either add reps or add load over time. Studies show both work.
5. **Energy surplus + protein + sleep** are the other three legs (see section 5).

### 1.2 Recommended starting numbers
| Variable | Starting point | Notes |
|---|---|---|
| Sets per muscle per week | 10-15 if training under a year; 15-20 for 1-5 years | Start at the low end of a block and add 1-2 sets every week or two if recovery is good |
| Per-muscle lower body targets (practical, single source) | Quads and glutes 12-16, hamstrings and calves 8-12 | Treat as a rough guide |
| Reps by exercise role | Main compounds 6-10, machines/cables 8-15, isolation finishers 12-30 | Keep a range stable 4-6 weeks so progress is measurable |
| Effort | Most sets 1-3 RIR; last set of a safe machine or isolation move can go to failure | Beginners can use 2-3 RIR while learning technique |
| Rest | About 2-3 min on compounds, 1-2 min on isolation | |
| Deload | Every 4-6 weeks, or when fatigue/resting heart rate says so | |

### 1.3 Double progression (simple rule the app can implement)
Pick a rep range (for example 8-12) and a weight that fits the bottom of the range. Each session try to add reps. Only when every working set reaches the top of the range, add weight and start from the bottom of the range again. A newer trial suggested adding load may give slightly more growth than adding reps, but both are valid.

### 1.4 Stretch-position training (contested/emerging)
Some research suggests loading a muscle at a long length (deep squat, Romanian deadlift, seated leg curl) grows muscle at least as well as short-range work. Treat as a tie-breaker when choosing exercises, not a hard rule.

---

## 2. Strength training for running performance

### 2.1 What the evidence says
- **Heavy lifting improves running economy (strong).** Systematic reviews report about 2-8% improvements over roughly 8-14 weeks. Several coaching sources cite this range.
- **Heavy beats light/high-rep (strong-ish).** In a 22-study meta-analysis of distance runners, heavy resistance training gave a small economy benefit and plyometrics alone a trivial one. The best programs used loads near 90% of a one-rep max or no more than about 4 reps. A study of 42 runners found heavy and complex (heavy + plyo) training both beat low-weight, high-rep circuits.
- **Plyometrics add something on top of lifting (practical).** Box jumps, broad jumps and bounding layered onto lifting improved economy further in studies in 6-9 weeks. Do both rather than choosing.
- **You will not get "bulky and slow" from this (strong).** In the cited trials runners got stronger without muscle growth when training for strength.
- **Frequency:** most studies used 2-3 sessions a week. Two sessions of 30-40 minutes is a workable minimum.
- **Timeline:** expect real transfer to running after about 8-12 weeks of consistency.
- **Masters and newer lifters benefit most (practical).**

### 2.2 Exercise priorities for runners
Running is a series of single-leg efforts, so include unilateral work.
1. Squat pattern (back squat, leg press, goblet or sumo squat)
2. Hip hinge (deadlift, Romanian deadlift)
3. Hip extension (hip thrust, glute bridge)
4. Single-leg work (Bulgarian split squat, split squat, step-up, lunge, single-leg glute bridge/hip thrust)
5. Calf and Achilles work (section 2.4)
6. Core and upper body push/pull for balance (planks, push-ups, rows, pull-ups)
7. Plyometrics once a base is built (box jumps, broad jumps, bounding, straight-leg bounds)

### 2.3 Suggested session shape for runners (practical)
3 sets of 4-6 reps at about 80%+ of 1RM on a squat, a deadlift/hinge, a hip thrust, plus one upper push and one upper pull, twice a week. For beginners start lighter with perfect form, 2-3 RIR, and build toward heavy loads.

### 2.4 Calves and Achilles (runner-specific)
- The calf is two muscles: gastrocnemius (works with a straight knee) and soleus (works with a bent knee, roughly 80+ degrees). Train both, with standing and seated versions.
- Lower plantar-flexor (calf) strength has been identified as a predictor of Achilles overuse injury in at least one study cited by sources.
- Typical prescriptions: 2-3 sets of 8-15 reps per leg, 2-3 times per week. Slow lowering (about 3 seconds down, 1 second up) is common. A heavier variant used in one source: 4 x 10 at about 70% 1RM with 90 seconds' rest.
- Progression: two legs on the floor, then single-leg off a step, then add weight.
- Keep heavy calf sessions out of the 24 hours before your hardest runs.
- Sharp pain, swelling or worsening Achilles pain: stop and seek professional advice.
- Note: one source argues generic calf raises are not "running-specific" because the calf is not the main driver at toe-off. Others emphasize strength and tendon capacity. Treat calf work as injury-resilience support, not a performance magic bullet.

---

## 3. Gaining muscle mass as a lean / "hardgainer" lifter

### 3.1 Definition and expectations
"Hardgainer" or "ectomorph" is a loose label for someone who finds it hard to gain weight and muscle. Sources agree the usual cause is eating too little, not an unbreakable metabolism. Genetics do play a role in rate of gain, but nobody is exempt from the basics.

### 3.2 Training
- **Compound lifts first.** Squats, deadlifts/RDLs, presses, rows, lunges, overhead press give the most muscle worked per set.
- **Volume:** an older article claims hardgainers "cannot handle the volume" others can, and another suggests starting with lower weights and more volume. Modern volume research does not support a special low-volume rule. Start within 10-15 sets per muscle per week and increase gradually. **(contested)**
- **Anchor lifts:** keep 2-3 main compound movements per session constant for 3-4 training cycles so progression is trackable.
- **Recovery:** sleep and rest days matter; add volume gradually rather than all at once.

### 3.3 Muscle gain while running
- Running adds energy demand, so the surplus has to cover it.
- Keep most running easy (about 70-80% easy) and limit hard intervals to 1-2 per week.
- Mild interference with muscle growth exists but is small for most people (section 4).

---

## 4. Combining running and lifting (concurrent training)

- **The "interference effect" is real but modest (strong).** A 2022 review of 43 studies on runners found combining running and lifting did not reduce max strength or muscle size. A 2012 meta-analysis found interference mattered more with running than cycling and increased with higher endurance volume and frequency.
- **It hits explosive power and top-end strength more than muscle size (practical).**
- **Scheduling rules the app can encode:**
  1. Do not stack heavy leg sessions with hard interval runs. Pair hard lifting days with easy runs, and hard run days with lighter lifting or rest.
  2. Separate hard sessions by about 6+ hours or put them on different days.
  3. If muscle is the goal, lift first; if both must be same day and the run is easy and short, an easy jog as a warm-up is fine.
  4. Keep roughly 80% of running easy.
  5. Easy runs the day after leg day will feel heavy. Run by effort, not pace.
  6. Deload every 4-6 weeks.
  7. Strength work before races should be reduced.

### 4.1 Example weeks (compiled from the principles above, not from one source)
**3 lifts + 2-3 runs (default for gaining mass):**
| Day | Session |
|---|---|
| Mon | Lower body strength (squat/hinge/single-leg, calves) |
| Tue | Easy run + 10 min mobility |
| Wed | Upper body |
| Thu | Easy run or rest |
| Fri | Lower body hypertrophy/glutes + hips |
| Sat | Long easy run (optional) |
| Sun | Rest + mobility |

**Add one quality run** (tempo or intervals) only if recovering well, and place it away from the heavy leg day.

---

## 5. Nutrition and recovery for gaining weight (general guidance)

- **Protein:** about 1.6-2.2 g per kg of bodyweight per day (roughly 0.7-1 g per lb). Several sources agree.
- **Energy surplus: (contested).** Ranges given: about 200-400 kcal/day over maintenance (expected gain about 0.25-0.5 lb/week) up to 250-500 kcal/day. One source suggests 0.5-1.5 lb/week for a simple bulk. Lower end limits fat gain; adjust based on the scale trend over several weeks.
- **Make eating easier:** calorie-dense foods (rice, potatoes, nut butters, oils, full-fat dairy), fewer very filling low-calorie foods, and liquid calories such as shakes or smoothies when appetite is low.
- **Sleep:** poor sleep reduces recovery and training quality. Treat it as part of the program.
- **Creatine** (3-5 g/day) is commonly listed as a well-supported supplement in the sources. Optional.
- **App tip:** track bodyweight as a weekly average. Single-day weights are noisy.

---

## 6. Mobility for runners

### 6.1 What matters
Target ankles (dorsiflexion), hips (extension and flexion, rotation) and the thoracic spine (upper back rotation/extension).

- **Frequency:** ideally a short daily routine (5-10 min). Minimum cited: about 2-3 times a week. Consistency beats long occasional sessions.
- **Timing:** dynamic mobility before runs and lifts (3-4 minutes, then jog). Long static holds are better after the session or on rest days. One source notes long static stretching immediately before running may temporarily reduce economy (about 30 minutes).
- **Honesty note:** one coaching source states there is no strong evidence that stretching prevents injury or reduces soreness. Mobility is best framed as helping movement quality and comfort, not as guaranteed injury prevention.

### 6.2 Mobility library (for a new "Mobility" group in the app)
| Exercise | Target | Typical prescription from sources |
|---|---|---|
| Wall ankle drive / knee-to-wall | Ankles | 10-15 reps per leg, 2-3 sets; keep heel down |
| Half-kneeling hip flexor stretch (or dynamic rocks) | Hip flexors | About 1 min per side |
| Couch stretch | Hip flexors / quads | 30-60 s per side |
| World's greatest stretch | Hips, thoracic, hamstrings | About 5 reps per side |
| 90/90 hip rotations | Hip rotation | About 1 min or 30 s per side |
| Pigeon pose | Glutes / hip external rotators | About 1 min per side |
| Thoracic rotations / open books / thread the needle | Upper back | About 10 each direction |
| Cat-cow | Spine | 8-10 slow reps |
| Deep squat hold | Hips, ankles | 30-60 s |
| Leg swings, hip circles | Hip warm-up | 10 each leg |
| Calf stretch (straight and bent knee) | Gastroc / soleus | 30-60 s, 2-3 per leg |
| Foam roller thoracic extension | Upper back | 8-10 reps |

### 6.3 Ready-made routines
- **Daily 10 min (RUN247 style):** hips about 4 min (90/90, world's greatest stretch, hip circles), ankles and calves about 3 min, thoracic about 3 min.
- **Pre-run 3-4 min:** ankle rocks, hip flexor rocks, open books, then easy jog.
- **Rest-day session (about 10-15 min):** couch stretch, pigeon, 90/90, thoracic rotations, deep squat hold, calf stretches.

---

## 7. Exercises to add to `src/lib/exercises.ts` (mapped to existing groups)

Existing groups: `upper`, `lower`, `glutes`, `hips`. Suggested additions below. Use the `yt()` helper (YouTube search link) for new entries unless you have verified a Fitbod URL for the exact slug. Do not invent Fitbod slugs.

**Lower (running + mass):**
- Goblet Squat, Walking Lunge, Split Squat, Hack Squat or Leg Press (variants), Single-Leg Romanian Deadlift
- Standing Calf Raise (straight knee) and Single-Leg Calf Raise off a Step
- Seated Calf Raise (bent knee, soleus)
- Eccentric Calf Raise (slow lowering)
- Leg Press Calf Raise

**Glutes:** Single-Leg Glute Bridge (already have dumbbell/single-leg hip thrust variants)

**Plyometric (new group `plyo` or fold into `lower` with a tag):** Box Jump, Broad Jump, Bounding, Straight-Leg Bounds. Mark as optional/advanced and recommend after 4-8 weeks of base strength.

**Upper (running balance):** Push-Up, Pull-Up, Plank, Dip.

**New group `mobility`:** everything in section 6.2. Suggested type: timed or reps-only (no weight field).

Suggested new default workouts:
1. **Runner Strength A (lower, heavy):** squat variation, Romanian deadlift, split squat, hip thrust, standing + seated calf raise. 3 sets, 4-8 reps, 2 RIR.
2. **Runner Strength B (single-leg + posterior chain):** deadlift or RDL variation, step-up, single-leg glute bridge, hip abduction, calf raise.
3. **Lower Hypertrophy (mass):** leg press, RDL, leg extension, seated leg curl, hip thrust, calf raise. 8-15 reps, 1-3 RIR.
4. **Mobility Daily (10 min)** and **Pre-run Warm-up (4 min).**

---

## 8. Feature ideas for the app (all localStorage-friendly)

1. **Log RIR (reps in reserve) per set** (optional field).
2. **Weekly set counter per muscle group** vs target range (10-20), with colour for under/in/over.
3. **Double-progression hints:** after a session, show "add weight" when all sets hit the top of the rep range.
4. **Deload prompt** every 4-6 weeks of consistent training.
5. **Bodyweight log with 7-day average** and a simple trend line, to support the mass-gain goal.
6. **Run log** (easy / hard / long, minutes) and a warning when a hard run is scheduled within a day of a heavy leg session.
7. **Mobility checklist** with timers; allow marking "done today".
8. **Rest timer** (2-3 min compounds, 1-2 min isolation).
9. **Notes per exercise** (for the user's own feedback on what works, which is the point of the app).
10. **Export/import JSON backup** (localStorage can be wiped by clearing the browser).

---

## 9. Quick reference: myths and caveats
- "Lifting makes runners slow and bulky." Not supported when training for strength with controlled volume.
- "Cardio kills gains." Interference is modest for most people and mostly affects power and top-end strength.
- "Only 8-12 reps build muscle." Wider range works if sets are close to failure.
- "More weight alone is what counts." Effort (reps in reserve) and volume matter at least as much.
- "Hardgainers need special tricks." Mostly they need a real calorie surplus, enough protein, progressive overload and patience.

---

## Sources (retrieved 6 Nov 2026; paraphrased, not quoted)

Running strength
- Marathon Handbook, total body gym workout for runners: https://marathonhandbook.com/total-body-gym-workout/
- TrainRight (Jason Koop), why heavy strength training is most effective for runners: https://trainright.com/why-heavy-strength-training-is-most-effective-for-runners/
- FitCraft, strength training for runners (meta-analysis summary): https://getfitcraft.com/guides/strength-training-for-runners
- StrengthLog, strength training for runners complete guide: https://www.strengthlog.com/?p=34218
- Run Waterloo, strength training and running economy: https://runwaterloo.com/strength-training-102-exercise-economy/
- RunnerLab guide: https://www.runningxpert.com/en/inspiration/strenght-training-programme

Calves and Achilles
- e3 Rehab, calf strength research summary: https://e3rehab.com/calves/
- Fit&Well, four calf exercises for runners: https://www.fitandwell.com/exercise/running/the-four-calf-exercises-every-runner-should-include-in-their-gym-routine-according-to-physical-therapists/
- Therapeutic Associates, calf and Achilles strains in runners: https://www.therapeuticassociates.com/prevent-calf-and-achilles-injuries-in-runners/
- Runner's Connect, calf strength and mobility: https://runnersconnect.net/?p=24920
- Edge, calf raises for runners: https://www.findyouredge.app/news/how-to-do-calf-raises-for-runners-uk-2026

Hypertrophy, volume and rep ranges
- Look Great Naked, summary of the Schoenfeld volume meta-analysis: https://lookgreatnaked.com/blog/how-many-sets-do-you-need-to-perform-to-maximize-muscle-gains
- Spartan, hypertrophy sets per week: https://www.spartan.com/en/blog/hypertrophy-training
- Men's Health UK, how many sets to build muscle: https://menshealth.co.uk/uk/building-muscle/a45952261/how-many-sets-you-need-to-do-to-build-muscle/
- BoxRox, leg training secrets (volume, frequency, stretch position): https://www.boxrox.com/?p=234349
- Fitnessvolt, rep ranges for muscle growth: https://fitnessvolt.com/21301/rep-range-variance-for-maximum-muscle-mass/
- Biolayne Reps, reps vs load for hypertrophy: https://biolayne.com/reps/issue-9/reps-vs-load-for-hypertrophy/
- Planfit, rep range evidence: https://planfit.ai/en/blog/how-many-reps-for-muscle-growth
- SetGraph, hypertrophy rep range and double progression: https://setgraph.app/articles/how-many-reps-to-build-muscle-hypertrophy-rep-range
- Adam Kemp Fitness, simple hypertrophy guide: https://www.adamkempfitness.com/hypertrophy-training-guide/

Hardgainers and nutrition
- Mind Pump, how hardgainers can add muscle mass: https://mindpumppodcast.com/?p=45394
- NASM, how to add weight as a hardgainer: https://blog.nasm.org/how-to-add-weight-as-hardgainer
- Legion Athletics, hardgainer's guide: https://legionathletics.com/the-hardgainers-guide-to-guaranteed-muscle-growth
- CoachCMFit, building muscle as a hardgainer: https://coachcmfit-website.pages.dev/blog/how-to-build-muscle-as-a-hardgainer
- MuscleTech, hardgainer's guide: https://www.muscletech.com/blogs/journal/hardgainer

Concurrent training (running + lifting)
- Polar Journal, interference effect: https://www.polar.com/en/journal/interference-effect
- Marathon Science newsletter (Schumann 2022 review): https://marathonscience.beehiiv.com/p/43-studies-say-you-can-run-and-lift-the-same-day-here-s-how-to-sequence-it
- Athlete Data, hybrid athlete training: https://www.athletedata.health/guides/hybrid-athlete-training
- BoxRox, lift big and run well: https://www.boxrox.com/?p=240856
- Edge, can you build muscle and run at the same time: https://www.findyouredge.app/news/can-you-build-muscle-and-run-at-the-same-time-uk-2026
- Edge, run before or after lifting: https://www.findyouredge.app/news/should-i-run-before-or-after-lifting

Mobility
- RUN247, daily mobility routine for runners: https://run247.com/guides/daily-mobility-routine-runners
- TrainingPlan.dev, mobility and flexibility for runners: https://www.trainingplan.dev/blog/posts/mobility-flexibility-for-runners
- Athletics Ireland mobility programme: https://www.athleticsireland.ie/wp-content/uploads/2025/05/AAI_Fit-for-Life_Mobility-Programme.pdf
- The Mother Runners, 5-minute mobility routine: https://www.themotherrunners.com/mobility-routine-for-runners/
- Edge, mobility routine for runners: https://www.findyouredge.app/news/mobility-routine-for-runners-uk-2026
- Outside, 10-minute mobility routine: https://www.outsideonline.com/health/running/training/10-minute-mobility-routine-for-runners/

Quality notes: several sources are coaching blogs or commercial sites that summarize research secondhand. Specific study details (for example effect sizes and percentages) are reported as the sources stated them and were not independently re-verified against the original papers. Anything marked contested should be checked against a trusted coach, physio or the original research before being treated as fact.
