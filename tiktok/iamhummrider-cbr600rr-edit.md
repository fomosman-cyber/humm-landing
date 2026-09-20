# @iamhummrider — Honda CBR600RR 2026
## TikTok Production Bible — cinematic cut

---

# 0. FOOTAGE AUDIT (read this first)

I probed both uploaded files frame-by-frame before planning anything. Three things do not match the brief, and they change the edit.

### What actually arrived

| Slot in brief | Expected | What is actually in the upload |
|---|---|---|
| **CLIP 1** — talking intro, ~20s | You speaking to camera about going for a ride | **NOT UPLOADED.** Only 2 video files arrived, not 3. |
| **CLIP 2** — friend invite, ~8s | Asking a friend to ride | ✅ `E2DF09F5…mov` — **8.03s**, 1080×1920, 30fps, mono AAC. Man in a dark Carhartt jacket, Red Bull can + cigarette in hand, talking and laughing to camera. Low angle, blue sky, chain-link fence, retail-park background. Front-camera (image is mirrored — the Red Bull logo reads backwards). |
| **CLIP 3** — riding, ~25s | Motorcycle riding footage | ⚠️ `IMG_2195.mov` — **25.23s**, 1920×1080 stored **with a −90° rotation flag, so it displays 1080×1920 vertical**. But it is **not riding footage.** It is a **stationary arm-held selfie at a Shell petrol station / bike meet**: rider in the white skull-graphic helmet, Carhartt jacket, Alpinestars gloves, seated on a **white** sportbike, crowd and parked bikes behind (a blue Hayabusa with gold wheels is visible late). Nothing moves except the camera. |

### Three consequences

**1. There is no 20-second talking intro.** The 0–20s act of your structure has no media. Everything downstream shifts.

**2. There is no riding footage at all.** No motion, no speed, no road. The 28s-onward "build energy / ride / speed" act cannot be cut from real footage — it would have to be 100% AI, which breaks your own rule that *"the real footage should remain the main content."*

**3. The bike in Clip 3 is white; your hero bike is matte black.** Your two photos show a matte-black CBR600RR. Cutting the white bike against black-CBR AI shots reads as two different motorcycles and quietly destroys the premium feel. Handled below — I do not use Clip 3 as hero-bike footage.

### Also worth 10 seconds of your attention

- **The cigarette is on screen for most of Clip 2** (clearly at ~0.4s, ~2.5s, ~6.5s). TikTok restricts tobacco depiction and it can suppress FYP distribution. Framing fix in §2.
- Both clips were shot **today**, 11:41 and 13:41 local, near Ridderkerk/Rotterdam (GPS 51.8948 N, 4.5309 E).
- Clip 3's best frame by a distance is **t≈23.9s** — skull helmet, dark visor down, low angle, blue Hayabusa behind. That is your hero image. I have built the cut around it.

### What I did about it

I am giving you **two timelines**:

- **TIMELINE A — "Tonight's Cut" (46.0s).** Cuts today from exactly what is uploaded. Real footage stays dominant. This is the one to build now.
- **TIMELINE B — "Full Build" (52.0s).** The structure you actually asked for, ready for the 20s intro and real riding footage to drop straight in. Slot durations and subtitle grid are pre-cut.

Everything else (Higgsfield prompts, sound, grade, end frame, export) serves both.

---

# 1. THE ONE TECHNICAL DECISION THAT MATTERS

> **Generate every AI bike shot with Higgsfield IMAGE-TO-VIDEO, seeded from your own two photos. Never text-to-video.**

Your hard constraint is that the AI bike must stay a Honda CBR600RR 2026 — same headlights, fairing, proportions, wheels, exhaust. A text prompt will not do that. Text-to-video converges on a generic red-or-blue superbike every time; you will get Ducati/Yamaha geometry and a fictional headlight, which is exactly what you said to avoid.

Your two stills solve it completely. They lock the model, the matte-black finish, the headlight signature and the red rim stripe into the first frame, and the model animates *from* that instead of inventing a bike.

**Use as seed frames:**
- **P1** — golden-hour, front 3/4, warm side light, long shadows → use for warm/hero/parked shots
- **P2** — overcast, near-frontal, flat light → use for cold/aggressive/ignition shots, and it matches Clip 3's grey sky

**Bike identity block — paste into every prompt:**

