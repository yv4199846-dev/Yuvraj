# नारी शक्ति वंदन — Veo3 Video Production

**Total Duration:** ~55 seconds  
**Format:** 7 parts × ≤8 seconds each  
**Style:** 2.5D animated, motion-graphic, cartoon illustration  
**Tool:** Google Veo3 (Flow) — one scene per generation

---

## Folder Structure

```
nari-shakti-video/
├── README.md                              ← This file (master guide)
├── characters/
│   ├── character-style-guide.md           ← All character descriptions + style tags
│   └── reference-image-prompts.md         ← Image gen prompts for all characters, backgrounds, props
├── frames/                                ← (create this folder) store all selected reference images + frame stills
│   ├── selected/                          ← Best-picked reference images go here
│   └── part-XX-{first|last}-frame.png     ← Generated frame stills per part
├── prompts/
│   ├── part-01-nayi-ummeed.md             ← Part 1: Parliament sunrise scene
│   ├── part-02-bahnon-ki-chamak.md        ← Part 2: Women watching the news
│   ├── part-03-achanak-ruka-safar.md      ← Part 3: Parliament chaos + BLOCKED
│   ├── part-04-vishwasghat-ka-chehra.md   ← Part 4: Figure walks out
│   ├── part-05-girta-hua-sapna.md         ← Part 5: Falling document metaphor
│   ├── part-06-jawab-do.md                ← Part 6: Women demand answer
│   └── part-07-desh-ki-betiyan.md         ← Part 7: Crowd + Parliament bookend
└── scripts/
    ├── full-vo-script.md                  ← Complete VO script + voice casting guide
    └── frame-bridge-sheet.md              ← Last-frame → First-frame connection spec for all 7 parts
```

---

## Quick Reference — All Parts

| Part | Time | Title | Color Grade | VO Lines |
|------|------|-------|-------------|----------|
| 1 | 0:00–0:08 | नई उम्मीद की भोर | 🌅 Warm gold | संसद के उस सदन में... |
| 2 | 0:08–0:16 | करोड़ों बहनों की चमक | 🌅 Warm gold | करोड़ों बहनों की आँखों में... |
| 3 | 0:16–0:24 | अचानक रुका सफर | 🌑 Cold grey/blue | पर अचानक रुका सफर... |
| 4 | 0:24–0:32 | विश्वासघात का चेहरा | 🌑 Dark grey/smoky | मतदान के उस मोड़ पर... |
| 5 | 0:32–0:40 | गिरता हुआ सपना | 🔴 Red/dark + gold split | Congress ने फिर दिखाया... |
| 6 | 0:40–0:48 | जवाब दो! | 🔴 Deep red/black | जवाब दो, जवाब दो... |
| 7 | 0:48–0:55 | देश की बेटियाँ याद रखेंगी | 🌑+🌅 Dark sky + warm Parliament | थम गया है बिल मगर... |

---

## Production Workflow

> **Refined Pipeline:** Reference Images → Frame Stills → Video Generation → VO Recording → Post-Production

---

### Phase 1 — Generate Reference Images (सभी assets की images बनाओ)

> Generate multiple image options for every character, background, and prop. Pick the best one.  
> Full prompts in: `characters/reference-image-prompts.md`

- [ ] Generate 4–6 variations of each character (PM figure, opposition figure, rural woman, urban woman, elderly woman, shadow figures)
- [ ] Generate 4–5 variations of each background (Parliament exterior day, Parliament exterior night, Parliament interior warm, Parliament interior cold, village home, city scene, abstract split space)
- [ ] Generate 4–5 variations of each key prop (glowing bill document, BLOCKED stamp, crowd of women)
- [ ] **Review all generated images → select best 1–2 per asset**
- [ ] Save selected images to `frames/selected/` with the filenames specified in `characters/reference-image-prompts.md`
- [ ] Verify the opposition figure reference shows BACK/SIDE only — reject any with visible full face

> ✅ Do NOT proceed to Phase 2 until all assets in the `characters/reference-image-prompts.md` checklist are ticked.

---

### Phase 2 — Generate Frame Bridge Stills (Part-to-Part continuity images)

> Using the selected reference images, generate a static still for the last frame of each part  
> and the first frame of the next part. These ensure seamless visual connection.  
> Full specs in: `scripts/frame-bridge-sheet.md`

- [ ] Generate `frames/part-01-last-frame.png` (PM at podium, warm gold)
- [ ] Generate `frames/part-02-first-frame.png` → confirm it looks like a continuation of Part 1 last frame
- [ ] Generate `frames/part-02-last-frame.png` (both women looking left)
- [ ] Generate `frames/part-03-first-frame.png` → same Parliament interior, color flipped to cold grey
- [ ] Generate `frames/part-03-last-frame.png` (chaos + BLOCKED stamp)
- [ ] Generate `frames/part-04-first-frame.png` → Parliament corridor, figure from behind
- [ ] Generate `frames/part-04-last-frame.png` (figure exited, shadow remains)
- [ ] Generate `frames/part-05-first-frame.png` → bill floating in abstract space
- [ ] Generate `frames/part-05-last-frame.png` (document on ground, red emerging)
- [ ] Generate `frames/part-06-first-frame.png` → three women standing, deep red
- [ ] Generate `frames/part-06-last-frame.png` (three women pointing, crowd emerging behind)
- [ ] Generate `frames/part-07-first-frame.png` → same three women leading massive crowd

