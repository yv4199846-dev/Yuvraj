# Reference Image Generation Prompts
> **Purpose:** Generate multiple image options for every character, background, and key prop/subject.  
> Pick the best 1–2 images per asset before generating any video frames.  
> **Tool:** Any image generator — Midjourney, DALL-E 3, Ideogram, Adobe Firefly, or Stable Diffusion  
> **Style must match across ALL assets:** `2.5D animated, motion-graphic, cartoon illustration, Indian political symbolism`

---

## HOW TO USE THIS FILE

1. Run each prompt in your image generator → get 4–6 variations
2. Pick the **single best image** per asset (most recognizable, clearest, best animation style)
3. Save the selected image with the filename shown in the **Save As** column
4. Use these saved images as references when generating first-frame images (see `scripts/frame-bridge-sheet.md`)

---

## SECTION A — CHARACTERS

### A1. PM Figure (प्रधानमंत्री प्रतीक)
> Used in: Part 1

**Generate 5–6 variations using this prompt:**
```
2.5D animated cartoon illustration of a tall, dignified Indian political leader. 
He wears a pristine white kurta-pajama with a saffron/orange shawl draped over 
his left shoulder. He has a full grey beard, neatly groomed white hair, and 
deep-set confident eyes. His posture is upright and commanding. He stands with 
both hands raised slightly, palms open — a gesture of presenting or offering. 
Warm golden-saffron glow around him. Full body, front view. Clean white 
background for reference purposes. Motion-graphic style, cartoon illustration, 
not photorealistic.
```

**Variations to test:**
- V1: Standing at podium holding document
- V2: Full body standing pose
- V3: Close-up face/torso
- V4: Side profile view

**Save As:** `characters/selected/pm-figure-ref.png`

---

### A2. Opposition Figure (विपक्ष प्रतीक — Rahul-like)
> Used in: Parts 3, 4  
> ⚠️ CRITICAL: **Back and side profile only — never full face**

**Generate 5–6 variations using this prompt:**
```
2.5D animated cartoon illustration of a tall, lean Indian political figure. 
He wears a plain white kurta-pajama, no ornamentation. He has dark, slightly 
wavy hair, slightly longer than usual. IMPORTANT: show ONLY from behind or 
from a 45-degree side profile — his face must never be fully visible. His arms 
are raised dramatically above his head in protest or defiance. His long shadow 
stretches dramatically across a stone wall behind him. Cold dark grey color 
tone. Clean background for reference purposes. Motion-graphic style, 2.5D 
cartoon, not photorealistic.
```

**Variations to test:**
- V1: Walking away, arms raised
- V2: Side profile, looking left
- V3: Back view, head turned slightly
- V4: Silhouette style with dark shadow

**Save As:** `characters/selected/opposition-figure-ref.png`

---

### A3. Rural Woman (ग्रामीण महिला)
> Used in: Parts 2, 5, 6, 7

**Generate 5–6 variations using this prompt:**
```
2.5D animated cartoon illustration of a middle-aged rural Indian woman. 
She wears a traditional saree in earthy red-orange-yellow tones. She has 
dark hair tied in a bun with small flowers. She has sindoor on her forehead 
and a bindi. Her eyes are large, expressive, and warm — full of emotion. 
Her skin tone is medium-warm brown. Two versions needed: (a) joyful expression 
with tears of happiness, (b) fierce, determined, pointing forward. 
Full body, clean background for reference. Motion-graphic style, 2.5D cartoon 
illustration, Indian political animation style, not photorealistic.
```

**Variations to test:**
- V1: Happy/hopeful, watching TV
- V2: Reaching upward desperately
- V3: Fierce expression, pointing at camera
- V4: Part of a crowd, determined

**Save As:** `characters/selected/rural-woman-ref.png`

---

### A4. Urban Woman (शहरी महिला)
> Used in: Parts 2, 6, 7

**Generate 5–6 variations using this prompt:**
```
2.5D animated cartoon illustration of a young urban Indian woman in her 
late 20s. She wears a modern salwar-kameez in muted teal or blue-grey tones. 
She has dark hair worn open or in a ponytail. Modern minimal makeup, sharp 
confident eyes, no sindoor. She holds a smartphone in one hand. City skyline 
visible behind her (blurred). Two expressions: (a) proud smile looking at phone, 
(b) fierce, pointing directly at camera. Full body, clean background for 
reference. Motion-graphic style, 2.5D cartoon illustration, not photorealistic.
```

**Variations to test:**
- V1: Smiling, holding phone with news
- V2: Fierce expression, pointing
- V3: Standing confidently, city background
- V4: Part of a crowd marching

