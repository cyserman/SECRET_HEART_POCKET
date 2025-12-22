# 🚀 Add Environment Variables - Step by Step

## Go to This Page
**https://vercel.com/cysermans-projects/secret-heart-pocket/settings/environment-variables**

## Step 1: Add VITE_FIREBASE_CONFIG

1. Click **"Add New"** button (or **"Create"** button)
2. In the **"Key"** field, type:
   ```
   VITE_FIREBASE_CONFIG
   ```
3. In the **"Value"** field, paste this EXACT text (all on one line):
   ```
   {"apiKey":"AIzaSyCbEZLYc6-I_CJIskAbL9s8fKPsz3sLqW4","authDomain":"secret-heart-pocket.firebaseapp.com","projectId":"secret-heart-pocket","storageBucket":"secret-heart-pocket.firebasestorage.app","messagingSenderId":"818940166214","appId":"1:818940166214:web:d4c3f7ced2ce2d3070ca47"}
   ```
4. Check ALL three boxes:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. Click **"Save"** or **"Add"**

## Step 2: Add VITE_APP_ID

1. Click **"Add New"** button again
2. In the **"Key"** field, type:
   ```
   VITE_APP_ID
   ```
3. In the **"Value"** field, type:
   ```
   secret-heart-pocket
   ```
4. Check ALL three boxes:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. Click **"Save"** or **"Add"**

## Step 3: Redeploy

After adding both variables:

1. Go to **"Deployments"** tab (top navigation)
2. Find the latest deployment
3. Click the **"..."** (three dots) menu
4. Click **"Redeploy"**
5. Wait 1-2 minutes for rebuild

## Step 4: Test

After redeploy completes:
1. Visit: https://secret-heart-pocket.vercel.app/
2. Check browser console (F12 → Console)
3. Should NOT see Firebase errors anymore
4. Should see: "Start your first memory" screen

## Troubleshooting

### If "VITE_FIREBASE_CONFIG already exists":
1. Click on it to edit
2. Replace the value with the JSON above
3. Make sure all environments are checked
4. Save
5. Redeploy

### If still getting errors:
1. Delete both variables
2. Add them again fresh
3. Redeploy

---

**Important**: Environment variables only apply to NEW deployments, so you MUST redeploy after adding them!

