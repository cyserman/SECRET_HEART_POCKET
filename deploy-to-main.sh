#!/bin/bash
# Deploy to Main Script
# Merges current branch changes to main and triggers deployment

echo "🚀 Starting deployment to main..."

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

# Stash any uncommitted changes
if [[ -n $(git status -s) ]]; then
  echo "💾 Stashing uncommitted changes..."
  git stash
fi

# Switch to main
echo "🔄 Switching to main branch..."
git checkout main

# Pull latest from origin
echo "⬇️  Pulling latest changes from origin/main..."
git pull origin main

# Merge current branch
echo "🔀 Merging $CURRENT_BRANCH into main..."
git merge "$CURRENT_BRANCH" -m "Merge $CURRENT_BRANCH: Auth error handling and docs cleanup"

if [ $? -eq 0 ]; then
  echo "✅ Merge successful!"
  
  # Push to origin
  echo "⬆️  Pushing to origin/main..."
  git push origin main
  
  if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment complete!"
    echo "🔥 Firebase will auto-deploy via GitHub Actions"
    echo "🌐 Vercel will auto-deploy from main branch"
    echo ""
    echo "Check deployment status:"
    echo "  Firebase: https://console.firebase.google.com"
    echo "  GitHub Actions: gh run list --limit 5"
    echo ""
  else
    echo "❌ Push failed. Check git status."
    exit 1
  fi
else
  echo "❌ Merge failed. There may be conflicts."
  echo "Run 'git status' to see what needs to be resolved."
  exit 1
fi

# Switch back to original branch
echo "🔄 Switching back to $CURRENT_BRANCH..."
git checkout "$CURRENT_BRANCH"

echo "✅ All done!"