> matte black Honda CBR600RR 2026 supersport, twin angular LED headlights flanking a central ram-air intake duct in the nose, sharp layered fairing with small aero winglets on the upper fairing sides, clear double-bubble windscreen, HONDA wordmark on the nose fairing, black wheels with a thin red rim stripe, black inverted forks, right-side low-mount exhaust

**Rider identity block — paste into every rider shot:**

> rider in a dark charcoal canvas work jacket, white full-face helmet with a black skull-teeth graphic across the chin bar and a dark smoke visor, black and grey armoured gloves

---

# 2. TIMELINE A — "TONIGHT'S CUT" (46.0s) ★ BUILD THIS

Real footage: 30.1s of 46.0s (65%). AI: 13.4s. Titles: 2.5s.

`[R]` = your real footage · `[AI]` = Higgsfield insert · `[T]` = title

| # | In | Out | Dur | Src | Content | Transition IN |
|---|---|---|---|---|---|---|
| 1 | 0:00.00 | 0:00.80 | 0.80 | `[AI]` | **S1** CBR headlight igniting, extreme CU | Hard in from black |
| 2 | 0:00.80 | 0:08.83 | **8.03** | `[R]` | **Clip 2 — FULL, UNCUT.** Talking to camera | Hard cut |
| 3 | 0:08.83 | 0:10.23 | 1.40 | `[AI]` | **S2** Gloved thumb hits the starter | Hard cut on speech end |
| 4 | 0:10.23 | 0:11.33 | 1.10 | `[AI]` | **S3** Tacho needle sweep | Hard cut |
| 5 | 0:11.33 | 0:12.43 | 1.10 | `[AI]` | **S4** Headlights full-on, low angle | Flash frame (2 fr white) |
| 6 | 0:12.43 | 0:14.93 | 2.50 | `[T]` | **HONDA CBR600RR / 2026** over S5 push-in | Cross-dissolve 6 fr |
| 7 | 0:14.93 | 0:21.13 | 6.20 | `[R]` | **Clip 3 [0.50→6.70]** rider seated, visor up | Whip-pan L→R, 5 fr |
| 8 | 0:21.13 | 0:22.13 | 1.00 | `[AI]` | **S6** Rear tracking, bike pulls away | Speed-ramp out of #7 |
| 9 | 0:22.13 | 0:26.63 | 4.50 | `[R]` | **Clip 3 [9.50→14.00]** | Match-cut |
| 10 | 0:26.63 | 0:27.83 | 1.20 | `[AI]` | **S7** Front tyre / rim detail rolling | Match-cut on wheel |
| 11 | 0:27.83 | 0:31.13 | 3.30 | `[R]` | **Clip 3 [17.40→20.70]** camera moves — energy lifts | Hard cut |
| 12 | 0:31.13 | 0:32.53 | 1.40 | `[AI]` | **S8** Low-angle accelerate past camera | Speed ramp 100→180% |
| 13 | 0:32.53 | 0:34.03 | 1.50 | `[AI]` | **S9** Helmet POV into a city street | Whip blur |
| 14 | 0:34.03 | 0:35.23 | 1.20 | `[AI]` | **S10** Bike passes camera at speed | Impact cut |
| 15 | 0:35.23 | 0:36.43 | 1.20 | `[AI]` | **S11** Lean through a corner, low angle | Hard cut |
| 16 | 0:36.43 | 0:37.83 | 1.40 | `[AI]` | **S12** Night city reflections on fairing | Hard cut |
| 17 | 0:37.83 | 0:41.93 | **4.10** | `[R]` | **Clip 3 [21.00→25.10]** ★ **HERO** — visor down, Hayabusa behind | **Match-cut, hard.** Hold. |
| 18 | 0:41.93 | 0:43.43 | 1.50 | `[R]` | Clip 3 final frame, frozen + slow 1.00→1.06 push | Freeze on last frame |
| 19 | 0:43.43 | 0:46.00 | 2.57 | `[T]` | **END FRAME** @iamhummrider | Fade to black 8 fr, text up |

