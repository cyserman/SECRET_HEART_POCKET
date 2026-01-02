# 🎯 PRE-DEPLOYMENT CHECKLIST

## OBJECTIVE
Perform a **pre-deployment check** to ensure Secret Heart Pocket is visually calm, emotionally safe, consistent, and free of obvious UX/CSS issues before pushing to production.

---

## 🚫 HARD CONSTRAINTS
- ❌ Do NOT propose rewrites
- ❌ Do NOT suggest new features
- ❌ Do NOT change logic, routes, Firebase, auth, or data
- ❌ Do NOT introduce new pages
- ❌ Do NOT add complexity

---

## 👀 WHAT TO CHECK (IN ORDER)

### 1. FIRST IMPRESSION
**Goal:** Does it feel calm/safe? Does it feel like a family product?

**Check:**
- [ ] Landing page feels warm and inviting (not corporate or clinical)
- [ ] Color palette is soft and bedtime-appropriate (no harsh whites or blacks)
- [ ] Overall vibe is "storybook" not "dashboard"
- [ ] Glassmorphism is subtle, not overwhelming
- [ ] Background gradients are visible and calming

**Pass/Fail:** ___________

**Notes:**
```
[Your observations here]
```

---

### 2. CHILD SAFETY & TONE
**Goal:** No creepy visuals? No harsh contrast? No corporate jargon?

**Check:**
- [ ] No dark, creepy, mechanical, or edgy visuals
- [ ] No sci-fi or "AI product" aesthetic
- [ ] No harsh white-on-black contrast
- [ ] Language is simple, warm, and child-friendly
- [ ] Icons and imagery are gentle and reassuring
- [ ] No heavy metaphors or lore dumps visible in UI

**Child Safety Test:**
> "Would I feel comfortable letting a five-year-old use this with a parent at bedtime?"

**Pass/Fail:** ___________

**Notes:**
```
[Your observations here]
```

---

### 3. VISUAL CONSISTENCY
**Goal:** Border radius, button styles, spacing, fonts are consistent.

**Check:**
- [ ] All buttons use consistent border radius (pill-shaped for primary, rounded for secondary)
- [ ] All cards use consistent border radius (`rounded-story` or `rounded-bedtime`)
- [ ] All badges use consistent styling (`.badge-category`, `.badge-status`)
- [ ] All inputs use consistent styling (`.input-cozy`)
- [ ] Spacing between elements feels balanced and rhythmic
- [ ] Font weights and sizes follow a clear hierarchy
- [ ] Glass effects are consistent across similar elements
- [ ] Shadows are consistent in depth and color

**Pass/Fail:** ___________

**Issues Found:**
| Element | Issue | Fix |
|---------|-------|-----|
| Example: Hero button | Using `rounded-xl` instead of `rounded-full` | Replace with `.btn-ember` class |
|  |  |  |
|  |  |  |

---

### 4. READABILITY
**Goal:** Easy to read? Large tap targets?

**Check:**
- [ ] Body text is at least 16px (prevents zoom on iOS)
- [ ] Text over images has shadow for contrast (`.text-shadow-soft` or `.text-shadow-strong`)
- [ ] Headings are clearly distinguishable from body text
- [ ] Color contrast meets WCAG AA standards (at minimum)
- [ ] Touch targets are at least 48px × 48px (56px preferred for primary actions)
- [ ] Spacing between interactive elements is at least 8px
- [ ] Text is not cramped or overly tight
- [ ] Placeholder text is clearly distinguishable from real text

**Pass/Fail:** ___________

**Issues Found:**
| Page/Component | Element | Issue | Fix |
|----------------|---------|-------|-----|
| Example: LibraryView | Category filter buttons | Only 40px tall | Increase padding to `py-3` for 48px+ height |
|  |  |  |  |
|  |  |  |  |

---

### 5. NAVIGATION
**Goal:** Clear location? Clear "back" or "home"?

**Check:**
- [ ] Current page/section is clearly indicated
- [ ] Navigation is always accessible (fixed bottom nav or clear header)
- [ ] Back button is present and obvious in modal/detail views
- [ ] Home button is easily accessible from any page
- [ ] Navigation labels are clear and child-friendly
- [ ] Active state is visually distinct from inactive state
- [ ] Navigation doesn't obscure content

**Pass/Fail:** ___________

**Notes:**
```
[Your observations here]
```

---

### 6. BUGS & POLISH
**Goal:** No overlaps, alignment issues, or broken hover states.

