# ProfitPilot Web App

Mobile-friendly web app for managing your daily AI image prompts.

## Features

- **Daily prompts**: 6 morning + 6 evening prompts automatically generated each day
- **One topic per batch**: All 6 morning prompts use the same niche/scene; evening uses a different one
- **Copy-to-clipboard**: One tap to copy any prompt for Nano Banana / Google Flow AI
- **Image upload**: Upload your generated image — it auto-saves linked to its prompt
- **Like / Dislike**: 👍 to save favourites, 👎 to regenerate a fresh prompt
- **Gallery**: All your saved images with their prompts in one place

## Setup (one time)

```bash
cd webapp
pip install -r requirements.txt
python app.py
```

## Access from your phone

1. Start the server on your computer/laptop:
   ```bash
   python app.py
   ```
2. Find your computer's local IP address (e.g. run `ipconfig` on Windows or `ifconfig` on Mac/Linux)
3. Open `http://<your-computer-ip>:5000` in your phone's browser (replace `<your-computer-ip>` with the IP from step 2, same WiFi required)

> **Tip:** On most Android phones you can add it to your home screen via the browser menu for an app-like experience.

## How it works

| Action | What to do |
|--------|-----------|
| See today's prompts | Open the app — Today tab auto-loads |
| Copy a prompt | Tap **📋 Copy Prompt** under any card |
| Add your image | Tap the image area or **📷 Upload image** |
| Like a prompt | Tap **👍** |
| Dislike & replace | Tap **👎** → then **🔄 Get New Prompt** |
| View gallery | Switch to the **🖼️ Gallery** tab |

## Files created

| File | Purpose |
|------|---------|
| `webapp/app.py` | Flask backend |
| `webapp/templates/index.html` | Mobile UI |
| `webapp/prompts.db` | SQLite database (auto-created) |
| `webapp/static/uploads/` | Uploaded images (auto-created) |
