# Assets Folder - Visual Reference System

This folder serves as a centralized repository for screenshots, images, and other visual assets that agents and developers can reference during development, debugging, and feature planning.

## 📁 Folder Structure

```
assets/
├── screenshots/           # Actual screenshots from the application
│   ├── ui/               # Current UI states and layouts
│   ├── bugs/             # Bug reports with screenshots
│   ├── features/         # Feature demonstrations
│   └── mockups/          # Proposed UI changes and new features
├── references/           # Design and inspiration materials
│   ├── designs/          # Wireframes, mockups, design systems
│   ├── inspiration/      # Inspiration images, competitor analysis
│   └── documentation/    # Flowcharts, diagrams, technical docs
└── uploads/              # Temporary storage for quick drops
    ├── temp/             # Temporary files (auto-cleanup candidate)
    └── processed/        # Files that have been reviewed/processed
```

## 📝 Naming Conventions

### Screenshots
```
YYYY-MM-DD_description.png
YYYY-MM-DD_description_bug-report.png
YYYY-MM-DD_feature-name_demo.png
```

Examples:
- `2025-12-20_login-screen.png`
- `2025-12-20_dark-mode-bug.png`
- `2025-12-20_story-editor-feature.png`

### References
```
topic_description.png
topic_description_v2.png
source_topic_description.png
```

Examples:
- `wireframe_story-editor.png`
- `inspiration_competitor-app.png`
- `diagram_user-flow.png`

## 🚀 How to Use

### For Agents/Developers:
1. **Reference Images**: When describing UI elements or features, include the path to relevant screenshots
2. **Bug Reports**: Place screenshots in `screenshots/bugs/` with descriptive names
3. **Feature Requests**: Use `screenshots/mockups/` for proposed changes
4. **Design References**: Store inspiration and design assets in `references/`

### For Quick Drops:
- Drop images directly into `uploads/temp/` for immediate access
- Move processed files to `uploads/processed/` for organization

## 🛠️ Best Practices

### File Management:
- Use PNG for screenshots (better quality)
- Use JPG for photos/inspiration (smaller size)
- Add descriptive names that agents can easily understand
- Include dates for chronological organization

### Git Workflow:
- Commit assets with descriptive commit messages
- Use meaningful commit messages like: `Add login screen screenshot for auth flow review`
- Keep file sizes reasonable (< 5MB per file)

### Agent Integration:
- Reference images using relative paths: `assets/screenshots/ui/2025-12-20_main-dashboard.png`
- Include image descriptions when referencing them
- Use the folder structure to categorize your requests

## 📋 Quick Reference Commands

```bash
# Add a new screenshot
cp ~/Desktop/screenshot.png assets/screenshots/ui/$(date +%Y-%m-%d)_description.png

# View folder structure
tree assets/ -I '.gitkeep'

# Check file sizes
du -sh assets/*/*
```

## 🔍 Agent Usage Examples

**When asking for UI help:**
> "Please review the current login screen at `assets/screenshots/ui/2025-12-20_login-screen.png` and suggest improvements."

**When reporting bugs:**
> "There's a layout issue on mobile - see `assets/screenshots/bugs/2025-12-20_mobile-layout-bug.png`"

**When requesting features:**
> "I'd like to implement this design: `assets/screenshots/mockups/2025-12-20_new-feature-mockup.png`"
