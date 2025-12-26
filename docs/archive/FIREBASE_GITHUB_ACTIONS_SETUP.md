# 🚀 Firebase + GitHub Actions Setup Guide

**Automated deployment is almost ready!** Just need to add your Firebase token to GitHub.

---

## ⚡ QUICK SETUP (5 minutes)

### Step 1: Get Firebase Token

**Option A: Using npx (No install needed)**
```bash
npx firebase-tools@latest login:ci
```

**Option B: If you have Firebase CLI installed**
```bash
firebase login:ci
```

This will:
1. Open your browser
2. Ask you to sign in to Google
3. Generate a token like: `1//0abc123...xyz`
4. Copy this token!

---

### Step 2: Add Token to GitHub Secrets

1. Go to: https://github.com/cyserman/SECRET_HEART_POCKET/settings/secrets/actions

2. Click **"New repository secret"**

3. Fill in:
   - **Name**: `FIREBASE_TOKEN`
   - **Secret**: Paste the token from Step 1

4. Click **"Add secret"**

---

### Step 3: Push the Workflow

```bash
cd /home/ezcyser/SECRET_HEART_POCKET
git add .github/workflows/firebase-deploy.yml
git add FIREBASE_GITHUB_ACTIONS_SETUP.md
git commit -m "Add GitHub Actions for automated Firebase deployment"
git push origin main
```

---

## ✅ WHAT HAPPENS NEXT

Once you push:
1. GitHub Actions automatically triggers
2. Builds your Cloud Functions
3. Deploys to Firebase:
   - ✅ Firestore rules
   - ✅ Storage rules
   - ✅ Cloud Functions (generatePublicVariant + purchaseStory)

---

## 📊 MONITOR DEPLOYMENTS

Watch deployments here:
https://github.com/cyserman/SECRET_HEART_POCKET/actions

You'll see:
- ✅ Green checkmark = successful deployment
- ❌ Red X = deployment failed (check logs)

---

## 🔄 FUTURE DEPLOYMENTS

**No manual work needed!** Every time you push to `main`:
- GitHub Actions automatically deploys
- Takes ~2-3 minutes
- You get notifications if it fails

---

## 🎯 MANUAL DEPLOYMENT (Optional)

You can also trigger deployment manually:
1. Go to: https://github.com/cyserman/SECRET_HEART_POCKET/actions
2. Click "Deploy to Firebase"
3. Click "Run workflow"
4. Select branch: `main`
5. Click "Run workflow"

---

## ⚠️ TROUBLESHOOTING

### "Firebase token invalid"
- Token expired (they expire after ~30 days)
- Get a new one: `npx firebase-tools@latest login:ci`
- Update GitHub secret with new token

### "Permission denied"
- Make sure you're logged into the correct Google account
- Ensure the account has Owner/Editor access to `secret-heart-pocket` Firebase project

### "Functions build failed"
- Check the workflow logs for specific errors
- Common fix: `cd functions && npm install`

---

## 🎉 BENEFITS

✅ **Automated**: No manual deployment commands  
✅ **Fast**: Deploy in 2-3 minutes  
✅ **Safe**: Runs tests before deploying  
✅ **Traceable**: Full logs of every deployment  
✅ **Free**: GitHub Actions free tier is generous  

---

**Ready? Run Step 1 to get your Firebase token!**
