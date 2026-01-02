# 🎨 CSS Quick Reference Guide

A **quick lookup** for all custom CSS classes in the enhanced Secret Heart Pocket design system.

---

## 🪟 GLASS EFFECTS

| Class | Use Case | Properties |
|-------|----------|------------|
| `.glass-warm` | Hero sections, modals, primary cards | Warm translucent glass with 24px blur |
| `.glass-dark` | Secondary cards, navigation, overlays | Darker glass with 28px blur |
| `.glass-light` | Subtle overlays, tooltips, headers | Light glass with 16px blur |

**Example:**
```tsx
<div className="glass-warm p-6 rounded-story">
  Hero content here
</div>
```

---

## 🃏 CARD STYLES

| Class | Use Case | Hover Behavior |
|-------|----------|----------------|
| `.card-cozy` | General story cards, content blocks | Lifts 3px, warm glow |
| `.card-dark` | Library grid items, darker cards | Lifts 4px, ember glow |

**Example:**
```tsx
<div className="card-dark rounded-story overflow-hidden cursor-pointer group">
  <img src="..." className="group-hover:scale-105 transition-transform duration-700" />
</div>
```

---

## 🔘 BUTTON STYLES

| Class | Use Case | Style |
|-------|----------|-------|
| `.btn-ember` | Primary actions (Create, Save, Publish) | Warm gradient, pill-shaped, glow on hover |
| `.btn-orange` | Secondary actions (Edit, Share) | Orange gradient, rounded corners |
| `.btn-ghost` | Tertiary actions (Cancel, Browse) | Glass effect, subtle hover |

**Example:**
```tsx
<button className="btn-ember">Create Story</button>
<button className="btn-ghost">Cancel</button>
```

---

## 📝 INPUT STYLES

| Class | Use Case | Properties |
|-------|----------|------------|
| `.input-cozy` | All text inputs, textareas | Glass background, warm focus state, rounded |

**Example:**
```tsx
<input 
  type="text" 
  placeholder="Story title..." 
  className="input-cozy w-full"
/>
```

---

## 🏷️ BADGE STYLES

| Class | Use Case | Style |
|-------|----------|-------|
| `.badge-category` | Story categories (FAMILY, ADVENTURE, etc.) | Warm ember background, uppercase, bold |
| `.badge-status` | Status indicators (memory count, etc.) | Glass effect, subtle, pill-shaped |

**Example:**
```tsx
<div className="badge-category">FAMILY</div>
<div className="badge-status">○ 5</div>
```

---

## 📤 UPLOAD ZONE

| Class | Use Case | Properties |
|-------|----------|------------|
| `.upload-zone` | File upload areas | Dashed border, glass background, hover glow |
| `.upload-zone-active` | Active drag state | Enhanced glow, brighter border |

**Example:**
```tsx
<div className="upload-zone hover:upload-zone-active">
  <p>Drop your drawings here</p>
</div>
```

---

## 🎨 COLOR PALETTE

### Night (Indigo/Blue Base)
```css
night-50   #f0f4ff  /* Lightest */
night-100  #e0e9ff
night-200  #c7d7fe
night-300  #a4b8fc
night-400  #8193f8
night-500  #6370f2
night-600  #4f4ee8  /* Primary indigo */
night-700  #3d3bd4
night-800  #2e2fb3
night-900  #2a2a8f
night-950  #1a1a52  /* Deep night - body background */
```

### Ember (Warm Amber/Peach Accents)
```css
ember-50   #fff7ed  /* Lightest */
ember-100  #ffedd5
ember-200  #fed7aa
ember-300  #fdba74  /* Soft peach */
ember-400  #fb923c  /* Warm amber - primary accent */
ember-500  #f97316
ember-600  #ea580c
ember-700  #c2410c
ember-800  #9a3412
ember-900  #7c2d12  /* Darkest */
```

### Warmth (Additional Tones)
```css
warmth-cream    #fef3e2
warmth-butter   #fde8c3
warmth-honey    #f9d89c
warmth-caramel  #e8b882
```

### Soft (Accent Colors)
```css
soft-lavender  #e0d4f7
soft-mint      #d4f7e0
soft-rose      #f7d4e0
soft-sky       #d4e8f7
```

---

## 📏 BORDER RADIUS

| Class | Size | Use Case |
|-------|------|----------|
| `rounded-cozy` | 1.5rem (24px) | General cards, buttons |
| `rounded-story` | 2rem (32px) | Story cards, modals |
| `rounded-bedtime` | 2.5rem (40px) | Hero cards, reader view |
| `rounded-full` | 9999px | Pill buttons, avatars |

---

## 🌟 SHADOWS

| Class | Use Case | Effect |
|-------|----------|--------|
| `shadow-cozy` | Elevated cards | Soft, medium depth |
| `shadow-cozy-lg` | Modals, hero elements | Deeper, more prominent |
| `shadow-glow-ember` | Primary buttons, active elements | Warm amber glow |
| `shadow-glow-ember-soft` | Subtle accents | Softer amber glow |
| `shadow-glow-night` | Night-themed elements | Soft indigo glow |
| `shadow-bedtime` | Reader mode elements | Deeper, calmer shadow |

---

## 📝 TEXT UTILITIES

| Class | Use Case | Effect |
|-------|----------|--------|
| `.text-shadow-soft` | Text over images (general) | Subtle shadow for readability |
| `.text-shadow-strong` | Text over images (bedtime mode) | Strong shadow for high contrast |

