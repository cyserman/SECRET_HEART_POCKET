# 🔐 Push to GitHub - Troubleshooting

## Issue: 403 Forbidden Error

This usually means one of these:

### Option 1: Repository Doesn't Exist Yet
**Solution**: Create the repository on GitHub first:
1. Go to https://github.com/new
2. Repository name: `SECRET_HEART_POCKET`
3. Set visibility (Public/Private)
4. **Don't** initialize with README, .gitignore, or license
5. Click "Create repository"
6. Then try pushing again

### Option 2: Authentication Needed

#### Method A: GitHub CLI (Recommended)
```bash
# Install GitHub CLI if not installed
# Then authenticate
gh auth login

# Then push
git push -u origin main
```

#### Method B: Personal Access Token
```bash
# Generate token at: https://github.com/settings/tokens
# Use token as password when prompted
git push -u origin main
# Username: cyserman
# Password: <paste your token>
```

#### Method C: SSH (Most Secure)
```bash
# Generate SSH key if needed
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to GitHub: https://github.com/settings/keys
# Change remote to SSH
git remote set-url origin git@github.com:cyserman/SECRET_HEART_POCKET.git
git push -u origin main
```

### Option 3: Wrong Repository Name
Check if the repository name matches exactly:
- Current: `SECRET_HEART_POCKET`
- Make sure it exists at: https://github.com/cyserman/SECRET_HEART_POCKET

## Quick Fix Commands

```bash
# Check remote
git remote -v

# Remove and re-add remote (if needed)
git remote remove origin
git remote add origin https://github.com/cyserman/SECRET_HEART_POCKET.git

# Try pushing again
git push -u origin main
```