**Why this shape works:** face and voice land at 0.8s (TikTok's retention window), the bike is established as a *character* before the meet, the meet footage carries the middle, the AI burst at 31–38s delivers the speed your footage doesn't have, and then it **cuts back to a real frame of you** for the payoff at 37.8s. Ending on AI would feel fake. Ending on your own helmet, visor down, does not.

### Handling the cigarette (shot #2)
Clip 2 is used uncut — your speech is intact. Do this instead:
- **Reframe:** scale 112%, anchor top-centre, Y-offset +6%. His face fills more frame, the hand with the can and cigarette drops to the lower edge, and the subtitle block covers the rest.
- At **2.4–2.9s** and **6.3–6.9s** (the two clearest cigarette moments) the subtitle card sits directly over it. Free cover.
- The Red Bull can is fine — organic content, no trademark problem.

---

# 3. TIMELINE B — "FULL BUILD" (52.0s) — for when the intro + riding land

Same grammar, your original structure. Slots are pre-timed; drop media in.

| Act | In | Out | Dur | Content |
|---|---|---|---|---|
| Cold open | 0:00.00 | 0:00.80 | 0.80 | **S1** headlight ignite |
| **TALK** | 0:00.80 | 0:20.80 | **20.00** | **CLIP 1 — FULL, UNCUT, ending intact** |
| Bridge | 0:20.80 | 0:21.60 | 0.80 | **S4** headlights full-on — the "decision" beat |
| **FRIEND** | 0:21.60 | 0:29.63 | **8.03** | **CLIP 2 — FULL, UNCUT** |
| Ignition | 0:29.63 | 0:31.03 | 1.40 | **S2** starter button |
| Ignition | 0:31.03 | 0:32.13 | 1.10 | **S3** tacho sweep |
| Title | 0:32.13 | 0:34.13 | 2.00 | **HONDA CBR600RR / 2026** |
| **RIDE** | 0:34.13 | 0:39.13 | 5.00 | **CLIP 3 real riding** — pull-away / first roll |
| Insert | 0:39.13 | 0:40.13 | 1.00 | **S6** rear tracking |
| **RIDE** | 0:40.13 | 0:44.13 | 4.00 | **CLIP 3** — mid-speed |
| Insert | 0:44.13 | 0:45.33 | 1.20 | **S10** pass-by at speed |
| **RIDE** | 0:45.33 | 0:49.43 | 4.10 | **CLIP 3** — fastest / best section |
| Payoff | 0:49.43 | 0:49.43 | — | hold last real frame 0.6s |
| End | 0:49.43 | 0:52.00 | 2.57 | **END FRAME** |

Real footage here is **41.1s of 52.0s (79%)** — the AI genuinely just seasons it, exactly as you specified.

### If you reshoot, get these six shots (30 minutes, phone is fine)
1. Static low angle, bike enters frame L→R and exits — 8s
2. Same corner, bike away from camera — 8s
3. Chest/helmet POV down a street — 15s
4. Follow shot from a car or second bike — 20s
5. Tank-cam looking forward over the clocks, hands in shot — 15s
6. Thumb on the starter, tacho sweep, real — 6s

Shots 1, 2 and 6 alone replace five AI inserts with real footage and the video gets noticeably better.

---

# 4. SUBTITLES

### Style — locked

| Property | Value |
|---|---|
| Typeface | Inter / Helvetica Now / SF Pro — **Bold (700)**, never Black |
| Case | Sentence case. Not ALL CAPS. |
| Fill | **#FFFFFF, 100%** — white only |
| Stroke | 3 px **#000000** at 70% |
| Shadow | Y+3 px, blur 8 px, **#000000** at 45% |
| Size | 62–68 px at 1080×1920 |
| Line height | 1.15 |
| Lines | **Max 2.** Max ~26 characters per line. |
| Position | **Horizontally centred. Baseline at Y = 1360 px** (≈71% down) |
| Safe area | Nothing below **Y = 1500 px** — TikTok UI lives there |
| Emphasis | 1–2 words per video at **112% size**. Still white. Nothing else. |
| Animation | 3-frame fade + 2% scale-up. No bounce, no typewriter, no karaoke. |

### Cue grid — Clip 2 (derived from measured audio energy)

I ran an RMS envelope at 128 ms resolution on the real audio. These are the actual utterance groups — the speech boundaries are real, measured from the waveform:

| Cue | Start (clip) | End (clip) | Start (Timeline A) | End (Timeline A) | Energy |
|---|---|---|---|---|---|
| — | 0.00 | 0.30 | 0:00.80 | 0:01.10 | room tone, no subtitle |
| **1** | 0.30 | 2.05 | **0:01.10** | **0:02.85** | strongest — peak −21 dB |
| **2** | 2.10 | 3.30 | **0:02.90** | **0:04.10** | falling tail |
| **3** | 3.65 | 4.95 | **0:04.45** | **0:05.75** | rising, second phrase |
| — | 4.95 | 6.05 | 0:05.75 | 0:06.85 | low — pause or soft aside |
| **4** | 6.05 | 8.03 | **0:06.85** | **0:08.83** | final phrase, runs to the very end |

> **The words go in these four boxes.** I could not transcribe the audio in this environment — Hugging Face and the other model hosts are blocked by the network policy here, and the Higgsfield analysis job was still queued when I finished. **I am not writing the text, because you told me not to invent dialogue, and I won't.**
>
> To fill it in 60 seconds: open Clip 2 in CapCut → Captions → Auto captions → **correct every word by ear** (auto-caption is unreliable on Dutch/English code-switching and on wind noise), then force the cue boundaries to the four windows above. Send me the transcript and I will write the final cards, pick the emphasis word and re-time to the syllable.

**Cue 4 is the one to watch.** It runs to 8.03s — the exact last frame. Do not let the cut land early and clip it; you asked for the ending preserved, and this is where that gets lost.

### Non-dialogue cards (these I can write — they are yours, not invented speech)

| Time | Text | Note |
|---|---|---|
| 0:12.43–0:14.93 | **HONDA CBR600RR**<br>**2026** | Centred, Y=960. Letter-spacing +0.08em. "2026" at 60% size, 70% white. |
| 0:43.43–0:46.00 | **@iamhummrider**<br>MORE RIDES. MORE SPEED. | See §8 |

---

# 5. HIGGSFIELD SHOT LIST — 12 AI INSERTS

Total AI runtime **13.4s of 46.0s**. Longest single insert 1.5s. Nothing reads as an AI video; they read as inserts.

**Settings for all 12:** 1080×1920 · 9:16 · 30 fps · motion 4–6 (never above 6 — high motion is where the fairing geometry melts) · **seed the bike shots from P1/P2 via image-to-video.**

**Negative prompt for every shot:**
> Ducati, Yamaha, Kawasaki, Suzuki, BMW, generic superbike, futuristic motorcycle, concept bike, neon underglow, sci-fi, red or blue bodywork, chrome fairing, single round headlight, sport-tourer, naked bike, cruiser, wrong headlight shape, extra exhaust, morphing bodywork, warped wheels, distorted spokes, floating rider, deformed hands, extra fingers, text artefacts, watermark, cartoon, CGI look, video-game render, oversaturated, HDR halo, plastic skin

---

### S1 — Headlight ignite
- **PURPOSE** Cold open. First 0.8s. Establishes premium before a word is spoken.
- **DURATION** 0.8s · **SEED** P2 (image-to-video)
- **PROMPT** `Extreme close-up of the left LED headlight of a [BIKE BLOCK]. The headlight ignites from cold to full brightness over half a second, a hard specular highlight travelling across the lens. Matte black fairing fills the rest of frame. Shallow depth of field, overcast daylight, tiny dust motes. Photoreal, cinematic, 50mm macro.`
- **CAMERA** Locked off. 2% push-in only.
- **LENS** 50mm macro, T1.8, focus on the lens element
- **LIGHT** Flat overcast key, headlight is the only source that changes
- **IN** Hard from black · **OUT** Hard cut to face — cut on the brightness peak

### S2 — Starter button
- **PURPOSE** The decision. First beat after he stops talking.
- **DURATION** 1.4s · **SEED** P2, cropped to the right bar
- **PROMPT** `Close-up of a gloved right hand on the handlebar of a [BIKE BLOCK]. [RIDER BLOCK]. The thumb presses the red starter button; the button depresses and the dashboard behind glows to life. Subtle vibration enters the frame as the engine catches. Overcast daylight, realistic glove texture, photoreal, 85mm.`
- **CAMERA** Handheld, 2–3 px drift. Tiny shake on the press — **motivated**, nothing more.
- **LENS** 85mm, T2.0, focus on the thumb
- **LIGHT** Soft overcast, cool. Dash glow warms it late.
- **IN** Hard cut on the last syllable · **OUT** Hard cut on the engine catch

### S3 — Tacho sweep
- **PURPOSE** Mechanical payoff. Engine is alive.
- **DURATION** 1.1s · **SEED** text-to-video (no dash in your stills)
- **PROMPT** `Close-up of a modern supersport digital instrument cluster waking up. The tachometer bar sweeps full-scale left to right and settles at idle. Crisp TFT display, cool white readout on black, faint reflection of an overcast sky on the screen glass. Slight engine vibration. Photoreal, 100mm macro, shallow focus.`
- **CAMERA** Locked, micro-vibration
- **LENS** 100mm macro, T2.8
- **LIGHT** Screen is the key. Everything else falls off.
- **IN** Hard cut · **OUT** **2-frame white flash** into S4

### S4 — Headlights full-on, low angle
- **PURPOSE** The bike as a character. Aggression.
- **DURATION** 1.1s · **SEED** P2
- **PROMPT** `Low wide angle from ground level, camera 20cm off the tarmac, looking up at the front of a [BIKE BLOCK] standing still. Both LED headlights at full output. Slow push toward the nose. Wet tarmac with faint reflections, overcast grey sky, cold light. Photoreal, anamorphic, 24mm.`
- **CAMERA** Slow dolly in, ~8% over the shot
- **LENS** 24mm anamorphic, T2.8, mild barrel distortion
- **LIGHT** Grey ambient, headlights as practicals, faint ground bounce
- **IN** White flash · **OUT** 6-frame cross-dissolve to S5

### S5 — Title plate (parked hero)
- **PURPOSE** Bed for the HONDA CBR600RR / 2026 card.
- **DURATION** 2.5s · **SEED** **P1** (golden hour — the warm beat in the video)
- **PROMPT** `Slow cinematic push-in on a [BIKE BLOCK] parked on brick paving in low golden evening light, long shadows across the ground, warm rim light along the top of the tank and fairing. A white skull-graphic full-face helmet rests on the left mirror. Background softly out of focus. Almost no motion — only a slow camera push and a faint shimmer of light. Photoreal, 35mm, T2.0.`
- **CAMERA** Slow push, 1.00 → 1.06. Nothing else.
- **LENS** 35mm, T2.0
- **LIGHT** Low golden sun from camera-left, deep shadow on the right
- **IN** Cross-dissolve · **OUT** **Whip-pan L→R (5 fr)** into Clip 3

### S6 — Rear tracking
- **PURPOSE** First real motion. Sells the departure.
- **DURATION** 1.0s · **SEED** text-to-video, bike block mandatory
- **PROMPT** `Tracking shot from behind, following a [BIKE BLOCK] riding away along a Dutch city street. [RIDER BLOCK]. Camera holds a constant distance behind the rear wheel. Realistic motion blur on the tarmac and kerbs, the bike itself sharp. Overcast afternoon, brick buildings and bike lanes blurring past. Photoreal, 35mm, handheld gimbal.`
- **CAMERA** Gimbal chase, locked distance, slight float
- **LENS** 35mm, T2.8
- **LIGHT** Flat overcast — matches Clip 3's sky exactly
- **IN** Speed-ramp out of the real shot (100→140%) · **OUT** Match-cut back to Clip 3

### S7 — Front tyre / rim
- **PURPOSE** Texture. Buys a match-cut.
- **DURATION** 1.2s · **SEED** P2, cropped to the front wheel
- **PROMPT** `Extreme close-up of the front wheel of a [BIKE BLOCK] rolling. Black rim with a thin red rim stripe, tyre tread and sidewall lettering sharp, brake disc and gold-anodised caliper bolts visible. The wheel turns; the ground blurs beneath. Shallow depth of field, overcast daylight. Photoreal, 85mm, T2.0.`
- **CAMERA** Low parallel track alongside the wheel
- **LENS** 85mm, T2.0
- **LIGHT** Overcast, soft top light, dark tyre holds detail
- **IN** Match-cut on the wheel · **OUT** Hard cut

### S8 — Low-angle acceleration
- **PURPOSE** First real hit of speed. Energy step-change.
- **DURATION** 1.4s · **SEED** text-to-video
- **PROMPT** `Ground-level low angle, camera almost on the tarmac. A [BIKE BLOCK] accelerates hard away from camera, front wheel light, rear squatting. [RIDER BLOCK]. Heavy realistic motion blur on the road surface, the bike holding sharp. Overcast grey daylight, wet tarmac reflections. Photoreal, 24mm anamorphic.`
- **CAMERA** Locked low, bike departs. Slight shake as it passes — motivated.
- **LENS** 24mm anamorphic, T2.8
- **LIGHT** Grey overcast, tail light as the only warm accent
- **IN** **Speed ramp 100→180%** over 6 frames · **OUT** Whip blur

### S9 — Helmet POV
- **PURPOSE** Puts the viewer on the bike. Retention spike.
- **DURATION** 1.5s · **SEED** text-to-video
- **PROMPT** `First-person point of view from inside a full-face motorcycle helmet, the dark visor edge framing the top and sides of frame. Looking forward down a Dutch city street over the clocks and mirrors of a [BIKE BLOCK]. Gloved hands on the bars in the lower frame. Buildings and parked cars sweep past with realistic motion blur. Overcast daylight. Photoreal, 18mm, subtle natural head movement.`
- **CAMERA** POV, gentle organic head motion. No shake.
- **LENS** 18mm wide, deep focus
- **LIGHT** Natural daylight, slight visor tint on the top third
- **IN** Whip blur · **OUT** Impact cut on an engine hit

### S10 — Pass-by at speed
- **PURPOSE** The single fastest frame in the video.
- **DURATION** 1.2s · **SEED** text-to-video
- **PROMPT** `Static low camera at the roadside. A [BIKE BLOCK] enters frame left and passes very close at high speed, exiting frame right. [RIDER BLOCK]. Strong realistic motion blur on the bike as it crosses, the background sharp. Air disturbance lifts loose leaves. Overcast Dutch street. Photoreal, 50mm, high shutter, natural camera shake as it passes.`
- **CAMERA** Locked. Real shake only on the pass — motivated.
- **LENS** 50mm, T2.8
- **LIGHT** Flat overcast
- **IN** **Impact cut** on the engine transient · **OUT** Hard cut

### S11 — Lean through a corner
- **PURPOSE** Grace. Stops the sequence being all aggression.
- **DURATION** 1.2s · **SEED** text-to-video
- **PROMPT** `Low outside-corner angle. A [BIKE BLOCK] leans into a left-hand bend, knee tucked in, lean angle around 35 degrees. [RIDER BLOCK]. Tyre contact patch and rim stripe visible. Realistic motion blur on the road, bike sharp. Overcast afternoon, damp tarmac. Photoreal, 85mm, T2.8, slight slow motion.`
- **CAMERA** Short arc track, following the lean
- **LENS** 85mm, T2.8
- **LIGHT** Overcast soft, faint sheen on the tank
- **IN** Hard cut · **OUT** Hard cut

### S12 — Night reflections
- **PURPOSE** Tonal turn. Signals the video is ending.
- **DURATION** 1.4s · **SEED** P1, regraded to night
- **PROMPT** `Slow travelling close-up across the matte black fairing and tank of a [BIKE BLOCK] at night. City lights, shop signage and street lamps smear across the bodywork as coloured reflections. The HONDA wordmark catches a highlight. Deep blacks, controlled highlights, no neon underglow. Photoreal, 50mm, T1.8, shallow focus.`
- **CAMERA** Slow lateral travel across the bodywork
- **LENS** 50mm, T1.8
- **LIGHT** Practical city lights only. Nothing artificial on the bike.
- **IN** Hard cut · **OUT** **Match-cut, hard,** into the real hero frame at 0:37.83

> **S12 → hero cut is the most important transition in the video.** Match the reflection sweep to the helmet's visor highlight. Done right it reads as one continuous move from AI into your real face. Done lazily it is just another cut.

---

# 6. TRANSITIONS — rules

**Used, and only where earned:**

| Type | Where | Spec |
|---|---|---|
| Hard cut | Default, ~70% of edits | On-frame, no fade |
| Flash frame | S3→S4 only | **2 frames** white, 60% opacity. Once. |
| Whip pan | S5→Clip 3 | 5 frames, directional blur 180°, L→R |
| Speed ramp | #7→S6, #11→S8 | 100→140% / 100→180%, 6 fr, ease-in |
| Match cut | S7→#11, **S12→#17** | Align shape + motion vector |
| Impact cut | S9→S10 | Land exactly on the engine transient |
| Push-in | #2 (100→104%), #18 (100→106%) | Linear, imperceptible |
| Cross-dissolve | S4→S5 only | 6 frames |
| Fade to black | #18→#19 | 8 frames |

**Not used, deliberately:** zoom blur, glitch, RGB split, light leaks, film burn, spin, page turn, shake presets, any CapCut transition with a name. Every one of them reads as template.

**Camera shake** appears in exactly two places — S2 (engine catch) and S10 (pass-by) — and both are motivated by something happening on screen. Nowhere else.

---

# 7. SOUND DESIGN

### Hierarchy — non-negotiable
1. **Your voice** — always on top, always intelligible
2. Engine
3. Music
4. Ambience

### Dialogue
- Clip 2's audio is **mono, 44.1 kHz, mean −23.6 dB, peak −8.1 dB** — healthy, no clipping.
- **Treatment, minimal:** high-pass 80 Hz (kills wind rumble) · gentle de-esser · compressor **2.5:1, −18 dB threshold, 10 ms attack, 80 ms release** · normalise to **−16 LUFS**.
- **Nothing else.** No reverb, no pitch, no AI voice enhance, no "podcast" EQ. You asked for it natural and that is what keeps it natural.
- Wind is audible throughout. Take **6–8 dB** of broadband reduction, no more — push further and his voice goes metallic.

### Music
- **Type:** atmospheric cinematic. Low sub pulse, sparse percussion, a rising synth pad. Think a car-commercial bed, not EDM, not trap, not a drop.
- **Levels:**

| Section | Level | Note |
|---|---|---|
| 0:00–0:00.80 | −28 dB | sub only, almost subliminal |
| **0:00.80–0:08.83** | **−26 dB** | **under the dialogue. Duck it and leave it ducked.** |
| 0:08.83–0:12.43 | −20 dB | ignition — first lift |
| 0:12.43–0:14.93 | −18 dB | title |
| 0:14.93–0:31.13 | −16 dB | meet — bed builds |
| **0:31.13–0:37.83** | **−11 dB** | **AI speed burst — full energy** |
| 0:37.83–0:41.93 | −14 dB | hero — pull back, let it breathe |
| 0:41.93–0:46.00 | −13 dB → −40 dB | end frame, tail out |

- **Sidechain the music to the dialogue: −9 dB duck, 120 ms attack, 350 ms release.** This single setting is what stops music burying your voice.
- Land the first real energy lift at **0:08.83** — the frame the speech ends. Everything after is licensed to get louder.

### Engine
- Clip 3 is a bike meet: constant crowd and idling-engine bed at a flat ≈−17 dB. **Keep it.** It is real and it sells the location. Filter 40–120 Hz up **+3 dB** for weight.
- AI shots have no usable audio. Replace:
  - **S2** starter whirr + catch — a real CBR600RR cold start, dry
  - **S3** idle settle
  - **S8** hard acceleration through 2nd and 3rd
  - **S10** full doppler pass-by — the loudest moment in the video
  - **S12** distant idle, heavily reverbed
- Engine peaks at **−9 dBFS**. Never above the dialogue.
- **Cut #14 (S10) exactly on the doppler peak.** That is the impact cut.

### Master
- **−14 LUFS integrated**, true peak **−1.0 dBTP**. TikTok normalises to roughly −14; master hotter and it gets turned down and sounds flat.
- Limiter on the master only. No multiband.

---

# 8. COLOUR GRADING

Both clips are iPhone captures under **flat overcast** with a grey-white sky. Clip 2 has patches of blue; Clip 3 is fully overcast. **Match Clip 2 to Clip 3**, not the reverse — the grey is the film's palette and it suits the bike.

### Base — every shot
| Parameter | Value |
|---|---|
| Contrast | +12 |
| Blacks / shadows | **−18** — deep blacks, this is the whole look |
| Highlights | **−22** — controls the blown sky |
| Whites | −6 |
| Saturation | **−8** global |
| Vibrance | +6 |
| Temperature | **−150 K** (cooler) |
| Tint | +4 magenta |

### Curve
Lift the toe **+3 points** for a soft matte black. Pull the shoulder **−5 points**. Straight midtones. This is what makes it read filmic rather than phone-sharp.

### HSL — the important moves
- **Blues** (sky): saturation **−20**, luminance **−12** → grey sky stops competing with the subject
- **Oranges** (skin): saturation **+6**, luminance **+4** → faces stay warm against the cool grade
- **Reds** (Red Bull can, rim stripe): saturation **−12** → the can stops pulling the eye; the rim stripe survives
- **Greens** (foliage): saturation **−25** → the trees behind the fence go neutral

### Per-clip
- **Clip 2:** exposure **−0.15**, highlight recovery on the sky **−30**. Vignette **−18**, feather 60, so his face holds the frame.
- **Clip 3:** exposure **+0.10** (slightly dark), clarity **+8**. On the hero (#17) add a **−22 vignette** and **+6 clarity on the helmet only** — the skull graphic should be the sharpest thing in the video.
- **AI shots:** match to Clip 3 first, then **−4 saturation** and **−6 clarity** relative. AI renders come back over-sharp and over-saturated; sitting them slightly *under* your real footage is what hides the seam.

### Grain
**Yes, but barely.** 35mm fine, **intensity 8/100, size 25, roughness 40.** Its job is to bind AI and real footage into one texture. If you can see it, it is too high.

### Sharpening
Master **+15 only**. Clip 3 is already crisp. Over-sharpening is the single loudest "phone edit" tell.

---

# 9. END FRAME (0:43.43 – 0:46.00, 2.57s)

**Background:** last frame of Clip 3 (visor down, Hayabusa behind), frozen, **60% black overlay**, gaussian blur **12 px**, continuing slow push 1.06 → 1.09. Your face stays faintly visible behind the text — the viewer leaves on *you*, not on a black card.

**Type:**

```
                    @iamhummrider
              MORE RIDES. MORE SPEED.
```

| | @iamhummrider | MORE RIDES. MORE SPEED. |
|---|---|---|
| Size | 96 px | 40 px |
| Weight | Bold 700 | Medium 500 |
| Colour | #FFFFFF 100% | #FFFFFF **65%** |
| Tracking | +0.02em | **+0.18em** |
| Case | as written | UPPERCASE |
| Y baseline | 940 px | 1020 px |

Both centred. **Rule at Y=980:** 1 px, #FFFFFF 25%, width 340 px, centred, between the two lines.

**Animation:** `@iamhummrider` fades up over 8 frames with a 1.00→1.02 scale. Tagline and rule follow **4 frames later**, fade only. Both hold. **No motion on the last 1.5s** — stillness is what makes an end card read premium.

**Hold the final frame a full 2.5s.** TikTok loops; a long, quiet, confident end frame is what converts a viewer into a follower. Cutting it at 1s is the most common way creators lose the follow.

### Branding elsewhere — deliberately sparse
- **0:02.00–0:05.00** — `@iamhummrider`, 28 px, #FFFFFF at **40%**, bottom-left, X=60 / Y=1440. Fades in 6 fr, out 6 fr.
- **That is the only other appearance.** Twice in 46 seconds. Constant username overlay is the clearest amateur signal there is.

---

# 10. EXPORT

| Setting | Value |
|---|---|
| Resolution | **1080 × 1920** (9:16) |
| Frame rate | **30 fps** — matches both sources exactly. Do not conform to 24 or 60. |
| Codec | H.264 High profile (H.265 if your uploader supports it) |
| Bitrate | **VBR 2-pass, target 18 Mbps, max 25 Mbps** |
| Keyframe | Every 2s (60 frames) |
| Colour | Rec.709, **8-bit**, full range off (limited/TV) |
| Audio | AAC-LC, **320 kbps**, 48 kHz, stereo |
| Loudness | **−14 LUFS integrated, −1.0 dBTP** |
| Container | .mp4, **faststart on** |
| Scan | Progressive |

**Upload:** push the file from the phone's native gallery through the TikTok app — not via a share sheet, not from cloud storage. Both add a re-compression pass. In the TikTok uploader turn **"Allow high-quality uploads"** on (Settings → Data Saver → off; Upload HD on).

**Do not** let CapCut export at 1080p/60 "smooth" — it frame-doubles 30 fps content and introduces judder on every speed ramp in this edit.

---

# 11. WHAT I NEED FROM YOU

**To finish this properly, three things:**

1. **Clip 1** — the 20s talking intro. It never arrived. Timeline B has its slot pre-cut.
2. **The transcript of Clip 2** (and Clip 1 when it lands). Four cue windows are measured and waiting. I will not invent the words.
3. **A decision on the riding footage** — reshoot the six shots in §3, or accept that the speed act is fully AI.

Send any of those and I will finalise. Timeline A is buildable tonight exactly as written.
