# Favicon Setup - COMPLETED ✅

The favicon files have been successfully created from the square Hackathon logo!

## Created Files:

1. **favicon.ico** (32x32) - Browser tab icon
   - Location: `/public/favicon.ico`
   - Source: `/public/wp-media/hackathon-1-e1454784587304.png`
   - Size: 4.2KB

2. **apple-touch-icon.png** (180x180) - iOS home screen icon
   - Location: `/public/apple-touch-icon.png`
   - Source: `/public/wp-media/hackathon-1-e1454784587304.png`
   - Size: 26KB

## How They Were Created:

Using ImageMagick:

```bash
# Create favicon from square logo
convert /workspaces/hackathon.be/site/public/wp-media/hackathon-1-e1454784587304.png -resize 32x32 -flatten /workspaces/hackathon.be/site/public/favicon.ico

# Create apple touch icon from square logo
convert /workspaces/hackathon.be/site/public/wp-media/hackathon-1-e1454784587304.png -resize 180x180 -flatten /workspaces/hackathon.be/site/public/apple-touch-icon.png
```

## To Regenerate (if needed):

If you ever need to regenerate these files:

1. **Using ImageMagick** (command line):

   ```bash
   cd /workspaces/hackathon.be/site
   convert public/wp-media/hackathon-1-e1454784587304.png -resize 32x32 -flatten public/favicon.ico
   convert public/wp-media/hackathon-1-e1454784587304.png -resize 180x180 -flatten public/apple-touch-icon.png
   ```

2. **Using Online Tools**:
   - https://realfavicongenerator.net/ (recommended - generates all sizes)
   - https://favicon.io/
   - https://www.favicon-generator.org/

The Layout.astro file is already configured to reference these files.