**Save As:** `characters/selected/urban-woman-ref.png`

---

### A5. Elderly Woman (बुज़ुर्ग महिला)
> Used in: Parts 6, 7

**Generate 5–6 variations using this prompt:**
```
2.5D animated cartoon illustration of an elderly Indian woman in her 60s–70s. 
She wears a simple white or light grey saree — dignified and traditional. 
Her hair is white-silver, pulled back tightly. Her face has deep expressive 
wrinkles. Her eyes are fierce, wise, and burning with quiet fire. She stands 
straight despite her age, with surprising strength in her posture. She points 
one arm directly forward at the camera with fierce determination. 
Full body, clean background. Motion-graphic style, 2.5D cartoon, 
Indian political symbolism, not photorealistic.
```

**Variations to test:**
- V1: Standing tall, pointing
- V2: Face close-up showing fierce eyes
- V3: Standing in crowd
- V4: Arms crossed, stern expression

**Save As:** `characters/selected/elderly-woman-ref.png`

---

### A6. Shadow/Opposition Figures (काले साये)
> Used in: Parts 3, 4, 5

**Generate 5–6 variations using this prompt:**
```
2.5D animated cartoon illustration of dark political shadow figures. 
They are dark grey or near-black silhouettes — their faces are blurred and 
indistinct, no recognizable features. Their posture is aggressive and 
obstructive: arms outstretched blocking, standing up angrily, waving papers. 
Around them, thin dark thread-like lines connect them symbolically. 
A blurred grey outlined hand symbol floats near them. Cold dark grey, ominous 
atmosphere. Group of 3–4 figures on what looks like parliament benches. 
Smoky, glitchy visual quality. Motion-graphic 2.5D style, cartoon illustration.
```

**Variations to test:**
- V1: Group standing up angrily on benches
- V2: Arms outstretched blocking
- V3: Silhouettes connected by dark threads
- V4: Single silhouette looming large

**Save As:** `characters/selected/shadow-figures-ref.png`

---

## SECTION B — BACKGROUNDS & SETTINGS

### B1. Parliament Exterior — Day (Sunrise)
> Used in: Part 1 (opening), Part 7 (night version)

**Generate 4–5 variations:**
```
2.5D animated cartoon illustration of India's new Parliament building 
(Sansad Bhavan) — triangular/pyramidal roof design, stone grey facade, 
grand entrance with pillars. Golden sunrise in the background, warm orange 
and gold sky. Sun rays fall dramatically on the triangular roof. Wide 
establishing shot, slightly low angle looking up. Clean and majestic. 
No people in this reference — just the building and sky. Motion-graphic 
style, Indian political illustration, not photorealistic.
```

**Save As:** `characters/selected/bg-parliament-exterior-day.png`

---

### B2. Parliament Exterior — Night
> Used in: Part 7 (final frame)

**Generate 4–5 variations:**
```
2.5D animated cartoon illustration of India's new Parliament building 
(same Sansad Bhavan triangular roof) at night. Dark sky — deep navy 
to black gradient. The building itself is mostly dark silhouette, but 
a single warm golden-amber light glows from within one of the windows — 
symbolizing hope waiting inside. The contrast between the dark surrounding 
and the single warm light is the KEY visual element. Wide shot. 
Motion-graphic style, 2.5D cartoon, cinematic.
```

**Save As:** `characters/selected/bg-parliament-exterior-night.png`

---

### B3. Parliament Interior — Warm (Parts 1–2)
> Used in: Part 1

**Generate 4–5 variations:**
```
2.5D animated cartoon illustration of the interior of India's Parliament 
chamber — circular hall, tiered benches filled with seated cartoon figures, 
high domed ceiling, ornate pillars. The lighting is warm golden-orange, 
filling the entire hall with a hopeful sunrise glow. A central speaker's 
podium is prominent at the front. The atmosphere is dignified and grand. 
Wide shot from back of chamber looking toward podium. Motion-graphic 
style, cartoon illustration.
```

**Save As:** `characters/selected/bg-parliament-interior-warm.png`

---

### B4. Parliament Interior — Cold/Chaos (Parts 3–4)
> Used in: Parts 3, 4

**Generate 4–5 variations:**
```
2.5D animated cartoon illustration of India's Parliament chamber interior — 
SAME layout as the warm version but with completely different lighting. 
The warm gold is replaced by cold dark grey and icy blue light. Shadow 
figures are standing up from the benches in chaos. Papers flying. 
The atmosphere is oppressive, cold, and tense. A faint red glow 
comes from the center where the speaker's table is. Dark, ominous. 
Wide shot. Motion-graphic style, cartoon illustration.
```

