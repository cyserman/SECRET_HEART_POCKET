# GitHub Copilot Instructions for Secret Heart Pocket

## Project Overview
The Secret Heart Pocket is a premium family story platform built with React, TypeScript, Firebase, and Vite. This project follows the **Origami Protocol** methodology for AI-assisted development.

## 🚀 Session Start - Required Reading

Before making any code changes, **ALWAYS** read these anchor documents:

1. **README.md** - Project overview and setup
2. **PROJECT_STATE.md** - Current status and active phase
3. **ORIGAMI_PROTOCOL.md** - Development methodology
4. **docs/ai/AGENTS.md** - Agent roles and principles

**Full checklist:** See `docs/ai/SESSION_START_CHECKLIST.md`

## 🔧 Development Workflow

### Starting a Session
```bash
# Start the development server
npm run dev

# Opens at http://localhost:5173
# Keep this running during your session
```

### Testing Changes
- **Always test in browser** at http://localhost:5173
- Check browser console for errors
- Verify TypeScript: `npm run lint`
- Build before committing: `npm run build`

### Staying on Track
- Follow the **current phase** in PROJECT_STATE.md
- Don't work outside the active fold/phase
- Update PROJECT_STATE.md after completing tasks
- Commit with descriptive messages

## 🛡️ Safety & Quality Standards

### Non-Negotiable Rules
- ✅ Children's content is sacred - protect privacy
- ✅ Maintain TypeScript strict mode
- ✅ Test every change in browser
- ✅ Keep UI calm, safe, bedtime-ready
- ✅ Follow Firebase security best practices

### Never Do
- ❌ Override human intent
- ❌ Introduce dark patterns
- ❌ Ship untested code
- ❌ Work outside current phase
- ❌ Commit broken TypeScript

## 📂 Key File Locations

### Core Application
- `src/App.tsx` - Main app component
- `src/components/` - React components
- `src/hooks/` - Custom hooks
- `src/lib/` - Utilities and configs

### Configuration
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript settings
- `tailwind.config.js` - Tailwind CSS
- `firebase.json` - Firebase config

### Security
- `firestore.rules` - Firestore security rules
- `storage.rules` - Storage security rules

### Documentation
- `PROJECT_STATE.md` - Living project state
- `ORIGAMI_PROTOCOL.md` - Development methodology
- `docs/ai/` - Agent guidelines

## 🎯 Code Style Guidelines

### TypeScript
- Use strict mode (no `any` without justification)
- Define proper interfaces for all data structures
- Prefer type inference where clear

### React
- Functional components with hooks
- Proper dependency arrays for useEffect
- Memoize expensive computations

### Styling
- Use Tailwind CSS classes
- Follow glassmorphism design system
- Responsive mobile-first design

### Firebase
- Secure by default
- Private data stays private
- Public data properly obfuscated

## 📋 Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview build
npm run lint         # TypeScript check

# Firebase
firebase emulators:start    # Local Firebase
firebase deploy             # Deploy to prod

# Git
git status                  # Check changes
git diff                    # See modifications
```

## 🎓 The Origami Protocol

This project uses the **Folded Map** approach:
- Focus on **one phase at a time** (the current "fold")
- Update PROJECT_STATE.md after each task
- Prevent scope creep and drift
- Self-heal after errors

**Current phase:** Check `PROJECT_STATE.md` for active tasks

## 📞 Getting Help

- Check `docs/archive/` for troubleshooting guides
- Review recent commits for context: `git log --oneline -10`
- Read error messages carefully (they're usually accurate)

---

*For detailed session workflow, see: `docs/ai/SESSION_START_CHECKLIST.md`*
