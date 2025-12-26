# PWA Icons

This directory should contain the following icon files for PWA support:

- `icon-72x72.png` - 72x72 pixels
- `icon-96x96.png` - 96x96 pixels
- `icon-128x128.png` - 128x128 pixels
- `icon-144x144.png` - 144x144 pixels
- `icon-152x152.png` - 152x152 pixels
- `icon-192x192.png` - 192x192 pixels
- `icon-384x384.png` - 384x384 pixels
- `icon-512x512.png` - 512x512 pixels

## Icon Generation

You can generate these icons from a single source image (1024x1024 recommended) using:

1. **Online Tools**:
   - https://realfavicongenerator.net/
   - https://www.pwabuilder.com/imageGenerator

2. **Command Line** (using ImageMagick):
   ```bash
   convert source.png -resize 72x72 icons/icon-72x72.png
   convert source.png -resize 96x96 icons/icon-96x96.png
   # ... repeat for all sizes
   ```

3. **Design Tools**:
   - Export from Figma/Adobe XD at each size
   - Use a heart/secret theme with indigo/amber colors

## Temporary Placeholder

For development, you can use a simple colored square or the app logo. The PWA will work without icons, but users won't see a custom icon when adding to home screen.

