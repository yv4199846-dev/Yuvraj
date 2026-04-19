# Frame Bridge Sheet — Part-to-Part Continuity
> **Purpose:** Ensure every part's FIRST FRAME visually connects to the PREVIOUS part's LAST FRAME,  
> so the final edit feels like one continuous video, not 7 separate clips.

---

## How to Use This Sheet

**For each part (except Part 1):**
1. Look up the **Last Frame Spec** of the previous part in this sheet
2. Generate that last-frame as a static image using the selected reference images from `characters/reference-image-prompts.md`
3. Use that static image as the **starting frame reference** when generating the current part in Veo3
4. In the Veo3 prompt, also add: *"begins exactly from [last frame description]"*

---

## TRANSITION 1: Part 1 → Part 2

### Part 1 — Last Frame Spec
| Element | Description |
|---------|-------------|
| Setting | Parliament interior, warm gold light |
| Camera position | Medium close-up — PM at podium |
| PM figure | Holding glowing document up, facing forward |
| Background | Chamber benches visible, arched door to the right |
| Color grade | Warm gold, saffron tones |
| Key detail | Glowing document text "नारी शक्ति वंदन अधिनियम" clearly visible |

**Image Gen Prompt (generate this as a static still):**
```
2.5D animated cartoon still frame. Interior of India's Parliament chamber, 
warm golden light. The dignified PM figure (white kurta, saffron shawl, 
grey beard) stands at the podium holding a glowing document above his head 
with both hands. The chamber benches with seated figures are visible behind 
him. An arched doorway visible on the right side. Warm golden-orange color 
fills the scene. Cinematic framing, medium close-up. Use reference: 
pm-figure-ref.png, bg-parliament-interior-warm.png, prop-bill-document.png. 
2.5D animated style, motion-graphic, cartoon illustration.
```
**Save As:** `frames/part-01-last-frame.png`

---

### Part 2 — First Frame Spec
| Element | Description |
|---------|-------------|
| Setting | Split screen — village left, city right |
| Camera position | Wide two-shot before push-in begins |
| Characters | Rural woman left, Urban woman right |
| Color grade | Same warm gold as Part 1 last frame |
| Key detail | Both women facing toward screen (TV/phone) — same warm gold carries over |

**Image Gen Prompt:**
```
2.5D animated cartoon still frame. Split-screen composition. LEFT side: 
a rural Indian woman in red-orange saree with sindoor, sitting in a village 
home, looking at a small TV screen that glows warmly. RIGHT side: a young 
urban woman in modern salwar-kameez, standing with a smartphone showing a 
news headline. Soft golden-saffron bokeh particles float behind both women. 
Warm golden-orange color palette throughout both panels. Wide shot before 
zoom begins. Use references: rural-woman-ref.png, urban-woman-ref.png, 
bg-village-home.png, bg-city-scene.png. 2.5D animated style, cartoon illustration.
```
**Save As:** `frames/part-02-first-frame.png`

---

## TRANSITION 2: Part 2 → Part 3

### Part 2 — Last Frame Spec
| Element | Description |
|---------|-------------|
| Setting | Split screen — same as above |
| Camera position | Close push-in completed — both faces in tight close-up |
| Characters | Both women have turned their gaze LEFT (toward Parliament) |
| Color grade | Still warm gold |
| Key detail | Both women looking left — sets up spatial logic for Part 3 Parliament shot |

**Image Gen Prompt:**
```
2.5D animated cartoon still frame. Split-screen, tight close-up. LEFT: 
rural woman's face, sindoor visible, eyes gazing LEFT with hope and slight 
worry. RIGHT: urban woman's face, eyes also turned LEFT toward Parliament. 
Both women illuminated by warm golden light. Warm gold color grade, same 
as earlier frames. Use references: rural-woman-ref.png, urban-woman-ref.png. 
2.5D animated style, cartoon illustration.
```
**Save As:** `frames/part-02-last-frame.png`

---

### Part 3 — First Frame Spec
| Element | Description |
|---------|-------------|
| Setting | Parliament interior — SAME layout as Part 1 |
| Camera position | Wide shot from back of chamber toward podium |
| Color grade | INSTANTLY cold grey/blue — abrupt shift from Part 2's gold |
| Key detail | Same chamber layout as Part 1 but all warmth gone — jarring contrast |

**Image Gen Prompt:**
```
2.5D animated cartoon still frame. Interior of India's Parliament chamber 
— SAME layout as the warm version (same podium position, same bench 
arrangement, same arched architecture) but the color grade is now cold 
dark grey and icy blue. The golden light is completely gone. Shadow figures 
begin to stir on the benches. The glowing bill document sits on the speaker's 
table at center with an unstable red flicker. Atmosphere is tense and ominous. 
Wide shot from back of chamber. Use references: bg-parliament-interior-cold.png, 
shadow-figures-ref.png, prop-bill-document.png. 2.5D animated style, cartoon illustration.
```
**Save As:** `frames/part-03-first-frame.png`

---

## TRANSITION 3: Part 3 → Part 4

