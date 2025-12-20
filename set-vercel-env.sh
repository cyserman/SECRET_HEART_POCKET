#!/bin/bash
# Set Vercel Environment Variables via CLI

# Install Vercel CLI if not installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Login if not already logged in
echo "Make sure you're logged in to Vercel..."
vercel login

# Set environment variables
echo "Setting environment variables..."

# Firebase Config
vercel env add VITE_FIREBASE_CONFIG production <<EOF
{"apiKey":"AIzaSyCbEZLYc6-I_CJIskAbL9s8fKPsz3sLqW4","authDomain":"secret-heart-pocket.firebaseapp.com","projectId":"secret-heart-pocket","storageBucket":"secret-heart-pocket.firebasestorage.app","messagingSenderId":"818940166214","appId":"1:818940166214:web:d4c3f7ced2ce2d3070ca47"}
EOF

# App ID
vercel env add VITE_APP_ID production <<EOF
secret-heart-pocket
EOF

echo "✅ Environment variables set!"
echo "Now deploy with: vercel --prod"

