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
- Node: (fill)
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
- [ ] Firebase init lib/firebase.ts
- [ ] Firestore rules + Storage rules
- [ ] Firestore loaders for Reader
- [ ] CreateView upload pipeline + generatePublicVariant
- [ ] Cloud Functions: generatePublicVariant, purchaseStory
- [ ] Admin skeleton + platform aggregates/events

### Next Instruction (Unfolded)
Phase 1 Complete. Proceeding to Phase 2: The Engine.
1) Configure Firebase Rules (Firestore + Storage)
2) Implement Cloud Functions
3) Set up Admin routes