**Check:**
- [ ] No text overflow or truncation issues
- [ ] No overlapping elements
- [ ] All hover states work as expected
- [ ] All active/pressed states provide feedback
- [ ] No misaligned elements
- [ ] Images load correctly and fit their containers
- [ ] Gradients render smoothly (no banding)
- [ ] Animations are smooth and don't stutter
- [ ] Scrolling is smooth (no janky performance)
- [ ] No console errors or warnings

**Pass/Fail:** ___________

**Bugs Found:**
| Page/Component | Bug Description | Severity | Fix |
|----------------|-----------------|----------|-----|
| Example: StoryCard | Image aspect ratio breaks on mobile | Medium | Add `object-cover` class |
|  |  |  |  |
|  |  |  |  |

---

## 📱 RESPONSIVE CHECK

### Mobile (320px - 640px)
- [ ] All text is readable
- [ ] All buttons are tappable
- [ ] No horizontal scroll
- [ ] Images scale appropriately
- [ ] Modals fit on screen
- [ ] Navigation is accessible

**Pass/Fail:** ___________

### Tablet (641px - 1024px)
- [ ] Layout adapts gracefully
- [ ] Touch targets remain large
- [ ] Content is not too stretched
- [ ] Images maintain quality

**Pass/Fail:** ___________

### Desktop (1025px+)
- [ ] Content is centered or well-distributed
- [ ] Max-width prevents excessive stretching
- [ ] Hover states work properly
- [ ] Cursor changes appropriately

**Pass/Fail:** ___________

---

## 🎨 PAGE-BY-PAGE REVIEW

### Library / Home View
**First Impression:**
```
[Calm? Inviting? Warm?]
```

**Issues:**
- [ ] None found
- [ ] Issues listed below

| Issue | Severity | Fix |
|-------|----------|-----|
|  |  |  |

---

### Story Reader (Bedtime Mode)
**First Impression:**
```
[Dimmed? Calm? Easy to focus?]
```

**Issues:**
- [ ] None found
- [ ] Issues listed below

| Issue | Severity | Fix |
|-------|----------|-----|
|  |  |  |

---

### Create Story Modal
**First Impression:**
```
[Friendly? Clear? Not overwhelming?]
```

**Issues:**
- [ ] None found
- [ ] Issues listed below

| Issue | Severity | Fix |
|-------|----------|-----|
|  |  |  |

---

### Market / Discover (if applicable)
**First Impression:**
```
[Browsable? Inviting? Not too busy?]
```

**Issues:**
- [ ] None found
- [ ] Issues listed below

| Issue | Severity | Fix |
|-------|----------|-----|
|  |  |  |

---

## 📋 RESPONSE FORMAT (STRICT)

### ✅ What Works Well
- Glassmorphism creates a soft, layered feel
- Warm ember/night color palette is calming
- Button styles are consistent and inviting
- Bedtime mode is appropriately dimmed
- [Add more...]

### ⚠️ Needs Attention Before Push
- **LibraryView, Line 53:** Category buttons need larger touch targets (increase to `py-3`)
- **ReaderView, Line 70:** Close button should be larger (increase to `w-14 h-14`)
- **All story cards:** Add `text-shadow-soft` to titles for better readability over images
- [Add more...]

### 🛑 Blockers
- [ ] None identified
- [ ] Critical issues listed below

| Issue | Why It's Blocking | Fix Required |
|-------|-------------------|--------------|
|  |  |  |

---

## ✅ FINAL VERDICT

**Select One:**
- [ ] ✅ **Ready to Push** - All checks passed, no critical issues
- [ ] ⚠️ **Push with Minor Fixes** - Minor issues identified but not blocking
- [ ] 🛑 **Hold** - Critical issues must be resolved first

**Overall Assessment:**
```
[Your final thoughts on the visual state of the app]
```

**Recommended Next Steps:**
1. [Action item]
2. [Action item]
3. [Action item]

---

## 🧠 FINAL CHECK

> **"Would I feel comfortable letting a five-year-old use this with a parent at bedtime?"**

**Answer:** ___________

**Reasoning:**
```
[Your reasoning here]
```

---

## 📝 NOTES FOR FUTURE ITERATIONS

**What's Working:**
```
[Patterns and approaches that are successful]
```

**What Could Be Better:**
```
[Areas for future improvement, not blocking current release]
```

**Ideas for Later:**
```
[Nice-to-have enhancements for future sprints]
```

---

**Checklist Completed By:** ___________  
**Date:** ___________  
**Version:** ___________