### Part 3 — Last Frame Spec
| Element | Description |
|---------|-------------|
| Setting | Parliament interior, chaos |
| Camera position | Wide shot, benches in full chaos |
| Characters | Shadow figures standing, waving papers aggressively |
| Color grade | Cold grey/dark blue |
| Key detail | BLOCKED stamp clearly visible on the glowing bill document at center |

**Image Gen Prompt:**
```
2.5D animated cartoon still frame. Parliament interior in chaos. Shadow 
figures standing on opposition benches, arms raised, papers flying. Center: 
the glowing bill document on the speaker's table with the red "BLOCKED" 
stamp impression over it. Cold grey-blue light throughout. Ominous, tense. 
Wide shot. Use references: bg-parliament-interior-cold.png, shadow-figures-ref.png, 
prop-bill-document.png, prop-blocked-stamp.png. 2.5D animated style, cartoon illustration.
```
**Save As:** `frames/part-03-last-frame.png`

---

### Part 4 — First Frame Spec
| Element | Description |
|---------|-------------|
| Setting | Parliament corridor/exit — spatial continuation from chamber |
| Camera position | Medium wide, tracking from behind |
| Characters | Opposition figure seen from behind in the corridor |
| Color grade | Dark grey, smoky — continues from Part 3 |
| Key detail | Feels like we've followed the action OUT from the chamber |

**Image Gen Prompt:**
```
2.5D animated cartoon still frame. Parliament corridor leading to exit. 
Dark grey smoky color. A tall figure in white kurta is seen from behind, 
just entering the corridor from the chamber — arms beginning to raise. 
His dark shadow already visible on the stone wall to the right. 
The chamber opening behind him hints at the chaos inside. 
Cold dark grey palette. Use references: opposition-figure-ref.png, 
bg-parliament-interior-cold.png. 2.5D animated style, cartoon illustration. 
IMPORTANT: figure seen from back only.
```
**Save As:** `frames/part-04-first-frame.png`

---

## TRANSITION 4: Part 4 → Part 5

### Part 4 — Last Frame Spec
| Element | Description |
|---------|-------------|
| Setting | Parliament exit — figure has almost left frame |
| Camera position | Tracking shot — figure is near the frame edge (left) |
| Characters | Opposition figure's shadow dominates — the figure itself nearly gone |
| Color grade | Dark grey, smoky |
| Key detail | Blurred logos still visible in background; the "space" left by the figure draws eye to center |

**Image Gen Prompt:**
```
2.5D animated cartoon still frame. Parliament corridor. The tall white-kurta 
figure is almost completely exited left out of frame — only his shadow 
and the edge of his white kurta still visible at the left margin. 
Background shows blurred grey hand logo and barely-visible "I.N.D.I.A." 
text like fading ghosts. The center of frame is now an empty dark grey 
space. Glitch effect overlay on edges. Dark grey, smoky palette. 
Use references: opposition-figure-ref.png. 2.5D animated style, cartoon illustration.
```
**Save As:** `frames/part-04-last-frame.png`

---

### Part 5 — First Frame Spec
| Element | Description |
|---------|-------------|
| Setting | Abstract split space (warm right / dark grey left) |
| Camera position | Wide, the bill document floating in the upper center |
| Color grade | Split — warm right, cold grey left |
| Key detail | The bill document appears to float in the same center-of-frame position as Part 4's empty space |

**Image Gen Prompt:**
```
2.5D animated cartoon still frame. Abstract split space — RIGHT half warm 
golden light, LEFT half cold dark grey shadow. The glowing bill document 
labeled "महिला आरक्षण बिल" floats in the upper-center of the frame, 
just beginning to tilt as if about to fall. No characters visible yet. 
The emptiness on both sides makes the document the sole focus. 
Use references: prop-bill-document.png, bg-abstract-split.png. 
2.5D animated style, cartoon illustration.
```
**Save As:** `frames/part-05-first-frame.png`

---

## TRANSITION 5: Part 5 → Part 6

### Part 5 — Last Frame Spec
| Element | Description |
|---------|-------------|
| Setting | Abstract split space |
| Camera position | Low angle — camera has tilted all the way down |
| Characters | Shadow arms from left side surround the fallen document; rural woman's arm reaching down from right |
| Color grade | Deep red/dark emerging from split |
| Key detail | Document is ON the ground — surrounded. Energy building toward anger. |

**Image Gen Prompt:**
```
2.5D animated cartoon still frame. Abstract split-space, low angle. 
The glowing bill document labeled "महिला आरक्षण बिल" lies on the ground 
at the center-bottom of frame. Dark silhouette arms surround and press 
down on it from the left dark side. From the right warm-golden side, 
a rural woman's arm reaches down, fingers almost touching the document. 
Deep red light begins to bleed into the frame from below. Use references: 
prop-bill-document.png, rural-woman-ref.png, shadow-figures-ref.png, 
bg-abstract-split.png. 2.5D animated style, cartoon illustration.
```
**Save As:** `frames/part-05-last-frame.png`

---

