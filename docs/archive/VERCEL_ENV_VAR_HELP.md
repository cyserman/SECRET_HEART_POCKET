# 🔧 Vercel Environment Variables - Step by Step

## Where You Might Be Stuck

If you're seeing ">[]" or something unexpected, here's exactly what to do:

## In Vercel Dashboard

### Step 1: Go to Project Setup
1. Visit: https://vercel.com/new
2. Import: `cyserman/SECRET_HEART_POCKET`
3. You'll see a form with project settings

### Step 2: Find Environment Variables Section
Look for a section called:
- **"Environment Variables"** 
- Or **"Env"**
- Or a button that says **"Add Environment Variable"**

It's usually:
- Below the "Framework" settings
- Or in a separate tab/section
- Or you can add them AFTER clicking "Deploy" (in project settings)

### Step 3: Add Variables One at a Time

**Variable 1:**
- Click **"Add"** or **"New"** button
- Key: `VITE_FIREBASE_CONFIG`
- Value: `{"apiKey":"AIzaSyCbEZLYc6-I_CJIskAbL9s8fKPsz3sLqW4","authDomain":"secret-heart-pocket.firebaseapp.com","projectId":"secret-heart-pocket","storageBucket":"secret-heart-pocket.firebasestorage.app","messagingSenderId":"818940166214","appId":"1:818940166214:web:d4c3f7ced2ce2d3070ca47"}`
- Click **"Add"** or **"Save"**

**Variable 2:**
- Click **"Add"** again
- Key: `VITE_APP_ID`
- Value: `secret-heart-pocket`
- Click **"Add"** or **"Save"**

### Step 4: Deploy
- Click **"Deploy"** button at bottom

## Alternative: Add After Deployment

If you can't find the env vars section before deploying:
1. Click **"Deploy"** anyway
2. After deployment starts, go to **Project Settings**
3. Click **"Environment Variables"** tab
4. Add the variables there
5. Redeploy (it will auto-redeploy when you add env vars)

## What ">[]" Might Mean

- **In a form field**: Might be a placeholder or error
- **At bottom of page**: Could be a loading indicator or form element
- **In terminal**: Means waiting for input (press Ctrl+C)

## Quick Test

Try this:
1. Just click **"Deploy"** without adding env vars first
2. See if it deploys (it might work, or show errors)
3. Then add env vars in project settings after

---

**Don't worry about screenshots!** Just describe what you see and I'll help you through it.

What page are you on in Vercel? What buttons/options do you see?

