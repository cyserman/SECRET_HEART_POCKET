# 🔍 How to Find Your Firebase Config

## You're on the Right Page!

You're at: `https://console.firebase.google.com/u/0/project/secret-heart-pocket/settings/general`

## Step-by-Step to Find Config

### Option 1: If You Already Have a Web App

1. **Scroll down** on the settings page you're on
2. Look for the section called **"Your apps"** (it's below the project info)
3. You should see a list of apps (iOS, Android, Web)
4. **Click on the Web app** (it has a `</>` icon)
5. You'll see your `firebaseConfig` object there!

### Option 2: If You Don't Have a Web App Yet

1. On the same settings page, scroll to **"Your apps"** section
2. Click the **`</>`** icon (Web icon) - it says "Add app" or shows a web icon
3. Register your app:
   - App nickname: `Secret Heart Pocket` (or any name)
   - **Don't check** "Also set up Firebase Hosting" (unless you want it)
   - Click **"Register app"**
4. **Copy the config** - it will show you the `firebaseConfig` object immediately

## What the Config Looks Like

You'll see something like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC1234567890abcdefghijklmnopqrstuvw",
  authDomain: "secret-heart-pocket.firebaseapp.com",
  projectId: "secret-heart-pocket",
  storageBucket: "secret-heart-pocket.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

## Quick Navigation Tips

**If you can't find "Your apps" section:**

1. Make sure you're on the **General** tab (you should be)
2. Try refreshing the page
3. Or go directly to: `https://console.firebase.google.com/u/0/project/secret-heart-pocket/settings/general/web`
4. Or click **"Project settings"** in the left sidebar, then scroll down

## Alternative: Get Config from Firebase Console Home

1. Go to: `https://console.firebase.google.com/u/0/project/secret-heart-pocket`
2. Click the **gear icon ⚙️** (top left, next to "Project Overview")
3. Click **"Project settings"**
4. Scroll down to **"Your apps"**
5. Click on your web app (or add one if needed)

## Still Can't Find It?

**Create a new web app:**
1. Go to: `https://console.firebase.google.com/u/0/project/secret-heart-pocket/settings/general`
2. Scroll to **"Your apps"**
3. Click **`</>`** (Web icon)
4. Register app → Copy config

---

## Once You Have the Config

Copy all 6 values:
- `apiKey`
- `authDomain`
- `projectId`
- `storageBucket`
- `messagingSenderId`
- `appId`

Then convert to JSON string format for Vercel (see `FIREBASE_SETUP.md`)

---

**Need a screenshot guide?** Let me know what you see on your screen and I can help navigate!

