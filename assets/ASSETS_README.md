# TeachLink Asset Requirements

Replace the placeholder images with your actual brand assets.

## Required Assets

| File | Size | Description |
|------|------|-------------|
| `icon.png` | 1024x1024 | App icon (iOS & Android) |
| `adaptive-icon.png` | 1024x1024 | Android adaptive icon foreground |
| `splash.png` | 1284x2778 | Splash screen image |
| `notification-icon.png` | 96x96 | Android notification icon (white on transparent) |
| `favicon.png` | 48x48 | Web favicon |

## Optional Assets

| File | Description |
|------|-------------|
| `sounds/notification.wav` | Custom notification sound |

## Design Guidelines

### App Icon (`icon.png`)
- Square format, no transparency
- Simple, recognizable at small sizes
- Brand color: #4F46E5 (Indigo)

### Notification Icon (`notification-icon.png`)
- Must be white silhouette on transparent background
- Android will apply the accent color (#4F46E5)
- Keep it simple - fine details won't be visible

### Splash Screen (`splash.png`)
- Center your logo
- Background color is set in app.json (#4F46E5)
- Image will be centered and scaled to fit

## Quick Start

You can generate placeholder assets using Expo's asset generator:

```bash
npx expo-asset@latest generate
```

Or use your design tool (Figma, Sketch) to export at the correct sizes.
