# 🔥 Firebase Token Setup (Web Method)

**Skip the CLI - use the Firebase Console instead!**

---

## 🚀 METHOD 1: CI Token via Web (Easiest)

### Step 1: Open Firebase Token Generator

**Go to**: https://firebase.tools/cli-ci-token

This will:
1. Ask you to sign in with Google
2. Generate a CI token automatically
3. Display it on the screen

### Step 2: Copy the Token

It will look like:
```
1//0abc123def456ghi789jkl...xyz
```

Copy the entire token.

### Step 3: Add to GitHub Secrets

1. **Go to**: https://github.com/cyserman/SECRET_HEART_POCKET/settings/secrets/actions

2. **Click**: "New repository secret"

3. **Add**:
   - Name: `FIREBASE_TOKEN`
   - Secret: [Paste your token]

4. **Click**: "Add secret"

---

## ✅ DONE!

Once you add the token, GitHub Actions will automatically deploy on every push to `main`.

---

## 🔄 METHOD 2: Service Account (More Secure)

If the above doesn't work, use a service account:

### Step 1: Create Service Account

1. **Go to**: https://console.firebase.google.com/project/secret-heart-pocket/settings/serviceaccounts/adminsdk

2. **Click**: "Generate new private key"

3. **Download** the JSON file (keep it secret!)

### Step 2: Encode to Base64

```bash
# On your local machine
cat path/to/serviceAccountKey.json | base64 -w 0
```

This gives you a long string like: `eyJhbGciOiJSUzI1Ni...`

### Step 3: Add to GitHub Secrets

1. **Go to**: https://github.com/cyserman/SECRET_HEART_POCKET/settings/secrets/actions

2. **Add TWO secrets**:

   **Secret 1:**
   - Name: `FIREBASE_SERVICE_ACCOUNT`
   - Secret: [Paste the base64 string]

   **Secret 2:**
   - Name: `GCP_PROJECT_ID`
   - Secret: `secret-heart-pocket`

### Step 4: Update Workflow (I'll do this if needed)

---

## 🎯 WHICH METHOD TO USE?

- **Method 1** (CI Token): Simpler, good for personal projects
- **Method 2** (Service Account): More secure, better for production

---

## ⚡ QUICK LINK

**Get token now**: https://firebase.tools/cli-ci-token

Then add to: https://github.com/cyserman/SECRET_HEART_POCKET/settings/secrets/actions

---

**That's it! No CLI installation needed.**

