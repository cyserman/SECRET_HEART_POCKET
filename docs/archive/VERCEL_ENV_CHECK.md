# 🔍 Vercel Environment Variables - Verification Guide

## Current Error
```
Firebase: Error (auth/configuration-not-found)
```

This means Vercel can't find `VITE_FIREBASE_CONFIG` or it's empty/invalid.

## Step-by-Step Verification

### 1. Go to Vercel Dashboard
Visit: https://vercel.com/cysermans-projects/secret-heart-pocket/settings/environment-variables

### 2. Check What's There
Look for these variables:
- `VITE_FIREBASE_CONFIG` 
- `VITE_APP_ID`

### 3. Verify VITE_FIREBASE_CONFIG Value
Click on `VITE_FIREBASE_CONFIG` to see/edit its value.

**It should be EXACTLY this (all on ONE line, no line breaks):**
```
{"apiKey":"AIzaSyCbEZLYc6-I_CJIskAbL9s8fKPsz3sLqW4","authDomain":"secret-heart-pocket.firebaseapp.com","projectId":"secret-heart-pocket","storageBucket":"secret-heart-pocket.firebasestorage.app","messagingSenderId":"818940166214","appId":"1:818940166214:web:d4c3f7ced2ce2d3070ca47"}
```

**Common Issues:**
- ❌ Has line breaks → Remove them
- ❌ Has extra spaces → Remove them  
- ❌ Missing quotes → Add quotes
- ❌ Empty value → Paste the JSON above

### 4. Verify VITE_APP_ID Value
Should be:
```
secret-heart-pocket
```

### 5. Check Environment Selection
Make sure both variables are enabled for:
- ✅ Production
- ✅ Preview  
- ✅ Development

### 6. Redeploy After Changes
After updating variables:
1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 1-2 minutes

## Quick Copy-Paste Values

### VITE_FIREBASE_CONFIG (copy entire line):
```
{"apiKey":"AIzaSyCbEZLYc6-I_CJIskAbL9s8fKPsz3sLqW4","authDomain":"secret-heart-pocket.firebaseapp.com","projectId":"secret-heart-pocket","storageBucket":"secret-heart-pocket.firebasestorage.app","messagingSenderId":"818940166214","appId":"1:818940166214:web:d4c3f7ced2ce2d3070ca47"}
```

### VITE_APP_ID:
```
secret-heart-pocket
```

## Still Not Working?

If you've verified everything and it still fails:

1. **Delete both variables** in Vercel
2. **Add them again** with the exact values above
3. **Redeploy** the project
4. **Hard refresh** your browser (Ctrl+Shift+R)

---

**What do you see when you check the environment variables in Vercel?**