### Part 6 — First Frame Spec
| Element | Description |
|---------|-------------|
| Setting | Bold solid background — deep red/black, no specific location |
| Camera position | Wide 3-shot — all three women visible, full body |
| Characters | Rural woman, Urban woman, Elderly woman standing side by side |
| Color grade | Deep red pulsing against black — angry energy |
| Key detail | Continues from Part 5's red bleed — color transition feels seamless |

**Image Gen Prompt:**
```
2.5D animated cartoon still frame. Three Indian women standing side by 
side against a deep red-black background. LEFT: rural woman in red-orange 
saree, sindoor, fierce expression. CENTER: young urban woman in modern 
salwar, determined eyes. RIGHT: elderly woman in white saree, silver hair, 
fierce wise expression. All three faces are set with intense anger and 
determination. Arms just beginning to rise to point. Wide full-body shot. 
Deep red pulsing background. Use references: rural-woman-ref.png, 
urban-woman-ref.png, elderly-woman-ref.png. 2.5D animated style, cartoon illustration.
```
**Save As:** `frames/part-06-first-frame.png`

---

## TRANSITION 6: Part 6 → Part 7

### Part 6 — Last Frame Spec
| Element | Description |
|---------|-------------|
| Setting | Deep red/black background |
| Camera position | Tight close-up — all three faces and pointing arms |
| Characters | All three women pointing directly at camera, intense eyes |
| Color grade | Deep red + black |
| Key detail | The pointing fingers + the crowd energy sets up the mass crowd of Part 7 |

**Image Gen Prompt:**
```
2.5D animated cartoon still frame. Tight close-up of three Indian women's 
faces and upper bodies. Rural woman (left), urban woman (center), elderly 
woman (right) — all pointing directly at the camera/viewer with fierce 
unwavering expressions. Deep red pulsing glow lights their faces dramatically. 
Behind them, a hint of crowd figures just beginning to appear in the darkness — 
suggesting the crowd that will fill Part 7. Use references: rural-woman-ref.png, 
urban-woman-ref.png, elderly-woman-ref.png. 2.5D animated style, cartoon illustration.
```
**Save As:** `frames/part-06-last-frame.png`

---

### Part 7 — First Frame Spec
| Element | Description |
|---------|-------------|
| Setting | Wide crowd shot — women marching forward |
| Camera position | Wide shot, crowd fills frame |
| Characters | Massive crowd of all women types — the three from Part 6 are the front row |
| Color grade | Dark sky, but crowd is warm and vibrant |
| Key detail | The three women from Part 6 are visible at the front of the crowd — visual continuity |

**Image Gen Prompt:**
```
2.5D animated cartoon still frame. A massive crowd of Indian women marches 
forward, filling the frame edge to edge. The three women from the previous 
scene (rural in red saree, urban in salwar, elderly in white saree) are 
visible in the front row still pointing forward — now leading the crowd. 
Behind them hundreds of women of all types stretch to the horizon. Dark sky 
above. The crowd is vibrant with warm saree colors against the dark sky. 
Wide establishing shot. Use references: rural-woman-ref.png, urban-woman-ref.png, 
elderly-woman-ref.png, prop-women-crowd.png. 2.5D animated style, cartoon illustration.
```
**Save As:** `frames/part-07-first-frame.png`

---

## Summary Table — All Frame Connections

| Transition | Part N Last Frame | Part N+1 First Frame | Bridge Key |
|------------|-------------------|----------------------|------------|
| 1→2 | PM + glowing document, warm gold | Split-screen women, same warm gold | Color match: warm gold |
| 2→3 | Both women looking LEFT | Parliament interior, same orientation | Spatial: women were looking at Parliament |
| 3→4 | Chamber chaos, BLOCKED stamp | Corridor, figure from behind | Spatial: exiting the chamber |
| 4→5 | Figure exited, empty dark center | Bill floating in center | Compositional: center of frame |
| 5→6 | Document on ground, red emerging | Three women, deep red | Color match: red bleed |
| 6→7 | Three women pointing, crowd emerging | Same three women leading full crowd | Character continuity |

---

## Frame Files Checklist

- [ ] `frames/part-01-last-frame.png` — generated and approved
- [ ] `frames/part-02-first-frame.png` — generated and approved (matches Part 1 last frame)
- [ ] `frames/part-02-last-frame.png` — generated and approved
- [ ] `frames/part-03-first-frame.png` — generated and approved (matches Part 2 last frame)
- [ ] `frames/part-03-last-frame.png` — generated and approved
- [ ] `frames/part-04-first-frame.png` — generated and approved (matches Part 3 last frame)
- [ ] `frames/part-04-last-frame.png` — generated and approved
- [ ] `frames/part-05-first-frame.png` — generated and approved (matches Part 4 last frame)
- [ ] `frames/part-05-last-frame.png` — generated and approved
- [ ] `frames/part-06-first-frame.png` — generated and approved (matches Part 5 last frame)
- [ ] `frames/part-06-last-frame.png` — generated and approved
- [ ] `frames/part-07-first-frame.png` — generated and approved (matches Part 6 last frame)

> ✅ All frames above must be approved before generating any Veo3 video clips.
