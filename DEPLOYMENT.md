# 🚀 Deployment Guide - Secret Heart Pocket

## Vercel Deployment

### Prerequisites
1. Vercel account (sign up at https://vercel.com)
2. Git repository (GitHub, GitLab, or Bitbucket)
3. Firebase project configured

### Step 1: Push to Git

```bash
git init
git add .
git commit -m "Initial commit - Secret Heart Pocket"
git remote add origin <your-repo-url>
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (Select your account)
# - Link to existing project? No
# - Project name? secret-heart-pocket (or your choice)
# - Directory? ./
# - Override settings? No
```

#### Option B: Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your Git repository
3. Configure project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Add Environment Variables:
   - `VITE_FIREBASE_CONFIG` - Your Firebase config JSON string
   - `VITE_APP_ID` - Your Firebase app ID
   - `VITE_INITIAL_AUTH_TOKEN` - (Optional) Initial auth token
5. Click **Deploy**

### Step 3: Configure Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

```
VITE_FIREBASE_CONFIG={"apiKey":"...","authDomain":"...","projectId":"...","storageBucket":"...","messagingSenderId":"...","appId":"..."}
VITE_APP_ID=your-app-id
```

### Step 4: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Step 5: Verify PWA

1. Deploy the app
2. Open on mobile device
3. Look for "Add to Home Screen" prompt
4. Verify app icon appears
5. Test offline functionality

## Firebase Configuration

### Runtime Configuration (Gold Master Pattern)

If you're using the Gold Master pattern with global variables, inject them in `index.html`:

```html
<script>
  window.__firebase_config = '{"apiKey":"...","authDomain":"...",...}';
  window.__app_id = 'your-app-id';
</script>
```

Or use environment variables (recommended for Vercel).

## Post-Deployment Checklist

- [ ] App loads correctly
- [ ] Firebase authentication works
- [ ] PWA manifest loads (`/manifest.json`)
- [ ] Service worker registers
- [ ] Icons display correctly
- [ ] "Add to Home Screen" works on iOS/Android
- [ ] Offline functionality works
- [ ] Environment variables are set correctly

## Troubleshooting

### PWA Not Working
- Check browser console for service worker errors
- Verify manifest.json is accessible
- Ensure HTTPS is enabled (required for PWA)

### Firebase Errors
- Verify environment variables are set correctly
- Check Firebase project settings
- Ensure Firestore rules allow anonymous access

### Build Failures
- Check Node.js version (20+ recommended)
- Verify all dependencies are installed
- Check build logs in Vercel dashboard

## Continuous Deployment

Vercel automatically deploys on every push to main branch. For other branches, create preview deployments.

---

*Created for Leif & Lewie. Never stop exploring.*

