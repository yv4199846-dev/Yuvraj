# नारी शक्ति वंदन — Veo3 Video Production

**Total Duration:** ~55 seconds  
**Format:** 7 parts × ≤8 seconds each  
**Style:** 2.5D animated, motion-graphic, cartoon illustration  
**Tool:** Google Veo3 (Flow) — one scene per generation

---

## Folder Structure

```
nari-shakti-video/
├── README.md                         ← This file (master guide)
├── characters/
│   └── character-style-guide.md      ← All character descriptions + style tags
├── prompts/
│   ├── part-01-nayi-ummeed.md        ← Part 1: Parliament sunrise scene
│   ├── part-02-bahnon-ki-chamak.md   ← Part 2: Women watching the news
│   ├── part-03-achanak-ruka-safar.md ← Part 3: Parliament chaos + BLOCKED
│   ├── part-04-vishwasghat-ka-chehra.md ← Part 4: Figure walks out
│   ├── part-05-girta-hua-sapna.md    ← Part 5: Falling document metaphor
│   ├── part-06-jawab-do.md           ← Part 6: Women demand answer
│   └── part-07-desh-ki-betiyan.md    ← Part 7: Crowd + Parliament bookend
└── scripts/
    └── full-vo-script.md             ← Complete VO script with recording notes
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

### Step 1 — Prepare Reference Material
- [ ] Upload reference character images to Veo3 interface
- [ ] Use character style guide (`characters/character-style-guide.md`) to describe each character in prompts
- [ ] Confirm animation style tag to use in every prompt: `"2.5D animated style, motion-graphic, cartoon illustration"`

### Step 2 — Record VO Audio
- [ ] Record all 7 VO segments separately (see `scripts/full-vo-script.md`)
- [ ] Each recording must fit within 6.5 seconds (leaving 1.5 sec buffer for visuals)
- [ ] Export as WAV, 48kHz, mono

### Step 3 — Generate in Veo3 (in order, Part 1 → 7)
- [ ] **Part 1** → Generate → Review Parliament exterior + warm gold color grade
- [ ] **Part 2** → Generate → Confirm warm color consistency with Part 1
- [ ] **Part 3** → Generate → Confirm same Parliament interior from Part 1 + color shift to grey
- [ ] **Part 4** → Generate → **CRITICAL: Figure must be back/side profile ONLY — regenerate if face is visible**
- [ ] **Part 5** → Generate → Confirm bill document visual matches Part 3 document
- [ ] **Part 6** → Generate → Confirm text animation timing and face expressions on all 3 women
- [ ] **Part 7** → Generate → Confirm crowd + Parliament bookend matches Part 1 building

> **Tip:** If continuity breaks, re-run the specific part with the note `"same Parliament building from Part 1"` or `"continues from previous scene"` added to the prompt.

### Step 4 — Post-Production (CapCut / Premiere / DaVinci)
- [ ] Import all 7 clips in order
- [ ] Sync VO audio to each respective clip
- [ ] Add text overlays (see `scripts/full-vo-script.md` Text Overlays table)
- [ ] Add background music track:
  - [ ] 0:00–0:16 — Hopeful orchestral (slow brass + strings)
  - [ ] 0:16–0:32 — Tense/dark (discordant low brass, buzzing)
  - [ ] 0:32–0:48 — Rising intensity (percussion + strings building)
  - [ ] 0:48–0:55 — Full orchestral swell → silence on freeze frame
- [ ] Final color grade pass:
  - [ ] Ensure smooth warm→grey→red→dark/warm progression across all cuts
  - [ ] Color match the Part 1 Parliament exterior to Part 7 Parliament exterior

### Step 5 — Final Review
- [ ] Watch full 55-second video end-to-end
- [ ] Check all cuts feel seamless
- [ ] Check VO lipsync on all parts
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
