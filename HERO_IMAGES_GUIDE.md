# 🖼️ Hero Images Setup Guide

## 📁 **Where to Put Hero Images**

### **Folder Structure:**
```
public/
└── images/
    └── hero/
        ├── hero-1.jpg
        ├── hero-2.jpg
        └── hero-3.jpg
```

## 🎯 **Steps to Add Hero Images**

### **Step 1: Create the Hero Folder**
Please run this command in your terminal:
```powershell
mkdir "public\images\hero"
```

### **Step 2: Add Your Hero Images**
Place your hero images in the `public/images/hero/` folder with these names:
- `hero-1.jpg` - Main hero image (e.g., luxury chandelier)
- `hero-2.jpg` - Second hero image (e.g., modern lighting)
- `hero-3.jpg` - Third hero image (e.g., outdoor lighting)

### **Step 3: Image Requirements**
- **Format**: JPG, PNG, or WEBP
- **Size**: Recommended 1920x1080px or larger
- **File Size**: Under 2MB each for fast loading
- **Content**: High-quality lighting product photos

## 🖼️ **Image Suggestions**

### **Hero Image 1** (`hero-1.jpg`)
- **Content**: Luxury crystal chandelier
- **Style**: Elegant, premium lighting
- **Colors**: Warm, inviting tones

### **Hero Image 2** (`hero-2.jpg`)
- **Content**: Modern LED lighting installation
- **Style**: Contemporary, clean design
- **Colors**: Cool, professional tones

### **Hero Image 3** (`hero-3.jpg`)
- **Content**: Outdoor garden lighting
- **Style**: Natural, ambient lighting
- **Colors**: Natural, warm lighting

## 🔧 **Alternative: Use Category Images**

If you don't have specific hero images, you can temporarily use category images:

```javascript
// In src/app/page.tsx, change the heroImages array to:
const heroImages = [
  '/images/categories/hanging-light.jpg',
  '/images/categories/Spot-Lights.jpg',
  '/images/categories/pandent-light.jpg'
];
```

## 📱 **Testing**

After adding the images:
1. **Refresh the website**
2. **Check the hero section** - images should cycle every 2 seconds
3. **Test on mobile** - ensure images look good on all devices

## 💡 **Tips for Great Hero Images**

1. **High Quality**: Use professional lighting photos
2. **Good Lighting**: Well-lit products look more appealing
3. **Consistent Style**: All images should have similar aesthetic
4. **Fast Loading**: Optimize images for web (compress if needed)
5. **Mobile Friendly**: Test how they look on mobile devices

## 🚨 **If Images Don't Appear**

1. **Check file names** - must be exactly `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`
2. **Check file location** - must be in `public/images/hero/`
3. **Check file format** - JPG, PNG, or WEBP only
4. **Clear browser cache** - Ctrl+F5 to refresh

## 🎨 **Customization**

You can change the hero images anytime by:
1. Replacing the files in `public/images/hero/`
2. Updating the `heroImages` array in `src/app/page.tsx`
3. Adjusting the animation timing (currently 2 seconds)

---

**Need help?** The hero section will work perfectly once you add these images! 