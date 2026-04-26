#!/usr/bin/env python3
"""
ProfitPilot Web App
-------------------
Mobile-friendly web app to:
  - Generate daily AI image prompts (6 morning + 6 evening, one topic per batch)
  - Upload generated images linked to each prompt
  - Like / dislike prompts (disliked ones can be regenerated)
  - Copy prompts to clipboard
  - Gallery view: all saved images with their prompts

Run:
    cd webapp
    pip install -r requirements.txt
    python app.py
Then open http://localhost:5000 on your phone (same WiFi).
"""

import json
import os
import random
import sqlite3
import shutil
from datetime import date, datetime
from pathlib import Path

from flask import (
    Flask,
    abort,
    g,
    jsonify,
    redirect,
    render_template,
    request,
    send_from_directory,
    url_for,
)

# ── Paths ──────────────────────────────────────────────────────────────────────
BASE_DIR = Path(__file__).parent
REPO_DIR = BASE_DIR.parent
NICHES_FILE = REPO_DIR / "niches.json"
DB_FILE = BASE_DIR / "prompts.db"
UPLOAD_DIR = BASE_DIR / "static" / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp", "gif"}

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 20 * 1024 * 1024  # 20 MB max upload

# ── Variation adjectives injected per slot to diversify the 6 prompts ──────────
SLOT_VARIATIONS = [
    "",                                              # slot 1 – base prompt
    "close-up portrait,",                           # slot 2
    "wide establishing shot,",                      # slot 3
    "dynamic action pose,",                         # slot 4
    "contemplative expression, soft mood,",         # slot 5
    "epic low-angle hero shot,",                    # slot 6
]

# ── Niches ─────────────────────────────────────────────────────────────────────

