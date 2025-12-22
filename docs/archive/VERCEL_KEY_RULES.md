# ✅ Vercel Environment Variable Key Rules

## Rules for KEY Names

- ✅ Must start with a **letter** (a-z, A-Z)
- ✅ Can contain letters, numbers, and underscores
- ✅ Cannot start with a number
- ✅ Cannot contain spaces or special characters (except `_`)

## ✅ CORRECT Key Names

- `VITE_FIREBASE_CONFIG` ✅ (starts with V - letter)
- `FIREBASE_CONFIG` ✅ (starts with F - letter)
- `VITE_APP_ID` ✅ (starts with V - letter)

## ❌ WRONG Key Names

- `123_CONFIG` ❌ (starts with number)
- `VITE 123` ❌ (contains space)
- `VITE-CONFIG` ❌ (contains dash)

## Your Keys Should Be:

**Key 1:**
```
VITE_FIREBASE_CONFIG
```
(Starts with V - that's a letter, so it's fine!)

**Key 2:**
```
VITE_APP_ID
```
(Starts with V - also fine!)

---

## Make Sure You're Entering:

1. **KEY field**: Just type `VITE_FIREBASE_CONFIG` (no quotes, no spaces)
2. **VALUE field**: Paste the JSON string

---

**If you're still getting the error, what exactly are you typing in the KEY field?**

