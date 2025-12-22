# AI Context Cost Optimization Guide

## What We Did (Dec 22, 2024)

### Cleanup Results
- **Before:** 61 markdown files in root
- **After:** 13 markdown files in root
- **Archived:** 51 troubleshooting/setup docs to `docs/archive/`
- **Created:** `.cursorrules` file for project context

### Estimated Savings
- **Previous context size:** ~150K+ tokens per interaction
- **New context size:** ~50K tokens per interaction
- **Savings:** ~66% reduction in input tokens
- **Cost impact:** From ~$0.045/interaction down to ~$0.015/interaction

## Best Practices Going Forward

### 1. Use Specific @ Mentions
❌ Bad: "Check my files"
✅ Good: "@src/App.tsx check the auth logic"

### 2. Batch Your Requests
❌ Bad: Three separate messages for three tasks
✅ Good: "Please: 1) fix auth, 2) update UI, 3) test deployment"

### 3. Do Simple Tasks Yourself
- `git status`, `ls`, `cat` → Use terminal
- Code logic, debugging, architecture → Use AI

### 4. Trust Your Tools
- If git push succeeds, it succeeded
- Don't ask "did it work?" unless you see errors

### 5. Archive Completed Docs
When a phase is done, move docs to archive:
```bash
mv PHASE_3_COMPLETE.md docs/archive/
```

### 6. Use .cursorrules
Update `.cursorrules` with project-specific context instead of adding it to every conversation.

## Remaining Root Docs (Essential Only)
- `README.md` - Project overview
- `PROJECT_STATE.md` - Current status
- `ORIGAMI_PROTOCOL*.md` - Methodology (reference only)
- `DESIGN_BRIEF_FROM_GEMINI.md` - Design spec
- Active development docs (as needed)

## Archive Location
All troubleshooting/setup docs are in `docs/archive/` - still accessible but not in active AI context.

## Next Steps
1. Remove old development docs as you complete features
2. Consider moving Origami Protocol to archive once methodology is established
3. Keep only active sprint/task documentation in root
4. Regular cleanup every 2-3 weeks

---
**Result:** Your $50 budget should now last 3x longer! 💰