**Save As:** `characters/selected/bg-parliament-interior-cold.png`

---

### B5. Village Home Interior
> Used in: Part 2 (left split-screen)

**Generate 4–5 variations:**
```
2.5D animated cartoon illustration of a simple Indian village home 
interior. Mud-plastered walls, earthy warm tones, a small old CRT 
television set in the corner showing a bright Parliament image on screen. 
Warm golden lamp light. Simple — humble but cozy. No people in this 
reference. Motion-graphic style, cartoon illustration.
```

**Save As:** `characters/selected/bg-village-home.png`

---

### B6. City Scene (Urban Background)
> Used in: Part 2 (right split-screen)

**Generate 4–5 variations:**
```
2.5D animated cartoon illustration of a modern Indian city street 
background. Buildings, traffic lights, billboards in the distance. 
Modern urban feel. Warm golden-orange evening light. Slightly blurred 
for use as background. No people in this reference. Motion-graphic 
style, cartoon illustration.
```

**Save As:** `characters/selected/bg-city-scene.png`

---

### B7. Abstract Split-Space (Warm/Dark)
> Used in: Part 5

**Generate 4–5 variations:**
```
2.5D animated abstract background. The frame is split vertically 
down the center. RIGHT half: warm golden-orange glowing space, soft 
particles of light. LEFT half: cold dark grey shadowy space, smoky 
darkness. The split is a sharp contrast — almost like two different 
worlds meeting. No characters. Motion-graphic style, cartoon illustration.
```

**Save As:** `characters/selected/bg-abstract-split.png`

---

## SECTION C — KEY PROPS & SUBJECTS

### C1. Glowing Bill Document (महिला आरक्षण बिल)
> Used in: Parts 1, 3, 4, 5

**Generate 4–5 variations:**
```
2.5D animated cartoon illustration of an official Indian government 
document/bill. It glows with a warm golden-white light from within. 
The document has a seal at the top and the Hindi text 
"महिला आरक्षण बिल" visible on the front page. The paper has a slight 
luminous quality as if it holds great importance. Shown floating 
in air, slightly angled. Clean background. Motion-graphic illustration style.
```

**Save As:** `characters/selected/prop-bill-document.png`

---

### C2. BLOCKED Stamp Effect
> Used in: Part 3

**Generate 4–5 variations:**
```
2.5D animated cartoon illustration of a bold rubber-stamp impression. 
The word "BLOCKED" in large capital letters, stamped in red ink, 
slightly angled (like a real stamp strike). Aged ink texture, 
stamp imprint quality. The stamp impression appears over the glowing 
bill document. Red on white/off-white. Motion-graphic, graphic design style.
```

**Save As:** `characters/selected/prop-blocked-stamp.png`

---

### C3. Crowd of Women
> Used in: Part 7

**Generate 4–5 variations:**
```
2.5D animated cartoon illustration of a massive crowd of Indian women 
marching forward — filling the entire frame edge to edge. Mix of rural 
women in colorful sarees, urban women in salwar-suits, elderly women 
with white saris. All ages, all walks of life, all moving forward 
with determination. The crowd recedes to the horizon with perspective 
depth. No individual faces need to be detailed in this crowd reference 
— focus on the mass, the movement, the energy. Dynamic, forward-moving. 
Motion-graphic style, cartoon illustration.
```

**Save As:** `characters/selected/prop-women-crowd.png`

---

## SELECTION CHECKLIST

Once all images are generated, tick off each selected reference:

**Characters:**
- [ ] `pm-figure-ref.png` — selected and saved
- [ ] `opposition-figure-ref.png` — selected and saved (back/side ONLY confirmed)
- [ ] `rural-woman-ref.png` — selected and saved (both happy + fierce versions)
- [ ] `urban-woman-ref.png` — selected and saved (both versions)
- [ ] `elderly-woman-ref.png` — selected and saved
- [ ] `shadow-figures-ref.png` — selected and saved

**Backgrounds:**
- [ ] `bg-parliament-exterior-day.png` — selected and saved
- [ ] `bg-parliament-exterior-night.png` — selected and saved
- [ ] `bg-parliament-interior-warm.png` — selected and saved
- [ ] `bg-parliament-interior-cold.png` — selected and saved
- [ ] `bg-village-home.png` — selected and saved
- [ ] `bg-city-scene.png` — selected and saved
- [ ] `bg-abstract-split.png` — selected and saved

**Props:**
- [ ] `prop-bill-document.png` — selected and saved
- [ ] `prop-blocked-stamp.png` — selected and saved
- [ ] `prop-women-crowd.png` — selected and saved

> ✅ All items above must be checked before moving to `scripts/frame-bridge-sheet.md`
