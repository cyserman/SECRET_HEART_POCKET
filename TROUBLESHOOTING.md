# 🔧 Troubleshooting Vercel Deployment

## Common Issues

### Issue: "Stopped at >[]" or Similar

This might mean:
1. **Terminal/Command Line Issue**: If you're in a terminal, `>` usually means it's waiting for more input
2. **Vercel Form Issue**: The environment variable field might have a character limit or formatting issue
3. **Copy/Paste Issue**: Special characters might be causing problems

## Solutions

### If You're in Vercel's Environment Variable Field:

1. **Make sure you're pasting in the VALUE field, not the KEY field**
   - Key: `VITE_FIREBASE_CONFIG`
   - Value: `{"apiKey":"AIzaSyC..."}` (the long JSON string)

2. **Try pasting without line breaks**
   - The JSON should be all on one line
   - No spaces or line breaks

3. **Check for hidden characters**
   - Try copying again from the file
   - Or type it manually (tedious but works)

### If You're in Terminal:

If you see `>` it means the terminal is waiting for more input. Press `Ctrl+C` to cancel and try again.

### Alternative: Use Vercel Dashboard

Instead of CLI, use the web interface:
1. Go to https://vercel.com/new
2. Import your repo
3. Click "Environment Variables" section
4. Add variables one by one using the web form

## Quick Copy-Paste Values

### VITE_FIREBASE_CONFIG (without measurementId):
```
{"apiKey":"AIzaSyCbEZLYc6-I_CJIskAbL9s8fKPsz3sLqW4","authDomain":"secret-heart-pocket.firebaseapp.com","projectId":"secret-heart-pocket","storageBucket":"secret-heart-pocket.firebasestorage.app","messagingSenderId":"818940166214","appId":"1:818940166214:web:d4c3f7ced2ce2d3070ca47"}
```

### VITE_APP_ID:
```
secret-heart-pocket
```

## Still Having Issues?

Describe:
- Where you're seeing ">[]" (Vercel dashboard? Terminal? Browser?)
- What you were trying to do when it happened
- Any error messages

