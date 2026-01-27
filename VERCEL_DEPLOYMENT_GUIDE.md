# 🚀 Vercel Deployment Guide

This guide will help you deploy the Secret Heart Pocket application to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier works great)
- Your Firebase configuration ready (from Firebase Console)
- Git repository pushed to GitHub

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Import Project

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select `cyserman/SECRET_HEART_POCKET` from your GitHub repositories
4. Click **"Import"**

### Step 2: Configure Project

Vercel will auto-detect the configuration from your `package.json` and `package-lock.json`:

- **Framework Preset:** Vite (auto-detected)
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `dist` (auto-detected)
- **Install Command:** `npm install` (auto-detected)

You don't need to change these - Vercel will detect them automatically!

### Step 3: Add Environment Variables

Add the following environment variables in the Vercel dashboard:

**Option A: Add during initial deployment**

1. Before clicking "Deploy", expand **"Environment Variables"**
2. Add these variables:

| Name | Value |
|------|-------|
| `VITE_FIREBASE_CONFIG` | Your Firebase config JSON string (see below) |
| `VITE_APP_ID` | `secret-heart-pocket` |

**Option B: Add after deployment**

1. Deploy without environment variables first
2. Go to **Project Settings** → **Environment Variables**
3. Add the variables listed above
4. Redeploy the project

#### Firebase Config Format

Your `VITE_FIREBASE_CONFIG` should be a JSON string like this:

```json
{"apiKey":"AIzaSyCbEZLYc6-I_CJIskAbL9s8fKPsz3sLqW4","authDomain":"secret-heart-pocket.firebaseapp.com","projectId":"secret-heart-pocket","storageBucket":"secret-heart-pocket.firebasestorage.app","messagingSenderId":"818940166214","appId":"1:818940166214:web:d4c3f7ced2ce2d3070ca47"}
```

**To get your Firebase config:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** → **General**
4. Scroll to **Your apps** → Select your web app
5. Copy the config object (just the object, not the surrounding code)

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 1-3 minutes)
3. Your site will be live at `your-project.vercel.app`

### Step 5: Configure Custom Domain (Optional)

1. Go to **Project Settings** → **Domains**
2. Add your custom domain
3. Follow the DNS configuration instructions

---

## Method 2: Deploy via Vercel CLI

### Install Vercel CLI

```bash
npm install -g vercel
```

### Login to Vercel

```bash
vercel login
```

### Deploy

```bash
# From the project root
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? [Your account]
# - Link to existing project? N
# - What's your project's name? secret-heart-pocket
# - In which directory is your code located? ./
```

### Add Environment Variables

You can add environment variables via CLI or dashboard:

**Via CLI:**
```bash
vercel env add VITE_FIREBASE_CONFIG production
# Paste your Firebase config JSON when prompted

vercel env add VITE_APP_ID production
# Enter: secret-heart-pocket
```

**Or use the provided script:**
```bash
./set-vercel-env.sh
```

### Deploy to Production

```bash
vercel --prod
```

---

## Verifying Your Deployment

After deployment, verify that:

1. ✅ The site loads without errors
2. ✅ Firebase authentication works
3. ✅ You can create and view stories
4. ✅ Images upload correctly
5. ✅ PWA features work (check for "Add to Home Screen" prompt)

### Check Build Logs

If deployment fails:
1. Go to your Vercel Dashboard
2. Click on your project
3. Click on the failed deployment
4. Check the **Build Logs** for errors

### Common Issues

**Issue: "Module not found" errors**
- Solution: Make sure all dependencies are in `package.json`
- Run `npm install` locally to verify

**Issue: "Firebase not configured"**
- Solution: Check that `VITE_FIREBASE_CONFIG` environment variable is set correctly
- Make sure it's a valid JSON string (no line breaks)

**Issue: "Build command failed"**
- Solution: Test the build locally first: `npm run build`
- Check that TypeScript has no errors: `npm run lint`

**Issue: Environment variables not working**
- Solution: Make sure variable names start with `VITE_` prefix
- Redeploy after adding environment variables

---

## Automatic Deployments

Vercel will automatically deploy:
- **Production:** When you push to `main` branch
- **Preview:** When you create/update a pull request

### Configure Auto-Deploy

1. Go to **Project Settings** → **Git**
2. Set **Production Branch** to `main`
3. Enable **Deploy Previews** for pull requests

---

## Rolling Back

If you need to rollback to a previous deployment:

1. Go to **Deployments** in your Vercel dashboard
2. Find the working deployment
3. Click **⋯** → **Promote to Production**

---

## Monitoring and Analytics

Vercel provides built-in analytics:
1. Go to **Analytics** in your project dashboard
2. View real-time traffic, performance, and errors

---

## Next Steps

- [ ] Set up a custom domain
- [ ] Configure HTTPS (automatic with Vercel)
- [ ] Set up deployment notifications (Slack, Discord, etc.)
- [ ] Monitor performance with Vercel Analytics
- [ ] Set up error tracking (Sentry, etc.)

---

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Firebase Docs:** https://firebase.google.com/docs
- **Vite Docs:** https://vitejs.dev/

---

**Happy Deploying! 🎉**

*Created for Leif & Lewie. Never stop exploring.*
