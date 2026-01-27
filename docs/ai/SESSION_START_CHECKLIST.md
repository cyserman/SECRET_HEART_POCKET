# 🎯 Agent Session Start Checklist

## Required Steps for Every New Session

This checklist ensures all AI agents (Cursor, GitHub Copilot, etc.) have the necessary context to work effectively on the Secret Heart Pocket project.

---

## ✅ Pre-Work Checklist

### 1. Read Anchor Documents (5 min)

Read in this specific order:

- [ ] **README.md** 
  - Project overview
  - Quick start instructions
  - Tech stack and features
  - Development commands

- [ ] **PROJECT_STATE.md**
  - Current development phase
  - Active tasks and roadmap
  - Recent changes (changelog)
  - Known issues or blockers

- [ ] **ORIGAMI_PROTOCOL.md**
  - Development methodology
  - Folded Map architecture
  - Phase-based workflow
  - Drift prevention rules

- [ ] **docs/ai/AGENTS.md**
  - Agent roles (CHRISTINE vs Driver)
  - Safety and privacy doctrine
  - Collaboration rules
  - Present Mode guidelines

---

### 2. Start Local Development Server

```bash
# Navigate to project root
cd /home/runner/work/SECRET_HEART_POCKET/SECRET_HEART_POCKET

# Install dependencies (if first time or package.json changed)
npm install

# Start development server
npm run dev
```

**Expected output:**
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

- [ ] Development server running at `http://localhost:5173`
- [ ] No critical errors in console
- [ ] Browser opened to local server

---

### 3. Verify Project State

```bash
# Check git status
git status

# View recent commits
git log --oneline -5

# Check current branch
git branch --show-current
```

- [ ] Reviewed git status for uncommitted changes
- [ ] Identified current branch
- [ ] Noted any merge conflicts or issues

---

### 4. Review Current Work Context

From `PROJECT_STATE.md`, identify:

- [ ] **Current Phase**: (e.g., Phase 2: The Engine)
- [ ] **Active Tasks**: (e.g., Firebase integration, UI polish)
- [ ] **Last Update Date**: _______________
- [ ] **Known Issues**: _______________

---

## 🔄 During Session Workflow

### On Every Code Change

1. **Save files** in editor
2. **Check browser** - Vite hot-reload should update automatically
3. **Verify in DevTools** - No console errors
4. **Test the feature** - Click, interact, verify behavior

### Before Committing

1. **Run TypeScript check**: `npm run lint`
2. **Build the project**: `npm run build`
3. **Review changes**: `git diff`
4. **Update PROJECT_STATE.md** with what you completed

### When Switching Context

1. **Stop dev server**: `Ctrl+C` in terminal
2. **Commit work**: Follow git workflow
3. **Update changelog** in PROJECT_STATE.md

---

## 🛡️ Safety Reminders

### Always Follow These Rules:

- ✅ **Children's content is sacred** - Never expose private data
- ✅ **Test in browser** - Don't assume code works without verifying
- ✅ **Stay in current phase** - Follow Origami Protocol (no scope creep)
- ✅ **Maintain TypeScript strict mode** - No `any` types without justification
- ✅ **Respect emotional tone** - Keep UI calm, safe, bedtime-ready

### Never Do These:

- ❌ Override human intent or decisions
- ❌ Introduce dark patterns or data exploitation
- ❌ Ship code without testing in browser
- ❌ Work outside current phase/fold
- ❌ Commit broken TypeScript

---

## 📝 Quick Reference Commands

```bash
# Development
npm run dev          # Start dev server (localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # TypeScript type checking

# Firebase (if needed)
firebase emulators:start    # Start Firebase emulators
firebase deploy             # Deploy to production

# Git
git status                  # Check current changes
git add .                   # Stage all changes
git commit -m "message"     # Commit with message
git push                    # Push to remote
```

---

## 🎓 Pro Tips

1. **Keep browser DevTools open** - Catch errors early
2. **Use Vite's hot reload** - See changes instantly
3. **Read error messages carefully** - They're usually accurate
4. **Check PROJECT_STATE.md first** - Avoid duplicate work
5. **Update docs as you go** - Future you will thank you

---

## ✨ Session End Checklist

Before ending your session:

- [ ] All code changes tested in browser
- [ ] No TypeScript errors (`npm run lint`)
- [ ] PROJECT_STATE.md updated with progress
- [ ] Changes committed with descriptive message
- [ ] Dev server stopped (Ctrl+C)

---

*Created for the Secret Heart Pocket project*  
*Following the Origami Protocol methodology*
