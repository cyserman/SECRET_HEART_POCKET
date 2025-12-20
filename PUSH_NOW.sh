#!/bin/bash
# Push all commits to GitHub

# Your GitHub token (replace with your actual token)
TOKEN="YOUR_GITHUB_TOKEN_HERE"

# Set remote with token
git remote set-url origin https://${TOKEN}@github.com/cyserman/SECRET_HEART_POCKET.git

# Push
git push -u origin main

# Remove token from URL for security
git remote set-url origin https://github.com/cyserman/SECRET_HEART_POCKET.git

echo "✅ Push complete!"