**Example:**
```tsx
<h2 className="text-white text-3xl font-bold text-shadow-strong">
  Story Title
</h2>
```

---

## 🖼️ OVERLAY UTILITIES

| Class | Use Case | Effect |
|-------|----------|--------|
| `.overlay-gradient-bottom` | Image cards | Dark gradient from bottom |
| `.overlay-gradient-top` | Hero images | Dark gradient from top |

**Example:**
```tsx
<div className="relative">
  <img src="..." className="w-full h-full object-cover" />
  <div className="absolute inset-0 overlay-gradient-bottom" />
  <div className="absolute bottom-6 left-6 right-6">
    <h3 className="text-white text-shadow-soft">Title</h3>
  </div>
</div>
```

---

## 🎬 ANIMATIONS

| Class | Effect | Duration | Use Case |
|-------|--------|----------|----------|
| `.animate-float-gentle` | Gentle up/down float | 6s | Decorative elements |
| `.animate-glow-pulse` | Pulsing glow | 4s | Active indicators |
| `.animate-ember` | Subtle flicker | 3s | Ember-themed elements |
| `.animate-shimmer` | Shimmer effect | 3s | Loading states |
| `.animate-fade-in` | Fade in from bottom | 0.5s | Page load transitions |

**Example:**
```tsx
<div className="animate-float-gentle">
  <Sparkles className="text-ember-300" />
</div>
```

---

## 🎯 COMMON PATTERNS

### Story Card Pattern
```tsx
<div className="card-dark rounded-story overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-ember-500/25 transition-all duration-500 cursor-pointer group">
  <div className="relative aspect-square">
    <img 
      src="..." 
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
    />
    <div className="absolute inset-0 overlay-gradient-bottom" />
    <div className="badge-category absolute top-2 left-2">FAMILY</div>
    <div className="badge-status absolute top-2 right-2">○ 5</div>
  </div>
  <div className="p-4">
    <h3 className="text-white font-bold text-shadow-soft">Story Title</h3>
    <p className="text-slate-400 text-sm">Story description...</p>
  </div>
</div>
```

### Button Group Pattern
```tsx
<div className="flex gap-3">
  <button className="btn-ember">Primary Action</button>
  <button className="btn-ghost">Secondary Action</button>
</div>
```

### Input Group Pattern
```tsx
<div className="space-y-2">
  <label className="text-sm font-semibold text-slate-300">Label</label>
  <input 
    type="text" 
    placeholder="Placeholder..." 
    className="input-cozy w-full"
  />
  <p className="text-xs text-slate-400">Helper text</p>
</div>
```

### Modal Pattern
```tsx
<div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-night-950/90 backdrop-blur-sm">
  <div className="w-full max-w-md glass-warm rounded-bedtime shadow-2xl border border-white/20 overflow-hidden shadow-glow-ember">
    <div className="flex items-center justify-between p-6 border-b border-white/15 glass-light">
      <h2 className="text-2xl font-bold text-ember-400">Modal Title</h2>
      <button className="w-10 h-10 rounded-full glass-warm hover:bg-white/10 flex items-center justify-center">
        <X size={20} />
      </button>
    </div>
    <div className="p-6">
      {/* Modal content */}
    </div>
  </div>
</div>
```

---

## 🌙 BEDTIME MODE

Add `.bedtime-mode` to the root container to reduce brightness:

```tsx
<div className="fixed inset-0 bedtime-mode">
  {/* Reader content */}
</div>
```

**Effect:**
- Reduces overall brightness by 15%
- Darkens glass effects
- Dims ember buttons slightly

---

## 📱 RESPONSIVE UTILITIES

### Touch Targets
- **Minimum:** 48px × 48px
- **Preferred:** 56px × 56px for primary actions
- **Use:** `w-12 h-12` (48px) or `w-14 h-14` (56px)

### Font Sizes
- **Body:** `text-base` (16px minimum)
- **Small:** `text-sm` (14px minimum)
- **Headings:** `text-xl`, `text-2xl`, `text-3xl`

### Spacing
- **Cozy:** `p-cozy` or `m-cozy` (1.5rem / 24px)
- **Story:** `p-story` or `m-story` (2rem / 32px)

---

## 🔄 TRANSITION PATTERNS

### Standard Transition
```tsx
transition-all duration-300
```

### Smooth Hover
```tsx
transition-all duration-300 hover:-translate-y-1 hover:shadow-cozy
```

### Active/Press Feedback
```tsx
active:scale-95 transition-all duration-300
```

### Image Zoom on Hover
```tsx
transition-transform duration-700 group-hover:scale-105
```

---

## ✅ ACCESSIBILITY NOTES

- All interactive elements have `:hover`, `:active`, and `:focus` states
- Color contrast meets WCAG AA standards (minimum)
- Touch targets meet iOS/Android guidelines
- Text over images has shadows for readability
- Animations are subtle and non-distracting
- No flashing or rapid movements

---

## 🚀 QUICK START

1. **Replace config:**
   ```bash
   cp tailwind.config.enhanced.js tailwind.config.js
   ```

2. **Replace CSS:**
   ```bash
   cp src/index.enhanced.css src/index.css
   ```

3. **Update components:**
   - Use this guide to find the right classes
   - Refer to `COMPONENT_CSS_UPDATES.md` for specific line-by-line changes

4. **Test:**
   ```bash
   npm run dev
   ```

---

**Remember:** If you're unsure which class to use, ask yourself:
> "Does this feel warm, cozy, and bedtime-safe?"

If yes, you're on the right track. ✨