def load_niches():
    with open(NICHES_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

# ── Database ───────────────────────────────────────────────────────────────────

def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(str(DB_FILE))
        g.db.row_factory = sqlite3.Row
    return g.db


@app.teardown_appcontext
def close_db(exc=None):
    db = g.pop("db", None)
    if db is not None:
        db.close()


def init_db():
    db = sqlite3.connect(str(DB_FILE))
    db.row_factory = sqlite3.Row
    db.executescript("""
        CREATE TABLE IF NOT EXISTS batches (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            date       TEXT    NOT NULL,
            session    TEXT    NOT NULL,   -- 'morning' | 'evening'
            niche_id   INTEGER NOT NULL,
            niche_name TEXT    NOT NULL,
            created_at TEXT    NOT NULL,
            UNIQUE(date, session)
        );

        CREATE TABLE IF NOT EXISTS prompts (
            id            INTEGER PRIMARY KEY AUTOINCREMENT,
            batch_id      INTEGER NOT NULL REFERENCES batches(id),
            slot          INTEGER NOT NULL,   -- 1-6
            full_prompt   TEXT    NOT NULL,
            feedback      INTEGER DEFAULT NULL,  -- NULL=none 1=liked 0=disliked
            image_path    TEXT    DEFAULT NULL,
            created_at    TEXT    NOT NULL
        );
    """)
    db.commit()
    db.close()


# ── Prompt generation ──────────────────────────────────────────────────────────

def build_prompt(niche, data, variation_prefix=""):
    face = data["face_description"]
    quality = data["base_quality_tags"]
    prefix = f"{variation_prefix} " if variation_prefix else ""
    return (
        f"{prefix}{niche['style']} portrait of {face}, "
        f"{niche['scene']}, "
        f"{niche['lighting']}, "
        f"{niche['camera']}, "
        f"{quality}"
    )


def pick_niche_for_session(data, today_str, session):
    """
    Pick a niche for morning or evening.
    - Morning: day-of-year index (even niches)
    - Evening: day-of-year index (offset by half the list)
    Avoids repeating the same niche on the same day for opposite session.
    """
    db = get_db()
    niches = data["niches"]
    total = len(niches)
    day_idx = date.today().timetuple().tm_yday

    # IDs used in last 14 days (both sessions)
    rows = db.execute(
        "SELECT niche_id FROM batches WHERE date >= date('now','-14 days')"
    ).fetchall()
    recent_ids = {r["niche_id"] for r in rows}

    if session == "morning":
        base = day_idx % total
    else:
        base = (day_idx + total // 2) % total

    for offset in range(total):
        candidate = niches[(base + offset) % total]
        if candidate["id"] not in recent_ids:
            return candidate

    # Fallback – all used recently, just return base
    return niches[base]


def ensure_batch(session):
    """
    Make sure today's morning/evening batch exists in the DB.
    Returns list of prompt rows for that batch.
    """
    db = get_db()
    today_str = date.today().isoformat()

    batch = db.execute(
        "SELECT * FROM batches WHERE date=? AND session=?",
        (today_str, session),
    ).fetchone()

    if batch is None:
        data = load_niches()
        niche = pick_niche_for_session(data, today_str, session)
        now = datetime.now().isoformat()

        cur = db.execute(
            "INSERT INTO batches (date, session, niche_id, niche_name, created_at) "
            "VALUES (?,?,?,?,?)",
            (today_str, session, niche["id"], niche["name"], now),
        )
        batch_id = cur.lastrowid

        for slot, var in enumerate(SLOT_VARIATIONS, start=1):
            prompt_text = build_prompt(niche, data, var)
            db.execute(
                "INSERT INTO prompts (batch_id, slot, full_prompt, created_at) "
                "VALUES (?,?,?,?)",
                (batch_id, slot, prompt_text, now),
            )
        db.commit()
        batch = db.execute(
            "SELECT * FROM batches WHERE id=?", (batch_id,)
        ).fetchone()

    prompts = db.execute(
        "SELECT * FROM prompts WHERE batch_id=? ORDER BY slot",
        (batch["id"],),
    ).fetchall()
    return dict(batch), [dict(p) for p in prompts]


# ── Helpers ────────────────────────────────────────────────────────────────────

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def safe_filename(filename):
    """Return a timestamped safe filename."""
    ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else "jpg"
    return f"{datetime.now().strftime('%Y%m%d_%H%M%S_%f')}.{ext}"


# ── Routes ─────────────────────────────────────────────────────────────────────

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/today")
def api_today():
    morning_batch, morning_prompts = ensure_batch("morning")
    evening_batch, evening_prompts = ensure_batch("evening")
    return jsonify(
        today=date.today().isoformat(),
        morning={"batch": morning_batch, "prompts": morning_prompts},
        evening={"batch": evening_batch, "prompts": evening_prompts},
    )


@app.route("/api/gallery")
def api_gallery():
    db = get_db()
    rows = db.execute(
        """
        SELECT p.id, p.full_prompt, p.feedback, p.image_path,
               b.date, b.session, b.niche_name, p.slot
        FROM prompts p
        JOIN batches b ON b.id = p.batch_id
        WHERE p.image_path IS NOT NULL
        ORDER BY b.date DESC, b.session, p.slot
        """
    ).fetchall()
    return jsonify([dict(r) for r in rows])


@app.route("/api/upload/<int:prompt_id>", methods=["POST"])
def api_upload(prompt_id):
    db = get_db()
    prompt = db.execute("SELECT * FROM prompts WHERE id=?", (prompt_id,)).fetchone()
    if prompt is None:
        abort(404, "Prompt not found")

    if "image" not in request.files:
        abort(400, "No image file in request")
    file = request.files["image"]
    if file.filename == "":
        abort(400, "Empty filename")
    if not allowed_file(file.filename):
        abort(400, "File type not allowed")

    filename = safe_filename(file.filename)
    save_path = UPLOAD_DIR / filename
    file.save(str(save_path))

    # Remove old image if exists
    if prompt["image_path"]:
        old = UPLOAD_DIR / prompt["image_path"]
        if old.exists():
            old.unlink()

    db.execute(
        "UPDATE prompts SET image_path=? WHERE id=?", (filename, prompt_id)
    )
    db.commit()
    return jsonify(ok=True, image_path=filename)


@app.route("/api/feedback/<int:prompt_id>", methods=["POST"])
def api_feedback(prompt_id):
    db = get_db()
    body = request.get_json(silent=True) or {}
    value = body.get("value")  # 1 = liked, 0 = disliked
    if value not in (0, 1):
        abort(400, "value must be 0 or 1")

    db.execute("UPDATE prompts SET feedback=? WHERE id=?", (value, prompt_id))
    db.commit()
    return jsonify(ok=True, feedback=value)


@app.route("/api/regenerate/<int:prompt_id>", methods=["POST"])
def api_regenerate(prompt_id):
    """Replace a disliked prompt with a fresh one from a different niche."""
    db = get_db()
    prompt = db.execute(
        "SELECT p.*, b.date, b.session FROM prompts p "
        "JOIN batches b ON b.id=p.batch_id WHERE p.id=?",
        (prompt_id,),
    ).fetchone()
    if prompt is None:
        abort(404, "Prompt not found")

    data = load_niches()
    niches = data["niches"]

    # Pick a niche not used today
    used_today = {
        r["niche_id"]
        for r in db.execute(
            "SELECT niche_id FROM batches WHERE date=?", (prompt["date"],)
        ).fetchall()
    }
    candidates = [n for n in niches if n["id"] not in used_today]
    if not candidates:
        candidates = niches  # fallback

    niche = random.choice(candidates)
    slot = prompt["slot"]
    var = SLOT_VARIATIONS[slot - 1] if slot <= len(SLOT_VARIATIONS) else ""
    new_prompt_text = build_prompt(niche, data, var)

    db.execute(
        "UPDATE prompts SET full_prompt=?, feedback=NULL, image_path=NULL WHERE id=?",
        (new_prompt_text, prompt_id),
    )
    db.commit()
    return jsonify(ok=True, new_prompt=new_prompt_text)


@app.route("/static/uploads/<path:filename>")
def uploaded_file(filename):
    return send_from_directory(str(UPLOAD_DIR), filename)


# ── Entry point ────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    init_db()
    # host="0.0.0.0" lets your phone access it on the same WiFi
    app.run(host="0.0.0.0", port=5000, debug=False)
