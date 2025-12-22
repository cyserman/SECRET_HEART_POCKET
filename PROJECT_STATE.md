# PROJECT_STATE.md — The Secret Heart Pocket
Last Updated: 2025-12-22

## Core Directives (Origami Protocol)
- Work only on the current “visible fold”.
- After each successful step, update this file automatically.
- Out-of-scope ideas go to backlog.md.

## Locked MVP Decisions
- Market: public discovery, obfuscated by default
- Auth: anonymous browsing allowed; auth required for Create/Circles/Coins/Legacy
- Images: public blurred variants stored; originals private
- Economy: Cloud Functions enforce coin split + idempotency
- Owner-only originals in MVP (circle originals via signed URL proxy later)
- Reader transitions: ripple/warp/sparkle overlays

## Environment Notes
- Node: 18 (Functions)
- Package manager: npm
- Firebase Project ID: (fill)
- Required env vars (Vite):
  - VITE_FIREBASE_API_KEY=
  - VITE_FIREBASE_AUTH_DOMAIN=
  - VITE_FIREBASE_PROJECT_ID=
  - VITE_FIREBASE_STORAGE_BUCKET=
  - VITE_FIREBASE_MESSAGING_SENDER_ID=
  - VITE_FIREBASE_APP_ID=

## Roadmap Checklist

### PHASE 1: The Chassis
- [x] Initialize Vite/React/TS project
- [x] Install deps: tailwindcss postcss autoprefixer lucide-react react-router-dom @tanstack/react-query uuid firebase
- [x] Folder structure created
- [x] Tailwind config (brand palette)
- [x] Home mock implemented as React components
- [x] Reader: useStory + ReaderView + Teleprompter + MpsControl + Transitions

### PHASE 2: The Engine
- [x] Firebase init lib/firebase.ts + authBootstrap
- [x] Firestore rules + Storage rules (Implemented Option A: pagesPublic/pagesPrivate)
- [x] Firestore loaders for Reader (Updated to use pagesPublic)
- [x] CreateView upload pipeline + generatePublicVariant (Writing to pagesPublic/pagesPrivate)
- [x] Cloud Functions: generatePublicVariant, purchaseStory (Compiled successfully)
- [x] Admin skeleton + platform aggregates/events (Implemented /admin, analytics, verifications, redemptions)
- [x] Client Build Verification (Smoke Test Passed)

### Next Instruction (Unfolded)
Phase 2 Complete.
Ready for Deployment or Local Run.

To run locally:
1. Create `.env.local` with Firebase config.
2. `npm run dev`
3. `cd functions && npm run build && firebase emulators:start`

To deploy:
1. `firebase deploy`
