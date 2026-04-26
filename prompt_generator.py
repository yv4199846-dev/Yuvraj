#!/usr/bin/env python3
"""
ProfitPilot AI Image Prompt Generator
--------------------------------------
Daily prompt generator for Yuvraj Verma's personal AI expert Instagram brand.

Usage:
    python prompt_generator.py                  # Today's auto-rotated niche
    python prompt_generator.py --list           # List all available niches
    python prompt_generator.py --niche 5        # Pick a specific niche by ID
    python prompt_generator.py --category "Adventure"  # Random niche from category
    python prompt_generator.py --history        # Show last 7 days of used prompts
"""

import json
import os
import sys
import random
import argparse
from datetime import date, datetime

# ── Paths ──────────────────────────────────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
NICHES_FILE = os.path.join(SCRIPT_DIR, "niches.json")
LOG_FILE = os.path.join(SCRIPT_DIR, "prompt_log.json")

# ── Load data ──────────────────────────────────────────────────────────────────

def load_niches():
    with open(NICHES_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def load_log():
    if not os.path.exists(LOG_FILE):
        return []
    with open(LOG_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_log(log):
    with open(LOG_FILE, "w", encoding="utf-8") as f:
        json.dump(log, f, indent=2, ensure_ascii=False)


# ── Niche selection ────────────────────────────────────────────────────────────

def pick_niche_by_day(niches, log):
    """
    Rotate through niches by day-of-year so each day gets a different niche.
    Skips niches used in the past 7 days to avoid repeats.
    """
    all_niches = niches["niches"]
    total = len(all_niches)

    # IDs used in the last 7 days
    recent_ids = {entry["niche_id"] for entry in log[-7:]}

    # Day-of-year drives the base index so the same day always starts at the same niche
    day_index = date.today().timetuple().tm_yday % total

    for offset in range(total):
        candidate = all_niches[(day_index + offset) % total]
        if candidate["id"] not in recent_ids:
            return candidate

    # All niches were used recently — just use the day-index one
    return all_niches[day_index]


def pick_niche_by_id(niches, niche_id):
    for n in niches["niches"]:
        if n["id"] == niche_id:
            return n
    return None


def pick_niche_by_category(niches, category):
    matches = [n for n in niches["niches"] if n["category"].lower() == category.lower()]
    if not matches:
        return None
    return random.choice(matches)


# ── Prompt builder ─────────────────────────────────────────────────────────────

def build_prompt(niche, data):
    face = data["face_description"]
    quality = data["base_quality_tags"]

    prompt = (
        f"{niche['style']} portrait of {face}, "
        f"{niche['scene']}, "
        f"{niche['lighting']}, "
        f"{niche['camera']}, "
        f"{quality}"
    )
    return prompt


def build_dm_message(niche, prompt):
    return (
        f"Hey! 👋 Thanks for your interest! Here's the exact AI prompt I used to create that image:\n\n"
        f"🎨 *{niche['name']}*\n\n"
        f"📋 PROMPT:\n{prompt}\n\n"
        f"You can use this in Midjourney, Leonardo AI, or any image generator. "
        f"Add your own face reference for best results! 🔥\n\n"
        f"Want more exclusive prompts daily? Follow @ProfitPilot.india for AI video content "
        f"and stay tuned to this account for daily AI prompts! 🚀"
    )


def build_instagram_caption(niche):
    return (
        f"🤖 AI {niche['name']} — Would you wear this life? 👀\n\n"
        f"Comment 'PROMPT' and I'll DM you the exact AI prompt I used to create this! 🔥\n\n"
        f"#AIArt #AIPortrait #MidjourneyAI #LeonardoAI #AIPhotography "
        f"#AIExpert #{niche['category'].replace('/', '').replace(' ', '')} "
        f"#ProfitPilot #AIContent #PromptEngineering #YuvrajVerma"
    )


# ── Logging ────────────────────────────────────────────────────────────────────

def log_prompt(log, niche, prompt):
    entry = {
        "date": date.today().isoformat(),
        "niche_id": niche["id"],
        "niche_name": niche["name"],
        "category": niche["category"],
        "prompt": prompt,
        "logged_at": datetime.now().isoformat()
    }
    log.append(entry)
    save_log(log)
    return entry


# ── Display helpers ────────────────────────────────────────────────────────────

def print_separator(char="─", width=70):
    print(char * width)


def print_result(niche, prompt, dm_message, caption):
    print_separator("═")
    print(f"  🎯  TODAY'S NICHE: {niche['name']}  [{niche['category']}]")
    print_separator("═")

    print("\n📋  AI IMAGE PROMPT (copy into Midjourney / Leonardo AI):\n")
    print(f"  {prompt}")

    print_separator()
    print("\n📸  INSTAGRAM CAPTION:\n")
    for line in caption.split("\n"):
        print(f"  {line}")

    print_separator()
    print("\n💬  DM MESSAGE (send to commenters):\n")
    for line in dm_message.split("\n"):
        print(f"  {line}")

    print_separator("═")
    print()


def print_history(log):
    if not log:
        print("No prompt history yet.")
        return
    print_separator("═")
    print("  📅  PROMPT HISTORY (last 10 entries)")
    print_separator("═")
    for entry in reversed(log[-10:]):
        print(f"\n  [{entry['date']}]  {entry['niche_name']}  ({entry['category']})")
        print(f"  {entry['prompt'][:100]}...")
    print()


def print_niche_list(niches):
    print_separator("═")
    print("  📚  ALL AVAILABLE NICHES")
    print_separator("═")
    current_category = None
    for n in sorted(niches["niches"], key=lambda x: (x["category"], x["id"])):
        if n["category"] != current_category:
            current_category = n["category"]
            print(f"\n  🏷️  {current_category}")
            print_separator("-", 50)
        print(f"    [{n['id']:2d}]  {n['name']}")
    print()


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="ProfitPilot Daily AI Image Prompt Generator",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )
    parser.add_argument("--list", action="store_true", help="List all available niches")
    parser.add_argument("--niche", type=int, metavar="ID", help="Pick a specific niche by ID")
    parser.add_argument("--category", type=str, help="Pick a random niche from a category")
    parser.add_argument("--history", action="store_true", help="Show prompt history")
    parser.add_argument("--no-log", action="store_true", help="Generate prompt without saving to log")
    args = parser.parse_args()

    data = load_niches()
    log = load_log()

    if args.list:
        print_niche_list(data)
        return

    if args.history:
        print_history(log)
        return

    # Select niche
    if args.niche:
        niche = pick_niche_by_id(data, args.niche)
        if not niche:
            print(f"❌  Niche ID {args.niche} not found. Use --list to see all niches.")
            sys.exit(1)
    elif args.category:
        niche = pick_niche_by_category(data, args.category)
        if not niche:
            categories = sorted(set(n["category"] for n in data["niches"]))
            print(f"❌  Category '{args.category}' not found.")
            print(f"   Available: {', '.join(categories)}")
            sys.exit(1)
    else:
        niche = pick_niche_by_day(data, log)

    # Build outputs
    prompt = build_prompt(niche, data)
    dm_message = build_dm_message(niche, prompt)
    caption = build_instagram_caption(niche)

    # Display
    print_result(niche, prompt, dm_message, caption)

    # Log
    if not args.no_log:
        log_prompt(log, niche, prompt)
        print(f"  ✅  Logged to prompt_log.json\n")


if __name__ == "__main__":
    main()
