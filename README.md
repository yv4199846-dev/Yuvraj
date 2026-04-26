# ProfitPilot — AI Image Prompt Workflow

> **Yuvraj Verma** | Founder, [ProfitPilot](https://instagram.com/ProfitPilot.india)  
> AI video production partner for brands · Personal AI expert brand growth

---

## Overview

This repo powers a daily Instagram growth workflow where Yuvraj posts AI-generated images of himself in different niches, captions them with *"Comment 'PROMPT' and I'll DM you the prompt 🔥"*, and sends the exact AI prompt as a DM to every commenter — driving engagement and establishing him as an AI expert.

---

## Files

| File | Purpose |
|---|---|
| `prompt_generator.py` | Main CLI — generates today's prompt, Instagram caption, and DM message |
| `niches.json` | Library of 32 niche scenarios + face/quality base data |
| `prompt_log.json` | Auto-created log of all prompts generated (skips repeats for 7 days) |

---

## Quick Start

```bash
# No install needed — uses Python 3 standard library only
python prompt_generator.py
```

### Commands

```bash
# Today's auto-rotated prompt (different niche every day, no repeats for 7 days)
python prompt_generator.py

# List all 32 available niches
python prompt_generator.py --list

# Pick a specific niche by ID
python prompt_generator.py --niche 10

# Pick a random niche from a category
python prompt_generator.py --category "Pop Culture"
python prompt_generator.py --category "Adventure"
python prompt_generator.py --category "Business/Luxury"
python prompt_generator.py --category "Professional"
python prompt_generator.py --category "Seasonal/Trending"

# View prompt history (last 10 used)
python prompt_generator.py --history

# Generate without saving to log
python prompt_generator.py --no-log
```

### Output for Each Run

1. **AI Image Prompt** — paste directly into Midjourney, Leonardo AI, or Stable Diffusion
2. **Instagram Caption** — ready to copy-paste with hashtags
3. **DM Message** — pre-written reply to send to commenters

---

## Daily Workflow

```
Step 1 → Run: python prompt_generator.py
Step 2 → Copy the prompt → generate image in Midjourney/Leonardo AI
Step 3 → Post image to Instagram with the generated caption
Step 4 → Set up ManyChat to auto-DM the prompt when someone comments "PROMPT"
Step 5 → Track weekly engagement growth
```

---

## Niche Categories (32 total)

| Category | Examples |
|---|---|
| Business/Luxury | CEO Boardroom, Private Jet, Penthouse, Yacht Party, Art Collector |
| Adventure | Mountain Summit, Astronaut, Jungle Explorer, Arctic Expedition, F1 Driver |
| Pop Culture | Marvel Superhero, Cyberpunk Hacker, Mughal Emperor, Samurai, Bollywood Star |
| Professional | TED Talk Speaker, NASA Scientist, World Leader, AI Research Lab |
| Seasonal/Trending | Diwali Royalty, Holi Festival, Maldives Entrepreneur, New Year |

---

## Customization

Edit `niches.json` to:
- Update `face_description` with more specific details about your face
- Add new niche entries following the same JSON structure
- Adjust `base_quality_tags` for different image generators (e.g. add `--ar 4:5` for Instagram portrait ratio in Midjourney)

---

## DM Automation (Recommended: ManyChat)

1. Connect Instagram account to [ManyChat](https://manychat.com)
2. Create a **Comment Trigger** for the keyword `PROMPT`
3. Set the DM action to send the prompt message (update daily from script output)
4. Add a CTA button linking to @ProfitPilot.india in the DM

---

*Built for ProfitPilot — AI video production partner for brands.*
