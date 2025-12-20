# 🚀 Vercel Deployment - Step by Step

## ✅ Pre-Deployment Checklist

- [x] Code pushed to GitHub
- [x] Build succeeds locally (`npm run build`)
- [x] TypeScript errors fixed
- [x] PWA configured
- [ ] Firebase project created
- [ ] Environment variables ready

---

## Step-by-Step Deployment

### 1. Go to Vercel

Visit: **https://vercel.com/new**

### 2. Import Repository

- Click **"Import Git Repository"**
- Select **GitHub**
- Authorize Vercel (if needed)
- Find and select: **`cyserman/SECRET_HEART_POCKET`**

### 3. Configure Project

Vercel should auto-detect Vite, but verify:

- **Framework Preset**: `Vite` ✅
- **Root Directory**: `./` ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `dist` ✅
- **Install Command**: `npm install` ✅

**Note**: These are already configured in `vercel.json`, so Vercel should pick them up automatically!

### 4. Environment Variables

**Before clicking Deploy**, add these environment variables:

Click **"Environment Variables"** and add:

#### Variable 1: `VITE_FIREBASE_CONFIG`
**Value**: Replace the `...` placeholders with your actual Firebase config values:
```json
{"apiKey":"YOUR_API_KEY_HERE","authDomain":"your-project.firebaseapp.com","projectId":"your-project-id","storageBucket":"your-project.appspot.com","messagingSenderId":"123456789","appId":"1:123456789:web:abc123"}
```

**How to get your Firebase config:**
1. Go to Firebase Console: https://console.firebase.google.com
2. Select your project (or create one)
3. Click the gear icon ⚙️ → Project Settings
4. Scroll to "Your apps" section
5. Click on your web app (or create one)
6. Copy the `firebaseConfig` object
7. Convert it to a JSON string (remove line breaks, keep it as one line)

**Example format** (replace with YOUR actual values):
```json
{"apiKey":"AIzaSyC1234567890abcdefghijklmnopqrstuvw","authDomain":"secret-heart-12345.firebaseapp.com","projectId":"secret-heart-12345","storageBucket":"secret-heart-12345.appspot.com","messagingSenderId":"987654321","appId":"1:987654321:web:xyz789"}
```

#### Variable 2: `VITE_APP_ID`
**Value**: Your Firebase App ID or custom identifier
- Example: `default-app-id` or `secret-heart-pocket` or your Firebase App ID

#### Variable 3: `VITE_INITIAL_AUTH_TOKEN` (Optional)
**Value**: Only if you have a custom auth token, otherwise leave this empty

### 5. Deploy!

Click **"Deploy"** button

### 6. Wait for Build

- Vercel will install dependencies
- Run `npm run build`
- Deploy to CDN
- You'll get a live URL! 🎉

### 7. Verify Deployment

1. Visit your Vercel URL
2. Check browser console for errors
3. Test Firebase connection
4. Test PWA features (service worker should register)

---

## Post-Deployment

### Set Up Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS instructions

### Monitor Deployments

- Every push to `main` = automatic deployment
- Preview deployments for PRs
- View logs in Vercel dashboard

---

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify Node.js version (Vercel uses 20+ automatically)
- Check environment variables are set

### Firebase Not Working
- Verify `VITE_FIREBASE_CONFIG` is valid JSON
- Check Firebase project settings
- Verify Firestore rules allow anonymous access

### PWA Not Working
- Check HTTPS is enabled (Vercel uses HTTPS by default)
- Verify service worker is registered (check browser DevTools)
- Check manifest.json is accessible

---

## Quick Reference

**Repository**: `cyserman/SECRET_HEART_POCKET`  
**Build Command**: `npm run build`  
**Output**: `dist/`  
**Framework**: Vite  

---

**Ready to deploy?** Go to https://vercel.com/new and follow the steps above! 🚀

*Created for Leif & Lewie. Never stop exploring.*

