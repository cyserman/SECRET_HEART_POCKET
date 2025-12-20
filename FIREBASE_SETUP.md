# 🔥 Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to: https://console.firebase.google.com
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `secret-heart-pocket` (or your choice)
4. Continue through setup:
   - Disable Google Analytics (optional, you can enable later)
   - Click **"Create project"**

## Step 2: Enable Services

### Enable Firestore Database

1. In Firebase Console, click **"Firestore Database"** in left menu
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select location (choose closest to your users)
5. Click **"Enable"**

### Enable Authentication

1. Click **"Authentication"** in left menu
2. Click **"Get started"**
3. Enable **"Anonymous"** authentication:
   - Click on "Anonymous"
   - Toggle **"Enable"**
   - Click **"Save"**

### Enable Storage (Optional, for image uploads)

1. Click **"Storage"** in left menu
2. Click **"Get started"**
3. Start in test mode
4. Choose location
5. Click **"Done"**

## Step 3: Get Your Firebase Config

1. Click the gear icon ⚙️ → **"Project settings"**
2. Scroll down to **"Your apps"** section
3. If you don't have a web app yet:
   - Click **"</>"** (Web icon)
   - Register app nickname: `Secret Heart Pocket`
   - Check "Also set up Firebase Hosting" (optional)
   - Click **"Register app"**
4. Copy the `firebaseConfig` object

It will look like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC1234567890abcdefghijklmnopqrstuvw",
  authDomain: "secret-heart-12345.firebaseapp.com",
  projectId: "secret-heart-12345",
  storageBucket: "secret-heart-12345.appspot.com",
  messagingSenderId: "987654321",
  appId: "1:987654321:web:xyz789"
};
```

## Step 4: Convert to JSON String for Vercel

Convert the config object to a single-line JSON string:

**Input** (from Firebase):
```javascript
{
  apiKey: "AIzaSyC1234567890...",
  authDomain: "secret-heart-12345.firebaseapp.com",
  projectId: "secret-heart-12345",
  storageBucket: "secret-heart-12345.appspot.com",
  messagingSenderId: "987654321",
  appId: "1:987654321:web:xyz789"
}
```

**Output** (for Vercel environment variable):
```json
{"apiKey":"AIzaSyC1234567890...","authDomain":"secret-heart-12345.firebaseapp.com","projectId":"secret-heart-12345","storageBucket":"secret-heart-12345.appspot.com","messagingSenderId":"987654321","appId":"1:987654321:web:xyz789"}
```

**Quick conversion:**
- Remove line breaks
- Keep it as one continuous line
- Make sure all quotes are double quotes (`"`)

## Step 5: Set Up Firestore Security Rules

1. Go to **Firestore Database** → **Rules** tab
2. Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Stories collection - public read, authenticated write
    match /artifacts/{appId}/public/data/stories/{storyId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // User profiles - users can only access their own
    match /artifacts/{appId}/users/{userId}/profile/data {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **"Publish"**

## Step 6: Add to Vercel

When deploying to Vercel, add these environment variables:

### `VITE_FIREBASE_CONFIG`
Paste your JSON string (the single-line version from Step 4)

### `VITE_APP_ID`
Use your `projectId` from Firebase config, or `default-app-id`

---

## Quick Checklist

- [ ] Firebase project created
- [ ] Firestore Database enabled
- [ ] Anonymous Authentication enabled
- [ ] Storage enabled (optional)
- [ ] Firebase config copied
- [ ] Config converted to JSON string
- [ ] Firestore rules updated
- [ ] Environment variables ready for Vercel

---

**Need help?** Check Firebase docs: https://firebase.google.com/docs/web/setup

*Created for Leif & Lewie. Never stop exploring.*

