# Mall of America — Interactive Brand Deck

A world-class, fully interactive overview of Mall of America built as a cinematic, scroll-driven brand experience.

**Live Demo:** _Add your Vercel/Netlify URL here after deploying_

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React + Vite | Framework & build tool |
| Framer Motion (`motion/react`) | Scroll animations, page transitions |
| Tailwind CSS | Utility-first styling |
| Lucide React | Icons |

---

## AI Tools Used

- **Midjourney / DALL·E** — Hero imagery and section backgrounds generated with AI prompts where original assets were unavailable
- **Claude (Anthropic)** — Used to scaffold component structure, optimize animation timing, and review code quality
- **ChatGPT** — Copywriting assistance for statistics and section headlines

---

## Setup & Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/Sufishaik/lait-ai.git
cd lait-ai-task

# 2. Install dependencies
npm install

# 3. Add your hero video (optional)
# Place your mp4 file at: public/hero.mp4
# The app gracefully falls back to an image if no video is found.

# 4. Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Deploy to netlify (Free)

```bash
# Install netlify CLI
npm install -g netlify

# Build and deploy
npm run build
netlify --prod
```

Or connect your GitHub repo directly at [netify.com](https://netlify.com) — it auto-deploys on every push.

---

## Project Structure

```
src/
├── App.jsx          # Main app — all sections + modals
├── assets/          # Local assets images

## Phase 2 Modules (Built & Expandable)

| Module | Status |
|--------|--------|
| Events & Venue Booking | ✅ Live |
| Leasing Paths (4 categories) | ✅ Live |
| Sponsorship Tiers | ✅ Live |
| Performing Arts / Expo Section | ✅ Live (inline) |

---

## Fixes & Improvements in This Version

- ✅ Fixed video fallback bug (image no longer overlaps video)
- ✅ Fixed duplicate dining images (4 unique photos)
- ✅ Added mobile hamburger menu
- ✅ Full nav includes all 6 sections
- ✅ Body scroll locks when any modal is open
- ✅ Reusable Modal component (no code duplication)
- ✅ Added Sponsorship module (Phase 2)
- ✅ Added Leasing Paths module (Phase 2)
- ✅ Performing Arts & Convention Center section added
- ✅ Lazy loading on all images
- ✅ Nav text adapts white→black on scroll