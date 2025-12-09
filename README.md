# Screen Test Pro 📱

A comprehensive mobile screen testing web application for detecting display defects, dead pixels, touch issues, and more. Built with vanilla HTML, CSS, and JavaScript - no build process required!

## ✨ Features

### Core Tests
- **Solid Colors**: Black, white, red, green, blue, yellow, purple, cyan
  - Test for dead pixels, stuck pixels, and color uniformity
- **Gradients**: Horizontal and vertical gradients
  - Detect color banding and smooth transitions
- **RGB Pattern**: Color accuracy and alignment testing
- **Sharpness Test**: Screen clarity and text rendering
- **Motion Tests**: Scrolling bars and flicker detection
  - Identify ghosting, burn-in, and motion blur
- **High Contrast**: Checkerboard pattern
  - Check for light bleed and edge defects

### Advanced Diagnostics
- **Touch Grid Test**: 5x5 interactive grid for touch sensitivity
- **Dead Zone Detector**: Draw on screen to find unresponsive areas
- **Auto-Brightness Test**: Alternating patterns to test light sensor
- **Flash Mode**: Rapid color cycling for defect detection
- **Pixel Locator**: Grid overlay to identify exact pixel locations
- **Burn-in Detector**: Static vs moving pattern comparison

### User Experience
- **Swipe Navigation**: Swipe left/right to navigate between tests
- **Auto-Play Mode**: Automatic test cycling (5s, 10s, 30s intervals)
- **Quick Test**: Essential tests in 10 seconds
- **Full Test**: Comprehensive testing in ~2 minutes
- **Fullscreen Support**: Immersive testing experience
- **Dark/Light Mode**: Comfortable UI in any environment
- **Technician View**: Hide all UI during testing
- **Keyboard Controls**: Arrow keys, space, ESC, F for fullscreen
- **Orientation Detection**: Works in portrait and landscape
- **Touch Feedback**: Visual feedback for all interactions

## 🚀 Quick Start

### Local Testing
1. Clone or download this repository
2. Open `index.html` in a web browser
3. For mobile testing, use your device's browser or browser dev tools

### Mobile Access
- Serve the files using any HTTP server
- Access from your mobile device on the same network
- Or deploy to Cloudflare Pages (see below)

## ☁️ Deploy to Cloudflare Pages

### Method 1: GitHub Integration (Recommended)
1. Push this repository to GitHub
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
3. Navigate to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
4. Connect your GitHub account
5. Select your repository
6. Configure build settings:
   - **Framework preset**: None
   - **Build command**: `npx wrangler deploy`
   - **Build output directory**: `/` (root directory)
7. Click **Save and Deploy**
8. Your app will be live at `https://your-project.pages.dev`

> **Note**: The `wrangler.toml` file is already configured to serve static assets from the root directory.

### Method 2: Direct Upload (Simpler)
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** → **Create application** → **Pages** → **Upload assets**
3. Drag and drop your project folder, or upload these files:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `_headers` (optional, for security headers)
4. Click **Deploy site**
5. Your app will be live instantly at `https://your-project.pages.dev`

### Custom Domain (Optional)
1. In your Cloudflare Pages project settings
2. Go to **Custom domains**
3. Add your domain
4. Update DNS records as instructed

## 📱 Usage Guide

### Running Tests

**Quick Test (10 seconds)**
- Click "Quick Test" button
- Runs essential tests automatically
- Perfect for rapid screening

**Full Test (~2 minutes)**
- Click "Full Test" button
- Comprehensive testing of all features
- Ideal for thorough diagnostics

**Manual Testing**
- Select any test from the categories
- Use swipe gestures or arrow keys to navigate
- Enable auto-play for automatic cycling

### Controls

**Panel Toggle**
- Tap the arrow icon to collapse/expand control panel
- Swipe up/down on the panel

**Fullscreen**
- Tap the fullscreen icon
- Press 'F' key on keyboard
- Press ESC to exit

**Dark Mode**
- Tap the moon icon
- Preference is saved automatically

**Technician View**
- Tap the eye icon
- Hides all UI for unobstructed testing
- Tap again to restore UI

### Keyboard Shortcuts
- `←` / `→` : Previous/Next test
- `Space` : Toggle auto-play
- `F` : Toggle fullscreen
- `ESC` : Exit fullscreen

## 🔧 Test Descriptions

### Dead Pixel Detection
Use solid color tests (especially black and white) to identify:
- **Dead pixels**: Permanently black spots
- **Stuck pixels**: Pixels showing wrong color
- **Hot pixels**: Permanently bright spots

### Color Banding
Gradient tests reveal:
- Smooth color transitions
- Banding artifacts
- Color accuracy issues

### Touch Issues
Touch grid and dead zone tests detect:
- Unresponsive areas
- Ghost touches
- Multi-touch problems

### Burn-in & Ghosting
Motion and burn-in tests identify:
- Image persistence
- Screen retention
- Motion blur

## 🛠️ Technical Details

- **Framework**: Vanilla JavaScript (ES6+)
- **Styling**: Modern CSS with custom properties
- **Compatibility**: All modern browsers
- **Mobile-First**: Optimized for touch devices
- **No Dependencies**: Zero external libraries
- **Offline Ready**: Works without internet after initial load

## 📄 Browser Support

- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Safari (iOS & macOS)
- ✅ Firefox (Desktop & Mobile)
- ✅ Samsung Internet
- ✅ Other modern browsers

## 🎨 Customization

Edit `styles.css` to customize:
- Color scheme (CSS custom properties in `:root`)
- Layout and spacing
- Animation speeds
- Dark mode colors

Edit `app.js` to customize:
- Test patterns
- Auto-play timing
- Touch sensitivity
- Test sequences

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Made with ❤️ for mobile technicians and display enthusiasts**
