#!/bin/bash
# Documentation Cleanup Script
# Moves redundant troubleshooting docs to archive to reduce AI context costs

echo "📚 Starting documentation cleanup..."

# Create archive directory
mkdir -p docs/archive

# Files to KEEP in root (essential docs)
KEEP_FILES=(
  "README.md"
  "LICENSE"
  "PROJECT_STATE.md"
  "ORIGAMI_PROTOCOL.md"
  "ORIGAMI_PROTOCOL_WHITEPAPER.md"
)

# Move troubleshooting/fix docs to archive
echo "Moving troubleshooting docs to archive..."
mv -v DEBUG_*.md docs/archive/ 2>/dev/null
mv -v FIX_*.md docs/archive/ 2>/dev/null
mv -v FIREBASE_*.md docs/archive/ 2>/dev/null
mv -v VERCEL_*.md docs/archive/ 2>/dev/null
mv -v PUSH_*.md docs/archive/ 2>/dev/null
mv -v *_FIX.md docs/archive/ 2>/dev/null
mv -v *_DEBUG.md docs/archive/ 2>/dev/null
mv -v DEPLOY*.md docs/archive/ 2>/dev/null
mv -v CLEAN_*.txt docs/archive/ 2>/dev/null
mv -v FIXED_*.txt docs/archive/ 2>/dev/null

# Move completed phase docs
echo "Moving completed phase docs to archive..."
mv -v PHASE_*.md docs/archive/ 2>/dev/null
mv -v *_COMPLETE.md docs/archive/ 2>/dev/null
mv -v *_SUMMARY.md docs/archive/ 2>/dev/null
mv -v *_HIGHLIGHTS.md docs/archive/ 2>/dev/null

# Move setup/checklist docs
echo "Moving setup guides to archive..."
mv -v *_SETUP.md docs/archive/ 2>/dev/null
mv -v *_CHECKLIST.md docs/archive/ 2>/dev/null
mv -v QUICK_*.md docs/archive/ 2>/dev/null
mv -v *_STEPS.md docs/archive/ 2>/dev/null
mv -v *_HELP.md docs/archive/ 2>/dev/null
mv -v *_GUIDE.md docs/archive/ 2>/dev/null
mv -v FIND_*.md docs/archive/ 2>/dev/null
mv -v ADD_*.md docs/archive/ 2>/dev/null
mv -v VERIFY_*.md docs/archive/ 2>/dev/null

# Move miscellaneous docs
mv -v TROUBLESHOOTING.md docs/archive/ 2>/dev/null
mv -v *_INSTRUCTIONS.md docs/archive/ 2>/dev/null
mv -v *_STATUS.md docs/archive/ 2>/dev/null
mv -v SITE_DIAGNOSIS.md docs/archive/ 2>/dev/null
mv -v CURRENT_ISSUES_FIXED.md docs/archive/ 2>/dev/null

# Create index in archive
cat > docs/archive/README.md << 'EOF'
# Archived Documentation

This directory contains troubleshooting guides, setup instructions, and completed phase documentation that were moved to reduce AI context costs.

## Categories

- **Debug Guides**: `DEBUG_*.md`, `*_DEBUG.md`
- **Fix Instructions**: `FIX_*.md`, `*_FIX.md`
- **Firebase Setup**: `FIREBASE_*.md`
- **Vercel Setup**: `VERCEL_*.md`
- **Deployment**: `DEPLOY*.md`, `PUSH_*.md`
- **Completed Phases**: `PHASE_*.md`, `*_COMPLETE.md`
- **Setup Guides**: Various setup and quick start docs

These files are kept for reference but don't need to be in the AI's active context.
EOF

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📊 Results:"
echo "Root .md files before: 61"
echo -n "Root .md files now: "
find . -maxdepth 1 -name "*.md" -type f | wc -l
echo -n "Archived files: "
ls -1 docs/archive/*.md docs/archive/*.txt 2>/dev/null | wc -l
echo ""
echo "💰 This should significantly reduce your AI context costs!"
