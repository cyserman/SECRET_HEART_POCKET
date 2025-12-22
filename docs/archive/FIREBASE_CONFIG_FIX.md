# 🔧 Firebase Configuration Error Fix

## Error You're Seeing
```
FirebaseError: Firebase: Error (auth/configuration-not-found).
```

## Root Cause
The `VITE_FIREBASE_CONFIG` environment variable is **not set** or **empty** in Vercel.

## Solution: Set Environment Variables in Vercel

### Step 1: Go to Vercel Project Settings
1. Visit: https://vercel.com/cysermans-projects/secret-heart-pocket
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in the left sidebar

### Step 2: Add Firebase Config
Click **"Add New"** and add:

**Key:** `VITE_FIREBASE_CONFIG`
**Value:** (paste this entire JSON string on ONE line):
```json
{"apiKey":"AIzaSyCbEZLYc6-I_CJIskAbL9s8fKPsz3sLqW4","authDomain":"secret-heart-pocket.firebaseapp.com","projectId":"secret-heart-pocket","storageBucket":"secret-heart-pocket.firebasestorage.app","messagingSenderId":"818940166214","appId":"1:818940166214:web:d4c3f7ced2ce2d3070ca47"}
```

**Important:** 
- Paste it as ONE line (no line breaks)
- Make sure it's in the **VALUE** field, not KEY
- Select **"Production"**, **"Preview"**, and **"Development"** environments

### Step 3: Add App ID
Click **"Add New"** again:

**Key:** `VITE_APP_ID`
**Value:** `secret-heart-pocket`

### Step 4: Redeploy
After adding variables:
1. Go to **"Deployments"** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Or push a new commit to trigger auto-redeploy

## Verify It's Set
After redeploy, check the build logs:
- Should NOT see "Firebase config not found" error
- Should see Firebase initializing successfully

## Icon Error (Less Critical)
The icon error is because PWA icons don't exist yet. This won't break the app, but you can:
1. Create icons in `public/icons/` folder
2. Or temporarily remove icon references from `manifest.json`

---

**After setting env vars and redeploying, the Firebase error should be gone!** ✅

