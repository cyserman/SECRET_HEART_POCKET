# Enable Anonymous Authentication in Firebase

## The Error
```
Firebase: Error (auth/configuration-not-found)
POST https://identitytoolkit.googleapis.com/v1/accounts:signUp 400 (Bad Request)
```

This means **Anonymous Authentication is not enabled** in your Firebase project.

## Quick Fix (2 minutes)

1. **Go to Firebase Console:**
   - Visit: https://console.firebase.google.com/
   - Select your project

2. **Navigate to Authentication:**
   - Click "Authentication" in left sidebar
   - Click "Sign-in method" tab

3. **Enable Anonymous:**
   - Find "Anonymous" in the list of providers
   - Click on it
   - Toggle "Enable" switch to ON
   - Click "Save"

4. **Refresh Your App:**
   - Reload your browser
   - Error should be gone

## Why This Happened

Your app uses anonymous authentication to let users try the app without signing up. This is set in `src/lib/authBootstrap.ts` which calls `signInAnonymously()` on startup.

## Verify It Worked

After enabling, you should see in console:
```
🔓 No user, signing in anonymously...
✅ Anonymous sign-in successful: [user-id]
```

## Alternative: Switch to Email/Password Auth

If you prefer not to use anonymous auth, you can:
1. Remove the anonymous auth logic from `authBootstrap.ts`
2. Implement a proper login screen
3. Enable Email/Password authentication instead

Let me know if you need help with either approach!
