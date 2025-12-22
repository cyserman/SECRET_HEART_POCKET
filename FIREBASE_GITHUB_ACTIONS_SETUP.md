# 🤖 GitHub Actions + Firebase - Automated Deployment Setup

**Status**: Workflow created ✅  
**Next**: One-time setup (5 minutes)

---

## 📋 What This Does

Every time you push to `main`, GitHub Actions will automatically:
- ✅ Deploy Firestore rules
- ✅ Deploy Storage rules
- ✅ Deploy Cloud Functions
- ✅ No manual deployment needed!

---

## 🚀 ONE-TIME SETUP (3 Steps)

### **Step 1: Install Firebase CLI**

Open your terminal and run:

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Verify installation
firebase --version
```

**Expected output**: `13.x.x` or similar

---

### **Step 2: Generate Firebase Token**

```bash
# Login and generate CI token
firebase login:ci
```

**What happens:**
1. Browser opens for Firebase login
2. Sign in with your Google account (the one linked to `secret-heart-pocket` project)
3. Authorize Firebase CLI
4. Terminal shows: `1//xxx...` (this is your token)

**IMPORTANT**: Copy this token! You'll need it in Step 3.

**Example output:**
```
✔  Success! Use this token to login on a CI server:

1//03AbCdEf...XyZ123 ← COPY THIS
```

---

### **Step 3: Add Token to GitHub Secrets**

1. **Go to your GitHub repo**:
   - https://github.com/cyserman/SECRET_HEART_POCKET

2. **Navigate to Settings → Secrets and variables → Actions**:
   - Or direct link: https://github.com/cyserman/SECRET_HEART_POCKET/settings/secrets/actions

3. **Click "New repository secret"**

4. **Add the secret**:
   - **Name**: `FIREBASE_TOKEN`
   - **Value**: Paste the token from Step 2 (the long `1//03...` string)
   - Click "Add secret"

---

## ✅ VERIFY SETUP

### **Test Automated Deployment**

Push a small change to trigger the workflow:

```bash
cd /home/ezcyser/SECRET_HEART_POCKET

# Make a small change
echo "# Automated deployment active" >> README.md

# Commit and push
git add .
git commit -m "Test: Trigger automated Firebase deployment"
git push origin main
```

**Watch it deploy:**
1. Go to: https://github.com/cyserman/SECRET_HEART_POCKET/actions
2. You should see "Deploy to Firebase" workflow running
3. Click on it to watch live logs
4. After ~2-3 minutes: ✅ All green = success!

---

## 🎯 MANUAL DEPLOYMENT (If Needed)

If you want to deploy manually (not via GitHub Actions):

```bash
cd /home/ezcyser/SECRET_HEART_POCKET

# Deploy rules
firebase deploy --only firestore:rules,storage:rules

# Deploy functions
cd functions
npm install
npm run build
cd ..
firebase deploy --only functions
```

---

## 🔍 TROUBLESHOOTING

### **Error: "firebase: command not found"**

**Solution**:
```bash
npm install -g firebase-tools
```

### **Error: "Permission denied" during npm install -g**

**Solution** (Linux/ChromeOS):
```bash
# Use sudo
sudo npm install -g firebase-tools
```

### **Error: "Invalid authentication credentials"**

**Solution**: Token expired or incorrect
1. Generate new token: `firebase login:ci`
2. Update GitHub secret with new token

### **GitHub Action fails with "FIREBASE_TOKEN not found"**

**Solution**: 
- Go to GitHub Settings → Secrets
- Verify `FIREBASE_TOKEN` exists
- Name must be exactly `FIREBASE_TOKEN` (case-sensitive)

### **Functions deployment fails**

**Check**:
```bash
cd functions
npm install
npm run build
# Should compile without errors
```

---

## 📊 WHAT TO EXPECT

### **First Deployment** (~5-10 minutes)
- Installing dependencies
- Building functions
- Deploying everything

### **Subsequent Deployments** (~2-3 minutes)
- Cached dependencies
- Incremental builds
- Faster deployments

---

## 🎉 SUCCESS INDICATORS

When working correctly, you'll see:

1. **In GitHub Actions tab**:
   - Green checkmark ✅ on workflow runs
   - "Deploy to Firebase" badge

2. **In Firebase Console**:
   - Updated timestamps on rules
   - Functions showing "Active" status

3. **In your app**:
   - Changes take effect immediately
   - No manual deployment needed

---

## 📝 NEXT STEPS AFTER SETUP

Once token is added:

1. ✅ Push any change to `main` branch
2. ✅ Watch GitHub Actions deploy automatically
3. ✅ Verify in Firebase Console that rules/functions updated
4. ✅ Test the app end-to-end using smoke test checklist

---

## 🔗 USEFUL LINKS

- **GitHub Actions**: https://github.com/cyserman/SECRET_HEART_POCKET/actions
- **Firebase Console**: https://console.firebase.google.com/project/secret-heart-pocket
- **Vercel Dashboard**: https://vercel.com/cysermans-projects/secret-heart-pocket

---

## 💰 COST

- **GitHub Actions**: FREE (2,000 minutes/month)
- **Firebase Functions**: FREE tier (125K invocations/month)
- **Firebase Rules**: FREE (no limits)

**Total: $0/month** for this deployment setup 🎉

---

*Setup created by CHRISTINE - 2025-12-22*