> ✅ Do NOT proceed to Phase 3 until every frame pair looks visually continuous at the cut point.

---

### Phase 3 — Record VO Audio (आवाज़ें रिकॉर्ड करो)

> Two distinct character voices — each stays consistent throughout the entire video.  
> Full guide in: `scripts/full-vo-script.md` → "Voice Casting" section

- [ ] Record **Voice 1 (Main Narrator — deep male baritone)** for Parts 1, 2, 3, 4, 5, 7 in a single session
- [ ] Record **Voice 2 (Crowd/Women — fierce female demand voice)** for Part 6 in a separate session
- [ ] Export each part as separate WAV file: `vo-part-01.wav` through `vo-part-07.wav`, 48kHz mono
- [ ] Each recording must fit within **6.5 seconds** (1.5 sec buffer for visuals)
- [ ] No music under recordings — dry signal only

---

### Phase 4 — Generate Veo3 Video Clips (हर part की video बनाओ)

> Use the selected reference images (Phase 1) AND the first-frame stills (Phase 2) as input.  
> Copy-paste prompts from `prompts/` folder. Generate in order Part 1 → 7.

- [ ] **Part 1** → Use `bg-parliament-exterior-day.png` + `pm-figure-ref.png` + `prop-bill-document.png` as references. Start from scratch (no previous last frame). Review: warm gold color + Parliament exterior.
- [ ] **Part 2** → Use `rural-woman-ref.png` + `urban-woman-ref.png` as references. Add `frames/part-02-first-frame.png` as starting frame. Confirm warm gold matches Part 1.
- [ ] **Part 3** → Use `bg-parliament-interior-cold.png` + `shadow-figures-ref.png` as references. Add `frames/part-03-first-frame.png`. **CRITICAL:** confirm same Parliament layout as Part 1 with color flip to cold grey.
- [ ] **Part 4** → Use `opposition-figure-ref.png` as reference. Add `frames/part-04-first-frame.png`. **CRITICAL:** figure must be BACK/SIDE only — regenerate if face is visible.
- [ ] **Part 5** → Use `prop-bill-document.png` + `rural-woman-ref.png` + `shadow-figures-ref.png`. Add `frames/part-05-first-frame.png`. Confirm bill document visually matches Part 3.
- [ ] **Part 6** → Use `rural-woman-ref.png` + `urban-woman-ref.png` + `elderly-woman-ref.png`. Add `frames/part-06-first-frame.png`. Confirm text animation and fierce face expressions.
- [ ] **Part 7** → Use `prop-women-crowd.png` + `bg-parliament-exterior-night.png`. Add `frames/part-07-first-frame.png`. Confirm crowd + Parliament night bookend matches Part 1 building.

> **Tip for continuity breaks:** Re-run the part with the note  
> `"begins exactly from: [description of previous part's last frame]"` added to the prompt.

---

### Phase 5 — Post-Production (CapCut / Premiere / DaVinci)

- [ ] Import all 7 clips in order
- [ ] Sync `vo-part-0X.wav` to each respective clip
- [ ] Add text overlays (see `scripts/full-vo-script.md` → "Text Overlays" table)
- [ ] Add background music track:
  - [ ] 0:00–0:16 — Hopeful orchestral (slow brass + strings)
  - [ ] 0:16–0:32 — Tense/dark (discordant low brass, buzzing)
  - [ ] 0:32–0:48 — Rising intensity (percussion + strings building)
  - [ ] 0:48–0:55 — Full orchestral swell → silence on freeze frame
- [ ] Final color grade pass:
  - [ ] Ensure smooth warm→grey→red→dark/warm progression across all cuts
  - [ ] Color match the Part 1 Parliament exterior to Part 7 Parliament exterior

---

### Phase 6 — Final Review

- [ ] Watch full 55-second video end-to-end
- [ ] Check every cut point feels seamless (refer to `scripts/frame-bridge-sheet.md` for what to look for)
- [ ] Check VO lipsync on all parts
- [ ] Check Voice 1 sounds consistent across Parts 1–5 and 7
- [ ] Check Voice 2 (Part 6) stands out clearly as distinct
- [ ] Check text overlay timing matches VO
- [ ] Export final: 1080p or 4K, H.264 MP4

---

## Key Veo3 Prompting Tips

1. **Always include** at the end of every prompt:  
   `"2.5D animated style, motion-graphic, cartoon illustration, Indian political symbolism, cinematic lighting"`

2. **Specify camera movement** in every prompt (slow zoom-in, gentle push-in, tracking shot, crane pull-back)

3. **For Parts 3 and 7**, include: `"same Parliament building from Part 1, triangular roof Sansad Bhavan"`

4. **For Part 4**, if the figure's face is shown — **reject and regenerate** with stronger instruction:  
   `"back view only, never face the camera, seen only from behind or 45-degree side profile"`

5. **For seamless cuts:** End frame of each part must spatially connect to the start frame of the next part

6. **Character descriptions** — never use real names in Veo3 prompts, only symbolic descriptions from the style guide

---

## Color Grade Reference

```
Part 1 ──► Part 2 ──► Part 3 ──► Part 4 ──► Part 5 ──► Part 6 ──► Part 7
🌅 Gold    🌅 Gold    🌑 Grey    🌑 Dark    🔴 Split   🔴 Red     🌑+🌅
Warm       Warm       Cold       Smoky      Warm/Dark  Pulsing    Night+Light
```
