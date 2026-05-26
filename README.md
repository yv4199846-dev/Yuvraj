# Diana Premium AI Reader

A premium dark-mode local reader for `.pdf` and `.epub` files with AI-assisted reading utilities.

## Features

- Robust format rendering with:
  - `pdfjs-dist` for PDFs
  - `epubjs` for EPUBs
- Continuous vertical reading flow (no left/right pagination)
- Collapsible Table of Contents sidebar
- Premium glassmorphism UI (custom CSS, responsive layout)
- Dark theme by default
- Smart PDF inversion (`invert + hue-rotate`) for dark reading
- EPUB typography enhancements:
  - Vibrant royal blue `h1/h2`
  - Cursive, accented `blockquote`
- Smart Selection tooltip:
  - Highlight (saved locally)
  - Dictionary (EN + HI)
  - AI Explain
- `✨ AI Chapter Summary` action for currently visible content
- `AI Revisions` hub with persistent:
  - Saved Highlights + timestamps
  - Vocabulary (Word + EN + HI)

## Tech Stack

- Vite (Vanilla JS)
- HTML/CSS/JS
- `pdfjs-dist`
- `epubjs`
- Local persistence via `localStorage`

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Make it Live

### 1) Local live

```bash
cd /tmp/workspace/yv4199846-dev/Yuvraj
npm install
npm run dev
```

Open the shown URL in browser (usually `http://localhost:5173`).

### 2) Internet par live deploy (public URL)

Before deploy, verify production build:

```bash
npm run build
```

#### Option A: Vercel

1. Push this repository to GitHub.
2. Go to Vercel and import the GitHub repo.
3. Vercel will use:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click Deploy and get your public URL.

`vercel.json` is already added for this setup.

#### Option B: Netlify

1. Push this repository to GitHub.
2. Go to Netlify and create a new site from Git.
3. Netlify will use:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click Deploy and get your public URL.

`netlify.toml` is already added for this setup.

## File Structure

```text
/tmp/workspace/yv4199846-dev/Yuvraj
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── main.js      # Reader engine, AI actions, selection tools, persistence
    └── style.css    # Premium dark glassmorphism UI + responsive styles
```

## Notes

- Dictionary uses:
  - `https://api.dictionaryapi.dev`
  - `https://api.mymemory.translated.net`
- AI Explain and AI Summary are mocked in-app and can be replaced with OpenAI/Anthropic endpoints.
- Works with local uploads only; no server required.
