# 🚀 Set Vercel Environment Variables via CLI

## Option 1: Use Vercel CLI (Easiest!)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login

```bash
vercel login
```

### Step 3: Set Environment Variables

Run these commands one at a time:

**Set Firebase Config:**
```bash
vercel env add VITE_FIREBASE_CONFIG production
```
When prompted, paste:
```
{"apiKey":"AIzaSyCbEZLYc6-I_CJIskAbL9s8fKPsz3sLqW4","authDomain":"secret-heart-pocket.firebaseapp.com","projectId":"secret-heart-pocket","storageBucket":"secret-heart-pocket.firebasestorage.app","messagingSenderId":"818940166214","appId":"1:818940166214:web:d4c3f7ced2ce2d3070ca47"}
```
Press Enter, then Ctrl+D (or type `EOF` and press Enter)

**Set App ID:**
```bash
vercel env add VITE_APP_ID production
```
When prompted, paste:
```
secret-heart-pocket
```
Press Enter, then Ctrl+D

### Step 4: Deploy

```bash
vercel --prod
```

---

## Option 2: Use the Script

I created `set-vercel-env.sh` - but you'll need to run it from a terminal that supports it.

---

## Option 3: Deploy First, Then Add via Dashboard

1. Deploy without env vars: https://vercel.com/new
2. After deployment, go to **Project Settings** → **Environment Variables**
3. The form there might work better

---

## Option 4: Create .env.local File (For Local Testing)

Create a file `.env.local` in your project root:

```
VITE_FIREBASE_CONFIG={"apiKey":"AIzaSyCbEZLYc6-I_CJIskAbL9s8fKPsz3sLqW4","authDomain":"secret-heart-pocket.firebaseapp.com","projectId":"secret-heart-pocket","storageBucket":"secret-heart-pocket.firebasestorage.app","messagingSenderId":"818940166214","appId":"1:818940166214:web:d4c3f7ced2ce2d3070ca47"}
VITE_APP_ID=secret-heart-pocket
```

But this won't automatically import to Vercel - you'd still need to add them manually or via CLI.

---

**Which method do you want to try?** The CLI method (Option 1) is usually the most reliable!

