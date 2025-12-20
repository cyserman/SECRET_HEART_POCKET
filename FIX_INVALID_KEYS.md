# 🔧 Fix "Invalid Keys" Error in Vercel

## Common Causes

1. **Extra spaces or line breaks** in the JSON
2. **Hidden characters** from copy-paste
3. **Wrong quotes** (smart quotes vs straight quotes)
4. **Missing or extra commas**

## Solution: Clean Copy-Paste

### Step 1: Copy the EXACT value below

**For VITE_FIREBASE_CONFIG:**

Click and drag to select ONLY this line (no spaces before/after):
```
{"apiKey":"AIzaSyCbEZLYc6-I_CJIskAbL9s8fKPsz3sLqW4","authDomain":"secret-heart-pocket.firebaseapp.com","projectId":"secret-heart-pocket","storageBucket":"secret-heart-pocket.firebasestorage.app","messagingSenderId":"818940166214","appId":"1:818940166214:web:d4c3f7ced2ce2d3070ca47"}
```

### Step 2: In Vercel

1. **Key field**: Type exactly: `VITE_FIREBASE_CONFIG`
2. **Value field**: Paste the JSON string above
3. Make sure there are NO line breaks in the value
4. Make sure there are NO spaces before/after the `{` and `}`
5. Click "Add"

### Step 3: Add Second Variable

1. **Key field**: Type exactly: `VITE_APP_ID`
2. **Value field**: Type exactly: `secret-heart-pocket`
3. Click "Add"

## Alternative: Type It Manually

If copy-paste keeps failing, type it manually:

1. In the Value field, type: `{`
2. Then type: `"apiKey":"AIzaSyCbEZLYc6-I_CJIskAbL9s8fKPsz3sLqW4"`
3. Then type: `,"authDomain":"secret-heart-pocket.firebaseapp.com"`
4. Then type: `,"projectId":"secret-heart-pocket"`
5. Then type: `,"storageBucket":"secret-heart-pocket.firebasestorage.app"`
6. Then type: `,"messagingSenderId":"818940166214"`
7. Then type: `,"appId":"1:818940166214:web:d4c3f7ced2ce2d3070ca47"`
8. Then type: `}`

## Quick Test

Try this minimal version first to test:
- Key: `VITE_APP_ID`
- Value: `secret-heart-pocket`

If this works, then the issue is with the JSON formatting.

## Still Not Working?

Try this escaped version (if Vercel requires escaping):

```
{\"apiKey\":\"AIzaSyCbEZLYc6-I_CJIskAbL9s8fKPsz3sLqW4\",\"authDomain\":\"secret-heart-pocket.firebaseapp.com\",\"projectId\":\"secret-heart-pocket\",\"storageBucket\":\"secret-heart-pocket.firebasestorage.app\",\"messagingSenderId\":\"818940166214\",\"appId\":\"1:818940166214:web:d4c3f7ced2ce2d3070ca47\"}
```

---

**What error message do you see exactly?** That will help me give a more specific fix.

